import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import Navbar from '../components/Navbar';
import { useDispatch } from "react-redux";
import { setActiveKey } from '../redux/reducers/generalSlice';
import pianoSound from '../constants/Audio/piano';
import guitarSound from '../constants/Audio/guitar';
import drumSound from '../constants/Audio/drum';
import FileUploadComponent from '../components/FileUploadComponent';
import { demoSongs } from '../constants/demoSongs';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Volume2, 
  Sliders, 
  Circle, 
  Square, 
  Play, 
  Download, 
  Music2, 
  Activity, 
  Piano, 
  Layers
} from 'lucide-react';

// Seam mappings for black keys: white key index to the left of the black key
const BLACK_KEY_SEAM_OFFSETS = [
  0,    // C#3/Db3 between C3(0) and D3(1)
  1,    // D#3/Eb3 between D3(1) and E3(2)
  null, // Gap
  3,    // F#3/Gb3 between F3(3) and G3(4)
  4,    // G#3/Ab3 between G3(4) and A3(5)
  5,    // A#3/Bb3 between A3(5) and B3(6)
  null, // Gap
  7,    // C#4/Db4 between C4(7) and D4(8)
  8,    // D#4/Eb4 between D4(8) and E4(9)
  null, // Gap
  10,   // F#4/Gb4 between F4(10) and G4(11)
  11,   // G#4/Ab4 between G4(11) and A4(12)
  12,   // A#4/Bb4 between A4(12) and B4(13)
  null,
];

const Studio = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { instrument } = useParams();

  // Instrument selection
  const [selectedInstrument, setSelectedInstrument] = useState('piano');
  
  // Audio state
  const [volume, setVolume] = useState(0.85);
  const [pitch, setPitch] = useState(1.0);
  const [activeNotes, setActiveNotes] = useState({});
  const [lastPlayedNote, setLastPlayedNote] = useState('Ready');

  // Recording state
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [keyPressLog, setKeyPressLog] = useState([]);
  
  // Playback state
  const [playbackLog, setPlaybackLog] = useState(null);
  const [isPlayingSequence, setIsPlayingSequence] = useState(false);
  const [selectedDemoSong, setSelectedDemoSong] = useState('');
  
  // References
  const audioContextRef = useRef(null);
  const audioBuffersCache = useRef({});
  const activeTimeoutsRef = useRef([]);
  const recordingTimerRef = useRef(null);
  const startTimeRef = useRef(null);
  const canvasRef = useRef(null);
  const visualizerAnimRef = useRef(null);

  // Sync route param with state
  useEffect(() => {
    if (instrument) {
      const normalized = instrument.toLowerCase();
      if (['piano', 'guitar', 'drum'].includes(normalized)) {
        setSelectedInstrument(normalized);
      }
    }
  }, [instrument]);

  // Audio Context initialization
  useEffect(() => {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioContextRef.current = new AudioContextClass();
    }
    return () => {
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
      activeTimeoutsRef.current.forEach(clearTimeout);
      if (visualizerAnimRef.current) cancelAnimationFrame(visualizerAnimRef.current);
      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
    };
  }, []);

  // Pre-load audio buffer cache
  const getAudioBuffer = useCallback(async (audioSrc) => {
    if (audioBuffersCache.current[audioSrc]) {
      return audioBuffersCache.current[audioSrc];
    }
    if (!audioContextRef.current) return null;
    try {
      const response = await fetch(audioSrc);
      const arrayBuffer = await response.arrayBuffer();
      const decoded = await audioContextRef.current.decodeAudioData(arrayBuffer);
      audioBuffersCache.current[audioSrc] = decoded;
      return decoded;
    } catch (err) {
      console.warn("Could not decode buffer, falling back to Audio tag:", err);
      return null;
    }
  }, []);

  // Retrieve current instrument sound bank
  const soundBank = useMemo(() => {
    switch (selectedInstrument) {
      case 'guitar': return guitarSound;
      case 'drum': return drumSound;
      default: return pianoSound;
    }
  }, [selectedInstrument]);

  // Play audio note with polyphony, pitch, and volume
  const playAudioNote = useCallback(async (keyObj) => {
    if (!keyObj || !keyObj.audio) return;
    
    setLastPlayedNote(keyObj.noteLabel || keyObj.keyName);
    dispatch(setActiveKey(keyObj.noteLabel || keyObj.keyName));

    // Web Audio API playback
    const ctx = audioContextRef.current;
    if (ctx && ctx.state === 'suspended') {
      await ctx.resume();
    }

    if (ctx) {
      try {
        const buffer = await getAudioBuffer(keyObj.audio);
        if (buffer) {
          const source = ctx.createBufferSource();
          const gainNode = ctx.createGain();

          source.buffer = buffer;
          source.playbackRate.value = pitch;
          gainNode.gain.value = volume;

          source.connect(gainNode);
          gainNode.connect(ctx.destination);

          source.start(0);
          return;
        }
      } catch (e) {
        console.warn("Web Audio API error, falling back:", e);
      }
    }

    // HTML5 Audio fallback
    try {
      const sound = new Audio(keyObj.audio);
      sound.volume = volume;
      sound.play();
    } catch (err) {
      console.error("Playback failed:", err);
    }
  }, [dispatch, getAudioBuffer, pitch, volume]);

  // Visualizer wave loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let phase = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const activeCount = Object.values(activeNotes).filter(Boolean).length;
      const isSounding = activeCount > 0 || isPlayingSequence;

      // Draw background grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Draw dynamic waveform
      const points = 64;
      const step = canvas.width / points;
      const centerY = canvas.height / 2;

      ctx.beginPath();
      ctx.moveTo(0, centerY);

      for (let i = 0; i <= points; i++) {
        const x = i * step;
        const amplitude = isSounding ? (activeCount * 8 + 18) : 3;
        const freq = isSounding ? 0.08 : 0.03;
        const y = centerY + Math.sin(i * freq + phase) * amplitude * Math.cos(i * 0.04);
        ctx.lineTo(x, y);
      }

      ctx.strokeStyle = isSounding ? '#F48400' : 'rgba(244, 132, 0, 0.4)';
      ctx.lineWidth = isSounding ? 2.5 : 1.5;
      ctx.shadowColor = 'rgba(244, 132, 0, 0.5)';
      ctx.shadowBlur = isSounding ? 14 : 6;
      ctx.stroke();

      phase += isSounding ? 0.15 : 0.03;
      visualizerAnimRef.current = requestAnimationFrame(render);
    };

    visualizerAnimRef.current = requestAnimationFrame(render);
    return () => {
      if (visualizerAnimRef.current) cancelAnimationFrame(visualizerAnimRef.current);
    };
  }, [activeNotes, isPlayingSequence]);

  // Key Down & Up triggers
  const triggerKeyDown = useCallback((keyObj) => {
    if (!keyObj || !keyObj.keyName) return;

    setActiveNotes((prev) => ({ ...prev, [keyObj.keyName]: true }));
    playAudioNote(keyObj);

    if (isRecording) {
      const elapsed = Date.now() - startTimeRef.current;
      setKeyPressLog((prev) => [...prev, { key: keyObj.keyName, time: elapsed }]);
    }
  }, [isRecording, playAudioNote]);

  const triggerKeyUp = useCallback((keyObj) => {
    if (!keyObj || !keyObj.keyName) return;
    setActiveNotes((prev) => ({ ...prev, [keyObj.keyName]: false }));
  }, []);

  // Physical Keyboard Listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.repeat) return;
      if (['input', 'textarea'].includes(e.target.tagName.toLowerCase())) return;

      const codeStr = e.keyCode.toString();
      const whiteMatch = soundBank.whiteKeys.find((k) => k.keyValue === codeStr);
      const blackMatch = soundBank.blackKeys.find((k) => k.keyValue === codeStr && k.keyName);

      if (whiteMatch) {
        triggerKeyDown(whiteMatch);
      } else if (blackMatch) {
        triggerKeyDown(blackMatch);
      }
    };

    const handleKeyUp = (e) => {
      const codeStr = e.keyCode.toString();
      const whiteMatch = soundBank.whiteKeys.find((k) => k.keyValue === codeStr);
      const blackMatch = soundBank.blackKeys.find((k) => k.keyValue === codeStr && k.keyName);

      if (whiteMatch) {
        triggerKeyUp(whiteMatch);
      } else if (blackMatch) {
        triggerKeyUp(blackMatch);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [soundBank, triggerKeyDown, triggerKeyUp]);

  // Recording Controls
  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
    } else {
      setKeyPressLog([]);
      setRecordingDuration(0);
      startTimeRef.current = Date.now();
      setIsRecording(true);
      recordingTimerRef.current = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
    }
  };

  const downloadRecording = () => {
    if (keyPressLog.length === 0) return;
    const blob = new Blob([JSON.stringify(keyPressLog, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chordbeat_${selectedInstrument}_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Play Sequence (recorded or demo)
  const playSequence = (notesList) => {
    if (!notesList || notesList.length === 0) return;

    activeTimeoutsRef.current.forEach(clearTimeout);
    activeTimeoutsRef.current = [];

    setIsPlayingSequence(true);
    const allKeys = [...soundBank.whiteKeys, ...soundBank.blackKeys.filter((k) => k.keyName)];

    const maxTime = Math.max(...notesList.map((n) => n.time || 0));

    notesList.forEach((entry) => {
      const timeoutId = setTimeout(() => {
        const matched = allKeys.find(
          (k) =>
            k.keyName === entry.key ||
            k.noteLabel === entry.key ||
            k.keyName.replace('#', '') === entry.key.replace('#', '')
        );

        if (matched) {
          playAudioNote(matched);
          setActiveNotes((prev) => ({ ...prev, [matched.keyName]: true }));
          setTimeout(() => {
            setActiveNotes((prev) => ({ ...prev, [matched.keyName]: false }));
          }, 300);
        }
      }, entry.time);

      activeTimeoutsRef.current.push(timeoutId);
    });

    const finishTimeout = setTimeout(() => {
      setIsPlayingSequence(false);
    }, maxTime + 600);
    activeTimeoutsRef.current.push(finishTimeout);
  };

  const stopPlayback = () => {
    activeTimeoutsRef.current.forEach(clearTimeout);
    activeTimeoutsRef.current = [];
    setIsPlayingSequence(false);
    setActiveNotes({});
  };

  const handleDemoSelect = (songId) => {
    setSelectedDemoSong(songId);
    const found = demoSongs.find((s) => s.id === songId);
    if (found) {
      setPlaybackLog(found.notes);
      playSequence(found.notes);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-black flex flex-col select-none text-white selection:bg-primary selection:text-black">
      <Navbar />

      {/* Main Studio Body */}
      <div className="flex-1 flex flex-col max-w-[1600px] w-full mx-auto p-3 md:p-6 gap-4">
        
        {/* Top Studio HUD & Transport Rack */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 bg-[#121212] border border-neutral-800 p-4 rounded-2xl shadow-xl">
          
          {/* Left: Instrument Selector & Mode */}
          <div className="lg:col-span-3 flex flex-col gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
              <Layers size={13} className="text-primary" /> Active Instrument
            </span>

            <div className="grid grid-cols-3 gap-1.5 bg-black p-1 rounded-xl border border-neutral-800">
              {[
                { id: 'piano', label: 'Piano', icon: Piano },
                { id: 'guitar', label: 'Guitar', icon: Music2 },
                { id: 'drum', label: 'Drums', icon: Activity },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => {
                    setSelectedInstrument(id);
                    navigate(`/studio/${id}`, { replace: true });
                  }}
                  className={`flex flex-col items-center justify-center py-2 rounded-lg text-xs font-bold transition-all ${
                    selectedInstrument === id
                      ? 'bg-primary text-black shadow-glow-primary-sm'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                  }`}
                >
                  <Icon size={16} className="mb-1" />
                  {label}
                </button>
              ))}
            </div>

            {/* Note & Frequency Monitor */}
            <div className="flex items-center justify-between px-3 py-2 bg-black/60 rounded-xl border border-neutral-800">
              <span className="text-xs text-neutral-400">Current Key:</span>
              <span className="font-mono text-sm font-bold text-primary px-2.5 py-0.5 rounded bg-primary/10 border border-primary/30">
                {lastPlayedNote}
              </span>
            </div>
          </div>

          {/* Center: Audio Waveform Scope & Demo Songs */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                <Activity size={13} className="text-primary" /> Realtime Waveform Scope
              </span>

              {/* Demo Song Selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-400 hidden sm:inline">Song Demo:</span>
                <select
                  value={selectedDemoSong}
                  onChange={(e) => handleDemoSelect(e.target.value)}
                  className="bg-[#1A1A1A] text-white text-xs rounded-lg px-2 py-1 outline-none border border-neutral-800 hover:border-primary transition-colors cursor-pointer"
                >
                  <option value="">Select Pre-made Song</option>
                  {demoSongs.map((song) => (
                    <option key={song.id} value={song.id}>
                      {song.title} - {song.artist}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Waveform Canvas */}
            <div className="relative w-full h-20 bg-black rounded-xl overflow-hidden border border-neutral-800 flex items-center justify-center">
              <canvas
                ref={canvasRef}
                width={500}
                height={80}
                className="w-full h-full block"
              />
              <div className="absolute top-1 left-2 text-[10px] font-mono text-neutral-500">
                CHORDBEAT / SCOPE
              </div>
            </div>
          </div>

          {/* Right: Master Sliders & Recording Transport */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
              <Sliders size={13} className="text-primary" /> Master Controls & Takes
            </span>

            {/* Sliders Grid */}
            <div className="grid grid-cols-2 gap-3 bg-black/60 p-2.5 rounded-xl border border-neutral-800">
              {/* Volume */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-400 flex items-center gap-1">
                    <Volume2 size={12} /> Vol
                  </span>
                  <span className="font-mono text-white">{Math.round(volume * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.02"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              {/* Pitch */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-400">Pitch</span>
                  <span className="font-mono text-white">{pitch.toFixed(2)}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2.0"
                  step="0.05"
                  value={pitch}
                  onChange={(e) => setPitch(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>
            </div>

            {/* Transport Action Buttons */}
            <div className="flex items-center gap-2">
              {/* Record Toggle */}
              <button
                onClick={toggleRecording}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  isRecording
                    ? 'bg-red-600 text-white shadow-lg animate-pulse'
                    : 'bg-[#181818] text-white hover:bg-neutral-800 border border-neutral-800'
                }`}
              >
                {isRecording ? <Square size={13} className="fill-white" /> : <Circle size={13} className="text-red-500 fill-red-500" />}
                {isRecording ? `REC ${formatTime(recordingDuration)}` : 'Record Take'}
              </button>

              {/* Playback Sequence */}
              {isPlayingSequence ? (
                <button
                  onClick={stopPlayback}
                  className="flex-1 py-2 px-3 rounded-xl text-xs font-bold bg-primary text-black shadow-glow-primary flex items-center justify-center gap-1.5"
                >
                  <Square size={13} className="fill-black" /> Stop
                </button>
              ) : (
                <button
                  onClick={() => playSequence(playbackLog || (keyPressLog.length ? keyPressLog : null))}
                  disabled={!playbackLog && keyPressLog.length === 0}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    playbackLog || keyPressLog.length > 0
                      ? 'bg-primary text-black shadow-glow-primary hover:bg-primary-hover'
                      : 'bg-[#141414] text-neutral-600 border border-neutral-800 cursor-not-allowed'
                  }`}
                >
                  <Play size={13} className="fill-current" /> Play Take
                </button>
              )}

              {/* Export Button */}
              {keyPressLog.length > 0 && !isRecording && (
                <button
                  onClick={downloadRecording}
                  title="Export Take (.json)"
                  className="p-2 rounded-xl bg-[#181818] text-primary hover:bg-primary hover:text-black border border-neutral-800 transition-colors"
                >
                  <Download size={15} />
                </button>
              )}
            </div>

          </div>

        </div>

        {/* Studio Workspace & Interactive Piano Roll */}
        <div className="flex-1 bg-[#121212] border border-neutral-800 p-4 md:p-6 rounded-2xl flex flex-col justify-between gap-4 shadow-xl">
          
          {/* Top Bar above Keyboard: Quick Guide */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-neutral-400 pb-2 border-b border-neutral-800 gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
              <span className="font-bold text-white uppercase tracking-wider">
                Virtual {selectedInstrument} Keyboard
              </span>
              <span className="text-neutral-400 text-[11px] hidden md:inline">
                (Click or use your physical computer keyboard)
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-[11px]">
                <kbd className="px-1.5 py-0.5 rounded bg-black border border-neutral-800 text-white font-mono">A-J</kbd> Naturals
              </span>
              <span className="flex items-center gap-1 text-[11px]">
                <kbd className="px-1.5 py-0.5 rounded bg-black border border-neutral-800 text-white font-mono">W,E,T,Y,U</kbd> Sharps/Flats
              </span>
            </div>
          </div>

          {/* Seamless Mathematical Piano Keyboard */}
          <div className="relative w-full h-[260px] md:h-[320px] select-none py-2">
            
            {/* White Keys Row (Natural Notes) */}
            <div className="relative flex flex-row w-full h-full">
              {soundBank.whiteKeys.map((keyObj, index) => {
                const isPressed = activeNotes[keyObj.keyName];
                return (
                  <div
                    key={`white-${index}`}
                    onMouseDown={() => triggerKeyDown(keyObj)}
                    onMouseUp={() => triggerKeyUp(keyObj)}
                    onMouseLeave={() => triggerKeyUp(keyObj)}
                    style={{ width: `${100 / soundBank.whiteKeys.length}%` }}
                    className={`relative h-full rounded-b-xl cursor-pointer border-r border-neutral-300 transition-all duration-75 flex flex-col justify-end items-center pb-4 ${
                      isPressed
                        ? 'bg-gradient-to-t from-primary to-amber-300 text-black shadow-glow-primary translate-y-1'
                        : 'bg-gradient-to-b from-neutral-100 via-white to-neutral-200 text-black shadow-[0_6px_0_#999999,0_10px_15px_rgba(0,0,0,0.6)] hover:bg-neutral-50'
                    }`}
                  >
                    {/* Note Label */}
                    <span className="font-extrabold text-sm md:text-base tracking-tight mb-1">
                      {keyObj.keyName}
                    </span>
                    {/* Keyboard Hint Pill */}
                    {keyObj.keyboardKey && (
                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
                        isPressed ? 'bg-black/20 text-black' : 'bg-neutral-300 text-neutral-800'
                      }`}>
                        {keyObj.keyboardKey}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Black Keys Layer (Sharps / Flats) */}
            {soundBank.blackKeys.map((keyObj, index) => {
              const seamIndex = BLACK_KEY_SEAM_OFFSETS[index];
              if (seamIndex === null || seamIndex === undefined || !keyObj.keyName) {
                return null;
              }

              const isPressed = activeNotes[keyObj.keyName];
              const totalWhiteKeys = soundBank.whiteKeys.length;
              const leftPercentage = ((seamIndex + 1) / totalWhiteKeys) * 100;
              const keyWidthPercentage = (1 / totalWhiteKeys) * 100 * 0.68;

              return (
                <div
                  key={`black-${index}`}
                  onMouseDown={() => triggerKeyDown(keyObj)}
                  onMouseUp={() => triggerKeyUp(keyObj)}
                  onMouseLeave={() => triggerKeyUp(keyObj)}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: `${leftPercentage}%`,
                    width: `${keyWidthPercentage}%`,
                    height: '62%',
                    transform: 'translateX(-50%)',
                    zIndex: 20,
                  }}
                  className={`rounded-b-lg cursor-pointer border-x border-b border-black flex flex-col justify-end items-center pb-3 transition-all duration-75 ${
                    isPressed
                      ? 'bg-gradient-to-t from-primary to-amber-300 text-black shadow-glow-primary translate-y-1'
                      : 'bg-gradient-to-b from-neutral-900 via-black to-neutral-950 text-neutral-300 shadow-[0_5px_0_#050505,0_10px_20px_rgba(0,0,0,0.9)] hover:bg-neutral-800'
                  }`}
                >
                  <span className={`font-bold text-[11px] md:text-xs mb-0.5 ${
                    isPressed ? 'text-black font-extrabold' : 'text-primary'
                  }`}>
                    {keyObj.noteLabel || keyObj.keyName}
                  </span>
                  {keyObj.keyboardKey && (
                    <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-neutral-800 text-neutral-400 font-bold">
                      {keyObj.keyboardKey}
                    </span>
                  )}
                </div>
              );
            })}

          </div>

          {/* Bottom Custom File Track Upload */}
          <div className="pt-2 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="w-full sm:w-auto flex-1">
              <FileUploadComponent
                onFileUpload={(parsed) => {
                  setPlaybackLog(parsed);
                }}
              />
            </div>
            {playbackLog && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-primary font-bold">
                  ✓ Track Loaded ({playbackLog.length} notes)
                </span>
                <button
                  onClick={() => playSequence(playbackLog)}
                  className="px-3.5 py-1.5 rounded-lg bg-primary hover:bg-primary-hover text-xs font-bold text-black shadow-glow-primary flex items-center gap-1"
                >
                  <Play size={12} className="fill-black" /> Play Track
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default Studio;

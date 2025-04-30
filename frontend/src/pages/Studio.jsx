import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import InstrumentControl from '../components/InstrumentControl';
import { useSelector, useDispatch } from "react-redux";
import Loading from '../components/Loading';
import { setActiveKey } from '../redux/reducers/generalSlice';
import pianoSound from '../constants/Audio/piano';
import guitarSound from '../constants/Audio/guitar';
import violinSound from '../constants/Audio/guitar'; // Fixed: Changed from guitar to violin
import WhiteKey from '../components/whiteKey'; // Import WhiteKey
import BlackKey from '../components/blackKey';
import FileUploadComponent from '../components/FileUploadComponent';

const Studio = () => {
    const dispatch = useDispatch();
    const appLoad = useSelector((state) => state.general.appLoading);
    const activeKey = useSelector((state) => state.general.activeKey);
    const [activeKeyNow, setActiveKeyNow] = useState('press any key');
    const [isRecording, setIsRecording] = useState(false);
    const [keyPressLog, setKeyPressLog] = useState([]);
    const [playbackLog, setPlaybackLog] = useState(null);
    const [isSoundPlaying, setIsSoundPlaying] = useState(false);
    const [selectedInstrument, setSelectedInstrument] = useState('Piano');

    const startTimeRef = useRef(null);
    
    // Add volume and pitch control state
    const [volume, setVolume] = useState(1.0); // Default volume (0.0 to 1.0)
    const [pitch, setPitch] = useState(1.0); // Default pitch (0.5 to 2.0)
    
    // State to track which keys are currently being clicked
    const [clickedKeys, setClickedKeys] = useState({});

    // Audio context for pitch control
    const audioContextRef = useRef(null);
    
    useEffect(() => {
        // Initialize audio context
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        
        return () => {
            // Clean up audio context if needed
            if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
                audioContextRef.current.close();
            }
        };
    }, []);

    const playAudio = (audioSrc) => {
        // Create a new audio element
        const sound = new Audio(audioSrc);
        
        // Set volume
        sound.volume = volume;
        
        // If pitch is default (1.0), play normally
        if (pitch === 1.0) {
            sound.play();
            return;
        }
        
        // For pitch control, we need to use Web Audio API
        const audioContext = audioContextRef.current;
        
        // Create source node
        const source = audioContext.createBufferSource();
        const gainNode = audioContext.createGain();
        
        // Set volume on gain node
        gainNode.gain.value = volume;
        
        // Connect nodes
        source.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Set playback rate (pitch)
        source.playbackRate.value = pitch;
        
        // Load and decode the audio file
        fetch(audioSrc)
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
            .then(audioBuffer => {
                source.buffer = audioBuffer;
                source.start(0);
            })
            .catch(error => console.error('Error loading audio:', error));
    };

    const startRecording = () => {
        setKeyPressLog([]); // Clear previous log
        startTimeRef.current = Date.now(); // Record the start time
        setIsRecording(true);
    };

    const stopRecording = () => {
        setIsRecording(false);

        // Save the key press log as a JSON file
        const blob = new Blob([JSON.stringify(keyPressLog, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'key_press_log.json';
        a.click();
    };

    const logKeyPress = (keyName) => {
        if (isRecording) {
            const currentTime = Date.now();
            const timeElapsed = currentTime - startTimeRef.current; // Time since recording started
            setKeyPressLog((prevLog) => [
                ...prevLog,
                { key: keyName, time: timeElapsed }
            ]);
        }
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target.result;
                setPlaybackLog(JSON.parse(content));
            };
            reader.readAsText(file);
        }
    };

    const playRecordedSequence = () => {
        if (!playbackLog || playbackLog.length === 0) return;

        const instrumentKeys = getInstrumentKeys();
        
        playbackLog.forEach((entry, index) => {
            setTimeout(() => {
                const key = instrumentKeys.whiteKeys.concat(instrumentKeys.blackKeys).find(k => k.keyName === entry.key);
                if (key) {
                    playAudio(key.audio);
                    setActiveKeyNow(key.keyName);
                    dispatch(setActiveKey(key.keyName));
                }
            }, entry.time); // Use the absolute time from the log
        });
    };

    const getInstrumentKeys = () => {
        switch (selectedInstrument) {
            case 'Guitar':
                return guitarSound;
            case 'Piano':
                return pianoSound;
            case 'Violin':
                return violinSound;
            default:
                return pianoSound;
        }
    };  
    
    const handleInstrumentSelect = (instrument) => {
        console.log('Selected Instrument:', instrument);
        setSelectedInstrument(instrument);
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            const pressedKey = event.keyCode.toString();
            const instrumentKeys = getInstrumentKeys();

            const whiteNote = instrumentKeys.whiteKeys.find(key => key.keyValue === pressedKey);
            const blackNote = instrumentKeys.blackKeys.find(key => key.keyValue === pressedKey);

            if (whiteNote) {
                setActiveKeyNow(whiteNote.keyName);
                dispatch(setActiveKey(whiteNote.keyName));
                playAudio(whiteNote.audio);
                logKeyPress(whiteNote.keyName);

                setClickedKeys(prevState => ({
                    ...prevState,
                    [whiteNote.keyValue]: true
                }));

            } else if (blackNote) {
                setActiveKeyNow(blackNote.keyName);
                dispatch(setActiveKey(blackNote.keyName));
                playAudio(blackNote.audio);
                logKeyPress(blackNote.keyName);

                setClickedKeys(prevState => ({
                    ...prevState,
                    [blackNote.keyValue]: true
                }));
            }
        };

        const handleKeyUp = (event) => {
            const releasedKey = event.keyCode.toString();
            const instrumentKeys = getInstrumentKeys();

            const whiteNote = instrumentKeys.whiteKeys.find(key => key.keyValue === releasedKey);
            const blackNote = instrumentKeys.blackKeys.find(key => key.keyValue === releasedKey);

            if (whiteNote) {
                setClickedKeys(prevState => ({
                    ...prevState,
                    [whiteNote.keyValue]: false
                }));
            } else if (blackNote) {
                setClickedKeys(prevState => ({
                    ...prevState,
                    [blackNote.keyValue]: false
                }));
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, [isRecording, volume, pitch, selectedInstrument]); // Added selectedInstrument to dependencies
    
    const ActiveKey = (note) => {
        setActiveKey(note);
        setTimeout(() => {
            setActiveKey(null);
            console.log("Key cleared");
        }, 2000); // 2 seconds (2000 ms)
        console.log("Key Logged");
    };
    
    console.log("AK:", activeKey);
       
    const handleMouseDown = (keyObj) => {
        ActiveKey(keyObj.keyName)
        dispatch(setActiveKey(keyObj.keyName));
        playAudio(keyObj.audio);
        logKeyPress(keyObj.keyName);

        setClickedKeys(prevState => ({
            ...prevState,
            [keyObj.keyValue]: true
        }));
    };

    const handleMouseUp = (keyObj) => {
        setClickedKeys(prevState => ({
            ...prevState,
            [keyObj.keyValue]: false
        }));
    };

    const renderKeyboard = () => {
        const instrumentKeys = getInstrumentKeys();
        
        return (
            <>
                <div className='bg-gray-900 h-[300px] p-0 flex flex-row '>
                    {instrumentKeys.whiteKeys.map((keyObj, index) => (
                        <div
                            onMouseDown={() => handleMouseDown(keyObj)}
                            onMouseUp={() => handleMouseUp(keyObj)}
                            key={index}
                            className={`flex items-end justify-center w-full h-full rounded-br-lg rounded-bl-lg cursor-pointer border border-black mx-0 ${clickedKeys[keyObj.keyValue] ? 'bg-red-500' : 'bg-white'}`}
                        >
                            <p className='text-black select-none text-center poppins-bold text-lg'>{keyObj.keyName}</p>
                        </div>
                    ))}
                </div>

                <div className='flex flex-row mx-10 absolute px-12 bottom-24 ml-0 w-5/6 h-[203px]'>
                    {instrumentKeys.blackKeys.map((keyObj, index) => (
                        <div
                            onMouseDown={() => handleMouseDown(keyObj)}
                            onMouseUp={() => handleMouseUp(keyObj)}
                            key={index}
                            className={`flex items-end justify-center w-[90%] h-full rounded-br-lg rounded-bl-lg mx-4 cursor-pointer  ${keyObj.keyName.length === 0 ? 'bg-transparent' : 'bg-black'} ${clickedKeys[keyObj.keyValue] ? 'bg-red-500' : 'bg-black'}`}
                        >
                            <p className='select-none text-green text-center poppins-bold text-lg'>{keyObj.keyName}</p>
                        </div>
                    ))}
                </div>
            </>
        );
    };

    return (
        <div className='bg-[#0A0A0A] h-screen flex flex-col'>
            <Navbar />
            <div className='flex flex-row h-[94vh] justify-between'>
                <div className='text-white flex flex-col w-1/6 bg-gray-900'>
                    <div>
                        <p className='text-white poppins-regular p-2 select-none'>Control panel</p>
                    </div>
                    <div className='flex flex-col p-1 gap-2'>
                        <InstrumentControl onInstrumentSelect={handleInstrumentSelect} />
                        
                        {/* Volume Control */}
                        <div className="p-2 bg-gray-800 rounded">
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Volume: {Math.round(volume * 100)}%
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={volume}
                                onChange={(e) => setVolume(parseFloat(e.target.value))}
                                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>
                        
                        {/* Pitch Control */}
                        <div className="p-2 bg-gray-800 rounded">
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Pitch: {Math.round(pitch * 100)}%
                            </label>
                            <input
                                type="range"
                                min="0.5"
                                max="2"
                                step="0.01"
                                value={pitch}
                                onChange={(e) => setPitch(parseFloat(e.target.value))}
                                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>
                        
                        {/* Recording Controls */}
                        <button
                            onClick={isRecording ? stopRecording : startRecording}
                            className={`p-2 ${isRecording ? 'bg-red-500' : 'bg-green-500'} text-white rounded`}
                        >
                            {isRecording ? 'Stop Recording' : 'Start Recording'}
                        </button>
                        
                        {/* File Upload */}
                        <div className="p-2 bg-gray-800 rounded">
                            <FileUploadComponent
                                onFileUpload={(parsedContent) => {
                                    if (parsedContent) {
                                        setPlaybackLog(parsedContent);
                                    } else {
                                        setPlaybackLog(null);
                                    }
                                }} 
                            />
                        </div>
                        
                        {/* Playback Button */}
                        <button
                            onClick={playRecordedSequence}
                            className="p-2 bg-purple-500 text-white rounded"
                            disabled={!playbackLog}
                        >
                            Play Recorded Sequence
                        </button>
                    </div>
                </div>
                <div className='text-white w-5/6 flex flex-col'>
                    <h1 className='text-8xl p-10 text-center poppins-regular'>{activeKey}</h1>
                    <div className='flex-grow'></div>
                    <div className='w-full bg-[#080808] rounded-tr-lg rounded-tl-lg h-20 flex flex-row'>
                        <p className='text-gray-200 poppins-bold p-2'>VIRTUAL INSTRUMENT: {selectedInstrument.toUpperCase()}</p>
                    </div>
                    {renderKeyboard()}
                </div>
            </div>
        </div>
    );
};

export default Studio;
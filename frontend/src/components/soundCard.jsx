import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Square, MoreVertical, Music, ExternalLink, Check } from 'lucide-react';

let activeAudioInstance = null;

const SoundCard = ({ name, image, audio }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const audioRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const stopSound = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    if (activeAudioInstance && activeAudioInstance.stop === stopSound) {
      activeAudioInstance = null;
    }
  }, []);

  const togglePlay = (e) => {
    e.stopPropagation();
    if (isPlaying) {
      stopSound();
      return;
    }

    if (activeAudioInstance) {
      activeAudioInstance.stop();
    }

    if (!audioRef.current && audio) {
      audioRef.current = new Audio(audio);
      audioRef.current.onended = () => setIsPlaying(false);
    }

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          activeAudioInstance = { stop: stopSound };
        })
        .catch((err) => console.warn("Audio play failed:", err));
    }
  };

  const handleOpenStudio = () => {
    stopSound();
    const instrumentPath = name.toLowerCase().replace(/\s+/g, '-');
    navigate(`/studio/${instrumentPath}`);
  };

  const handleSaveDefault = (e) => {
    e.stopPropagation();
    localStorage.setItem('selectedInstrument', JSON.stringify({ name, audio, image }));
    setShowMenu(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showMenu && menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      stopSound();
    };
  }, [showMenu, stopSound]);

  return (
    <div className="relative group">
      <div
        onClick={handleOpenStudio}
        className={`p-3.5 rounded-2xl flex flex-col justify-between cursor-pointer transition-all duration-200 hover:-translate-y-1 border ${
          isPlaying 
            ? 'border-primary shadow-glow-primary bg-[#1C1C1C]' 
            : 'bg-[#141414] border-neutral-800 hover:border-primary/50'
        }`}
      >
        {/* Card Image Banner */}
        <div className="relative w-full h-36 rounded-xl overflow-hidden bg-black flex items-center justify-center mb-3">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

          {/* Quick Play Audio Button */}
          <button
            onClick={togglePlay}
            className={`absolute bottom-2.5 left-2.5 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
              isPlaying
                ? 'bg-primary text-black font-bold shadow-glow-primary scale-105'
                : 'bg-black/80 hover:bg-primary text-white hover:text-black backdrop-blur-sm'
            }`}
            title={isPlaying ? "Stop preview" : "Play preview"}
          >
            {isPlaying ? <Square size={14} className="fill-black" /> : <Play size={14} className="fill-current ml-0.5" />}
          </button>

          {/* 3-dot Menu Icon */}
          <div
            ref={menuRef}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 hover:bg-black/90 flex items-center justify-center text-white cursor-pointer transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
          >
            <MoreVertical size={14} />
          </div>
        </div>

        {/* Card Info & Status */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <h4 className="text-sm font-bold text-white group-hover:text-primary transition-colors">
              {name}
            </h4>
            <span className="text-[11px] text-neutral-400 flex items-center gap-1 mt-0.5">
              <Music size={11} className="text-primary" /> Virtual Preset
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {isPlaying ? (
              <span className="flex items-center gap-1 text-[11px] text-primary font-bold">
                <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                Playing
              </span>
            ) : (
              <span className="p-1.5 rounded-lg bg-[#202020] text-neutral-400 group-hover:text-black group-hover:bg-primary transition-colors">
                <ExternalLink size={13} />
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Dropdown Menu */}
      {showMenu && (
        <div className="absolute top-12 right-2 w-44 rounded-xl bg-[#1A1A1A] shadow-2xl py-1.5 z-50 text-xs border border-neutral-700">
          <button
            onClick={handleSaveDefault}
            className="w-full text-left px-3.5 py-2 text-white hover:bg-neutral-800 hover:text-primary transition-colors flex items-center gap-2"
          >
            <Check size={13} className="text-primary" /> Set as Default
          </button>
          <button
            onClick={handleOpenStudio}
            className="w-full text-left px-3.5 py-2 text-white hover:bg-neutral-800 hover:text-primary transition-colors flex items-center gap-2"
          >
            <ExternalLink size={13} className="text-primary" /> Open in Studio
          </button>
        </div>
      )}

      {/* Save Success Toast */}
      {savedSuccess && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-black font-bold text-[11px] rounded-full shadow-glow-primary animate-in fade-in z-50 whitespace-nowrap">
          ✓ Default preset saved!
        </div>
      )}
    </div>
  );
};

export default SoundCard;

import React, { useState, useEffect, useRef } from 'react';

// Global audio context to manage all sounds
let activeAudio = null;

const SoundCard = ({ name, image, audio }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const audioRef = useRef(null);
    const timerRef = useRef(null);
    const menuRef = useRef(null);

    // Clean up function to stop audio and clear timers
    const stopSound = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        setIsPlaying(false);
    };

    // Handle card click to play/stop sound
    const handlePlay = () => {
        // If this sound is already playing, stop it
        if (isPlaying) {
            stopSound();
            return;
        }

        // Stop any currently playing sound
        if (activeAudio) {
            activeAudio.stopSound();
        }

        // Create and play new audio
        const sound = new Audio(audio);
        audioRef.current = sound;
        sound.play();
        
        // Set this as the active audio globally
        activeAudio = { stopSound };
        
        // Update state
        setIsPlaying(true);
        
        // Set timeout to stop after 10 seconds
        timerRef.current = setTimeout(() => {
            stopSound();
        }, 10000);
    };

    // Toggle menu visibility
    const toggleMenu = (e) => {
        e.stopPropagation(); // Prevent triggering the card's onClick
        setShowMenu(!showMenu);
    };

    // Handle "Use this instrument" option
    const handleUseInstrument = (e) => {
        e.stopPropagation(); // Prevent triggering the card's onClick
        // You can add routing or state management here
        // For example, save to localStorage or Redux
        localStorage.setItem('selectedInstrument', JSON.stringify({ name, audio, image }));
        setShowMenu(false);
        
        // Show a toast or notification
        alert(`${name} selected as your instrument!`);
    };

    // Handle "Send feedback" option
    const handleSendFeedback = (e) => {
        e.stopPropagation(); // Prevent triggering the card's onClick
        setShowMenu(false);
        
        // You can implement a feedback modal or form here
        const feedback = prompt(`Please enter your feedback for ${name}:`);
        if (feedback) {
            // Send feedback to your backend or service
            console.log(`Feedback for ${name}: ${feedback}`);
            alert("Thank you for your feedback!");
        }
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showMenu && menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showMenu]);

    // Clean up when component unmounts
    useEffect(() => {
        return () => {
            stopSound();
            if (activeAudio && activeAudio.stopSound === stopSound) {
                activeAudio = null;
            }
        };
    }, []);

    return (
        <div className="relative">
            <div 
                className={`flex flex-col items-center justify-center p-4 rounded-lg cursor-pointer transition-all duration-300 ${isPlaying ? 'bg-purple-800' : 'bg-gray-900'} hover:bg-gray-700`}
                onClick={handlePlay}
            >
                <div className="w-full h-36 overflow-hidden rounded-md mb-2 relative">
                    <img 
                        src={image} 
                        alt={name} 
                        className="w-full h-full object-cover"
                    />
                    {/* 3-dot menu icon */}
                    <div 
                        className="absolute top-2 right-2 w-8 h-8 bg-black bg-opacity-60 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-80"
                        onClick={toggleMenu}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                    </div>
                </div>
                <div className="flex items-center justify-between w-full">
                    <p className="text-white poppins-bold">{name}</p>
                    <div className={`w-3 h-3 rounded-full ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></div>
                </div>
            </div>

            {/* Dropdown Menu */}
            {showMenu && (
                <div 
                    ref={menuRef}
                    className="absolute top-12 right-2 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-50 w-48"
                >
                    <ul>
                        <li 
                            className="px-4 py-2 hover:bg-purple-700 text-white cursor-pointer border-b border-gray-700"
                            onClick={handleUseInstrument}
                        >
                            Use this instrument
                        </li>
                        <li 
                            className="px-4 py-2 hover:bg-purple-700 text-white cursor-pointer"
                            onClick={handleSendFeedback}
                        >
                            Send feedback
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SoundCard;
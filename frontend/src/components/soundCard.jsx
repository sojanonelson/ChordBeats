import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// Global audio management
let activeAudio = null;

const SoundCard = ({ name, image, audio }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const audioRef = useRef(null);
    const timerRef = useRef(null);
    const menuRef = useRef(null);
    const navigate = useNavigate();

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
        
        // Clear the active audio if it's this instance
        if (activeAudio && activeAudio.stopSound === stopSound) {
            activeAudio = null;
        }
    };

    const handleMouseEnter = () => {
        if (!hasInteracted) return;

        // Stop any currently playing audio
        if (activeAudio) {
            activeAudio.stopSound();
        }

        try {
            if (!audioRef.current) {
                audioRef.current = new Audio(audio);
                audioRef.current.loop = false;
            }

            // Play the audio
            audioRef.current.currentTime = 0;
            audioRef.current.play()
                .then(() => {
                    setIsPlaying(true);
                    // Set this as the active audio
                    activeAudio = { stopSound };
                    
                    // Set timeout to stop the sound after 10 seconds
                    timerRef.current = setTimeout(() => {
                        stopSound();
                    }, 10000);
                })
                .catch(error => {
                    console.warn('Audio play failed:', error);
                });
        } catch (error) {
            console.warn('Audio initialization failed:', error);
        }
    };

    // Handle card mouse leave to stop sound
    const handleMouseLeave = () => {
        stopSound();
    };

    // Handle card click to navigate to instrument page
    const handleClick = () => {
        setHasInteracted(true);
        const instrumentPath = name.toLowerCase().replace(/\s+/g, '-');
        navigate(`/studio/${instrumentPath}`);
    };

    // Toggle menu visibility
    const toggleMenu = (e) => {
        e.stopPropagation();
        setShowMenu(!showMenu);
    };

    // Handle "Use this instrument" option
    const handleUseInstrument = (e) => {
        e.stopPropagation();
        localStorage.setItem('selectedInstrument', JSON.stringify({ name, audio, image }));
        setShowMenu(false);
        alert(`${name} selected as your instrument!`);
    };

    // Handle "Send feedback" option
    const handleSendFeedback = (e) => {
        e.stopPropagation();
        setShowMenu(false);
        const feedback = prompt(`Please enter your feedback for ${name}:`);
        if (feedback) {
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
        };
    }, []);

    // Set hasInteracted to true on first user interaction
    useEffect(() => {
        const handleFirstInteraction = () => {
            setHasInteracted(true);
            document.removeEventListener('click', handleFirstInteraction);
            document.removeEventListener('keydown', handleFirstInteraction);
        };

        document.addEventListener('click', handleFirstInteraction);
        document.addEventListener('keydown', handleFirstInteraction);

        return () => {
            document.removeEventListener('click', handleFirstInteraction);
            document.removeEventListener('keydown', handleFirstInteraction);
        };
    }, []);

    return (
        <div className="relative">
            <div
                className={`flex flex-col items-center justify-center p-4 rounded-lg cursor-pointer transition-all duration-300 ${isPlaying ? 'bg-purple-800' : 'bg-gray-900'} hover:bg-gray-700`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
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
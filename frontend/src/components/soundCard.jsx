import React, { useState, useEffect } from 'react';

const SoundCard = ({ name, image, audio }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  let sound;

  useEffect(() => {
    const handleDocumentMouseUp = () => {
      if (isPlaying) {
        handleStop();
      }
    };

    document.addEventListener('mouseup', handleDocumentMouseUp);

    return () => {
      document.removeEventListener('mouseup', handleDocumentMouseUp);
    };
  }, [isPlaying]);

  const handlePlay = () => {
    sound = new Audio(audio);
    sound.play();
    setIsPlaying(true);
  };

  const handleStop = () => {
    if (sound) {
      sound.pause();
      sound.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return (
    <div
      className="sound-card justify-center items-center flex flex-col transition-all"
      onMouseDown={handlePlay}
      onTouchStart={handlePlay}
    >
      <img className="cursor-pointer" src={image} alt={name} />
      <h3 className={`px-2 lg:my-1 text-sm lg:text-lg poppins-regular text-white`}>
        {name}
      </h3>
    </div>
  );
};

export default SoundCard;

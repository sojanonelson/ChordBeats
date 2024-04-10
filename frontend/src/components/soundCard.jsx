import React, { useState } from 'react';

const SoundCard = ({ name, image }) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <div className="sound-card justify-center items-center flex flex-col transition-all " onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <img className=" cursor-pointer" src={image} alt={name} />
      {hovered && (
        <div className="play-button-overlay px-0 justify-center items-center flex">
          <button className='bg-gray-700 text-white poppins-bold p-1 px-2 rounded-md'>Play</button>
        </div>
      )}
      <h3 className={`px-2 lg:my-1 text-sm lg:text-lg poppins-regular text-white ${hovered ? 'hidden' : ''}`}>
        {name}
      </h3>
    </div>
  );
};

export default SoundCard;

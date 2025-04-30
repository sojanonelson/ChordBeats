import React from 'react';

const HomeAlbumCard = ({ image, title }) => {
  return (
    <div 
      className='flex flex-col items-center cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105' 
      onClick={() => console.log("clicked", title)}
    >
      <img 
        src={image} 
        alt='album' 
        className='lg:w-[300px] w-[200px] h-full object-cover rounded-full transition-all duration-300 ease-in-out' 
      />
      <p className='text-lg text-white poppins-regular py-2 transition-opacity duration-300 hover:opacity-80'>
        {title}
      </p>
    </div>
  );
}

export default HomeAlbumCard;

import React from 'react';
import { Link } from 'react-router-dom';

const Notfound = () => {
  const backgroundStyle = {
    backgroundImage: "url('https://images.pexels.com/photos/3998488/pexels-photo-3998488.jpeg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    
    
  };

  return (
    <div className='flex justify-center items-center h-screen bg-black text-white flex-col' style={backgroundStyle}>
        <h1 className='text-[200px] text-white poppins-bold'>404</h1>
      <h1 className='text-6xl text-white poppins-bold animate-pulse'>PAGE NOT FOUND</h1>
     <Link className='py-10 ' to='/'><p>Back to home</p></Link> 
    </div>
  );
};

export default Notfound;

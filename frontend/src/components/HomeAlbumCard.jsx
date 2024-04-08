import React from 'react'

const HomeAlbumCard = ({image,title}) => {
    
  return (
    <div className='flex flex-col items-center cursor-pointer' onClick={()=> console.log("clicked", title)}>
        <img src={image} alt='album' className='lg:w-[300px] w-[200px] h-full object-cover rounded-lg  ' />
        <p className='text-lg text-white poppins-regular py-2'>{title}</p>
    </div>
  )
}

export default HomeAlbumCard 
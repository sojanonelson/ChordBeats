import React from 'react'

const Tools = ({image, index, name, descrption}) => {
  return (
    <div key={index} className='flex flex-col  items-center p-2  py-5 lg:py-10 cursor-pointer'>
    <img src={image} alt='instrument' className=' w-2/3 rounded-sm  '/>
    <p className='text-white poppins-bold pt-2 text-sm lg:text-lg  lg:block '>{name}</p>
    <p className='text-white pt-2 hidden lg:block text-sm  poppins-regular text-center '>{descrption}</p>
</div>
  )
}

export default Tools
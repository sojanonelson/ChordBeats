import React from 'react'
import { Images } from '../constants'


const Footer = () => {
  return (
    <div className='bg-black lg:px-20 pt-10 border-t-4 border-primary flex flex-col lg:flex-row lg:justify-between justify-center items-center'>
        <div className='First'>
        <div className='flex  flex-row gap-2 py-8 items-center'>
            <div>
                <img className='w-12 h-12' alt='logo' src={Images.LOGO}/>
            </div>
            <div className='flex flex-col'>
                <h1 className='text-white poppins-bold text-lg '>ChordBest</h1>
                <p className=' text-white poppins-regular'>Your Digital Beat Studio</p>
            </div>
           

        </div>
        <div className='items-center'>
                <p className='text-white poppins-thin text-md'>All right reserverd @2024</p>
            </div>
        </div>
        <div className='Second flex flex-col '>
            <p className='poppins-regular text-white'>SUBSCRIBE TO CHORDBEAT</p>
            <div className='justify-center flex'>
            <input placeholder='YOUR EMAIL' className='outline-none rounded-tl-md rounded-bl-md py-2 px-3'/>
            <button className='p-2 px-4 runded-tr-lg rounded-tr-md rounded-br-md  bg-primary'>


            </button>
            </div>
            <div className='flex flex-row items-center gap-6 p-2'> 
            <a href='https://www.instagram.com/sojxnn'><p className='text-white'>Made with  &hearts; by sojan</p></a>
            

            
            </div>

        </div>
    </div>
  )
}

export default Footer

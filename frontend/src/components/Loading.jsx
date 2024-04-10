import React from 'react'
import { Images } from '../constants'

const Loading = () => {
  return (
    <div className='flex  flex-col items-center justify-center h-[93vh] bg-gray-800'>
        <img src={Images.LOGO} alt="logo" className='animate-spin w-25 mx-auto my-2'/>
        <p className='animate-pulse text-white poppins-regular '>Please wait</p>

    </div>
  )
}

export default Loading
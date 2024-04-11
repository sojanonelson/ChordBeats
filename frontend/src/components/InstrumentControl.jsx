import React from 'react'
import { Images } from '../constants'

const InstrumentControl = () => {
  return (
    <div className='w-full p-1 bg-black rounded-md flex flex-col h-[90px] '>
        <p>Instrument</p>
        <div className='flex flex-row items-center justify-between p-2 py-5'>
            <div className='flex flex-row items-center gap-2'>
            <img src={Images.DOT1} alt='instrument-active' className='w-2 h-2' />
            <p className='text-white poppins-medium text-sm'>Piano</p>
            </div>

            <div className='flex flex-row gap-2 items-center'>
            
            <img src={Images.SPEAKER} alt='speaker' className=' h-5' />
            <img src={Images.DOT2} alt='active' className='w-2 h-2'/>

            </div>
         
           

        </div>
    </div>
  )
}

export default InstrumentControl
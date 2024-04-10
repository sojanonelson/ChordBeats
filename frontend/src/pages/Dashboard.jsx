import React from 'react'
import Navbar from '../components/Navbar'
import {useSelector} from "react-redux"
import SoundCard from '../components/soundCard'
import { Sounds } from '../constants'
import AppLoad from "../components/Loading"
const Dashboard = () => {

    const userData = useSelector((state)=> state.user.user)
    const AppLoading = useSelector((state) => state.general.appLoading);
    console.log("AppLoading", AppLoading)
    console.log("Dashboard", userData)
  return (
    <div className='h-screen w-full bg-gray-800'>
        <Navbar/>
        
        { AppLoading ? (<AppLoad/>) : ( <div className='flex flex-row justify-between'>
            <div className='w-1/5 bg-[#1A1A1A] h-[94vh] items-center flex flex-col lg:p-5 ' >
                <button className='bg-primary m-2 lg:p-2 text-black text-sm poppins-bold lg:w-full rounded-md'>New project</button>
                <div className='flex flex-col'>
                    <div className='flex flex-row items-center py-5 gap-2'>
                       { userData.profileImage && <img className='w-10 rounded-full hidden lg:block ' src={userData.profileImage} alt='porifle'/>}
                         
                        <p className='text-white poppins-regular  text-sm text-center lg:text-lg   '>My projects</p>
                    </div>
                    <div className='flex flex-row items-center py-5 gap-2'>
                       { userData.profileImage && <img className='w-10 rounded-full hidden lg:block ' src={userData.profileImage} alt='porifle'/>}
                         
                        <p className='text-white poppins-regular  text-sm text-center lg:text-lg   '>Saved</p>
                    </div>

                </div>
            </div>
            <div className='w-4/5 bg-[#0A0A0A] flex flex-col'>
                <div className='flex flex-col m-5'>
                    <p className='text-white poppins-bold text-2xl py-5'>Trending Instrument </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Sounds.map((sound, index) => (
        <SoundCard key={index} name={sound.name} image={sound.image} />
      ))}
    </div>

                </div>
            
            </div>
        </div>)}
       
    </div>
  )
}

export default Dashboard
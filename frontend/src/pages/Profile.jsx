import React from 'react'
import Navbar from '../components/Navbar'
import {useSelector} from "react-redux"
const Profile = () => {
    const userData = useSelector((state)=> state.user.user)
  return (
    <div className='h-screen bg-[#0A0A0A]'>
        <Navbar/>
        <div className='flex flex-col items-center mt-10'>
            <div>
            <img src={userData.profileImage} alt="profile" className='w-40 rounded-lg'/>
            <p className='poppins-bold text-white text-center  py-2 text-3xl'>@{userData.name}</p>
            </div>
            <div className='p-10 mt-5 w-5/6 border-white border-t'>

            </div>
        </div>
    </div>
  )
}

export default Profile
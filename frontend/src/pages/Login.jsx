import React from 'react'
import { Images } from '../constants'
import { Link } from 'react-router-dom'
import BannerCarousel from '../components/BannerCarousel'
const Login = () => {
  return (
        <div className='h-screen flex flex-row'>
      
        <div className='bg-black lg:w-2/5 items-center flex-col flex w-full  '>
            <div className='flex flex-row items-center p-5 justify-start w-full h-[10%] cursor-pointer'>
                <Link to='/' className='flex flex-row items-center gap-2'>
                <img alt='logo' src={Images.LOGO}/>
                <p className='text-white poppins-bold text-2xl'>ChordBeat</p>
                </Link>

            </div>

            <div className='justify-center flex flex-col items-center w-full h-[90%] '>
            <div className='flex flex-col w-full px-10'>
                <h1 className='text-white poppins-bold text-5xl py-5'>Login</h1>
            <label htmlFor='username' className='text-white text-md poppins-regular'>Username</label>
            <input id='username' className='p-3 my-2 bg-[#0A0A0A]  border-gray-700 border rounded-md lg:w-3/4 text-white' placeholder='Email'/>
            <label htmlFor='password' className='text-white text-md poppins-regular'>password</label>
            <input id='password' className='p-3 my-2 bg-[#0A0A0A] border-gray-700 border rounded-md lg:w-3/4 text-white' placeholder='Password'/>
            <p className='text-white text-left text-sm poppins-regular cursor-pointer'>Forgot password?</p>
            <button className='bg-primary text-black p-2 lg:w-3/4 my-2 poppins-bold rounded-md'>Login</button>
            <div className='py-2 lg:w-3/4'>
                <Link to='/signup'>  <p className='text-white text-center cursor-pointer '>Create an account</p></Link> 
          

            </div>
           
            
            </div>
            
           

            </div>
 </div>
        <div className='bg-primary w-3/5 lg:block hidden' >
            <BannerCarousel/>

        </div>
    </div>
  )
}

export default Login
import React, { useState } from 'react'
import { Images } from '../constants'
import { Link } from 'react-router-dom'
import BannerCarousel from '../components/BannerCarousel'
import { login } from '../services/authService'
import {useNavigate} from "react-router-dom"
import StorageService from '../services/StorageService'
import  { setUser } from '../redux/reducers/userSlice'
import {useDispatch, useSelector } from "react-redux"

const Login = () => {
    const dispatch = useDispatch()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigate=useNavigate()
    const [isloading,setIsloading] = useState(false)
    const  userData = useSelector((state)=> state.user.user)

    const handleTextChange = (event)=>{
        const{ id, value } = event.target;
       if(id === "email") {
        setEmail(value)  }
        if(id === "password"){
            setPassword(value)

        }
        
    }

const handleSubmit = () => {
    if (!email) {
        alert("Please enter email id");
        return; // Exit the function if email is not provided
    }

    if (!password) {
        alert("Please enter password");
        return; // Exit the function if password is not provided
    }

    // Regular expression for password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;

    if (!passwordRegex.test(password)) {
        alert("Password must be at least 6 characters long and include at least one special character, one uppercase letter, and one lowercase letter.");
        return; // Exit the function if password validation fails
    }

    handleLogin();
};


   const handleLogin= async() =>{
    setIsloading(true)
    try{
        localStorage.clear()

        const response = await login({email: email, password: password})
        console.log("Login response from UI:", response)
        if(response.success){
            setIsloading(false)
            
            navigate('/')
            dispatch(setUser(response.user))
            StorageService.saveUserID(response.user._id)
            StorageService.saveToken(response.user.token)
        }

    }catch(err){
        console.log(err)
        console.log('Login failed')
        setIsloading(false)
    }



    }


    console.log("email:", email)
    console.log("password:", password)
    console.log("userData from redux", userData)
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
            <label htmlFor='email' className='text-white text-md poppins-regular'>Email</label>
            <input value={email} type='mail' id='email' className='p-3 my-2 bg-[#0A0A0A]  border-gray-700 border rounded-md lg:w-3/4 text-white' onChange={handleTextChange} placeholder='Email '/>
            <label htmlFor='password' className='text-white text-md poppins-regular'>password</label>
            <input value={password} type='password' id='password' className='p-3 my-2 bg-[#0A0A0A] border-gray-700 border rounded-md lg:w-3/4 text-white' onChange={handleTextChange} placeholder='Password'/>
            <p className='text-white text-left text-sm poppins-regular cursor-pointer'>Forgot password?</p>
            {
              isloading ? (<button className='bg-primary text-black p-2 lg:w-3/4 my-2 poppins-bold rounded-md items-center flex justify-center' ><img  alt='load'  className='w-7' src={Images.LOAD} /></button>

             
            ) : (<button className='bg-primary text-black p-2 lg:w-3/4 my-2 poppins-bold rounded-md items-center flex justify-center' onClick={()=> handleSubmit()}>Login</button>
            )
            }
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
import React, { useState, useRef } from 'react';
import { Images } from '../constants'
import { Link } from 'react-router-dom'
import BannerCarousel from '../components/BannerCarousel'
import {signup } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Signup = () => {


  const fileInputRef = useRef(null);
  const navigate = useNavigate();

 

  const [profileImage, setImage] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isloading,setIsloading] = useState(false)



  const handleFileChange = (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    }
  };
  

  const handleAddIconClick = () => {
    fileInputRef.current.click();
  };

  const handleSignup = async()=>{
    console.log("Signup in progress..")
    setIsloading(true)
    try{

      const response = await signup({
        name: name,
        email: email,
        password: password,
        profileImage: profileImage
      });
     
    
      console.log("signup response", response.user)
      if(response.success){
        setIsloading(false)
        navigate('/login');
        

   
        
      }

    }catch(err){
      console.log(err)
      setIsloading(false)
    }

  }

  
  const handleSubmit = (event) => {
    if(!profileImage){
      alert("Please provide a profile picture");
      return;
    
    }

    if(!name){
      alert( "Please enter name" )
      return;
    }
    if(!email){
      alert( "Please enter email" )
      return;
    }if(!password || password.length <5){
      alert("Please enter a password with at least 5 characters");
      return;
    }
    
   
    handleSignup();
  };

  const handleTextChange = (event) => {
    const { id, value } = event.target;
    if (id === 'username') {
      setName(value);
    } else if (id === 'email') {
      setEmail(value);
    } else if (id === 'password') {
      setPassword(value);
    }
  };
  console.log("image", profileImage)

  
  
  return (

        <div className='lg:h-screen  flex flex-row bg-black'>
      
        <div className='bg-black h-screen lg:w-2/5 items-center flex-col flex w-full  '>
            <div className='flex flex-row items-center p-5 justify-start w-full lg:h-[10%] cursor-pointer'>
                <Link to='/' className='flex flex-row items-center gap-2'>
                <img alt='logo' src={Images.LOGO}/>
                <p className='text-white poppins-bold text-2xl'>ChordBeat</p>
                </Link>

            </div>

            <div className='justify-center flex flex-col items-center w-full lg:h-[90%] '>
            <div className='flex flex-col w-full px-10'>
           
                <h1 className='text-white poppins-bold text-2xl lg:text-5xl py-5'>Create an account</h1>
               
                <div className="">
              {profileImage && (
                <img
                  src={profileImage}
                  alt='Selected'
                  className='rounded-lg cursor-pointer w-[100px] lg:max-w-[150px] h-auto '
                 
                  onClick={handleAddIconClick}
                />
              )}
              {!profileImage && (<div>
                <label htmlFor='profile' className='text-white text-md poppins-regular'>Profile picture</label>
                <div 
                id='profile'
                  className="cursor-pointer border-white border w-10 p-8 px-10 rounded-lg justify-center items-center flex my-2"
                  onClick={handleAddIconClick}
                  
                >
                  <p className='text-white text-xl'>+</p>
                
                </div>
                </div>
              )}
              {/* Input for selecting a file */}
              <input
                type='file'
                accept='image/*'
                onChange={handleFileChange}
                style={{ display: 'none' }}
                ref={fileInputRef}
              />
            </div>

            <label htmlFor='username' className='text-white text-md poppins-regular pt-2'>Username</label>
            <input type='name' value={name} id='username' className='p-3 my-2 bg-[#0A0A0A]  border-gray-700 border rounded-md lg:w-3/4 text-white' autoComplete='name' placeholder='Name' onChange={handleTextChange}/>

            <label htmlFor='email' className='text-white text-md poppins-regular'>Email</label>
            <input value={email} id='email' className='p-3 my-2 bg-[#0A0A0A]  border-gray-700 border rounded-md lg:w-3/4 text-white' placeholder='Email' onChange={handleTextChange}/>

            <label htmlFor='password' className='text-white text-md poppins-regular'>password</label>
            <input value={password} type='password' id='password' className='p-3 my-2 bg-[#0A0A0A] border-gray-700 border rounded-md lg:w-3/4 text-white' placeholder='Password' onChange={handleTextChange}/>
            
            {
              isloading ? (<button className='bg-primary text-black p-2 lg:w-3/4 my-2 poppins-bold rounded-md items-center flex justify-center' ><img className='w-7' alt='load' src={Images.LOAD} /></button>

             
            ) : (<button className='bg-primary text-black p-2 lg:w-3/4 my-2 poppins-bold rounded-md items-center flex justify-center' onClick={()=> handleSubmit()}>Signup</button>
            )
            }
            
            
            

            <div className='py-2 lg:w-3/4'>
                <Link to='/login'>  <p className='text-white text-center cursor-pointer '>Already have an account?</p></Link> 
          

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
// test
export default Signup
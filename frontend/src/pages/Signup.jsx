import React, { useState, useRef } from 'react';
import { Images } from '../constants'
import { Link } from 'react-router-dom'
import BannerCarousel from '../components/BannerCarousel'

const Signup = () => {

  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  // Function to handle file selection
  const handleFileChange = (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      // You might want to perform additional validation here
      setImage(URL.createObjectURL(selectedImage));
    }
  };

  // Function to trigger file input when the profile add icon is clicked
  const handleAddIconClick = () => {
    fileInputRef.current.click();
  };
  
  return (

        <div className='lg:h-screen flex flex-row'>
      
        <div className='bg-black lg:w-2/5 items-center flex-col flex w-full  '>
            <div className='flex flex-row items-center p-5 justify-start w-full h-[10%] cursor-pointer'>
                <Link to='/' className='flex flex-row items-center gap-2'>
                <img alt='logo' src={Images.LOGO}/>
                <p className='text-white poppins-bold text-2xl'>ChordBeat</p>
                </Link>

            </div>

            <div className='justify-center flex flex-col items-center w-full h-[90%] '>
            <div className='flex flex-col w-full px-10'>
                <h1 className='text-white poppins-bold text-2xl lg:text-5xl py-5'>Create an account</h1>
               
                <div className="">
              {image && (
                <img
                  src={image}
                  alt='Selected'
                  className='rounded-lg cursor-pointer w-[100px] lg:max-w-[150px] h-auto '
                 
                  onClick={handleAddIconClick} // Allow clicking on the image to trigger file selection
                />
              )}
              {!image && (<div>
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
            <input id='username' className='p-3 my-2 bg-[#0A0A0A]  border-gray-700 border rounded-md lg:w-3/4 text-white' autoComplete='name' placeholder='Name'/>

            <label htmlFor='email' className='text-white text-md poppins-regular'>Email</label>
            <input id='email' className='p-3 my-2 bg-[#0A0A0A]  border-gray-700 border rounded-md lg:w-3/4 text-white' placeholder='Email'/>

            <label htmlFor='password' className='text-white text-md poppins-regular'>password</label>
            <input id='password' className='p-3 my-2 bg-[#0A0A0A] border-gray-700 border rounded-md lg:w-3/4 text-white' placeholder='Password'/>
            
            <button className='bg-primary text-black p-2 lg:w-3/4 my-2 poppins-bold rounded-md'>Signup</button>
            <div className='py-2 lg:w-3/4'>
                <Link to='/signup'>  <p className='text-white text-center cursor-pointer '>Already have an account?</p></Link> 
          

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

export default Signup
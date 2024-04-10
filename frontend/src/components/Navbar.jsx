import React, { useState } from 'react';
import { Images } from '../constants';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const user = useSelector((state) => state.user.user);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='bg-black flex flex-row w-full py-2 px-2 items-center'>
      <div className='items-center gap-2 lg:px-20 justify-center flex flex-row'>
        <img src={Images.LOGO} alt='logo' className='h-10 w-10' />
       <Link to="/"><p className='text-white text-2xl poppins-bold'>ChordBeat</p></Link> 
      </div>
      <div className='flex-1 flex flex-row justify-end items-center gap-3 lg:px-5 relative'>
        {user && <p className='text-white poppins-bold hidden lg:block rounded-md cursor-pointer'>
          {user.name.toUpperCase()}
        </p> }
        
        {!user && <Link to='/login'><p className='text-white poppins-medium'>Login</p></Link>}
        {!user && (
          <Link to='/signup'>
            <button className='px-4 py-1 text-black bg-primary rounded poppins-bold'>
              Signup
            </button>
          </Link>
        )}
        {user && (
          <>
            <img
              className='w-10 rounded-lg cursor-pointer'
              src={user.profileImage}
              onClick={toggleDropdown}
              alt='User Profile'
            />
            {isOpen && (
              <div className='absolute top-12 right-0 bg-secondary text-white poppins-regular shadow-lg rounded-lg py-5 px-7'>
                <Link to='/profile' className='block'>Profile</Link>
                <Link to='/dashboard' className='block py-2'>Dashboard</Link>
                <Link to='/settings' className='block'>Settings</Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;

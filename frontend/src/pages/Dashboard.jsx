import React from 'react';
import Navbar from '../components/Navbar';
import { useSelector } from "react-redux";
import SoundCard from '../components/soundCard';
import { DashboardData, Sounds } from '../constants';
import AppLoad from "../components/Loading";
import { Link } from 'react-router-dom';
import Tools from '../components/Tools';

const Dashboard = () => {
    const userData = useSelector((state) => state.user.user);
    const appLoading = useSelector((state) => state.general.appLoading);

    return (
        <div className='h-screen w-full bg-gray-800'>
            <Navbar />
            {appLoading ? (
                <AppLoad />
            ) : (
                <div className='flex flex-row justify-between'>
                    <div className='w-1/5 bg-[#1A1A1A] h-[94vh] items-center flex flex-col lg:p-5 '>
                        {/* <button className='bg-primary m-2 lg:p-2 text-black text-sm poppins-bold lg:w-full rounded-md'>New Record</button> */}
                        <div className='flex flex-col items-center'>
                            {/* <div className='flex flex-row items-center py-5 gap-2'>
                                {userData.profileImage && <img className='w-10 rounded-full hidden lg:block ' src={userData.profileImage} alt='profile' />}
                                <p className='text-white poppins-regular  text-sm text-center lg:text-lg'>My Recordings</p>
                            </div> */}
                            {/* <div className='flex flex-row items-center py-5 gap-2'>
                                {userData.profileImage && <img className='w-10 rounded-full hidden lg:block border-xl border border-purple-600 ' src={userData.profileImage} alt='profile' />}
                                <p className='text-white poppins-regular  text-sm text-center lg:text-lg'>Saved</p>
                            </div> */}
                        </div>
                        <Link className='w-full' to='/studio'>
                            <button className='bg-purple-800 m-2 lg:p-2 h-10 text-white text-sm poppins-bold lg:w-full animate-pulse rounded-sm'>Open Studio</button>
                        </Link>
                    </div>
                    <div className='w-4/5 bg-[#0A0A0A] flex flex-col h-[94vh] overflow-y-auto scrollbar-hide '>
                        <div className='w-full justify-center flex items-center mt-10'>
                            <input className='w-4/5 lg:h-12 h-10 rounded-sm outline-none px-5 lg:px-10 text-lg poppins-bold bg-slate-900 text-white' placeholder='Search here' />
                        </div>
                        <div className='flex flex-col m-5'>
                            <p className='text-white poppins-bold text-2xl py-5'>Virtual Instrument </p>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {Sounds.slice(0,4).map((sound, index) => (
                                    <SoundCard key={index} name={sound.name} image={sound.image} audio={sound.audio} />
                                ))}
                            </div>

                        </div>
                        
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
import React, { useState, useEffect,useRef  } from 'react';
import { AlbumData, DashboardData, Images,InstrumentData } from '../constants'
import Navbar from '../components/Navbar'
import HomeAlbumCard from '../components/HomeAlbumCard';
import Footer from '../components/Footer';
import {useSelector} from "react-redux"
import {Link, useNavigate} from "react-router-dom"
const Home = () => {
  const userLogged = useSelector((state)=> state.general.userLoggedIn)
  const [counters, setCounters] = useState({
    instruments: 50,
    soundEffects: 0,
    musiciansLoved: 5000
  });

  const countingRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Start counting animation
          const countersInterval = setInterval(() => {
            setCounters(prevCounters => ({
              instruments: prevCounters.instruments < 140 ? prevCounters.instruments + 10 : 140,
              soundEffects: prevCounters.soundEffects < 100 ? prevCounters.soundEffects + 10 : 100,
              musiciansLoved: prevCounters.musiciansLoved < 6000 ? prevCounters.musiciansLoved + 30 : 6000
            }));
          }, 50); // Adjust interval for smoother animation and faster counting

          return () => clearInterval(countersInterval);
        }
      },
      { threshold: 0.5 } // Change threshold as needed
    );

    if (countingRef.current) {
      observer.observe(countingRef.current);
    }

    return () => {
      if (countingRef.current) {
        observer.unobserve(countingRef.current);
      }
    };
  }, []);


  return (
    <div className='flex flex-col bg-black '>
        <Navbar/>
        <div className='h-[65vh]' style={{backgroundImage: `url(${Images.BANNER0}) ` , backgroundSize: 'cover'}}>
            <div className='flex flex-col items-right justify-center px-5 lg:p-10 gap-2 lg:mt-16   h-full'>

           
            <h1 className='text-white poppins-bold text-6xl select-none'>Your Digital Beat Studio</h1>
            <p className='text-white poppins-thin text-2xl'>Where Creativity Strikes a Perfect Harmony for free</p>
            
            <button className="px-4 py-1 w-32 text-black hover:bg-black hover:text-primary transition duration-300 ease-in-out bg-primary rounded poppins-bold">Get Started</button>
            </div> 

        </div>
        <div className='lg:my-5'>

          <p className='text-primary poppins-medium text-center py-2 lg:py-5 text-md lg:text-xl'>Seamless Beat Creation, Limitless Possibilities.</p>
          <div className='bg-secondary p-4 lg:p-8 lg:mx-10 mx-2 rounded-md flex lg:flex-row justify-between lg:px-20 gap-2'>

          {DashboardData.Instruments.map((item, index) => (
  <div key={item.id} className='flex flex-col justify-center items-center select-none'>
    <img src={item.image} alt='instrument' className='h-10 w-10 ' />
    <p className='text-white poppins-regular pt-2 hidden lg:block '>{item.name}</p>
  </div>
))}
</div>

          <div className='flex flex-col lg:flex-row bg-black-next justify-between pt-1 lg:pt-20 mt-10 items-center'>
            <div className='flex flex-col lg:w-3/6 justify-center lg:pl-28'>
              <div className='hidden lg:block'>
              <h1 className='text-white flex gap-1 text-6xl poppins-bold pt-5 lg:pt-0'>Your <p className='text-primary'>Rhythm</p>, Your <p className='text-primary'>Rules</p></h1> </div>
              <div className='lg:hidden flex flex-col pt-10 px-2'>
                <h1 className='text-white flex gap-1 text-3xl poppins-bold'>Your<p className='text-primary'>Rhythm</p>,</h1>
                <h1 className='text-white flex gap-1 text-3xl poppins-bold'>Your<p className='text-primary'>Rules</p></h1>
              </div>
              
              <p className='poppins-thin text-white py-1 px-2 '>Record, mix and collaborate on your music projects from start to finish with our best-in-class and 100% free Studio.</p>

              <div ref={countingRef}  className='flex lg:flex-row  px-5 lg:px-0 gap-10 lg:gap-16 lg:text-xl py-5'>
              <div className='counting flex flex-col items-center'>
          <p className='text-white'>{counters.instruments}+</p>
          <p className='text-primary'>Instruments</p>
        </div>
        <div className='counting flex flex-col items-center'>
          <p className='text-white'>{counters.soundEffects}+</p>
          <p className='text-primary'>Sound effects</p>
        </div>
        <div className='counting flex flex-col items-center'>
          <p className='text-white'>{counters.musiciansLoved}+</p>
          <p className='text-primary'>Musicians loved</p>
        </div>
              </div>
              <Link to='/dashboard'> <button className="px-4 py-2 my-10 w-1/4 font-semibold text-white bg-primary hover:bg-white hover:border-primary hover:text-primary border-black  border-2 rounded-md hover mx-4 transition">Explore</button></Link>
             
            </div>
            <div className='items-center justify-center flex'>
              <img className='lg:w-3/4 ' alt='banner2' src={Images.BANNER1}/>
            </div>

          </div>

          <div className='flex flex-col items-center lg:m-5 pt-10 lg:p-10 p-5 bg-black-next rounded-lg '>
            <div className='flex flex-row  items-center gap-2'>
              <img src={Images.LOGO} className='lg:w-10 lg:h-10 w-5 h-5 animate-spin'  alt='logo'/>
              <p className='poppins-bold lg:text-3xl text-xl text-primary'>ChordBeat Today</p>

            </div>
            <div className='flex flex-col lg:flex-row gap-10 lg:gap-20 py-10'>
           

{AlbumData.map((item, index) => (
        <HomeAlbumCard key={index} image={item.image} title={item.title} />
      ))}
            </div>

          </div>
          <Footer/>
        </div>

    </div>
  )
}

export default Home 

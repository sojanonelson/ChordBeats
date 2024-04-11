import React, { useEffect , useState } from 'react';
import Navbar from '../components/Navbar';
import InstrumentControl from '../components/InstrumentControl';
import { useSelector ,useDispatch} from "react-redux";
import Loading from '../components/Loading';
import { setActiveKey } from '../redux/reducers/generalSlice';
import pianoSound from '../constants/Audio/piano';

const Studio = () => {
  const dispatch = useDispatch()
    const appLoad = useSelector((state) => state.general.appLoading);
    const activeKey = useSelector((state)=> state.general.activeKey)
    console.log("PianoData:", pianoSound.whiteKeys)
    
    const[activeKeyNow, setActiveKeyNow]= useState('press any key')
    console.log("ActiveKey:", activeKey)

    const playAudio = (audio) => {
        const sound = new Audio(audio);
        sound.play();
    };


    useEffect(() => {
        const handleKeyDown = (event) => {
            const pressedKey = event.keyCode.toString();

            const whiteNote = pianoSound.whiteKeys.find(key => key.keyValue === pressedKey);
            const blackNote = pianoSound.blackKeys.find(key => key.keyValue === pressedKey);
            
            if (whiteNote) {

                console.log(whiteNote.keyName);
                setActiveKeyNow(whiteNote.keyName)
                dispatch(setActiveKey(whiteNote.keyName))
                playAudio(whiteNote.audio);

            } else if (blackNote) {

                console.log(blackNote.note);
                dispatch(setActiveKey(blackNote.keyName))
                setActiveKeyNow(blackNote.keyName)
                playAudio(blackNote.audio);

            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [pianoSound.whiteKeys, pianoSound.blackKeys]);


    return (
        <div className='bg-[#0A0A0A] h-screen flex flex-col'>
            <Navbar />
            <div className='flex flex-row h-[94vh] justify-between'>
                <div className='text-white flex flex-col w-1/6 bg-gray-900'>
                    <div>
                        <p className='text-white poppins-regular p-2 select-none'>Control panel</p>
                    </div>
                    <div className='flex flex-col p-1 gap-2 '>
                        <InstrumentControl />
                        
                    </div>
                </div>
                <div className='text-white w-5/6 flex flex-col'>
                  < h1 className='text-8xl p-10 text-center poppins-regular'>{activeKey}</h1>
                    <div className='flex-grow'></div>
                    <div className='bg-gray-900 h-[300px] p-0 flex flex-row '>
                        {
                            pianoSound.whiteKeys.map((keyObj, index) => (
                                <div onClick={()=>console.log(keyObj.note, keyObj. keyValue)} data-key={keyObj.keyValue} key={index} className='flex items-end justify-center w-full h-full rounded-br-lg rounded-bl-lg cursor-pointer border border-black mx-0 bg-white'>
                                    <p className='text-black text-center poppins-bold text-lg'>{keyObj.keyName}</p>
                                </div>
                            ))
                        }
                    </div>
                    <div className='flex flex-row mx-10 absolute px-12 bottom-24 ml-0 w-5/6 h-[203px]'>
                        {
                            pianoSound.blackKeys.map((keyObj, index) => (
                                <div onClick={()=>console.log(keyObj.note, keyObj. keyValue)} data-key={keyObj.keyValue} key={index} className={`flex items-end justify-center w-[90%] h-full rounded-br-lg rounded-bl-lg mx-4 cursor-pointer ${keyObj.keyName.length === 0 ? 'bg-transparent' : 'bg-black'}`}>
                                    <p className='text-green text-center poppins-bold text-lg'>{keyObj.keyName}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Studio;

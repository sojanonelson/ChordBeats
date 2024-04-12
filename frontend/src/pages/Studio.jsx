import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import InstrumentControl from '../components/InstrumentControl';
import { useSelector, useDispatch } from "react-redux";
import Loading from '../components/Loading';
import { setActiveKey } from '../redux/reducers/generalSlice';
import pianoSound from '../constants/Audio/piano';
import WaveSurfer from 'wavesurfer.js';

const Studio = () => {
    const dispatch = useDispatch();
    const appLoad = useSelector((state) => state.general.appLoading);
    const activeKey = useSelector((state) => state.general.activeKey);
    const [activeKeyNow, setActiveKeyNow] = useState('press any key');

    // State to track which keys are currently being clicked
    const [clickedKeys, setClickedKeys] = useState({});

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
                setActiveKeyNow(whiteNote.keyName);
                dispatch(setActiveKey(whiteNote.keyName));
                playAudio(whiteNote.audio);

                setClickedKeys(prevState => ({
                    ...prevState,
                    [whiteNote.keyValue]: true
                }));

            } else if (blackNote) {
                setActiveKeyNow(blackNote.keyName);
                dispatch(setActiveKey(blackNote.keyName));
                playAudio(blackNote.audio);

                setClickedKeys(prevState => ({
                    ...prevState,
                    [blackNote.keyValue]: true
                }));
            }
        };

        const handleKeyUp = (event) => {
            const releasedKey = event.keyCode.toString();

            const whiteNote = pianoSound.whiteKeys.find(key => key.keyValue === releasedKey);
            const blackNote = pianoSound.blackKeys.find(key => key.keyValue === releasedKey);

            if (whiteNote) {
                setClickedKeys(prevState => ({
                    ...prevState,
                    [whiteNote.keyValue]: false
                }));
            } else if (blackNote) {
                setClickedKeys(prevState => ({
                    ...prevState,
                    [blackNote.keyValue]: false
                }));
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    const handleMouseDown = (keyObj) => {
        setActiveKeyNow(keyObj.keyName);
        dispatch(setActiveKey(keyObj.keyName));
        playAudio(keyObj.audio);

        setClickedKeys(prevState => ({
            ...prevState,
            [keyObj.keyValue]: true
        }));
    };

    const handleMouseUp = (keyObj) => {
        setClickedKeys(prevState => ({
            ...prevState,
            [keyObj.keyValue]: false
        }));
    };

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
                    <h1 className='text-8xl p-10 text-center poppins-regular'>{activeKey}</h1>
                    <div className='flex-grow'></div>
                    <div className='w-full bg-[#080808] rounded-tr-lg rounded-tl-lg h-20 flex flex-row'>
                        <p className='text-gray-200 poppins-bold p-2'>VIRTUAL INSTRUMENT</p>
                    </div>
                    <div className='bg-gray-900 h-[300px] p-0 flex flex-row '>
                        {pianoSound.whiteKeys.map((keyObj, index) => (
                            <div
                                onMouseDown={() => handleMouseDown(keyObj)}
                                onMouseUp={() => handleMouseUp(keyObj)}
                                key={index}
                                className={`flex items-end justify-center w-full h-full rounded-br-lg rounded-bl-lg cursor-pointer border border-black mx-0 ${clickedKeys[keyObj.keyValue] ? 'bg-red-500' : 'bg-white'}`}
                            >
                                <p className='text-black select-none text-center poppins-bold text-lg'>{keyObj.keyName}</p>
                            </div>
                        ))}
                    </div>
                    <div className='flex flex-row mx-10 absolute px-12 bottom-24 ml-0 w-5/6 h-[203px]'>
                        {pianoSound.blackKeys.map((keyObj, index) => (
                            <div
                                onMouseDown={() => handleMouseDown(keyObj)}
                                onMouseUp={() => handleMouseUp(keyObj)}
                                key={index}
                                className={`flex items-end justify-center w-[90%] h-full rounded-br-lg rounded-bl-lg mx-4 cursor-pointer  ${keyObj.keyName.length === 0 ? 'bg-transparent' : 'bg-black'} ${clickedKeys[keyObj.keyValue] ? 'bg-red-500' : 'bg-black'}`}
                            >
                                <p className='select-none text-green text-center poppins-bold text-lg'>{keyObj.keyName}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Studio;

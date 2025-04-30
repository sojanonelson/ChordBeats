import React from 'react';

const InstrumentKey = ({
    keyObj,
    isClicked,
    onMouseDown,
    onMouseUp,
    isBlackKey,
}) => {
    // If the key is a black key and has no keyName, don't render it
    if (isBlackKey && (!keyObj.keyName || keyObj.keyName.trim() === '')) {
        return null;
    }

    return (
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
    );
};

export default InstrumentKey;
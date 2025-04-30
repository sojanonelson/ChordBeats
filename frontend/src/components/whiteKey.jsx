import React from 'react';

const WhiteKey = ({ keyObj, isClicked, onMouseDown, onMouseUp }) => {
    return (
        <div
            onMouseDown={() => onMouseDown(keyObj)}
            onMouseUp={() => onMouseUp(keyObj)}
            className={`flex items-end justify-center w-full h-full rounded-br-lg rounded-bl-lg cursor-pointer border border-black mx-0 ${
                isClicked ? 'bg-red-500' : 'bg-white'
            }`}
        >
            <p className="select-none text-black text-center poppins-bold text-lg">
                {keyObj.keyName}
            </p>
        </div>
    );
};

export default WhiteKey;
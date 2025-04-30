import React from "react";

const BlackKey = ({ keyObj, isClicked, onMouseDown, onMouseUp }) => {
  // If the key has no keyName, don't render it
  if (!keyObj.keyName ) {
    return false;
  }
  console.log(keyObj.keyName)

  return (
    <div
      onMouseDown={() => onMouseDown(keyObj)}
      onMouseUp={() => onMouseUp(keyObj)}
      
      className={`flex items-end justify-center w-[90%] h-full rounded-br-lg rounded-bl-lg mx-6 cursor-pointer  ${
        keyObj.keyName.length === 0 ? "bg-transparent" : "bg-black"
      } ${isClicked ? "bg-red-500" : "bg-black"}`}
    >
      <p className="select-none text-green text-center poppins-bold text-lg">
        {keyObj.keyName}
      </p>
    </div>
  );
};

export default BlackKey;

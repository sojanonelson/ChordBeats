import React, { useState } from 'react';
import { Images } from '../constants';

const InstrumentControl = ({ onInstrumentSelect }) => {
  const [selectedInstrument, setSelectedInstrument] = useState('Piano');

  const handleInstrumentSelect = (event) => {
    const instrument = event.target.value;
    setSelectedInstrument(instrument);
    onInstrumentSelect(instrument);
  };

  return (
    <div className='w-full p-1 bg-black rounded-md flex flex-col h-[90px]'>
      <p>Instrument</p>
      <div className='flex flex-row items-center justify-between p-2 py-5'>
        <div className='flex flex-row items-center gap-2'>
          <select
            value={selectedInstrument}
            onChange={handleInstrumentSelect}
            className='text-white poppins-medium text-sm bg-gray-800 rounded px-2 py-1'
          >
            <option value='Guitar'>Guitar</option>
            <option value='Piano'>Piano</option>
            <option value='Violin'>Violin</option>
          </select>
        </div>

        <div className='flex flex-row gap-2 items-center'>
          <img src={Images.SPEAKER} alt='speaker' className='h-5' />
          <img src={Images.DOT2} alt='active' className='w-2 h-2' />
        </div>
      </div>
    </div>
  );
};

export default InstrumentControl;

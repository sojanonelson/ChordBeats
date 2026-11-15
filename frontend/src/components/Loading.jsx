import React from 'react';
import { Images } from '../constants';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-black text-white">
      <div className="relative mb-4">
        <div className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/40 shadow-glow-primary flex items-center justify-center animate-pulse">
          <img src={Images.LOGO} alt="ChordBeat" className="w-8 h-8 object-contain animate-spin" />
        </div>
      </div>
      <p className="text-sm font-semibold text-white tracking-wide">
        Loading ChordBeat Audio Engine...
      </p>
      <span className="text-xs text-neutral-400 mt-1">Tuning virtual instruments</span>
    </div>
  );
};

export default Loading;

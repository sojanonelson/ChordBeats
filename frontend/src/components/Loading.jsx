import React from 'react';
import { Images } from '../constants';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-studio-bg text-studio-text">
      <div className="relative mb-4">
        <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 shadow-glow-indigo flex items-center justify-center animate-pulse">
          <img src={Images.LOGO} alt="ChordBeat" className="w-8 h-8 object-contain animate-spin" />
        </div>
      </div>
      <p className="text-sm font-semibold text-white tracking-wide">
        Loading ChordBeat Audio Engine...
      </p>
      <span className="text-xs text-studio-muted mt-1">Tuning virtual instruments</span>
    </div>
  );
};

export default Loading;

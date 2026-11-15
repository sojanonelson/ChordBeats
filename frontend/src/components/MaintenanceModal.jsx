import React, { useState, useEffect } from 'react';

const MaintenanceModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem('cb_maintenance_acknowledged');
    if (!hasSeen) {
      setIsOpen(true);
    }
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem('cb_maintenance_acknowledged', 'true');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/85 flex items-center justify-center p-4 select-none">
      
      {/* Sharp rectangular container - NO CURVES, clean 1px border, minimal dark palette */}
      <div className="w-full max-w-lg bg-[#0c0c0c] border border-neutral-700 p-6 text-left relative shadow-2xl">
        
        {/* Header bar */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 bg-primary inline-block"></span>
            <span className="text-xs font-mono font-bold tracking-widest text-neutral-300 uppercase">
              System Notice
            </span>
          </div>

          <button
            onClick={handleDismiss}
            className="text-neutral-500 hover:text-white text-xs font-mono px-1 py-0.5 transition-colors"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Body content */}
        <div className="py-5 space-y-4">
          <h2 className="text-lg font-bold text-white tracking-tight">
            Project Under Maintenance
          </h2>

          <p className="text-xs text-neutral-400 leading-relaxed">
            ChordBeat is currently undergoing scheduled system updates and maintenance.
          </p>

          {/* Time notice box with sharp borders */}
          <div className="p-3.5 bg-neutral-900 border border-neutral-800 space-y-1">
            <span className="text-[11px] font-mono uppercase text-neutral-400 block tracking-wider">
              Maintenance Window
            </span>
            <p className="text-sm font-mono font-bold text-white">
              Till 16th, 7:00 PM IST <span className="text-neutral-400 font-normal text-xs">(Indian Standard Time)</span>
            </p>
          </div>

          <p className="text-[11px] text-neutral-400 leading-normal">
            Some features and services may experience brief latency during this window. You can continue using the studio.
          </p>
        </div>

        {/* Footer with sharp rectangular button */}
        <div className="pt-3 border-t border-neutral-800 flex justify-end items-center gap-3">
          <button
            onClick={handleDismiss}
            className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-black font-bold text-xs tracking-wider uppercase transition-colors"
          >
            OK, Continue
          </button>
        </div>

      </div>

    </div>
  );
};

export default MaintenanceModal;

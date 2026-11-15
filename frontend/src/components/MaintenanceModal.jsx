import React, { useState, useEffect } from 'react';
import { AlertTriangle, Clock, ArrowRight, X } from 'lucide-react';

const MaintenanceModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user already acknowledged maintenance in this session
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
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200 select-none">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-md bg-[#11131B] border border-primary/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(244,132,0,0.25)] overflow-hidden text-center animate-in zoom-in-95 duration-200">
        
        {/* Background Ambient Glows */}
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-primary/20 blur-[50px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-orange-600/15 blur-[50px] rounded-full pointer-events-none" />

        {/* Close icon button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        <div className="relative z-10 flex flex-col items-center">
          
          {/* Glowing Animated Icon */}
          <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center mb-4 text-primary shadow-glow-primary-sm">
            <AlertTriangle size={32} className="animate-pulse" />
          </div>

          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 border border-primary/30 text-[11px] font-bold text-primary tracking-wider uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping inline-block" />
            Scheduled Maintenance
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-black text-white tracking-tight mb-2">
            Project Under{' '}
            <span className="bg-gradient-to-r from-[#FF7A00] to-[#FF5E7E] bg-clip-text text-transparent">
              Maintenance
            </span>
          </h2>

          <p className="text-xs text-neutral-300 leading-relaxed mb-4">
            ChordBeat is currently undergoing scheduled system updates and maintenance optimizations.
          </p>

          {/* Highlighted Time Box */}
          <div className="w-full bg-[#181A25] border border-neutral-800 rounded-2xl p-3.5 mb-5 flex items-center justify-center gap-2.5 text-center">
            <Clock size={18} className="text-primary shrink-0" />
            <div className="flex flex-col text-left">
              <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                Maintenance Window Till:
              </span>
              <span className="text-sm font-extrabold text-white">
                16th, 7:00 PM IST <span className="text-primary text-xs font-semibold">(Indian Standard Time)</span>
              </span>
            </div>
          </div>

          <p className="text-[11px] text-neutral-400 mb-5 leading-normal">
            Some background services may experience temporary latency during this period. You may still continue using and exploring the studio.
          </p>

          {/* Action Button: OK, Continue */}
          <button
            onClick={handleDismiss}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#FF7A00] via-[#FF661A] to-[#FF453A] hover:from-[#FF8A1F] hover:to-[#FF5A50] text-black font-extrabold text-sm tracking-wide shadow-lg shadow-orange-600/30 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <span>OK, Continue</span>
            <ArrowRight size={16} strokeWidth={2.5} />
          </button>

        </div>

      </div>

    </div>
  );
};

export default MaintenanceModal;

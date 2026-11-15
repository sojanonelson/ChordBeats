import React, { useState } from 'react';
import { Images } from '../constants';
import { Link } from 'react-router-dom';
import { Music, Heart, Mail, Send, Sparkles } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer className="w-full bg-black border-t-2 border-primary/80 pt-12 pb-8 px-6 lg:px-12 text-neutral-400">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-neutral-800">
        
        {/* Brand Information */}
        <div className="md:col-span-1 flex flex-col gap-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-amber-500 shadow-glow-primary-sm">
              <img src={Images.LOGO} alt="ChordBeat" className="h-6 w-6 object-contain" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1">
                ChordBeat
                <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span>
              </span>
              <p className="text-[11px] text-primary font-semibold">Your Digital Beat Studio</p>
            </div>
          </Link>
          <p className="text-sm text-neutral-400 leading-relaxed">
            Record, compose, and explore interactive virtual instruments directly in your browser. 100% free and open for musical creativity.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-3">
          <h4 className="text-xs uppercase tracking-wider font-bold text-white">Navigation</h4>
          <Link to="/" className="text-sm hover:text-primary transition-colors">Home</Link>
          <Link to="/studio" className="text-sm hover:text-primary transition-colors flex items-center gap-1.5">
            <Music size={14} className="text-primary" /> Virtual Studio
          </Link>
          <Link to="/dashboard" className="text-sm hover:text-primary transition-colors">Instrument Library</Link>
          <Link to="/profile" className="text-sm hover:text-primary transition-colors">User Profile</Link>
        </div>

        {/* Instruments Supported */}
        <div className="flex flex-col gap-3">
          <h4 className="text-xs uppercase tracking-wider font-bold text-white">Instruments</h4>
          <Link to="/studio/piano" className="text-sm hover:text-primary transition-colors">Grand Piano</Link>
          <Link to="/studio/guitar" className="text-sm hover:text-primary transition-colors">Acoustic Guitar</Link>
          <Link to="/studio/drum" className="text-sm hover:text-primary transition-colors">Drum Kit</Link>
          <Link to="/dashboard" className="text-sm hover:text-primary transition-colors">Browse All Presets</Link>
        </div>

        {/* Newsletter Subscription */}
        <div className="flex flex-col gap-3">
          <h4 className="text-xs uppercase tracking-wider font-bold text-white">Stay in the Loop</h4>
          <p className="text-sm text-neutral-400">
            Get updates on new synth modules, instrument samples, and community tracks.
          </p>

          <form onSubmit={handleSubscribe} className="relative mt-2">
            <div className="flex items-center rounded-xl bg-[#121212] border border-neutral-800 focus-within:border-primary overflow-hidden transition-colors">
              <Mail size={16} className="ml-3 text-neutral-500 shrink-0" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="YOUR EMAIL"
                required
                className="w-full py-2.5 px-3 bg-transparent text-sm text-white placeholder-neutral-500 outline-none"
              />
              <button
                type="submit"
                className="p-2.5 bg-primary hover:bg-primary-hover text-black font-bold transition-colors"
                title="Subscribe"
              >
                <Send size={16} />
              </button>
            </div>
            {subscribed && (
              <p className="text-xs text-primary mt-2 flex items-center gap-1 font-medium">
                <Sparkles size={12} /> Thanks for subscribing to ChordBeat!
              </p>
            )}
          </form>
        </div>

      </div>

      {/* Bottom Legal / Credits */}
      <div className="max-w-7xl mx-auto mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
        <p className="flex items-center gap-1">
          Made with <Heart size={14} className="text-primary inline fill-primary" /> for musicians & beatmakers everywhere.
        </p>
        <p>© {new Date().getFullYear()} ChordBeat. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

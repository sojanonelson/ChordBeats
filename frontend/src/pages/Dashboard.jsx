import React, { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useSelector } from "react-redux";
import SoundCard from '../components/soundCard';
import { Sounds } from '../constants';
import AppLoad from "../components/Loading";
import { Link } from 'react-router-dom';
import { 
  Search, 
  Music, 
  Play, 
  Sparkles, 
  X
} from 'lucide-react';

const CATEGORIES = ['All', 'Keyboards', 'Strings', 'Percussion', 'Wind'];

const Dashboard = () => {
  const appLoading = useSelector((state) => state.general.appLoading);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter sounds dynamically
  const filteredSounds = useMemo(() => {
    return Sounds.filter((sound) => {
      const matchesSearch = sound.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || sound.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-black flex flex-col text-white selection:bg-primary selection:text-black">
      <Navbar />

      {appLoading ? (
        <AppLoad />
      ) : (
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 flex flex-col gap-8">
          
          {/* Top Hero & Studio Quick-Launch Banner */}
          <div className="relative overflow-hidden p-6 md:p-8 rounded-3xl bg-[#121212] border border-neutral-800 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col gap-3 text-center md:text-left z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary w-fit mx-auto md:mx-0">
                <Sparkles size={14} className="text-primary" />
                Virtual Instrument Sound Library
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white">
                Explore Sound Presets
              </h1>
              <p className="text-sm text-neutral-400 max-w-lg leading-relaxed">
                Click any instrument card to audition its acoustic tones, save it as your default workstation instrument, or jump right into the live Studio.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0 z-10">
              <Link
                to="/studio"
                className="px-6 py-3 rounded-2xl bg-primary hover:bg-primary-hover text-black font-bold shadow-glow-primary transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 text-sm"
              >
                <Play size={16} className="fill-black" />
                Launch Live Studio
              </Link>
            </div>

            {/* Background Ambient Glow */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/10 rounded-full blur-[90px] pointer-events-none" />
          </div>

          {/* Search Bar & Category Filter Strip */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search instruments by name..."
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#121212] border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 scrollbar-hide">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-primary text-black shadow-glow-primary-sm'
                      : 'bg-[#141414] border border-neutral-800 text-neutral-400 hover:text-white hover:bg-[#1E1E1E]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

          </div>

          {/* Instrument Grid */}
          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between text-xs text-neutral-400 pb-2 border-b border-neutral-800">
              <span className="font-bold text-white">
                Instruments Available ({filteredSounds.length})
              </span>
              <span>Click to open in studio • Audition with play button</span>
            </div>

            {filteredSounds.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {filteredSounds.map((sound, index) => (
                  <SoundCard
                    key={`${sound.name}-${index}`}
                    name={sound.name}
                    image={sound.image}
                    audio={sound.audio}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-12 text-center bg-[#121212] border border-neutral-800 rounded-2xl">
                <Music size={36} className="text-neutral-500 mb-3" />
                <h3 className="text-base font-bold text-white mb-1">No instruments found</h3>
                <p className="text-xs text-neutral-400 mb-4">
                  No preset matched your search "{searchTerm}". Try clearing your filter.
                </p>
                <button
                  onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                  className="px-4 py-2 rounded-xl bg-primary text-black font-bold text-xs"
                >
                  Reset Filter
                </button>
              </div>
            )}
          </section>

        </main>
      )}

      <Footer />
    </div>
  );
};

export default Dashboard;

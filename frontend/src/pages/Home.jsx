import React, { useState, useEffect, useRef } from 'react';
import { AlbumData, DashboardData, Images } from '../constants';
import Navbar from '../components/Navbar';
import HomeAlbumCard from '../components/HomeAlbumCard';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Play, 
  Disc, 
  SlidersHorizontal,
  Flame
} from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [counters, setCounters] = useState({
    instruments: 50,
    soundEffects: 10,
    musiciansLoved: 4500
  });

  const countingRef = useRef(null);

  useEffect(() => {
    let interval = null;
    const node = countingRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          interval = setInterval(() => {
            setCounters((prev) => {
              const nextInst = prev.instruments < 140 ? prev.instruments + 5 : 140;
              const nextFx = prev.soundEffects < 120 ? prev.soundEffects + 5 : 120;
              const nextLove = prev.musiciansLoved < 6500 ? prev.musiciansLoved + 100 : 6500;
              if (nextInst >= 140 && nextFx >= 120 && nextLove >= 6500) {
                clearInterval(interval);
              }
              return {
                instruments: nextInst,
                soundEffects: nextFx,
                musiciansLoved: nextLove
              };
            });
          }, 40);
        }
      },
      { threshold: 0.3 }
    );

    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) observer.unobserve(node);
      if (interval) clearInterval(interval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col text-white selection:bg-primary selection:text-black">
      <Navbar />

      {/* Hero Section with Glowing Orange Ambience */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 px-6 lg:px-12 bg-black">
        {/* Ambient Orange Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary/20 blur-[130px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          
          {/* Music Piano Symbol Pop-up */}
          <div className="animate-piano-popup mb-5 flex flex-col items-center select-none">
            <div className="relative inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-[#121212]/90 border border-neutral-800 shadow-[0_10px_35px_rgba(0,0,0,0.8)] backdrop-blur-sm group hover:border-primary/50 transition-all">
              
              {/* Floating Musical Notes */}
              <span className="absolute -top-3.5 -left-3 text-primary text-xs font-bold animate-note-float-1 pointer-events-none">
                ♪
              </span>
              <span className="absolute -top-4 right-1 text-primary text-sm font-bold animate-note-float-2 pointer-events-none">
                ♫
              </span>
              <span className="absolute -bottom-2.5 -right-3 text-amber-400 text-xs font-bold animate-note-float-3 pointer-events-none">
                ♩
              </span>

              {/* Animated Mini Piano Keys Motif */}
              <div className="flex items-end gap-[3px] h-6 px-1.5 py-1 bg-black rounded-lg border border-neutral-800 shadow-inner">
                <span className="w-1.5 bg-white rounded-b-sm animate-[pianoKeyTap_1.2s_ease-in-out_infinite_0.1s]" style={{ height: '14px' }} />
                <span className="w-1.5 bg-primary rounded-b-sm animate-[pianoKeyTap_1.2s_ease-in-out_infinite_0.3s]" style={{ height: '18px' }} />
                <span className="w-1.5 bg-white rounded-b-sm animate-[pianoKeyTap_1.2s_ease-in-out_infinite_0.5s]" style={{ height: '13px' }} />
                <span className="w-1.5 bg-primary rounded-b-sm animate-[pianoKeyTap_1.2s_ease-in-out_infinite_0.7s]" style={{ height: '20px' }} />
                <span className="w-1.5 bg-white rounded-b-sm animate-[pianoKeyTap_1.2s_ease-in-out_infinite_0.9s]" style={{ height: '15px' }} />
                <span className="w-1.5 bg-primary rounded-b-sm animate-[pianoKeyTap_1.2s_ease-in-out_infinite_0.4s]" style={{ height: '17px' }} />
                <span className="w-1.5 bg-white rounded-b-sm animate-[pianoKeyTap_1.2s_ease-in-out_infinite_0.2s]" style={{ height: '14px' }} />
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-mono font-bold tracking-wider text-neutral-300 uppercase">
                  ChordBeat Studio
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block animate-ping" />
              </div>
            </div>
          </div>

          {/* Main Title with Staggered Music Chord Reveal */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.15] mb-6 overflow-hidden">
            <span className="inline-block animate-chord-1 mr-3 sm:mr-4">
              Your Digital
            </span>
            <span className="inline-block animate-chord-2 text-primary relative">
              Beat Studio
              <span className="block h-[3px] w-full bg-gradient-to-r from-transparent via-primary to-transparent mt-1.5 rounded-full opacity-80" />
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-neutral-300 max-w-2xl leading-relaxed mb-10">
            Where creativity strikes a perfect harmony. Compose chords, record live takes, experiment with polyphonic instruments, and export your tracks instantly.
          </p>

          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link
              to="/studio"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-primary hover:bg-primary-hover text-black font-bold shadow-glow-primary transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 text-base"
            >
              <Play size={18} className="fill-black" />
              Launch Studio Now
            </Link>
            
            <Link
              to="/dashboard"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#141414] hover:bg-[#1E1E1E] border border-neutral-800 text-white font-medium transition-all flex items-center justify-center gap-2 text-base"
            >
              <Disc size={18} className="text-primary" />
              Explore Instruments
            </Link>
          </div>

        </div>
      </section>

      {/* Quick Launch Instruments Strip */}
      <section className="px-6 lg:px-12 -mt-6 mb-16 relative z-20">
        <div className="max-w-7xl mx-auto bg-[#121212] border border-neutral-800 p-4 md:p-6 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
              <SlidersHorizontal size={14} className="text-primary" />
              Quick Play Instruments
            </span>
            <Link to="/dashboard" className="text-xs text-primary hover:text-primary-hover flex items-center gap-1 font-bold">
              View All <ArrowRight size={12} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
            {DashboardData.Instruments.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/studio/${item.name.toLowerCase()}`)}
                className="group flex flex-col items-center justify-center p-3 rounded-xl bg-black/60 hover:bg-[#1A1A1A] border border-neutral-800/80 hover:border-primary/50 cursor-pointer transition-all transform hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-[#181818] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <img src={item.image} alt={item.name} className="h-7 w-7 object-contain" />
                </div>
                <span className="text-xs font-medium text-white group-hover:text-primary transition-colors">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature & Rhythm Section with Live Counters */}
      <section className="px-6 lg:px-12 py-16 bg-[#0D0D0D] border-y border-neutral-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text & Stats */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-primary/10 border border-primary/20 text-xs font-bold text-primary w-fit">
              <Flame size={14} className="text-primary" />
              Boundless Sound Creation
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              Your <span className="text-primary">Rhythm</span>, <br />
              Your <span className="text-primary">Rules</span>.
            </h2>

            <p className="text-base text-neutral-400 leading-relaxed">
              Record, loop, and practice notes on your music ideas from start to finish. Our browser studio delivers zero-latency tactile response, pitch control, and preset song accompaniments right at your fingertips.
            </p>

            {/* Counters Grid */}
            <div ref={countingRef} className="grid grid-cols-3 gap-4 pt-4 border-t border-neutral-800">
              <div className="flex flex-col">
                <span className="font-mono text-2xl sm:text-3xl font-extrabold text-white">
                  {counters.instruments}+
                </span>
                <span className="text-xs text-primary font-bold mt-1">Instruments</span>
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-2xl sm:text-3xl font-extrabold text-white">
                  {counters.soundEffects}+
                </span>
                <span className="text-xs text-primary font-bold mt-1">Sound Presets</span>
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-2xl sm:text-3xl font-extrabold text-white">
                  {counters.musiciansLoved.toLocaleString()}+
                </span>
                <span className="text-xs text-primary font-bold mt-1">Tracks Played</span>
              </div>
            </div>

            <div>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-black font-bold text-sm shadow-glow-primary hover:bg-primary-hover transition-all mt-2"
              >
                Browse Sound Library <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          {/* Right Banner Showcase */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <div className="relative w-full max-w-lg rounded-2xl overflow-hidden border border-neutral-800 p-2 shadow-2xl bg-[#141414]">
              <img
                src={Images.BANNER1}
                alt="ChordBeat Studio Interface"
                className="w-full h-auto rounded-xl object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none rounded-xl" />
            </div>
          </div>

        </div>
      </section>

      {/* Showcase Today Albums / Sound Packs */}
      <section className="px-6 lg:px-12 py-20 max-w-7xl mx-auto w-full">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider mb-2">
            <Disc size={16} className="animate-spin text-primary" />
            ChordBeat Today
          </div>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
            Curated Beat Packs & Melodies
          </h3>
          <p className="text-sm text-neutral-400 mt-2 max-w-md">
            Dive into trending sound collections handpicked for instant inspiration.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {AlbumData.map((item, index) => (
            <HomeAlbumCard key={index} image={item.image} title={item.title} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;

import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Images } from '../constants';
import { Sparkles, Music2, Headphones } from 'lucide-react';

const BannerCarousel = () => {
  return (
    <div className="w-full h-full flex items-center justify-center p-6 lg:p-12">
      <div className="w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl border-4 border-black/20 bg-black relative">
        <Carousel 
          autoPlay={true} 
          interval={4000} 
          infiniteLoop={true} 
          showThumbs={false} 
          showStatus={false} 
          swipeable={true}
          showIndicators={true}
          className="rounded-3xl overflow-hidden"
        >
          {/* Slide 1 */}
          <div className="relative h-[520px] w-full flex flex-col justify-end p-8 text-left">
            <img 
              src={Images.CAROUSEL1} 
              alt="ChordBeat Virtual Instruments" 
              className="absolute inset-0 w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="relative z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-black font-bold text-xs mb-3 shadow-glow-primary-sm">
                <Music2 size={13} /> Acoustic & Synth Engines
              </span>
              <h3 className="text-2xl lg:text-3xl font-extrabold text-white">
                Polyphonic Sound Workstation
              </h3>
              <p className="text-xs text-neutral-300 mt-2 leading-relaxed max-w-md">
                Play piano chords, guitar rhythms, and percussion beats in real-time with zero latency.
              </p>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="relative h-[520px] w-full flex flex-col justify-end p-8 text-left">
            <img 
              src={Images.CAROUSEL2} 
              alt="Interactive Practice Mode" 
              className="absolute inset-0 w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="relative z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-black font-bold text-xs mb-3 shadow-glow-primary-sm">
                <Sparkles size={13} /> Interactive Accompaniment
              </span>
              <h3 className="text-2xl lg:text-3xl font-extrabold text-white">
                Play Along with Hit Songs
              </h3>
              <p className="text-xs text-neutral-300 mt-2 leading-relaxed max-w-md">
                Follow illuminating keys and master melodies from popular tracks straight in your browser.
              </p>
            </div>
          </div>

          {/* Slide 3 */}
          <div className="relative h-[520px] w-full flex flex-col justify-end p-8 text-left">
            <img 
              src={Images.CAROUSEL3} 
              alt="Record & Export" 
              className="absolute inset-0 w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="relative z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-black font-bold text-xs mb-3 shadow-glow-primary-sm">
                <Headphones size={13} /> Live Recording & Export
              </span>
              <h3 className="text-2xl lg:text-3xl font-extrabold text-white">
                Capture Every Musical Idea
              </h3>
              <p className="text-xs text-neutral-300 mt-2 leading-relaxed max-w-md">
                Record your takes with millisecond timing accuracy, replay tracks, and export sessions anytime.
              </p>
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default BannerCarousel;

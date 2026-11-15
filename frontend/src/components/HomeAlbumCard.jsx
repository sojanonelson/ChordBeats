import React from 'react';
import { Play, Disc3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HomeAlbumCard = ({ image, title }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="group flex flex-col items-center cursor-pointer transition-all duration-300 transform hover:-translate-y-2"
      onClick={() => navigate('/studio')}
    >
      <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden bg-[#141414] border border-neutral-800 p-2 shadow-xl group-hover:border-primary/60 group-hover:shadow-glow-primary transition-all">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105" 
        />
        {/* Play Overlay */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
          <div className="w-12 h-12 rounded-full bg-primary shadow-glow-primary flex items-center justify-center text-black transform group-hover:scale-110 transition-transform font-bold">
            <Play size={20} className="fill-black ml-0.5" />
          </div>
        </div>
      </div>

      <div className="mt-3 text-center">
        <p className="text-base font-semibold text-white group-hover:text-primary transition-colors">
          {title}
        </p>
        <span className="text-xs text-neutral-400 flex items-center justify-center gap-1 mt-0.5">
          <Disc3 size={12} className="text-primary" /> Curated Sound Pack
        </span>
      </div>
    </div>
  );
};

export default HomeAlbumCard;

import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import StorageService from '../services/StorageService';
import { logout } from '../redux/reducers/userSlice';
import { 
  Mail, 
  Calendar, 
  Music, 
  LogOut, 
  Sparkles, 
  Disc, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { Images } from '../constants';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.user);

  const handleLogout = () => {
    dispatch(logout());
    StorageService.removeToken();
    StorageService.removeUserID();
    navigate('/');
  };

  const user = typeof userData === 'object' && userData !== null ? userData : null;
  const username = user?.name || "Musician";
  const email = user?.email || "No email linked";
  const avatar = user?.profileImage || Images.LOGO;
  const memberSince = user?.created ? new Date(user.created).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : 'Recently Joined';

  return (
    <div className="min-h-screen bg-black flex flex-col text-white selection:bg-primary selection:text-black">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto p-4 md:p-8 flex flex-col gap-8">
        
        {/* User Header Profile Card */}
        <div className="bg-[#121212] p-6 md:p-8 rounded-3xl border border-neutral-800 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            
            {/* Avatar with Glow Ring */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden ring-4 ring-primary/40 shadow-glow-primary shrink-0 bg-black">
              <img
                src={avatar}
                alt={username}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = Images.LOGO; }}
              />
            </div>

            {/* Profile Info */}
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {username}
                  </h1>
                  <p className="text-sm text-primary font-mono mt-0.5">@{username.toLowerCase().replace(/\s+/g, '_')}</p>
                </div>

                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold">
                    <ShieldCheck size={14} /> Active Beatmaker
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-2 text-xs text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <Mail size={14} className="text-primary" /> {email}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-primary" /> Member since {memberSince}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-4 pt-4 border-t border-neutral-800">
                <Link
                  to="/studio"
                  className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-black text-xs font-bold shadow-glow-primary transition-all flex items-center gap-1.5"
                >
                  <Music size={14} /> Open Studio
                </Link>

                <button
                  onClick={handleLogout}
                  className="px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold transition-colors flex items-center gap-1.5 border border-red-500/20"
                >
                  <LogOut size={14} /> Sign Out
                </button>
              </div>

            </div>

          </div>

          {/* Ambient Lighting */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
        </div>

        {/* Quick Stats & Workspace Hub */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          <div className="bg-[#121212] border border-neutral-800 p-5 rounded-2xl flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
              <span className="font-bold uppercase tracking-wider text-white">Virtual Instruments</span>
              <Disc size={16} className="text-primary" />
            </div>
            <p className="text-2xl font-extrabold text-white font-mono">140+ Notes</p>
            <p className="text-xs text-neutral-400 mt-1">High-fidelity acoustic piano, guitar, and drum kit samples ready to play.</p>
            <Link to="/studio" className="text-xs text-primary hover:text-primary-hover font-bold mt-4 flex items-center gap-1">
              Start playing <ArrowRight size={12} />
            </Link>
          </div>

          <div className="bg-[#121212] border border-neutral-800 p-5 rounded-2xl flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
              <span className="font-bold uppercase tracking-wider text-white">Preset Accompaniments</span>
              <Sparkles size={16} className="text-primary" />
            </div>
            <p className="text-2xl font-extrabold text-white font-mono">4 Demo Tracks</p>
            <p className="text-xs text-neutral-400 mt-1">Interactive play-along melodies with live piano roll visual feedback.</p>
            <Link to="/studio" className="text-xs text-primary hover:text-primary-hover font-bold mt-4 flex items-center gap-1">
              Explore tracks <ArrowRight size={12} />
            </Link>
          </div>

          <div className="bg-[#121212] border border-neutral-800 p-5 rounded-2xl flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
              <span className="font-bold uppercase tracking-wider text-white">Track Recordings</span>
              <Music size={16} className="text-primary" />
            </div>
            <p className="text-2xl font-extrabold text-white font-mono">JSON Engine</p>
            <p className="text-xs text-neutral-400 mt-1">Export and import millisecond-accurate note sequences anytime.</p>
            <Link to="/dashboard" className="text-xs text-primary hover:text-primary-hover font-bold mt-4 flex items-center gap-1">
              Browse sound packs <ArrowRight size={12} />
            </Link>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
};

export default Profile;

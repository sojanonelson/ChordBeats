import React, { useState, useRef, useEffect } from 'react';
import { Images } from '../constants';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import StorageService from '../services/StorageService';
import { logout } from "../redux/reducers/userSlice";
import { 
  Music, 
  LayoutDashboard, 
  User as UserIcon, 
  LogOut, 
  Menu, 
  X, 
  ChevronDown 
} from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const userLogout = async () => {
    try {
      dispatch(logout());
      StorageService.removeToken();
      StorageService.removeUserID();
      setIsOpen(false);
      setMobileMenuOpen(false);
      navigate('/');
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full bg-black border-b border-neutral-800/80 px-4 lg:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo - NO background behind logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <img 
            src={Images.LOGO} 
            alt="ChordBeat Logo" 
            className="h-10 w-10 object-contain transition-transform group-hover:scale-105" 
          />
          <div className="flex flex-col">
            <span className="text-2xl font-extrabold tracking-tight text-white group-hover:text-primary transition-colors flex items-center gap-1">
              ChordBeat
              <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>
            </span>
            <span className="text-[10px] font-semibold tracking-widest uppercase text-neutral-400 -mt-1">
              Beat Studio
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#111111] p-1.5 rounded-full border border-neutral-800">
          <Link
            to="/"
            className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-all ${
              isActive('/') 
                ? 'bg-primary text-black font-bold shadow-glow-primary-sm' 
                : 'text-neutral-300 hover:text-white hover:bg-neutral-800/60'
            }`}
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-all flex items-center gap-1.5 ${
              isActive('/dashboard') 
                ? 'bg-primary text-black font-bold shadow-glow-primary-sm' 
                : 'text-neutral-300 hover:text-white hover:bg-neutral-800/60'
            }`}
          >
            <LayoutDashboard size={15} />
            Instruments
          </Link>
          <Link
            to="/studio"
            className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-all flex items-center gap-1.5 ${
              isActive('/studio') 
                ? 'bg-primary text-black font-bold shadow-glow-primary-sm' 
                : 'text-primary hover:text-primary-hover hover:bg-primary/10'
            }`}
          >
            <Music size={15} />
            Studio
            <span className="flex h-2 w-2 relative ml-0.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
          </Link>
        </nav>

        {/* Right Section: Auth & Profile */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2.5 p-1.5 pr-3.5 rounded-full bg-[#141414] border border-neutral-800 hover:border-primary/50 transition-all text-left"
              >
                <img
                  src={user.profileImage || Images.LOGO}
                  alt={user.name || "User"}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/60"
                  onError={(e) => { e.target.src = Images.LOGO; }}
                />
                <span className="text-sm font-semibold text-white max-w-[120px] truncate">
                  {user.name || "Musician"}
                </span>
                <ChevronDown size={14} className={`text-neutral-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isOpen && (
                <div className="absolute right-0 mt-2 w-60 rounded-2xl bg-[#141414] border border-neutral-800 shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-2.5 border-b border-neutral-800">
                    <p className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium">Logged in as</p>
                    <p className="text-sm font-bold text-white truncate">{user.email || user.name}</p>
                  </div>

                  <div className="py-1.5">
                    <Link
                      to="/studio"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-neutral-200 hover:bg-[#202020] hover:text-primary transition-colors"
                    >
                      <Music size={16} className="text-primary" />
                      Open Studio
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-neutral-200 hover:bg-[#202020] hover:text-primary transition-colors"
                    >
                      <UserIcon size={16} />
                      My Profile
                    </Link>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-neutral-200 hover:bg-[#202020] hover:text-primary transition-colors"
                    >
                      <LayoutDashboard size={16} />
                      Dashboard
                    </Link>
                  </div>

                  <div className="pt-1.5 border-t border-neutral-800">
                    <button
                      onClick={userLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors text-left"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-2 rounded-xl text-sm font-semibold text-neutral-300 hover:text-white transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2 rounded-xl text-sm font-bold text-black bg-primary hover:bg-primary-hover shadow-glow-primary transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Signup
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl bg-[#141414] border border-neutral-800 text-white hover:text-primary"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden pt-4 pb-2 border-t border-neutral-800 mt-3 flex flex-col gap-2">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold ${
              isActive('/') ? 'bg-primary text-black' : 'text-neutral-300'
            }`}
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 ${
              isActive('/dashboard') ? 'bg-primary text-black' : 'text-neutral-300'
            }`}
          >
            <LayoutDashboard size={16} />
            Explore Instruments
          </Link>
          <Link
            to="/studio"
            onClick={() => setMobileMenuOpen(false)}
            className="px-4 py-2.5 rounded-xl text-sm font-bold text-black bg-primary flex items-center gap-2 shadow-glow-primary"
          >
            <Music size={16} />
            Open Studio
          </Link>

          <div className="pt-2 border-t border-neutral-800 mt-2">
            {user ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-neutral-200 flex items-center gap-2"
                >
                  <UserIcon size={16} />
                  Profile ({user.name})
                </Link>
                <button
                  onClick={userLogout}
                  className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 flex items-center gap-2 hover:bg-red-500/10"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 rounded-xl text-center text-sm font-semibold text-white bg-neutral-900 border border-neutral-800"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 rounded-xl text-center text-sm font-bold text-black bg-primary"
                >
                  Signup
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

import React, { useState, useEffect, useCallback } from 'react';
import { Images } from '../constants';
import { Link, useNavigate } from 'react-router-dom';
import { login, googleLogin, githubLogin } from '../services/authService';
import StorageService from '../services/StorageService';
import { setUser } from '../redux/reducers/userSlice';
import { setUserLoggedIn } from '../redux/reducers/generalSlice';
import { useDispatch } from 'react-redux';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  AlertCircle
} from 'lucide-react';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle Google OAuth Credential response
  const handleGoogleCredentialResponse = useCallback(async (response) => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const base64Url = response.credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        window.atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      const payload = JSON.parse(jsonPayload);

      const res = await googleLogin({
        name: payload.name || payload.email.split('@')[0],
        email: payload.email,
        profileImage: payload.picture || '',
        googleId: payload.sub,
      });

      if (res && res.success) {
        dispatch(setUser(res.user));
        dispatch(setUserLoggedIn(true));
        StorageService.saveUserID(res.user._id);
        StorageService.saveToken(res.user.token);
        navigate('/');
      } else {
        setErrorMessage(res?.message || 'Google login failed.');
      }
    } catch (err) {
      console.error('Google login error:', err);
      setErrorMessage('Could not sign in with Google. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    if (window.google?.accounts?.id && clientId) {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleGoogleCredentialResponse,
      });
    }
  }, [handleGoogleCredentialResponse]);

  const handleGoogleSignIn = () => {
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    if (window.google?.accounts?.id && clientId) {
      window.google.accounts.id.prompt();
    } else {
      const promptEmail = prompt(
        "Google Sign-In: Enter your Google email to login:",
        "user@gmail.com"
      );
      if (promptEmail && promptEmail.includes('@')) {
        simulateSocialLogin('google', promptEmail.trim());
      }
    }
  };

  const handleGitHubSignIn = () => {
    const promptUsername = prompt(
      "GitHub Sign-In: Enter your GitHub username or email to login:",
      "developer"
    );
    if (promptUsername) {
      const simulatedEmail = promptUsername.includes('@') 
        ? promptUsername.trim() 
        : `${promptUsername.trim().toLowerCase()}@github.com`;
      simulateSocialLogin('github', simulatedEmail);
    }
  };

  const simulateSocialLogin = async (provider, socialEmail) => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const defaultName = socialEmail.split('@')[0];
      const formattedName = defaultName.charAt(0).toUpperCase() + defaultName.slice(1);
      
      const loginFn = provider === 'github' ? githubLogin : googleLogin;
      const res = await loginFn({
        name: formattedName,
        email: socialEmail,
        profileImage: Images.AVATAR1 || '',
      });

      if (res && res.success) {
        dispatch(setUser(res.user));
        dispatch(setUserLoggedIn(true));
        StorageService.saveUserID(res.user._id);
        StorageService.saveToken(res.user.token);
        navigate('/');
      } else {
        setErrorMessage(res?.message || `${provider} sign-in failed.`);
      }
    } catch (err) {
      console.error(`${provider} login error:`, err);
      setErrorMessage(`${provider} login failed. Please check backend connection.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim()) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    if (!password) {
      setErrorMessage("Please enter your password.");
      return;
    }

    handleEmailLogin();
  };

  const handleEmailLogin = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      localStorage.clear();
      const response = await login({ email: email.trim(), password });

      if (response && response.success) {
        setIsLoading(false);
        dispatch(setUser(response.user));
        dispatch(setUserLoggedIn(true));
        StorageService.saveUserID(response.user._id);
        StorageService.saveToken(response.user.token);
        navigate('/');
      } else {
        setIsLoading(false);
        setErrorMessage(response?.message || 'Invalid email or password.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setIsLoading(false);
      setErrorMessage(
        err?.response?.data?.message || 
        err?.response?.data?.msg || 
        'Login failed. Please check your email and password.'
      );
    }
  };

  return (
    <div className="min-h-screen w-screen bg-[#08090E] text-white flex items-center justify-center p-4 lg:p-8 relative overflow-hidden select-none">
      
      {/* Background Ambient Lighting Matching Reference Image */}
      <div className="absolute top-1/4 -left-40 w-[600px] h-[600px] bg-purple-900/25 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute -bottom-40 right-1/4 w-[700px] h-[700px] bg-orange-600/20 blur-[180px] pointer-events-none rounded-full" />
      <div className="absolute top-10 right-10 w-[400px] h-[400px] bg-amber-500/10 blur-[140px] pointer-events-none rounded-full" />

      {/* Main Container Layout */}
      <div className="max-w-[1500px] w-full min-h-[640px] flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
        
        {/* Left: Floating Translucent Login Card */}
        <div className="w-full max-w-[440px] bg-[#11131B]/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-7 sm:p-9 shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex flex-col justify-between shrink-0 relative overflow-hidden">
          
          {/* Subtle bottom-left glow inside card */}
          <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-orange-600/20 blur-[50px] pointer-events-none rounded-full" />
          <div className="absolute -top-16 -right-16 w-36 h-36 bg-purple-600/15 blur-[50px] pointer-events-none rounded-full" />

          <div className="relative z-10">
            
            {/* Logo Header: Orange Soundwave + ChordBeat + MUSIC STUDIO */}
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              <div className="flex items-center gap-[3px] text-primary">
                <span className="w-1 h-3 bg-primary rounded-full inline-block"></span>
                <span className="w-1 h-5 bg-primary rounded-full inline-block"></span>
                <span className="w-1 h-8 bg-primary rounded-full inline-block"></span>
                <span className="w-1 h-10 bg-primary rounded-full inline-block"></span>
                <span className="w-1 h-7 bg-primary rounded-full inline-block"></span>
                <span className="w-1 h-5 bg-primary rounded-full inline-block"></span>
                <span className="w-1 h-3 bg-primary rounded-full inline-block"></span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white group-hover:text-primary transition-colors leading-none">
                  ChordBeat
                </span>
                <span className="text-[9px] font-bold tracking-widest text-neutral-400 uppercase mt-0.5">
                  MUSIC STUDIO
                </span>
              </div>
            </Link>

            {/* Headline */}
            <div className="mt-7 mb-5">
              <h1 className="text-3xl sm:text-[32px] font-extrabold text-white tracking-tight leading-tight">
                Login to Your <br />
                <span className="bg-gradient-to-r from-[#FF7A00] via-[#FF6A3D] to-[#FF5376] bg-clip-text text-transparent">
                  Music Studio
                </span>
              </h1>
              <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                Play instruments online, create music, record, and bring your ideas to life.
              </p>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/40 border border-red-500/50 text-red-300 text-xs flex items-center gap-2 animate-in fade-in">
                <AlertCircle size={15} className="text-red-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
              
              {/* Email Field */}
              <div className="bg-[#171923] border border-neutral-800/90 rounded-xl px-3.5 py-3 flex items-center gap-3 focus-within:border-primary/80 focus-within:ring-1 focus-within:ring-primary/40 transition-all">
                <Mail size={16} className="text-neutral-400 shrink-0" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  autoComplete="email"
                  className="bg-transparent text-sm text-white placeholder-neutral-500 outline-none w-full font-medium"
                />
              </div>

              {/* Password Field */}
              <div className="bg-[#171923] border border-neutral-800/90 rounded-xl px-3.5 py-3 flex items-center gap-3 focus-within:border-primary/80 focus-within:ring-1 focus-within:ring-primary/40 transition-all">
                <Lock size={16} className="text-neutral-400 shrink-0" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  autoComplete="current-password"
                  className="bg-transparent text-sm text-white placeholder-neutral-500 outline-none w-full font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-neutral-400 hover:text-neutral-200 transition-colors shrink-0"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {/* Forgot password */}
              <div className="flex justify-end -mt-1">
                <span className="text-xs text-[#7B88A8] hover:text-primary cursor-pointer transition-colors font-medium">
                  Forgot password?
                </span>
              </div>

              {/* Orange Gradient Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="mt-2 w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#FF7A00] via-[#FF661A] to-[#FF453A] hover:from-[#FF8A1F] hover:to-[#FF5A50] text-black font-extrabold text-sm tracking-wide shadow-lg shadow-orange-600/30 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Login</span>
                    <ArrowRight size={16} strokeWidth={2.5} />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-800/80"></div>
              </div>
              <div className="relative flex justify-center text-[11px] lowercase">
                <span className="bg-[#11131B] px-3 text-neutral-500 font-medium tracking-wide">
                  or continue with
                </span>
              </div>
            </div>

            {/* Social Logins: Google & GitHub Only */}
            <div className="flex items-center justify-center gap-4">
              
              {/* Google Button */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                title="Sign in with Google"
                className="w-14 h-12 rounded-2xl bg-[#171923] hover:bg-[#202330] border border-neutral-800 hover:border-primary/60 flex items-center justify-center transition-all shadow-sm transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 group"
              >
                <svg className="w-5 h-5 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
              </button>

              {/* GitHub Button */}
              <button
                type="button"
                onClick={handleGitHubSignIn}
                disabled={isLoading}
                title="Sign in with GitHub"
                className="w-14 h-12 rounded-2xl bg-[#171923] hover:bg-[#202330] border border-neutral-800 hover:border-primary/60 flex items-center justify-center transition-all shadow-sm transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 group"
              >
                <svg className="w-5 h-5 fill-white transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </button>

            </div>

            {/* Create an account footer link */}
            <div className="mt-6 text-center text-xs text-neutral-400">
              New to ChordBeat?{' '}
              <Link 
                to="/signup" 
                className="text-primary hover:text-primary-hover font-bold inline-flex items-center gap-1 transition-colors ml-1"
              >
                Create an account <ArrowRight size={13} />
              </Link>
            </div>

          </div>

        </div>

        {/* Right: Studio Scene from Mockup */}
        <div className="hidden lg:flex flex-1 items-center justify-center w-full max-w-[860px] pl-6 xl:pl-10">
          <div className="relative w-full rounded-3xl overflow-hidden border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.9)] bg-[#0d0f1c] group">
            <img 
              src={Images.LOGIN_STUDIO_RIGHT} 
              alt="ChordBeat - An Online Instrument Player & Music Creation Studio" 
              className="w-full h-auto object-cover rounded-3xl transform transition-transform duration-700 group-hover:scale-[1.01]" 
            />
            {/* Ambient subtle border ring */}
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl pointer-events-none" />
          </div>
        </div>

      </div>

    </div>
  );
};

export default Login;

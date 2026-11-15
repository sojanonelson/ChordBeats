import React, { useState, useEffect } from 'react';
import { Bell, BellRing, X, Check } from 'lucide-react';
import { 
  isNotificationSupported, 
  getNotificationPermission, 
  requestNotificationPermission, 
  sendNotification 
} from '../services/notificationService';

const DISMISS_KEY = 'chordbeat_notif_prompt_dismissed_at';
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

const NotificationPrompt = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isEnabling, setIsEnabling] = useState(false);
  const [grantedFeedback, setGrantedFeedback] = useState(false);

  useEffect(() => {
    // Only proceed if notifications are supported and permission is 'default' (not yet decided)
    if (!isNotificationSupported()) return;
    if (getNotificationPermission() !== 'default') return;

    // Check if dismissed recently (within 7 days)
    const dismissedAt = localStorage.getItem(DISMISS_KEY);
    if (dismissedAt) {
      const timeSinceDismiss = Date.now() - parseInt(dismissedAt, 10);
      if (timeSinceDismiss < SEVEN_DAYS_MS) {
        return;
      }
    }

    // Trigger after exactly 10 seconds of website being open
    const timer = setTimeout(() => {
      // Re-check permission right before showing
      if (getNotificationPermission() === 'default') {
        setIsVisible(true);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleAllow = async () => {
    setIsEnabling(true);
    try {
      const permission = await requestNotificationPermission();
      if (permission === 'granted') {
        setGrantedFeedback(true);
        // Fire confirmation notification
        sendNotification('ChordBeat Studio 🎵', {
          body: 'Notifications enabled! You will receive alerts when your audio is exported or beats are ready.',
          icon: '/favicon.ico',
        });
        setTimeout(() => {
          setIsVisible(false);
        }, 1200);
      } else {
        setIsVisible(false);
      }
    } catch (err) {
      console.error('Error allowing notifications:', err);
      setIsVisible(false);
    } finally {
      setIsEnabling(false);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem(DISMISS_KEY, Date.now().toString());
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside 
      aria-label="Notification permission request"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[9999] max-w-[380px] w-[calc(100vw-2.5rem)] animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="bg-[#121316] border border-primary/40 shadow-[0_12px_40px_rgba(0,0,0,0.85)] p-4 sm:p-5 relative select-none">
        
        {/* Accent Top Border */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-orange-400 to-primary" />

        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 text-neutral-400 hover:text-white transition-colors p-1"
          aria-label="Close notification prompt"
        >
          <X size={15} />
        </button>

        <div className="flex items-start gap-3.5 pr-4">
          {/* Icon Badge */}
          <div className="w-10 h-10 shrink-0 bg-primary/10 border border-primary/30 flex items-center justify-center text-primary mt-0.5">
            {grantedFeedback ? (
              <Check size={20} className="text-primary animate-bounce" />
            ) : (
              <BellRing size={20} className="text-primary animate-pulse" />
            )}
          </div>

          {/* Text Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-white tracking-tight">
                {grantedFeedback ? 'Notifications Enabled!' : 'Enable Studio Alerts'}
              </h4>
              <span className="text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.5 bg-primary/15 text-primary border border-primary/30">
                ChordBeat
              </span>
            </div>

            <p className="text-xs text-neutral-300 mt-1.5 leading-relaxed">
              {grantedFeedback 
                ? "You're all set! You'll be notified when your audio recordings and beats are exported."
                : "Get notified directly when your audio recordings are exported, beats are rendered, or studio sessions finish."
              }
            </p>

            {/* Feature Pills */}
            {!grantedFeedback && (
              <div className="flex flex-wrap items-center gap-2 mt-2.5 text-[11px] text-neutral-400 font-mono">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Audio Export
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Session Saves
                </span>
              </div>
            )}

            {/* Actions */}
            {!grantedFeedback && (
              <div className="flex items-center gap-2.5 mt-4 pt-1">
                <button
                  type="button"
                  onClick={handleAllow}
                  disabled={isEnabling}
                  className="flex-1 py-2 px-3 bg-primary hover:bg-[#ff961f] text-black font-semibold text-xs tracking-wide transition-all shadow-[0_4px_14px_rgba(244,132,0,0.3)] active:scale-[0.98] flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  <Bell size={13} className="fill-black" />
                  <span>{isEnabling ? 'Enabling...' : 'Allow Alerts'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleDismiss}
                  className="py-2 px-3 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white text-xs border border-neutral-700 transition-colors"
                >
                  Later
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default NotificationPrompt;


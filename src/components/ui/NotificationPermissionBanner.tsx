import React, { useState, useEffect } from 'react';
import { Bell, BellRing, Check, X, Smartphone, Sparkles, Volume2 } from 'lucide-react';
import { requestNotificationPermission, playChimeSound } from '../../lib/notifications';

export const NotificationPermissionBanner: React.FC = () => {
  const [permission, setPermission] = useState<NotificationPermission | 'unsupported'>('default');
  const [isDismissed, setIsDismissed] = useState<boolean>(() => {
    return localStorage.getItem('mrdeepak_notification_banner_dismissed') === 'true';
  });
  const [isGrantedJustNow, setIsGrantedJustNow] = useState(false);

  useEffect(() => {
    if (!('Notification' in window)) {
      setPermission('unsupported');
      return;
    }
    setPermission(Notification.permission);
  }, []);

  const handleEnableNotifications = async () => {
    const res = await requestNotificationPermission();
    setPermission(res);
    if (res === 'granted') {
      setIsGrantedJustNow(true);
      playChimeSound();
      try {
        new Notification('🔔 Notifications Active!', {
          body: 'Mobile alerts connected. You will now receive instant phone notifications whenever client forms are saved to Supabase!',
          icon: '/favicon.ico',
        });
      } catch (e) {
        console.warn('Test notification caught:', e);
      }
      setTimeout(() => {
        setIsDismissed(true);
        localStorage.setItem('mrdeepak_notification_banner_dismissed', 'true');
      }, 4000);
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('mrdeepak_notification_banner_dismissed', 'true');
  };

  // If already granted, unsupported, or dismissed, don't show prompt banner
  if (isDismissed || permission === 'granted' || permission === 'unsupported' || permission === 'denied') {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-cyan-950/90 via-neutral-900/95 to-indigo-950/90 border-b border-cyan-500/30 text-white px-4 py-2.5 relative z-40 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center shrink-0 text-cyan-300 animate-pulse">
            <BellRing className="w-4 h-4" />
          </div>
          <div>
            <div className="font-semibold text-white flex items-center gap-1.5 justify-center sm:justify-start">
              <span>Instant Mobile & Phone Alerts for Form Submissions</span>
              <span className="text-[10px] font-mono bg-cyan-500/20 text-cyan-300 px-1.5 py-0.2 rounded border border-cyan-500/30">Live Supabase</span>
            </div>
            <p className="text-neutral-300 text-[11px] leading-tight mt-0.5">
              Turn on phone push notifications & sound chimes to get instant alerts whenever an inquiry is submitted.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {isGrantedJustNow ? (
            <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-xs bg-emerald-950/80 px-3 py-1.5 rounded-lg border border-emerald-500/40">
              <Check className="w-3.5 h-3.5" />
              <span>Mobile Alerts Enabled!</span>
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={handleEnableNotifications}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-lg transition-all shadow-[0_0_12px_rgba(6,182,212,0.4)] cursor-pointer text-xs"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Turn On Phone Alerts</span>
              </button>
              <button
                type="button"
                onClick={handleDismiss}
                className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                title="Dismiss"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

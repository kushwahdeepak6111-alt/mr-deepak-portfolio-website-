import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, RefreshCw, CheckCircle2 } from 'lucide-react';

export const NetworkStatusBanner: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [showRestored, setShowRestored] = useState<boolean>(false);
  const [isReconnecting, setIsReconnecting] = useState<boolean>(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setIsReconnecting(false);
      setShowRestored(true);
      const timer = setTimeout(() => {
        setShowRestored(false);
      }, 3500);
      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowRestored(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleManualRetry = () => {
    setIsReconnecting(true);
    if (navigator.onLine) {
      setTimeout(() => {
        setIsOnline(true);
        setIsReconnecting(false);
        setShowRestored(true);
        setTimeout(() => setShowRestored(false), 3000);
      }, 400);
    } else {
      setTimeout(() => {
        setIsReconnecting(false);
        setIsOnline(false);
      }, 500);
    }
  };

  if (isOnline && !showRestored) {
    return null;
  }

  return (
    <div
      className="fixed bottom-5 right-5 z-50 max-w-sm w-full animate-in slide-in-from-bottom-5 duration-300"
      role="status"
      aria-live="polite"
    >
      {showRestored ? (
        <div className="flex items-center justify-between p-3.5 bg-neutral-900/95 border border-emerald-500/40 rounded-xl shadow-2xl backdrop-blur-md text-neutral-200">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-xs font-mono text-emerald-300">
              Connection restored. Synchronized.
            </span>
          </div>
          <button
            onClick={() => setShowRestored(false)}
            className="text-neutral-500 hover:text-white text-xs px-1"
          >
            ✕
          </button>
        </div>
      ) : (
        <div className="p-4 bg-[#11131a]/95 border border-amber-500/40 rounded-xl shadow-2xl backdrop-blur-md text-neutral-200">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              <WifiOff className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="text-xs font-mono uppercase tracking-wider font-semibold text-white">
                Network Interruption
              </span>
            </div>
            <span className="text-[10px] font-mono text-amber-400/80 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-700/40">
              Offline Mode Active
            </span>
          </div>

          <p className="text-xs text-neutral-400 font-sans mb-3 leading-relaxed">
            A network change was detected on your connection. Inquiries and changes will be saved securely to local offline memory.
          </p>

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              onClick={handleManualRetry}
              disabled={isReconnecting}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-black text-xs font-mono uppercase tracking-wider rounded-md hover:bg-neutral-200 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3 h-3 ${isReconnecting ? 'animate-spin' : ''}`} />
              <span>{isReconnecting ? 'Testing...' : 'Retry Connection'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

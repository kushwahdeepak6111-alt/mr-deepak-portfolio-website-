import React, { useState, useEffect } from 'react';
import { RotateCw, ArrowUp } from 'lucide-react';

interface WebsiteRefreshControlProps {
  onRefresh: () => void;
  isRefreshing: boolean;
}

export const WebsiteRefreshControl: React.FC<WebsiteRefreshControlProps> = ({
  onRefresh,
  isRefreshing,
}) => {
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Scroll to Top Action (positioned safely on right side, removed from left corner) */}
      {scrolled && (
        <aside aria-label="Website Navigation Utility" className="fixed bottom-5 right-5 z-40">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="p-2.5 rounded-full border border-neutral-800 bg-neutral-900/90 text-neutral-400 hover:text-white hover:border-cyan-500/50 hover:bg-neutral-800 shadow-xl backdrop-blur-xl transition-all active:scale-95 cursor-pointer"
            title="Scroll to Top"
            aria-label="Scroll to Top"
          >
            <ArrowUp className="w-4 h-4 text-cyan-400" />
          </button>
        </aside>
      )}

      {/* Website Refresh Notification Toast */}
      {isRefreshing && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-neutral-950/95 border border-cyan-400/80 shadow-[0_10px_35px_rgba(0,0,0,0.9),0_0_25px_rgba(56,189,248,0.4)] backdrop-blur-2xl text-xs font-mono text-neutral-200">
            <RotateCw className="w-4 h-4 text-cyan-400 animate-spin shrink-0" />
            <div className="flex flex-col">
              <span className="font-semibold text-white">Refreshing Website...</span>
              <span className="text-[10px] text-neutral-400">Reloading latest assets and sync state</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

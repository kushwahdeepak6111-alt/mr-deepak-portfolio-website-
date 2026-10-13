import React, { useState, useEffect, useRef } from 'react';
import { RotateCw, ArrowDown } from 'lucide-react';

interface PullToRefreshProps {
  onRefresh: () => void;
  isRefreshing: boolean;
}

export const PullToRefresh: React.FC<PullToRefreshProps> = ({ onRefresh, isRefreshing }) => {
  const [pullDistance, setPullDistance] = useState<number>(0);
  const [isPulling, setIsPulling] = useState<boolean>(false);
  const startYRef = useRef<number>(0);
  const currentYRef = useRef<number>(0);
  const threshold = 75; // px distance to trigger refresh

  useEffect(() => {
    let touchStartedAtTop = false;

    const handleTouchStart = (e: TouchEvent) => {
      // Only initiate pull-to-refresh if user is at the top of the page
      if (window.scrollY <= 2 && e.touches.length === 1) {
        touchStartedAtTop = true;
        startYRef.current = e.touches[0].clientY;
        currentYRef.current = e.touches[0].clientY;
      } else {
        touchStartedAtTop = false;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartedAtTop || isRefreshing || e.touches.length !== 1) return;

      currentYRef.current = e.touches[0].clientY;
      const rawDiff = currentYRef.current - startYRef.current;

      if (rawDiff > 0 && window.scrollY <= 2) {
        // Apply friction to pull distance
        const distance = Math.min(rawDiff * 0.45, 120);
        setPullDistance(distance);
        setIsPulling(true);

        // Prevent native overscroll bouncing if dragging down significantly
        if (rawDiff > 10 && e.cancelable) {
          e.preventDefault();
        }
      } else {
        setPullDistance(0);
        setIsPulling(false);
      }
    };

    const handleTouchEnd = () => {
      if (!touchStartedAtTop) return;

      if (pullDistance >= threshold && !isRefreshing) {
        // Trigger haptic vibration on mobile devices if supported
        try {
          if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
            navigator.vibrate(30);
          }
        } catch {
          // Ignore
        }
        onRefresh();
      }

      setIsPulling(false);
      setPullDistance(0);
      touchStartedAtTop = false;
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('touchcancel', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [pullDistance, isRefreshing, onRefresh]);

  const progress = Math.min(pullDistance / threshold, 1);
  const shouldTrigger = pullDistance >= threshold;

  if (!isPulling && !isRefreshing) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[100] flex justify-center pointer-events-none transition-transform duration-100 ease-out"
      style={{
        transform: `translateY(${isRefreshing ? 60 : pullDistance * 0.8}px)`,
      }}
    >
      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900/95 border border-cyan-500/40 text-neutral-200 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(56,189,248,0.25)] backdrop-blur-xl text-xs font-mono">
        <div className="relative flex items-center justify-center w-5 h-5">
          {isRefreshing ? (
            <RotateCw className="w-4 h-4 text-cyan-400 animate-spin" />
          ) : shouldTrigger ? (
            <RotateCw
              className="w-4 h-4 text-cyan-300 transition-transform duration-150"
              style={{ transform: `rotate(${progress * 360}deg)` }}
            />
          ) : (
            <ArrowDown
              className="w-4 h-4 text-neutral-400 transition-transform duration-150"
              style={{ transform: `rotate(${progress * 180}deg)` }}
            />
          )}
        </div>
        <span className="font-semibold text-white">
          {isRefreshing
            ? 'Refreshing website...'
            : shouldTrigger
            ? 'Release to refresh'
            : 'Pull to refresh'}
        </span>
      </div>
    </div>
  );
};

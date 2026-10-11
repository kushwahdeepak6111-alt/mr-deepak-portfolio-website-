import React from 'react';

interface SectionDividerProps {
  label?: string;
  subLabel?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  label,
  subLabel,
}) => {
  return (
    <div className="relative py-4 sm:py-6 max-w-5xl mx-auto px-4 flex items-center justify-center select-none" aria-hidden="true">
      {/* Left Laser Gradient Beam */}
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-cyan-400/60" />

      {/* Center Beacon / Chip */}
      <div className="mx-4 px-3.5 py-1 rounded-full bg-[#080b14] border border-cyan-500/30 shadow-[0_0_15px_rgba(56,189,248,0.2)] flex items-center gap-2 text-[10px] sm:text-xs font-mono text-cyan-300">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
        <span className="font-semibold tracking-widest uppercase">
          {label || 'DISCOVER NEXT'}
        </span>
        {subLabel && (
          <span className="text-neutral-500 hidden sm:inline">· {subLabel}</span>
        )}
      </div>

      {/* Right Laser Gradient Beam */}
      <div className="flex-1 h-px bg-gradient-to-r from-cyan-400/60 via-cyan-500/30 to-transparent" />
    </div>
  );
};

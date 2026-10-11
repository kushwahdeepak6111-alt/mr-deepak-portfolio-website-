import React, { ReactNode } from 'react';

export type SectionAccent = 'cyan' | 'emerald' | 'purple' | 'amber' | 'blue' | 'rose';

interface SectionIslandProps {
  id?: string;
  sectionNumber: string; // e.g. "01", "02"
  sectionCategory: string; // e.g. "ARCHITECTURAL STANDARDS"
  accent?: SectionAccent;
  children: ReactNode;
  className?: string;
}

const ACCENT_STYLES: Record<SectionAccent, {
  border: string;
  badgeBg: string;
  badgeText: string;
  dotBg: string;
  topGlow: string;
  tagColor: string;
  surfaceBg: string;
}> = {
  cyan: {
    border: 'border-cyan-500/25 hover:border-cyan-400/40',
    badgeBg: 'bg-cyan-950/80 border-cyan-500/30',
    badgeText: 'text-cyan-300',
    dotBg: 'bg-cyan-400 shadow-[0_0_10px_rgba(56,189,248,0.9)]',
    topGlow: 'from-transparent via-cyan-400/30 to-transparent',
    tagColor: 'text-cyan-400',
    surfaceBg: 'bg-gradient-to-b from-[#0a0e1c]/95 via-[#070a14]/95 to-[#060912]/95',
  },
  emerald: {
    border: 'border-emerald-500/25 hover:border-emerald-400/40',
    badgeBg: 'bg-emerald-950/80 border-emerald-500/30',
    badgeText: 'text-emerald-300',
    dotBg: 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]',
    topGlow: 'from-transparent via-emerald-400/30 to-transparent',
    tagColor: 'text-emerald-400',
    surfaceBg: 'bg-gradient-to-b from-[#081216]/95 via-[#060e12]/95 to-[#05090d]/95',
  },
  purple: {
    border: 'border-purple-500/25 hover:border-purple-400/40',
    badgeBg: 'bg-purple-950/80 border-purple-500/30',
    badgeText: 'text-purple-300',
    dotBg: 'bg-purple-400 shadow-[0_0_10px_rgba(192,132,252,0.9)]',
    topGlow: 'from-transparent via-purple-400/30 to-transparent',
    tagColor: 'text-purple-400',
    surfaceBg: 'bg-gradient-to-b from-[#110d1f]/95 via-[#0b0816]/95 to-[#070510]/95',
  },
  amber: {
    border: 'border-amber-500/25 hover:border-amber-400/40',
    badgeBg: 'bg-amber-950/80 border-amber-500/30',
    badgeText: 'text-amber-300',
    dotBg: 'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.9)]',
    topGlow: 'from-transparent via-amber-400/30 to-transparent',
    tagColor: 'text-amber-400',
    surfaceBg: 'bg-gradient-to-b from-[#13100a]/95 via-[#0e0c07]/95 to-[#080704]/95',
  },
  blue: {
    border: 'border-blue-500/25 hover:border-blue-400/40',
    badgeBg: 'bg-blue-950/80 border-blue-500/30',
    badgeText: 'text-blue-300',
    dotBg: 'bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.9)]',
    topGlow: 'from-transparent via-blue-400/30 to-transparent',
    tagColor: 'text-blue-400',
    surfaceBg: 'bg-gradient-to-b from-[#0a1024]/95 via-[#070b1b]/95 to-[#050713]/95',
  },
  rose: {
    border: 'border-rose-500/25 hover:border-rose-400/40',
    badgeBg: 'bg-rose-950/80 border-rose-500/30',
    badgeText: 'text-rose-300',
    dotBg: 'bg-rose-400 shadow-[0_0_10px_rgba(251,113,133,0.9)]',
    topGlow: 'from-transparent via-rose-400/30 to-transparent',
    tagColor: 'text-rose-400',
    surfaceBg: 'bg-gradient-to-b from-[#150a12]/95 via-[#0e060c]/95 to-[#090408]/95',
  },
};

export const SectionIsland: React.FC<SectionIslandProps> = ({
  id,
  sectionNumber,
  sectionCategory,
  accent = 'cyan',
  children,
  className = '',
}) => {
  const styles = ACCENT_STYLES[accent];

  return (
    <div
      id={id}
      className={`relative my-10 sm:my-14 lg:my-20 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 scroll-mt-24 ${className}`}
    >
      {/* The Section Island Card: Distinct, elevated, framed */}
      <div
        className={`relative rounded-2xl sm:rounded-3xl border ${styles.border} ${styles.surfaceBg} shadow-2xl backdrop-blur-xl overflow-hidden transition-all duration-300`}
      >
        {/* Top Accent Light Beam */}
        <div
          className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${styles.topGlow} pointer-events-none z-20`}
        />

        {/* Section Identification Header Strip */}
        <div className="px-6 sm:px-10 pt-6 pb-2 flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] bg-black/30">
          <div className="flex items-center gap-3">
            <span
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] sm:text-xs font-mono font-bold tracking-wider uppercase border ${styles.badgeBg} ${styles.badgeText}`}
            >
              <span className={`w-2 h-2 rounded-full ${styles.dotBg} animate-pulse`} />
              <span>SECTION {sectionNumber}</span>
            </span>

            <span className="text-[11px] sm:text-xs font-mono tracking-wider text-neutral-400 uppercase hidden xs:inline">
              // {sectionCategory}
            </span>
          </div>

          <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono text-neutral-500">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
            <span>MR DEEPAK STUDIO</span>
          </div>
        </div>

        {/* Section Main Content Area */}
        <div className="relative z-10">{children}</div>

        {/* Bottom subtle border highlight */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent pointer-events-none" />
      </div>
    </div>
  );
};

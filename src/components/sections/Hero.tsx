import React from 'react';
import { ArrowRight, ArrowDown, Zap, Activity, ShieldCheck, Sparkles } from 'lucide-react';
import { HeroScene } from '../3d/HeroScene';

interface HeroProps {
  onStartProject: () => void;
  onViewWork: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartProject, onViewWork }) => {
  return (
    <section className="relative min-h-[94vh] sm:min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Subtle Space Nebula Glow Spots */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[600px] h-[600px] aurora-glow-1 pointer-events-none opacity-40" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] aurora-glow-2 pointer-events-none opacity-30" />

      {/* 3D Visual Object (Foreground digital architecture display) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-75">
        <HeroScene />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Main Left Column: Headline, Copy, Action Buttons */}
          <div className="lg:col-span-7 max-w-3xl">
            {/* Subtle Trust Label */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="badge-stylish">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                <span className="font-semibold tracking-wider">
                  Bespoke Web Architect · By Mr Deepak
                </span>
              </div>
              <div className="badge-stylish-purple hidden sm:inline-flex">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span className="font-semibold tracking-wider">1-on-1 Direct Sprint Architecture</span>
              </div>
            </div>

            {/* Marquee Headline */}
            <h1 className="heading-cinematic text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight sm:leading-[1.08] mb-6">
              WE CRAFT <span className="text-gradient-cyan text-glow-cyan">EXTRAORDINARY</span> DIGITAL EXPERIENCES
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-xl text-neutral-300 font-normal leading-relaxed max-w-2xl mb-10 antialiased">
              Handcrafted by <strong className="text-white font-semibold underline decoration-cyan-400 decoration-2 underline-offset-4">Mr Deepak</strong>. Premium websites designed with editorial precision, kinetic fluid interactions, and sub-second performance. Engineered for ambitious brands that refuse to settle for generic templates.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onStartProject}
                className="btn-stylish-primary inline-flex items-center justify-center gap-2.5 px-8 py-4 text-xs sm:text-sm uppercase tracking-wider rounded-lg active:scale-[0.98] group cursor-pointer"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onViewWork}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-neutral-900/90 hover:bg-neutral-800 text-white font-semibold text-xs sm:text-sm uppercase tracking-wider rounded-lg border border-white/20 hover:border-cyan-400/50 transition-all backdrop-blur-md active:scale-[0.98] hover:shadow-[0_0_20px_rgba(56,189,248,0.2)] cursor-pointer"
              >
                <span>Explore Selected Work</span>
              </button>

              {/* 3D Interactivity Prompt */}
              <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-neutral-400 pl-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]"></span>
                <span>Sub-Second Response · 60+ FPS Fluid UI</span>
              </div>
            </div>

            {/* Key Quantitative Metrics Anchor */}
            <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-3 gap-6 max-w-lg">
              <div className="p-3 rounded-lg bg-neutral-900/40 border border-white/5 backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl font-display font-bold text-white tabular-nums">
                  99/100
                </div>
                <div className="text-xs text-neutral-400 font-sans mt-0.5">
                  Avg. Lighthouse Score
                </div>
              </div>

              <div className="p-3 rounded-lg bg-neutral-900/40 border border-white/5 backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl font-display font-bold text-white tabular-nums text-cyan-300">
                  &lt; 0.9s
                </div>
                <div className="text-xs text-neutral-400 font-sans mt-0.5">
                  First Contentful Paint
                </div>
              </div>

              <div className="p-3 rounded-lg bg-neutral-900/40 border border-white/5 backdrop-blur-sm">
                <div className="text-2xl sm:text-3xl font-display font-bold text-white tabular-nums text-indigo-300">
                  100%
                </div>
                <div className="text-xs text-neutral-400 font-sans mt-0.5">
                  Custom Tailored Code
                </div>
              </div>
            </div>
          </div>

          {/* Main Right Column: Dedicated High-Speed Studio Architecture & Live Telemetry Showcase */}
          <div className="lg:col-span-5 hidden lg:flex flex-col items-center justify-center relative">
            <div className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-neutral-950/60 backdrop-blur-xl p-6 shadow-[0_0_50px_rgba(56,189,248,0.12)] group hover:border-cyan-400/40 transition-all duration-150">
              {/* Header Label */}
              <div className="flex items-center justify-between pb-3.5 border-b border-white/10 text-[11px] font-mono text-slate-300">
                <span className="flex items-center gap-1.5 text-cyan-400 font-semibold tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
                  REAL-TIME PERFORMANCE
                </span>
                <span className="text-emerald-400 font-bold bg-emerald-950/80 border border-emerald-500/30 px-2 py-0.5 rounded text-[10px]">
                  SUB-100MS
                </span>
              </div>

              {/* Performance Live Monitor */}
              <div className="my-5 space-y-3.5">
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-cyan-500/30 transition-colors duration-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">Button Response Latency</div>
                      <div className="text-[10px] text-neutral-400 font-mono">Instant zero-delay touch tap</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-cyan-300">&lt; 16ms</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-indigo-500/30 transition-colors duration-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-400/20 flex items-center justify-center text-indigo-400">
                      <Activity className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">Render Frame Rate</div>
                      <div className="text-[10px] text-neutral-400 font-mono">Hardware GPU acceleration</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400">60+ FPS</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-purple-500/30 transition-colors duration-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-400/20 flex items-center justify-center text-purple-400">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">Asset Decoding Speed</div>
                      <div className="text-[10px] text-neutral-400 font-mono">8K Solar System async pipeline</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-purple-300">Instant</span>
                </div>
              </div>

              {/* Instant Interactive Action Button */}
              <button
                type="button"
                onClick={onStartProject}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500/20 via-indigo-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-indigo-500/30 border border-cyan-400/40 text-cyan-200 hover:text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-100 active:scale-[0.97] cursor-pointer shadow-[0_0_20px_rgba(56,189,248,0.15)]"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Launch Project Sprint Brief</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400">
        <span>Scroll to Explore</span>
        <ArrowDown className="w-3.5 h-3.5 text-neutral-400 animate-bounce" />
      </div>
    </section>
  );
};

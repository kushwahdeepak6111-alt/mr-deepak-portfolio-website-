import React from 'react';
import { Check, X, Shield, Cpu, Gauge, Sparkles } from 'lucide-react';

interface WhyChooseUsProps {
  embedded?: boolean;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ embedded = false }) => {
  return (
    <section className={`relative overflow-hidden ${embedded ? 'py-10 sm:py-14 bg-transparent' : 'py-28 bg-[#050608]'}`}>
      {/* Aurora Ambience */}
      <div className="absolute top-1/2 left-1/4 w-80 h-80 aurora-glow-1 pointer-events-none opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <div className="badge-stylish mb-4">
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
            <span>The Bespoke Standard · Direct Craftsmanship</span>
          </div>
          <h2 className="heading-stylish text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-snug">
            WHY WORK WITH <span className="text-gradient-cyan">MR DEEPAK</span>
          </h2>
          <p className="mt-4 text-neutral-300 text-sm sm:text-base leading-relaxed">
            The difference between an ordinary template and bespoke engineering by <strong className="text-white">Mr Deepak</strong> is immediate. We build digital assets that command authority, outrank competitors, and convert traffic into enterprise clients.
          </p>
        </div>

        {/* Comparison Matrix Table */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Generic Templates Card */}
          <div className="p-8 sm:p-10 rounded-2xl bg-neutral-950/70 border border-neutral-900/80 shadow-inner">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-red-950/60 border border-red-800/40 flex items-center justify-center text-red-400">
                <X className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-display font-bold text-neutral-300">
                Typical Template / Page Builder Sites
              </h3>
            </div>
            <ul className="space-y-4 text-sm text-neutral-400">
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold shrink-0">✕</span>
                <span>Bloated plugins causing slow 4–6 second mobile load times.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold shrink-0">✕</span>
                <span>Identical cookie-cutter layouts shared by thousands of generic sites.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold shrink-0">✕</span>
                <span>Clunky responsive behavior with broken mobile buttons and horizontal shift.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold shrink-0">✕</span>
                <span>Hidden plugin subscription fees and security vulnerabilities.</span>
              </li>
            </ul>
          </div>

          {/* Mr Deepak Craft Card */}
          <div className="card-luxury p-8 sm:p-10 rounded-2xl border-white/20 relative shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-cyan-950/70 border border-cyan-400/50 flex items-center justify-center text-cyan-300 shadow-sm shadow-cyan-500/30">
                <Check className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-display font-bold text-white flex items-center gap-2">
                <span>Bespoke Engineering by Mr Deepak</span>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">Craft</span>
              </h3>
            </div>
            <ul className="space-y-4 text-sm text-neutral-200">
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 font-bold shrink-0">✓</span>
                <span>Sub-second load times engineered with clean React and edge caching.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 font-bold shrink-0">✓</span>
                <span>Hand-crafted visual design aligned exclusively to your business identity.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 font-bold shrink-0">✓</span>
                <span>Flawless mobile-first UI with tactile, native-feeling interactions.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 font-bold shrink-0">✓</span>
                <span>Production-grade Supabase security, RLS, and Netlify edge reliability.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 4 Feature Callouts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card-luxury p-6 rounded-xl">
            <Gauge className="w-5 h-5 text-cyan-300 mb-3" />
            <h4 className="text-base font-display font-semibold text-white mb-1.5">
              99+ Core Web Vitals
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed font-sans">
              Google rewards speed. Every page is optimized to pass Core Web Vitals with flying colors.
            </p>
          </div>

          <div className="card-luxury p-6 rounded-xl">
            <Sparkles className="w-5 h-5 text-indigo-300 mb-3" />
            <h4 className="text-base font-display font-semibold text-white mb-1.5">
              Cinematic Atmosphere
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed font-sans">
              Tactile micro-animations and lightweight 3D elements that captivate without degrading speed.
            </p>
          </div>

          <div className="card-luxury p-6 rounded-xl">
            <Cpu className="w-5 h-5 text-sky-300 mb-3" />
            <h4 className="text-base font-display font-semibold text-white mb-1.5">
              Supabase Architecture
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed font-sans">
              Relational PostgreSQL tables, Row Level Security, and lead management ready out of the box.
            </p>
          </div>

          <div className="card-luxury p-6 rounded-xl">
            <Shield className="w-5 h-5 text-amber-300 mb-3" />
            <h4 className="text-base font-display font-semibold text-white mb-1.5">
              100% Code Ownership
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed font-sans">
              Zero vendor lock-in. You own your repository, assets, domain, and database completely.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

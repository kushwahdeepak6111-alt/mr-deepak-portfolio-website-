import React from 'react';
import { Eye, Layout, Smartphone, Zap, TrendingUp, Target } from 'lucide-react';

interface TrustSectionProps {
  embedded?: boolean;
}

export const TrustSection: React.FC<TrustSectionProps> = ({ embedded = false }) => {
  const PILLARS = [
    {
      icon: Eye,
      title: 'Premium Visual Identity',
      desc: 'Bespoke design systems that instantly establish authority, prestige, and market leadership.',
    },
    {
      icon: Layout,
      title: 'Intuitive Usability',
      desc: 'Frictionless customer journeys architected to guide visitors naturally toward inquiry and conversion.',
    },
    {
      icon: Smartphone,
      title: 'Mobile-First Rigor',
      desc: 'Pixel-perfect responsiveness across phones, tablets, and 4K displays with zero layout shifts.',
    },
    {
      icon: Zap,
      title: 'Sub-Second Performance',
      desc: 'Obsessive optimization achieving 95+ Google Lighthouse scores and rapid edge caching.',
    },
    {
      icon: TrendingUp,
      title: 'Architectural Scalability',
      desc: 'Clean TypeScript and Supabase databases engineered to grow seamlessly with your customer volume.',
    },
    {
      icon: Target,
      title: 'Direct Business Goals',
      desc: 'Every layout decision, CTA placement, and copy nuance is calibrated to generate qualified revenue.',
    },
  ];

  return (
    <section className={`relative overflow-hidden ${embedded ? 'py-10 sm:py-14 bg-transparent' : 'py-28 border-y border-white/10 bg-gradient-to-b from-[#050608] via-[#090b14]/70 to-[#050608]'}`}>
      {/* Subtle Aurora Ambient Backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-80 aurora-glow-1 pointer-events-none opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Core Philosophy Header */}
        <div className="max-w-3xl mb-16">
          <div className="badge-stylish mb-3">
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
            <span>Uncompromising Architectural Standards</span>
          </div>
          <h2 className="heading-stylish text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-snug mb-5">
            DESIGNED FOR IMPACT.<br />
            <span className="text-gradient-cyan">BUILT FOR ELITE PERFORMANCE.</span>
          </h2>
          <p className="text-neutral-300 text-base sm:text-lg leading-relaxed">
            A website should never be an afterthought or an ordinary template. It is your business’s most valuable digital asset. Handcrafted by <strong className="text-white">Mr Deepak</strong> with six uncompromising standards:
          </p>
        </div>

        {/* 6 Standards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="card-luxury p-7 sm:p-8 rounded-xl group"
              >
                <div className="w-11 h-11 rounded-lg bg-neutral-900/90 border border-white/10 flex items-center justify-center mb-5 group-hover:border-cyan-400/40 group-hover:scale-105 transition-all shadow-md">
                  <Icon className="w-5 h-5 text-cyan-300 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 font-display group-hover:text-cyan-200 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

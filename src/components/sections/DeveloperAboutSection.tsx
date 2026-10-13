import React from 'react';
import {
  Code2,
  Zap,
  ShieldCheck,
  Cpu,
  Mail,
  MessageSquare,
  ArrowRight,
  Sparkles,
  Phone,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import { STUDIO_LOCATION } from '../../data/location';
import deepakPortrait from '../../assets/images/developer_deepak_portrait_1791560778420.jpg';

interface DeveloperAboutSectionProps {
  onStartProject?: () => void;
  embedded?: boolean;
}

export const DeveloperAboutSection: React.FC<DeveloperAboutSectionProps> = ({
  onStartProject,
  embedded = false,
}) => {

  const CORE_PILLARS = [
    {
      icon: Code2,
      title: '100% Hand-Crafted Code',
      desc: 'No bloated page builders or fragile plugin ecosystems. Every layout, interaction, and component is cleanly engineered in modern React and TypeScript.',
    },
    {
      icon: Zap,
      title: 'Sub-Second Speed Guarantee',
      desc: 'Obsessively engineered for lightning-fast First Contentful Paint (<0.9s), flawless Core Web Vitals, and 95+ Google Lighthouse ratings.',
    },
    {
      icon: ShieldCheck,
      title: 'Direct 1-on-1 Collaboration',
      desc: 'You work directly with Mr Deepak from initial architecture to final production launch. Zero account handlers, zero junior handoffs.',
    },
    {
      icon: Cpu,
      title: 'Full Architectural Ownership',
      desc: 'Complete source code repository transfer, documented schemas, and clean deployment scripts with total client ownership and zero vendor lock-in.',
    },
  ];

  return (
    <section id="about-developer" className={`relative overflow-hidden ${embedded ? 'py-10 sm:py-14 bg-transparent' : 'py-24 sm:py-28 bg-[#06070a]'}`}>
      {/* Background Aurora Ambience */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 aurora-glow-1 pointer-events-none opacity-30" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 aurora-glow-2 pointer-events-none opacity-25" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-16">
          <div className="badge-stylish mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span>Meet The Architect · Mr Deepak</span>
          </div>

          <h2 className="heading-stylish text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-snug mb-4">
            ABOUT THE <span className="text-gradient-cyan">DEVELOPER</span>
          </h2>

          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans">
            Hi, I'm <strong className="text-white font-semibold underline decoration-cyan-400 decoration-2 underline-offset-4">Mr Deepak</strong> — Lead Full-Stack Web Architect & Creative Technologist. I specialize in designing and engineering bespoke digital experiences that blend cinematic design with uncompromising engineering.
          </p>
        </div>

        {/* Main Grid: Developer Profile Card + Narrative & Tenets */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left Column: Developer Profile Card */}
          <div className="lg:col-span-5 card-luxury rounded-2xl p-6 sm:p-8 relative">
            {/* Developer Portrait Image Showcase */}
            <div className="relative mb-6 rounded-2xl overflow-hidden border border-cyan-500/30 bg-neutral-900/90 shadow-2xl group">
              <div className="aspect-[3/4] sm:aspect-[4/5] relative overflow-hidden bg-neutral-950">
                <img
                  src={deepakPortrait}
                  alt="Mr Deepak - Lead Web Architect & Developer"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-transparent pointer-events-none" />

                {/* Floating Badges */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-300 bg-neutral-950/85 backdrop-blur-md border border-emerald-500/40 px-2.5 py-1 rounded-full shadow-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Available for Projects</span>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/85 backdrop-blur-md border border-cyan-500/40 px-2.5 py-0.5 rounded-full">
                    Founder
                  </span>
                </div>
              </div>
            </div>

            {/* Profile Info Header */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white leading-tight">
                  Mr Deepak
                </h3>
                <p className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold mt-0.5">
                  Lead Web Architect & Developer
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 border border-cyan-400/40 flex items-center justify-center font-display font-bold text-cyan-300 text-sm shadow-md">
                MD
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed mb-6">
              "My mission is simple: eliminate sluggish, generic agency templates. I build websites that load instantly, command respect, and turn casual visitors into loyal clients."
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-2 py-4 px-3 rounded-xl bg-neutral-950/80 border border-neutral-800/80 mb-6 text-center">
              <div>
                <div className="text-lg sm:text-xl font-display font-bold text-white tabular-nums">
                  99+
                </div>
                <div className="text-[10px] text-neutral-400 font-mono mt-0.5">
                  Lighthouse
                </div>
              </div>
              <div className="border-x border-neutral-800">
                <div className="text-lg sm:text-xl font-display font-bold text-cyan-300 tabular-nums">
                  &lt;0.9s
                </div>
                <div className="text-[10px] text-neutral-400 font-mono mt-0.5">
                  Speed FCP
                </div>
              </div>
              <div>
                <div className="text-lg sm:text-xl font-display font-bold text-purple-300 tabular-nums">
                  100%
                </div>
                <div className="text-[10px] text-neutral-400 font-mono mt-0.5">
                  Custom Code
                </div>
              </div>
            </div>

            {/* Direct Connect Channels & Live Location */}
            <div className="space-y-2.5">
              {/* Direct Phone Number - Requested Mobile 9343795715 */}
              <a
                href="tel:+919343795715"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 hover:border-indigo-400 text-xs font-mono text-indigo-200 hover:text-white transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">Direct Mobile / Call</div>
                    <div className="font-bold text-white font-mono text-xs">+91 9343795715</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  Direct Line
                </span>
              </a>

              {/* WhatsApp Quick Action */}
              <a
                href="https://wa.me/919343795715?text=Hi%20Mr%20Deepak,%20I%20would%20like%20to%20discuss%20a%20website%20project%20with%20you"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/30 hover:border-emerald-500 text-xs font-mono text-emerald-300 hover:text-white transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                    <MessageSquare className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">WhatsApp Chat</div>
                    <div className="font-bold text-white font-mono text-xs">+91 9343795715</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  Online
                </span>
              </a>

              {/* Personal Email */}
              <a
                href="mailto:kushwahdeepak6111@gmail.com"
                className="w-full flex items-center justify-between p-2.5 px-3 rounded-xl bg-neutral-900 border border-white/10 hover:border-cyan-400/50 text-xs font-mono text-neutral-300 hover:text-white transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <Mail className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <span className="truncate text-[11px]">kushwahdeepak6111@gmail.com</span>
                </div>
                <span className="text-[10px] text-cyan-400 font-mono">Email</span>
              </a>

              {/* Studio Location */}
              <a
                href={STUDIO_LOCATION.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between p-2.5 px-3 rounded-xl bg-neutral-900 border border-white/10 hover:border-amber-400/50 text-xs font-mono text-neutral-300 hover:text-white transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 group-hover:scale-110 transition-transform" />
                  <div className="text-left truncate">
                    <span className="truncate text-[11px] block">{STUDIO_LOCATION.formattedAddress}</span>
                  </div>
                </div>
                <span className="text-[10px] text-amber-400 font-mono flex items-center gap-0.5 shrink-0">
                  <span>Maps</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </span>
              </a>
            </div>
          </div>

          {/* Right Column: Developer Pillars & Approach */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CORE_PILLARS.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-xl bg-neutral-900/40 border border-neutral-800/80 hover:border-neutral-700 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-400/30 flex items-center justify-center text-cyan-300 mb-3.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-display font-bold text-white mb-1.5">
                      {pillar.title}
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                      {pillar.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Bottom Callout */}
            {onStartProject && (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-5 rounded-xl bg-gradient-to-r from-cyan-950/40 via-neutral-900/60 to-purple-950/40 border border-cyan-500/20">
                <div>
                  <div className="text-sm font-display font-bold text-white">
                    Ready to build your next website with Mr Deepak?
                  </div>
                  <div className="text-xs text-neutral-400 mt-0.5">
                    Direct architectural consultation · Fast turnaround · Zero fluff
                  </div>
                </div>

                <button
                  onClick={onStartProject}
                  className="btn-stylish-primary inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs uppercase tracking-wider rounded-lg shrink-0 cursor-pointer"
                >
                  <span>Start A Project</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

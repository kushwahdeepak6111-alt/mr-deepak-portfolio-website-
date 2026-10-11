import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Layers,
  ShieldCheck,
  Cpu,
  Code2,
  Sparkles,
  CheckCircle2,
  Mail,
  MessageSquare,
  UserCheck,
  Zap,
  Terminal,
  Globe,
  Phone,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import { STUDIO_LOCATION } from '../data/location';
import deepakPortrait from '../assets/images/developer_deepak_portrait_1791560778420.jpg';

interface AboutPageProps {
  onStartProject: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onStartProject }) => {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="max-w-3xl mb-16">
          <div className="badge-stylish mb-3">
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
            <span>Design Ethos & Pure Craftsmanship</span>
          </div>
          <h1 className="heading-stylish text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            ABOUT <span className="text-gradient-cyan">MR DEEPAK</span>
          </h1>
          <p className="mt-5 text-base sm:text-xl text-neutral-300 font-normal leading-relaxed">
            Founded and engineered by <strong className="text-white font-semibold underline decoration-cyan-400 decoration-2 underline-offset-4">Mr Deepak</strong>, this is a bespoke digital engineering studio creating high-craft websites that combine cinematic visual restraint with uncompromising full-stack performance.
          </p>
        </div>

        {/* Founder Feature Profile */}
        <div className="mb-20 glass-panel rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 aurora-glow-1 pointer-events-none opacity-20" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Founder Avatar & Badges */}
            <div className="lg:col-span-4 flex flex-col items-center text-center p-6 rounded-2xl bg-neutral-950/80 border border-neutral-800 shadow-xl">
              <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-cyan-400/50 p-1 mb-5 shadow-2xl shadow-cyan-950/70 relative group bg-neutral-900">
                <img
                  src={deepakPortrait}
                  alt="Mr Deepak - Founder & Lead Web Architect"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top rounded-xl group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-neutral-950 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
              </div>

              <h2 className="text-2xl font-display font-extrabold text-white mb-1">
                Mr Deepak
              </h2>
              <p className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3 font-semibold">
                Founder · Lead Web Architect
              </p>
              <p className="text-xs text-neutral-400 leading-relaxed font-sans mb-6">
                Specializing in bespoke React engineering, 3D WebGL interfaces, Supabase database architectures, and sub-second performance.
              </p>

              {/* Direct Communication Channels */}
              <div className="w-full space-y-2.5">
                {/* Direct Phone Number - Requested Mobile */}
                <a
                  href="tel:+919343795715"
                  className="w-full flex items-center justify-between p-2.5 px-3 rounded-lg bg-indigo-950/40 border border-indigo-500/30 hover:border-indigo-400 text-xs font-mono text-indigo-200 hover:text-white transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-indigo-400 group-hover:scale-110 transition-transform" />
                    <span className="font-bold text-white font-mono text-xs">+91 9343795715</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-1.5 py-0.5 rounded">Call</span>
                </a>

                {/* Direct WhatsApp */}
                <a
                  href="https://wa.me/919343795715?text=Hi%20Mr%20Deepak,%20I%20would%20like%20to%20discuss%20a%20website%20project%20with%20you"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between p-2.5 px-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 hover:border-emerald-500 text-xs font-mono text-emerald-300 hover:text-white transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
                    <span>WhatsApp (+91 9343795715)</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-1.5 py-0.5 rounded">Chat</span>
                </a>

                {/* Email */}
                <a
                  href="mailto:kushwahdeepak6111@gmail.com"
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-neutral-900 border border-white/10 hover:border-cyan-400/50 text-xs font-mono text-neutral-300 hover:text-white transition-all cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="truncate text-[11px]">kushwahdeepak6111@gmail.com</span>
                </a>

                {/* Studio Location */}
                <a
                  href={STUDIO_LOCATION.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between py-2 px-3 rounded-lg bg-neutral-900 border border-white/10 hover:border-amber-400/50 text-xs font-mono text-neutral-300 hover:text-white transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="truncate text-[11px] text-neutral-300 group-hover:text-amber-200">
                      {STUDIO_LOCATION.formattedAddress}
                    </span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-amber-400 shrink-0" />
                </a>
              </div>
            </div>

            {/* Founder Narrative & Philosophy */}
            <div className="lg:col-span-8 space-y-6">
              <div className="badge-stylish">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>Mr Deepak's Personal Founder Statement</span>
              </div>

              <h3 className="heading-stylish text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                "I craft websites that command immediate authority, not generic cookie-cutter pages."
              </h3>

              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans">
                I founded this studio to solve a pervasive problem: businesses spend thousands of dollars on agency websites, only to receive sluggish WordPress templates stuffed with fifty third-party plugins that take six seconds to load.
              </p>

              <p className="text-sm sm:text-base text-neutral-400 leading-relaxed font-sans">
                When you collaborate with me, you work <strong>directly with Mr Deepak from day one to launch</strong>. There are no sales account managers, no junior developers passing tickets back and forth, and no compromises on code quality. I take complete architectural ownership of every line of code, interactive 3D model, database table, and responsive viewport.
              </p>

              {/* Founder Superpowers / Stack */}
              <div className="pt-4 border-t border-neutral-800">
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-3">
                  Core Technologies & Competencies:
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    'React 19 & TypeScript',
                    'Tailwind CSS v4',
                    'Three.js & WebGL 3D',
                    'Node.js & Express',
                    'Supabase & PostgreSQL',
                    'Row Level Security (RLS)',
                    'Netlify Edge CDN',
                    'Lighthouse 99+ Optimization',
                    'Schema.org SEO',
                    'UI/UX Interaction Design',
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-md bg-neutral-900 border border-white/10 text-xs font-mono text-neutral-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-xl bg-neutral-900/50 border border-neutral-800">
              <h2 className="text-xl font-display font-bold text-white mb-3">
                Our Vision
              </h2>
              <p className="text-sm text-neutral-400 leading-relaxed font-sans">
                To liberate high-caliber businesses from the mediocrity of cookie-cutter templates, sluggish page builders, and forgettable design. We build digital flagships that command immediate authority and deliver measurable commercial leverage.
              </p>
            </div>

            <div className="p-8 rounded-xl bg-neutral-900/50 border border-neutral-800">
              <h2 className="text-xl font-display font-bold text-white mb-3">
                1-on-1 Client Collaboration
              </h2>
              <p className="text-sm text-neutral-400 leading-relaxed font-sans">
                Mr Deepak takes on a strictly limited number of commissions each quarter. You work directly with the craftsman—no account manager telephone games, no hidden contractor handoffs.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-10">
            <div>
              <h2 className="heading-stylish text-2xl sm:text-3xl font-extrabold text-white mb-4">
                Design Philosophy: <span className="text-gradient-cyan">Cinematic Restraint</span>
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans mb-4">
                True luxury in digital design is never about gratuitous neon flares, chaotic particles, or intrusive animations that slow down the user. It is found in exquisite typography proportions, calibrated spatial math, dark obsidian surfaces, and micro-interactions that feel as tactile as high-precision mechanical instruments.
              </p>
              <p className="text-sm sm:text-base text-neutral-400 leading-relaxed font-sans">
                Every layout is drafted with obsessive viewport presence, ensuring seamless readability on small mobile screens, high-density retina displays, and ultra-wide desktop monitors alike.
              </p>
            </div>

            <div className="pt-8 border-t border-neutral-800">
              <h2 className="heading-stylish text-2xl sm:text-3xl font-extrabold text-white mb-4">
                Development Philosophy: <span className="text-gradient-cyan">Pure Speed & Clean Code</span>
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans mb-4">
                We engineer with modern production technologies: TypeScript, React, Vite, Tailwind CSS, Supabase PostgreSQL, and Netlify edge infrastructure. We maintain a zero-tolerance policy for bloated site builders that load hundreds of unoptimized scripts.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-lg bg-neutral-900/70 border border-neutral-800">
                  <div className="text-xs font-mono text-cyan-400 mb-1">LIGHTHOUSE</div>
                  <div className="text-lg font-bold text-white">98+ Guaranteed</div>
                </div>
                <div className="p-4 rounded-lg bg-neutral-900/70 border border-neutral-800">
                  <div className="text-xs font-mono text-cyan-400 mb-1">FRAMEWORK</div>
                  <div className="text-lg font-bold text-white">React & TypeScript</div>
                </div>
                <div className="p-4 rounded-lg bg-neutral-900/70 border border-neutral-800">
                  <div className="text-xs font-mono text-cyan-400 mb-1">DATABASE</div>
                  <div className="text-lg font-bold text-white">Supabase / RLS</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quality Standards Bento */}
        <div className="mb-20">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 block mb-2 font-semibold">
              Mr Deepak's Uncompromising Standards
            </span>
            <h2 className="heading-stylish text-3xl font-extrabold text-white">
              OUR SIX QUALITY PILLARS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Zero Broken Layouts',
                desc: 'Strict container math and fluid typography guarantees that elements never clip, wrap awkwardly, or cause horizontal scrollbars.',
              },
              {
                title: 'Keyboard & Screen Reader Accessible',
                desc: 'Semantic HTML5, WCAG AA contrast, explicit visible focus indicators, and screen reader-friendly aria labels throughout.',
              },
              {
                title: 'Edge Caching & Performance',
                desc: 'Asset optimization, modern WebP/AVIF formats, code splitting, and Netlify CDN distribution for instantaneous global page loads.',
              },
              {
                title: 'Bulletproof Database Security',
                desc: 'Supabase PostgreSQL protected by Row Level Security (RLS) policies. No leaked service keys, no unauthenticated writes.',
              },
              {
                title: 'Structured SEO Architecture',
                desc: 'Schema.org JSON-LD structured data, dynamic OpenGraph cards, verified XML sitemaps, and clean canonical routing.',
              },
              {
                title: 'Complete IP & Code Ownership',
                desc: 'You receive complete Git repository ownership and full deployment pipelines upon handover with zero lock-in.',
              },
            ].map((p, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-neutral-900/40 border border-neutral-800/80 hover:border-cyan-500/30 transition-colors">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 mb-3" />
                <h3 className="text-base font-semibold text-white mb-2 font-display">{p.title}</h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA Banner */}
        <div className="p-8 sm:p-12 rounded-2xl glass-panel border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <h3 className="heading-stylish text-2xl sm:text-3xl font-extrabold text-white mb-2">
              Ready to collaborate directly with <span className="text-gradient-cyan">Mr Deepak</span>?
            </h3>
            <p className="text-sm text-neutral-300 max-w-xl">
              Let's engineer a bespoke digital flagship that reflects the caliber of your business.
            </p>
          </div>
          <button
            onClick={onStartProject}
            className="btn-stylish-primary inline-flex items-center gap-2 px-7 py-4 text-xs font-semibold uppercase tracking-wider rounded-lg whitespace-nowrap shadow-xl cursor-pointer"
          >
            <span>Start Your Project</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

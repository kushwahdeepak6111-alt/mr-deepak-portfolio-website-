import React from 'react';
import { ArrowUpRight, Mail, Phone, MessageSquare, ShieldCheck, ArrowRight, MapPin } from 'lucide-react';
import { STUDIO_LOCATION } from '../../data/location';

interface FooterProps {
  onNavigate: (page: string) => void;
  onOpenQuoteModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenQuoteModal }) => {
  return (
    <footer className="relative bg-[#050608] border-t border-neutral-800/80 pt-20 pb-12 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-neutral-600 to-transparent opacity-40" />

      {/* Flagship Footer Callout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="glass-panel rounded-3xl p-8 sm:p-14 relative overflow-hidden border border-white/10 shadow-2xl">
          <div className="absolute -right-24 -bottom-24 w-96 h-96 aurora-glow-1 rounded-full pointer-events-none opacity-50" />
          <div className="absolute -left-20 -top-20 w-80 h-80 aurora-glow-2 rounded-full pointer-events-none opacity-30" />
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 block mb-3 font-semibold">
                Ready to elevate your online presence?
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
                LET'S BUILD <span className="text-shimmer">SOMETHING GREAT</span>
              </h2>
              <p className="mt-3 text-neutral-300 text-sm sm:text-base max-w-xl leading-relaxed">
                Partner with Mr Deepak to design and engineer a digital presence that commands authority, captivates clients, and drives revenue.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-white text-black text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-md hover:bg-neutral-200 transition-all shadow-2xl hover:shadow-cyan-500/25 active:scale-95 cursor-pointer"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>

              <button
                onClick={onOpenQuoteModal}
                className="inline-flex items-center gap-2 px-6 py-4 bg-neutral-900/90 border border-white/15 text-white text-xs sm:text-sm font-medium rounded-md hover:bg-neutral-800 transition-all backdrop-blur-md active:scale-95 cursor-pointer"
              >
                <span>Instant Cost Estimator</span>
                <ArrowUpRight className="w-4 h-4 text-cyan-400" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Sitemap Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-neutral-900">
          {/* Brand Column */}
          <div className="lg:col-span-2 pr-0 lg:pr-8">
            <button
              onClick={() => onNavigate('home')}
              className="font-display text-xl font-extrabold text-white tracking-tight mb-1 block hover:text-cyan-200 transition-colors text-left cursor-pointer flex items-center gap-1.5"
            >
              <span>MR</span>
              <span className="text-gradient-cyan">DEEPAK</span>
            </button>
            <p className="text-xs font-mono text-cyan-400 mb-3 font-semibold">
              Engineered & Designed by Mr Deepak
            </p>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-sm mb-6">
              Bespoke website design and full-stack development. 1-on-1 sprint collaboration with Mr Deepak, sub-second load speeds, and 100% custom code ownership.
            </p>
            <div className="flex items-center gap-3 text-xs text-neutral-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
              <span>Accepting New Client Commissions</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-300 mb-4 font-semibold">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('work')}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  Selected Work
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  Services & Capabilities
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  About Mr Deepak
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('process')}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  Our 7-Step Process
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('pricing')}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  Investment & Pricing
                </button>
              </li>
            </ul>
          </div>

          {/* Core Services Links */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-300 mb-4 font-semibold">
              Specialties
            </h3>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Custom Website Design
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Responsive Web Engineering
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Business Websites
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Booking & Reservation Hubs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Performance & SEO Audits
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Contact Links */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-300 mb-4 font-semibold">
              Connect With Mr Deepak
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="tel:+919343795715"
                  className="inline-flex items-center gap-2 text-neutral-300 hover:text-white transition-colors group"
                >
                  <Phone className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
                  <span className="font-mono font-semibold">+91 9343795715</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/919343795715?text=Hi%20Mr%20Deepak,%20I%20would%20like%20to%20discuss%20a%20website%20project%20with%20you"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-neutral-300 hover:text-emerald-300 transition-colors group"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <span>WhatsApp (+91 9343795715)</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:kushwahdeepak6111@gmail.com"
                  className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span className="truncate">kushwahdeepak6111@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href={STUDIO_LOCATION.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-start gap-2 text-neutral-400 hover:text-amber-300 transition-colors group"
                >
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span className="text-xs leading-relaxed text-neutral-300 group-hover:text-amber-200">
                    {STUDIO_LOCATION.shortAddress}
                  </span>
                </a>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => onNavigate('admin')}
                  className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-cyan-300 transition-colors cursor-pointer px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 hover:border-cyan-500/40"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Admin Panel (Leads & Settings)</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} MR DEEPAK. Founded & Engineered by Mr Deepak.</p>

          <div className="flex items-center gap-6">
            <button
              onClick={() => onNavigate('legal')}
              className="hover:text-neutral-300 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span aria-hidden="true" className="text-neutral-700">·</span>
            <button
              onClick={() => onNavigate('legal')}
              className="hover:text-neutral-300 transition-colors cursor-pointer"
            >
              Terms of Engagement
            </button>
            <span aria-hidden="true" className="text-neutral-700">·</span>
            <span className="font-mono text-neutral-600">Netlify & Supabase Verified</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

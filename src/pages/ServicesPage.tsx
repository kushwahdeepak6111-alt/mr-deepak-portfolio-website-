import React from 'react';
import {
  Palette,
  Smartphone,
  Building2,
  Flame,
  Briefcase,
  CalendarCheck,
  LayoutGrid,
  RefreshCw,
  TrendingUp,
  Zap,
  ShieldCheck,
  Cpu,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { SERVICES } from '../data/services';

interface ServicesPageProps {
  onDiscussProject: (serviceTitle: string) => void;
  onOpenQuoteModal: () => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Palette,
  Smartphone,
  Building2,
  Flame,
  Briefcase,
  CalendarCheck,
  LayoutGrid,
  RefreshCw,
  TrendingUp,
  Zap,
  ShieldCheck,
  Cpu,
};

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onDiscussProject,
  onOpenQuoteModal,
}) => {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="max-w-3xl mb-16">
          <div className="badge-stylish mb-3">
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
            <span>Core Competencies · Handcrafted Solutions</span>
          </div>
          <h1 className="heading-stylish text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            SERVICES & <span className="text-gradient-cyan">EXPERTISE</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-300 font-normal leading-relaxed">
            From bespoke architectural design to high-throughput web engineering, <strong className="text-white">Mr Deepak</strong> delivers comprehensive digital solutions with zero compromises on performance or craft.
          </p>
        </div>

        {/* 12 Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((svc) => {
            const Icon = ICON_MAP[svc.iconName] || Palette;
            return (
              <div
                key={svc.id}
                className="p-8 rounded-xl bg-neutral-900/40 border border-neutral-800/80 hover:border-neutral-600 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-neutral-800/60 border border-neutral-700/60 flex items-center justify-center mb-6 group-hover:border-white/40 transition-colors">
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <h2 className="text-2xl font-display font-bold text-white mb-2">
                    {svc.title}
                  </h2>
                  <p className="text-xs text-neutral-400 font-medium mb-4">
                    {svc.tagline}
                  </p>

                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans mb-6">
                    {svc.description}
                  </p>

                  <div className="p-3.5 rounded-lg bg-neutral-900/80 border border-neutral-800/80 mb-6">
                    <span className="text-xs font-mono uppercase text-neutral-400 block mb-1">
                      Target Application:
                    </span>
                    <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                      {svc.useCase}
                    </p>
                  </div>

                  {/* Deliverables */}
                  <div className="space-y-2 mb-6">
                    <span className="text-xs font-mono uppercase text-neutral-500 block">
                      Typical Deliverables:
                    </span>
                    <ul className="space-y-1.5 text-xs text-neutral-300">
                      {svc.deliverables.map((deliv, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                          <span>{deliv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer action */}
                <div className="pt-6 border-t border-neutral-800 flex items-center justify-between">
                  <span className="text-xs font-mono text-neutral-400">
                    Typical SLA: {svc.duration}
                  </span>
                  <button
                    onClick={() => onDiscussProject(svc.title)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-neutral-200 transition-colors"
                  >
                    <span>Discuss Your Project</span>
                    <ArrowRight className="w-3.5 h-3.5 text-black" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-20 p-8 sm:p-12 rounded-2xl glass-panel border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
              Need a bespoke combination of services?
            </h3>
            <p className="text-sm text-neutral-400 max-w-xl">
              We frequently architect custom engineering packages tailored to specific enterprise workflows and deadlines.
            </p>
          </div>
          <button
            onClick={onOpenQuoteModal}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-black text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-neutral-200 transition-colors whitespace-nowrap shadow-xl"
          >
            <span>Custom Scope Estimator</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </button>
        </div>
      </div>
    </div>
  );
};

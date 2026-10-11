import React from 'react';
import { ArrowRight, Palette, Smartphone, Building2, CalendarCheck, TrendingUp, Cpu } from 'lucide-react';
import { SERVICES } from '../../data/services';

interface ServicesPreviewProps {
  onDiscussProject: (serviceTitle: string) => void;
  onViewAllServices: () => void;
  embedded?: boolean;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Palette,
  Smartphone,
  Building2,
  CalendarCheck,
  TrendingUp,
  Cpu,
};

export const ServicesPreview: React.FC<ServicesPreviewProps> = ({
  onDiscussProject,
  onViewAllServices,
  embedded = false,
}) => {
  // Take 6 featured services for homepage preview
  const featuredServices = SERVICES.slice(0, 6);

  return (
    <section className={`relative overflow-hidden ${embedded ? 'py-10 sm:py-14 bg-transparent' : 'py-28 bg-[#06070a] border-t border-white/10'}`}>
      {/* Aurora glow */}
      <div className="absolute top-1/2 right-0 w-96 h-96 aurora-glow-2 blur-3xl pointer-events-none opacity-25" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <div className="badge-stylish mb-3">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
              <span>Specialized Capabilities · Bespoke Engineering</span>
            </div>
            <h2 className="heading-stylish text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              SERVICES & <span className="text-gradient-cyan">EXPERTISE</span>
            </h2>
            <p className="mt-3 text-neutral-300 text-sm sm:text-base leading-relaxed">
              End-to-end digital solutions by <strong className="text-white">Mr Deepak</strong> combining strategic design, modern engineering, and commercial performance.
            </p>
          </div>

          <button
            onClick={onViewAllServices}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-neutral-900 border border-white/10 hover:border-cyan-400/50 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white hover:text-cyan-300 transition-all group hover:shadow-[0_0_20px_rgba(56,189,248,0.2)]"
          >
            <span>View All Capabilities</span>
            <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredServices.map((svc, idx) => {
            const Icon = ICON_MAP[svc.iconName] || Palette;
            const accentColors = [
              'text-cyan-400 bg-cyan-950/40 border-cyan-500/30',
              'text-indigo-400 bg-indigo-950/40 border-indigo-500/30',
              'text-sky-400 bg-sky-950/40 border-sky-500/30',
              'text-amber-400 bg-amber-950/40 border-amber-500/30',
              'text-purple-400 bg-purple-950/40 border-purple-500/30',
              'text-emerald-400 bg-emerald-950/40 border-emerald-500/30',
            ];
            const currentAccent = accentColors[idx % accentColors.length];

            return (
              <div
                key={svc.id}
                className="card-luxury p-8 rounded-xl flex flex-col justify-between group"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-6 shadow-md transition-all group-hover:scale-105 ${currentAccent}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-cyan-200 transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans mb-4">
                    {svc.description}
                  </p>
                  <div className="text-xs text-neutral-400 font-mono border-t border-white/5 pt-3">
                    <span className="text-cyan-400/90 font-semibold">Ideal Use:</span> {svc.useCase}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-mono text-neutral-400">{svc.duration}</span>
                  <button
                    onClick={() => onDiscussProject(svc.title)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white hover:text-cyan-300 transition-colors"
                  >
                    <span>Discuss Your Project</span>
                    <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { PROCESS_STEPS } from '../../data/process';

interface ProcessTimelineProps {
  onStartProject: () => void;
  isFullPage?: boolean;
  embedded?: boolean;
}

export const ProcessTimeline: React.FC<ProcessTimelineProps> = ({
  onStartProject,
  isFullPage = false,
  embedded = false,
}) => {
  const stepsToShow = isFullPage ? PROCESS_STEPS : PROCESS_STEPS.slice(0, 4);

  return (
    <section className={`relative ${embedded ? 'py-10 sm:py-14 bg-transparent' : 'py-24 bg-[#090b10] border-t border-neutral-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <div className="badge-stylish mb-3">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
              <span>Direct Sprint Methodology · Mr Deepak</span>
            </div>
            <h2 className="heading-stylish text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              OUR <span className="text-gradient-cyan">PROCESS</span>
            </h2>
            <p className="mt-3 text-neutral-300 text-sm sm:text-base">
              A structured, transparent engineering lifecycle designed by <strong className="text-white">Mr Deepak</strong> to eliminate uncertainty and deliver exceptional results on schedule.
            </p>
          </div>

          {!isFullPage && (
            <button
              onClick={onStartProject}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-neutral-900 border border-white/10 hover:border-cyan-400/50 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white hover:text-cyan-300 transition-all group hover:shadow-[0_0_20px_rgba(56,189,248,0.2)]"
            >
              <span>Initiate Discovery Phase</span>
              <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1.5 transition-transform" />
            </button>
          )}
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stepsToShow.map((step) => (
            <div
              key={step.step}
              className="p-7 rounded-xl bg-neutral-900/50 border border-neutral-800/80 hover:border-neutral-700 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-display font-bold text-white/40 tabular-nums">
                    {step.step}
                  </span>
                  <span className="text-xs font-mono text-neutral-400">
                    {step.timeline}
                  </span>
                </div>

                <h3 className="text-xl font-display font-bold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-neutral-400 mb-3 font-medium">
                  {step.tagline}
                </p>
                <p className="text-xs text-neutral-400 leading-relaxed font-sans mb-5">
                  {step.description}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-800/80">
                <span className="text-xs font-mono uppercase text-neutral-400 block mb-2">
                  Deliverables:
                </span>
                <ul className="space-y-1.5 text-xs text-neutral-300">
                  {step.deliverables.slice(0, 3).map((deliv, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-neutral-500 shrink-0 mt-0.5" />
                      <span>{deliv}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

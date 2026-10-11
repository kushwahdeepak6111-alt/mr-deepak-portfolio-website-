import React from 'react';
import { ExternalLink, ArrowRight, BookOpen } from 'lucide-react';
import { Project } from '../../types';

interface SelectedWorkProps {
  projects: Project[];
  onOpenCaseStudy: (project: Project) => void;
  onViewAllWork: () => void;
  embedded?: boolean;
}

export const SelectedWork: React.FC<SelectedWorkProps> = ({
  projects,
  onOpenCaseStudy,
  onViewAllWork,
  embedded = false,
}) => {
  return (
    <section className={`relative overflow-hidden ${embedded ? 'py-10 sm:py-14 bg-transparent' : 'py-28 bg-[#050608]'}`}>
      {/* Aurora Ambience */}
      <div className="absolute top-1/3 -left-40 w-96 h-96 aurora-glow-1 pointer-events-none opacity-30" />
      <div className="absolute bottom-10 -right-40 w-96 h-96 aurora-glow-2 pointer-events-none opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <div className="badge-stylish mb-3">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
              <span>Signature Portfolio · Handcrafted Works</span>
            </div>
            <h2 className="heading-stylish text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              SELECTED <span className="text-gradient-cyan">WORK</span>
            </h2>
            <p className="mt-3 text-neutral-300 text-sm sm:text-base leading-relaxed">
              A curated selection of digital experiences engineered by <strong className="text-white">Mr Deepak</strong> for ambitious global brands and venture-backed startups.
            </p>
          </div>

          <button
            onClick={onViewAllWork}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-neutral-900 border border-white/10 hover:border-cyan-400/50 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white hover:text-cyan-300 transition-all group hover:shadow-[0_0_20px_rgba(56,189,248,0.2)]"
          >
            <span>Explore All Projects</span>
            <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.slice(0, 3).map((project) => (
            <div
              key={project.id}
              className="card-luxury group flex flex-col rounded-2xl overflow-hidden"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-950">
                <img
                  src={project.imageUrl}
                  alt={`${project.title} - ${project.category}`}
                  className="w-full h-full object-cover transition-transform duration-200 ease-out group-hover:scale-105 will-change-transform"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    (e.target as HTMLElement).style.opacity = '0.5';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c12] via-black/30 to-transparent" />

                {/* Category Metadata (Unboxed) */}
                <div className="absolute top-4 left-4 z-10 text-[11px] font-mono tracking-wider text-white/90 drop-shadow-md flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>{project.category}</span>
                </div>

                {/* Tech stack snippet on overlay */}
                <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between">
                  <span className="text-xs font-mono text-neutral-300">
                    {(project.technologies || []).slice(0, 3).join(' · ')}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-7 flex flex-col flex-1 justify-between gap-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight group-hover:text-cyan-200 transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-2.5 text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
                    {project.shortDescription}
                  </p>
                </div>

                {/* Key Metrics Snippet */}
                {project.metrics && project.metrics.length > 0 && (
                  <div className="py-2.5 px-3.5 rounded-lg bg-neutral-900/80 border border-white/5 flex items-center justify-between text-xs font-mono">
                    <span className="text-neutral-400">{project.metrics[0].label}:</span>
                    <span className="text-cyan-300 font-semibold tabular-nums">{project.metrics[0].value}</span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => onOpenCaseStudy(project)}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-neutral-800/90 hover:bg-neutral-700/90 text-white text-xs font-semibold uppercase tracking-wider rounded-md border border-white/10 transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-cyan-300" />
                    <span>Case Study</span>
                  </button>

                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white text-black text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-neutral-200 transition-all shadow-md active:scale-95"
                      aria-label={`View live website for ${project.title}`}
                    >
                      <span>Live Site</span>
                      <ExternalLink className="w-3.5 h-3.5 text-black" />
                    </a>
                  ) : (
                    <button
                      onClick={() => onOpenCaseStudy(project)}
                      className="inline-flex items-center justify-center px-3.5 py-2.5 bg-neutral-900 border border-neutral-700 text-neutral-400 text-xs font-mono rounded-md hover:text-white transition-colors"
                      title="Prototype preview available in case study"
                    >
                      <span>Concept</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

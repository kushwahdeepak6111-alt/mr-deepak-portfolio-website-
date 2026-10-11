import React, { useEffect } from 'react';
import { X, ExternalLink, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Project } from '../../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onStartProject: (projectTitle: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onStartProject,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div
        className="relative w-full max-w-4xl my-auto bg-[#0c0e14] border border-white/10 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden text-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-[#090b10]">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono tracking-wider uppercase text-neutral-400">
              {project.category}
            </span>
            <span aria-hidden="true" className="text-neutral-700">/</span>
            <span className="text-xs font-mono text-neutral-400">{project.year}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="max-h-[80vh] overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Main Visual */}
          <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden border border-white/5 bg-neutral-900">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                // Fallback container
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
              <div>
                <h2 id="modal-project-title" className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                  {project.title}
                </h2>
                <p className="text-sm text-neutral-300 font-medium">{project.client}</p>
              </div>

              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-black text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-neutral-200 transition-colors"
                >
                  <span>Launch Live</span>
                  <ExternalLink className="w-3.5 h-3.5 text-black" />
                </a>
              ) : (
                <span className="text-xs font-mono text-neutral-400 bg-black/60 px-3 py-1.5 rounded border border-white/10 backdrop-blur-sm">
                  Private Client Prototype
                </span>
              )}
            </div>
          </div>

          {/* Metrics Row (Adjacency to claims) */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-3 gap-3 p-4 rounded-lg bg-neutral-900/60 border border-neutral-800">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-xl sm:text-2xl font-display font-bold text-white tabular-nums">
                    {m.value}
                  </div>
                  <div className="text-xs text-neutral-400 font-sans mt-0.5">{m.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Narrative Content */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                Executive Overview
              </h3>
              <p className="text-neutral-300 leading-relaxed text-sm sm:text-base">
                {project.fullDescription}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-5 rounded-lg bg-neutral-900/40 border border-neutral-800/80">
                <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400/90 mb-2">
                  The Challenge
                </h4>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {project.challenge}
                </p>
              </div>

              <div className="p-5 rounded-lg bg-neutral-900/40 border border-neutral-800/80">
                <h4 className="text-xs font-mono uppercase tracking-wider text-sky-400/90 mb-2">
                  The Engineering Solution
                </h4>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            <div className="p-5 rounded-lg bg-neutral-900/30 border border-neutral-800">
              <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400/90 mb-2">
                Commercial Outcome
              </h4>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {project.outcome}
              </p>
            </div>

            {/* Scope & Technologies (Unboxed clean metadata) */}
            <div className="flex flex-col sm:flex-row gap-6 pt-2 text-xs border-t border-neutral-800/80">
              <div className="flex-1">
                <span className="font-mono uppercase text-neutral-500 block mb-2">Scope of Work</span>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-neutral-300">
                  {(project.servicesProvided || []).map((s, idx) => (
                    <span key={idx} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-neutral-500" />
                      <span>{s}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex-1">
                <span className="font-mono uppercase text-neutral-500 block mb-2">Tech Stack</span>
                <div className="flex items-center gap-2 text-neutral-400">
                  {(project.technologies || []).join(' · ')}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-neutral-800 bg-[#090b10]">
          <span className="text-xs text-neutral-400 font-mono hidden sm:inline">
            Like what you see? We can engineer something similar.
          </span>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-white transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onStartProject(project.title);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-neutral-200 transition-colors shadow-lg"
            >
              <span>Build A Similar Site</span>
              <ArrowRight className="w-3.5 h-3.5 text-black" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useMemo } from 'react';
import { Search, ExternalLink, BookOpen, Filter, ArrowUpRight } from 'lucide-react';
import { Project } from '../types';

interface WorkPageProps {
  projects: Project[];
  onOpenCaseStudy: (project: Project) => void;
  onOpenQuoteModal: () => void;
}

const CATEGORIES = [
  'All',
  'FITNESS / WEB DESIGN',
  'BUSINESS / WEB DESIGN',
  'SALON / BOOKING WEBSITE',
  'ARCHITECTURE / PORTFOLIO',
];

export const WorkPage: React.FC<WorkPageProps> = ({
  projects,
  onOpenCaseStudy,
  onOpenQuoteModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesCat =
        selectedCategory === 'All' || p.category.toLowerCase().includes(selectedCategory.toLowerCase());
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.technologies || []).some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCat && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="badge-stylish mb-3">
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
            <span>Case Studies & Portfolio · Handcrafted Works</span>
          </div>
          <h1 className="heading-stylish text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            SELECTED <span className="text-gradient-cyan">WORK</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-300 font-normal leading-relaxed">
            Every project is architected by <strong className="text-white">Mr Deepak</strong> with purpose: elevated aesthetic presence, sub-second execution speeds, and verifiable commercial leverage.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-8 mb-10 border-b border-neutral-900">
          {/* Category Tabs (Segmented control button group - allowed by skill) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-900/80 rounded-lg border border-neutral-800">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-white text-black font-semibold shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {cat === 'All' ? 'All Work' : cat.split('/')[0].trim()}
              </button>
            ))}
          </div>

          {/* Search Field */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by tech or keyword..."
              className="w-full pl-9 pr-4 py-2 bg-neutral-900/60 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-white transition-all"
            />
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="py-20 text-center rounded-xl border border-neutral-900 bg-neutral-900/20">
            <Filter className="w-8 h-8 text-neutral-600 mx-auto mb-3" />
            <h3 className="text-lg font-display font-semibold text-white">No projects found</h3>
            <p className="text-xs text-neutral-400 mt-1">Try resetting your filter or search query.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-mono bg-neutral-800 text-white rounded-md hover:bg-neutral-700"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="group flex flex-col rounded-xl overflow-hidden bg-neutral-900/40 border border-neutral-800/80 hover:border-neutral-600 transition-all duration-300"
              >
                {/* Media frame */}
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-950">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-200 ease-out group-hover:scale-105 will-change-transform"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                  {/* Clean unboxed metadata */}
                  <div className="absolute top-4 left-4 z-10 text-xs font-mono text-white/90 drop-shadow">
                    <span>{project.category}</span>
                    <span aria-hidden="true" className="mx-2 text-white/40">·</span>
                    <span>{project.year}</span>
                  </div>

                  {project.liveUrl && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 bg-black/70 px-2.5 py-1 rounded border border-emerald-500/30 backdrop-blur-sm">
                        Live on Netlify
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-7 flex flex-col flex-1 justify-between gap-6">
                  <div>
                    <h2 className="text-2xl font-display font-bold text-white group-hover:text-neutral-200 transition-colors">
                      {project.title}
                    </h2>
                    <p className="mt-2 text-sm text-neutral-400 leading-relaxed font-sans">
                      {project.shortDescription}
                    </p>
                  </div>

                  {/* Metrics proof adjacency */}
                  {project.metrics && project.metrics.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 py-3 px-4 rounded-lg bg-neutral-900/80 border border-neutral-800">
                      {project.metrics.map((m, idx) => (
                        <div key={idx} className="text-center">
                          <div className="text-base sm:text-lg font-display font-bold text-white tabular-nums">
                            {m.value}
                          </div>
                          <div className="text-[11px] text-neutral-400 mt-0.5 truncate">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech stack metadata (unboxed) */}
                  <div className="text-xs font-mono text-neutral-400">
                    {(project.technologies || []).join(' · ')}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 pt-2 border-t border-neutral-800">
                    <button
                      onClick={() => onOpenCaseStudy(project)}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-neutral-300" />
                      <span>Read Case Study</span>
                    </button>

                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white text-black text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-neutral-200 transition-colors"
                      >
                        <span>Launch</span>
                        <ExternalLink className="w-3.5 h-3.5 text-black" />
                      </a>
                    ) : (
                      <span className="text-xs font-mono text-neutral-500 px-3 py-2">
                        Client Concept
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Commission Callout */}
        <div className="mt-20 p-8 sm:p-10 rounded-2xl bg-neutral-900/40 border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
              Have a distinct project in mind?
            </h3>
            <p className="mt-1.5 text-sm text-neutral-400 max-w-xl">
              We engineer bespoke digital experiences tailored to your brand's unique positioning and commercial targets.
            </p>
          </div>
          <button
            onClick={onOpenQuoteModal}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-black text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-neutral-200 transition-colors whitespace-nowrap shadow-lg"
          >
            <span>Estimate Your Project</span>
            <ArrowUpRight className="w-4 h-4 text-black" />
          </button>
        </div>
      </div>
    </div>
  );
};

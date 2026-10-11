import React from 'react';
import { ProcessTimeline } from '../components/sections/ProcessTimeline';
import {
  ArrowRight,
  CheckCircle2,
  Shield,
  Clock,
  FileCheck,
  MessageSquare,
  Sparkles,
  GitBranch,
  Eye,
} from 'lucide-react';

interface ProcessPageProps {
  onStartProject: () => void;
}

export const ProcessPage: React.FC<ProcessPageProps> = ({ onStartProject }) => {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="badge-stylish mb-3">
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
            <span>Execution Roadmap · Engineered by Mr Deepak</span>
          </div>
          <h1 className="heading-stylish text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            MR DEEPAK'S <span className="text-gradient-cyan">7-STEP WORKFLOW</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-300 font-normal leading-relaxed">
            Every project is engineered with structured discipline, transparent milestone releases, and direct 1-on-1 collaboration. Here is how Mr Deepak transforms your vision into an exceptional, high-converting digital experience.
          </p>
        </div>

        {/* Highlight Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 p-6 rounded-2xl bg-neutral-900/50 border border-white/10 shadow-xl">
          <div className="flex items-center gap-4">
            <Clock className="w-8 h-8 text-cyan-400 shrink-0" />
            <div>
              <div className="text-lg font-bold text-white font-display">2–4 Weeks</div>
              <div className="text-xs text-neutral-400 font-sans">Agile sprint turnaround</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <FileCheck className="w-8 h-8 text-indigo-400 shrink-0" />
            <div>
              <div className="text-lg font-bold text-white font-display">100% Transparent</div>
              <div className="text-xs text-neutral-400 font-sans">Live staging demo at each phase</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Shield className="w-8 h-8 text-emerald-400 shrink-0" />
            <div>
              <div className="text-lg font-bold text-white font-display">Direct Founder QA</div>
              <div className="text-xs text-neutral-400 font-sans">98+ Lighthouse & security signoff</div>
            </div>
          </div>
        </div>

        {/* Workflow Principles Banner */}
        <div className="mb-16 p-6 sm:p-8 rounded-2xl glass-panel border border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-lg bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shrink-0">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-display font-semibold text-white mb-1">
                Direct WhatsApp & Email Access
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Skip the agency phone tree. You have direct communication with Mr Deepak throughout the entire design and engineering sprint.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-lg bg-indigo-950/80 border border-indigo-500/40 flex items-center justify-center text-indigo-300 shrink-0">
              <Eye className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-display font-semibold text-white mb-1">
                Live Interactive Staging Previews
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Test your website on your own smartphone and desktop as it is being built—giving you complete visibility into progress.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-lg bg-purple-950/80 border border-purple-500/40 flex items-center justify-center text-purple-300 shrink-0">
              <GitBranch className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-display font-semibold text-white mb-1">
                Full IP & Clean Code Ownership
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Upon launch, you receive complete Git repository ownership, database rights, and environment documentation with zero lock-in.
              </p>
            </div>
          </div>
        </div>

        {/* Full 7-Step Timeline */}
        <ProcessTimeline onStartProject={onStartProject} isFullPage={true} />

        {/* Client Guarantee & CTA */}
        <div className="mt-20 p-8 sm:p-12 rounded-2xl glass-panel border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <h3 className="heading-stylish text-2xl sm:text-3xl font-extrabold text-white mb-2">
              Ready to kick off Stage 01 with <span className="text-gradient-cyan">Mr Deepak</span>?
            </h3>
            <p className="text-sm text-neutral-300 max-w-xl">
              Schedule your discovery session today. We clarify scope, timeline, and exact deliverables before any financial commitment.
            </p>
          </div>
          <button
            onClick={onStartProject}
            className="btn-stylish-primary inline-flex items-center gap-2 px-7 py-4 text-xs font-semibold uppercase tracking-wider rounded-lg whitespace-nowrap shadow-xl cursor-pointer"
          >
            <span>Start Discovery Phase</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

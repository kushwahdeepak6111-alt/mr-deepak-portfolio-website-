import React from 'react';
import { ArrowLeft, Home } from 'lucide-react';

interface NotFoundPageProps {
  onBackToHome: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onBackToHome }) => {
  return (
    <div className="pt-36 pb-28 min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="text-7xl sm:text-8xl font-display font-bold text-white/20 tabular-nums">
          404
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
          PAGE NOT FOUND
        </h1>
        <p className="text-sm text-neutral-400 font-sans leading-relaxed">
          The requested coordinate or project file does not exist in the studio directory. Let us guide you back to the main experience.
        </p>

        <div className="pt-4 flex items-center justify-center gap-3">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-neutral-200 transition-colors shadow-lg"
          >
            <Home className="w-4 h-4 text-black" />
            <span>Return to Studio Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};

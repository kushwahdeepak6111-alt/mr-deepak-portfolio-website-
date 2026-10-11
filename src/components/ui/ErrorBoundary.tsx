import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Trash2, MessageSquare, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  isSection?: boolean;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an unhandled error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = (): void => {
    window.location.reload();
  };

  handleResetAndReload = (): void => {
    try {
      localStorage.removeItem('mrdeepak_custom_projects');
      localStorage.removeItem('mrdeepak_bg_theme');
      localStorage.removeItem('mrdeepak_bg_grid');
      localStorage.removeItem('mrdeepak_leads_db');
    } catch (e) {
      console.warn('Failed clearing localStorage:', e);
    }
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.isSection) {
        // Lightweight in-place recovery for section-level errors
        return (
          <div className="my-8 mx-auto max-w-4xl p-6 sm:p-8 rounded-2xl bg-[#0d111e] border border-amber-500/30 text-center shadow-xl">
            <div className="inline-flex p-3 rounded-full bg-amber-500/10 text-amber-400 mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              {this.props.fallbackTitle || 'Section Display Notice'}
            </h3>
            <p className="text-sm text-neutral-400 max-w-md mx-auto mb-5 leading-relaxed">
              This content section encountered a display glitch. The rest of the site is operating normally.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => this.setState({ hasError: false, error: null })}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry Section</span>
              </button>
            </div>
          </div>
        );
      }

      // Full-page graceful crash screen (never a white screen!)
      return (
        <div className="min-h-screen bg-[#050608] text-neutral-200 flex items-center justify-center p-4 sm:p-8 selection:bg-cyan-500/30">
          <div className="max-w-xl w-full p-8 sm:p-10 rounded-3xl bg-[#0a0d18] border border-cyan-500/30 shadow-[0_0_50px_rgba(56,189,248,0.15)] text-center relative overflow-hidden">
            {/* Ambient top light */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500" />

            <div className="inline-flex p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mb-6 shadow-inner">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight mb-3">
              {typeof navigator !== 'undefined' && !navigator.onLine
                ? 'Offline Mode Active'
                : 'Application Recovery Mode'}
            </h1>

            <p className="text-sm sm:text-base text-neutral-300 mb-6 leading-relaxed">
              {typeof navigator !== 'undefined' && !navigator.onLine
                ? 'Your device appears to be disconnected from the internet. The application is running in local offline resilience mode.'
                : 'We encountered a runtime display exception. Rather than showing a blank screen, you can immediately reload or reset saved preferences below.'}
            </p>

            {this.state.error && (
              <div className="mb-6 p-3 rounded-xl bg-neutral-950 border border-white/5 text-left text-xs font-mono text-neutral-400 overflow-x-auto max-h-28">
                {this.state.error.message || String(this.state.error)}
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
              <button
                onClick={this.handleReload}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-cyan-500/25 transition-all cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reload Website</span>
              </button>

              <button
                onClick={this.handleResetAndReload}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-white/10 hover:border-amber-400/40 text-neutral-300 hover:text-white font-medium text-sm transition-all cursor-pointer"
                title="Clears any cached local data and reloads"
              >
                <Trash2 className="w-4 h-4 text-amber-400" />
                <span>Reset Cache & Reload</span>
              </button>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-center gap-4 text-xs text-neutral-400">
              <a
                href="https://wa.me/919343795715"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-medium"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Mr Deepak: +91 9343795715</span>
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

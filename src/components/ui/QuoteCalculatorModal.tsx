import React, { useState, useEffect } from 'react';
import { X, Calculator, ArrowRight, Check } from 'lucide-react';

interface QuoteCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyScopeToContact: (scopeData: { projectType: string; budget: string; details: string }) => void;
}

export const QuoteCalculatorModal: React.FC<QuoteCalculatorModalProps> = ({
  isOpen,
  onClose,
  onApplyScopeToContact,
}) => {
  const [projectType, setProjectType] = useState<'landing' | 'business' | 'portfolio' | 'webapp'>('business');
  const [pageCount, setPageCount] = useState<number>(5);
  const [has3dEffects, setHas3dEffects] = useState<boolean>(true);
  const [hasBooking, setHasBooking] = useState<boolean>(false);
  const [hasSupabase, setHasSupabase] = useState<boolean>(false);
  const [hasSeoSprint, setHasSeoSprint] = useState<boolean>(true);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Real-time calculation in Indian Rupees (INR) starting from ₹5,000
  let basePrice = 5000;
  let weeksMin = 1;
  let weeksMax = 2;

  if (projectType === 'landing') {
    basePrice = 5000;
    weeksMin = 1;
    weeksMax = 1;
  } else if (projectType === 'business') {
    basePrice = 12000 + Math.max(0, pageCount - 5) * 1500;
    weeksMin = 1;
    weeksMax = 2;
  } else if (projectType === 'portfolio') {
    basePrice = 7500 + Math.max(0, pageCount - 4) * 1000;
    weeksMin = 1;
    weeksMax = 2;
  } else if (projectType === 'webapp') {
    basePrice = 28000 + Math.max(0, pageCount - 6) * 2000;
    weeksMin = 2;
    weeksMax = 4;
  }

  let addOnTotal = 0;
  if (has3dEffects) addOnTotal += 3000;
  if (hasBooking) addOnTotal += 2500;
  if (hasSupabase) addOnTotal += 4500;
  if (hasSeoSprint) addOnTotal += 2000;

  const estimatedTotal = basePrice + addOnTotal;

  const handleApply = () => {
    const details = [
      `Type: ${projectType.toUpperCase()}`,
      `Estimated Pages: ~${pageCount}`,
      has3dEffects ? 'Includes 3D / WebGL Visuals (+₹3,000)' : null,
      hasBooking ? 'Includes Booking / Reservation System (+₹2,500)' : null,
      hasSupabase ? 'Includes Supabase Database & Auth (+₹4,500)' : null,
      hasSeoSprint ? 'Includes Comprehensive SEO & Schema Sprint (+₹2,000)' : null,
    ]
      .filter(Boolean)
      .join(', ');

    let budgetBand = '₹5,000 - ₹15,000';
    if (estimatedTotal > 75000) budgetBand = '₹75,000+';
    else if (estimatedTotal > 35000) budgetBand = '₹35,000 - ₹75,000';
    else if (estimatedTotal > 15000) budgetBand = '₹15,000 - ₹35,000';

    onApplyScopeToContact({
      projectType: projectType === 'webapp' ? 'Custom Web Applications' : 'Business Websites',
      budget: budgetBand,
      details,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-2xl bg-[#0d0f15] border border-white/10 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden text-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-[#090b10]">
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-neutral-400" />
            <h2 className="font-display font-semibold text-white text-base sm:text-lg">
              Instant Scope & Investment Estimator
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-md hover:bg-neutral-800 transition-colors"
            aria-label="Close estimator"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          <p className="text-xs sm:text-sm text-neutral-400">
            Get an immediate, transparent estimate tailored to your project requirements. Every build is 100% custom-crafted with sub-second performance.
          </p>

          {/* Project Type Picker */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2.5">
              1. Project Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'landing', label: 'Landing Page' },
                { id: 'business', label: 'Business Hub' },
                { id: 'portfolio', label: 'Portfolio' },
                { id: 'webapp', label: 'Custom Web App' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setProjectType(t.id as any)}
                  className={`p-3 text-xs rounded-lg border text-left transition-all ${
                    projectType === t.id
                      ? 'border-white bg-white/10 text-white font-semibold'
                      : 'border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:text-white hover:border-neutral-700'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Page Count Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                2. Estimated Pages
              </label>
              <span className="text-xs font-mono text-white tabular-nums">
                ~{pageCount} Pages
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              value={pageCount}
              onChange={(e) => setPageCount(Number(e.target.value))}
              className="w-full accent-white bg-neutral-800 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          {/* Feature Add-ons */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2.5">
              3. Specialized Capabilities
            </label>
            <div className="space-y-2">
              <label className="flex items-center justify-between p-3 rounded-lg border border-neutral-800/80 bg-neutral-900/40 cursor-pointer hover:border-neutral-700">
                <span className="text-xs sm:text-sm text-neutral-300">
                  Interactive 3D / WebGL Atmosphere & Micro-interactions
                </span>
                <input
                  type="checkbox"
                  checked={has3dEffects}
                  onChange={(e) => setHas3dEffects(e.target.checked)}
                  className="rounded border-neutral-700 accent-white w-4 h-4 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-lg border border-neutral-800/80 bg-neutral-900/40 cursor-pointer hover:border-neutral-700">
                <span className="text-xs sm:text-sm text-neutral-300">
                  Direct Appointment Booking / Reservation Engine
                </span>
                <input
                  type="checkbox"
                  checked={hasBooking}
                  onChange={(e) => setHasBooking(e.target.checked)}
                  className="rounded border-neutral-700 accent-white w-4 h-4 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-lg border border-neutral-800/80 bg-neutral-900/40 cursor-pointer hover:border-neutral-700">
                <span className="text-xs sm:text-sm text-neutral-300">
                  Supabase PostgreSQL Database, Leads Table & RLS
                </span>
                <input
                  type="checkbox"
                  checked={hasSupabase}
                  onChange={(e) => setHasSupabase(e.target.checked)}
                  className="rounded border-neutral-700 accent-white w-4 h-4 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-lg border border-neutral-800/80 bg-neutral-900/40 cursor-pointer hover:border-neutral-700">
                <span className="text-xs sm:text-sm text-neutral-300">
                  Comprehensive Schema.org, OpenGraph & Core Web Vitals Sprint
                </span>
                <input
                  type="checkbox"
                  checked={hasSeoSprint}
                  onChange={(e) => setHasSeoSprint(e.target.checked)}
                  className="rounded border-neutral-700 accent-white w-4 h-4 cursor-pointer"
                />
              </label>
            </div>
          </div>

          {/* Estimate Display Card */}
          <div className="p-5 rounded-xl bg-neutral-900/90 border border-neutral-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase text-neutral-400">Estimated Investment (Indian Rupees)</span>
              <div className="text-3xl font-display font-bold text-white tabular-nums tracking-tight">
                ₹{estimatedTotal.toLocaleString('en-IN')}{' '}
                <span className="text-xs font-mono font-normal text-cyan-400">INR</span>
              </div>
              <span className="text-xs text-neutral-400 font-sans mt-0.5 block">
                Estimated Delivery: {weeksMin}–{weeksMax} Weeks
              </span>
            </div>

            <button
              type="button"
              onClick={handleApply}
              className="inline-flex items-center gap-2 px-5 py-3 bg-white text-black text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-neutral-200 transition-all duration-100 active:scale-95 cursor-pointer whitespace-nowrap shadow-md"
            >
              <span>Apply to Project Brief</span>
              <ArrowRight className="w-3.5 h-3.5 text-black" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

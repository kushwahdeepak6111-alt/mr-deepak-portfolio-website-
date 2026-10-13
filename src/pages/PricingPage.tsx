import React, { useState } from 'react';
import { ArrowRight, Check, Sparkles, Calculator, HelpCircle, ShieldCheck, CreditCard, Landmark, QrCode, Sliders, Wrench, Clock, Zap } from 'lucide-react';
import { PRICING_TIERS, PRICING_FACTORS, PRICING_NOTE, MAINTENANCE_PLAN } from '../data/pricing';
import { PricingTier } from '../types';

interface PricingPageProps {
  onSelectTier: (tierName: string, priceBand: string) => void;
  onOpenQuoteModal: () => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({
  onSelectTier,
  onOpenQuoteModal,
}) => {
  const [billingCurrency, setBillingCurrency] = useState<'INR' | 'USD' | 'EUR' | 'GBP'>('INR');

  const formatPriceDisplay = (tier: PricingTier) => {
    if (billingCurrency === 'INR') {
      return tier.priceRangeINR || `₹${tier.startingPriceINR.toLocaleString('en-IN')}+`;
    }
    if (billingCurrency === 'USD') {
      return tier.priceRangeUSD || `$${tier.startingPriceUSD.toLocaleString('en-US')}+`;
    }
    if (billingCurrency === 'EUR') {
      const eurMin = Math.round(tier.startingPriceUSD * 0.92);
      if (tier.maxPriceUSD) {
        const eurMax = Math.round(tier.maxPriceUSD * 0.92);
        return `€${eurMin.toLocaleString('en-US')} – €${eurMax.toLocaleString('en-US')}`;
      }
      return `€${eurMin.toLocaleString('en-US')}+`;
    }
    if (billingCurrency === 'GBP') {
      const gbpMin = Math.round(tier.startingPriceUSD * 0.78);
      if (tier.maxPriceUSD) {
        const gbpMax = Math.round(tier.maxPriceUSD * 0.78);
        return `£${gbpMin.toLocaleString('en-US')} – £${gbpMax.toLocaleString('en-US')}`;
      }
      return `£${gbpMin.toLocaleString('en-US')}+`;
    }
    return tier.priceRangeINR || `₹${tier.startingPriceINR.toLocaleString('en-IN')}+`;
  };

  const formatMaintenancePrice = () => {
    if (billingCurrency === 'INR') return '₹1,000';
    if (billingCurrency === 'USD') return '$15';
    if (billingCurrency === 'EUR') return '€14';
    if (billingCurrency === 'GBP') return '£12';
    return '₹1,000';
  };

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-3xl">
            <div className="badge-stylish mb-3">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
              <span>Transparent Project Pricing · ₹ INR · Bespoke Engineering</span>
            </div>
            <h1 className="heading-stylish text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              CLEAR PROJECT <span className="text-gradient-cyan">PRICING TIERS</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-neutral-300 font-normal leading-relaxed">
              Transparent project estimates designed for high-impact outcomes. Every build is individually crafted by <strong className="text-white">Mr Deepak</strong> with custom code, responsive speed, and complete source code ownership.
            </p>
          </div>

          {/* Currency Toggle (Segmented control) with INR first */}
          <div className="flex items-center gap-1.5 p-1.5 bg-neutral-900/90 border border-neutral-800 rounded-xl self-start md:self-auto shadow-lg">
            {(['INR', 'USD', 'EUR', 'GBP'] as const).map((curr) => (
              <button
                key={curr}
                onClick={() => setBillingCurrency(curr)}
                className={`px-3.5 py-1.5 text-xs font-mono rounded-lg transition-all cursor-pointer ${
                  billingCurrency === curr
                    ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold shadow-md shadow-cyan-500/30'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {curr === 'INR' ? '₹ INR' : curr === 'USD' ? '$ USD' : curr === 'EUR' ? '€ EUR' : '£ GBP'}
              </button>
            ))}
          </div>
        </div>

        {/* Real Price Notice Banner (Prominent highlight) */}
        <div className="mb-10 p-4 sm:p-5 rounded-xl bg-gradient-to-r from-cyan-950/60 via-indigo-950/40 to-neutral-900/60 border border-cyan-500/30 flex items-start sm:items-center gap-3.5 shadow-lg">
          <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-300 shrink-0">
            <Sliders className="w-5 h-5" />
          </div>
          <div className="flex-1 text-xs sm:text-sm">
            <div className="font-semibold text-white font-display flex items-center gap-2">
              <span>Tailored Scope Guarantee</span>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold">
                Dynamic Pricing
              </span>
            </div>
            <p className="text-neutral-300 font-sans mt-0.5">
              <strong className="text-cyan-300">{PRICING_NOTE}</strong> The displayed bands are starting references; your exact quote aligns precisely with your project scope, page count, and custom capabilities.
            </p>
          </div>
        </div>

        {/* Interactive Estimator Callout Strip */}
        <div className="mb-12 p-5 rounded-xl bg-neutral-900/60 border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Calculator className="w-5 h-5 text-neutral-300" />
            <div>
              <div className="text-sm font-semibold text-white font-display">
                Want an exact line-item calculation for your requirements?
              </div>
              <div className="text-xs text-neutral-400 font-sans">
                Use our interactive project calculator to select pages, custom features, animations, and database options.
              </div>
            </div>
          </div>
          <button
            onClick={onOpenQuoteModal}
            className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-mono uppercase tracking-wider rounded-md border border-neutral-700 transition-colors whitespace-nowrap cursor-pointer"
          >
            <span>Launch Estimator</span>
            <ArrowRight className="w-3.5 h-3.5 text-white" />
          </button>
        </div>

        {/* Pricing Cards Grid (6 tiers: Basic, Standard, Professional, Advanced, Ecommerce, Custom) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`p-7 rounded-2xl flex flex-col justify-between transition-all duration-300 ${
                tier.featured
                  ? 'bg-neutral-900/90 border-2 border-cyan-400/70 shadow-2xl relative shadow-cyan-500/10'
                  : 'bg-neutral-900/40 border border-neutral-800/80 hover:border-neutral-700'
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-black bg-cyan-300 px-3 py-1 rounded-full font-bold shadow-md">
                    Most Popular
                  </span>
                </div>
              )}

              <div>
                <div className="mb-4">
                  <h2 className="text-xl font-display font-bold text-white mb-1">
                    {tier.name}
                  </h2>
                  <p className="text-xs text-neutral-400 font-sans leading-tight">
                    {tier.tagline}
                  </p>
                </div>

                <div className="mb-6 pt-3 border-t border-neutral-800/80">
                  <div className="flex items-baseline gap-1.5 flex-wrap">
                    <span className="text-2xl sm:text-3xl font-display font-extrabold text-white tabular-nums tracking-tight">
                      {formatPriceDisplay(tier)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mt-2">
                    <span>Turnaround: {tier.deliveryTime}</span>
                    <span className="text-[11px] text-cyan-400/80">Tailored by scope</span>
                  </div>
                </div>

                <p className="text-xs text-neutral-300 mb-6 leading-relaxed font-sans min-h-[3rem]">
                  {tier.description}
                </p>

                {/* Features list */}
                <div className="space-y-2.5 mb-8 pt-4 border-t border-neutral-800/80">
                  <span className="text-[11px] font-mono uppercase text-neutral-400 block font-semibold">
                    Scope Inclusions:
                  </span>
                  <ul className="space-y-2 text-xs text-neutral-300 font-sans">
                    {tier.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-neutral-800">
                <button
                  onClick={() =>
                    onSelectTier(
                      tier.name,
                      tier.priceRangeINR || `₹${tier.startingPriceINR.toLocaleString('en-IN')}+`
                    )
                  }
                  className={`w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold uppercase tracking-wider rounded-md transition-colors cursor-pointer ${
                    tier.featured
                      ? 'bg-white hover:bg-neutral-200 text-black'
                      : 'bg-neutral-800 hover:bg-neutral-700 text-white'
                  }`}
                >
                  <span>Select {tier.name.split(' ')[0]} & Discuss</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Website Maintenance Charge Card (₹1,000 / month) */}
        <div className="mb-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-neutral-900/90 via-[#0d1520]/80 to-neutral-900/90 border border-emerald-500/40 relative overflow-hidden shadow-2xl shadow-emerald-500/5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-neutral-800/80">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold mb-3">
                <Wrench className="w-3.5 h-3.5 text-emerald-400" />
                <span>CONTINUOUS WEBSITE CARE & SUPPORT</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                {MAINTENANCE_PLAN.name}
              </h2>
              <p className="text-sm text-neutral-300 font-sans mt-2 leading-relaxed">
                {MAINTENANCE_PLAN.tagline}. {MAINTENANCE_PLAN.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-4 shrink-0 bg-neutral-950/60 p-5 rounded-xl border border-neutral-800/80 min-w-[260px]">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">
                  Maintenance Charge
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl sm:text-4xl font-display font-extrabold text-emerald-400 tabular-nums">
                    {formatMaintenancePrice()}
                  </span>
                  <span className="text-xs font-mono text-neutral-400 uppercase">
                    / month
                  </span>
                </div>
                <div className="text-[11px] font-mono text-neutral-400 mt-1 flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-emerald-400" />
                  <span>Billed monthly · Cancel anytime</span>
                </div>
              </div>

              <button
                onClick={() =>
                  onSelectTier(
                    'Website Maintenance & Support',
                    '₹1,000 / month'
                  )
                }
                className="w-full sm:w-auto lg:w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-black text-xs font-mono uppercase font-bold tracking-wider rounded-lg transition-colors cursor-pointer shadow-lg shadow-emerald-500/20"
              >
                <span>Add Maintenance Plan</span>
                <ArrowRight className="w-3.5 h-3.5 text-black" />
              </button>
            </div>
          </div>

          {/* Maintenance Features Checklist */}
          <div className="mt-6">
            <span className="text-xs font-mono uppercase text-neutral-400 block font-semibold mb-3">
              Included in the ₹1,000 / Month Care Package:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {MAINTENANCE_PLAN.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-lg bg-neutral-950/50 border border-neutral-800/60 text-xs text-neutral-300 font-sans"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Indian & Global Payment Options Card */}
        <div className="mb-14 p-6 sm:p-8 rounded-2xl bg-neutral-900/60 border border-neutral-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="badge-stylish mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Secure Payments · INR & International</span>
              </div>
              <h3 className="text-xl font-display font-bold text-white">
                Payment Modes & Milestones (Indian Rupee / INR)
              </h3>
            </div>
            <div className="text-xs font-mono text-neutral-400">
              Structured Milestones: 40% Kickoff · 40% Milestone · 20% Launch
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
              <div className="flex items-center gap-2.5 mb-2 text-cyan-400">
                <QrCode className="w-5 h-5" />
                <span className="text-sm font-semibold font-display text-white">Instant UPI & QR</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                Zero-fee instant transfer via Google Pay, PhonePe, Paytm, BHIM, or any UPI ID directly upon agreement.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
              <div className="flex items-center gap-2.5 mb-2 text-indigo-400">
                <Landmark className="w-5 h-5" />
                <span className="text-sm font-semibold font-display text-white">NEFT / IMPS / RTGS</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                Direct corporate bank transfer with official invoice, GST details, contract agreements, and milestone receipts.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
              <div className="flex items-center gap-2.5 mb-2 text-emerald-400">
                <CreditCard className="w-5 h-5" />
                <span className="text-sm font-semibold font-display text-white">Cards & International</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                Secure checkout for domestic debit/credit cards and overseas wire transfers (USD, EUR, GBP via Stripe / Razorpay).
              </p>
            </div>
          </div>
        </div>

        {/* Pricing Factors Explanatory Box */}
        <div className="p-8 sm:p-10 rounded-xl bg-neutral-900/30 border border-neutral-800">
          <div className="max-w-2xl mb-6">
            <h3 className="text-lg font-display font-bold text-white mb-2">
              What Factors Influence Your Final Quote?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
              Every business has unique operational needs. When finalizing your custom contract, our scope calculations account for:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs text-neutral-300 font-sans">
            {PRICING_FACTORS.map((factor, idx) => (
              <div key={idx} className="flex items-center gap-2 p-3 rounded-lg bg-neutral-900/60 border border-neutral-800/80">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-500"></span>
                <span>{factor}</span>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs font-mono text-cyan-400">
            FOUNDER PLEDGE: All tiers include direct sprint collaboration with Mr Deepak, 100% full source code ownership, zero agency lock-in, and guaranteed Lighthouse Core Web Vitals compliance.
          </p>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { ArrowRight, Check, Sparkles, Calculator, HelpCircle, ShieldCheck, CreditCard, Landmark, QrCode } from 'lucide-react';
import { PRICING_TIERS, PRICING_FACTORS } from '../data/pricing';
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

  const formatPrice = (tier: PricingTier) => {
    if (tier.startingPriceINR === 0 || tier.startingPriceUSD === 0) return 'Custom';
    if (billingCurrency === 'INR') {
      return `₹${tier.startingPriceINR.toLocaleString('en-IN')}`;
    }
    if (billingCurrency === 'USD') {
      return `$${tier.startingPriceUSD.toLocaleString('en-US')}`;
    }
    if (billingCurrency === 'EUR') {
      return `€${Math.round(tier.startingPriceUSD * 0.92).toLocaleString('en-US')}`;
    }
    if (billingCurrency === 'GBP') {
      return `£${Math.round(tier.startingPriceUSD * 0.78).toLocaleString('en-US')}`;
    }
    return `₹${tier.startingPriceINR.toLocaleString('en-IN')}`;
  };

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="badge-stylish mb-3">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
              <span>Investment & Tiers · Indian Rupees (INR) · Transparent Pricing</span>
            </div>
            <h1 className="heading-stylish text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              TRANSPARENT <span className="text-gradient-cyan">INVESTMENT</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-neutral-300 font-normal leading-relaxed">
              Straightforward pricing calibrated for high-impact commercial outcomes. All rates converted and displayed in <strong className="text-white">Indian Rupees (₹ INR)</strong>. Every tier includes bespoke engineering by <strong className="text-white">Mr Deepak</strong>, responsive design, and production deployment.
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

        {/* Interactive Estimator Callout Strip */}
        <div className="mb-14 p-5 rounded-xl bg-neutral-900/60 border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Calculator className="w-5 h-5 text-neutral-300" />
            <div>
              <div className="text-sm font-semibold text-white font-display">
                Want an exact line-item calculation in Indian Rupees?
              </div>
              <div className="text-xs text-neutral-400 font-sans">
                Use our interactive project estimator to configure pages, 3D effects, and database features in ₹ INR.
              </div>
            </div>
          </div>
          <button
            onClick={onOpenQuoteModal}
            className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-mono uppercase tracking-wider rounded-md border border-neutral-700 transition-colors whitespace-nowrap"
          >
            <span>Launch Estimator</span>
            <ArrowRight className="w-3.5 h-3.5 text-white" />
          </button>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`p-7 rounded-xl flex flex-col justify-between transition-all duration-300 ${
                tier.featured
                  ? 'bg-neutral-900/90 border-2 border-white/40 shadow-2xl relative'
                  : 'bg-neutral-900/40 border border-neutral-800/80 hover:border-neutral-700'
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-black bg-white px-3 py-1 rounded-full font-bold shadow-md">
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
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-display font-bold text-white tabular-nums tracking-tight">
                      {formatPrice(tier)}
                    </span>
                    {tier.startingPriceINR > 0 && (
                      <span className="text-xs font-mono text-neutral-400">
                        / starting
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-mono text-neutral-400 mt-1 block">
                    Turnaround: {tier.deliveryTime}
                  </span>
                </div>

                <p className="text-xs text-neutral-300 mb-6 leading-relaxed font-sans">
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
                        <Check className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
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
                      tier.startingPriceINR > 0
                        ? `${formatPrice(tier)}+`
                        : 'Custom'
                    )
                  }
                  className={`w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold uppercase tracking-wider rounded-md transition-colors ${
                    tier.featured
                      ? 'bg-white hover:bg-neutral-200 text-black'
                      : 'bg-neutral-800 hover:bg-neutral-700 text-white'
                  }`}
                >
                  <span>Get a Custom Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
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

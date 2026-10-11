import React, { useState } from 'react';

interface LegalPageProps {
  onBackToHome: () => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ onBackToHome }) => {
  const [activeDoc, setActiveDoc] = useState<'privacy' | 'terms'>('privacy');

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={onBackToHome}
          className="text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white mb-8 block transition-colors"
        >
          ← Return to Studio Home
        </button>

        <div className="flex items-center gap-4 mb-10 pb-4 border-b border-neutral-900">
          <button
            onClick={() => setActiveDoc('privacy')}
            className={`text-lg sm:text-xl font-display font-bold pb-2 transition-colors ${
              activeDoc === 'privacy'
                ? 'text-white border-b-2 border-white'
                : 'text-neutral-500 hover:text-neutral-300'
            }`}
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setActiveDoc('terms')}
            className={`text-lg sm:text-xl font-display font-bold pb-2 transition-colors ${
              activeDoc === 'terms'
                ? 'text-white border-b-2 border-white'
                : 'text-neutral-500 hover:text-neutral-300'
            }`}
          >
            Terms of Engagement
          </button>
        </div>

        {activeDoc === 'privacy' ? (
          <article className="space-y-6 text-sm text-neutral-300 leading-relaxed font-sans">
            <div>
              <h2 className="text-xl font-display font-bold text-white mb-2">1. Information We Collect</h2>
              <p>
                Mr Deepak Studio collects business contact details (name, email address, phone number, company name, and project specifications) submitted voluntarily through our inquiry and quotation forms. We do not sell, rent, or trade client information to any third parties.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-white mb-2">2. How Data Is Handled</h2>
              <p>
                Inquiries are encrypted and stored in secure database infrastructure (Supabase PostgreSQL with Row Level Security) exclusively for formulating proposals, executing development contracts, and direct client correspondence.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-white mb-2">3. Cookies & Analytics</h2>
              <p>
                We do not use invasive tracking pixels, ad network cookies, or third-party behavioral fingerprinting. Any analytics deployed are strictly anonymous performance measurements designed to evaluate page speed and accessibility compliance.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-white mb-2">4. Client Rights & Data Removal</h2>
              <p>
                You may request complete erasure of your submitted inquiries or project records at any time by contacting us directly at <code className="text-neutral-200">kushwahdeepak6111@gmail.com</code>.
              </p>
            </div>
          </article>
        ) : (
          <article className="space-y-6 text-sm text-neutral-300 leading-relaxed font-sans">
            <div>
              <h2 className="text-xl font-display font-bold text-white mb-2">1. Scope of Engagement</h2>
              <p>
                Every project contract undertaken by Mr Deepak Studio includes a mutual Scope of Work (SOW) specifying milestone deliverables, design reviews, delivery timelines, and hosting deployment environments.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-white mb-2">2. Code & Intellectual Property Ownership</h2>
              <p>
                Upon receipt of final project payment, the client receives 100% full intellectual property rights, source code repository access, design tokens, and media assets developed specifically for their project.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-white mb-2">3. Performance Guarantees</h2>
              <p>
                We guarantee our code meets agreed-upon performance standards (including 90+ Google Lighthouse desktop benchmarks and mobile responsive guidelines) on supported modern browsers.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold text-white mb-2">4. Support & Warranty</h2>
              <p>
                Standard packages include post-deployment bug fixing and refinement warranty periods (14 to 60 days depending on package tier) to ensure seamless operational continuity.
              </p>
            </div>
          </article>
        )}
      </div>
    </div>
  );
};

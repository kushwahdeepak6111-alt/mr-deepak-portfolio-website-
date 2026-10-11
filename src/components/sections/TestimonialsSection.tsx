import React from 'react';
import { Quote } from 'lucide-react';
import { TESTIMONIALS } from '../../data/testimonials';

interface TestimonialsSectionProps {
  embedded?: boolean;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ embedded = false }) => {
  return (
    <section className={`relative ${embedded ? 'py-10 sm:py-14 bg-transparent' : 'py-24 bg-[#070709] border-t border-neutral-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-16">
          <div className="badge-stylish mb-3">
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
            <span>Client Verification · Direct Collaborations</span>
          </div>
          <h2 className="heading-stylish text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            TRUSTED BY <span className="text-gradient-cyan">VISIONARIES</span>
          </h2>
          <p className="mt-3 text-neutral-300 text-sm sm:text-base">
            Attributable feedback from founders and executives who collaborated directly with <strong className="text-white">Mr Deepak</strong>.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((test) => (
            <div
              key={test.id}
              className="p-8 rounded-xl bg-neutral-900/40 border border-neutral-800/80 hover:border-neutral-700 transition-colors flex flex-col justify-between"
            >
              <div>
                <Quote className="w-6 h-6 text-neutral-600 mb-5" />
                <p className="text-sm sm:text-base text-neutral-200 leading-relaxed font-sans mb-6">
                  "{test.message}"
                </p>
              </div>

              <div className="pt-5 border-t border-neutral-800 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-white font-display">
                    {test.clientName}
                  </h4>
                  <p className="text-xs text-neutral-400 font-sans mt-0.5">
                    {test.role} · <span className="text-neutral-300 font-medium">{test.company}</span>
                  </p>
                </div>

                <div className="text-xs font-mono text-neutral-500">
                  Verified Client
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

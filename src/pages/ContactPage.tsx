import React from 'react';
import { ContactSection } from '../components/sections/ContactSection';

interface ContactPageProps {
  initialProjectType?: string;
  initialBudget?: string;
  initialDetails?: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  initialProjectType,
  initialBudget,
  initialDetails,
}) => {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-3xl">
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-3">
            Direct Founder Access
          </span>
          <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight leading-tight">
            CONTACT <span className="text-gradient-cyan">MR DEEPAK</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-300 font-normal leading-relaxed">
            Have a project or partnership in mind? Fill out our structured inquiry brief below or contact our executive team directly via phone or WhatsApp.
          </p>
        </div>
      </div>

      <ContactSection
        initialProjectType={initialProjectType}
        initialBudget={initialBudget}
        initialDetails={initialDetails}
        isFullPage={true}
      />
    </div>
  );
};

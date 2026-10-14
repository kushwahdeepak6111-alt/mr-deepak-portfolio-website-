import React from 'react';
import { Hero } from '../components/sections/Hero';
import { TrustSection } from '../components/sections/TrustSection';
import { DeveloperAboutSection } from '../components/sections/DeveloperAboutSection';
import { SelectedWork } from '../components/sections/SelectedWork';
import { ServicesPreview } from '../components/sections/ServicesPreview';
import { WhyChooseUs } from '../components/sections/WhyChooseUs';
import { ProcessTimeline } from '../components/sections/ProcessTimeline';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
import { ContactSection } from '../components/sections/ContactSection';
import { SectionIsland } from '../components/layout/SectionIsland';
import { SectionDivider } from '../components/layout/SectionDivider';
import { Project } from '../types';

interface HomePageProps {
  projects: Project[];
  onOpenCaseStudy: (project: Project) => void;
  onNavigate: (page: string) => void;
  onOpenQuoteModal: () => void;
  onOpenSeoEngine?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  projects,
  onOpenCaseStudy,
  onNavigate,
  onOpenQuoteModal: _onOpenQuoteModal,
  onOpenSeoEngine,
}) => {
  const scrollToContact = () => {
    const el = document.getElementById('contact-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else onNavigate('contact');
  };

  return (
    <div className="min-h-screen pb-16">
      {/* 1. Hero Experience (Immersive Viewport Stage) */}
      <Hero
        onStartProject={scrollToContact}
        onViewWork={() => onNavigate('work')}
      />

      <SectionDivider
        label="ARCHITECTURAL STANDARDS"
        subLabel="UNCOMPROMISING SPEED & ENGINEERING"
      />

      {/* SECTION 01: Trust / Architectural Standards Island */}
      <SectionIsland
        sectionNumber="01"
        sectionCategory="ARCHITECTURAL STANDARDS"
        accent="cyan"
      >
        <TrustSection embedded />
      </SectionIsland>

      <SectionDivider
        label="LEAD ARCHITECT"
        subLabel="DIRECT 1-ON-1 COLLABORATION WITH MR DEEPAK"
      />

      {/* SECTION 02: Developer About Island */}
      <SectionIsland
        id="about-deepak"
        sectionNumber="02"
        sectionCategory="FOUNDER & PRINCIPAL ENGINEER"
        accent="emerald"
      >
        <DeveloperAboutSection
          onStartProject={scrollToContact}
          embedded
        />
      </SectionIsland>

      <SectionDivider
        label="CURATED PORTFOLIO"
        subLabel="SELECTED COMMERCIAL PRODUCTIONS"
      />

      {/* SECTION 03: Selected Work Island */}
      <SectionIsland
        sectionNumber="03"
        sectionCategory="SIGNATURE WORK & CASE STUDIES"
        accent="purple"
      >
        <SelectedWork
          projects={projects}
          onOpenCaseStudy={onOpenCaseStudy}
          onViewAllWork={() => onNavigate('work')}
          embedded
        />
      </SectionIsland>

      <SectionDivider
        label="SPECIALIZED SERVICES"
        subLabel="FULL-STACK CAPABILITIES & EXPERTISE"
      />

      {/* SECTION 04: Services Island */}
      <SectionIsland
        sectionNumber="04"
        sectionCategory="ENGINEERING CAPABILITIES"
        accent="amber"
      >
        <ServicesPreview
          onDiscussProject={(_service) => {
            onNavigate('contact');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onViewAllServices={() => onNavigate('services')}
          onOpenSeoEngine={onOpenSeoEngine}
          embedded
        />
      </SectionIsland>

      <SectionDivider
        label="THE MR DEEPAK ADVANTAGE"
        subLabel="BESPOKE CODE VS GENERIC TEMPLATES"
      />

      {/* SECTION 05: Why Choose Us Island */}
      <SectionIsland
        sectionNumber="05"
        sectionCategory="THE STUDIO ADVANTAGE"
        accent="cyan"
      >
        <WhyChooseUs embedded />
      </SectionIsland>

      <SectionDivider
        label="PRODUCTION METHODOLOGY"
        subLabel="TRANSPARENT 4-PHASE DEVELOPMENT SPRINT"
      />

      {/* SECTION 06: Process Timeline Island */}
      <SectionIsland
        sectionNumber="06"
        sectionCategory="ENGINEERING PROCESS"
        accent="blue"
      >
        <ProcessTimeline
          onStartProject={() => {
            onNavigate('contact');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          embedded
        />
      </SectionIsland>

      <SectionDivider
        label="VERIFIABLE CLIENT REPUTATION"
        subLabel="DIRECT EXECUTIVE TESTIMONIALS"
      />

      {/* SECTION 07: Testimonials Island */}
      <SectionIsland
        sectionNumber="07"
        sectionCategory="CLIENT ENDORSEMENTS"
        accent="emerald"
      >
        <TestimonialsSection embedded />
      </SectionIsland>

      <SectionDivider
        label="START YOUR PROJECT"
        subLabel="DIRECT INTAKE & RAPID ESTIMATION"
      />

      {/* SECTION 08: Contact & Direct Consultation Island */}
      <SectionIsland
        id="contact-form"
        sectionNumber="08"
        sectionCategory="PROJECT CONSULTATION & LEAD INTAKE"
        accent="rose"
      >
        <ContactSection embedded />
      </SectionIsland>
    </div>
  );
};

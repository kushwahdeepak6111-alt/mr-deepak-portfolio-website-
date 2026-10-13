import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { WorkPage } from './pages/WorkPage';
import { ServicesPage } from './pages/ServicesPage';
import { AboutPage } from './pages/AboutPage';
import { ProcessPage } from './pages/ProcessPage';
import { PricingPage } from './pages/PricingPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { LegalPage } from './pages/LegalPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProjectModal } from './components/ui/ProjectModal';
import { QuoteCalculatorModal } from './components/ui/QuoteCalculatorModal';
import { NetworkStatusBanner } from './components/ui/NetworkStatusBanner';
import { NotificationPermissionBanner } from './components/ui/NotificationPermissionBanner';
import { BackgroundLayer } from './components/layout/BackgroundLayer';
import { PullToRefresh } from './components/ui/PullToRefresh';
import { WebsiteRefreshControl } from './components/ui/WebsiteRefreshControl';
import { PROJECTS } from './data/projects';
import { Project, BackgroundTheme } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [activeCaseStudy, setActiveCaseStudy] = useState<Project | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState<boolean>(false);

  // Background Theme State with LocalStorage Persistence
  const [bgTheme, setBgTheme] = useState<BackgroundTheme>(() => {
    try {
      const saved = localStorage.getItem('mrdeepak_bg_theme');
      if (
        saved &&
        ['dark-theme', 'solar-system', 'lunar-full-moon', 'cosmic-aurora', 'cyber-matrix', 'obsidian-gold', 'royal-sapphire', 'matte-stealth'].includes(saved)
      ) {
        return saved as BackgroundTheme;
      }
    } catch (e) {
      console.warn('Failed to parse bg theme:', e);
    }
    return 'solar-system';
  });

  const [showBgGrid, setShowBgGrid] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('mrdeepak_bg_grid');
      if (saved !== null) return saved === 'true';
    } catch (e) {
      console.warn('Failed to parse bg grid:', e);
    }
    return true;
  });

  const handleSelectBgTheme = (newTheme: BackgroundTheme) => {
    setBgTheme(newTheme);
    try {
      localStorage.setItem('mrdeepak_bg_theme', newTheme);
    } catch (e) {
      console.warn('Failed to save bg theme:', e);
    }
  };

  const handleToggleBgGrid = () => {
    setShowBgGrid((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('mrdeepak_bg_grid', String(next));
      } catch (e) {
        console.warn('Failed to save bg grid:', e);
      }
      return next;
    });
  };

  // Dynamic projects list loaded from localStorage or default PROJECTS
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem('mrdeepak_custom_projects');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((p: any) => ({
            ...p,
            technologies: Array.isArray(p?.technologies) ? p.technologies : [],
            servicesProvided: Array.isArray(p?.servicesProvided) ? p.servicesProvided : [],
            metrics: Array.isArray(p?.metrics) ? p.metrics : [],
          }));
        }
      }
    } catch (e) {
      console.warn('Failed to parse stored projects:', e);
    }
    return PROJECTS;
  });

  const handleUpdateProjects = (updatedProjects: Project[]) => {
    setProjects(updatedProjects);
    try {
      localStorage.setItem('mrdeepak_custom_projects', JSON.stringify(updatedProjects));
    } catch (e) {
      console.warn('Failed to save projects:', e);
    }
  };

  // Pre-filled state passed into contact page
  const [contactPreset, setContactPreset] = useState<{
    projectType: string;
    budget: string;
    details: string;
  }>({
    projectType: 'Business Websites',
    budget: '₹4,999 - ₹9,999',
    details: '',
  });

  // Sync with browser history and hash navigation
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      const validPages = ['home', 'work', 'services', 'about', 'process', 'pricing', 'contact', 'admin', 'legal'];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      }
    };

    const initialHash = window.location.hash.replace('#', '');
    if (initialHash && ['home', 'work', 'services', 'about', 'process', 'pricing', 'contact', 'admin', 'legal'].includes(initialHash)) {
      setCurrentPage(initialHash);
    }

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Instant High-Speed Page Transition & Top Loading Indicator
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Dedicated Website Refresh function with tactile feedback & quick reload
  const handleWebsiteRefresh = () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    setIsPageLoading(true);

    try {
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate([25, 35]);
      }
    } catch {
      // Ignore vibration error if not permitted
    }

    // Smooth visual feedback and top loading progress before browser reload
    setTimeout(() => {
      window.location.reload();
    }, 380);
  };

  // Keyboard shortcut for Website Refresh: Press 'R' when not typing
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = (document.activeElement?.tagName || '').toUpperCase();
      const isInput = ['INPUT', 'TEXTAREA', 'SELECT'].includes(activeTag) ||
        (document.activeElement as HTMLElement)?.isContentEditable;

      if (!isInput && (e.key === 'r' || e.key === 'R') && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        handleWebsiteRefresh();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRefreshing]);

  const navigateTo = (pageId: string) => {
    setIsPageLoading(true);
    setCurrentPage(pageId);
    window.location.hash = pageId;
    window.scrollTo(0, 0);
    // Instantaneous 80ms completion to show instant sub-second page loading
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 90);
    return () => clearTimeout(timer);
  };

  const handleStartProjectWithTitle = (projectTitle: string) => {
    setContactPreset({
      projectType: 'Custom Website Design',
      budget: '₹4,999 - ₹9,999',
      details: `Referencing inspiration from case study: ${projectTitle}`,
    });
    navigateTo('contact');
  };

  const handleApplyScope = (scopeData: { projectType: string; budget: string; details: string }) => {
    setContactPreset(scopeData);
    navigateTo('contact');
  };

  const handleSelectPricingTier = (tierName: string, priceBand: string) => {
    setContactPreset({
      projectType: tierName.includes('Basic') ? 'Basic Website' : tierName.includes('Ecommerce') ? 'Ecommerce Websites' : 'Business Websites',
      budget: priceBand,
      details: `Selected Tier: ${tierName}`,
    });
    navigateTo('contact');
  };

  return (
    <div className="min-h-screen relative text-neutral-200 flex flex-col font-sans selection:bg-neutral-800 selection:text-white">
      {/* High-Speed Top Route Loading Bar (Sub-second visual response) */}
      <div
        className={`fixed top-0 left-0 right-0 h-[2.5px] z-[9999] pointer-events-none transition-all duration-100 ease-out ${
          isPageLoading
            ? 'opacity-100 w-full bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 shadow-[0_0_12px_rgba(56,189,248,0.9)]'
            : 'opacity-0 w-0'
        }`}
      />

      {/* Pull To Refresh Mobile Gesture */}
      <PullToRefresh onRefresh={handleWebsiteRefresh} isRefreshing={isRefreshing} />

      {/* Dynamic Ambient Studio Background Layer */}
      <BackgroundLayer theme={bgTheme} showGrid={showBgGrid} />

      {/* Top Bar Contract Navigation with Integrated Themes Menu Settings */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
        bgTheme={bgTheme}
        onToggleDarkTheme={() => {
          handleSelectBgTheme(bgTheme === 'dark-theme' ? 'solar-system' : 'dark-theme');
        }}
        onSelectBgTheme={handleSelectBgTheme}
        showBgGrid={showBgGrid}
        onToggleBgGrid={handleToggleBgGrid}
        onRefresh={handleWebsiteRefresh}
        isRefreshing={isRefreshing}
      />

      {/* Real-time Phone & Browser Notification Opt-In Banner */}
      <NotificationPermissionBanner />

      {/* Main Page View with Instant Responsive Animation */}
      <main className="flex-1 relative z-10">
        <div key={currentPage} className="animate-fast-in">
          {currentPage === 'home' && (
            <HomePage
              projects={projects}
              onOpenCaseStudy={(p) => setActiveCaseStudy(p)}
              onNavigate={navigateTo}
              onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
            />
          )}

          {currentPage === 'work' && (
            <WorkPage
              projects={projects}
              onOpenCaseStudy={(p) => setActiveCaseStudy(p)}
              onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
            />
          )}

          {currentPage === 'services' && (
            <ServicesPage
              onDiscussProject={(svc) => {
                setContactPreset({
                  projectType: svc,
                  budget: '₹4,999 - ₹9,999',
                  details: `Inquiring about specialized service: ${svc}`,
                });
                navigateTo('contact');
              }}
              onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
            />
          )}

          {currentPage === 'about' && (
            <AboutPage onStartProject={() => navigateTo('contact')} />
          )}

          {currentPage === 'process' && (
            <ProcessPage onStartProject={() => navigateTo('contact')} />
          )}

          {currentPage === 'pricing' && (
            <PricingPage
              onSelectTier={handleSelectPricingTier}
              onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
            />
          )}

          {currentPage === 'contact' && (
            <ContactPage
              initialProjectType={contactPreset.projectType}
              initialBudget={contactPreset.budget}
              initialDetails={contactPreset.details}
            />
          )}

          {currentPage === 'admin' && (
            <AdminPage
              projects={projects}
              onOpenCaseStudy={(p) => setActiveCaseStudy(p)}
              onUpdateProjects={handleUpdateProjects}
              bgTheme={bgTheme}
              showBgGrid={showBgGrid}
              onSelectBgTheme={handleSelectBgTheme}
              onToggleBgGrid={handleToggleBgGrid}
            />
          )}

          {currentPage === 'legal' && (
            <LegalPage onBackToHome={() => navigateTo('home')} />
          )}

          {![
            'home',
            'work',
            'services',
            'about',
            'process',
            'pricing',
            'contact',
            'admin',
            'legal',
          ].includes(currentPage) && (
            <NotFoundPage onBackToHome={() => navigateTo('home')} />
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer
        onNavigate={navigateTo}
        onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
        onRefresh={handleWebsiteRefresh}
        isRefreshing={isRefreshing}
      />

      {/* Case Study Detail Modal */}
      <ProjectModal
        project={activeCaseStudy}
        onClose={() => setActiveCaseStudy(null)}
        onStartProject={handleStartProjectWithTitle}
      />

      {/* Instant Project & Cost Estimator Modal */}
      <QuoteCalculatorModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        onApplyScopeToContact={handleApplyScope}
      />

      {/* Persistent Website Refresh & Quick Action Floating Button */}
      <WebsiteRefreshControl
        onRefresh={handleWebsiteRefresh}
        isRefreshing={isRefreshing}
      />

      {/* Network Change & Offline Resilience Monitor */}
      <NetworkStatusBanner />
    </div>
  );
}

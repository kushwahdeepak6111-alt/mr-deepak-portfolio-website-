import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  X,
  ArrowRight,
  TrendingUp,
  Palette,
  Sparkles,
  ShieldCheck,
  Zap,
  Globe,
  Tag,
  Building2,
  CalendarCheck,
  CreditCard,
  Layers,
  Wrench,
  Smartphone,
  Cpu,
} from 'lucide-react';
import { SERVICES } from '../../data/services';
import { PRICING_TIERS, MAINTENANCE_PLAN } from '../../data/pricing';
import { PROJECTS } from '../../data/projects';

interface SiteSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
  onOpenCaseStudy: (project: any) => void;
  onOpenSeoEngine: () => void;
  onOpenQuoteModal: () => void;
}

interface SearchResultItem {
  id: string;
  category: 'Service' | 'Pricing' | 'Case Study' | 'Tool' | 'Page';
  title: string;
  subtitle: string;
  badge?: string;
  icon: React.ElementType;
  action: () => void;
}

export const SiteSearchModal: React.FC<SiteSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenCaseStudy,
  onOpenSeoEngine,
  onOpenQuoteModal,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setSearchTerm('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Compile full searchable database
  const allSearchableItems: SearchResultItem[] = [
    // Special SEO Search Engine Tool Action
    {
      id: 'tool-seo-engine',
      category: 'Tool',
      title: 'SEO Search Engine & SERP Analyzer Tool',
      subtitle: 'Simulate Google search rankings, meta pixel gauges, and keyword discovery',
      badge: 'Interactive',
      icon: TrendingUp,
      action: () => {
        onClose();
        onOpenSeoEngine();
      },
    },
    // Instant Quote Calculator Tool
    {
      id: 'tool-quote-calculator',
      category: 'Tool',
      title: 'Instant Scope & Cost Calculator',
      subtitle: 'Calculate customized pricing and timeline estimates for custom websites',
      badge: 'Interactive',
      icon: Sparkles,
      action: () => {
        onClose();
        onOpenQuoteModal();
      },
    },
    // Maintenance Plan Item
    {
      id: 'pricing-maintenance',
      category: 'Pricing',
      title: 'Website Maintenance & Care Plan (₹1,000 / month)',
      subtitle: 'Continuous security audits, monthly content revisions, and uptime monitoring',
      badge: '₹1,000/mo',
      icon: Wrench,
      action: () => {
        onClose();
        onNavigate('pricing');
      },
    },
    // Main Pages
    {
      id: 'page-home',
      category: 'Page',
      title: 'Home – Mr Deepak Studio',
      subtitle: 'Bespoke website design & full-stack web engineering flagship',
      icon: Globe,
      action: () => {
        onClose();
        onNavigate('home');
      },
    },
    {
      id: 'page-work',
      category: 'Page',
      title: 'Curated Work & Portfolio',
      subtitle: 'Production web projects, e-commerce architectures, and SaaS applications',
      icon: Layers,
      action: () => {
        onClose();
        onNavigate('work');
      },
    },
    {
      id: 'page-services',
      category: 'Page',
      title: 'All Services & Core Competencies',
      subtitle: '12 specialized engineering disciplines from custom design to SEO',
      icon: Cpu,
      action: () => {
        onClose();
        onNavigate('services');
      },
    },
    {
      id: 'page-pricing',
      category: 'Page',
      title: 'Pricing & Packages',
      subtitle: 'Transparent investment tiers starting at ₹4,999 to ₹24,999+',
      icon: CreditCard,
      action: () => {
        onClose();
        onNavigate('pricing');
      },
    },
    {
      id: 'page-contact',
      category: 'Page',
      title: 'Direct Client Intake & Contact',
      subtitle: 'Discuss timelines, technical scopes, and receive rapid proposal quotes',
      icon: ArrowRight,
      action: () => {
        onClose();
        onNavigate('contact');
      },
    },
    // 12 Services
    ...SERVICES.map((s) => ({
      id: `svc-${s.id}`,
      category: 'Service' as const,
      title: s.title,
      subtitle: `${s.tagline} · SLA: ${s.duration}`,
      badge: s.id === 'seo-optimization' ? 'SEO' : undefined,
      icon: s.id === 'seo-optimization' ? TrendingUp : Palette,
      action: () => {
        onClose();
        onNavigate('services');
      },
    })),
    // Pricing Tiers
    ...PRICING_TIERS.map((t) => ({
      id: `tier-${t.id}`,
      category: 'Pricing' as const,
      title: `${t.name} Package`,
      subtitle: `${t.tagline} · Starting ₹${t.startingPriceINR.toLocaleString('en-IN')}`,
      badge: `₹${t.startingPriceINR.toLocaleString('en-IN')}`,
      icon: CreditCard,
      action: () => {
        onClose();
        onNavigate('pricing');
      },
    })),
    // Projects
    ...PROJECTS.map((p) => ({
      id: `proj-${p.id}`,
      category: 'Case Study' as const,
      title: p.title,
      subtitle: `${p.shortDescription} · ${p.category}`,
      badge: p.year,
      icon: Smartphone,
      action: () => {
        onClose();
        onOpenCaseStudy(p);
      },
    })),
  ];

  // Filtering based on search query
  const query = searchTerm.trim().toLowerCase();
  const filteredResults = query
    ? allSearchableItems.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.subtitle.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          (item.badge && item.badge.toLowerCase().includes(query))
      )
    : allSearchableItems.slice(0, 7); // Default suggestions

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredResults.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredResults.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredResults[selectedIndex]) {
        filteredResults[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-start justify-center p-3 sm:p-6 pt-16 sm:pt-24 overflow-y-auto animate-in fade-in duration-100"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Engine Input Bar */}
        <div className="p-3 sm:p-4 border-b border-neutral-800 bg-neutral-900/60 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shrink-0">
            <Search className="w-4 h-4" />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search engine: Type services, SEO, pricing, maintenance ₹1000, projects..."
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-neutral-500 focus:outline-none font-sans"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-1 text-neutral-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <div className="hidden sm:flex items-center gap-1 text-[10px] font-mono text-neutral-400 px-2 py-0.5 rounded border border-neutral-800 bg-neutral-900">
            <span>ESC</span>
          </div>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-4 py-2 bg-neutral-950/70 border-b border-neutral-900 flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono text-neutral-400">
          <span className="shrink-0 text-neutral-500">Quick Searches:</span>
          {['SEO', 'Maintenance', 'Pricing', 'Ecommerce', 'Booking', 'React'].map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setSearchTerm(tag)}
              className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors shrink-0"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
          {filteredResults.length === 0 ? (
            <div className="py-12 text-center text-neutral-400 font-sans space-y-2">
              <Search className="w-8 h-8 text-neutral-600 mx-auto" />
              <p className="text-sm font-medium text-neutral-300">
                No matching results found for &quot;{searchTerm}&quot;
              </p>
              <p className="text-xs text-neutral-500">
                Try searching for &quot;SEO&quot;, &quot;Maintenance&quot;, &quot;Pricing&quot;, or &quot;Services&quot;
              </p>
            </div>
          ) : (
            filteredResults.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-950/40 border border-cyan-500/50 shadow-[0_0_12px_rgba(56,189,248,0.15)]'
                      : 'hover:bg-neutral-900/60 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`p-2 rounded-lg shrink-0 ${
                        isSelected
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                          : 'bg-neutral-900 text-neutral-400 border border-neutral-800'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs sm:text-sm font-medium truncate ${
                            isSelected ? 'text-white font-semibold' : 'text-neutral-200'
                          }`}
                        >
                          {item.title}
                        </span>
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-neutral-800 text-neutral-400 shrink-0">
                          {item.category}
                        </span>
                        {item.badge && (
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-950 border border-cyan-800 text-cyan-300 shrink-0">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-neutral-400 truncate mt-0.5">
                        {item.subtitle}
                      </div>
                    </div>
                  </div>

                  <ArrowRight
                    className={`w-4 h-4 shrink-0 ml-2 transition-transform ${
                      isSelected ? 'text-cyan-400 translate-x-1' : 'text-neutral-600'
                    }`}
                  />
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-3 bg-neutral-900/70 border-t border-neutral-800 flex items-center justify-between text-[11px] font-mono text-neutral-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-[10px]">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-[10px]">↓</kbd>
              <span>to navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-[10px]">↵</kbd>
              <span>to select</span>
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenSeoEngine();
            }}
            className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer font-semibold"
          >
            <TrendingUp className="w-3 h-3" />
            <span>Launch SEO Simulator</span>
          </button>
        </div>
      </div>
    </div>
  );
};

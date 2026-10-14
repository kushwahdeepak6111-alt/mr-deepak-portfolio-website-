import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowUpRight, ShieldCheck, Moon, Sun, Phone, MessageSquare, Palette, ChevronDown, Check, Sparkles, Grid, RotateCw, Search, TrendingUp } from 'lucide-react';
import { BackgroundTheme } from '../../types';
import { THEME_OPTIONS } from '../ui/BackgroundSwitcher';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenQuoteModal: () => void;
  onOpenSearch?: () => void;
  onOpenSeoEngine?: () => void;
  bgTheme?: BackgroundTheme;
  onToggleDarkTheme?: () => void;
  onSelectBgTheme?: (theme: BackgroundTheme) => void;
  showBgGrid?: boolean;
  onToggleBgGrid?: () => void;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'work', label: 'Work' },
  { id: 'services', label: 'Services' },
  { id: 'about', label: 'About' },
  { id: 'process', label: 'Process' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenQuoteModal,
  onOpenSearch,
  onOpenSeoEngine,
  bgTheme,
  onToggleDarkTheme,
  onSelectBgTheme,
  showBgGrid,
  onToggleBgGrid,
  onRefresh,
  isRefreshing,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [mobileThemeExpanded, setMobileThemeExpanded] = useState(true);
  const themeDropdownRef = useRef<HTMLDivElement>(null);

  const activeThemeOption = THEME_OPTIONS.find((t) => t.id === bgTheme) || THEME_OPTIONS[0];

  // Close desktop theme dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        themeDropdownRef.current &&
        !themeDropdownRef.current.contains(event.target as Node)
      ) {
        setIsThemeMenuOpen(false);
      }
    };
    if (isThemeMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isThemeMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = (pageId: string) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-150 ${
          isScrolled
            ? 'glass-nav py-3.5 shadow-2xl shadow-black/60'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Zone 1: Pure typographic wordmark (icon removed from top left) */}
            <button
              onClick={() => handleNavClick('home')}
              className="text-left group flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-sm cursor-pointer active:scale-95 transition-transform duration-100"
              aria-label="Mr Deepak Home"
            >
              <div className="flex flex-col">
                <span className="font-display text-lg sm:text-xl font-extrabold tracking-tight text-white group-hover:text-cyan-200 transition-colors duration-100 leading-none flex items-center gap-1.5">
                  MR <span className="text-gradient-cyan">DEEPAK</span>
                </span>
                <span className="text-[10px] font-mono tracking-wider text-neutral-400 group-hover:text-cyan-300 transition-colors duration-100 pt-0.5">
                  Full-Stack & Web Architect
                </span>
              </div>
            </button>

            {/* Zone 2: Clean text navigation links */}
            <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
              {NAV_ITEMS.map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`relative py-1 transition-colors duration-100 active:scale-95 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-sm cursor-pointer ${
                      isActive
                        ? 'text-white font-semibold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 via-indigo-400 to-cyan-400 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: Primary Action & Controls */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Themes Menu Setting Dropdown */}
              <div className="relative" ref={themeDropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                  className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-md border text-xs font-mono transition-all duration-100 active:scale-95 cursor-pointer ${
                    isThemeMenuOpen
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(56,189,248,0.3)]'
                      : 'bg-neutral-900/90 border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 hover:bg-neutral-800'
                  }`}
                  title="Website Themes & Visual Settings"
                  aria-label="Theme Settings Menu"
                  aria-expanded={isThemeMenuOpen}
                >
                  <Palette className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="hidden sm:inline font-semibold">Themes</span>
                  <span className="hidden xl:inline text-[10px] text-cyan-300/80 px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-800/60 ml-0.5">
                    {activeThemeOption.name.split(' ')[0]}
                  </span>
                  <ChevronDown
                    className={`w-3 h-3 text-neutral-400 transition-transform duration-150 ${
                      isThemeMenuOpen ? 'rotate-180 text-cyan-300' : ''
                    }`}
                  />
                </button>

                {/* Desktop Theme Settings Dropdown Menu */}
                {isThemeMenuOpen && (
                  <div className="absolute right-0 mt-2 w-72 sm:w-80 rounded-xl bg-neutral-950/98 border border-white/15 p-3 shadow-[0_20px_50px_rgba(0,0,0,0.95)] backdrop-blur-2xl z-50 animate-in fade-in zoom-in-95 duration-100">
                    <div className="flex items-center justify-between pb-2.5 border-b border-white/10 mb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-1 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                          <Sparkles className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white tracking-wide">Themes Menu Setting</div>
                          <div className="text-[10px] font-mono text-neutral-400">8 visual background presets</div>
                        </div>
                      </div>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-800 text-cyan-300">
                        {activeThemeOption.badge}
                      </span>
                    </div>

                    <div className="space-y-1.5 max-h-[340px] overflow-y-auto pr-1">
                      {THEME_OPTIONS.map((theme) => {
                        const isSelected = theme.id === bgTheme;
                        return (
                          <button
                            key={theme.id}
                            type="button"
                            onClick={() => {
                              if (onSelectBgTheme) {
                                onSelectBgTheme(theme.id);
                              }
                              setIsThemeMenuOpen(false);
                            }}
                            className={`w-full flex items-center justify-between p-2 rounded-lg border text-left transition-all duration-100 active:scale-[0.98] cursor-pointer ${
                              isSelected
                                ? 'bg-cyan-950/50 border-cyan-400/70 shadow-[0_0_12px_rgba(56,189,248,0.2)]'
                                : 'bg-neutral-900/40 hover:bg-neutral-900 border-white/5 hover:border-white/20'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="w-5 h-5 rounded-md overflow-hidden border border-white/20 shrink-0 shadow-inner">
                                <div
                                  className="w-full h-full"
                                  style={{
                                    background: `linear-gradient(135deg, ${theme.previewColors.join(', ')})`,
                                  }}
                                />
                              </div>
                              <div className="truncate">
                                <div className="flex items-center gap-1.5">
                                  <span className={`text-xs font-medium truncate ${isSelected ? 'text-cyan-200 font-semibold' : 'text-neutral-200'}`}>
                                    {theme.name}
                                  </span>
                                  <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-white/5 text-neutral-400 shrink-0">
                                    {theme.badge}
                                  </span>
                                </div>
                                <div className="text-[10px] text-neutral-400 truncate mt-0.5">
                                  {theme.subtitle}
                                </div>
                              </div>
                            </div>
                            {isSelected && (
                              <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 ml-1.5" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Ambient Studio Grid Toggle */}
                    {onToggleBgGrid && (
                      <div className="pt-2.5 mt-2.5 border-t border-white/10 flex items-center justify-between px-1">
                        <span className="text-[11px] font-mono text-neutral-400 flex items-center gap-1.5">
                          <Grid className="w-3 h-3 text-cyan-400" />
                          Ambient Grid
                        </span>
                        <button
                          type="button"
                          onClick={onToggleBgGrid}
                          className={`text-[10px] font-mono px-2 py-0.5 rounded border transition-colors cursor-pointer active:scale-95 ${
                            showBgGrid
                              ? 'bg-cyan-950/80 border-cyan-800 text-cyan-300'
                              : 'bg-neutral-900 border-neutral-700 text-neutral-400'
                          }`}
                        >
                          {showBgGrid ? 'ON' : 'OFF'}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Dedicated Dark Theme Quick Toggle */}
              {onToggleDarkTheme && (
                <button
                  type="button"
                  onClick={onToggleDarkTheme}
                  className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-md border text-xs font-mono transition-all duration-100 active:scale-95 cursor-pointer ${
                    bgTheme === 'dark-theme'
                      ? 'bg-purple-950/80 border-purple-400 text-purple-200 shadow-[0_0_12px_rgba(168,85,247,0.35)]'
                      : 'bg-neutral-900/90 border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 hover:bg-neutral-800'
                  }`}
                  title={bgTheme === 'dark-theme' ? 'Switch to Solar System' : 'Switch to Dark Theme'}
                  aria-label="Toggle Dark Theme"
                >
                  {bgTheme === 'dark-theme' ? (
                    <>
                      <Sun className="w-3.5 h-3.5 text-amber-300" />
                      <span className="hidden sm:inline font-semibold">OLED Dark</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-3.5 h-3.5 text-purple-300" />
                      <span className="hidden sm:inline font-semibold">Dark Theme</span>
                    </>
                  )}
                </button>
              )}

              {/* Global Search Engine Quick Action (Cmd+K) */}
              {onOpenSearch && (
                <button
                  type="button"
                  onClick={onOpenSearch}
                  className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-md border text-xs font-mono transition-all duration-100 active:scale-95 cursor-pointer bg-neutral-900/90 border-neutral-800 text-neutral-300 hover:text-white hover:border-cyan-500/50 hover:bg-neutral-800 shadow-sm"
                  title="Search Website, Services & Pricing (Press ⌘K or /)"
                  aria-label="Open Website Search Engine"
                >
                  <Search className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="hidden sm:inline font-semibold">Search</span>
                  <kbd className="hidden lg:inline text-[9px] font-mono text-neutral-400 px-1 py-0.2 rounded bg-neutral-800 border border-neutral-700 ml-0.5">⌘K</kbd>
                </button>
              )}

              {/* Dedicated SEO Search Engine Tool Action */}
              {onOpenSeoEngine && (
                <button
                  type="button"
                  onClick={onOpenSeoEngine}
                  className="hidden md:inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-md border text-xs font-mono transition-all duration-100 active:scale-95 cursor-pointer bg-cyan-950/40 border-cyan-800/80 text-cyan-200 hover:bg-cyan-900/60 hover:border-cyan-400 hover:text-white shadow-sm"
                  title="Launch Google SERP Simulator & SEO Audit Engine"
                  aria-label="Launch SEO Search Engine"
                >
                  <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="font-semibold">SEO Engine</span>
                </button>
              )}

              {/* Direct Call Quick Action */}
              <a
                href="tel:+919343795715"
                className="hidden xl:inline-flex items-center gap-1.5 px-3 py-2 rounded-md border border-indigo-500/30 bg-indigo-950/40 hover:bg-indigo-900/60 text-indigo-200 hover:text-white text-xs font-mono transition-all duration-100 active:scale-95 cursor-pointer"
                title="Call Mr Deepak directly at +91 9343795715"
              >
                <Phone className="w-3.5 h-3.5 text-indigo-400" />
                <span className="font-semibold">+91 9343795715</span>
              </a>

              <button
                onClick={onOpenQuoteModal}
                className="hidden sm:inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 hover:shadow-lg hover:shadow-cyan-500/20 active:scale-95 transition-all duration-100 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white whitespace-nowrap cursor-pointer shadow-md"
              >
                <span>Get Quote</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-black" />
              </button>

              {/* Menu Button on Right Side Corner Up */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-2 rounded-md border text-xs font-mono transition-all duration-100 active:scale-95 cursor-pointer shadow-md backdrop-blur-md focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                  mobileMenuOpen
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(56,189,248,0.35)]'
                    : 'bg-neutral-900/95 border-neutral-700 hover:border-cyan-400 text-neutral-200 hover:text-white hover:bg-neutral-800'
                }`}
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
                title="Website Menu & Navigation"
              >
                {mobileMenuOpen ? (
                  <X className="w-4 h-4 text-cyan-400" />
                ) : (
                  <Menu className="w-4 h-4 text-cyan-400" />
                )}
                <span className="font-semibold uppercase tracking-wider text-[11px]">Menu</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Responsive Slide-Over Menu Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end animate-in fade-in duration-200"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="w-full max-w-md h-full bg-neutral-950/98 border-l border-neutral-800/90 shadow-2xl p-6 sm:p-7 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-5">
              {/* Drawer Top Header with Close Button */}
              <div className="flex items-center justify-between pb-3.5 border-b border-neutral-800/80">
                <div className="flex items-center gap-2.5">
                  <div>
                    <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                      MR DEEPAK
                    </div>
                    <div className="text-[10px] font-mono text-neutral-400">
                      Studio Navigation &amp; Portal
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 bg-neutral-900 transition-colors cursor-pointer"
                  aria-label="Close Menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="text-xs uppercase tracking-widest text-neutral-500 font-mono">
                Menu Navigation
              </div>
            <nav className="flex flex-col gap-2.5">
              {NAV_ITEMS.map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`text-left text-xl font-display font-medium transition-colors py-1 ${
                      isActive
                        ? 'text-white font-bold pl-2 border-l-2 border-cyan-400'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}

              {/* Mobile Website Search Engine */}
              {onOpenSearch && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSearch();
                  }}
                  className="text-left text-xl font-display font-medium transition-colors py-1.5 flex items-center gap-2.5 text-neutral-300 hover:text-white"
                >
                  <Search className="w-5 h-5 text-cyan-400" />
                  <span>Search Engine</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-900 border border-neutral-700 text-neutral-300 ml-auto">
                    ⌘K
                  </span>
                </button>
              )}

              {/* Mobile SEO Search Engine Tool */}
              {onOpenSeoEngine && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSeoEngine();
                  }}
                  className="text-left text-xl font-display font-medium transition-colors py-1.5 flex items-center gap-2.5 text-cyan-300 hover:text-white"
                >
                  <TrendingUp className="w-5 h-5 text-cyan-400" />
                  <span>SEO Search Engine</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-800 text-cyan-300 ml-auto">
                    Tool
                  </span>
                </button>
              )}

              {/* Mobile Admin Link */}
              <button
                onClick={() => handleNavClick('admin')}
                className={`text-left text-xl font-display font-medium transition-colors py-1.5 flex items-center gap-2.5 ${
                  currentPage === 'admin'
                    ? 'text-cyan-300 font-bold pl-2 border-l-2 border-cyan-400'
                    : 'text-neutral-300 hover:text-white'
                }`}
              >
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                <span>Admin Panel</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-800 text-cyan-300 ml-auto">
                  Portal
                </span>
              </button>
            </nav>

            {/* Mobile Themes Setting Section */}
            <div className="pt-3 border-t border-neutral-800">
              <button
                type="button"
                onClick={() => setMobileThemeExpanded(!mobileThemeExpanded)}
                className="w-full flex items-center justify-between py-2 px-1 text-xs font-mono text-neutral-300 hover:text-white transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-cyan-400" />
                  <span className="font-semibold text-white uppercase tracking-wider text-[11px]">
                    Themes & Style Settings
                  </span>
                  <span className="text-[10px] text-cyan-300 font-mono px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-800">
                    {activeThemeOption.name}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-neutral-400 transition-transform duration-150 ${
                    mobileThemeExpanded ? 'rotate-180 text-cyan-400' : ''
                  }`}
                />
              </button>

              {mobileThemeExpanded && (
                <div className="mt-2 grid grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                  {THEME_OPTIONS.map((theme) => {
                    const isSelected = theme.id === bgTheme;
                    return (
                      <button
                        key={theme.id}
                        type="button"
                        onClick={() => {
                          if (onSelectBgTheme) {
                            onSelectBgTheme(theme.id);
                          }
                        }}
                        className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all duration-100 active:scale-95 cursor-pointer ${
                          isSelected
                            ? 'bg-cyan-950/70 border-cyan-400 shadow-[0_0_12px_rgba(56,189,248,0.25)] text-cyan-200'
                            : 'bg-neutral-900/70 border-white/10 text-neutral-300 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="w-4 h-4 rounded-md overflow-hidden border border-white/20 shadow-inner">
                            <div
                              className="w-full h-full"
                              style={{
                                background: `linear-gradient(135deg, ${theme.previewColors.join(', ')})`,
                              }}
                            />
                          </div>
                          {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                        </div>
                        <span className="text-xs font-semibold truncate leading-tight">
                          {theme.name}
                        </span>
                        <span className="text-[9px] font-mono text-neutral-400 mt-0.5 truncate">
                          {theme.badge}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Mobile Ambient Grid Toggle */}
              {mobileThemeExpanded && onToggleBgGrid && (
                <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-neutral-300 flex items-center gap-1.5">
                    <Grid className="w-3.5 h-3.5 text-cyan-400" />
                    Ambient Grid Pattern
                  </span>
                  <button
                    type="button"
                    onClick={onToggleBgGrid}
                    className={`text-[10px] font-mono px-2.5 py-1 rounded border transition-colors cursor-pointer active:scale-95 ${
                      showBgGrid
                        ? 'bg-cyan-950/80 border-cyan-800 text-cyan-300'
                        : 'bg-neutral-900 border-neutral-700 text-neutral-400'
                    }`}
                  >
                    {showBgGrid ? 'GRID: ON' : 'GRID: OFF'}
                  </button>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-neutral-800 space-y-2.5">
              {onToggleDarkTheme && (
                <button
                  type="button"
                  onClick={() => {
                    onToggleDarkTheme();
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-md border text-xs font-mono transition-all duration-100 ${
                    bgTheme === 'dark-theme'
                      ? 'bg-purple-950/80 border-purple-400 text-purple-200'
                      : 'bg-neutral-900 border-neutral-800 text-neutral-300'
                  }`}
                >
                  {bgTheme === 'dark-theme' ? (
                    <>
                      <Sun className="w-4 h-4 text-amber-300" />
                      <span>Switch to Solar System Theme</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-4 h-4 text-purple-300" />
                      <span>Switch to Pure Dark Theme</span>
                    </>
                  )}
                </button>
              )}

              {/* Mobile Website Refresh Action */}
              {onRefresh && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onRefresh();
                  }}
                  disabled={isRefreshing}
                  className="w-full flex items-center justify-between py-2.5 px-3.5 rounded-md bg-neutral-900/90 border border-neutral-800 text-neutral-200 text-xs font-mono hover:border-cyan-500/50 hover:text-white transition-all active:scale-[0.98] cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <RotateCw className={`w-4 h-4 text-cyan-400 ${isRefreshing ? 'animate-spin' : ''}`} />
                    <span className="font-semibold text-white">
                      {isRefreshing ? 'Refreshing Website...' : 'Refresh Website'}
                    </span>
                  </div>
                  <span className="text-[10px] text-cyan-300 font-mono px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-800">
                    Live Sync
                  </span>
                </button>
              )}

              {/* Mobile Direct Call & WhatsApp */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href="tel:+919343795715"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-md bg-indigo-950/60 border border-indigo-500/40 text-xs font-mono text-indigo-200"
                >
                  <Phone className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Call 9343795715</span>
                </a>
                <a
                  href="https://wa.me/919343795715?text=Hi%20Mr%20Deepak,%20I%20would%20like%20to%20discuss%20a%20website%20project%20with%20you"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-md bg-emerald-950/60 border border-emerald-500/40 text-xs font-mono text-emerald-200 hover:bg-emerald-900/60 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp Chat</span>
                </a>
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuoteModal();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white text-black font-semibold text-sm rounded-md"
              >
                <span>Get a Quote</span>
                <ArrowUpRight className="w-4 h-4 text-black" />
              </button>
            </div>
          </div>

          <div className="text-xs text-neutral-500 font-mono pt-6 border-t border-neutral-900 flex items-center justify-between">
            <span>MR DEEPAK</span>
            <span className="text-cyan-400">Admin Protected</span>
          </div>
        </div>
      </div>
      )}
    </>
  );
};

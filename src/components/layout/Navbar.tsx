import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, ShieldCheck, Moon, Sun, Phone, MessageSquare } from 'lucide-react';
import { BackgroundTheme } from '../../types';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenQuoteModal: () => void;
  bgTheme?: BackgroundTheme;
  onToggleDarkTheme?: () => void;
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
  bgTheme,
  onToggleDarkTheme,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            {/* Zone 1: Single text element wordmark (Studio removed) */}
            <button
              onClick={() => handleNavClick('home')}
              className="text-left group flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-sm cursor-pointer active:scale-95 transition-transform duration-100"
              aria-label="Mr Deepak Home"
            >
              <div className="relative flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500/20 via-indigo-500/20 to-purple-500/20 border border-cyan-400/30 group-hover:border-cyan-400/60 transition-colors duration-100">
                <span className="w-2 h-2 rounded-full bg-cyan-400 group-hover:scale-125 transition-transform duration-100 shadow-[0_0_10px_rgba(56,189,248,0.8)]" />
              </div>
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

              {/* Direct Call Quick Action */}
              <a
                href="tel:+919343795715"
                className="hidden xl:inline-flex items-center gap-1.5 px-3 py-2 rounded-md border border-indigo-500/30 bg-indigo-950/40 hover:bg-indigo-900/60 text-indigo-200 hover:text-white text-xs font-mono transition-all duration-100 active:scale-95 cursor-pointer"
                title="Call Mr Deepak directly at +91 9343795715"
              >
                <Phone className="w-3.5 h-3.5 text-indigo-400" />
                <span className="font-semibold">+91 9343795715</span>
              </a>

              {/* Admin Panel Quick Entry Button */}
              <button
                onClick={() => handleNavClick('admin')}
                className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-md border text-xs font-mono transition-all duration-100 active:scale-95 cursor-pointer ${
                  currentPage === 'admin'
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(56,189,248,0.3)]'
                    : 'bg-neutral-900/90 border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 hover:bg-neutral-800'
                }`}
                title="Open Studio Admin Panel"
                aria-label="Admin Panel"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden lg:inline">Admin</span>
              </button>

              <button
                onClick={onOpenQuoteModal}
                className="hidden sm:inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 hover:shadow-lg hover:shadow-cyan-500/20 active:scale-95 transition-all duration-100 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white whitespace-nowrap cursor-pointer shadow-md"
              >
                <span>Get Quote</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-black" />
              </button>

              {/* Mobile Menu Toggle Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-neutral-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-md"
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-xl md:hidden flex flex-col justify-between p-6 pt-24 animate-in fade-in duration-200 overflow-y-auto"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="flex flex-col gap-5"
            onClick={(e) => e.stopPropagation()}
          >
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

            <div className="pt-4 border-t border-neutral-800 space-y-2.5">
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
      )}
    </>
  );
};

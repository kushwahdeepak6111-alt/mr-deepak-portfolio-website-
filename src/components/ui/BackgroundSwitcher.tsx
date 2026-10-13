import React, { useState } from 'react';
import { Palette, Check, Sparkles, Grid, X } from 'lucide-react';
import { BackgroundTheme } from '../../types';

interface BackgroundSwitcherProps {
  currentTheme: BackgroundTheme;
  showGrid: boolean;
  onSelectTheme: (theme: BackgroundTheme) => void;
  onToggleGrid: () => void;
}

export interface ThemeOption {
  id: BackgroundTheme;
  name: string;
  subtitle: string;
  previewColors: string[];
  accentBorder: string;
  badge: string;
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'dark-theme',
    name: 'OLED Pure Dark',
    subtitle: 'Pitch black minimalist dark canvas with high contrast',
    previewColors: ['#000000', '#0a0a0f', '#181824', '#6366f1'],
    accentBorder: 'from-purple-500 via-indigo-500 to-cyan-500',
    badge: 'Dark Theme',
  },
  {
    id: 'solar-system',
    name: 'Ultra-HD Solar System',
    subtitle: '8K photorealistic Sun, planets & cosmic deep space with 3D parallax',
    previewColors: ['#020409', '#f59e0b', '#38bdf8', '#cbd5e1'],
    accentBorder: 'from-amber-400 via-cyan-400 to-indigo-500',
    badge: '8K Ultra',
  },
  {
    id: 'lunar-full-moon',
    name: 'Cinematic 3D Moon',
    subtitle: 'Hyper-detailed 3D rotating Moon with craters & blue halo',
    previewColors: ['#020409', '#cbd5e1', '#94a3b8', '#38bdf8'],
    accentBorder: 'from-slate-300 via-cyan-400 to-indigo-400',
    badge: 'Live 3D',
  },
  {
    id: 'cosmic-aurora',
    name: 'Cosmic Aurora',
    subtitle: 'Cyan, violet & deep space mesh',
    previewColors: ['#030713', '#06b6d4', '#6366f1', '#a855f7'],
    accentBorder: 'from-cyan-500 to-indigo-500',
    badge: 'Popular',
  },
  {
    id: 'cyber-matrix',
    name: 'Cyber Matrix',
    subtitle: 'Emerald green & electric cyan grid',
    previewColors: ['#01090f', '#06b6d4', '#10b981', '#042f2e'],
    accentBorder: 'from-emerald-400 to-cyan-500',
    badge: 'High-Tech',
  },
  {
    id: 'obsidian-gold',
    name: 'Obsidian Gold',
    subtitle: 'Velvet carbon with champagne glows',
    previewColors: ['#060503', '#f59e0b', '#d97706', '#78350f'],
    accentBorder: 'from-amber-400 to-yellow-600',
    badge: 'Luxury',
  },
  {
    id: 'royal-sapphire',
    name: 'Royal Sapphire',
    subtitle: 'Oceanic deep navy & azure glow',
    previewColors: ['#02071a', '#2563eb', '#4f46e5', '#1d4ed8'],
    accentBorder: 'from-blue-500 to-indigo-600',
    badge: 'Electric',
  },
  {
    id: 'matte-stealth',
    name: 'Matte Stealth',
    subtitle: 'Minimalist studio dark graphite',
    previewColors: ['#06070a', '#1e293b', '#334155', '#0f172a'],
    accentBorder: 'from-slate-500 to-neutral-700',
    badge: 'Minimal',
  },
];

export const BackgroundSwitcher: React.FC<BackgroundSwitcherProps> = ({
  currentTheme,
  showGrid,
  onSelectTheme,
  onToggleGrid,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const activeOption = THEME_OPTIONS.find((t) => t.id === currentTheme) || THEME_OPTIONS[0];

  return (
    <div className="fixed bottom-5 left-5 z-40 select-none">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-neutral-900/90 hover:bg-neutral-800/95 border border-white/15 hover:border-cyan-400/50 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all duration-100 hover:scale-105 active:scale-95 cursor-pointer text-xs font-mono text-neutral-300 hover:text-white"
          title="Change Website Background Theme"
          aria-label="Change Background Theme"
        >
          <div className="relative flex items-center justify-center w-5 h-5 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-500 shadow-[0_0_10px_rgba(56,189,248,0.5)]">
            <Palette className="w-3 h-3 text-white" />
          </div>
          <span className="font-semibold tracking-wide hidden sm:inline text-neutral-200">
            Background: <span className="text-cyan-300 font-bold">{activeOption.name}</span>
          </span>
          <span className="font-semibold tracking-wide sm:hidden text-neutral-200">
            Theme
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </button>
      )}

      {/* Expanded Theme Menu Card */}
      {isOpen && (
        <div className="w-[310px] sm:w-[350px] p-4 rounded-2xl bg-neutral-950/95 border border-white/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-100">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white tracking-wide">Website Themes</h4>
                <p className="text-[11px] font-mono text-neutral-400">Select ambient dark visual style</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors duration-100 active:scale-90 cursor-pointer"
              aria-label="Close background picker"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Theme List */}
          <div className="space-y-2 mb-3">
            {THEME_OPTIONS.map((theme) => {
              const isSelected = theme.id === currentTheme;
              return (
                <button
                  key={theme.id}
                  onClick={() => onSelectTheme(theme.id)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-all duration-100 active:scale-[0.98] cursor-pointer ${
                    isSelected
                      ? 'bg-neutral-800/90 border-cyan-400/60 shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                      : 'bg-neutral-900/50 hover:bg-neutral-900 border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Visual Color Preview Orb */}
                    <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-white/20 flex-shrink-0 shadow-inner">
                      <div
                        className="w-full h-full"
                        style={{
                          background: `linear-gradient(135deg, ${theme.previewColors.join(', ')})`,
                        }}
                      />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-semibold ${isSelected ? 'text-white' : 'text-neutral-200'}`}>
                          {theme.name}
                        </span>
                        <span className="px-1.5 py-0.5 text-[9px] font-mono font-medium rounded bg-white/10 text-neutral-300">
                          {theme.badge}
                        </span>
                      </div>
                      <p className="text-[10px] text-neutral-400 leading-tight mt-0.5 line-clamp-1">
                        {theme.subtitle}
                      </p>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-cyan-400 text-neutral-950 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Bottom Grid Overlay Toggle */}
          <div className="pt-2.5 border-t border-white/10 flex items-center justify-between text-xs">
            <button
              onClick={onToggleGrid}
              className="flex items-center gap-2 text-neutral-300 hover:text-white transition-colors cursor-pointer"
            >
              <Grid className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-[11px] font-mono">Architectural Grid Mesh</span>
            </button>

            <button
              onClick={onToggleGrid}
              className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${
                showGrid ? 'bg-cyan-500' : 'bg-neutral-700'
              }`}
              aria-label="Toggle grid"
            >
              <span
                className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                  showGrid ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

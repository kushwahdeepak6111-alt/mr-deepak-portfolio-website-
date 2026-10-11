import React, { useEffect, useState } from 'react';
import { BackgroundTheme } from '../../types';
import { RealisticMoon } from '../3d/RealisticMoon';
import solarSystemImg from '../../assets/images/solar_system_ultra_realistic_no_moon_1791473515747.jpg';

interface BackgroundLayerProps {
  theme: BackgroundTheme;
  showGrid?: boolean;
}

export const BackgroundLayer: React.FC<BackgroundLayerProps> = ({
  theme = 'solar-system',
  showGrid = true,
}) => {
  // Smooth mouse parallax for realistic 3D depth perception
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let animationFrameId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = ((e.clientX / innerWidth) - 0.5) * 20; // -10px to +10px
      targetY = ((e.clientY / innerHeight) - 0.5) * 20;
    };

    const animateParallax = () => {
      // High-speed, responsive lerp interpolation (0.18 for instant reactivity)
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      setMouseOffset({ x: currentX, y: currentY });
      animationFrameId = requestAnimationFrame(animateParallax);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(animateParallax);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none transition-colors duration-200"
    >
      {/* ================= 0. THEME: PURE DARK (OLED Minimal Dark Theme) ================= */}
      {theme === 'dark-theme' && (
        <div className="absolute inset-0 bg-[#000000] transition-opacity duration-200">
          {/* Deep Velvet Obsidian Base */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#030305] via-[#010102] to-[#000000]" />

          {/* Subtle Ambient Midnight Glow */}
          <div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-[160px] opacity-25 pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, rgba(56, 189, 248, 0.1) 40%, transparent 70%)',
            }}
          />

          {/* Deep Atmospheric Mist in Bottom */}
          <div
            className="absolute -bottom-20 right-1/4 w-[600px] h-[500px] rounded-full blur-[140px] opacity-15 pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, transparent 70%)',
            }}
          />

          {/* Minimal Architectural Grid */}
          {showGrid && (
            <div
              className="absolute inset-0 bg-tech-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,rgba(0,0,0,0.85)_15%,rgba(0,0,0,0.05)_80%)] pointer-events-none"
            />
          )}

          {/* Deep Edge Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.85)_100%)] pointer-events-none" />
        </div>
      )}

      {/* ================= 1. THEME: ULTRA-REALISTIC 8K SOLAR SYSTEM ================= */}
      {theme === 'solar-system' && (
        <div className="absolute inset-0 bg-[#020409] transition-opacity duration-200">
          {/* Deep Space Base */}
          <div className="absolute inset-0 bg-black" />

          {/* Master 8K Ultra-Realistic Solar System Image with Instant Parallax (No Moon) */}
          <div
            className="absolute -inset-4 sm:-inset-6 will-change-transform"
            style={{
              transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0) scale(1.04)`,
            }}
          >
            <img
              src={solarSystemImg}
              alt="Ultra Realistic Solar System Background"
              referrerPolicy="no-referrer"
              fetchPriority="high"
              decoding="async"
              className="w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.08] saturate-[1.05]"
            />
          </div>

          {/* Glowing Solar Corona & Radiant Sun Rays (aligned with blazing Sun on the left) */}
          <div
            className="absolute -top-12 -left-12 sm:top-[2%] sm:left-[2%] w-[520px] h-[520px] sm:w-[700px] sm:h-[700px] rounded-full blur-[100px] sm:blur-[130px] pointer-events-none mix-blend-screen opacity-70 animate-pulse"
            style={{
              background: 'radial-gradient(circle, rgba(251, 191, 36, 0.45) 0%, rgba(245, 158, 11, 0.22) 40%, rgba(217, 119, 6, 0.08) 60%, transparent 75%)',
              animationDuration: '4s',
            }}
          />

          {/* Deep Cosmic Nebula Dust Breathing Accent in center-bottom */}
          <div
            className="absolute bottom-[-10%] left-1/3 w-[600px] h-[500px] rounded-full blur-[150px] pointer-events-none mix-blend-screen opacity-30 animate-slow-drift-1"
            style={{
              background: 'radial-gradient(circle, rgba(168, 85, 247, 0.25) 0%, rgba(99, 102, 241, 0.15) 50%, transparent 75%)',
            }}
          />

          {/* Technical Astronomical Grid Coordinates */}
          {showGrid && (
            <div
              className="absolute inset-0 bg-tech-grid opacity-20 [mask-image:radial-gradient(ellipse_at_center,rgba(0,0,0,0.7)_25%,rgba(0,0,0,0.05)_85%)] pointer-events-none"
            />
          )}

          {/* Cinematic Vignette for premium contrast and readability */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(2,4,9,0.72)_100%)] pointer-events-none" />
        </div>
      )}

      {/* ================= THEME: LUNAR FULL MOON (Giant 3D Hero Moon) ================= */}
      {theme === 'lunar-full-moon' && (
        <div className="absolute inset-0 bg-[#020409] transition-opacity duration-200">
          {/* Deep Space Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#020512] via-[#04081a] to-[#010206]" />

          {/* Majestic Lunar Aura */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] sm:w-[850px] sm:h-[850px] rounded-full blur-[140px] pointer-events-none opacity-45"
            style={{
              background: 'radial-gradient(circle, rgba(148, 163, 184, 0.35) 0%, rgba(56, 189, 248, 0.2) 40%, transparent 75%)',
            }}
          />

          {/* Central Hero 3D Moon */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-96 sm:h-96 md:w-[480px] md:h-[480px] lg:w-[560px] lg:h-[560px] pointer-events-auto z-10">
            <RealisticMoon showHalo={true} interactive={true} showInfoBadge={true} />
          </div>

          {showGrid && (
            <div
              className="absolute inset-0 bg-tech-grid opacity-20 [mask-image:radial-gradient(ellipse_at_center,rgba(0,0,0,0.75)_25%,rgba(0,0,0,0.05)_85%)] pointer-events-none"
            />
          )}

          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(2,4,9,0.75)_100%)] pointer-events-none" />
        </div>
      )}

      {/* ================= 1. THEME: COSMIC AURORA ================= */}
      {theme === 'cosmic-aurora' && (
        <div className="absolute inset-0 bg-[#030611] transition-opacity duration-200">
          {/* Base ambient gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#030713] via-[#060a1d] to-[#02040a]" />

          {/* Floating Aurora Glow Orbs */}
          <div
            className="absolute -top-32 -left-32 w-[650px] h-[650px] rounded-full blur-[130px] opacity-70 animate-slow-drift-1"
            style={{
              background: 'radial-gradient(circle, rgba(14, 165, 233, 0.32) 0%, rgba(99, 102, 241, 0.18) 50%, transparent 70%)',
            }}
          />
          <div
            className="absolute top-1/4 -right-24 w-[600px] h-[600px] rounded-full blur-[140px] opacity-60 animate-slow-drift-2"
            style={{
              background: 'radial-gradient(circle, rgba(168, 85, 247, 0.28) 0%, rgba(59, 130, 246, 0.15) 50%, transparent 70%)',
            }}
          />
          <div
            className="absolute bottom-10 left-1/3 w-[700px] h-[550px] rounded-full blur-[150px] opacity-50 animate-slow-drift-3"
            style={{
              background: 'radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, rgba(6, 182, 212, 0.15) 60%, transparent 75%)',
            }}
          />

          {/* Technical Micro-Grid with Radial Mask */}
          {showGrid && (
            <div
              className="absolute inset-0 bg-tech-grid opacity-60 [mask-image:radial-gradient(ellipse_at_center,rgba(0,0,0,0.85)_20%,rgba(0,0,0,0.2)_80%)]"
            />
          )}

          {/* Subtle Starlight / Micro-twinkles */}
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.6) 1px, transparent 1px)',
              backgroundSize: '120px 120px',
            }}
          />
        </div>
      )}

      {/* ================= 2. THEME: CYBER MATRIX ================= */}
      {theme === 'cyber-matrix' && (
        <div className="absolute inset-0 bg-[#01090f] transition-opacity duration-200">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#020c14] via-[#03141f] to-[#01070d]" />

          {/* High-tech emerald & electric cyan ambient flares */}
          <div
            className="absolute top-10 left-1/4 w-[600px] h-[600px] rounded-full blur-[120px] opacity-60 animate-slow-drift-1"
            style={{
              background: 'radial-gradient(circle, rgba(6, 182, 212, 0.35) 0%, rgba(16, 185, 129, 0.15) 50%, transparent 70%)',
            }}
          />
          <div
            className="absolute top-1/2 right-10 w-[650px] h-[650px] rounded-full blur-[140px] opacity-50 animate-slow-drift-2"
            style={{
              background: 'radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, rgba(6, 182, 212, 0.18) 50%, transparent 70%)',
            }}
          />

          {/* Electric Cyan Grid */}
          {showGrid && (
            <div
              className="absolute inset-0 bg-tech-grid-cyan opacity-80 [mask-image:radial-gradient(ellipse_at_center,rgba(0,0,0,0.9)_10%,rgba(0,0,0,0.15)_85%)]"
            />
          )}

          {/* Micro dots */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: 'radial-gradient(rgba(56, 189, 248, 0.45) 1.2px, transparent 1.2px)',
              backgroundSize: '64px 64px',
            }}
          />
        </div>
      )}

      {/* ================= 3. THEME: OBSIDIAN GOLD ================= */}
      {theme === 'obsidian-gold' && (
        <div className="absolute inset-0 bg-[#060503] transition-opacity duration-200">
          {/* Luxury velvet dark base */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#090805] via-[#0d0b07] to-[#050402]" />

          {/* Champagne & Amber glows */}
          <div
            className="absolute -top-20 left-1/3 w-[650px] h-[650px] rounded-full blur-[140px] opacity-65 animate-slow-drift-1"
            style={{
              background: 'radial-gradient(circle, rgba(245, 158, 11, 0.28) 0%, rgba(217, 119, 6, 0.14) 50%, transparent 70%)',
            }}
          />
          <div
            className="absolute bottom-20 right-1/4 w-[600px] h-[600px] rounded-full blur-[140px] opacity-55 animate-slow-drift-3"
            style={{
              background: 'radial-gradient(circle, rgba(251, 146, 60, 0.22) 0%, rgba(180, 83, 9, 0.12) 50%, transparent 70%)',
            }}
          />

          {/* Gold Micro-Dots */}
          {showGrid && (
            <div
              className="absolute inset-0 bg-tech-dots-gold opacity-75 [mask-image:radial-gradient(ellipse_at_center,rgba(0,0,0,0.9)_20%,rgba(0,0,0,0.25)_80%)]"
            />
          )}

          {/* Warm Vignette */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: 'radial-gradient(rgba(245, 158, 11, 0.3) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
            }}
          />
        </div>
      )}

      {/* ================= 4. THEME: ROYAL SAPPHIRE ================= */}
      {theme === 'royal-sapphire' && (
        <div className="absolute inset-0 bg-[#02071a] transition-opacity duration-200">
          {/* Deep oceanic base */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#020a21] via-[#051136] to-[#01040f]" />

          {/* Sapphire and Electric Azure Glows */}
          <div
            className="absolute top-1/6 left-1/4 w-[700px] h-[700px] rounded-full blur-[150px] opacity-75 animate-slow-drift-1"
            style={{
              background: 'radial-gradient(circle, rgba(37, 99, 235, 0.35) 0%, rgba(79, 70, 229, 0.2) 50%, transparent 75%)',
            }}
          />
          <div
            className="absolute bottom-1/4 -right-16 w-[650px] h-[650px] rounded-full blur-[140px] opacity-60 animate-slow-drift-2"
            style={{
              background: 'radial-gradient(circle, rgba(124, 58, 237, 0.3) 0%, rgba(30, 64, 175, 0.18) 50%, transparent 70%)',
            }}
          />

          {/* Technical Grid */}
          {showGrid && (
            <div
              className="absolute inset-0 bg-tech-grid opacity-70 [mask-image:radial-gradient(ellipse_at_center,rgba(0,0,0,0.9)_25%,rgba(0,0,0,0.2)_85%)]"
            />
          )}
        </div>
      )}

      {/* ================= 5. THEME: MATTE STEALTH ================= */}
      {theme === 'matte-stealth' && (
        <div className="absolute inset-0 bg-[#06070a] transition-opacity duration-200">
          {/* Pure minimalist dark slate */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#08090d] via-[#090b10] to-[#040507]" />

          {/* Monochromatic Soft Center Glow */}
          <div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full blur-[170px] opacity-35"
            style={{
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.12) 0%, rgba(148, 163, 184, 0.05) 50%, transparent 70%)',
            }}
          />

          {/* Architectural dots */}
          {showGrid && (
            <div
              className="absolute inset-0 bg-tech-dots opacity-40 [mask-image:radial-gradient(ellipse_at_center,rgba(0,0,0,0.8)_20%,rgba(0,0,0,0.15)_80%)]"
            />
          )}
        </div>
      )}

      {/* Global Cinematic Top Edge Ambient Glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent pointer-events-none" />
    </div>
  );
};

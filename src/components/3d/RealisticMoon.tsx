import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface RealisticMoonProps {
  className?: string;
  size?: number; // diameter in pixels (if fixed) or 0 for responsive container
  interactive?: boolean;
  showHalo?: boolean;
  showInfoBadge?: boolean;
}

export const RealisticMoon: React.FC<RealisticMoonProps> = ({
  className = '',
  size = 0,
  interactive = true,
  showHalo = true,
  showInfoBadge = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);
  const [moonPhase, setMoonPhase] = useState<'waxing' | 'full' | 'waning'>('full');

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL support
    let glAvailable = false;
    try {
      const testCanvas = document.createElement('canvas');
      glAvailable = !!(
        window.WebGLRenderingContext &&
        (testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl'))
      );
    } catch {
      glAvailable = false;
    }

    if (!glAvailable) return;

    const width = size || container.clientWidth || 320;
    const height = size || container.clientHeight || 320;

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.8);

    // 3. Renderer
    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(width, height);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.35;
      container.appendChild(renderer.domElement);
    } catch (e) {
      console.warn('RealisticMoon WebGLRenderer initialization error:', e);
      return;
    }

    // 4. Ultra-Realistic Procedural Lunar Surface Map (1024x512)
    const createPhotorealisticMoonTexture = () => {
      const c = document.createElement('canvas');
      c.width = 1024;
      c.height = 512;
      const ctx = c.getContext('2d');
      if (!ctx) {
        return new THREE.CanvasTexture(c);
      }

      // 4.1 Base Lunar Regolith Grey Texture
      const baseGrad = ctx.createLinearGradient(0, 0, 0, 512);
      baseGrad.addColorStop(0, '#e2e8f0');
      baseGrad.addColorStop(0.3, '#cbd5e1');
      baseGrad.addColorStop(0.7, '#94a3b8');
      baseGrad.addColorStop(1, '#cbd5e1');
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, 1024, 512);

      // Micro noise regolith grain
      ctx.fillStyle = 'rgba(15, 23, 42, 0.08)';
      for (let i = 0; i < 4000; i++) {
        const x = Math.random() * 1024;
        const y = Math.random() * 512;
        ctx.fillRect(x, y, Math.random() * 2 + 1, Math.random() * 2 + 1);
      }
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      for (let i = 0; i < 2000; i++) {
        const x = Math.random() * 1024;
        const y = Math.random() * 512;
        ctx.fillRect(x, y, 1.5, 1.5);
      }

      // 4.2 Major Lunar Maria (Basalt Plains)
      const mariaBasins = [
        // Oceanus Procellarum (Ocean of Storms)
        { x: 260, y: 220, rx: 160, ry: 130, rot: -0.2, c1: '#334155', c2: '#475569' },
        // Mare Imbrium (Sea of Rains)
        { x: 380, y: 170, rx: 130, ry: 95, rot: 0.1, c1: '#1e293b', c2: '#334155' },
        // Mare Serenitatis (Sea of Serenity)
        { x: 530, y: 190, rx: 90, ry: 75, rot: -0.1, c1: '#334155', c2: '#475569' },
        // Mare Tranquillitatis (Sea of Tranquility - Apollo 11)
        { x: 590, y: 260, rx: 110, ry: 85, rot: 0.2, c1: '#1e293b', c2: '#334155' },
        // Mare Crisium (Sea of Crises)
        { x: 740, y: 200, rx: 65, ry: 50, rot: 0.05, c1: '#1e293b', c2: '#475569' },
        // Mare Fecunditatis
        { x: 670, y: 320, rx: 85, ry: 65, rot: -0.15, c1: '#334155', c2: '#475569' },
        // Mare Nectaris
        { x: 580, y: 350, rx: 55, ry: 45, rot: 0.1, c1: '#334155', c2: '#475569' },
        // Mare Nubium
        { x: 370, y: 350, rx: 90, ry: 70, rot: -0.1, c1: '#334155', c2: '#475569' },
        // Mare Humorum
        { x: 270, y: 340, rx: 55, ry: 45, rot: 0.2, c1: '#1e293b', c2: '#334155' },
      ];

      mariaBasins.forEach((m) => {
        ctx.save();
        ctx.translate(m.x, m.y);
        ctx.rotate(m.rot);
        const grad = ctx.createRadialGradient(0, 0, 10, 0, 0, m.rx);
        grad.addColorStop(0, m.c1);
        grad.addColorStop(0.65, m.c2);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(0, 0, m.rx, m.ry, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // 4.3 High-Albedo Tycho Crater Ray System (Southern Highlands)
      const tychoX = 420;
      const tychoY = 430;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.42)';
      ctx.lineWidth = 1.5;
      for (let i = 0; i < 48; i++) {
        const angle = (i / 48) * Math.PI * 2 + (Math.random() - 0.5) * 0.15;
        const length = 180 + Math.random() * 240;
        ctx.beginPath();
        ctx.moveTo(tychoX, tychoY);
        ctx.lineTo(tychoX + Math.cos(angle) * length, tychoY + Math.sin(angle) * length);
        ctx.stroke();
      }

      // Copernicus ray system
      const copernicusX = 360;
      const copernicusY = 240;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 28; i++) {
        const angle = (i / 28) * Math.PI * 2;
        const length = 70 + Math.random() * 90;
        ctx.beginPath();
        ctx.moveTo(copernicusX, copernicusY);
        ctx.lineTo(copernicusX + Math.cos(angle) * length, copernicusY + Math.sin(angle) * length);
        ctx.stroke();
      }

      // 4.4 Prominent Craters with Real Sunlit Rim and Interior Cast Shadows
      const craters = [
        { x: tychoX, y: tychoY, r: 14, name: 'Tycho' },
        { x: copernicusX, y: copernicusY, r: 16, name: 'Copernicus' },
        { x: 300, y: 220, r: 11, name: 'Kepler' },
        { x: 230, y: 190, r: 10, name: 'Aristarchus' },
        { x: 420, y: 120, r: 15, name: 'Plato' },
        { x: 590, y: 250, r: 9, name: 'Apollo 11' },
      ];

      // Add 280 random impact craters across Highlands
      for (let i = 0; i < 280; i++) {
        craters.push({
          x: Math.random() * 1024,
          y: Math.random() * 512,
          r: Math.random() * 6 + 1.5,
          name: '',
        });
      }

      craters.forEach((cr) => {
        // Shadow bowl
        ctx.beginPath();
        ctx.arc(cr.x, cr.y, cr.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(15, 23, 42, 0.65)';
        ctx.fill();

        // Sunlight illuminated rim (light from top-right)
        ctx.beginPath();
        ctx.arc(cr.x + cr.r * 0.25, cr.y - cr.r * 0.25, cr.r * 0.9, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.lineWidth = Math.max(1, cr.r * 0.25);
        ctx.stroke();

        // Central crater peak for large craters
        if (cr.r > 8) {
          ctx.beginPath();
          ctx.arc(cr.x + 1, cr.y - 1, cr.r * 0.18, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fill();
        }
      });

      const tex = new THREE.CanvasTexture(c);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      return tex;
    };

    // 4.5 Bump Map for 3D Crater Relief Depth
    const createMoonBumpMap = () => {
      const c = document.createElement('canvas');
      c.width = 512;
      c.height = 256;
      const ctx = c.getContext('2d');
      if (!ctx) {
        return new THREE.CanvasTexture(c);
      }
      ctx.fillStyle = '#808080';
      ctx.fillRect(0, 0, 512, 256);

      // Craters bumps
      for (let i = 0; i < 150; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 256;
        const r = Math.random() * 8 + 2;

        const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
        grad.addColorStop(0, '#202020');
        grad.addColorStop(0.7, '#a0a0a0');
        grad.addColorStop(1, '#808080');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      const bumpTex = new THREE.CanvasTexture(c);
      bumpTex.wrapS = THREE.RepeatWrapping;
      return bumpTex;
    };

    const moonTexture = createPhotorealisticMoonTexture();
    const bumpTexture = createMoonBumpMap();

    // 5. The Moon Mesh
    const moonGroup = new THREE.Group();
    scene.add(moonGroup);

    const moonRadius = 2.45;
    const moonGeometry = new THREE.SphereGeometry(moonRadius, 64, 64);
    const moonMaterial = new THREE.MeshStandardMaterial({
      map: moonTexture,
      bumpMap: bumpTexture,
      bumpScale: 0.06,
      roughness: 0.88,
      metalness: 0.02,
    });
    const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
    // Face the iconic Sea of Tranquility / Apollo region forward
    moonMesh.rotation.y = 1.15;
    moonMesh.rotation.x = 0.08;
    moonGroup.add(moonMesh);

    // 6. Volumetric Lunar Atmospheric Halo / Blue-Silver Glow
    if (showHalo) {
      const haloGeo = new THREE.SphereGeometry(moonRadius * 1.14, 48, 48);
      const haloMat = new THREE.MeshBasicMaterial({
        color: 0x93c5fd,
        transparent: true,
        opacity: 0.18,
        side: THREE.BackSide,
      });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      moonGroup.add(haloMesh);

      // Outer soft aura
      const outerHaloGeo = new THREE.SphereGeometry(moonRadius * 1.3, 36, 36);
      const outerHaloMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.08,
        side: THREE.BackSide,
      });
      const outerHaloMesh = new THREE.Mesh(outerHaloGeo, outerHaloMat);
      moonGroup.add(outerHaloMesh);
    }

    // 7. Lighting: Powerful Sun Key Light creating dramatic crater relief & terminator
    // Sun light positioned slightly to the right & top
    const sunLight = new THREE.DirectionalLight(0xfff8e7, 3.8);
    sunLight.position.set(7, 3, 5);
    scene.add(sunLight);

    // Secondary subtle fill from deep space (Earthshine)
    const earthshineLight = new THREE.DirectionalLight(0x38bdf8, 0.45);
    earthshineLight.position.set(-6, -2, 3);
    scene.add(earthshineLight);

    // Ambient space light
    const ambientLight = new THREE.AmbientLight(0x0f172a, 0.55);
    scene.add(ambientLight);

    // 8. Animation & Interactive Mouse Drag / Tilt
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0.08;
    let targetRotationY = 1.15;
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handlePointerDown = (e: PointerEvent) => {
      if (!interactive) return;
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!interactive) return;
      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;
        targetRotationY += deltaX * 0.008;
        targetRotationX += deltaY * 0.008;
        previousMousePosition = { x: e.clientX, y: e.clientY };
      } else {
        const rect = container.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      }
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    if (interactive) {
      container.addEventListener('pointerdown', handlePointerDown);
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
    }

    // Resize observer
    const handleResize = () => {
      if (!renderer) return;
      const w = size || container.clientWidth || 320;
      const h = size || container.clientHeight || 320;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();

      // Continuous slow majestic axial rotation
      if (!isDragging) {
        targetRotationY += delta * 0.04;
      }

      // Smooth damping interpolation
      moonMesh.rotation.y += (targetRotationY - moonMesh.rotation.y) * 0.08;
      moonMesh.rotation.x += (targetRotationX + (isHoveredRef.current ? mouseY * 0.15 : 0) - moonMesh.rotation.x) * 0.08;

      // Subtle float breathing
      const time = clock.getElapsedTime();
      moonGroup.position.y = Math.sin(time * 0.8) * 0.08;

      if (renderer) {
        renderer.render(scene, camera);
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        container.removeEventListener('pointerdown', handlePointerDown);
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerup', handlePointerUp);
      }
      if (renderer && renderer.domElement) {
        if (renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
        renderer.dispose();
      }
      moonGeometry.dispose();
      moonMaterial.dispose();
      moonTexture.dispose();
      bumpTexture.dispose();
    };
  }, [size, interactive, showHalo]);

  return (
    <div
      className={`relative select-none ${className}`}
      onMouseEnter={() => {
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
      }}
    >
      {/* 3D Moon WebGL Canvas Container */}
      <div
        ref={containerRef}
        className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
        title="Interactive 3D Moon: Drag to rotate & explore craters"
      />

      {/* Atmospheric Radial Backlight Filter for Extra Glow */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none -z-10 blur-2xl opacity-40 animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(148, 163, 184, 0.45) 0%, rgba(56, 189, 248, 0.2) 40%, transparent 70%)',
          animationDuration: '5s',
        }}
      />

      {/* Optional Interactive Badge / Lunar Details */}
      {showInfoBadge && (
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-neutral-900/80 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[10px] text-slate-300 font-mono flex items-center gap-2 pointer-events-none shadow-xl">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span>LUNA 3D • Drag to Rotate</span>
        </div>
      )}
    </div>
  );
};

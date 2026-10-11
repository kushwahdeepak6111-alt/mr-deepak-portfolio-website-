import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface HeroSceneProps {
  className?: string;
}

export const HeroScene: React.FC<HeroSceneProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGlSupported, setWebGlSupported] = useState<boolean>(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGlSupported(false);
        return;
      }
    } catch {
      setWebGlSupported(false);
      return;
    }

    // 1. Scene
    const scene = new THREE.Scene();

    const width = container.clientWidth || (typeof window !== 'undefined' ? window.innerWidth : 800);
    const height = container.clientHeight || 600;
    const aspect = height > 0 ? width / height : 1.6;

    const camera = new THREE.PerspectiveCamera(42, aspect, 0.1, 50);
    camera.position.set(0, 0, 7.5);

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      // Cap pixel ratio to 1.25 max for ultra-smooth 60+ FPS on all devices
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
      renderer.setSize(width, height);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      container.appendChild(renderer.domElement);
    } catch (e) {
      console.warn('WebGL init failed, fallback', e);
      setWebGlSupported(false);
      return;
    }

    const canvas = renderer.domElement;
    canvas.style.pointerEvents = 'none'; // Never block UI clicks

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 2. High-Performance Studio Lighting (Optimized count)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xdbeafe, 2.5);
    keyLight.position.set(5, 6, 6);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 3.0);
    rimLight.position.set(-6, -4, -3);
    scene.add(rimLight);

    const goldPoint = new THREE.PointLight(0xf59e0b, 1.8, 8);
    goldPoint.position.set(2, -2, 2);
    scene.add(goldPoint);

    // 3. Optimized Materials (Using lightweight Standard PBR instead of heavy multi-pass Physical transmission)
    const glassMaterial = new THREE.MeshStandardMaterial({
      color: 0x0c111d,
      roughness: 0.12,
      metalness: 0.88,
      transparent: true,
      opacity: 0.88,
    });

    const titaniumMaterial = new THREE.MeshStandardMaterial({
      color: 0x080a0f,
      roughness: 0.22,
      metalness: 0.95,
    });

    const cyanEdgeMaterial = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.6,
    });

    const indigoEdgeMaterial = new THREE.LineBasicMaterial({
      color: 0x818cf8,
      transparent: true,
      opacity: 0.45,
    });

    // 4. Geometries
    // Main Display Screen
    const displayGeo = new THREE.BoxGeometry(4.2, 2.6, 0.08);
    const displayMesh = new THREE.Mesh(displayGeo, glassMaterial);
    displayMesh.position.set(0.2, 0.1, 0.2);
    displayMesh.rotation.set(-0.12, 0.22, -0.04);
    mainGroup.add(displayMesh);

    const displayEdges = new THREE.EdgesGeometry(displayGeo);
    const displayWire = new THREE.LineSegments(displayEdges, cyanEdgeMaterial);
    displayMesh.add(displayWire);

    // Offset Layer: Titanium Backplate
    const backplateGeo = new THREE.BoxGeometry(3.8, 2.3, 0.05);
    const backplateMesh = new THREE.Mesh(backplateGeo, titaniumMaterial);
    backplateMesh.position.set(-0.6, -0.4, -0.7);
    backplateMesh.rotation.set(-0.08, 0.3, -0.06);
    mainGroup.add(backplateMesh);

    const backplateEdges = new THREE.EdgesGeometry(backplateGeo);
    const backplateWire = new THREE.LineSegments(backplateEdges, indigoEdgeMaterial);
    backplateMesh.add(backplateWire);

    // Floating Orbital Ring (Optimized segments)
    const ringGeo = new THREE.TorusGeometry(1.3, 0.015, 8, 48);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      roughness: 0.3,
      metalness: 0.8,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 3;
    ring.position.set(0.2, 0.1, 0.2);
    mainGroup.add(ring);

    // Floating Foreground Card
    const cardGeo = new THREE.BoxGeometry(1.6, 1.1, 0.06);
    const cardMesh = new THREE.Mesh(cardGeo, glassMaterial);
    cardMesh.position.set(1.9, -0.9, 1.1);
    cardMesh.rotation.set(-0.1, 0.16, 0.06);
    mainGroup.add(cardMesh);

    const cardEdges = new THREE.EdgesGeometry(cardGeo);
    const cardWire = new THREE.LineSegments(
      cardEdges,
      new THREE.LineBasicMaterial({ color: 0xa5b4fc, transparent: true, opacity: 0.7 })
    );
    cardMesh.add(cardWire);

    // 5. Lightweight Ambient Particles (Reduced to 70 for zero overhead)
    const particleCount = 70;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 14;
      positions[i + 1] = (Math.random() - 0.5) * 8;
      positions[i + 2] = (Math.random() - 0.5) * 8;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.04,
      transparent: true,
      opacity: 0.5,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 6. Smooth Mouse Parallax (Passive, non-blocking)
    const targetRotation = { x: 0, y: 0 };
    const currentRotation = { x: 0, y: 0 };

    const handlePointerMove = (e: MouseEvent) => {
      const xNorm = (e.clientX / window.innerWidth) * 2 - 1;
      const yNorm = -(e.clientY / window.innerHeight) * 2 + 1;
      targetRotation.y = xNorm * 0.25;
      targetRotation.x = -yNorm * 0.18;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    // 7. Intersection Observer: Stop loop when scrolled out of view!
    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const handleResize = () => {
      if (!container || !renderer) return;
      const width = container.clientWidth || (typeof window !== 'undefined' ? window.innerWidth : 800);
      const height = container.clientHeight || 600;
      camera.aspect = height > 0 ? width / height : 1.6;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // 8. Render Animation Loop with Visibility Gating (Native timestamp replaces THREE.Clock to eliminate any Clock warnings)
    let animationFrameId: number;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      animationFrameId = requestAnimationFrame(animate);

      // Skip render when not visible to save 100% CPU/GPU for the rest of the site!
      if (!isVisible) return;

      if (startTime === null) {
        startTime = timestamp;
      }
      const elapsedTime = (timestamp - startTime) * 0.001;

      // High-speed, responsive damping
      currentRotation.x += (targetRotation.x - currentRotation.x) * 0.14;
      currentRotation.y += (targetRotation.y - currentRotation.y) * 0.14;

      mainGroup.rotation.x = currentRotation.x + Math.sin(elapsedTime * 0.5) * 0.04;
      mainGroup.rotation.y = currentRotation.y + Math.cos(elapsedTime * 0.4) * 0.05;

      ring.rotation.z = elapsedTime * 0.25;
      cardMesh.position.y = -0.9 + Math.sin(elapsedTime * 0.8) * 0.05;
      particles.rotation.y = elapsedTime * 0.012;

      if (renderer) {
        renderer.render(scene, camera);
      }
    };
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);

      if (renderer) {
        renderer.dispose();
        if (renderer.domElement && renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      }
      displayGeo.dispose();
      backplateGeo.dispose();
      ringGeo.dispose();
      cardGeo.dispose();
      particleGeo.dispose();
      glassMaterial.dispose();
      titaniumMaterial.dispose();
      ringMat.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {!webGlSupported && (
        <div className="absolute inset-0 flex items-center justify-center p-6 bg-gradient-to-b from-neutral-900/60 to-black/80">
          <div className="w-full max-w-md aspect-[16/10] rounded-xl border border-white/10 bg-neutral-900/80 p-4">
            <div className="text-xs text-cyan-400 font-mono">DIGITAL ARCHITECTURE</div>
          </div>
        </div>
      )}

      {/* Atmospheric Scrims - blended with transparency to reveal Solar System & Moon background */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-transparent via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-transparent to-transparent pointer-events-none" />
    </div>
  );
};

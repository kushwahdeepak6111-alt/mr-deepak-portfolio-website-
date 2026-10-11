import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface CelestialCanvasProps {
  className?: string;
  theme?: string;
  speedMultiplier?: number;
}

export const CelestialCanvas: React.FC<CelestialCanvasProps> = ({
  className = '',
  speedMultiplier = 1,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
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

    // 1. Scene & Setup
    const scene = new THREE.Scene();

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Camera with cinematic wide lens
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    // Adjusted camera so the solar system and magnificent moon are in full view
    camera.position.set(16, 26, 48);
    camera.lookAt(6, 2, 0);

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
      console.warn('CelestialCanvas WebGLRenderer error:', e);
      return;
    }

    const canvas = renderer.domElement;
    canvas.style.pointerEvents = 'none';
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    // Solar system root group (tilted slightly for an impressive perspective)
    const solarSystemGroup = new THREE.Group();
    solarSystemGroup.position.set(-6, -2, 0);
    solarSystemGroup.rotation.x = 0.32;
    solarSystemGroup.rotation.z = -0.08;
    scene.add(solarSystemGroup);

    // ==========================================
    // 2. LIGHTING
    // ==========================================
    // Subtle ambient starlight
    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.4);
    scene.add(ambientLight);

    // Blazing Sun Omnidirectional Light
    const sunLight = new THREE.PointLight(0xfff5d6, 5.0, 160, 1.1);
    sunLight.position.set(0, 0, 0);
    solarSystemGroup.add(sunLight);

    // Rim starlight to illuminate night sides of planets realistically
    const spaceRimLight = new THREE.DirectionalLight(0x60a5fa, 0.75);
    spaceRimLight.position.set(30, 45, 20);
    scene.add(spaceRimLight);

    // ==========================================
    // 3. CINEMATIC HIGH-FIDELITY STARFIELD & NEBULA PARTICLES
    // ==========================================
    const starCount = 2200;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);

    const starColorPalette = [
      new THREE.Color(0xffffff), // Pure white
      new THREE.Color(0x93c5fd), // Ice blue
      new THREE.Color(0xfef08a), // Pale yellow
      new THREE.Color(0xc084fc), // Soft nebula violet
      new THREE.Color(0x38bdf8), // Vibrant cyan
      new THREE.Color(0xfdba74), // Orange star
    ];

    for (let i = 0; i < starCount; i++) {
      const r = 90 + Math.random() * 140;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = r * Math.cos(phi);

      const color = starColorPalette[Math.floor(Math.random() * starColorPalette.length)];
      starColors[i * 3] = color.r;
      starColors[i * 3 + 1] = color.g;
      starColors[i * 3 + 2] = color.b;

      starSizes[i] = Math.random() * 1.4 + 0.6;
    }

    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 1.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
    });
    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // ==========================================
    // 4. PROCEDURAL HIGH-RES TEXTURES
    // ==========================================
    // 4.1 Sun Surface with animated solar turbulence feel
    const createSunTexture = () => {
      const c = document.createElement('canvas');
      c.width = 512;
      c.height = 256;
      const ctx = c.getContext('2d')!;

      // Plasma base
      const grad = ctx.createLinearGradient(0, 0, 0, 256);
      grad.addColorStop(0, '#fffbeb');
      grad.addColorStop(0.25, '#fbbf24');
      grad.addColorStop(0.55, '#f97316');
      grad.addColorStop(0.85, '#dc2626');
      grad.addColorStop(1, '#991b1b');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 256);

      // Solar flare spots & flares
      ctx.fillStyle = 'rgba(255, 245, 204, 0.35)';
      for (let i = 0; i < 500; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 256;
        const r = Math.random() * 6 + 1.5;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = 'rgba(120, 20, 10, 0.35)';
      for (let i = 0; i < 80; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 256;
        const r = Math.random() * 8 + 2;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      return new THREE.CanvasTexture(c);
    };

    // 4.2 Realistic Moon Texture with Basins, Maria & Craters
    const createMoonTexture = () => {
      const c = document.createElement('canvas');
      c.width = 512;
      c.height = 256;
      const ctx = c.getContext('2d')!;

      // Lunar Regolith Grey
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(0, 0, 512, 256);

      // Lunar Maria (Sea of Tranquility, Oceanus Procellarum)
      const maria = [
        { x: 160, y: 110, rx: 75, ry: 55, c: '#475569' },
        { x: 280, y: 90, rx: 90, ry: 60, c: '#334155' },
        { x: 380, y: 150, rx: 70, ry: 45, c: '#475569' },
        { x: 190, y: 180, rx: 50, ry: 35, c: '#3f4f66' },
      ];
      maria.forEach((m) => {
        const grad = ctx.createRadialGradient(m.x, m.y, 5, m.x, m.y, m.rx);
        grad.addColorStop(0, m.c);
        grad.addColorStop(0.7, '#64748b');
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(m.x, m.y, m.rx, m.ry, 0, 0, Math.PI * 2);
        ctx.fill();
      });

      // Impact Craters with bright ejecta rays and shadowed rims
      for (let i = 0; i < 220; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 256;
        const radius = Math.random() * 8 + 1.5;

        // Shadow core
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(15, 23, 42, 0.55)';
        ctx.fill();

        // Sunlit rim
        ctx.beginPath();
        ctx.arc(x - radius * 0.3, y - radius * 0.3, radius * 0.85, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      return new THREE.CanvasTexture(c);
    };

    // 4.3 Earth Texture with Oceans, Continents & Atmospheric Swirls
    const createEarthTexture = () => {
      const c = document.createElement('canvas');
      c.width = 512;
      c.height = 256;
      const ctx = c.getContext('2d')!;

      // Deep Pacific Blue
      ctx.fillStyle = '#092d63';
      ctx.fillRect(0, 0, 512, 256);

      // Continent landmasses (Eurasia, Africa, Americas)
      ctx.fillStyle = '#1e7b47';
      const lands = [
        [90, 80, 40, 25],
        [120, 130, 45, 50],
        [280, 70, 75, 45],
        [320, 140, 40, 60],
        [380, 120, 50, 40],
      ];
      lands.forEach(([lx, ly, rx, ry]) => {
        ctx.beginPath();
        ctx.ellipse(lx, ly, rx, ry, 0.2, 0, Math.PI * 2);
        ctx.fill();
      });

      // Swirling White Clouds
      ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
      for (let i = 0; i < 50; i++) {
        const cx = Math.random() * 512;
        const cy = Math.random() * 256;
        ctx.beginPath();
        ctx.ellipse(cx, cy, Math.random() * 40 + 15, Math.random() * 10 + 3, 0.15, 0, Math.PI * 2);
        ctx.fill();
      }
      return new THREE.CanvasTexture(c);
    };

    // 4.4 Jupiter with Great Red Spot & Atmospheric Belts
    const createJupiterTexture = () => {
      const c = document.createElement('canvas');
      c.width = 512;
      c.height = 256;
      const ctx = c.getContext('2d')!;

      const bands = ['#d97706', '#fef3c7', '#b45309', '#fde68a', '#92400e', '#fef3c7', '#78350f', '#f59e0b'];
      const slice = 256 / bands.length;
      bands.forEach((col, idx) => {
        ctx.fillStyle = col;
        ctx.fillRect(0, idx * slice, 512, slice);
      });

      // Great Red Spot
      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.ellipse(310, 150, 38, 22, 0, 0, Math.PI * 2);
      ctx.fill();
      return new THREE.CanvasTexture(c);
    };

    // 4.5 Mars Rusty Terrain
    const createMarsTexture = () => {
      const c = document.createElement('canvas');
      c.width = 512;
      c.height = 256;
      const ctx = c.getContext('2d')!;
      ctx.fillStyle = '#c2410c';
      ctx.fillRect(0, 0, 512, 256);
      ctx.fillStyle = '#7c2d12';
      for (let i = 0; i < 40; i++) {
        ctx.beginPath();
        ctx.ellipse(Math.random() * 512, Math.random() * 256, Math.random() * 50 + 20, Math.random() * 20 + 8, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      // Polar Ice Cap
      ctx.fillStyle = '#f8fafc';
      ctx.beginPath();
      ctx.arc(256, 10, 45, 0, Math.PI * 2);
      ctx.fill();
      return new THREE.CanvasTexture(c);
    };

    const sunTex = createSunTexture();
    const moonTex = createMoonTexture();
    const earthTex = createEarthTexture();
    const jupiterTex = createJupiterTexture();
    const marsTex = createMarsTexture();

    // ==========================================
    // 5. THE CENTRAL SUN (Realistic Glowing Star)
    // ==========================================
    const sunGeo = new THREE.SphereGeometry(3.8, 36, 36);
    const sunMat = new THREE.MeshBasicMaterial({
      map: sunTex,
      color: 0xffffff,
    });
    const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    solarSystemGroup.add(sunMesh);

    // Multi-stage Solar Corona Glow
    const innerCoronaGeo = new THREE.SphereGeometry(4.6, 32, 32);
    const innerCoronaMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.45,
      side: THREE.BackSide,
    });
    const innerCorona = new THREE.Mesh(innerCoronaGeo, innerCoronaMat);
    sunMesh.add(innerCorona);

    const outerCoronaGeo = new THREE.SphereGeometry(6.2, 32, 32);
    const outerCoronaMat = new THREE.MeshBasicMaterial({
      color: 0xf97316,
      transparent: true,
      opacity: 0.22,
      side: THREE.BackSide,
    });
    const outerCorona = new THREE.Mesh(outerCoronaGeo, outerCoronaMat);
    sunMesh.add(outerCorona);

    // ==========================================
    // 6. ALL 8 REAL PLANETS IN SOLAR SYSTEM
    // ==========================================
    interface PlanetDef {
      name: string;
      radius: number;
      orbitDistance: number;
      orbitSpeed: number;
      rotationSpeed: number;
      color: number;
      texture?: THREE.Texture;
      hasRings?: boolean;
      ringInner?: number;
      ringOuter?: number;
      ringColor?: number;
      hasEarthMoon?: boolean;
    }

    const planetsData: PlanetDef[] = [
      {
        name: 'Mercury',
        radius: 0.46,
        orbitDistance: 6.8,
        orbitSpeed: 0.026,
        rotationSpeed: 0.015,
        color: 0x94a3b8,
      },
      {
        name: 'Venus',
        radius: 0.76,
        orbitDistance: 10.4,
        orbitSpeed: 0.019,
        rotationSpeed: -0.01,
        color: 0xf59e0b,
      },
      {
        name: 'Earth',
        radius: 0.86,
        orbitDistance: 15.0,
        orbitSpeed: 0.014,
        rotationSpeed: 0.022,
        color: 0x38bdf8,
        texture: earthTex,
        hasEarthMoon: true,
      },
      {
        name: 'Mars',
        radius: 0.58,
        orbitDistance: 20.0,
        orbitSpeed: 0.011,
        rotationSpeed: 0.019,
        color: 0xea580c,
        texture: marsTex,
      },
      {
        name: 'Jupiter',
        radius: 2.1,
        orbitDistance: 27.5,
        orbitSpeed: 0.0065,
        rotationSpeed: 0.035,
        color: 0xfbbf24,
        texture: jupiterTex,
      },
      {
        name: 'Saturn',
        radius: 1.6,
        orbitDistance: 36.0,
        orbitSpeed: 0.0048,
        rotationSpeed: 0.028,
        color: 0xfde68a,
        hasRings: true,
        ringInner: 2.1,
        ringOuter: 3.8,
        ringColor: 0xe2e8f0,
      },
      {
        name: 'Uranus',
        radius: 1.1,
        orbitDistance: 44.5,
        orbitSpeed: 0.0035,
        rotationSpeed: 0.018,
        color: 0x38bdf8,
        hasRings: true,
        ringInner: 1.4,
        ringOuter: 2.1,
        ringColor: 0x7dd3fc,
      },
      {
        name: 'Neptune',
        radius: 1.05,
        orbitDistance: 52.0,
        orbitSpeed: 0.0026,
        rotationSpeed: 0.016,
        color: 0x4f46e5,
      },
    ];

    interface ActivePlanetItem {
      mesh: THREE.Mesh;
      orbitDistance: number;
      orbitSpeed: number;
      rotationSpeed: number;
      angle: number;
      earthMoonPivot?: THREE.Group;
      earthMoonMesh?: THREE.Mesh;
    }

    const activePlanets: ActivePlanetItem[] = [];

    planetsData.forEach((p, idx) => {
      // 1. Orbital Ring Line
      const orbitCurve = new THREE.EllipseCurve(0, 0, p.orbitDistance, p.orbitDistance, 0, 2 * Math.PI, false, 0);
      const orbitPoints = orbitCurve.getPoints(120);
      const orbitGeo = new THREE.BufferGeometry().setFromPoints(
        orbitPoints.map((pt) => new THREE.Vector3(pt.x, 0, pt.y))
      );
      const orbitMat = new THREE.LineBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.22,
      });
      const orbitLine = new THREE.Line(orbitGeo, orbitMat);
      solarSystemGroup.add(orbitLine);

      // 2. Planet Mesh
      const pGeo = new THREE.SphereGeometry(p.radius, 28, 28);
      const pMat = new THREE.MeshStandardMaterial({
        color: p.color,
        map: p.texture,
        roughness: 0.55,
        metalness: 0.15,
        emissive: 0x070b14,
      });
      const pMesh = new THREE.Mesh(pGeo, pMat);

      // Start distributed around orbit
      const startAngle = (idx * Math.PI * 2) / planetsData.length + idx * 0.35;
      pMesh.position.set(Math.cos(startAngle) * p.orbitDistance, 0, Math.sin(startAngle) * p.orbitDistance);
      solarSystemGroup.add(pMesh);

      // Rings (Saturn & Uranus)
      if (p.hasRings && p.ringInner && p.ringOuter) {
        const ringGeo = new THREE.RingGeometry(p.ringInner, p.ringOuter, 60);
        const ringMat = new THREE.MeshStandardMaterial({
          color: p.ringColor || 0xe2e8f0,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.78,
          roughness: 0.45,
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = Math.PI / 2 + 0.35;
        pMesh.add(ringMesh);
      }

      // Earth's Orbiting Moon
      let earthMoonPivot: THREE.Group | undefined;
      let earthMoonMesh: THREE.Mesh | undefined;

      if (p.hasEarthMoon) {
        earthMoonPivot = new THREE.Group();
        pMesh.add(earthMoonPivot);

        const moonSmallGeo = new THREE.SphereGeometry(0.25, 20, 20);
        const moonSmallMat = new THREE.MeshStandardMaterial({
          map: moonTex,
          color: 0xe2e8f0,
          roughness: 0.8,
        });
        earthMoonMesh = new THREE.Mesh(moonSmallGeo, moonSmallMat);
        earthMoonMesh.position.set(1.6, 0.2, 0);
        earthMoonPivot.add(earthMoonMesh);

        // Small orbit path around earth
        const eOrbitCurve = new THREE.EllipseCurve(0, 0, 1.6, 1.6, 0, 2 * Math.PI, false, 0);
        const eOrbitPoints = eOrbitCurve.getPoints(36);
        const eOrbitGeo = new THREE.BufferGeometry().setFromPoints(
          eOrbitPoints.map((pt) => new THREE.Vector3(pt.x, 0, pt.y))
        );
        const eOrbitMat = new THREE.LineBasicMaterial({
          color: 0x94a3b8,
          transparent: true,
          opacity: 0.3,
        });
        const eOrbitLine = new THREE.Line(eOrbitGeo, eOrbitMat);
        earthMoonPivot.add(eOrbitLine);
      }

      activePlanets.push({
        mesh: pMesh,
        orbitDistance: p.orbitDistance,
        orbitSpeed: p.orbitSpeed,
        rotationSpeed: p.rotationSpeed,
        angle: startAngle,
        earthMoonPivot,
        earthMoonMesh,
      });
    });

    // ==========================================
    // 7. ASTEROID BELT (Between Mars & Jupiter)
    // ==========================================
    const asteroidCount = 400;
    const asteroidGeo = new THREE.DodecahedronGeometry(0.14, 0);
    const asteroidMat = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      roughness: 0.9,
    });
    const asteroidBelt = new THREE.InstancedMesh(asteroidGeo, asteroidMat, asteroidCount);
    const dummy = new THREE.Object3D();

    for (let i = 0; i < asteroidCount; i++) {
      const dist = 22.8 + (Math.random() - 0.5) * 3.6;
      const ang = Math.random() * Math.PI * 2;
      const yOff = (Math.random() - 0.5) * 1.5;
      const scl = 0.6 + Math.random() * 1.4;

      dummy.position.set(Math.cos(ang) * dist, yOff, Math.sin(ang) * dist);
      dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      dummy.scale.set(scl, scl, scl);
      dummy.updateMatrix();
      asteroidBelt.setMatrixAt(i, dummy.matrix);
    }
    solarSystemGroup.add(asteroidBelt);

    // ==========================================
    // 8. THE CINEMATIC HERO MOON (Prominent, High-Detail Foreground/Midground Object)
    // ==========================================
    // Positioned prominently on the upper-right corner of the viewport
    const heroMoonGroup = new THREE.Group();
    heroMoonGroup.position.set(22, 13, -10);
    scene.add(heroMoonGroup);

    const heroMoonGeo = new THREE.SphereGeometry(6.2, 54, 54);
    const heroMoonMat = new THREE.MeshStandardMaterial({
      map: moonTex,
      color: 0xf8fafc,
      roughness: 0.78,
      metalness: 0.05,
    });
    const heroMoonMesh = new THREE.Mesh(heroMoonGeo, heroMoonMat);
    heroMoonMesh.rotation.y = 0.8;
    heroMoonGroup.add(heroMoonMesh);

    // Glowing Lunar Atmosphere / Blue Aura
    const moonAtmosphereGeo = new THREE.SphereGeometry(6.8, 36, 36);
    const moonAtmosphereMat = new THREE.MeshBasicMaterial({
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.28,
      side: THREE.BackSide,
    });
    const moonAtmosphere = new THREE.Mesh(moonAtmosphereGeo, moonAtmosphereMat);
    heroMoonMesh.add(moonAtmosphere);

    const outerMoonAuraGeo = new THREE.SphereGeometry(8.0, 36, 36);
    const outerMoonAuraMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.12,
      side: THREE.BackSide,
    });
    const outerMoonAura = new THREE.Mesh(outerMoonAuraGeo, outerMoonAuraMat);
    heroMoonMesh.add(outerMoonAura);

    // Dedicated directional key light highlighting moon's craters
    const moonKeyLight = new THREE.DirectionalLight(0xffedd5, 1.8);
    moonKeyLight.position.set(-10, 10, 25);
    heroMoonGroup.add(moonKeyLight);

    // ==========================================
    // 9. ANIMATION LOOP & MOUSE PARALLAX
    // ==========================================
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraX = 16;
    let targetCameraY = 26;

    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseX = normX * 5.0;
      mouseY = normY * 3.5;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const speed = speedMultiplier;

      // 1. Sun & Corona rotations
      sunMesh.rotation.y += 0.005 * speed;
      innerCorona.rotation.y -= 0.002 * speed;
      outerCorona.rotation.z += 0.001 * speed;

      // 2. Planets Revolution & Rotation
      activePlanets.forEach((p) => {
        p.angle += p.orbitSpeed * 0.45 * speed;
        p.mesh.position.x = Math.cos(p.angle) * p.orbitDistance;
        p.mesh.position.z = Math.sin(p.angle) * p.orbitDistance;
        p.mesh.rotation.y += p.rotationSpeed * speed;

        if (p.earthMoonPivot && p.earthMoonMesh) {
          p.earthMoonPivot.rotation.y += 0.038 * speed;
          p.earthMoonMesh.rotation.y += 0.012 * speed;
        }
      });

      // 3. Asteroid belt slow drift
      asteroidBelt.rotation.y += 0.001 * speed;

      // 4. Hero Moon rotation
      heroMoonMesh.rotation.y += 0.0012 * speed;
      heroMoonMesh.rotation.x += 0.0004 * speed;

      // 5. Starfield slow universe spin
      starField.rotation.y += 0.00012 * speed;

      // 6. Camera gentle floating breathing motion & Parallax
      const elapsed = clock.getElapsedTime();
      targetCameraX = 16 + mouseX + Math.sin(elapsed * 0.22) * 1.8;
      targetCameraY = 26 + mouseY + Math.cos(elapsed * 0.18) * 1.2;

      camera.position.x += (targetCameraX - camera.position.x) * 0.035;
      camera.position.y += (targetCameraY - camera.position.y) * 0.035;
      camera.lookAt(6, 1, 0);

      if (renderer) {
        renderer.render(scene, camera);
      }
    };

    animate();

    // ==========================================
    // 10. RESIZE LISTENER
    // ==========================================
    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      if (renderer && renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer?.dispose();
    };
  }, [speedMultiplier]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none select-none overflow-hidden ${className}`}
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
};

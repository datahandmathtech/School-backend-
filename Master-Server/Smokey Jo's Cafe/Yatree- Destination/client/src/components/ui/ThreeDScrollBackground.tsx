"use client";

import React, { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "next-themes";

// Dynamic check to prevent SSR crash in Next.js
function ClientOnly({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return <>{children}</>;
}

// 1. Particle Highway (Starry road system that accelerates on scroll)
function ParticleHighway({ scrollY }: { scrollY: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const { theme } = useTheme();
  const particleCount = 800;

  // Generate particles along a winding ribbon path
  const [positions] = useState(() => {
    const arr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const t = i / particleCount;
      const angle = t * Math.PI * 8; // Winding helix / road shape
      const radius = 2.5 + Math.sin(t * Math.PI * 4) * 0.8;
      
      // Add randomness/spread to simulate stars
      const spreadX = (Math.random() - 0.5) * 1.5;
      const spreadY = (Math.random() - 0.5) * 1.5;
      const spreadZ = (Math.random() - 0.5) * 1.5;

      arr[i * 3] = Math.cos(angle) * radius + spreadX;
      arr[i * 3 + 1] = t * 28 - 14 + spreadY; // Winding down the Z axis
      arr[i * 3 + 2] = Math.sin(angle) * radius + spreadZ;
    }
    return arr;
  });

  const elapsedRef = useRef(0);
  useFrame((state, delta) => {
    elapsedRef.current += delta;
    if (pointsRef.current) {
      // Base slow rotation
      pointsRef.current.rotation.y = elapsedRef.current * 0.05;
      
      // Speed up or shift based on scroll
      const targetRotationX = scrollY * 0.0003;
      pointsRef.current.rotation.x = THREE.MathUtils.lerp(
        pointsRef.current.rotation.x,
        targetRotationX,
        0.05
      );
    }
  });

  const isDark = theme === "dark";
  const particleColor = isDark ? "#c5a880" : "#2e4a62"; // Premium Gold vs Classic Navy

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={particleColor}
        size={0.065}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={isDark ? 0.6 : 0.4}
      />
    </Points>
  );
}

// 2. Floating Travel Crystals (Abstract geometric prisms representing travel nodes)
function FloatingCrystals({ scrollY }: { scrollY: number }) {
  const crystal1 = useRef<THREE.Mesh>(null);
  const crystal2 = useRef<THREE.Mesh>(null);
  const crystal3 = useRef<THREE.Mesh>(null);
  const { theme } = useTheme();

  const elapsedRef = useRef(0);
  useFrame((state, delta) => {
    elapsedRef.current += delta;
    const elapsed = elapsedRef.current;
    const scrollFactor = scrollY * 0.001;

    // Smooth floating and rotation responding to scroll
    if (crystal1.current) {
      crystal1.current.rotation.x = elapsed * 0.15 + scrollFactor * 0.5;
      crystal1.current.rotation.y = elapsed * 0.2 + scrollFactor * 0.3;
      crystal1.current.position.y = 2.5 - Math.sin(elapsed * 0.5) * 0.3 - scrollFactor * 1.5;
    }
    if (crystal2.current) {
      crystal2.current.rotation.x = -elapsed * 0.1 - scrollFactor * 0.4;
      crystal2.current.rotation.z = elapsed * 0.25 + scrollFactor * 0.6;
      crystal2.current.position.y = -1.5 + Math.sin(elapsed * 0.4) * 0.2 - scrollFactor * 1.2;
    }
    if (crystal3.current) {
      crystal3.current.rotation.y = -elapsed * 0.2 + scrollFactor * 0.3;
      crystal3.current.rotation.z = -elapsed * 0.15 - scrollFactor * 0.5;
      crystal3.current.position.y = -4.5 + Math.cos(elapsed * 0.6) * 0.4 - scrollFactor * 1.8;
    }
  });

  const isDark = theme === "dark";
  const goldColor = isDark ? "#dfb06c" : "#bca374";
  const accentColor = isDark ? "#3b82f6" : "#475569";

  return (
    <group>
      {/* Node 1: Luxury Diamond / Crystal (Top Page Section) */}
      <Float speed={2.5} floatIntensity={1} rotationIntensity={0.5}>
        <mesh ref={crystal1} position={[2.5, 2.5, -2]}>
          <octahedronGeometry args={[0.9, 0]} />
          <MeshDistortMaterial
            color={goldColor}
            roughness={0.1}
            metalness={0.9}
            distort={0.2}
            speed={2}
            wireframe
          />
        </mesh>
      </Float>

      {/* Node 2: Concentric Navigation Ring (Mid Page Section) */}
      <Float speed={2} floatIntensity={0.8} rotationIntensity={1}>
        <mesh ref={crystal2} position={[-2.8, -1.5, -3]}>
          <torusGeometry args={[0.8, 0.15, 8, 32]} />
          <meshStandardMaterial
            color={accentColor}
            roughness={0.2}
            metalness={0.8}
            wireframe
          />
        </mesh>
      </Float>

      {/* Node 3: Travel Compass Prism (Footer Section) */}
      <Float speed={3} floatIntensity={1.2} rotationIntensity={0.8}>
        <mesh ref={crystal3} position={[1.8, -4.5, -1]}>
          <tetrahedronGeometry args={[0.8, 0]} />
          <MeshDistortMaterial
            color={goldColor}
            roughness={0.15}
            metalness={0.95}
            distort={0.15}
            speed={1.5}
          />
        </mesh>
      </Float>
    </group>
  );
}

// 3. Smooth Camera Manager (Lerps camera angle and zoom along scroll depth)
function CameraController({ scrollY }: { scrollY: number }) {
  const { camera } = useThree();

  useFrame(() => {
    // Dynamically calculate camera Z depth and horizontal pan based on scroll
    const targetZ = 6 + (scrollY * 0.001);
    const targetY = -(scrollY * 0.005);
    const targetX = Math.sin(scrollY * 0.0005) * 0.8;

    // Smoothly interpolate the camera positions
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);

    // Keep camera looking slightly ahead
    camera.lookAt(0, targetY - 0.5, -4);
  });

  return null;
}

// 4. Main 3D Scroll Background Component
export default function ThreeDScrollBackground() {
  const [scrollY, setScrollY] = useState(0);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDark = theme === "dark";

  return (
    <div 
      className="fixed inset-0 -z-20 overflow-hidden pointer-events-none transition-colors duration-500"
      style={{
        background: isDark 
          ? "radial-gradient(circle at 50% 50%, #0c1524 0%, #030712 100%)" 
          : "radial-gradient(circle at 50% 50%, #fcfbf9 0%, #f3ede2 100%)",
      }}
    >
      <ClientOnly>
        <Canvas
          camera={{ position: [0, 0, 6], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={isDark ? 0.35 : 0.8} />
          
          {/* Glowing spotlights highlighting the 3D abstract models */}
          <directionalLight 
            position={[5, 10, 5]} 
            intensity={isDark ? 1.5 : 2.0} 
            color={isDark ? "#fbe3b5" : "#ffffff"} 
          />
          <pointLight 
            position={[-5, -5, -5]} 
            intensity={isDark ? 0.8 : 0.5} 
            color={isDark ? "#3b82f6" : "#dfb06c"} 
          />

          <Suspense fallback={null}>
            <ParticleHighway scrollY={scrollY} />
            <FloatingCrystals scrollY={scrollY} />
            <CameraController scrollY={scrollY} />
          </Suspense>
        </Canvas>
      </ClientOnly>
    </div>
  );
}

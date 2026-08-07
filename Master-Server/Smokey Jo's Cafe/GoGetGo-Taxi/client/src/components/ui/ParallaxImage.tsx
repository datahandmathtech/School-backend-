"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ParallaxImage({ src, alt, className = "" }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Track scroll coordinates relative to the viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Smooth scroll data with spring physics for high-end rendering
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 20,
    stiffness: 100,
    mass: 0.1
  });

  // 1. 2D Parallax movement of the inner image
  const y = useTransform(smoothProgress, [0, 1], ["-12%", "12%"]);
  
  // 2. 3D Tilt: Tilts forward on entry, aligns in center, tilts backward on exit
  const rotateX = useTransform(smoothProgress, [0, 0.5, 1], [10, 0, -10]);
  
  // 3. 3D Scale: Subtle organic zoom at the center of the viewport
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <motion.div 
      ref={ref} 
      style={{
        transformPerspective: 1200, // Enables 3D perspective camera view
        rotateX,
        scale,
      }}
      className={`relative overflow-hidden rounded-[2.5rem] shadow-2xl border border-white/10 will-change-transform ${className}`}
    >
      <motion.div style={{ y, height: "124%", top: "-12%" }} className="absolute inset-0 w-full">
        <Image 
          src={src} 
          alt={alt} 
          fill 
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </motion.div>
      
      {/* Subtle Border Glow instead of heavy gradients */}
      <div className="absolute inset-0 rounded-[2.5rem] border border-white/20 pointer-events-none shadow-inner" />
    </motion.div>
  );
}

"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

interface ThreeDScrollWrapperProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number; // Maximum rotation angle in degrees
}

export default function ThreeDScrollWrapper({
  children,
  className = "",
  intensity = 12
}: ThreeDScrollWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Track scroll position of the element relative to the viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Smooth the scroll coordinate updates using Framer Motion springs
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 25,
    stiffness: 120,
    mass: 0.1
  });

  // 3D Transforms based on viewport entry/exit
  // 1. rotateX: Tilts forward as it enters, flattens in center, tilts backward as it exits
  const rotateX = useTransform(smoothProgress, [0, 0.5, 1], [intensity, 0, -intensity]);
  
  // 2. scale: Subtle organic breathing size shift
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.93, 1, 0.93]);
  
  // 3. translateZ: Slides back in 3D space during entrance/exit
  const translateZ = useTransform(smoothProgress, [0, 0.5, 1], [-80, 0, -80]);
  
  // 4. opacity: Smooth fade in/out near viewport edges
  const opacity = useTransform(smoothProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={ref}
      style={{
        transformPerspective: 1200, // Enables 3D perspective camera view
        rotateX,
        scale,
        translateZ,
        opacity,
      }}
      className={`relative will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}

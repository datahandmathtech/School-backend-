"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import useMousePosition from "@/hooks/useMousePosition";

export default function InteractiveBackground() {
  const { x, y } = useMousePosition();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const springConfig = { damping: 25, stiffness: 150 };
  const mouseX = useSpring(x, springConfig);
  const mouseY = useSpring(y, springConfig);

  const rotateX = useTransform(mouseY, [0, 1000], [5, -5]);
  const rotateY = useTransform(mouseX, [0, 1000], [-5, 5]);
  
  const blob2X = useTransform(mouseX, (v: number) => -v + 1000);
  const blob2Y = useTransform(mouseY, (v: number) => -v + 1000);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Mesh Gradient Blobs */}
      <motion.div 
        style={{ 
          x: mouseX, 
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="absolute top-0 left-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] opacity-50"
      />
      <motion.div 
        style={{ 
          x: blob2X, 
          y: blob2Y,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] opacity-30"
      />

      {/* Static Noise Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] brightness-100 contrast-150" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white opacity-20" />
    </div>
  );
}

"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import KineticTitle from "../ui/KineticTitle";
import { ChevronRight, Phone } from "lucide-react";
import Link from "next/link";

export default function PremiumHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[100dvh] w-full overflow-hidden bg-midnight flex items-center py-24 md:py-32"
    >
      {/* Background Image with Parallax */}
      <motion.div 
        style={{ y, scale }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/premium_udaipur_taxi_hero_1778818369975.png"
          alt="Premium Udaipur Taxi Service"
          fill
          priority
          className="object-cover object-center brightness-[0.6] contrast-[1.1]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/40 via-transparent to-midnight" />
      </motion.div>

      {/* Content */}
      <div className="container-custom relative z-10">
        <motion.div
          style={{ opacity }}
          className="max-w-4xl"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] mb-8 tracking-tight"
          >
            Experience Udaipur with <br className="hidden md:block" />
            <span className="text-gold-premium">Unmatched Luxury</span> & Elegance
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="text-lg md:text-xl text-slate-200/80 max-w-2xl mb-10 leading-relaxed font-light"
          >
            From airport transfers to majestic palace tours, Yatree Destination provides a curated travel experience defined by comfort, punctuality, and the spirit of Rajasthan.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            className="flex flex-wrap gap-4"
          >
            <Link href="/booking/car" className="group flex items-center justify-center relative h-14 px-8 rounded-full overflow-hidden bg-gold-premium text-midnight font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
              <span className="relative z-10 flex items-center gap-2">
                Book Your Ride <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
            
            <a 
              href="tel:+917627013579"
              className="h-14 px-8 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white font-bold flex items-center gap-2 transition-all hover:bg-white/10 hover:border-white/40 active:scale-95"
            >
              <Phone className="w-4 h-4 text-gold-premium" /> Contact Us
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Gradient Decor */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-midnight to-transparent pointer-events-none" />
      
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Discover</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-gold-premium to-transparent" />
      </motion.div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Phone, ChevronDown, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Magnetic from "@/components/ui/Magnetic";
import KineticTitle from "@/components/ui/KineticTitle";
import InteractiveBackground from "@/components/ui/InteractiveBackground";

export default function Hero() {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      window.scrollTo({
        top: aboutSection.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative h-[100svh] min-h-[800px] w-full flex items-center justify-center overflow-hidden bg-[#020617]">
      <InteractiveBackground />
      
      {/* Cinematic Background */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.6 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <Image 
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80"
          alt="Luxury Car Service Udaipur"
          fill
          sizes="100vw"
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/90 via-transparent to-[#020617]" />
      </motion.div>

      <div className="container relative z-10 mx-auto px-6 h-full flex flex-col justify-center">
        <div className="text-center flex flex-col items-center">
          {/* Subtitle */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-8"
          >
            <span className="px-6 py-3 rounded-full glass-premium text-primary font-black uppercase tracking-[0.4em] text-[10px] md:text-xs">
              Elite Luxury Travel
            </span>
          </motion.div>

          <KineticTitle 
            text="ROYAL HOSPITALITY ON WHEELS."
            className="text-5xl md:text-8xl lg:text-[7.5rem] font-black text-white leading-[0.9] tracking-tighter mb-10 uppercase text-center justify-center"
            stagger={0.08}
          />

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-12 font-light"
          >
            Redefining premium transportation in Udaipur. We bridge the gap between elegance and efficiency for weddings, corporate events, and outstation tours.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-8 justify-center items-center"
          >
            <Magnetic>
              <a href="tel:+917627013579" className="group relative bg-primary text-white px-12 py-6 rounded-full font-black text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(var(--color-primary),0.4)] hover:shadow-primary/40 active:scale-95">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative z-10 flex items-center gap-2">
                   <Phone className="w-4 h-4" /> Book Now
                </span>
              </a>
            </Magnetic>

            <Magnetic>
              <Link href="/contact" className="group text-white font-black text-sm uppercase tracking-[0.2em] flex items-center gap-3 hover:text-primary transition-colors">
                Explore Fleet <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </Magnetic>
          </motion.div>
        </div>
      </div>

      {/* Cinematic Bottom Bar */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-0 w-full px-12 hidden lg:flex justify-between items-end border-b border-white/5 pb-12"
      >
        <div className="space-y-2">
          <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Based in Udaipur</p>
          <p className="text-xs font-bold text-white/60 uppercase tracking-widest">Available 24/7 Nationwide</p>
        </div>
        <div className="flex gap-12">
          {["Punctuality", "Privacy", "Professionalism"].map((trait) => (
            <div key={trait} className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-primary/80 shadow-[0_0_10px_var(--primary)]" />
              <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">{trait}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.button 
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/20 hover:text-white flex flex-col items-center gap-2 transition-colors z-20"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.button>
    </section>
  );
}

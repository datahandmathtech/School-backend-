"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DetailedAbout from "@/components/sections/DetailedAbout";
import ERickshawSection from "@/components/sections/ERickshawSection";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Testimonials from "@/components/sections/Testimonials";
import { Phone, MessageCircle, Sparkles, Shield, Compass, Star } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import KineticTitle from "@/components/ui/KineticTitle";
import ThreeDScrollWrapper from "@/components/ui/ThreeDScrollWrapper";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-transparent selection:bg-gold-premium selection:text-white pt-24 md:pb-0 pb-16">
      <Navbar />
      
      {/* Page Header - Redesigned for Premium Aesthetic with Transparency */}
      <div className="relative h-[60vh] md:h-[75vh] flex items-center justify-center overflow-hidden bg-transparent">
         {/* Background Parallax Image with soft transparent overlay */}
         <motion.div 
           initial={{ scale: 1.1 }}
           animate={{ scale: 1 }}
           transition={{ duration: 1.5, ease: "easeOut" }}
           className="absolute inset-0 z-0"
         >
           <Image 
             src="/udaipur_atmospheric_about_bg_1778820777543.png"
             alt="Atmospheric Udaipur Skyline"
             fill
             className="object-cover brightness-[0.3] contrast-[1.05]"
           />
           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-transparent" />
         </motion.div>

         <div className="container mx-auto px-6 relative z-10 text-center">
            <Reveal width="100%">
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-gold-premium/30 bg-gold-premium/10 backdrop-blur-md mb-8">
                <div className="w-2 h-2 rounded-full bg-gold-premium animate-pulse" />
                <span className="text-gold-premium font-black uppercase tracking-[0.4em] text-[10px]">
                  Elite Travel Excellence
                </span>
              </div>
            </Reveal>

            <KineticTitle 
              text="About Yatree Destination."
              className="text-4xl sm:text-6xl md:text-8xl font-black text-white tracking-tight mb-8 leading-[0.9] justify-center"
              stagger={0.06}
            />

            <Reveal delay={0.6} width="100%">
              <p className="text-slate-200 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed font-light mt-8 opacity-90">
                Udaipur's premier travel partner, combining traditional Rajasthani hospitality with state-of-the-art modern logistics and a deep commitment to sustainable carbon-neutral tourism.
              </p>
            </Reveal>
         </div>
      </div>

      {/* RICH STORY CONTENT ADDITION (Legacy & Stats) */}
      <ThreeDScrollWrapper>
        <section className="py-24 max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md">
              <Shield className="w-10 h-10 text-gold-premium mb-6" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">Uncompromising Safety</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-light">
                Every vehicle is deep-sanitized before trips, equipped with active tracking systems, and operated by seasoned local chauffeurs verified by local transport registries.
              </p>
            </div>
            
            <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md">
              <Compass className="w-10 h-10 text-gold-premium mb-6" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">Heritage Knowledge</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-light">
                Our chauffeurs are not just drivers, but licensed storytellers fluent in history. Explore ancient palaces, hidden lakes, and organic handicraft guilds with local experts.
              </p>
            </div>

            <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md">
              <Sparkles className="w-10 h-10 text-gold-premium mb-6" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">Bespoke Concierge</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-light">
                Whether you need special flower arrangements for weddings, high-speed Wi-Fi hubs for corporate routes, or mineral water packs, our concierge caters to every minute detail.
              </p>
            </div>
          </div>
        </section>
      </ThreeDScrollWrapper>

      <ThreeDScrollWrapper>
        <DetailedAbout />
      </ThreeDScrollWrapper>

      <ThreeDScrollWrapper>
        <ERickshawSection />
      </ThreeDScrollWrapper>

      <ThreeDScrollWrapper>
        <WhyChooseUs />
      </ThreeDScrollWrapper>

      <ThreeDScrollWrapper>
        <Testimonials />
      </ThreeDScrollWrapper>

      <Footer />

      {/* Global CTAs */}
      <div className="fixed bottom-8 right-8 z-[90] hidden md:block">
         <a href="https://wa.me/917627013579" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(37,211,102,0.4)] hover:scale-110 transition-all duration-300">
            <MessageCircle className="w-6 h-6 fill-current" />
         </a>
      </div>
      <div className="fixed bottom-0 left-0 w-full z-[100] md:hidden flex border-t border-slate-200 bg-white">
        <a href="tel:+917627013579" className="flex-1 bg-slate-900 text-white flex items-center justify-center gap-2 py-4 font-bold text-sm uppercase"><Phone className="w-4 h-4 text-orange-500" /> Call Now</a>
        <a href="https://wa.me/917627013579" className="flex-1 bg-[#25D366] text-white flex items-center justify-center gap-2 py-4 font-bold text-sm uppercase"><MessageCircle className="w-4 h-4" /> WhatsApp</a>
      </div>
    </main>
  );
}

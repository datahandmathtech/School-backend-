"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import { Phone, MessageCircle } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function TempoTravellerPage() {
  return (
    <main className="relative min-h-screen bg-slate-50 selection:bg-orange-500 selection:text-white pt-24 md:pb-0 pb-16">
      <Navbar />
      
      {/* 1. Epic Group Hero */}
      <section className="relative bg-slate-900 py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80" 
            alt="Tempo Traveller in Udaipur - Luxury Group Transport" 
            fill 
            priority
            className="object-cover opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/40 to-slate-50" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
             <span className="text-orange-500 font-bold uppercase tracking-[0.2em] text-xs mb-6 block">Luxury Group Mobility</span>
             <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-8 leading-[1.1]">
               Tempo Traveller <br/> in Udaipur.
             </h1>
             <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
               Traveling with a large group? Book our premium <strong>Maharaja Tempo Travellers</strong> featuring plush push-back seats, LED TVs, and ample luggage space for the ultimate comfort.
             </p>
             <div className="flex flex-wrap justify-center gap-4">
                <a href="tel:+917627013579" className="bg-orange-500 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm flex items-center gap-3 hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20">
                  <Phone className="w-4 h-4" /> Book Group Trip
                </a>
                <a href="https://wa.me/917627013579" className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-white/20 transition-colors flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" /> WhatsApp Quote
                </a>
             </div>
           </motion.div>
        </div>
      </section>


      <Testimonials />
      <FAQ />
      <Footer />

      <div className="fixed bottom-0 left-0 w-full z-[100] md:hidden flex border-t border-slate-200 bg-white">
        <a href="tel:+917627013579" className="flex-1 bg-slate-900 text-white flex items-center justify-center gap-2 py-4 font-bold text-sm uppercase"><Phone className="w-4 h-4 text-orange-500" /> Call Now</a>
        <a href="https://wa.me/917627013579" className="flex-1 bg-[#25D366] text-white flex items-center justify-center gap-2 py-4 font-bold text-sm uppercase"><MessageCircle className="w-4 h-4" /> WhatsApp</a>
      </div>
    </main>
  );
}

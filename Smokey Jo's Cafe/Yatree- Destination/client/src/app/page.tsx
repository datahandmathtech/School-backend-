import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/PremiumHero";
import DetailedAbout from "@/components/sections/DetailedAbout";
import { Reveal } from "@/components/ui/Reveal";

import { Phone, MessageCircle } from "lucide-react";

// Dynamic imports for below-the-fold components to improve initial load speed
const WhyChooseUs = dynamic(() => import("@/components/sections/WhyChooseUs"), { ssr: true });
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"), { ssr: true });
const FAQ = dynamic(() => import("@/components/sections/FAQ"), { ssr: true });
const Footer = dynamic(() => import("@/components/layout/Footer"), { ssr: true });

export default function Home() {
  return (
    <main className="relative min-h-screen bg-transparent selection:bg-gold-premium selection:text-midnight overflow-x-hidden">
      {/* 1. Navigation & Hero - Critical for LCP */}

      <Navbar />
      <Hero />

      <DetailedAbout />
      <WhyChooseUs />
      <Testimonials />
      <FAQ />

      <Footer />

      {/* ------------------------------------------- */}
      {/* GLOBAL CTAS (LEAD GENERATION OPTIMIZATIONS) */}
      {/* ------------------------------------------- */}

      {/* Mobile Sticky Action Bar (Hidden on Desktop) */}
      <div className="fixed bottom-0 left-0 w-full z-[80] md:hidden flex border-t border-white/10 bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        <a
          href="tel:+917627013579"
          className="flex-1 bg-midnight text-white flex items-center justify-center gap-2 py-4 font-bold text-xs uppercase tracking-widest border-r border-white/5"
        >
          <Phone className="w-4 h-4 text-gold-premium" /> Call Now
        </a>
        <a
          href="https://wa.me/917627013579"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-[#25D366] text-white flex items-center justify-center gap-2 py-4 font-bold text-xs uppercase tracking-widest"
        >
          <MessageCircle className="w-4 h-4" /> WhatsApp
        </a>
      </div>

    </main>
  );
}

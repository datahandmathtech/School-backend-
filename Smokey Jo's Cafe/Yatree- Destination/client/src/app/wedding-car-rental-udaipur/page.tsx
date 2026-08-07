"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import { Phone, MessageCircle, Heart, Star, CheckCircle2, MapPin, Sparkles, Music, Users, Car } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import ThreeDScrollWrapper from "@/components/ui/ThreeDScrollWrapper";

const FAQ = dynamic(() => import("@/components/sections/FAQ"), { ssr: true });

export default function WeddingCarPage() {
  return (
    <main className="relative min-h-screen bg-transparent selection:bg-gold-premium selection:text-white pt-20 md:pb-0 pb-16">
      <Navbar />
      
      {/* 1. Luxury Wedding Hero - Transparent */}
      <section className="relative bg-transparent py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80" 
            alt="Luxury Wedding Car Rental Udaipur - Decorated Premium Sedan" 
            fill 
            priority
            className="object-cover opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-transparent" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
             <span className="text-gold-premium font-bold uppercase tracking-[0.3em] text-xs mb-6 block">Elegance in Every Mile</span>
             <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-8 leading-[1.1]">
               Wedding Car <br/> Rental Udaipur.
             </h1>
             <p className="text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed mb-10 font-light">
               Arrive in breathtaking style on your big day. We specialize in luxury transportation for <strong>destination weddings in Udaipur</strong>, from royal vintage cars to premium guest convoys.
             </p>
             <div className="flex flex-wrap justify-center gap-4">
                <a href="tel:+917627013579" className="bg-gold-premium text-midnight px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm flex items-center gap-3 hover:bg-white transition-colors shadow-lg shadow-gold-premium/20">
                  <Phone className="w-4 h-4" /> Get Wedding Quote
                </a>
                <a href="https://wa.me/917627013579" className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-white/20 transition-colors flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" /> WhatsApp Planner
                </a>
             </div>
           </motion.div>
        </div>
      </section>

      {/* ADDITIONAL WEDDING FLEET CONTENT DETAILS */}
      <ThreeDScrollWrapper>
        <section className="py-24 max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-gold-premium font-bold uppercase tracking-[0.3em] text-[10px]">Royal Wedding Fleet</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white uppercase mt-2 tracking-tight">Select Your Wedding Carriage</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Vintage Royale */}
            <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-md">
              <Car className="w-10 h-10 text-gold-premium mb-6" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 uppercase tracking-wider">Royal Vintage Cars</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-light mb-6">
                 Timeless classics perfect for the Baraat and grand Vidai ceremonies. Highly polished and beautifully flower-decorated to fit royal themes.
              </p>
              <span className="text-xs font-bold text-gold-premium tracking-widest uppercase">From ₹25,000 / Day</span>
            </div>

            {/* Premium Luxury */}
            <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-md">
              <Sparkles className="w-10 h-10 text-gold-premium mb-6" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 uppercase tracking-wider">Mercedes & Audi</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-light mb-6">
                Modern high-end sedans providing unmatched luxury, plush leather interiors, and silent air-conditioning to keep you perfectly relaxed.
              </p>
              <span className="text-xs font-bold text-gold-premium tracking-widest uppercase">From ₹18,000 / Day</span>
            </div>

            {/* Guest Shuttles */}
            <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-md">
              <Users className="w-10 h-10 text-gold-premium mb-6" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 uppercase tracking-wider">Luxury Tempo Travellers</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-light mb-6">
                Plush push-back seats and high-capacity luxury coaches for premium guest transport from airport to hotels and reception venues.
              </p>
              <span className="text-xs font-bold text-gold-premium tracking-widest uppercase">From ₹5,500 / Day</span>
            </div>
          </div>
        </section>
      </ThreeDScrollWrapper>

      {/* 2. Wedding SEO Content */}
      <ThreeDScrollWrapper>
        <section className="py-24 bg-transparent">
        <div className="container mx-auto px-6 max-w-6xl">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              
              <div className="lg:col-span-8">
                 <div className="prose prose-lg prose-slate max-w-none text-slate-600">
                    <h2 className="text-3xl font-black text-slate-900 mb-6">Udaipur Destination Wedding Transportation Experts</h2>
                    <p className="leading-relaxed mb-6">
                      Udaipur is globally recognized as the premier destination for royal weddings. Hosting a wedding at icons like <strong>Jagmandir Island Palace, The Leela Palace, or Zenana Mahal</strong> requires meticulous logistics. At Yatree Destination, we take the stress out of guest movement. We are the most trusted partner for <strong>wedding car rental in Udaipur</strong>, managing everything from airport transfers to baraat processions.
                    </p>

                    <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Luxury Cars for the Couple: Vintage & Modern Classics</h3>
                    <p className="mb-6">
                      Every couple deserves a grand entrance. We offer a curated fleet of <strong>luxury wedding cars in Udaipur</strong>. Whether you want the timeless elegance of a <strong>Vintage car</strong> for your vidai or a modern luxury sedan like an Audi or Mercedes for your arrival, we ensure the vehicle is decorated to match your wedding theme.
                    </p>

                    <div className="bg-orange-50 p-8 rounded-3xl border border-orange-100 my-10">
                       <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                         <Sparkles className="w-5 h-5 text-orange-500" /> Wedding Special Services:
                       </h4>
                       <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-medium text-slate-700">
                          <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-orange-500" /> Flower Decorated Baraat Cars</li>
                          <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-orange-500" /> Luxury Guest Shuttles</li>
                          <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-orange-500" /> Uniformed Chauffeurs</li>
                          <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-orange-500" /> Airport Help-Desk Setup</li>
                          <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-orange-500" /> 24/7 Dedicated Logistics Manager</li>
                          <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-orange-500" /> Venue-to-Venue Transfers</li>
                       </ul>
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Guest Logistics: Tempo Travellers & Luxury Coaches</h3>
                    <p className="mb-6">
                      Managing 200+ guests across multiple venues can be a nightmare. Our <strong>wedding guest transportation Udaipur</strong> service simplifies this. We provide a fleet of luxury <strong>Tempo Travellers (12, 17, 26 seaters)</strong> and 45-seater coaches to ensure your guests travel together and arrive on time for every function, from the Mehndi to the Sangeet.
                    </p>

                    <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Why Planners Trust Yatree Destination</h3>
                    <p className="mb-6">
                      We have worked with the top <strong>destination wedding planners in Udaipur</strong>. They value our "Buffer Policy" where we always keep standby vehicles ready for last-minute guest requests. When you search for <strong>wedding taxi service Udaipur</strong>, you're looking for reliability, and that is what we have delivered for over 500+ successful weddings.
                    </p>
                 </div>
              </div>

              <div className="lg:col-span-4">
                 <div className="sticky top-24 space-y-8">
                    
                    <div className="bg-slate-900 p-8 rounded-[2rem] text-white shadow-2xl border border-orange-500/20">
                       <h4 className="text-xl font-bold mb-6 text-orange-500">Wedding Package Highlights</h4>
                       <div className="space-y-6">
                          <div className="flex items-start gap-4">
                             <Heart className="w-6 h-6 text-orange-500 shrink-0" />
                             <div>
                                <span className="block font-bold">Bridal Special</span>
                                <span className="text-sm text-slate-400">Exclusive luxury car for the bride.</span>
                             </div>
                          </div>
                          <div className="flex items-start gap-4">
                             <Users className="w-6 h-6 text-orange-500 shrink-0" />
                             <div>
                                <span className="block font-bold">Guest Logistics</span>
                                <span className="text-sm text-slate-400">Bulk airport & venue shuttles.</span>
                             </div>
                          </div>
                          <div className="flex items-start gap-4">
                             <Music className="w-6 h-6 text-orange-500 shrink-0" />
                             <div>
                                <span className="block font-bold">Baraat Convoy</span>
                                <span className="text-sm text-slate-400">Coordinated luxury fleet movement.</span>
                             </div>
                          </div>
                       </div>
                       <a href="tel:+917627013579" className="w-full bg-orange-500 py-4 rounded-xl text-center font-bold uppercase tracking-widest text-xs mt-10 block hover:bg-orange-600 transition-colors">
                          Get Personalized Quote
                       </a>
                    </div>

                    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                       <h4 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                          <MapPin className="w-5 h-5 text-orange-500" /> Serving All Venues:
                       </h4>
                       <p className="text-xs text-slate-500 leading-relaxed">
                         City Palace (Zenana Mahal), Jagmandir, Udai Vilas, Leela Palace, Raffles Udaipur, Aurika, Chunda Palace, and all premium resorts in Udaipur.
                       </p>
                    </div>

                 </div>
              </div>

           </div>
        </div>
      </section>
      </ThreeDScrollWrapper>
      <WhyChooseUs />
      <FAQ />
      <Footer />

      <div className="fixed bottom-0 left-0 w-full z-[100] md:hidden flex border-t border-slate-200 bg-white">
        <a href="tel:+917627013579" className="flex-1 bg-slate-900 text-white flex items-center justify-center gap-2 py-4 font-bold text-sm uppercase tracking-widest"><Phone className="w-4 h-4 text-orange-500" /> Call Now</a>
        <a href="https://wa.me/917627013579" className="flex-1 bg-[#25D366] text-white flex items-center justify-center gap-2 py-4 font-bold text-sm uppercase tracking-widest"><MessageCircle className="w-4 h-4" /> WhatsApp</a>
      </div>
    </main>
  );
}

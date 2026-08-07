"use client";

import { useState, useRef, Suspense, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { 
  Phone, 
  MessageCircle, 
  Briefcase, 
  Car, 
  Bus, 
  Users, 
  Settings,
  Sparkles,
  ChevronRight,
  Check,
  Calendar,
  MapPin,
  Mail,
  User,
  Navigation,
  Star,
  CheckCircle2,
  FileText,
  Building
} from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { VEHICLES, type Vehicle } from "@/lib/corporateVehicles";



function CorporateBookingEngine() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");

  const [activeTab, setActiveTab] = useState<"car" | "bus">(
    typeParam === "bus" || typeParam === "tempo" ? "bus" : "car"
  );

  // Sync state if search params change externally (e.g. browser navigation)
  useEffect(() => {
    if (typeParam === "bus" || typeParam === "tempo") {
      setActiveTab("bus");
    } else if (typeParam === "car") {
      setActiveTab("car");
    }
  }, [typeParam]);

  const filteredVehicles = VEHICLES.filter(v => v.type === activeTab);

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Luminous Title Block */}
        <div className="text-center mb-12">
          <span className="text-gold-premium font-bold uppercase tracking-[0.25em] text-xs mb-3 block">Corporate Fleet Showcase</span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight uppercase leading-none">Our Premium Fleet</h2>
          <p className="text-slate-500 mt-3 text-xs md:text-sm font-medium">Click "Reserve Priority Ride" to request custom corporate tariffs with VIP YATREE plates.</p>
        </div>

        {/* Minimal iOS-style Tab Switcher */}
        <div className="flex justify-center mb-16">
          <div className="bg-slate-100/60 backdrop-blur border border-slate-200/60 p-1.5 rounded-2xl flex gap-1 shadow-sm max-w-[280px] w-full">
            <Link
              href="/corporate-travel-udaipur?type=car"
              scroll={false}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${activeTab === 'car' ? 'bg-white text-slate-950 shadow-md border border-slate-200/40 font-bold' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <Car className="w-3.5 h-3.5" />
              Car
            </Link>
            <Link
              href="/corporate-travel-udaipur?type=bus"
              scroll={false}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${activeTab === 'bus' ? 'bg-white text-slate-950 shadow-md border border-slate-200/40 font-bold' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <Bus className="w-3.5 h-3.5" />
              Tempo Traveller
            </Link>
          </div>
        </div>

        {/* Luminous Showroom Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredVehicles.map((vehicle) => {
            return (
              <div
                key={vehicle.id}
                className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.01)] flex flex-col justify-between transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:border-gold-premium/20"
              >
                {/* Cinematic Product Frame */}
                <div className="relative h-64 w-full bg-slate-900 overflow-hidden shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent z-10 pointer-events-none" />
                  
                  <img 
                    src={vehicle.image} 
                    alt={vehicle.name} 
                    className="w-full h-full object-cover relative z-0 transition-transform duration-700 group-hover:scale-[1.08]" 
                  />

                  {/* Premium Badge tag */}
                  <div className="absolute top-5 left-5 z-20">
                    <span className="bg-amber-500/10 backdrop-blur-md border border-amber-500/25 text-amber-700 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 text-amber-600 fill-current" />
                      {vehicle.tag}
                    </span>
                  </div>

                  {/* Seat details */}
                  <div className="absolute bottom-5 left-5 z-20 flex gap-2">
                    <span className="bg-slate-950 text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                      <Users className="w-3.5 h-3.5 text-gold-premium" />
                      {vehicle.seats}
                    </span>
                    <span className="bg-white border border-slate-200/80 text-slate-700 text-xs font-bold tracking-wider uppercase px-3 py-1.5 rounded-full shadow-sm">
                      PLATE: YATREE
                    </span>
                  </div>
                </div>

                {/* Showroom Content */}
                <div className="p-8 flex-1 flex flex-col justify-between text-left">
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-gold-premium transition-colors duration-300 uppercase tracking-tight mb-2">
                      {vehicle.name}
                    </h3>
                    <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-medium mb-5">
                      {vehicle.description}
                    </p>
                    
                    {/* Features capsule list */}
                    <div className="flex flex-wrap gap-1.5">
                      {vehicle.features.slice(0, 3).map((feat, i) => (
                        <span key={i} className="text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200/60 px-3 py-1 rounded-full">
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={`/corporate-travel-udaipur/booking?vehicleId=${vehicle.id}`}
                    className="w-full bg-slate-950 group-hover:bg-gold-premium text-white group-hover:text-midnight font-black text-xs md:text-sm uppercase tracking-widest py-4 rounded-xl transition-all duration-300 mt-6 flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] cursor-pointer"
                  >
                    Reserve Priority Ride
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function CorporateTravelPage() {
  return (
    <main className="relative min-h-screen bg-slate-50 selection:bg-gold-premium selection:text-midnight pt-20">
      <Navbar />
      
      {/* 1. Luminous Premium Hero */}
      <section className="hidden md:block relative bg-gradient-to-b from-slate-50 via-white to-slate-50 py-32 overflow-hidden text-center">
        {/* Abstract Glowing Blobs */}
        <div className="absolute top-0 left-1/4 w-full max-w-[500px] h-[500px] bg-gradient-to-tr from-amber-200/10 to-gold-premium/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-full max-w-[400px] h-[400px] bg-gradient-to-tr from-gold-premium/5 to-transparent rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
           <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
             <span className="bg-gold-premium/10 border border-gold-premium/25 text-gold-premium font-black uppercase tracking-[0.25em] text-[9px] px-4 py-1.5 rounded-full mb-6 inline-flex items-center gap-1.5">
               <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Business Class Mobility
             </span>
             <h1 className="text-4xl md:text-7xl font-black text-slate-950 tracking-tighter mb-8 leading-[1.1] uppercase">
               Corporate Travel <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-950 via-slate-800 to-gold-premium">Udaipur</span>
             </h1>
             <p className="text-xs md:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed mb-10 font-medium">
               Experience the gold standard in corporate transportation. From VIP client transfers to monthly fleet management, we provide <strong>corporate cab services in Udaipur</strong> with GST compliance, professional drivers, and pristine showroom vehicles.
             </p>
             </motion.div>
        </div>
      </section>

      {/* 2. Interactive B2B Fleet Showcase */}
      <section id="showroom" className="py-24 bg-transparent text-center border-t border-slate-200/50">
        <Suspense fallback={
          <div className="container mx-auto px-6 py-20 text-center">
            <div className="w-12 h-12 border-4 border-gold-premium border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Loading Corporate Showcase...</p>
          </div>
        }>
          <CorporateBookingEngine />
        </Suspense>
      </section>

      {/* 3. Luxury B2B Perks Grid */}
      <section className="py-24 bg-white border-y border-slate-200/50 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] h-[300px] bg-gradient-to-tr from-amber-100/10 to-transparent rounded-full blur-[80px] pointer-events-none" />
        
        <div className="container mx-auto px-6 max-w-6xl relative z-10 text-center">
          <div className="text-center mb-16">
            <span className="text-gold-premium font-black uppercase tracking-[0.25em] text-[9px] mb-3 block">Corporate Standards</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight uppercase leading-none">Elite Travel Benefits</h2>
            <p className="text-slate-400 mt-3 text-xs md:text-sm font-medium">Why Udaipur's top business houses and luxury hotels partner with Yatree Destination.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Perk 1 */}
            <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-200/40 shadow-sm text-left hover:border-gold-premium/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/5 flex items-center justify-center text-gold-premium mb-6 border border-gold-premium/10">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="font-black text-slate-900 uppercase tracking-tight text-base mb-2">100% GST Compliance</h4>
              <p className="text-slate-500 text-[11.5px] leading-relaxed font-medium">
                Save 5% to 12% on travel audits. Get fully compliant, instantaneous commercial GST invoices and digital trip logs for your billing convenience.
              </p>
            </div>

            {/* Perk 2 */}
            <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-200/40 shadow-sm text-left hover:border-gold-premium/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/5 flex items-center justify-center text-gold-premium mb-6 border border-gold-premium/10">
                <Star className="w-5 h-5" />
              </div>
              <h4 className="font-black text-slate-900 uppercase tracking-tight text-base mb-2">Elite Chauffeurs</h4>
              <p className="text-slate-500 text-[11.5px] leading-relaxed font-medium">
                Pristine uniformed drivers who are background-verified, highly trained, and fully familiar with corporate and hotel hospitality protocols.
              </p>
            </div>

            {/* Perk 3 */}
            <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-200/40 shadow-sm text-left hover:border-gold-premium/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/5 flex items-center justify-center text-gold-premium mb-6 border border-gold-premium/10">
                <Settings className="w-5 h-5" />
              </div>
              <h4 className="font-black text-slate-900 uppercase tracking-tight text-base mb-2">24/7 Concierge Support</h4>
              <p className="text-slate-500 text-[11.5px] leading-relaxed font-medium">
                Dedicated Account Manager for cost-center accounting, consolidated monthly bills, priority dispatch, and last-minute flight delay adjustments.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Mobile Sticky CTA footer */}
      <div className="fixed bottom-0 left-0 w-full z-[100] md:hidden flex border-t border-slate-200 bg-white">
        <a href="tel:+917627013579" className="flex-1 bg-slate-950 text-white flex items-center justify-center gap-2 py-4.5 font-bold text-xs uppercase tracking-wider"><Phone className="w-4 h-4 text-gold-premium" /> Call Now</a>
        <a href="https://wa.me/917627013579" className="flex-1 bg-[#25D366] text-white flex items-center justify-center gap-2 py-4.5 font-bold text-xs uppercase tracking-wider"><MessageCircle className="w-4 h-4" /> WhatsApp</a>
      </div>
    </main>
  );
}

"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import { Phone, MessageCircle, Clock, ShieldCheck, Plane, MapPin, CheckCircle2, Star, ChevronRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const FAQ = dynamic(() => import("@/components/sections/FAQ"), { ssr: true });

// Note: In a real Next.js app, metadata should be in a separate layout or handled via a server component wrapper if using 'use client'
// For this single-file demonstration, we are focusing on the content structure.

export default function AirportTaxiPage() {
  return (
    <main className="relative min-h-screen bg-slate-50 selection:bg-orange-500 selection:text-white pt-20 md:pb-0 pb-16">
      <Navbar />
      
      {/* 1. SEO Hero Section */}
      <section className="relative bg-slate-900 py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1590362891991-f20bc081e533?auto=format&fit=crop&q=80" 
            alt="Udaipur Airport Taxi Service - Toyota Etios" 
            fill 
            priority
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/40 to-slate-50" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
             <span className="text-orange-500 font-bold uppercase tracking-[0.2em] text-xs mb-6 block">On-Time, Every Time</span>
             <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-8 leading-[1.1]">
               Airport Taxi <br/> Udaipur.
             </h1>
             <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
               Premium 24/7 airport pickup and drop services at <strong>Maharana Pratap Airport (UDA)</strong>. Experience seamless, stress-free transfers with our professional chauffeurs.
             </p>
             <div className="flex flex-wrap justify-center gap-4">
                <a href="tel:+917627013579" className="bg-orange-500 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm flex items-center gap-3 hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20">
                  <Phone className="w-4 h-4" /> Book Airport Cab
                </a>
                <a href="https://wa.me/917627013579" className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-white/20 transition-colors flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" /> WhatsApp Quote
                </a>
             </div>
           </motion.div>
        </div>
      </section>

      {/* 2. Semantic SEO Content */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              
              <div className="lg:col-span-8">
                 <div className="prose prose-lg prose-slate max-w-none text-slate-600">
                    <h2 className="text-3xl font-black text-slate-900 mb-6">The Most Reliable Airport Cab Service in Udaipur</h2>
                    <p className="leading-relaxed mb-6">
                      Maharana Pratap Airport (also known as Udaipur Airport or Dabok Airport) is located approximately 22 kilometers from the main city. Finding a reliable <strong>airport taxi in Udaipur</strong> during peak hours or early morning flights can be challenging. At Yatree Destination, we eliminate this stress. We specialize in point-to-point airport transfers that prioritize your schedule above all else.
                    </p>

                    <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Udaipur Airport Pickup: Meet & Greet Service</h3>
                    <p className="mb-6">
                      When you land, the last thing you want is to haggle with local vendors. Our <strong>Udaipur airport pickup service</strong> includes a complimentary "Meet & Greet." Your chauffeur will be waiting at the arrival gate with a personalized name-card. We monitor all flight arrivals in real-time; if your flight is delayed, we automatically adjust your pickup time at no extra cost.
                    </p>

                    <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 my-10">
                       <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                         <Plane className="w-5 h-5 text-orange-500" /> Why Book Our Airport Cab?
                       </h4>
                       <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-medium text-slate-700">
                          <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Real-time Flight Monitoring</li>
                          <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> 60 Minutes Free Waiting</li>
                          <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Professional Meet & Greet</li>
                          <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Fixed Prices (No Surges)</li>
                          <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Sanitized, AC Luxury Cars</li>
                          <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Doorstep Pickup/Drop</li>
                       </ul>
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Safe Airport Drop in Udaipur for Early Morning Flights</h3>
                    <p className="mb-6">
                      Have a 6:00 AM flight? Our drivers are known for their punctuality. We recommend a pickup time that ensures you reach the airport at least 90 minutes before your departure. Our <strong>airport drop Udaipur</strong> service is used by business executives and families alike who value peace of mind. We serve all areas of Udaipur, including <strong>Nokha, 100 Feet Rd, Mali Colony, Hiran Magri, and Gayariawas</strong>.
                    </p>

                    <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Udaipur Airport Taxi Fare & Transparency</h3>
                    <p className="mb-6">
                      We offer competitive and transparent <strong>Udaipur airport taxi fares</strong>. Unlike app-based aggregators, we don't have "surge pricing." The price you are quoted is the price you pay. Whether you need a swift sedan for two people or an <strong>Innova Crysta</strong> for a family with heavy luggage, we have the right vehicle for your transfer.
                    </p>
                 </div>
              </div>

              <div className="lg:col-span-4">
                 <div className="sticky top-24 space-y-8">
                    
                    <div className="bg-slate-900 p-8 rounded-[2rem] text-white shadow-2xl">
                       <h4 className="text-xl font-bold mb-6">Instant Transfer Quote</h4>
                       <div className="space-y-6">
                          <div className="flex items-start gap-4">
                             <Clock className="w-6 h-6 text-orange-500 shrink-0" />
                             <div>
                                <span className="block font-bold">24/7 Availability</span>
                                <span className="text-sm text-slate-400">Punctual pickups for all flights.</span>
                             </div>
                          </div>
                          <div className="flex items-start gap-4">
                             <MapPin className="w-6 h-6 text-orange-500 shrink-0" />
                             <div>
                                <span className="block font-bold">UDA (Dabok) Experts</span>
                                <span className="text-sm text-slate-400">Regular transit to all major hotels.</span>
                             </div>
                          </div>
                          <div className="flex items-start gap-4">
                             <ShieldCheck className="w-6 h-6 text-orange-500 shrink-0" />
                             <div>
                                <span className="block font-bold">Secure Journey</span>
                                <span className="text-sm text-slate-400">GPS tracked & SOS enabled cars.</span>
                             </div>
                          </div>
                       </div>
                       <a href="tel:+917627013579" className="w-full bg-orange-500 py-4 rounded-xl text-center font-bold uppercase tracking-widest text-xs mt-10 block hover:bg-orange-600 transition-colors">
                          Call Now
                       </a>
                    </div>

                    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                       <h4 className="text-lg font-black text-slate-900 mb-6">Popular Airport Routes:</h4>
                       <ul className="space-y-4 text-sm font-medium text-slate-600">
                          <li className="flex justify-between border-b border-slate-50 pb-2">
                             <span>Airport ↔ City Centre</span>
                             <span className="text-orange-500 font-bold">₹700*</span>
                          </li>
                          <li className="flex justify-between border-b border-slate-50 pb-2">
                             <span>Airport ↔ Nathdwara</span>
                             <span className="text-orange-500 font-bold">₹1500*</span>
                          </li>
                          <li className="flex justify-between border-b border-slate-50 pb-2">
                             <span>Airport ↔ Kumbhalgarh</span>
                             <span className="text-orange-500 font-bold">₹2500*</span>
                          </li>
                          <li className="flex justify-between border-b border-slate-50 pb-2">
                             <span>Airport ↔ Mount Abu</span>
                             <span className="text-orange-500 font-bold">₹3500*</span>
                          </li>
                       </ul>
                       <p className="text-[10px] text-slate-400 mt-4 italic">*Starting prices. Tolls & parking extra.</p>
                    </div>

                 </div>
              </div>

           </div>
        </div>
      </section>

      
      <WhyChooseUs />
      
      {/* 4. Airport FAQ Section (SEO Value) */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 max-w-4xl text-center">
           <h2 className="text-3xl font-black text-slate-900 mb-12">Airport Taxi Udaipur FAQ</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              {[
                { q: "How far is Udaipur Airport from the main city?", a: "Maharana Pratap Airport (UDA) is about 22km from the Udaipur City Palace and main tourist areas. It usually takes 45-60 minutes depending on traffic." },
                { q: "Do you provide late-night airport pickups?", a: "Yes, we operate 24/7. Whether your flight lands at 2:00 AM or 11:00 PM, your driver will be waiting for you." },
                { q: "Is there a charge for flight delays?", a: "No. We monitor all flight statuses. If your flight is delayed, your driver will automatically adjust the pickup time without any additional waiting charges." },
                { q: "Which cars are available for airport transfers?", a: "We offer Sedans (Etios/Dzire) for 2-4 pax and Premium SUVs (Innova Crysta) for larger groups or extra luggage." }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                   <h4 className="font-bold text-slate-900 mb-3">{item.q}</h4>
                   <p className="text-sm text-slate-500 leading-relaxed">{item.a}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      <Footer />

      <div className="fixed bottom-0 left-0 w-full z-[100] md:hidden flex border-t border-slate-200 bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        <a href="tel:+917627013579" className="flex-1 bg-slate-900 text-white flex items-center justify-center gap-2 py-4 font-bold text-sm uppercase tracking-widest"><Phone className="w-4 h-4 text-orange-500" /> Call Now</a>
        <a href="https://wa.me/917627013579" className="flex-1 bg-[#25D366] text-white flex items-center justify-center gap-2 py-4 font-bold text-sm uppercase tracking-widest"><MessageCircle className="w-4 h-4" /> WhatsApp</a>
      </div>
    </main>
  );
}

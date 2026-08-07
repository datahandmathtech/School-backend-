"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EventTransportation from "@/components/sections/EventTransportation";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import { Phone, MessageCircle, Calendar, ShieldCheck, Bus, HelpCircle } from "lucide-react";
import ThreeDScrollWrapper from "@/components/ui/ThreeDScrollWrapper";

export default function EventTransportationPage() {
  return (
    <main className="relative min-h-screen bg-transparent selection:bg-gold-premium selection:text-white pt-24 md:pb-0 pb-16">
      <Navbar />
      
      {/* Page Header - Beautiful and Transparent */}
      <div className="bg-slate-900/40 backdrop-blur-md py-24 px-6 text-center border-b border-white/5">
         <span className="text-gold-premium font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Scalable Logistics</span>
         <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4">Event Transportation Udaipur</h1>
         <p className="text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
           Moving hundreds of guests seamlessly. We are the preferred high-capacity travel partner for major festivals, royal weddings, corporate summits, and VIP handling in Udaipur.
         </p>
      </div>

      {/* RICH EVENT LOGISTICS CONTENT GRID */}
      <ThreeDScrollWrapper>
        <section className="py-20 max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
             <span className="text-gold-premium font-bold uppercase tracking-[0.2em] text-[10px]">Strategic Fleet Management</span>
             <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white uppercase mt-2 tracking-tight">Our Specialized Event Services</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md hover:border-gold-premium/30 transition-all duration-300">
              <Calendar className="w-10 h-10 text-gold-premium mb-6" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 uppercase tracking-wider">Conferences & MICE</h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed font-light">
                Coordinated corporate shuttles with Wi-Fi, custom itineraries, and on-site transport guides for delegates.
              </p>
            </div>
            
            <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md hover:border-gold-premium/30 transition-all duration-300">
              <Bus className="w-10 h-10 text-gold-premium mb-6" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 uppercase tracking-wider">High-Capacity Fleets</h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed font-light">
                Premium 12 to 26-seater Tempo Travellers and luxury Volvo coaches for grand guest arrivals.
              </p>
            </div>

            <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md hover:border-gold-premium/30 transition-all duration-300">
              <ShieldCheck className="w-10 h-10 text-gold-premium mb-6" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 uppercase tracking-wider">VIP Security Escorts</h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed font-light">
                Armored luxury sedans and experienced security-trained chauffeurs for high-profile VVIP delegations.
              </p>
            </div>

            <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md hover:border-gold-premium/30 transition-all duration-300">
              <HelpCircle className="w-10 h-10 text-gold-premium mb-6" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 uppercase tracking-wider">Help-Desk Coordination</h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed font-light">
                Active airport transport desks and dedicated coordinators checking itineraries and luggage transit.
              </p>
            </div>
          </div>
        </section>
      </ThreeDScrollWrapper>

      <ThreeDScrollWrapper>
        <EventTransportation />
      </ThreeDScrollWrapper>

      <ThreeDScrollWrapper>
        <WhyChooseUs />
      </ThreeDScrollWrapper>
      
      <Footer />

      <div className="fixed bottom-0 left-0 w-full z-[100] md:hidden flex border-t border-slate-200 bg-white">
        <a href="tel:+917627013579" className="flex-1 bg-slate-900 text-white flex items-center justify-center gap-2 py-4 font-bold text-sm uppercase"><Phone className="w-4 h-4 text-orange-500" /> Call Now</a>
        <a href="https://wa.me/917627013579" className="flex-1 bg-[#25D366] text-white flex items-center justify-center gap-2 py-4 font-bold text-sm uppercase"><MessageCircle className="w-4 h-4" /> WhatsApp</a>
      </div>
    </main>
  );
}

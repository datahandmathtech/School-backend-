"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import { Phone, MessageCircle, Map, Compass, Camera, Calendar, CheckCircle2, Star, ChevronRight, Landmark } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const FAQ = dynamic(() => import("@/components/sections/FAQ"), { ssr: true });

const tourHighlights = [
  { title: "Udaipur Sightseeing", description: "City Palace, Lake Pichola, Fatehsagar, Saheliyon ki Bari." },
  { title: "Udaipur to Kumbhalgarh", description: "The Great Wall of India and Ranakpur Jain Temple tour." },
  { title: "Udaipur to Jodhpur", description: "Explore Mehrangarh Fort and the Blue City via taxi." },
  { title: "Udaipur to Jaipur", description: "One-way and round-trip transfers to the Pink City." },
  { title: "Udaipur to Jaisalmer", description: "Desert safari and golden fort tours with expert drivers." }
];

export default function RajasthanTourPage() {
  return (
    <main className="relative min-h-screen bg-slate-50 selection:bg-orange-500 selection:text-white pt-20 md:pb-0 pb-16">
      <Navbar />
      
      {/* 1. Epic Tourism Hero */}
      <section className="relative bg-slate-950 py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80" 
            alt="Rajasthan Tour Packages from Udaipur" 
            fill 
            priority
            className="object-cover opacity-40 scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/40 to-slate-50" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
             <span className="text-orange-500 font-bold uppercase tracking-[0.2em] text-xs mb-6 block">Discover the Royal Land</span>
             <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-8 leading-[1.1]">
               Rajasthan Tour <br/> Packages.
             </h1>
             <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
               Experience the majesty of Rajasthan with our curated <strong>tour packages from Udaipur</strong>. From golden deserts to blue cities, explore the best of the royal land in comfort.
             </p>
             <div className="flex flex-wrap justify-center gap-4">
                <a href="tel:+917627013579" className="bg-orange-500 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm flex items-center gap-3 hover:bg-orange-600 transition-colors shadow-lg">
                  <Compass className="w-4 h-4" /> Start Your Journey
                </a>
                <a href="https://wa.me/917627013579" className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-white/20 transition-colors flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Plan My Itinerary
                </a>
             </div>
           </motion.div>
        </div>
      </section>

      {/* 2. Deep Tourism SEO Content */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              
              <div className="lg:col-span-8">
                 <div className="prose prose-lg prose-slate max-w-none text-slate-600">
                    <h2 className="text-3xl font-black text-slate-900 mb-6">Expert Rajasthan Sightseeing & Taxi Tour Operator</h2>
                    <p className="leading-relaxed mb-6">
                      Rajasthan is not just a state; it's a living museum of Indian history. While Udaipur is the heart of our operations, we specialize in <strong>Rajasthan tour packages</strong> that connect the most iconic cities of the desert land. Our <strong>Udaipur sightseeing tour</strong> serves as the perfect starting point for your journey through the royal forts, serene lakes, and vibrant bazaars of Rajasthan.
                    </p>

                    <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Udaipur to Jaipur Taxi: The Pink City Connection</h3>
                    <p className="mb-6">
                      The route from Udaipur to Jaipur is one of the most popular travel corridors in North India. Our <strong>Udaipur to Jaipur cab service</strong> offers both one-way and round-trip options. Along the way, we can include stops at <strong>Chittorgarh Fort</strong> or the holy city of <strong>Pushkar</strong>. Whether you're traveling for a business meeting in Jaipur or a family vacation, our experienced drivers ensure a safe and smooth 7-hour journey.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-10">
                       {tourHighlights.map((highlight, idx) => (
                         <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                            <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                               <Map className="w-4 h-4 text-orange-500" /> {highlight.title}
                            </h4>
                            <p className="text-xs text-slate-500 leading-relaxed">{highlight.description}</p>
                         </div>
                       ))}
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Udaipur to Jodhpur & Jaisalmer: Desert Explorations</h3>
                    <p className="mb-6">
                      Ready to witness the sand dunes? Our <strong>Udaipur to Jodhpur cab</strong> and <strong>Udaipur to Jaisalmer tour packages</strong> are the most sought-after by international tourists. We provide <strong>Innova Crysta</strong> rentals that are perfect for the long desert highways. Our drivers are well-versed in the local culture, ensuring you find the best authentic Rajasthani food (Dal Baati Churma) at local dhabas along the way.
                    </p>

                    <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Customized Tour Itineraries: Your Trip, Your Way</h3>
                    <p className="mb-6">
                      Every traveler is different. That's why we don't believe in "cookie-cutter" tours. When you search for a <strong>custom tour package Udaipur</strong>, you want flexibility. We can design a 3-day Udaipur-Kumbhalgarh-Chittorgarh loop or a 10-day Grand Rajasthan Tour covering Jaipur, Jodhpur, Jaisalmer, and Bikaner.
                    </p>
                 </div>
              </div>

              <div className="lg:col-span-4">
                 <div className="sticky top-24 space-y-8">
                    
                    <div className="bg-slate-900 p-8 rounded-[2rem] text-white shadow-2xl">
                       <h4 className="text-xl font-bold mb-6">Popular Tour Fares</h4>
                       <div className="space-y-6">
                          <div className="flex items-start gap-4">
                             <Landmark className="w-6 h-6 text-orange-500 shrink-0" />
                             <div>
                                <span className="block font-bold text-sm">Udaipur ↔ Jodhpur</span>
                                <span className="text-xs text-orange-500 font-bold">Starts @ ₹4500* (Sedan)</span>
                             </div>
                          </div>
                          <div className="flex items-start gap-4">
                             <Landmark className="w-6 h-6 text-orange-500 shrink-0" />
                             <div>
                                <span className="block font-bold text-sm">Udaipur ↔ Jaipur</span>
                                <span className="text-xs text-orange-500 font-bold">Starts @ ₹6500* (Sedan)</span>
                             </div>
                          </div>
                          <div className="flex items-start gap-4">
                             <Landmark className="w-6 h-6 text-orange-500 shrink-0" />
                             <div>
                                <span className="block font-bold text-sm">Udaipur ↔ Mount Abu</span>
                                <span className="text-xs text-orange-500 font-bold">Starts @ ₹3500* (Sedan)</span>
                             </div>
                          </div>
                       </div>
                       <p className="text-[10px] text-slate-500 mt-6 italic">*One-way fares. GST & Tolls extra.</p>
                       <a href="tel:+917627013579" className="w-full bg-orange-500 py-4 rounded-xl text-center font-bold uppercase tracking-widest text-xs mt-8 block hover:bg-orange-600 transition-colors">
                          Instant Booking
                       </a>
                    </div>

                    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                       <h4 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                          <Camera className="w-5 h-5 text-orange-500" /> Best Photo Spots:
                       </h4>
                       <ul className="space-y-3 text-xs font-medium text-slate-600">
                          <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Mehrangarh Fort Viewpoint (Jodhpur)</li>
                          <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Sam Sand Dunes (Jaisalmer)</li>
                          <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Hawa Mahal (Jaipur)</li>
                          <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Nakki Lake Sunset (Mount Abu)</li>
                       </ul>
                    </div>

                 </div>
              </div>

           </div>
        </div>
      </section>

      
      <WhyChooseUs />
      
      {/* 4. Tour FAQ Section (SEO Value) */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 max-w-4xl">
           <h2 className="text-3xl font-black text-slate-900 mb-12 text-center text-slate-900">Rajasthan Tours: Questions & Answers</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              {[
                { q: "What is the best time to visit Rajasthan?", a: "The best time is from October to March when the weather is pleasant for sightseeing and desert activities." },
                { q: "Do you provide one-way taxi from Udaipur to Jaipur?", a: "Yes, we offer both one-way and round-trip cab services with fixed pricing and no hidden costs." },
                { q: "Can you help with hotel bookings?", a: "While we specialize in transportation, we can recommend the best-rated hotels and resorts based on your budget." },
                { q: "Is it safe to travel Rajasthan by road at night?", a: "Our drivers are experienced in highway driving, but we generally recommend traveling during the day to enjoy the scenery and for maximum safety." }
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

      <div className="fixed bottom-0 left-0 w-full z-[100] md:hidden flex border-t border-slate-200 bg-white">
        <a href="tel:+917627013579" className="flex-1 bg-slate-900 text-white flex items-center justify-center gap-2 py-4 font-bold text-sm uppercase tracking-widest"><Phone className="w-4 h-4 text-orange-500" /> Call Now</a>
        <a href="https://wa.me/917627013579" className="flex-1 bg-[#25D366] text-white flex items-center justify-center gap-2 py-4 font-bold text-sm uppercase tracking-widest"><MessageCircle className="w-4 h-4" /> WhatsApp</a>
      </div>
    </main>
  );
}

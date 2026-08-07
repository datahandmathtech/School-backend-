"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import FAQ from "@/components/sections/FAQ";
import Testimonials from "@/components/sections/Testimonials";
import { Phone, MessageCircle, Star, MapPin, ShieldCheck, Clock, CheckCircle2, ChevronRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function TaxiServicePage() {
  return (
    <main className="relative min-h-screen bg-slate-50 selection:bg-orange-500 selection:text-white pt-20 md:pb-0 pb-16">
      <Navbar />
      
      {/* 1. SEO Hero Section */}
      <section className="relative bg-slate-950 py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1590362891991-f20bc081e533?auto=format&fit=crop&q=80" 
            alt="Taxi Service in Udaipur - Premium Luxury Sedan" 
            fill 
            priority
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/40 to-slate-50" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
             <span className="text-orange-500 font-bold uppercase tracking-[0.2em] text-xs mb-6 block">Premium Mobility Partner</span>
             <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-8 leading-[1.1]">
               Premier Taxi Service <br/> in Udaipur.
             </h1>
             <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
               Discover the Venice of the East with the most reliable and highly-rated <strong>cab service in Udaipur</strong>. From local royal sightseeing to outstation Rajasthan tours, we ensure every mile is a memory.
             </p>
             <div className="flex flex-wrap justify-center gap-4">
                <a href="tel:+917627013579" className="bg-orange-500 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm flex items-center gap-3 hover:bg-orange-600 transition-colors">
                  <Phone className="w-4 h-4" /> Book Your Ride Now
                </a>
                <a href="#about-service" className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-white/20 transition-colors">
                  Why Choose Us?
                </a>
             </div>
           </motion.div>
        </div>
      </section>

      {/* 2. Deep SEO Content Section - The "Udaipur Expert" Authority */}
      <section id="about-service" className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              
              {/* Left Column: Semantic SEO Text */}
              <div className="lg:col-span-8">
                 <div className="prose prose-lg prose-slate max-w-none">
                    <h2 className="text-3xl font-black text-slate-900 mb-6">Why Yatree Destination is the Best Taxi Service in Udaipur</h2>
                    <p className="text-slate-600 leading-relaxed">
                      Udaipur, the "City of Lakes," is a labyrinth of royal history, narrow alleys, and breathtaking palaces. Navigating this majestic city requires more than just a car; it requires local expertise. At Yatree Destination, we have built a reputation over 15 years as the most trusted <strong>taxi service in Udaipur</strong>. Our commitment to punctuality, transparency, and luxury has made us the first choice for thousands of tourists and business travelers.
                    </p>

                    <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Udaipur Sightseeing Taxi: Explore the Royal Heritage</h3>
                    <p className="text-slate-600">
                      Our local sightseeing packages are designed to cover the soul of Udaipur. Unlike generic cab services, our drivers know the best times to visit the <strong>City Palace</strong> to avoid crowds, the most scenic spots at <strong>Lake Pichola</strong> for sunset, and the historic significance of <strong>Jagdish Temple</strong>. When you book a <strong>cab in Udaipur</strong> with us, you aren't just getting a driver; you're getting a local guide who knows every corner of Saheliyon-ki-Bari and the Monsoon Palace.
                    </p>

                    <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 my-10">
                       <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                         <MapPin className="w-5 h-5 text-orange-500" /> Key Landmarks We Cover:
                       </h4>
                       <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-medium text-slate-700">
                          <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> City Palace Complex</li>
                          <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Lake Pichola & Jag Mandir</li>
                          <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Fatehsagar Lake & Nehru Park</li>
                          <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Saheliyon-ki-Bari Gardens</li>
                          <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Bagore Ki Haveli</li>
                          <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Sajjangarh (Monsoon Palace)</li>
                       </ul>
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Seamless Outstation Cab Service from Udaipur</h3>
                    <p className="text-slate-600">
                      Planning a trip beyond Udaipur? We specialize in long-distance <strong>outstation taxi services</strong> across Rajasthan and beyond. Our highly maintained fleet of Toyota Innova Crystas and premium sedans are perfect for the highways. Whether it's a spiritual journey to <strong>Nathdwara</strong>, a historical excursion to <strong>Kumbhalgarh Fort</strong> and <strong>Chittorgarh</strong>, or a long-haul trip to the Blue City (Jodhpur) or the Golden City (Jaisalmer), our drivers ensure a fatigue-free experience.
                    </p>

                    <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Transparent Pricing: No Hidden Costs</h3>
                    <p className="text-slate-600">
                      One of the biggest concerns for travelers searching for a <strong>taxi booking in Udaipur</strong> is hidden costs. At Yatree Destination, we provide an itemized billing system. We explain the per-km rates, driver allowances, and state taxes upfront. Whether you are looking for the <strong>cheapest taxi in Udaipur</strong> for a quick drop or a luxury sedan for a wedding, our prices are competitive and honest.
                    </p>

                    <blockquote className="border-l-4 border-orange-500 pl-6 my-10 italic text-xl text-slate-700 font-medium leading-relaxed">
                      "Yatree Destination was the backbone of our 5-day Rajasthan trip. From the airport pickup to our outstation journey to Mount Abu, everything was handled with corporate-level professionalism." 
                      <footer className="text-sm font-bold text-orange-500 mt-2">— Amit Khurana, Business Traveler</footer>
                    </blockquote>
                 </div>
              </div>

              {/* Right Column: Local SEO Signals & Sidebar */}
              <div className="lg:col-span-4">
                 <div className="sticky top-24 space-y-8">
                    
                    {/* Trust Card */}
                    <div className="bg-slate-900 p-8 rounded-[2rem] text-white shadow-2xl">
                       <h4 className="text-xl font-bold mb-6">Booking Information</h4>
                       <div className="space-y-6">
                          <div className="flex items-start gap-4">
                             <Clock className="w-6 h-6 text-orange-500 shrink-0" />
                             <div>
                                <span className="block font-bold">Available 24/7</span>
                                <span className="text-sm text-slate-400">Night & early morning airport pickups.</span>
                             </div>
                          </div>
                          <div className="flex items-start gap-4">
                             <ShieldCheck className="w-6 h-6 text-orange-500 shrink-0" />
                             <div>
                                <span className="block font-bold">Verified Drivers</span>
                                <span className="text-sm text-slate-400">Background checked & trained.</span>
                             </div>
                          </div>
                          <div className="flex items-start gap-4">
                             <Star className="w-6 h-6 text-orange-500 shrink-0" />
                             <div>
                                <span className="block font-bold">4.9 Star Rated</span>
                                <span className="text-sm text-slate-400">Top-rated on Google & Tripadvisor.</span>
                             </div>
                          </div>
                       </div>
                       <a href="tel:+917627013579" className="w-full bg-orange-500 py-4 rounded-xl text-center font-bold uppercase tracking-widest text-xs mt-10 block hover:bg-orange-600 transition-colors">
                          Instant Booking
                       </a>
                    </div>

                    {/* Local Entities Sidebar */}
                    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                       <h4 className="text-lg font-black text-slate-900 mb-6">Areas We Serve in Udaipur:</h4>
                       <div className="flex flex-wrap gap-2">
                          {["Hiran Magri", "Shobhagpura", "Fatehpura", "Panchwati", "Sector 14", "Mallatalai", "Udaipole", "Bhuwana", "Surajpole"].map(area => (
                            <span key={area} className="bg-slate-50 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 border border-slate-100">
                              {area}
                            </span>
                          ))}
                       </div>
                       <div className="mt-8 pt-8 border-t border-slate-100">
                          <h4 className="text-lg font-black text-slate-900 mb-4">Nearby Hotels We Serve:</h4>
                          <p className="text-xs text-slate-500 leading-relaxed">
                            The Oberoi Udaivilas, Taj Lake Palace, Leela Palace, Radisson Blu, Hotel Lakend, and all boutiques in the old city.
                          </p>
                       </div>
                    </div>

                 </div>
              </div>

           </div>
        </div>
      </section>

      {/* 3. Reusable Sections for Social Proof & Conversion */}
      
      <WhyChooseUs />

      {/* 4. Pricing Guidance Section (SEO Value) */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 text-center">
           <h2 className="text-3xl font-black text-slate-900 mb-6">Udaipur Taxi Fare & Pricing Guide</h2>
           <p className="text-slate-600 max-w-3xl mx-auto mb-12 leading-relaxed">
             We believe in full transparency. While exact rates may vary based on fuel prices and seasonal demand, here is a general guide to our taxi pricing in Udaipur.
           </p>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                 <h4 className="font-bold text-slate-900 mb-2">Local Full Day</h4>
                 <div className="text-2xl font-black text-orange-500 mb-4">Starts @ ₹1600</div>
                 <p className="text-sm text-slate-500 mb-6">8 Hours / 80 Kilometers. Perfect for City Sightseeing.</p>
                 <ul className="text-left space-y-2 text-xs font-bold text-slate-600 mb-6">
                    <li className="flex items-center gap-2"><ChevronRight className="w-3 h-3 text-orange-500" /> Extra KM @ ₹12/km</li>
                    <li className="flex items-center gap-2"><ChevronRight className="w-3 h-3 text-orange-500" /> Extra Hour @ ₹100/hr</li>
                 </ul>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-orange-200 shadow-xl relative scale-105 z-10">
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-500 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full">Most Popular</div>
                 <h4 className="font-bold text-slate-900 mb-2">Outstation Trip</h4>
                 <div className="text-2xl font-black text-orange-500 mb-4">Starts @ ₹12/km</div>
                 <p className="text-sm text-slate-500 mb-6">Round trip booking. Minimum 250km per day charging.</p>
                 <ul className="text-left space-y-2 text-xs font-bold text-slate-600 mb-6">
                    <li className="flex items-center gap-2"><ChevronRight className="w-3 h-3 text-orange-500" /> Driver Allowance Included</li>
                    <li className="flex items-center gap-2"><ChevronRight className="w-3 h-3 text-orange-500" /> Luxury Sedan/SUV Options</li>
                 </ul>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                 <h4 className="font-bold text-slate-900 mb-2">Airport Transfer</h4>
                 <div className="text-2xl font-black text-orange-500 mb-4">Starts @ ₹700</div>
                 <p className="text-sm text-slate-500 mb-6">Point-to-point drop or pickup from Udaipur Airport (UDA).</p>
                 <ul className="text-left space-y-2 text-xs font-bold text-slate-600 mb-6">
                    <li className="flex items-center gap-2"><ChevronRight className="w-3 h-3 text-orange-500" /> 24/7 Availability</li>
                    <li className="flex items-center gap-2"><ChevronRight className="w-3 h-3 text-orange-500" /> Tolls & Parking Extra</li>
                 </ul>
              </div>
           </div>
        </div>
      </section>

      <Testimonials />
      <FAQ />
      <Footer />

      <div className="fixed bottom-0 left-0 w-full z-[100] md:hidden flex border-t border-slate-200 bg-white">
        <a href="tel:+917627013579" className="flex-1 bg-slate-900 text-white flex items-center justify-center gap-2 py-4 font-bold text-sm uppercase tracking-widest"><Phone className="w-4 h-4 text-orange-500" /> Call Now</a>
        <a href="https://wa.me/917627013579" className="flex-1 bg-[#25D366] text-white flex items-center justify-center gap-2 py-4 font-bold text-sm uppercase tracking-widest"><MessageCircle className="w-4 h-4" /> WhatsApp</a>
      </div>
    </main>
  );
}


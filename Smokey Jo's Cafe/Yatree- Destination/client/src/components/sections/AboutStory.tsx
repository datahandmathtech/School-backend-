"use client";

import { motion } from "framer-motion";
import { Award, History, Users, ShieldCheck, Star, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function AboutStory() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 -skew-x-12 translate-x-1/2 pointer-events-none" />
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left: Cinematic Visuals & Stats */}
          <div className="lg:col-span-5 space-y-8">
            <div className="relative h-[600px] rounded-[3rem] overflow-hidden shadow-2xl group">
               <Image 
                 src="https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80"
                 alt="Yatree Destination Legacy"
                 fill
                 className="object-cover transition-transform duration-1000 group-hover:scale-110"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
               
               {/* Stats Overlay */}
               <div className="absolute bottom-10 left-10 right-10 grid grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl text-center">
                     <p className="text-3xl font-black text-gold-500 mb-1">12+</p>
                     <p className="text-[10px] font-bold text-white uppercase tracking-widest">Years of Excellence</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl text-center">
                     <p className="text-3xl font-black text-gold-500 mb-1">50k+</p>
                     <p className="text-[10px] font-bold text-white uppercase tracking-widest">Happy Travelers</p>
                  </div>
               </div>
            </div>
          </div>

          {/* Right: Massive Narrative Content */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-700 text-sm font-bold mb-8">
               <History className="w-4 h-4" />
               Our Legacy Since 2012
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold text-navy-900 mb-8 leading-[1.1]">
              Udaipur's Most <span className="text-gold-600">Established</span> Travel Partner
            </h2>
            
            <div className="prose prose-slate prose-lg max-w-none space-y-6">
              <p className="text-slate-600 leading-relaxed">
                Founded in the heart of the City of Lakes, **Yatree Destination** began with a simple vision: to bridge the gap between traditional Rajasthani hospitality and modern professional travel standards. Over the last decade, we have evolved from a small local taxi operator into Udaipur's premier tour and car rental agency, serving thousands of international and domestic tourists every year. Our journey has been defined by a deep-rooted commitment to safety, punctuality, and the "Atithi Devo Bhava" philosophy that defines Rajasthan.
              </p>
              
              <p className="text-slate-600 leading-relaxed">
                What sets us apart from other taxi services in Udaipur is our absolute focus on the traveler's experience. We don't just provide a vehicle; we provide a gateway to the royal heritage of Mewar. Every driver in our team is more than just a chauffeur; they are local experts, storytellers, and guides who know every hidden alley of the old city and every sunset point in the Aravalli hills. Whether you are arriving at the Maharana Pratap Airport or planning a 15-day heritage circuit across Jaipur, Jodhpur, and Jaisalmer, we ensure that your journey is defined by luxury and peace of mind.
              </p>

              <p className="text-slate-600 leading-relaxed">
                Our fleet is a point of immense pride. We specialize in premium MUVs like the **Innova Crysta**, rugged SUVs like the **Toyota Fortuner**, and luxury **Tempo Travellers** for group travel. Every vehicle undergoes a rigorous 40-point safety check and thorough sanitization before every single trip. This attention to detail has earned us a consistent 4.9/5 rating across all travel platforms and the trust of over 50,000 satisfied customers.
              </p>
            </div>

            {/* Core Values / Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
               <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:border-gold-500/30 transition-all">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-gold-600">
                     <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                     <h4 className="font-bold text-navy-900 mb-1">Safety First Policy</h4>
                     <p className="text-xs text-slate-500 leading-relaxed">GPS live tracking and background-verified drivers for 100% secure travel.</p>
                  </div>
               </div>
               <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:border-gold-500/30 transition-all">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-gold-600">
                     <Award className="w-6 h-6" />
                  </div>
                  <div>
                     <h4 className="font-bold text-navy-900 mb-1">Luxury Hospitality</h4>
                     <p className="text-xs text-slate-500 leading-relaxed">Royal Rajasthani hospitality standards with professional, English-speaking chauffeurs.</p>
                  </div>
               </div>
            </div>

            <div className="mt-12 flex flex-wrap gap-6 items-center">
               <button className="btn-primary h-14 px-10 rounded-full flex items-center gap-2 group">
                  Learn More About Our Journey <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
               </button>
               <div className="flex items-center gap-3">
                  <div className="flex -space-x-3">
                     {[1,2,3,4].map(i => (
                       <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                          <Image src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Customer" width={40} height={40} />
                       </div>
                     ))}
                  </div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                     Joined by <span className="text-navy-900">50,000+</span> Travelers
                  </div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

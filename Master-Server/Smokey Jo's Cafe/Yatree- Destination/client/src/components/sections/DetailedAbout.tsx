"use client";

import { 
  ShieldCheck, 
  Leaf, 
  Car, 
  Target, 
  Sparkles,
  ArrowRight
} from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import Magnetic from "@/components/ui/Magnetic";
import Link from "next/link";
import KineticTitle from "@/components/ui/KineticTitle";
import ParallaxImage from "@/components/ui/ParallaxImage";

export default function DetailedAbout() {
  const values = [
    {
      icon: <Car className="w-6 h-6 text-gold-premium" />,
      title: "Premium Fleet",
      desc: "Our extensive fleet of 13 cars and 12 E-rickshaws ensures you explore Udaipur in absolute comfort and style."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-gold-premium" />,
      title: "Royal Chauffeurs",
      desc: "Experienced, well-trained chauffeurs who prioritize your safety, punctuality, and comfort above all else."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-gold-premium" />,
      title: "Bespoke Itineraries",
      desc: "Tailor-made journeys designed to match your unique preferences, from historic landmarks to hidden gems."
    }
  ];

  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden bg-white text-slate-900">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full max-w-[600px] h-[600px] bg-gold-premium/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 z-0" />
      
      <div className="container mx-auto px-6 relative z-10">
        
        {/* TOP SECTION: Who We Are */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32">
          <div className="relative">
             <ParallaxImage 
               src="/about-showcase.png" 
               alt="Luxury Car Interior Udaipur" 
               className="aspect-[4/3] object-cover"
               imageClassName="object-cover object-[80%_20%]"
             />
             
             {/* Floating Stats - Enhanced Animation */}
             <motion.div 
               initial={{ x: 40, opacity: 0, rotate: 5 }}
               whileInView={{ x: 0, opacity: 1, rotate: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.8, duration: 1, type: "spring" }}
               className="absolute -top-6 -right-6 md:right-[-20px] bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 z-20 text-center"
             >
                <div className="text-4xl font-black text-midnight mb-1">13+</div>
                <div className="text-[10px] font-bold text-gold-premium uppercase tracking-widest leading-tight">Premium<br/>Vehicles</div>
             </motion.div>
          </div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-premium/20 bg-gold-premium/5 text-gold-premium text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                Legacy of Excellence
              </span>
              <KineticTitle 
                text="UDAIPUR'S PREMIER TRAVEL PARTNER."
                className="text-4xl sm:text-5xl md:text-7xl font-black text-midnight leading-[0.9] tracking-tighter mb-8 uppercase"
              />
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 1 }}
                className="h-1 bg-gold-premium rounded-full" 
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="space-y-6 text-slate-600 text-lg leading-relaxed font-light"
            >
              <p className="font-bold text-midnight">
                We are a premier travel company based in Udaipur, Rajasthan, dedicated to providing unparalleled travel experiences.
              </p>
              <p>
                With a fleet comprising 13 luxury cars and eco-friendly E-rickshaws, we specialize in crafting comfortable and unique tours that define the spirit of Rajasthan.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 pt-4">
              {["Safe & Pleasant Journeys", "Experienced Drivers", "Courteous Staff", "Local City Expertise"].map((item, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + (idx * 0.1) }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-2 h-2 rounded-full bg-gold-premium shadow-gold-premium/50 shadow-[0_0_10px_var(--primary)]" />
                  <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px] group-hover:text-midnight transition-colors">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-midnight rounded-[3rem] overflow-hidden mb-32 shadow-3xl border border-white/10 relative group"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-gold-premium/5 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-2 relative z-10">
            <div className="p-8 md:p-20 space-y-8 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-premium/10 text-gold-premium border border-gold-premium/20 text-[10px] font-black uppercase tracking-widest w-fit">
                <ShieldCheck className="w-4 h-4" /> Exclusive Fleet
              </div>
              <KineticTitle 
                text="OUR EXCLUSIVE BRANDED FLEET."
                className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-[0.95] tracking-tighter uppercase"
                stagger={0.06}
              />
              <p className="text-slate-400 text-lg leading-relaxed font-light">
                Travel with pride in our Yatree-branded signature vehicles. Easily recognizable with our distinctive logo, impeccably maintained, and equipped with top-tier amenities to ensure a prestigious journey across Udaipur.
              </p>
              <div className="pt-6">
                <Link href="/booking" className="flex items-center gap-4 text-white font-black uppercase tracking-[0.2em] text-xs group/link w-fit">
                  Book Branded Ride <ArrowRight className="w-5 h-5 text-gold-premium group-hover/link:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>
            
            <div className="relative min-h-[400px] lg:min-h-[500px] overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-r from-midnight via-midnight/50 to-transparent z-10 lg:block hidden" />
               <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-transparent z-10 lg:hidden block" />
               <Image 
                src="/yatree-branded-car.png"
                alt="Yatree Branded Car"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
               />
               
               <div className="absolute bottom-10 right-10 z-20 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl shadow-2xl flex items-center gap-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                  <div className="w-12 h-12 rounded-full bg-gold-premium flex items-center justify-center">
                     <Car className="w-6 h-6 text-midnight" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm uppercase tracking-wider">Premium Fleet</div>
                    <div className="text-gold-premium text-xs font-black tracking-widest">Yatree Verified</div>
                  </div>
               </div>
            </div>
          </div>
        </motion.div>

        {/* BOTTOM SECTION: Mission & Values */}
        <div className="relative py-20 px-8 md:px-16 rounded-[3rem] bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 shadow-xl overflow-hidden mb-20">
          <div className="absolute top-0 right-0 w-full max-w-[400px] h-[400px] bg-gold-premium/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/3 z-0 pointer-events-none" />
          
          <div className="relative z-10 text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-slate-200 text-gold-premium font-black uppercase tracking-[0.3em] text-[10px] shadow-sm mb-4">The Foundation</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-midnight mb-6 tracking-tighter uppercase">
              Our Mission.
            </h2>
            <p className="text-lg md:text-xl text-slate-600 font-light leading-relaxed">
              We redefine the travel experience by providing unparalleled service, fostering sustainable practices, and creating unforgettable memories in the City of Lakes.
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-10 rounded-[2rem] bg-white border border-slate-100 hover:border-gold-premium/40 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gold-premium/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-gold-premium group-hover:text-midnight transition-all duration-500 shadow-sm border border-slate-100 relative z-10">
                  {value.icon}
                </div>
                <h4 className="text-xl font-bold text-midnight mb-4 uppercase tracking-wider relative z-10">{value.title}</h4>
                <p className="text-slate-500 leading-relaxed text-sm font-light relative z-10">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 p-8 md:p-24 rounded-[2rem] md:rounded-[3.5rem] bg-midnight text-white relative overflow-hidden text-center border border-white/5"
        >
          <div className="absolute inset-0 z-0 bg-midnight">
            <Image
              src="/udaipur_atmospheric_about_bg_1778820777543.png"
              alt="Udaipur Background"
              fill
              className="object-cover opacity-60 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-midnight/30 via-transparent to-midnight/80" />
          </div>
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none z-0">
             <div className="absolute top-[-50px] left-[-50px] w-96 h-96 border-[40px] border-gold-premium/20 rounded-full" />
          </div>
          
          <div className="relative z-10">
            <Sparkles className="w-16 h-16 mx-auto mb-10 text-gold-premium animate-pulse" />
          <KineticTitle 
            text="TRANSFORMING YOUR JOURNEY."
            className="text-3xl sm:text-4xl md:text-7xl font-black mb-10 leading-[0.95] tracking-tighter uppercase justify-center"
          />
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-10 relative z-10">
            <Link href="/contact" className="px-14 py-6 bg-gold-premium text-midnight rounded-full font-black text-sm uppercase tracking-[0.3em] shadow-2xl hover:bg-white hover:text-midnight transition-all duration-500 active:scale-95">
              Begin Experience
            </Link>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Ready for the extraordinary?</p>
          </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

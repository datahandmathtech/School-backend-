"use client";

import { motion } from "framer-motion";
import { Users, Car, Map, Star, Award, History, ShieldCheck } from "lucide-react";

const stats = [
  {
    label: "Satisfied Travelers",
    value: "50,000+",
    icon: Users,
    description: "Domestic and international tourists served since 2012."
  },
  {
    label: "Luxury Vehicles",
    value: "50+",
    icon: Car,
    description: "Meticulously maintained premium sedans, SUVs, and vans."
  },
  {
    label: "Tour Packages",
    value: "100+",
    icon: Map,
    description: "Customized heritage, desert, and spiritual tour circuits."
  },
  {
    label: "Customer Rating",
    value: "4.9/5",
    icon: Star,
    description: "Top-rated travel service on Google, TripAdvisor, and more."
  }
];

export default function StatsCounter() {
  return (
    <section className="py-20 bg-navy-900 text-white relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-premium/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-navy-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 bg-white/5 rounded-[2rem] flex items-center justify-center mb-6 group-hover:bg-gold-premium group-hover:text-navy-900 transition-all duration-500 border border-white/10">
                <stat.icon className="w-8 h-8" />
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight group-hover:text-gold-premium transition-colors">
                {stat.value}
              </h3>
              <p className="text-gold-premium font-bold uppercase tracking-widest text-[10px] mb-4">
                {stat.label}
              </p>
              <p className="text-slate-400 text-xs leading-relaxed max-w-[200px]">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Achievement Bar */}
        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
           <div className="flex items-center gap-3">
              <Award className="w-6 h-6 text-gold-premium" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Government Approved Agency</span>
           </div>
           <div className="flex items-center gap-3">
              <History className="w-6 h-6 text-gold-premium" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Serving Since 2012</span>
           </div>
           <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-gold-premium" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Safe Travel Certified</span>
           </div>
        </div>
      </div>
    </section>
  );
}

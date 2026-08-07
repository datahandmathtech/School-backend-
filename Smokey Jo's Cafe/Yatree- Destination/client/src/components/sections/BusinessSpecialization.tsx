"use client";

import { motion } from "framer-motion";
import { 
  Building2, 
  Heart, 
  Calendar, 
  ShieldCheck, 
  ArrowRight,
  Gem,
  Briefcase,
  Users2
} from "lucide-react";
import Image from "next/image";

const specializations = [
  {
    title: "Destination Wedding Logistics",
    description: "Udaipur is the hub of royal weddings, and we are the experts in managing large-scale transportation. From white, decorated luxury cars for the groom's entry to a dedicated fleet of 50+ SUVs for guest transfers between airports, hotels, and venues like Jagmandir or Zenana Mahal. We provide on-site coordinators to ensure seamless guest management 24/7.",
    icon: Heart,
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80",
    color: "bg-rose-500"
  },
  {
    title: "Corporate & Executive Travel",
    description: "We provide high-standard car rental solutions for corporate conferences, business meetings, and executive airport transfers. Our services include monthly billing contracts, GST-compliant invoicing, and professionally attired chauffeurs who understand corporate etiquette. We maintain a fleet of premium sedans and SUVs like the Fortuner to uphold your brand's executive image.",
    icon: Building2,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80",
    color: "bg-blue-600"
  },
  {
    title: "MICE & Event Transportation",
    description: "Handling transport for large-scale events, incentive tours, and international conferences requires precision. Our specialized MICE team manages everything from high-capacity coach rentals (Tempo Travellers) to real-time dispatch tracking. We ensure that every VIP guest and delegate receives royal hospitality with punctual pickups and drops.",
    icon: Calendar,
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80",
    color: "bg-emerald-600"
  }
];

export default function BusinessSpecialization() {
  return (
    <section className="section-padding bg-slate-50 relative overflow-hidden">
      {/* Background Decorative */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 opacity-[0.03] text-[10vw] font-black -rotate-90 pointer-events-none select-none">
        PROFESSIONAL SERVICES
      </div>

      <div className="container-custom relative z-10">
        
        {/* Header: Heavy Content */}
        <div className="max-w-4xl mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-700 text-sm font-bold mb-6">
             <Gem className="w-4 h-4" />
             Specialized Business & Luxury Solutions
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-navy-900 mb-8 leading-[1.1]">
            Expert <span className="text-gold-600">Logistics</span> for Grand Events & Corporate Success
          </h2>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
            Beyond standard taxi services, Yatree Destination specializes in complex transportation management 
            for destination weddings, corporate conferences (MICE), and luxury events. Our dedicated 
            'Event Management Wing' works closely with wedding planners and corporate travel managers 
            to ensure that every guest experience is seamless, safe, and royal.
          </p>
        </div>

        {/* Specialization Cards: Content Dense */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {specializations.map((spec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 group flex flex-col"
            >
              {/* Image Header */}
              <div className="relative h-64 overflow-hidden">
                <Image 
                  src={spec.image}
                  alt={spec.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className={`absolute inset-0 ${spec.color} opacity-20 group-hover:opacity-40 transition-opacity`} />
                <div className="absolute top-6 left-6 w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-navy-900 shadow-xl">
                   <spec.icon className="w-7 h-7" />
                </div>
              </div>

              {/* Text Content: Heavy Density */}
              <div className="p-10 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-navy-900 mb-6 group-hover:text-gold-600 transition-colors">
                  {spec.title}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-8 text-sm md:text-base">
                  {spec.description}
                </p>
                
                <div className="mt-auto pt-8 border-t border-slate-50 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center">
                         <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Verified Service</span>
                   </div>
                   <button className="text-navy-900 font-bold flex items-center gap-2 text-sm group-hover:text-gold-600 transition-colors">
                      Get Proposal <ArrowRight className="w-4 h-4" />
                   </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Trust Section: Pure Content */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="bg-navy-900 p-12 rounded-[3rem] text-white flex flex-col justify-center">
              <h4 className="text-xl font-bold mb-6 flex items-center gap-3">
                 <Briefcase className="w-6 h-6 text-gold-500" />
                 Corporate Benefits
              </h4>
              <ul className="space-y-4 text-sm text-slate-300">
                 <li className="flex gap-3">
                    <ArrowRight className="w-4 h-4 text-gold-500 shrink-0 mt-1" />
                    Priority booking with a dedicated travel account manager.
                 </li>
                 <li className="flex gap-3">
                    <ArrowRight className="w-4 h-4 text-gold-500 shrink-0 mt-1" />
                    Special monthly and yearly contracted rates for regular clients.
                 </li>
                 <li className="flex gap-3">
                    <ArrowRight className="w-4 h-4 text-gold-500 shrink-0 mt-1" />
                    Transparent digital billing with detailed trip-wise reports.
                 </li>
              </ul>
           </div>
           <div className="bg-gold-500 p-12 rounded-[3rem] text-white flex flex-col justify-center">
              <h4 className="text-xl font-bold mb-6 flex items-center gap-3">
                 <Users2 className="w-6 h-6 text-navy-900" />
                 Large Group Expertise
              </h4>
              <ul className="space-y-4 text-sm text-white/80">
                 <li className="flex gap-3">
                    <ArrowRight className="w-4 h-4 text-navy-900 shrink-0 mt-1" />
                    Fleet of 20+ luxury Tempo Travellers for guest transportation.
                 </li>
                 <li className="flex gap-3">
                    <ArrowRight className="w-4 h-4 text-navy-900 shrink-0 mt-1" />
                    On-site coordinators at airports and hotels for smooth guest flow.
                 </li>
                 <li className="flex gap-3">
                    <ArrowRight className="w-4 h-4 text-navy-900 shrink-0 mt-1" />
                    Specialized luggage vehicles for heavy event equipment or wedding bags.
                 </li>
              </ul>
           </div>
        </div>

      </div>
    </section>
  );
}

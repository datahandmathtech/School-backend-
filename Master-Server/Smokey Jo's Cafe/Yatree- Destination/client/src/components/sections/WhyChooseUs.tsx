"use client";

import { ShieldCheck, Map, Clock, Car, BadgeCheck, PhoneCall, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const reasons = [
  {
    icon: <BadgeCheck className="w-8 h-8 text-gold-premium" />,
    title: "Experienced Chauffeurs",
    description: "Our drivers are commercially licensed, background-checked, and trained in corporate etiquette and defensive driving."
  },
  {
    icon: <Car className="w-8 h-8 text-primary" />,
    title: "Sanitized Luxury Fleet",
    description: "Every vehicle undergoes a strict cleaning protocol before dispatch, ensuring a pristine and hygienic environment."
  },
  {
    icon: <Clock className="w-8 h-8 text-primary" />,
    title: "Punctuality Guarantee",
    description: "We value your time. Our advanced dispatch system ensures your vehicle arrives 15 minutes prior to the scheduled time."
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    title: "Transparent Pricing",
    description: "No hidden charges or unexpected toll shocks. We provide itemized billing with complete transparency upfront."
  },
  {
    icon: <Map className="w-8 h-8 text-primary" />,
    title: "Local Rajasthan Expertise",
    description: "Deep knowledge of local routes, traffic patterns, and hidden gems across Udaipur and entire Rajasthan."
  },
  {
    icon: <PhoneCall className="w-8 h-8 text-primary" />,
    title: "24/7 Priority Support",
    description: "Our dispatch and support team is available round the clock to handle your booking modifications or emergencies."
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-gold-premium/5 blur-[100px] rounded-full -translate-x-1/2 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-gold-premium font-black uppercase tracking-[0.4em] text-[10px]">The Yatree Standard</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 mt-4 mb-6 tracking-tighter uppercase leading-[0.95]">
            Why Partner <br/> <span className="text-slate-300">With Us.</span>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed font-light">
            We don't just drive cars; we manage your complete travel experience. Here is why the top corporate houses and event planners trust our luxury taxi service in Udaipur.
          </p>
        </div>

        {/* AI-Optimized Statistical Data */}
        <div className="flex flex-wrap justify-center gap-6 mb-20 text-center" aria-label="Company Statistics">
          <div className="px-8 py-5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <span className="block text-3xl font-black text-slate-900 mb-1">5000+</span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Trips Completed</span>
          </div>
          <div className="px-8 py-5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <span className="block text-3xl font-black text-slate-900 mb-1">6+</span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Years Experience</span>
          </div>
          <div className="px-8 py-5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <span className="block text-3xl font-black text-slate-900 mb-1">4.9/5</span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Average Rating</span>
          </div>
          <div className="px-8 py-5 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <span className="block text-3xl font-black text-slate-900 mb-1">100%</span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">GST Compliant</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 hover:border-primary/30 hover:bg-white hover:shadow-2xl hover:shadow-primary/5 transition-all duration-700 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-gold-premium/5 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2" />
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-10 group-hover:bg-gold-premium group-hover:text-midnight transition-all duration-500 shadow-sm border border-slate-100">
                 {reason.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 uppercase tracking-wider">{reason.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-light">{reason.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
           <Link href="/contact" className="inline-flex items-center justify-center bg-slate-900 text-white px-12 py-5 rounded-full font-black text-sm uppercase tracking-[0.2em] hover:bg-gold-premium hover:text-midnight transition-all duration-500 shadow-xl active:scale-95 gap-3 group">
             Experience The Difference <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
           </Link>
        </div>

      </div>
    </section>
  );
}

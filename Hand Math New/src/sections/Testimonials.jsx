import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const Testimonials = () => {
  return (
    <section className="py-32 bg-offwhite relative overflow-hidden border-y border-black/5">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none hidden md:block" />
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none hidden md:block" />

      <div className="container mx-auto px-6 relative z-20">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-electric/5 text-electric rounded-full font-bold text-xs uppercase tracking-widest mb-6 border border-electric/10"
          >
            Client Success
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading font-bold text-navy mb-4 text-4xl md:text-5xl"
          >
            Trusted by Industry Leaders
          </motion.h2>
        </div>
        
        <div className="flex gap-6 overflow-x-auto pb-10 hide-scrollbar snap-x snap-mandatory px-4 md:px-0" style={{ scrollbarWidth: 'none' }}>
          {[
            { 
              name: 'Rajesh Kumar', 
              role: 'VP Operations, TransitGo', 
              text: 'Hand Math IT delivered our ERP system well ahead of schedule. Their attention to detail and understanding of our workflow is unparalleled.' 
            },
            { 
              name: 'Sarah Jenkins', 
              role: 'CEO, FastLogistics', 
              text: 'The LogKaro interface is stunningly fast. Our drivers actually enjoy using the mobile app to log receipts.' 
            },
            { 
              name: 'Amit Patel', 
              role: 'CTO, Swift Networks', 
              text: 'Our cloud migration was seamless. The AWS architecture they provided is fast, stable, and completely secure.' 
            },
            { 
              name: 'Michael Ross', 
              role: 'Fleet Manager, MetroRide', 
              text: 'Hand Math has made our operations completely paperless. Zero downtime in two years of operation.' 
            }
          ].map((review, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card bg-white p-8 md:p-10 min-w-[320px] md:min-w-[450px] snap-center flex-shrink-0 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >
              <div className="flex text-amber-400 mb-6 gap-1">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>
              <p className="text-navy text-base md:text-lg leading-relaxed mb-8 font-medium">"{review.text}"</p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-electric to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-inner">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-base text-navy">{review.name}</h4>
                  <span className="text-xs text-navy/50 tracking-wide">{review.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

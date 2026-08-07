import React from 'react';
import { motion } from 'framer-motion';

const techs = [
  { name: 'Amazon Web Services', type: 'Cloud Infrastructure' },
  { name: 'React & Next.js', type: 'Frontend Architecture' },
  { name: 'Node.js & Go', type: 'Backend Systems' },
  { name: 'PostgreSQL & MongoDB', type: 'Database Clusters' },
  { name: 'Docker & Kubernetes', type: 'Containerization' },
  { name: 'Figma & Framer', type: 'UI/UX Design' },
  { name: 'Flutter', type: 'Cross-platform Mobile' },
  { name: 'Stripe', type: 'Payment Processing' },
];

const TechStack = () => {
  return (
    <section className="py-24 border-y border-black/5 bg-white overflow-hidden">
      <div className="container mx-auto px-6 mb-16 flex flex-col items-center text-center">
        <motion.h3 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm font-heading font-bold text-navy/40 tracking-[0.2em] uppercase mb-4"
        >
          Powered by Enterprise-Grade Technology
        </motion.h3>
        <div className="w-16 h-1 bg-gradient-to-r from-electric to-transparent rounded-full" />
      </div>

      <div className="relative flex overflow-x-hidden group">
        <motion.div
          animate={{ x: [0, -2000] }}
          transition={{ 
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
          className="flex whitespace-nowrap gap-8 items-center pl-8"
        >
          {[...techs, ...techs, ...techs].map((tech, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-4 px-8 py-4 bg-offwhite rounded-2xl border border-black/5 hover:border-electric/30 hover:bg-white hover:shadow-xl transition-all duration-300 cursor-default"
            >
               <div className="w-2 h-2 rounded-full bg-electric" />
               <div className="flex flex-col">
                 <span className="text-lg font-bold font-heading text-navy">{tech.name}</span>
                 <span className="text-xs text-navy/50">{tech.type}</span>
               </div>
            </div>
          ))}
        </motion.div>
        
        {/* Gradient Masks */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
};

export default TechStack;

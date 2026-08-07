import React from 'react';
import PortfolioGrid from '../sections/Portfolio';
import { motion } from 'framer-motion';

const PortfolioPage = () => {
  return (
    <div className="bg-offwhite min-h-screen">
       {/* Hero Section */}
       <section className="relative pt-40 pb-12 overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-electric/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 border border-black/5 rounded-full font-bold text-xs uppercase tracking-widest text-navy mb-8 shadow-sm backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-electric animate-pulse" />
              Featured Work
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-heading font-bold mb-8 text-navy tracking-tight leading-[1.05]"
            >
              Transforming <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-purple-600">Ideas into Reality</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl text-navy/60 font-light max-w-2xl mx-auto"
            >
              Explore our latest enterprise projects and case studies where we've engineered digital excellence.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Reusing the Redesigned Portfolio Grid Section */}
      <PortfolioGrid />
      
      {/* Premium CTA */}
      <section className="py-32 bg-navy relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-electric/20 to-transparent blur-3xl pointer-events-none" />
        <div className="container mx-auto px-6 text-center relative z-10 text-white">
          <h2 className="text-5xl md:text-6xl font-heading font-bold mb-8 tracking-tight">Ready to build the future?</h2>
          <p className="text-white/60 text-xl mb-12 max-w-2xl mx-auto">Partner with us to create highly scalable, performant, and secure digital ecosystems.</p>
          <button className="px-10 py-5 rounded-full bg-white text-navy font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.2)]">
            Start a Project
          </button>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;

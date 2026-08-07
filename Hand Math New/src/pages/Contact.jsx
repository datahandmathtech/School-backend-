import React from 'react';
import ContactSection from '../sections/Contact';
import { motion } from 'framer-motion';

const ContactPage = () => {
  return (
    <div className="bg-offwhite min-h-screen">
      {/* Premium Hero Section */}
      <section className="relative pt-32 md:pt-40 pb-12 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-electric/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute top-20 -left-20 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-gold/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 border border-black/5 rounded-full font-bold text-xs uppercase tracking-widest text-navy mb-8 shadow-sm backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Available for New Projects
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-heading font-bold mb-8 text-navy tracking-tight leading-[1.05]"
            >
              Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-purple-600">Connect</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl text-navy/60 font-light max-w-2xl mx-auto"
            >
              Have a project in mind or need enterprise support? Our team of engineers is ready to assist you.
            </motion.p>
          </div>
        </div>
      </section>

      {/* The Contact Form & Info Grid */}
      <ContactSection />
    </div>
  );
};

export default ContactPage;

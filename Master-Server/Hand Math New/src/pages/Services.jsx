import React from 'react';
import ServicesGrid from '../sections/Services'; 
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';
import { Check, Zap, Shield, ArrowRight } from 'lucide-react';

const ServicesPage = () => {
  return (
    <div className="bg-offwhite min-h-screen">
      
      {/* 1. Services Hero */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-electric/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-40 -left-40 w-[400px] h-[400px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 border border-black/5 rounded-full font-bold text-xs uppercase tracking-widest text-navy mb-8 shadow-sm backdrop-blur-md"
            >
              <Zap size={14} className="text-electric" /> Capabilities
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-7xl font-heading font-bold mb-8 text-navy tracking-tight leading-[1.1]"
            >
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-purple-600">Specializations</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl text-navy/60 font-light leading-relaxed max-w-3xl mx-auto"
            >
              We don't just fix IT problems. We engineer highly scalable, fault-tolerant ecosystems that propel your business forward.
            </motion.p>
          </div>
        </div>
      </section>
      
      {/* 2. Services Grid (Reused from sections/Services.jsx which is now Bento!) */}
      <ServicesGrid />

      {/* 3. Premium SaaS Pricing / Packaging */}
      <section className="py-32 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-electric/20 blur-[150px] rounded-full pointer-events-none" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-white tracking-tight">Simple, Transparent Pricing</h2>
            <p className="text-white/60 text-lg">No hidden fees. Choose the tier that matches your scale, or let us build a custom enterprise plan.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
            
            {/* Essentials Tier */}
            <div className="glass-card bg-white/5 border-white/10 p-10 rounded-3xl hover:bg-white/10 transition-colors duration-500">
              <h3 className="text-xl font-heading font-bold text-white mb-2">Managed IT Essentials</h3>
              <p className="text-white/50 text-sm mb-6">Perfect for growing fleets and small offices.</p>
              <div className="text-4xl font-bold text-white mb-8 font-heading">₹49,000<span className="text-lg text-white/50 font-normal">/mo</span></div>
              <ul className="space-y-4 mb-10 text-white/70">
                <li className="flex items-start gap-3"><Check size={18} className="text-electric shrink-0 mt-0.5" /> 24/7 Network Monitoring</li>
                <li className="flex items-start gap-3"><Check size={18} className="text-electric shrink-0 mt-0.5" /> Basic Cloud Backups (500GB)</li>
                <li className="flex items-start gap-3"><Check size={18} className="text-electric shrink-0 mt-0.5" /> Helpdesk Support (9 AM - 6 PM)</li>
                <li className="flex items-start gap-3"><Check size={18} className="text-electric shrink-0 mt-0.5" /> Monthly Security Updates</li>
              </ul>
              <button className="w-full py-4 rounded-full border border-white/20 text-white font-bold hover:bg-white/10 transition-colors">
                Select Essentials
              </button>
            </div>

            {/* Growth Tier (Highlighted) */}
            <div className="relative glass-card bg-white/10 p-10 rounded-3xl border-2 border-electric shadow-[0_0_50px_rgba(37,99,235,0.2)] md:-translate-y-4">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-electric text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
                Most Popular
              </div>
              <h3 className="text-2xl font-heading font-bold text-white mb-2">Co-Managed Growth</h3>
              <p className="text-white/60 text-sm mb-6">For scaling startups requiring cloud ops.</p>
              <div className="text-5xl font-bold text-electric mb-8 font-heading">₹1.25L<span className="text-xl text-white/50 font-normal">/mo</span></div>
              <ul className="space-y-4 mb-10 text-white/80 font-medium">
                <li className="flex items-start gap-3"><Check size={18} className="text-electric shrink-0 mt-0.5" /> All Essentials features</li>
                <li className="flex items-start gap-3"><Check size={18} className="text-electric shrink-0 mt-0.5" /> Full AWS/Azure Cloud Management</li>
                <li className="flex items-start gap-3"><Check size={18} className="text-electric shrink-0 mt-0.5" /> 24/7 Helpdesk & Incident Response</li>
                <li className="flex items-start gap-3"><Check size={18} className="text-electric shrink-0 mt-0.5" /> Quarterly Penetration Testing</li>
                <li className="flex items-start gap-3"><Check size={18} className="text-electric shrink-0 mt-0.5" /> Dedicated Solutions Architect</li>
              </ul>
              <button className="w-full py-4 rounded-full bg-electric text-white font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-electric/20 flex items-center justify-center gap-2">
                Get Started <ArrowRight size={18} />
              </button>
            </div>

            {/* Enterprise Tier */}
            <div className="glass-card bg-white/5 border-white/10 p-10 rounded-3xl hover:bg-white/10 transition-colors duration-500">
              <Shield size={32} className="text-gold mb-4" />
              <h3 className="text-xl font-heading font-bold text-white mb-2">Custom Enterprise</h3>
              <p className="text-white/50 text-sm mb-6">Bespoke software and global infrastructure.</p>
              <div className="text-4xl font-bold text-white mb-8 font-heading">Custom</div>
              <ul className="space-y-4 mb-10 text-white/70">
                <li className="flex items-start gap-3"><Check size={18} className="text-gold shrink-0 mt-0.5" /> Proprietary SaaS Development</li>
                <li className="flex items-start gap-3"><Check size={18} className="text-gold shrink-0 mt-0.5" /> Zero-Trust Cyber Architecture</li>
                <li className="flex items-start gap-3"><Check size={18} className="text-gold shrink-0 mt-0.5" /> Dedicated Engineering Pod</li>
                <li className="flex items-start gap-3"><Check size={18} className="text-gold shrink-0 mt-0.5" /> ISO/SOC-2 Compliance Ops</li>
              </ul>
              <button className="w-full py-4 rounded-full border border-white/20 text-white font-bold hover:bg-white/10 transition-colors">
                Contact Sales
              </button>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;

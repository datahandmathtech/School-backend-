import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ShieldCheck, Terminal, Cloud, Cpu, Server, Activity, Lock, ArrowRight, BarChart3, Users } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';

const Hero = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
  };

  return (
    <section className="relative min-h-screen pt-28 pb-20 lg:pt-32 lg:pb-32 overflow-hidden bg-[#f8fafc]">
      {/* Clean Light Grid Background (Screenshot Match) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Soft Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[800px] md:h-[800px] bg-blue-400/15 blur-[120px] rounded-full" />
        {/* Crisp Light Grid */}
        <div className="absolute inset-0 opacity-[0.5]" style={{ backgroundImage: 'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          
          {/* Left Column: Typography */}
          <motion.div 
            initial="hidden" animate="visible" variants={staggerContainer}
            className="lg:col-span-6 flex flex-col items-start"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-blue-100 rounded-full font-semibold text-[11px] tracking-widest text-blue-600 uppercase mb-8 shadow-sm shadow-blue-500/5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Hand Math IT Solutions
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-[72px] font-heading font-bold text-navy mb-6 leading-[1.1] tracking-tight">
              Building the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Digital Infrastructure</span> of Tomorrow.
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-base sm:text-lg md:text-xl text-navy/60 mb-8 max-w-xl leading-relaxed font-light">
              Hand Math delivers end-to-end IT services—from bespoke software development to enterprise cloud architecture. Partner with us to scale your business with absolute confidence.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <RouterLink to="/contact" className="px-8 py-3.5 bg-navy text-white hover:bg-black rounded-full font-bold shadow-lg shadow-navy/20 transition-all hover:scale-105 flex items-center justify-center gap-2">
                Start Your Project
                <ArrowRight size={18} />
              </RouterLink>
              <RouterLink to="/logkaro" className="px-8 py-3.5 bg-white text-navy border border-black/5 hover:bg-black/5 rounded-full font-bold transition-all flex items-center justify-center gap-2">
                Explore LogKaro CRM
              </RouterLink>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-16 w-full pt-8 border-t border-black/5">
              <div className="flex gap-8 sm:gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500 text-sm font-bold">
                <div className="flex items-center gap-2"><Cloud size={20}/> AWS Partner</div>
                <div className="flex items-center gap-2"><ShieldCheck size={20}/> ISO 27001</div>
                <div className="flex items-center gap-2"><Server size={20}/> 99.9% Uptime</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Sleek Light Dashboard Mockup */}
          <motion.div 
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, type: 'spring', stiffness: 100 }}
            className="lg:col-span-6 relative w-full h-[450px] md:h-[500px] mt-8 lg:mt-0"
          >
            <div className="absolute inset-0 bg-white/80 backdrop-blur-2xl border border-white p-1 md:p-2 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] rounded-[1.5rem] md:rounded-[2rem] z-10 flex flex-col overflow-hidden">
              {/* Header */}
              <div className="flex items-center gap-2 px-3 md:px-5 py-3 md:py-4 border-b border-black/5 bg-white">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#ff5f56]" />
                  <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#ffbd2e]" />
                  <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="mx-auto bg-slate-100 rounded-lg px-3 py-1 text-[9px] md:text-[10px] font-mono text-slate-500 font-bold flex items-center gap-2">
                  <Lock size={10} /> logkaro.com/dashboard
                </div>
              </div>

              {/* Minimalist Dashboard Content */}
              <div className="flex-1 bg-slate-50/50 p-3 md:p-8 flex flex-col gap-3 md:gap-6">
                {/* Metrics Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                  <div className="bg-white p-3 md:p-4 rounded-2xl border border-black/5 shadow-sm flex items-center sm:flex-col sm:items-start gap-3 sm:gap-0">
                     <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 sm:mb-3 shrink-0"><Activity size={16}/></div>
                     <div>
                       <span className="text-[10px] md:text-xs text-slate-500 font-bold uppercase tracking-wider block mb-0.5 sm:mb-1">Server Load</span>
                       <span className="text-xl md:text-2xl font-bold text-slate-800">12.4%</span>
                     </div>
                  </div>
                  <div className="bg-white p-3 md:p-4 rounded-2xl border border-black/5 shadow-sm flex items-center sm:flex-col sm:items-start gap-3 sm:gap-0">
                     <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 sm:mb-3 shrink-0"><Users size={16}/></div>
                     <div>
                       <span className="text-[10px] md:text-xs text-slate-500 font-bold uppercase tracking-wider block mb-0.5 sm:mb-1">Active Users</span>
                       <span className="text-xl md:text-2xl font-bold text-slate-800">2,409</span>
                     </div>
                  </div>
                  <div className="bg-white p-3 md:p-4 rounded-2xl border border-black/5 shadow-sm flex items-center sm:flex-col sm:items-start gap-3 sm:gap-0 hidden sm:flex">
                     <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mb-3 shrink-0"><BarChart3 size={16}/></div>
                     <div>
                       <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block mb-1">Response Time</span>
                       <span className="text-2xl font-bold text-slate-800">42ms</span>
                     </div>
                  </div>
                </div>

                {/* Main Graph Area Placeholder */}
                <div className="flex-1 bg-white rounded-2xl border border-black/5 shadow-sm p-4 md:p-6 flex flex-col hidden sm:flex">
                   <div className="flex justify-between items-center mb-6">
                     <span className="font-bold text-slate-800 text-sm md:text-base">System Performance</span>
                     <div className="flex gap-2">
                       <span className="w-2 h-2 rounded-full bg-blue-500" />
                       <span className="w-2 h-2 rounded-full bg-indigo-500" />
                     </div>
                   </div>
                   <div className="flex-1 border-b border-l border-slate-100 flex items-end justify-between px-2 md:px-4 pb-2 md:pb-4 gap-2 md:gap-4 relative">
                      {/* Fake Graph Bars */}
                      {[40, 60, 30, 80, 50, 90, 70, 100].map((height, i) => (
                        <motion.div 
                          key={i} 
                          initial={{ height: 0 }}
                          animate={{ height: `${height}%` }}
                          transition={{ duration: 1, delay: i * 0.1, type: "spring" }}
                          className="w-full bg-gradient-to-t from-blue-100 to-blue-400 rounded-t-sm"
                        />
                      ))}
                   </div>
                </div>
              </div>
            </div>

            {/* Floating Notification */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }} 
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute -left-2 md:-left-10 top-16 md:top-32 z-20 bg-white p-3 md:p-4 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-slate-100 flex items-center gap-3 md:gap-4 scale-90 md:scale-100 origin-left"
            >
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-green-50 text-green-500 flex items-center justify-center shrink-0">
                <ShieldCheck size={18} />
              </div>
              <div>
                <span className="block text-xs md:text-sm font-bold text-slate-800">System Secure</span>
                <span className="block text-[10px] md:text-xs text-slate-500">All checks passed</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

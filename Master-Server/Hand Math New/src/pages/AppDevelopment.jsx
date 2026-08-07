import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Layers, ShieldCheck, Zap, ArrowRight, PlayCircle, Star, Cloud } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';

const AppDevelopment = () => {
  const features = [
    { icon: Smartphone, title: 'Native iOS & Android', desc: 'High-performance native apps built with Swift and Kotlin.' },
    { icon: Layers, title: 'Cross-Platform', desc: 'Cost-effective Flutter and React Native apps that feel native.' },
    { icon: Zap, title: 'Smooth Animations', desc: '60fps fluid UI animations and micro-interactions.' },
    { icon: ShieldCheck, title: 'Secure APIs', desc: 'Encrypted local storage and secure backend communications.' },
    { icon: Cloud, title: 'Offline First', desc: 'Apps that work seamlessly even with poor network connections.' },
    { icon: Star, title: 'ASO Optimized', desc: 'Built to rank higher on the App Store and Google Play.' }
  ];

  return (
    <main className="bg-white text-navy min-h-screen pt-28 font-body overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 overflow-hidden bg-offwhite">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-purple-500/10 to-electric/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container relative z-10 mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 text-purple-600 rounded-full font-bold text-xs tracking-wider uppercase mb-6">
                Mobile App Development
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-[1.1]">
                Apps that people <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-electric">love to use.</span>
              </h1>
              <p className="text-lg md:text-xl text-navy/70 mb-10 max-w-lg leading-relaxed">
                We engineer stunning, high-performance mobile applications for iOS and Android that drive user engagement and dominate app store rankings.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <RouterLink to="/contact" className="btn-primary bg-purple-600 hover:bg-purple-700 hover:shadow-purple-500/30 flex items-center justify-center gap-2">
                  Discuss Your App <ArrowRight size={18} />
                </RouterLink>
                <button className="btn-outline border-purple-200 text-purple-700 hover:bg-purple-50 flex items-center justify-center gap-2">
                  <PlayCircle size={18} /> View Showreel
                </button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex justify-center lg:justify-end"
            >
              {/* Phone Mockup Placeholder */}
              <div className="w-[300px] h-[600px] bg-navy rounded-[3rem] border-[8px] border-black p-2 shadow-2xl relative z-20">
                <div className="w-full h-full bg-offwhite rounded-[2.5rem] overflow-hidden relative">
                   {/* Dynamic Island fake */}
                   <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-7 bg-black rounded-full z-30" />
                   {/* App UI Fake */}
                   <div className="pt-16 p-6 h-full flex flex-col gap-6">
                      <div className="w-1/2 h-8 bg-purple-100 rounded-lg" />
                      <div className="w-full h-32 bg-gradient-to-br from-purple-500 to-electric rounded-2xl shadow-lg p-4">
                         <div className="w-10 h-10 bg-white/20 rounded-full mb-4" />
                         <div className="w-2/3 h-4 bg-white/40 rounded mb-2" />
                         <div className="w-1/3 h-4 bg-white/40 rounded" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                         <div className="h-24 bg-white rounded-xl shadow-sm border border-black/5" />
                         <div className="h-24 bg-white rounded-xl shadow-sm border border-black/5" />
                      </div>
                      <div className="mt-auto h-16 bg-white rounded-2xl shadow-lg border border-black/5" />
                   </div>
                </div>
              </div>
              
              <motion.div 
                animate={{ y: [-15, 15, -15] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-20 -left-10 glass-card bg-white p-4 shadow-xl z-30 flex items-center gap-3 rounded-xl border border-purple-100"
              >
                <div className="flex text-amber-400"><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /></div>
                <p className="font-bold text-sm">4.9 App Store</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, idx) => (
              <motion.div 
                key={idx} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-3xl bg-white border border-black/5 shadow-sm hover:shadow-2xl hover:border-purple-200 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon size={24} className="text-purple-600" />
                </div>
                <h3 className="text-xl font-bold font-heading mb-3">{feature.title}</h3>
                <p className="text-navy/60 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default AppDevelopment;

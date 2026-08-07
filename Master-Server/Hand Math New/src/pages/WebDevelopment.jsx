import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Code2, MonitorSmartphone, Zap, Server, Shield, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';

const WebDevelopment = () => {
  const features = [
    { icon: MonitorSmartphone, title: 'Responsive Design', desc: 'Flawless experiences across all devices and screen sizes.' },
    { icon: Zap, title: 'Lightning Fast', desc: 'Optimized performance, lazy loading, and fast Core Web Vitals.' },
    { icon: Server, title: 'Scalable Architecture', desc: 'Built on modern, scalable backends to handle massive traffic.' },
    { icon: Shield, title: 'Bank-grade Security', desc: 'Secure data handling, protection against top OWASP vulnerabilities.' },
    { icon: Globe, title: 'SEO Optimized', desc: 'Server-side rendering (SSR) to ensure maximum search engine visibility.' },
    { icon: Code2, title: 'Modern Tech Stack', desc: 'React, Next.js, Vue, Node.js, and modern CSS frameworks.' }
  ];

  return (
    <main className="bg-offwhite text-navy min-h-screen pt-28 font-body overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-12 pb-24 overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-electric/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="container relative z-10 mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-electric/10 text-electric rounded-full font-bold text-xs tracking-wider uppercase mb-6">
                Web Development
              </div>
              <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 leading-tight">
                Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-purple-600">High-Performance</span> Web Experiences.
              </h1>
              <p className="text-lg md:text-xl text-navy/70 mb-8 max-w-lg leading-relaxed">
                We craft custom, scalable, and secure web applications that drive engagement and business growth. From complex SaaS platforms to dynamic corporate websites.
              </p>
              <div className="flex gap-4">
                <RouterLink to="/contact" className="btn-primary flex items-center gap-2">
                  Start Your Project <ArrowRight size={18} />
                </RouterLink>
                <RouterLink to="/portfolio" className="btn-outline">
                  View Our Work
                </RouterLink>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:w-1/2 w-full relative"
            >
              <div className="glass-card bg-white/80 p-2 shadow-2xl rounded-2xl relative z-20">
                <div className="flex items-center gap-2 px-4 py-2 border-b border-black/5">
                   <div className="w-3 h-3 rounded-full bg-red-400" />
                   <div className="w-3 h-3 rounded-full bg-amber-400" />
                   <div className="w-3 h-3 rounded-full bg-green-400" />
                   <div className="mx-auto w-1/2 h-4 bg-black/5 rounded text-[8px] text-center text-navy/40 font-mono flex items-center justify-center">logkaro.com</div>
                </div>
                <div className="p-6 bg-offwhite/50 h-64 flex flex-col gap-4">
                  <div className="w-1/3 h-6 bg-electric/20 rounded" />
                  <div className="w-full h-32 bg-white rounded-xl shadow-sm border border-black/5 p-4 flex gap-4">
                     <div className="w-1/4 h-full bg-blue-100 rounded-lg animate-pulse" />
                     <div className="flex-1 flex flex-col gap-2">
                        <div className="w-full h-4 bg-black/5 rounded" />
                        <div className="w-5/6 h-4 bg-black/5 rounded" />
                        <div className="w-4/6 h-4 bg-black/5 rounded" />
                     </div>
                  </div>
                </div>
              </div>
              <motion.div 
                animate={{ y: [-15, 15, -15] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-8 -left-8 glass-card bg-white p-4 shadow-xl z-30 flex items-center gap-3 rounded-xl"
              >
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600"><CheckCircle2 size={20} /></div>
                <div><p className="font-bold text-sm">Perfect Lighthouse Score</p><p className="text-xs text-navy/50">Performance: 100</p></div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Engineering Excellence</h2>
            <p className="text-navy/60 text-lg">Every website we build is engineered for speed, security, and scalability from day one.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div 
                key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-3xl bg-offwhite border border-black/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:bg-electric group-hover:text-white transition-colors text-electric">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-bold font-heading mb-3">{feature.title}</h3>
                <p className="text-navy/60 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Tech Stack */}
      <section className="py-24 bg-navy text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-heading font-bold mb-12">Powered by Modern Tech</h2>
          <div className="flex flex-wrap justify-center gap-8 opacity-70">
            <span className="text-2xl font-bold font-mono">React</span>
            <span className="text-2xl font-bold font-mono">Next.js</span>
            <span className="text-2xl font-bold font-mono">Node.js</span>
            <span className="text-2xl font-bold font-mono">Tailwind</span>
            <span className="text-2xl font-bold font-mono">PostgreSQL</span>
            <span className="text-2xl font-bold font-mono">AWS</span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default WebDevelopment;

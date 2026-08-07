import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code, Globe, Smartphone, BarChart3, 
  ShieldCheck, Cloud, Network, Cpu, Wrench, ArrowRight
} from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';

const Services = () => {
  return (
    <section id="services" className="py-32 relative bg-white z-20">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-electric/5 text-electric rounded-full font-bold text-xs uppercase tracking-widest mb-6 border border-electric/10"
          >
            Capabilities
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-navy mb-6 tracking-tight"
          >
            A Complete <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-purple-600">Ecosystem</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-navy/60 text-lg md:text-xl"
          >
            We don't just write code. We architect, secure, and scale your entire digital backbone.
          </motion.p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-7xl mx-auto">
          
          {/* 1. Software Solutions - Large Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="md:col-span-8 glass-card bg-offwhite p-10 md:p-12 overflow-hidden relative group"
          >
            <div className="relative z-10 w-full md:w-2/3">
              <div className="w-14 h-14 bg-electric/10 rounded-2xl flex items-center justify-center mb-8">
                <Code className="text-electric" size={28} />
              </div>
              <h3 className="text-3xl font-bold font-heading mb-4 text-navy">Custom Software & SaaS</h3>
              <p className="text-navy/60 text-base leading-relaxed mb-8">
                Bespoke ERP, CRM, and SaaS development, including specialized solutions like our flagship LogKaro Fleet CRM. Built on highly scalable microservices architecture.
              </p>
              <RouterLink to="/services/software-solutions" className="inline-flex items-center gap-2 text-sm font-bold text-electric group-hover:gap-4 transition-all uppercase tracking-wider">
                Explore Software <ArrowRight size={16} />
              </RouterLink>
            </div>
            {/* Abstract Graphic */}
            <div className="absolute -right-20 -top-20 w-96 h-96 bg-gradient-to-br from-electric/5 to-purple-500/5 rounded-full blur-3xl group-hover:bg-electric/10 transition-colors duration-700" />
            <div className="hidden md:block absolute right-0 bottom-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity duration-700">
               <div className="grid grid-cols-3 gap-2">
                 {[1,2,3,4,5,6,7,8,9].map(i => <div key={i} className="w-12 h-12 rounded bg-electric" />)}
               </div>
            </div>
          </motion.div>

          {/* 2. IT Support - Small Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="md:col-span-4 glass-card bg-navy p-10 text-white relative overflow-hidden group hover:shadow-2xl hover:shadow-electric/20"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-electric/30 blur-3xl rounded-full -mr-10 -mt-10" />
            <Wrench className="text-white mb-8 relative z-10" size={32} />
            <h3 className="text-2xl font-bold font-heading mb-4 relative z-10">24/7 Managed IT</h3>
            <p className="text-white/70 text-sm leading-relaxed relative z-10 mb-8">
              Proactive helpdesk monitoring, system maintenance, and remote support ensuring zero downtime.
            </p>
            <RouterLink to="/contact" className="relative z-10 inline-flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider group-hover:gap-4 transition-all">
              Get Support <ArrowRight size={16} />
            </RouterLink>
          </motion.div>

          {/* 3. Cloud Services - Medium */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="md:col-span-4 glass-card bg-offwhite p-10 group hover:bg-white"
          >
            <Cloud className="text-purple-500 mb-6" size={32} />
            <h3 className="text-xl font-bold font-heading mb-3 text-navy group-hover:text-electric transition-colors">Cloud & DevOps</h3>
            <p className="text-navy/60 text-sm leading-relaxed">AWS/Azure infrastructure, seamless cloud migrations, and automated CI/CD pipelines.</p>
          </motion.div>

          {/* 4. Cybersecurity - Medium */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
            className="md:col-span-4 glass-card bg-offwhite p-10 group hover:bg-white"
          >
            <ShieldCheck className="text-green-500 mb-6" size={32} />
            <h3 className="text-xl font-bold font-heading mb-3 text-navy group-hover:text-electric transition-colors">Cybersecurity</h3>
            <p className="text-navy/60 text-sm leading-relaxed">Vulnerability assessment, zero-trust architecture, and SOC-2 compliance audits.</p>
          </motion.div>

          {/* 5. Mobile App - Medium */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
            className="md:col-span-4 glass-card bg-offwhite p-10 group hover:bg-white"
          >
            <Smartphone className="text-amber-500 mb-6" size={32} />
            <h3 className="text-xl font-bold font-heading mb-3 text-navy group-hover:text-electric transition-colors">Mobile App Dev</h3>
            <p className="text-navy/60 text-sm leading-relaxed">Native iOS/Android apps and high-performance cross-platform Flutter/React Native software.</p>
          </motion.div>

          {/* 6. Network Management - Span 6 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
            className="md:col-span-6 glass-card bg-offwhite p-10 flex flex-col sm:flex-row items-center gap-8 group hover:bg-white"
          >
            <div className="shrink-0 w-20 h-20 rounded-full bg-electric/10 flex items-center justify-center">
              <Network className="text-electric" size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-bold font-heading mb-3 text-navy group-hover:text-electric transition-colors">Enterprise Networking</h3>
              <p className="text-navy/60 text-sm leading-relaxed">Design, configuration, and protection of high-performance LAN/WAN, VPN systems, and server architecture.</p>
            </div>
          </motion.div>

          {/* 7. IoT & Telematics - Span 6 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 }}
            className="md:col-span-6 glass-card bg-offwhite p-10 flex flex-col sm:flex-row items-center gap-8 group hover:bg-white"
          >
            <div className="shrink-0 w-20 h-20 rounded-full bg-purple-500/10 flex items-center justify-center">
              <Cpu className="text-purple-500" size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-bold font-heading mb-3 text-navy group-hover:text-purple-500 transition-colors">IoT & Telematics</h3>
              <p className="text-navy/60 text-sm leading-relaxed">Connecting fleet tracking hardware, GPS sensors, and onboard diagnostics to centralized software networks.</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Services;

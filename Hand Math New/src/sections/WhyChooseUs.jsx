import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, Zap, Target, Users, Headphones, CheckCircle2 } from 'lucide-react';

const differentiators = [
  {
    title: "Fully Custom Ecosystems",
    desc: "We build custom integrations so LogKaro works perfectly with your accounting and ERP databases.",
    icon: Zap
  },
  {
    title: "Security-First Coding",
    desc: "Every line of code and server configuration we deploy is fortified with enterprise-level security protocols.",
    icon: Shield
  },
  {
    title: "True All-in-One Tech Partner",
    desc: "We support both your daily driver-facing SaaS applications and your backend cloud networks.",
    icon: Target
  },
  {
    title: "24/7 Managed Helpdesk",
    desc: "Round-the-clock proactive monitoring and desktop support to guarantee zero business downtime.",
    icon: Headphones
  },
  {
    title: "Rapid Agile Deployments",
    desc: "Continuous integration and automated pipelines deliver robust features to you in record time.",
    icon: Clock
  },
  {
    title: "Data Integrity Guaranteed",
    desc: "Absolute compliance and protection of your proprietary databases and company secrets.",
    icon: Users
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-32 relative bg-navy overflow-hidden">
      {/* Dark Mode Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-electric/20 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[800px] h-64 bg-electric/10 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Side: Sticky Text Content */}
          <div className="lg:w-5/12">
            <div className="sticky top-32">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 text-white border border-white/10 rounded-full font-bold text-xs uppercase tracking-widest mb-6 backdrop-blur-md"
              >
                <span className="w-2 h-2 rounded-full bg-gold" /> Why Partner With Us
              </motion.span>
              
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-6xl font-heading font-bold mb-8 leading-[1.1] text-white tracking-tight"
              >
                Excellence in <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-purple-400">Technology Delivery</span>
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-white/60 text-lg mb-10 leading-relaxed font-light"
              >
                Hand Math is more than just a typical software vendor. We are your dedicated technical partner, optimizing your fleet with LogKaro while supporting and scaling your entire enterprise IT environment.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3 text-white/80"><CheckCircle2 className="text-electric" size={20}/> 100% In-house Engineering Team</div>
                <div className="flex items-center gap-3 text-white/80"><CheckCircle2 className="text-electric" size={20}/> Guaranteed SLA Uptime</div>
                <div className="flex items-center gap-3 text-white/80"><CheckCircle2 className="text-electric" size={20}/> Military-grade Data Encryption</div>
              </motion.div>
            </div>
          </div>
          
          {/* Right Side: Glowing Glass Cards Grid */}
          <div className="lg:w-7/12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {differentiators.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + (idx * 0.1) }}
                  className="glass-card bg-white/5 border-white/10 p-8 hover:bg-white/10 transition-colors duration-500 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-electric/20 text-electric flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-electric group-hover:text-white transition-all duration-300">
                    <item.icon size={24} />
                  </div>
                  <h4 className="text-white font-bold font-heading text-xl mb-3">{item.title}</h4>
                  <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

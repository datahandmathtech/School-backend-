import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Cpu, Headset, GitPullRequest, TrendingUp, Sparkles } from 'lucide-react';

const About = () => {
  const team = [
    { name: 'Abhay Prajapati', role: 'Founder & CEO', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { name: 'Sarah Joseph', role: 'Head of Design', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { name: 'Vikram Singh', role: 'Chief Technology Officer', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="bg-offwhite min-h-screen">
      
      {/* 1. Immersive Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col justify-center pt-32 pb-24 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 z-0">
           <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-electric/10 blur-[120px] rounded-full" />
           <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/10 blur-[120px] rounded-full" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 border border-black/5 rounded-full font-bold text-xs uppercase tracking-widest text-navy mb-8 shadow-sm backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-electric animate-pulse" />
              About Us
            </motion.div>

            <motion.h1
              initial="hidden" animate="visible" variants={fadeUp}
              className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-8 leading-[1.05] tracking-tight text-navy"
            >
              Handmath Technologies <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-purple-600">India Private Limited</span>
            </motion.h1>

            <motion.div 
              initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-navy/70 leading-relaxed font-light max-w-4xl mx-auto mb-12 space-y-6 text-left md:text-center"
            >
              <p>
                We are a technology-driven startup focused on developing SaaS products and enterprise software solutions for businesses. We build operational management platforms, CRM systems, analytics dashboards, automation tools, cloud applications, and business intelligence solutions aimed at simplifying complex business operations for users across all levels of an organization.
              </p>
              <p>
                Handmath’s solutions help businesses capture data at the operational level, process it into MIS reports, cost insights, performance data, and actionable information, and make it accessible through centralized digital systems. This enables better coordination, cost reduction, transparency, informed decision-making, and a complete overview of business operations.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-navy/30"
        >
          <ArrowDown size={32} />
        </motion.div>
      </section>

      {/* 2. LogKaro Feature Banner */}
      <section className="py-12 relative z-20">
        <div className="container mx-auto px-6">
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="glass-card bg-navy p-10 md:p-16 rounded-[40px] text-center text-white border border-white/10 shadow-2xl relative overflow-hidden max-w-5xl mx-auto"
           >
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-electric/20 blur-[100px] rounded-full pointer-events-none" />
             
             <Sparkles className="text-electric mx-auto mb-6" size={40} />
             <h3 className="text-2xl md:text-3xl font-heading font-bold mb-6 relative z-10">Our Flagship Product: LogKaro</h3>
             <p className="text-white/70 text-lg md:text-xl leading-relaxed relative z-10 max-w-3xl mx-auto">
               LogKaro is a SaaS-based operational and fleet management platform focused on cost reduction, workflow visibility, report generation, approvals, and operational efficiency.
             </p>
           </motion.div>
        </div>
      </section>

      {/* 3. Core Pillars (Bento Grid) */}
      <section className="py-32 relative z-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20 max-w-3xl mx-auto">
             <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-navy">Our Core Pillars</h2>
             <p className="text-navy/60 text-lg">Innovation is engineered into every layer of our platform.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 max-w-7xl mx-auto">
            
            {/* Product Innovation - Span 8 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="md:col-span-8 glass-card bg-white p-10 lg:p-12 border border-black/5 hover:-translate-y-2 transition-transform duration-500 shadow-xl group"
            >
              <div className="w-14 h-14 rounded-2xl bg-electric/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <Cpu className="text-electric" size={28} />
              </div>
              <h3 className="text-3xl font-heading font-bold mb-4 text-navy">Product Innovation</h3>
              <p className="text-navy/60 leading-relaxed text-lg">
                Handmath is developing industry-adaptable SaaS products that convert operational data into structured dashboards, MIS reports, analytics, alerts, and decision-ready insights. Its initial product, LogKaro, enables businesses to monitor costs, resources, workflows, approvals, and operational performance through a centralized digital platform, making critical business information easily accessible to management in real time.
              </p>
            </motion.div>

            {/* Service Innovation - Span 4 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="md:col-span-4 glass-card bg-white p-10 lg:p-12 border border-black/5 hover:-translate-y-2 transition-transform duration-500 shadow-xl group"
            >
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <Headset className="text-purple-500" size={28} />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-4 text-navy">Service Innovation</h3>
              <p className="text-navy/60 leading-relaxed text-base">
                Real-time, technology-enabled business support that saves time in problem-solving. We provide 24/7 access to operational data, automated alerts, and AI chatbot support, helping users quickly resolve queries and take timely action.
              </p>
            </motion.div>

            {/* Process Innovation - Span 6 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="md:col-span-6 glass-card bg-offwhite p-10 lg:p-12 border border-black/5 hover:-translate-y-2 transition-transform duration-500 shadow-xl group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-electric/10 blur-[80px] rounded-full pointer-events-none" />
              <div className="w-14 h-14 rounded-2xl bg-electric/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <GitPullRequest className="text-electric" size={28} />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-4 text-navy">Process Innovation</h3>
              <p className="text-navy/60 leading-relaxed text-lg">
                We create a structured check-maker and approval-based workflow where field users enter data via an app, which updates in real time on the dashboard. This connects ground-level entry with high-level decision-making, reducing manual errors, improving transparency, and enabling clear bottom-to-top information flow through one centralized system.
              </p>
            </motion.div>

            {/* Scalability - Span 6 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
              className="md:col-span-6 glass-card bg-offwhite p-10 lg:p-12 border border-black/5 hover:-translate-y-2 transition-transform duration-500 shadow-xl group relative overflow-hidden"
            >
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-gold/10 blur-[80px] rounded-full pointer-events-none" />
              <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <TrendingUp className="text-gold" size={28} />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-4 text-navy">Scalability</h3>
              <p className="text-navy/60 leading-relaxed text-lg">
                Handmath’s modular SaaS model allows its software products to scale across industries, business sizes, and operational use-cases. It supports recurring revenue, multi-user deployment, and future expansion. By reducing inefficiencies, the platform supports long-term wealth creation through digital transformation.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default About;

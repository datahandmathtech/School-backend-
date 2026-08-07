import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ArrowUpRight, Truck, CreditCard, HeartPulse, BarChart3, ShoppingBag, ScanLine } from 'lucide-react';
import { cn } from '../utils/cn';

const categories = ['All', 'Web App', 'Mobile App', 'AI & Data'];

const projects = [
  {
    id: 1,
    title: 'LogKaro Fleet CRM',
    category: 'Web App',
    desc: 'End-to-end logistics & fleet management solution with real-time tracking.',
    tech: ['React', 'Node.js', 'AWS'],
    icon: Truck,
    gradient: 'from-blue-500/10 to-cyan-500/10',
    hoverText: 'group-hover:text-blue-600',
    hoverBg: 'group-hover:bg-blue-600'
  },
  {
    id: 2,
    title: 'FinTech Payment Gateway',
    category: 'Web App',
    desc: 'Secure, high-volume transaction processing engine for modern finance.',
    tech: ['Next.js', 'PostgreSQL'],
    icon: CreditCard,
    gradient: 'from-purple-500/10 to-pink-500/10',
    hoverText: 'group-hover:text-purple-600',
    hoverBg: 'group-hover:bg-purple-600'
  },
  {
    id: 3,
    title: 'Healthcare Booking Platform',
    category: 'Mobile App',
    desc: 'Telemedicine and clinic appointment scheduling application.',
    tech: ['React Native', 'Firebase'],
    icon: HeartPulse,
    gradient: 'from-emerald-500/10 to-teal-500/10',
    hoverText: 'group-hover:text-emerald-600',
    hoverBg: 'group-hover:bg-emerald-600'
  },
  {
    id: 4,
    title: 'Smart Analytics Portal',
    category: 'AI & Data',
    desc: 'Business intelligence dashboard with predictive AI modeling.',
    tech: ['Python', 'TensorFlow'],
    icon: BarChart3,
    gradient: 'from-orange-500/10 to-red-500/10',
    hoverText: 'group-hover:text-orange-600',
    hoverBg: 'group-hover:bg-orange-600'
  },
  {
    id: 5,
    title: 'E-Commerce Delivery App',
    category: 'Mobile App',
    desc: 'Last-mile delivery tracking app for retail giants.',
    tech: ['Flutter', 'Google Maps'],
    icon: ShoppingBag,
    gradient: 'from-indigo-500/10 to-blue-500/10',
    hoverText: 'group-hover:text-indigo-600',
    hoverBg: 'group-hover:bg-indigo-600'
  },
  {
    id: 6,
    title: 'AI Expense OCR Engine',
    category: 'AI & Data',
    desc: 'Automated receipt scanning and data extraction pipeline.',
    tech: ['Computer Vision', 'AWS'],
    icon: ScanLine,
    gradient: 'from-rose-500/10 to-orange-500/10',
    hoverText: 'group-hover:text-rose-600',
    hoverBg: 'group-hover:bg-rose-600'
  }
];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-32 relative overflow-hidden bg-offwhite">
      <div className="container mx-auto px-6">
        
        <div className="flex flex-col items-center text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-electric/5 text-electric rounded-full font-bold text-xs uppercase tracking-widest mb-6 border border-electric/10"
          >
            Case Studies
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-12 text-navy tracking-tight"
          >
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-purple-600">Projects</span>
          </motion.h2>

          {/* Premium Animated Pill Filters */}
          <div className="flex p-1.5 bg-black/5 rounded-full relative z-10 overflow-hidden backdrop-blur-sm border border-black/5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "relative px-6 py-2 rounded-full text-sm font-bold transition-colors z-20",
                  activeCategory === cat ? "text-white" : "text-navy/50 hover:text-navy"
                )}
              >
                {activeCategory === cat && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-navy rounded-full -z-10 shadow-md"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                transition={{ duration: 0.4, type: "spring" }}
                className="group relative overflow-hidden rounded-3xl bg-white shadow-sm hover:shadow-xl border border-black/5 cursor-pointer p-8 flex flex-col h-[320px] transition-all duration-500"
              >
                {/* Background Gradient & Icon Watermark */}
                <div className={cn("absolute inset-0 bg-gradient-to-br opacity-40 group-hover:opacity-100 transition-opacity duration-500", project.gradient)} />
                <div className="absolute -right-8 -bottom-8 opacity-[0.03] group-hover:opacity-[0.08] group-hover:scale-110 transition-all duration-700 pointer-events-none">
                  <project.icon size={200} />
                </div>

                <div className="relative z-10 flex justify-between items-start mb-auto">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-black/5 flex items-center justify-center text-navy/70 group-hover:text-navy transition-colors">
                      <project.icon size={24} />
                    </div>
                    <span className="px-3 py-1.5 bg-white/80 backdrop-blur-sm text-navy rounded-full text-[10px] font-bold uppercase tracking-widest border border-black/5 shadow-sm">
                      {project.category}
                    </span>
                  </div>
                  <div className={cn("w-10 h-10 rounded-full bg-white shadow-sm border border-black/5 flex items-center justify-center text-navy/40 transition-all duration-300", project.hoverBg, "group-hover:text-white group-hover:border-transparent")}>
                    <ArrowUpRight size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                <div className="relative z-10 mt-8">
                  <h3 className={cn("text-2xl font-heading font-bold text-navy mb-3 transition-colors leading-tight", project.hoverText)}>
                    {project.title}
                  </h3>
                  <p className="text-navy/60 text-sm mb-6 line-clamp-2">
                    {project.desc}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t, i) => (
                      <span key={i} className="px-3 py-1 bg-white/80 backdrop-blur-sm text-navy/70 text-[11px] font-semibold rounded-lg border border-black/5 shadow-sm">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;

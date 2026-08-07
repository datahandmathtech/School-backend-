import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, Users, FileText, ArrowRight, TrendingUp, Truck, 
  Zap, CheckCircle2, Code, Cloud, Shield, Wrench, Cpu, BarChart3, 
  Play, Check, Star, Navigation, Activity, CreditCard, Receipt
} from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import SEO from '../components/SEO';
import FAQSection from '../components/FAQSection';

const LogKaro = () => {
  // Animation Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "LogKaro CRM",
    "operatingSystem": "Web, iOS, Android",
    "applicationCategory": "BusinessApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    },
    "description": "Smart Taxi & Fleet Management CRM. Manage your entire taxi fleet, track drivers in real-time, automate payroll, and handle vehicle compliance on a single, powerful platform."
  };

  const logKaroFaqs = [
    {
      question: "What is LogKaro CRM?",
      answer: "LogKaro CRM is a specialized Smart Taxi & Fleet Management software designed to automate driver tracking, payroll, vehicle compliance, and overall logistics operations in a single dashboard."
    },
    {
      question: "Does LogKaro have a mobile app for drivers?",
      answer: "Yes, LogKaro provides a fast, lightweight Progressive Web App (PWA) for drivers. They can log trips, upload expenses, report accidents, and mark their attendance directly from their mobile phones."
    },
    {
      question: "Can it track vehicle compliance like insurance and PUC?",
      answer: "Absolutely. LogKaro automatically alerts you 30 days in advance for expiring vehicle documents like RC, PUC, Fitness certificates, Permits, and Insurance."
    },
    {
      question: "Does LogKaro handle driver payroll?",
      answer: "Yes, LogKaro features a Smart Payroll & Expense module that automates driver salaries, daily wages, overtime (OT), and daily expenses like fuel logs and parking fees."
    }
  ];

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-offwhite text-navy min-h-screen pt-28 font-body overflow-hidden"
    >
      <SEO 
        title="LogKaro - Smart Taxi & Fleet Management CRM" 
        description="Manage your entire taxi fleet, track drivers in real-time, automate payroll, and handle vehicle compliance with LogKaro CRM."
        url="/logkaro" 
        schema={softwareSchema} 
      />

      {/* 1. HERO SECTION - Breathtaking SaaS Layout */}
      <section className="relative pt-6 pb-24 lg:pt-8 lg:pb-32 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[800px] md:h-[800px] bg-electric/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
            
            {/* Left Column: Typography & CTA */}
            <motion.div 
              initial="hidden" animate="visible" variants={staggerContainer}
              className="lg:col-span-6 flex flex-col items-start text-left"
            >
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 bg-electric/10 text-electric rounded-full font-semibold text-xs tracking-wide mb-6 border border-electric/20 backdrop-blur-md">
                <SparklesIcon /> Introducing LogKaro v2.0
              </motion.div>
              
              <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-[64px] font-heading font-bold text-navy mb-6 leading-[1.05] tracking-tight">
                Smart Taxi & <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-purple-600">Fleet Management CRM.</span>
              </motion.h1>
              
              <motion.p variants={fadeUp} className="text-gold text-lg md:text-xl mb-10 max-w-xl leading-relaxed font-light">
                Manage your entire taxi fleet, track drivers in real-time, automate payroll, and handle vehicle compliance on a single, powerful platform. Say goodbye to paperwork and WhatsApp updates!
              </motion.p>
              
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <a href="https://logkaro.com/login" target="_blank" rel="noopener noreferrer" className="btn-primary flex items-center justify-center gap-2">
                  Access Portal
                  <ArrowRight size={18} />
                </a>
                <RouterLink to="/contact" className="btn-outline flex items-center justify-center gap-2">
                  <Play size={16} className="fill-navy" /> Watch Demo
                </RouterLink>
              </motion.div>

            </motion.div>

            {/* Right Column: Animated Dashboard Mockup */}
            <motion.div 
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, type: 'spring', stiffness: 100 }}
              className="lg:col-span-6 relative lg:-mt-16"
            >
              <img 
                src="/dashboard-preview.png" 
                alt="LogKaro Executive Dashboard" 
                className="w-full h-auto rounded-2xl shadow-2xl border border-navy/10 relative z-20" 
              />

            </motion.div>
          </div>
        </div>
      </section>

      {/* --- NEW SECTIONS REQUESTED BY USER --- */}
      
      {/* SECTION 2: Interactive Product Cards */}
      <section className="py-24 bg-offwhite">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { id: 'software-define', title: 'Software Define', icon: Code },
              { id: 'workflow', title: 'Workflow', icon: Zap },
              { id: 'features', title: 'Features', icon: Star },
              { id: 'pricing', title: 'Pricing', icon: CreditCard }
            ].map((item) => (
              <RouterLink 
                key={item.id}
                to={`/logkaro/${item.id}`}
                className="group flex flex-col bg-white p-8 rounded-3xl shadow-sm border border-black/5 hover:shadow-2xl hover:border-electric/30 hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-offwhite flex items-center justify-center text-navy mb-6 group-hover:bg-electric group-hover:text-white transition-colors">
                  <item.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-navy mb-3 group-hover:text-electric transition-colors">
                  {item.title}
                </h3>
                <p className="text-navy/60 text-sm leading-relaxed mb-6 flex-1">
                  [Add your short description for {item.title} here...]
                </p>
                <div className="flex items-center text-electric text-sm font-bold gap-2 mt-auto">
                  Explore <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </RouterLink>
            ))}
          </div>
        </div>
      </section>

      {/* 2. BENTO GRID FEATURES SECTION */}
      <section className="py-24 bg-white relative z-20">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-heading font-bold text-navy mb-4">Everything You Need to Run Your Fleet.</h2>
            <p className="text-gold text-lg">
              Powerful features engineered to automate your day-to-day taxi and logistics operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-6xl mx-auto">
            {/* 1. Large Card (Span 8) - GPS */}
            <div className="md:col-span-8 glass-card bg-offwhite p-8 md:p-12 overflow-hidden relative group">
              <div className="relative z-10 w-full md:w-2/3">
                <Navigation className="text-electric mb-6" size={32} />
                <h3 className="text-2xl font-bold font-heading mb-3">Smart Driver Attendance & Verification</h3>
                <p className="text-navy/60 leading-relaxed mb-6">
                  Smart Punch-In and Punch-Out system. Capture live driver selfies and exact odometer readings digitally at the start and end of every duty to ensure total transparency.
                </p>
                <RouterLink to="/contact" className="inline-flex items-center gap-1 text-sm font-semibold text-electric group-hover:gap-2 transition-all">
                  Learn more <ArrowRight size={16} />
                </RouterLink>
              </div>
              {/* Decorative Map Graphic */}
              <div className="hidden md:flex absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-blue-100/50 to-transparent items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity">
                <div className="w-64 h-64 border border-electric/20 rounded-full flex items-center justify-center relative">
                  <div className="w-48 h-48 border border-electric/20 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
                  <div className="w-3 h-3 bg-electric rounded-full absolute top-10 left-10 shadow-[0_0_15px_rgba(37,99,235,1)]" />
                  <div className="w-3 h-3 bg-purple-500 rounded-full absolute bottom-16 right-16 shadow-[0_0_15px_rgba(168,85,247,1)]" />
                </div>
              </div>
            </div>

            {/* 5. Mobile App (Span 4) */}
            <div className="md:col-span-4 glass-card bg-navy p-8 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-electric/30 blur-2xl rounded-full -mr-10 -mt-10" />
              <Zap className="text-white/80 mb-6 relative z-10" size={32} />
              <h3 className="text-2xl font-bold font-heading mb-3 relative z-10">Driver-Friendly Mobile App (PWA)</h3>
              <p className="text-white/60 text-sm leading-relaxed relative z-10">
                Equip your drivers with a fast, lightweight web app. No heavy downloads required—drivers can log their trips, upload expenses, and report accidents in one tap.
              </p>
            </div>

            {/* 2. Compliance (Span 4) */}
            <div className="md:col-span-4 glass-card bg-offwhite p-8 group hover:shadow-lg transition-all border border-black/5">
              <ShieldCheck className="text-green-500 mb-6" size={32} />
              <h3 className="text-xl font-bold font-heading mb-2">Vehicle & Compliance</h3>
              <p className="text-gold text-sm">Never miss a renewal date. Get automated alerts for expiring vehicle documents like RC, PUC, Fitness, Permit, and Insurance 30 days in advance.</p>
            </div>
            
            {/* 3. Payroll (Span 4) */}
            <div className="md:col-span-4 glass-card bg-offwhite p-8 group hover:shadow-lg transition-all border border-black/5">
              <CreditCard className="text-purple-500 mb-6" size={32} />
              <h3 className="text-xl font-bold font-heading mb-2">Smart Payroll & Expense</h3>
              <p className="text-gold text-sm">Automate driver salaries, daily wages, and overtime (OT). Track daily expenses like fuel logs, parking fees, and border taxes seamlessly.</p>
            </div>
            
            {/* 4. Fastag (Span 4) */}
            <div className="md:col-span-4 glass-card bg-offwhite p-8 group hover:shadow-lg transition-all border border-black/5">
              <Truck className="text-amber-500 mb-6" size={32} />
              <h3 className="text-xl font-bold font-heading mb-2">Fastag & Maintenance</h3>
              <p className="text-gold text-sm">Monitor Fastag balances, recharge history, and vehicle maintenance logs. Keep track of spare parts warranty directly from your dashboard.</p>
            </div>

            {/* 6. Analytics (Span 12) */}
            <div className="md:col-span-12 glass-card bg-offwhite p-8 md:p-12 group hover:shadow-lg transition-all border border-black/5 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-grow">
                <BarChart3 className="text-electric mb-6" size={32} />
                <h3 className="text-2xl font-bold font-heading mb-3">One-Click Reports & Analytics</h3>
                <p className="text-gold text-sm max-w-3xl">Make data-driven decisions. Export comprehensive monthly reports of driver attendance, vehicle usage, and financial settlements in PDF or Excel formats instantly.</p>
              </div>
              <div className="w-full md:w-auto shrink-0 flex gap-2">
                 <button className="px-6 py-3 bg-white border border-black/10 rounded-xl font-bold text-sm text-navy hover:bg-electric hover:text-white hover:border-electric transition-colors shadow-sm">
                   Export PDF
                 </button>
                 <button className="px-6 py-3 bg-white border border-black/10 rounded-xl font-bold text-sm text-navy hover:bg-green-600 hover:text-white hover:border-green-600 transition-colors shadow-sm">
                   Export Excel
                 </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. DASHBOARD SHOWCASE SECTION */}
      <section className="py-24 bg-navy relative z-20 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-electric/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading font-bold text-white mb-6 text-4xl md:text-5xl">Mission Control for Your Fleet</h2>
            <p className="text-white/70 text-lg">
              A meticulously crafted command center that gives you god-mode visibility over every vehicle, driver, and transaction.
            </p>
          </div>

          <div className="relative w-full max-w-5xl mx-auto">
            {/* Main Dashboard Window */}
            <motion.div 
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="glass-card bg-white/5 border-white/10 p-2 shadow-2xl backdrop-blur-2xl rounded-3xl"
            >
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5 rounded-t-3xl">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="p-6 md:p-10 bg-navy/50 rounded-b-3xl grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Left Sidebar */}
                <div className="md:col-span-3 space-y-4">
                   <div className="h-10 bg-white/10 rounded-lg animate-pulse" />
                   <div className="h-10 bg-white/5 rounded-lg w-4/5" />
                   <div className="h-10 bg-white/5 rounded-lg w-5/6" />
                   <div className="h-10 bg-white/5 rounded-lg w-full" />
                   <div className="h-10 bg-electric/20 rounded-lg w-4/5 border border-electric/30" />
                </div>

                {/* Main Content Area */}
                <div className="md:col-span-9 space-y-6">
                  {/* Top KPIs */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                     <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                       <span className="text-white/50 text-xs block mb-2 uppercase">Total Revenue</span>
                       <span className="text-2xl font-bold text-white font-heading">₹2,84,500</span>
                       <span className="text-green-400 text-xs flex items-center gap-1 mt-2"><TrendingUp size={12}/> +14.2%</span>
                     </div>
                     <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                       <span className="text-white/50 text-xs block mb-2 uppercase">Active Shifts</span>
                       <span className="text-2xl font-bold text-white font-heading">142</span>
                       <span className="text-green-400 text-xs flex items-center gap-1 mt-2"><TrendingUp size={12}/> +5.1%</span>
                     </div>
                     <div className="p-4 bg-electric/20 rounded-xl border border-electric/30">
                       <span className="text-white/80 text-xs block mb-2 uppercase">Fleet Utilization</span>
                       <span className="text-2xl font-bold text-white font-heading">94.8%</span>
                       <span className="text-white/60 text-xs flex items-center gap-1 mt-2">Optimal</span>
                     </div>
                  </div>

                  {/* Main Graph & Timeline */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 p-6 bg-white/5 rounded-2xl border border-white/10 h-64 flex flex-col justify-end">
                      {/* Fake Graph */}
                      <div className="flex justify-between items-end gap-2 h-40">
                         {[30, 45, 60, 40, 75, 85, 65, 90, 100, 80].map((h, i) => (
                           <div key={i} className="w-full bg-electric/50 rounded-t-sm hover:bg-electric transition-colors" style={{ height: `${h}%` }} />
                         ))}
                      </div>
                    </div>
                    
                    <div className="lg:col-span-1 p-6 bg-white/5 rounded-2xl border border-white/10 space-y-4">
                      <span className="text-white/50 text-xs uppercase block mb-4">Live Activity</span>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <div className="flex-1 h-2 bg-white/10 rounded-full" />
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-amber-500" />
                        <div className="flex-1 h-2 bg-white/10 rounded-full w-3/4" />
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-electric" />
                        <div className="flex-1 h-2 bg-white/10 rounded-full w-5/6" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Floating Layered UI Elements (Stripe style) */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-10 -left-10 glass-card bg-white p-4 rounded-2xl shadow-2xl flex items-center gap-4 z-30"
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                <Receipt size={24} />
              </div>
              <div>
                <span className="block text-sm font-bold text-navy">Invoice Paid</span>
                <span className="block text-xs text-gold">₹12,400 from UberFleet</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute top-20 -right-12 glass-card bg-white p-4 rounded-2xl shadow-2xl z-30"
            >
               <span className="block text-xs font-bold text-navy/40 uppercase mb-2">Fleet Health</span>
               <div className="w-32 h-2 bg-black/5 rounded-full overflow-hidden">
                 <div className="w-[94%] h-full bg-gradient-to-r from-electric to-purple-500" />
               </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 4. TESTIMONIALS CAROUSEL (Glassmorphism) */}
      <section className="py-24 bg-offwhite relative overflow-hidden border-y border-black/5">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-navy mb-4">Trusted by Industry Leaders</h2>
          </div>
          
          <div className="flex gap-6 overflow-x-auto pb-10 hide-scrollbar snap-x snap-mandatory px-4" style={{ scrollbarWidth: 'none' }}>
            {/* Fake Reviews */}
            {[
              { name: 'Sarah Jenkins', role: 'VP Operations, TransitGo', text: 'LogKaro completely revolutionized our dispatch workflow. We cut manual auditing time by 80%.' },
              { name: 'David Chen', role: 'CEO, FastLogistics', text: 'The interface is stunningly fast. Our drivers actually enjoy using the mobile app to log receipts.' },
              { name: 'Michael Ross', role: 'Fleet Manager, MetroRide', text: 'LogKaro has made our operations completely paperless. Zero downtime in two years of operation.' }
            ].map((review, idx) => (
              <div key={idx} className="glass-card bg-white p-8 min-w-[350px] md:min-w-[400px] snap-center flex-shrink-0">
                <div className="flex text-amber-400 mb-4">
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                </div>
                <p className="text-navy text-base leading-relaxed mb-6 font-medium">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-electric to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-navy">{review.name}</h4>
                    <span className="text-xs text-gold">{review.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FAQ SECTION FOR GEO */}
      <FAQSection faqs={logKaroFaqs} title="LogKaro FAQs" subtitle="Common questions about our fleet management CRM." />

      {/* 6. PREMIUM CTA SECTION */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-navy" />
        <div className="absolute inset-0 bg-gradient-to-br from-electric/40 to-transparent" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-electric/20 to-transparent blur-3xl" />
        
        <div className="container relative z-10 text-center text-white">
          <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6">Ready to accelerate?</h2>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Join hundreds of modern businesses scaling their fleets with LogKaro CRM.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <RouterLink to="/contact" className="px-8 py-4 rounded-full bg-white text-navy font-bold hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              Get Started Now
            </RouterLink>
            <a href="https://logkaro.com/login" target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-full border border-white/20 bg-white/5 backdrop-blur text-white font-bold hover:bg-white/10 transition-colors">
              Access Portal
            </a>
          </div>
        </div>
      </section>
    </motion.main>
  );
};

// Mini Sparkles Icon for the hero badge
function SparklesIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="currentColor"/>
    </svg>
  )
}

export default LogKaro;

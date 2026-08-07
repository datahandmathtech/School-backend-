import React from 'react';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import { 
  Cloud, BellRing, Banknote, Map, Car, BarChart3, 
  Camera, Calculator, Receipt, ShieldCheck, ArrowLeft
} from 'lucide-react';

const SoftwareDefine = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  return (
    <div className="bg-offwhite min-h-screen pt-28 font-body overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-16 pb-24 lg:pt-24 lg:pb-32 overflow-hidden text-center">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-electric/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10 max-w-5xl">
          
          <div className="flex justify-center mb-8">
            <RouterLink to="/logkaro" className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-black/5 rounded-full font-bold text-sm text-navy hover:text-electric hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
              <ArrowLeft size={16} /> Back to LogKaro
            </RouterLink>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-black/5 rounded-full font-bold text-xs uppercase tracking-widest text-electric mb-8 shadow-sm"
          >
            <ShieldCheck size={14} /> Software Define
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-[72px] font-heading font-bold text-navy leading-[1.05] tracking-tight mb-8"
          >
            A Complete Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-purple-600">Ecosystem</span> <br className="hidden md:block" />for Your Transport Business
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-navy/70 leading-relaxed font-light max-w-4xl mx-auto"
          >
            LogKaro is an advanced Fleet Management CRM designed to automate your daily operations, eliminate paperwork, and bring <strong>100% transparency</strong> to your business.
          </motion.p>
        </div>
      </section>

      {/* 2. CORE CAPABILITIES (Bento Grid) */}
      <section className="py-24 bg-white relative z-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Capability 1 */}
            <motion.div variants={fadeUp} className="bg-offwhite p-10 rounded-[2rem] border border-black/5 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-electric/10 flex items-center justify-center text-electric mb-6">
                <Cloud size={28} />
              </div>
              <h3 className="text-2xl font-bold font-heading text-navy mb-4">100% Digital Operations</h3>
              <p className="text-navy/70 text-lg leading-relaxed">
                Manage your entire fleet, drivers, and office staff from a single, centralized cloud dashboard. Say goodbye to physical diaries and scattered WhatsApp updates.
              </p>
            </motion.div>

            {/* Capability 2 */}
            <motion.div variants={fadeUp} className="bg-offwhite p-10 rounded-[2rem] border border-black/5 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-600 mb-6">
                <BellRing size={28} />
              </div>
              <h3 className="text-2xl font-bold font-heading text-navy mb-4">Automated Compliance Alerts</h3>
              <p className="text-navy/70 text-lg leading-relaxed">
                Never miss a renewal. The system proactively alerts you 30 days before critical vehicle documents—such as RC, Insurance, and Permits—expire.
              </p>
            </motion.div>

            {/* Capability 3 */}
            <motion.div variants={fadeUp} className="bg-gradient-to-br from-electric to-blue-600 p-10 rounded-[2rem] text-white shadow-xl shadow-electric/20 md:col-span-2 lg:col-span-1">
              <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white mb-6">
                <Banknote size={28} />
              </div>
              <h3 className="text-2xl font-bold font-heading mb-4">Smart Financial Automation</h3>
              <p className="text-white/80 text-lg leading-relaxed">
                Effortlessly automate driver salaries, calculate overtime (OT) automatically, and maintain a clear digital ledger for daily wages and cash advances.
              </p>
            </motion.div>

            {/* Capability 4 */}
            <motion.div variants={fadeUp} className="bg-offwhite p-10 rounded-[2rem] border border-black/5 hover:shadow-xl transition-all duration-300 md:col-span-2 lg:col-span-1">
              <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center text-gold mb-6">
                <Map size={28} />
              </div>
              <h3 className="text-2xl font-bold font-heading text-navy mb-4">Real-Time Visibility</h3>
              <p className="text-navy/70 text-lg leading-relaxed">
                Track the live status of your vehicles and drivers. Know exactly where your assets are and monitor operational expenses as they happen in real-time.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. ADVANCED VEHICLE LEDGER (CAR LOGS) */}
      <section className="py-24 bg-navy relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-electric/20 to-transparent" />
        
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full font-bold text-xs uppercase tracking-widest text-white mb-6 backdrop-blur-md">
              <Car size={14} /> The Core Feature
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Advanced Vehicle Ledger <br />(Car Logs)
            </h2>
            <p className="text-xl text-white/70 font-light leading-relaxed">
              Complete A-to-Z Financial & Operational Control for Every Vehicle. The Car Log is not just a tracking tool; it is the ultimate financial and operational ledger for every single vehicle in your fleet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            <div className="flex gap-6 group">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-electric transition-colors duration-300">
                <BarChart3 size={28} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">A-to-Z Lifetime Cost Analytics</h3>
                <p className="text-white/60 text-lg leading-relaxed">
                  Get a complete financial breakdown for any individual car. Aggregates all fuel, maintenance, toll, and parking expenses, giving precise reports on total vehicle costs for any given Month or Financial Year (FY).
                </p>
              </div>
            </div>

            <div className="flex gap-6 group">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-electric transition-colors duration-300">
                <Camera size={28} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">Fraud-Proof Duty Tracking</h3>
                <p className="text-white/60 text-lg leading-relaxed">
                  Every shift begins and ends with a live camera selfie and digital odometer capture, completely eliminating fake attendance and unauthorized vehicle usage.
                </p>
              </div>
            </div>

            <div className="flex gap-6 group">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-electric transition-colors duration-300">
                <Calculator size={28} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">Automated Mileage Calculations</h3>
                <p className="text-white/60 text-lg leading-relaxed">
                  The system digitally captures the starting and closing odometer readings, automatically calculating the exact kilometers driven without room for manual errors.
                </p>
              </div>
            </div>

            <div className="flex gap-6 group">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-electric transition-colors duration-300">
                <Receipt size={28} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">Digital Expense Proofs</h3>
                <p className="text-white/60 text-lg leading-relaxed">
                  Drivers instantly capture and upload photos of fuel bills, parking slips, and toll receipts directly into the log. These are automatically linked to the vehicle's financial reports for effortless auditing.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default SoftwareDefine;

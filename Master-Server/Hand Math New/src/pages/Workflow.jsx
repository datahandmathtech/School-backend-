import React from 'react';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import { 
  Users, ShieldCheck, UserCog, Car, Banknote, MapPin, 
  Activity, Clock, Network, Zap, ArrowLeft
} from 'lucide-react';

const Workflow = () => {
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
      <section className="relative pt-16 pb-20 text-center">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />
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
            <Network size={14} /> System Architecture
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-[72px] font-heading font-bold text-navy leading-[1.05] tracking-tight mb-8"
          >
            Taxi Fleet CRM <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-purple-600">Software Workflow</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-navy/70 leading-relaxed font-light max-w-4xl mx-auto"
          >
            A high-performance, multi-tenant corporate platform designed to intelligently manage vehicle fleets, driver performance, and automated payroll logistics.
          </motion.p>
        </div>
      </section>

      {/* 2. SYSTEM ARCHITECTURE AI CHART */}
      <section className="py-12 relative z-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 1 }}
            className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-white/20 bg-navy p-2 md:p-4 mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-electric/20 to-purple-600/20 mix-blend-overlay" />
            <div className="bg-navy rounded-2xl overflow-hidden relative border border-white/10">
              <img 
                src="/system_architecture_chart.png" 
                alt="AI Generated System Architecture Chart" 
                className="w-full h-auto opacity-80 hover:opacity-100 transition-opacity duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent opacity-80 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 text-white">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-electric/20 border border-electric/30 rounded-full font-bold text-[10px] tracking-widest uppercase mb-4 backdrop-blur-md">
                  <Zap size={12} /> Master Data Architecture
                </div>
                <h3 className="text-3xl md:text-4xl font-heading font-bold mb-2">Centralized Database Schema</h3>
                <p className="text-white/60 max-w-2xl text-lg">
                  Unified mapping of Admins, Executives, Staff, Drivers, Vehicles, and Maintenance Logs functioning in strict IST synchronization.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. USER ROLES */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-navy mb-4">Role-Based Access Control</h2>
            <p className="text-navy/60 text-lg">Strict hierarchical permissions for operational security.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: ShieldCheck, title: 'Admin', desc: 'Full system control. Manages company accounts, disbursements, and financial approvals.' },
              { icon: UserCog, title: 'Executive', desc: 'Operational supervisor. Checks-in drivers and approves fuel/parking expenses.' },
              { icon: Users, title: 'Staff', desc: 'Internal personnel. Tracked by geolocation geofences for automated attendance.' },
              { icon: Car, title: 'Drivers', desc: 'Mobile portal access for attendance, trip logging, and out-of-pocket expenses.' }
            ].map((role, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-offwhite border border-black/5 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-navy mb-6 group-hover:bg-electric group-hover:text-white transition-colors">
                  <role.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-navy mb-3">{role.title}</h3>
                <p className="text-navy/60 text-sm leading-relaxed">{role.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CORE OPERATIONS */}
      <section className="py-24 bg-navy text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-electric/10 to-transparent" />
        
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">Core Operational Engine</h2>
            <p className="text-white/60 text-lg max-w-2xl">Automated logics processing daily logistics, attendance, and payroll.</p>
          </div>

          <div className="space-y-6">
            {/* Operation 1 */}
            <div className="p-8 md:p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors flex flex-col md:flex-row gap-8 items-start">
              <div className="w-16 h-16 rounded-full bg-electric/20 text-electric flex items-center justify-center shrink-0">
                <Clock size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">Driver Attendance & Overtime</h3>
                <p className="text-white/70 leading-relaxed mb-4">
                  Punch-in requires a live selfie and validated odometer reading. If a shift exceeds 9 hours, the system automatically triggers the Overtime Engine and dynamically calculates additional earnings.
                </p>
                <div className="inline-flex items-center gap-2 text-xs font-mono bg-black/30 px-3 py-1.5 rounded-lg text-electric">
                  Overtime = max(0, Shift Hours − Threshold) × OT Rate
                </div>
              </div>
            </div>

            {/* Operation 2 */}
            <div className="p-8 md:p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors flex flex-col md:flex-row gap-8 items-start">
              <div className="w-16 h-16 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                <MapPin size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">Freelancer & Office Staff Payroll</h3>
                <p className="text-white/70 leading-relaxed">
                  Freelance drivers are paid dynamically based on precise trip distance (Closing Odometer - Opening Odometer) multiplied by their custom Per-KM rate. Meanwhile, Office Staff salaries rely on strict system checks to prevent fraudulent punch-ins.
                </p>
              </div>
            </div>

            {/* Operation 3 */}
            <div className="p-8 md:p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors flex flex-col md:flex-row gap-8 items-start">
              <div className="w-16 h-16 rounded-full bg-gold/20 text-gold flex items-center justify-center shrink-0">
                <Banknote size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">Unified Expense & Maintenance Feed</h3>
                <p className="text-white/70 leading-relaxed">
                  A revolutionary unified operations deck tracks live Fastag balances, border tax permits, and vehicle wash expenses in a single chronological feed. The system also calculates true fuel efficiency (km/L) instantly upon logging refills.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Workflow;

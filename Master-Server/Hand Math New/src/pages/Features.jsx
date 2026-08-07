import React from 'react';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import { 
  MapPin, Banknote, ShieldCheck, Building2, Car, 
  BarChart3, Receipt, Calculator, Wrench, ArrowLeft, Star
} from 'lucide-react';

const Features = () => {
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
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gold/10 blur-[100px] rounded-full pointer-events-none" />
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
            <Star size={14} /> Core Features
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-[72px] font-heading font-bold text-navy leading-[1.05] tracking-tight mb-8"
          >
            Powerful Features for <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-gold">Modern Fleet Operators</span>
          </motion.h1>
          
        </div>
      </section>

      {/* 2. CORE FEATURES (Bento Grid) */}
      <section className="py-12 bg-transparent relative z-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Feature 1 */}
            <motion.div variants={fadeUp} className="bg-white p-10 rounded-[2.5rem] border border-black/5 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] transition-all duration-500 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-electric/5 rounded-bl-[100%] transition-transform duration-500 group-hover:scale-110 pointer-events-none" />
              <div className="w-16 h-16 rounded-2xl bg-electric/10 flex items-center justify-center text-electric mb-8 group-hover:scale-110 transition-transform duration-500">
                <MapPin size={32} />
              </div>
              <h3 className="text-3xl font-bold font-heading text-navy mb-4">Smart Duty Operations & Attendance</h3>
              <p className="text-navy/70 text-lg leading-relaxed">
                Eliminate manual logbooks. Drivers use our smart mobile app to punch-in and punch-out with camera-verified selfies and digital odometer readings, ensuring <strong>100% fraud-free attendance</strong>.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div variants={fadeUp} className="bg-white p-10 rounded-[2.5rem] border border-black/5 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] transition-all duration-500 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-bl-[100%] transition-transform duration-500 group-hover:scale-110 pointer-events-none" />
              <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-600 mb-8 group-hover:scale-110 transition-transform duration-500">
                <Banknote size={32} />
              </div>
              <h3 className="text-3xl font-bold font-heading text-navy mb-4">Automated Payroll & Expense Engine</h3>
              <p className="text-navy/70 text-lg leading-relaxed">
                Stop calculating driver wages manually. Our system automatically processes daily wages, overtime (OT) hours, night-stay bonuses, and manages cash advances with complete accuracy.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div variants={fadeUp} className="bg-white p-10 rounded-[2.5rem] border border-black/5 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] transition-all duration-500 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-bl-[100%] transition-transform duration-500 group-hover:scale-110 pointer-events-none" />
              <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500 mb-8 group-hover:scale-110 transition-transform duration-500">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-3xl font-bold font-heading text-navy mb-4">Automated Vehicle Compliance</h3>
              <p className="text-navy/70 text-lg leading-relaxed">
                Never pay a penalty again. The system acts as your compliance watchdog, sending automated alerts 30 days before critical documents like RC, PUC, Permits, and Insurance expire.
              </p>
            </motion.div>

            {/* Feature 4 */}
            <motion.div variants={fadeUp} className="bg-navy p-10 rounded-[2.5rem] text-white shadow-2xl transition-all duration-500 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-electric/20 to-transparent opacity-50" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform duration-500 border border-white/20">
                  <Building2 size={32} />
                </div>
                <h3 className="text-3xl font-bold font-heading mb-4">Multi-Branch & Vendor Fleet Management</h3>
                <p className="text-white/80 text-lg leading-relaxed">
                  Designed for scalability. Manage your own company vehicles alongside third-party vendor (outside) cars securely from a single, centralized Super Admin dashboard.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. THE "CAR LOGS" HIGHLIGHT SECTION */}
      <section className="py-24 bg-navy relative overflow-hidden text-white mt-12">
        <div className="absolute inset-0 bg-gradient-to-br from-electric/20 to-transparent" />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-electric/20 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            {/* Left Content */}
            <div className="lg:w-1/2">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-electric/20 rounded-full font-bold text-xs uppercase tracking-widest text-electric mb-6 backdrop-blur-md border border-electric/30">
                <Car size={14} /> The Ultimate Advantage
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
                The "Car Logs" <br />Advanced Ledger
              </h2>
              <p className="text-2xl font-light text-white/90 mb-8">
                A-to-Z Financial Control for Every Single Vehicle.
              </p>
              <p className="text-lg text-white/70 leading-relaxed mb-10">
                Our advanced "Car Logs" act as a complete digital diary and financial ledger for your vehicles, offering 360-degree visibility into daily operations and eliminating blind spots.
              </p>
            </div>

            {/* Right Content - 4 Points Grid */}
            <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
                <BarChart3 size={28} className="text-gold mb-4" />
                <h4 className="text-xl font-bold mb-3">Lifetime Cost Analytics</h4>
                <p className="text-white/70 text-sm leading-relaxed">
                  Instantly view the A-to-Z total cost of any car. Aggregates fuel, maintenance, parking, and tolls for accurate Monthly & FY expense reports.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
                <Receipt size={28} className="text-gold mb-4" />
                <h4 className="text-xl font-bold mb-3">Digital Expense Receipts</h4>
                <p className="text-white/70 text-sm leading-relaxed">
                  Drivers instantly upload photos of fuel bills and toll receipts while on duty, seamlessly linking the proofs to the vehicle’s ledger.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
                <Calculator size={28} className="text-gold mb-4" />
                <h4 className="text-xl font-bold mb-3">Automated Mileage Calculation</h4>
                <p className="text-white/70 text-sm leading-relaxed">
                  Prevent mileage manipulation. The CRM automatically calculates exact daily kilometers driven based on verified starting and closing meters.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
                <Wrench size={28} className="text-gold mb-4" />
                <h4 className="text-xl font-bold mb-3">Fastag & Maintenance Tracking</h4>
                <p className="text-white/70 text-sm leading-relaxed">
                  Easily monitor live Fastag balances, track recharge histories, and maintain a complete log of spare parts and vehicle warranties.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Features;

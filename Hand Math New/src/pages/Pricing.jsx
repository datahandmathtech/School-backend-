import React from 'react';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import { 
  Check, ArrowLeft, CreditCard, Shield, Zap, HelpCircle, 
  Car, MapPin, Calculator, Banknote
} from 'lucide-react';

const Pricing = () => {
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
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-electric/10 blur-[100px] rounded-full pointer-events-none" />
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
            <CreditCard size={14} /> Transparent Pricing
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-[72px] font-heading font-bold text-navy leading-[1.05] tracking-tight mb-8"
          >
            Simple Pricing for <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-purple-600">Maximum ROI</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-navy/70 leading-relaxed font-light max-w-2xl mx-auto mb-12"
          >
            No hidden fees, no complex tiers. Get full access to the ultimate fleet management CRM for one flat rate per vehicle.
          </motion.p>
        </div>
      </section>

      {/* 2. THE PRICING CARD */}
      <section className="py-12 relative z-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 1 }}
            className="bg-navy rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden border border-white/10"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-electric/20 to-transparent" />
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-electric/20 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
              
              {/* Left: Price Details */}
              <div className="w-full md:w-1/2 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 rounded-full font-bold text-xs uppercase tracking-widest text-gold mb-6 backdrop-blur-md">
                  <Zap size={14} className="text-gold" /> LogKaro Professional
                </div>
                
                <div className="flex items-end justify-center md:justify-start gap-2 mb-2">
                  <span className="text-3xl font-bold text-white/60 mb-2">₹</span>
                  <span className="text-7xl md:text-8xl font-heading font-extrabold text-white leading-none">299</span>
                </div>
                <div className="text-electric text-xl font-bold tracking-wider mb-6">
                  + GST / Vehicle / Month
                </div>
                
                <p className="text-white/70 text-lg leading-relaxed mb-8">
                  Everything you need to automate your transport business, eliminate paperwork, and take 100% control of your finances.
                </p>

                <button className="w-full bg-electric hover:bg-white text-white hover:text-navy px-8 py-5 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg shadow-electric/30 hover:shadow-xl hover:-translate-y-1">
                  Start Your Free Trial
                </button>
              </div>

              {/* Right: Features Included */}
              <div className="w-full md:w-1/2 bg-white/5 backdrop-blur-lg rounded-[2rem] p-8 border border-white/10">
                <h3 className="text-white font-heading font-bold text-2xl mb-6">What's Included:</h3>
                
                <ul className="space-y-5">
                  {[
                    "Complete 'Car Logs' Financial Ledger",
                    "Smart Duty Operations & Attendance",
                    "Automated Payroll & Overtime Engine",
                    "Automated Vehicle Compliance Alerts",
                    "Multi-Branch & Vendor Management",
                    "Fraud-Proof Digital Expense Receipts",
                    "Unlimited Driver & Staff Accounts"
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-electric/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={14} className="text-electric" />
                      </div>
                      <span className="text-white/80 text-lg">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. VALUE PROPOSITION */}
      <section className="py-24 bg-transparent">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-navy mb-4">Why ₹299 is an Investment, Not a Cost.</h2>
            <p className="text-navy/60 text-lg">Our clients save an average of ₹5,000 per vehicle monthly by preventing fraud and leaks.</p>
          </div>
          
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div variants={fadeUp} className="bg-white p-8 rounded-3xl border border-black/5 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 mb-6">
                <Shield size={24} />
              </div>
              <h4 className="text-xl font-bold text-navy mb-3">Eliminate Fake Fuel Bills</h4>
              <p className="text-navy/60 leading-relaxed">Live camera receipts ensure that drivers cannot submit manipulated or duplicate toll and fuel expenses.</p>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-white p-8 rounded-3xl border border-black/5 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-600 mb-6">
                <Calculator size={24} />
              </div>
              <h4 className="text-xl font-bold text-navy mb-3">Zero Payroll Errors</h4>
              <p className="text-navy/60 leading-relaxed">Automated overtime and advance adjustments mean you never overpay a driver due to manual calculation mistakes.</p>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-white p-8 rounded-3xl border border-black/5 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold mb-6">
                <Banknote size={24} />
              </div>
              <h4 className="text-xl font-bold text-navy mb-3">Avoid Compliance Penalties</h4>
              <p className="text-navy/60 leading-relaxed">30-day proactive alerts for RC and Insurance prevent heavy RTO challans and vehicle seizures.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Pricing;

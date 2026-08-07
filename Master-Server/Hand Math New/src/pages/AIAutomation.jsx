import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, BrainCircuit, Bot, Workflow, LineChart, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';

const AIAutomation = () => {
  const features = [
    { icon: Bot, title: 'Custom LLM Agents', desc: 'Intelligent chatbots trained on your specific company data and documents.' },
    { icon: Workflow, title: 'Workflow Automation', desc: 'Seamless integration with Zapier, Make, and custom API pipelines.' },
    { icon: BrainCircuit, title: 'Predictive Analytics', desc: 'Machine learning models to forecast trends and customer behavior.' },
    { icon: LineChart, title: '10x Efficiency', desc: 'Reduce manual data entry and operational bottlenecks by up to 90%.' },
    { icon: ShieldCheck, title: 'Enterprise Security', desc: 'Private AI deployments ensuring your data never trains public models.' },
    { icon: Sparkles, title: 'Generative AI', desc: 'Automated content creation, report generation, and code assistance.' }
  ];

  return (
    <main className="bg-navy text-white min-h-screen pt-28 font-body overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-br from-emerald-500/10 to-teal-500/10 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="container relative z-10 mx-auto px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full font-bold text-xs tracking-wider uppercase mb-8">
              <Sparkles size={14} /> AI & Automation
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-8 leading-tight">
              Work Smarter, Not Harder with <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">AI Agents.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed">
              Supercharge your business operations. We build custom AI models, intelligent chatbots, and automated workflows that save you thousands of hours every month.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <RouterLink to="/contact" className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-full transition-all hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2">
                Automate Your Business <ArrowRight size={18} />
              </RouterLink>
            </div>
          </motion.div>
        </div>
        
        {/* Animated UI Elements */}
        <div className="mt-20 relative max-w-5xl mx-auto px-6 h-64 md:h-96">
           <motion.div 
             initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }}
             className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl glass-card bg-white/5 border-white/10 p-6 rounded-2xl shadow-2xl backdrop-blur-xl"
           >
              <div className="flex items-center gap-4 border-b border-white/10 pb-4 mb-4">
                 <Bot className="text-emerald-400" size={24} />
                 <div><p className="font-bold">LogKaro AI Assistant</p><p className="text-xs text-white/50">Online • Processing 1,402 tasks</p></div>
              </div>
              <div className="space-y-4">
                 <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-white/10 shrink-0" />
                    <div className="bg-white/5 p-3 rounded-xl rounded-tl-none text-sm text-white/80 max-w-md">Extract invoice data from the latest 50 emails and update the CRM.</div>
                 </div>
                 <div className="flex gap-4 items-start flex-row-reverse">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 shrink-0 flex items-center justify-center"><Sparkles size={14} className="text-emerald-400"/></div>
                    <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl rounded-tr-none text-sm text-white/90 max-w-md">Done! 50 invoices processed. Total amount: $142,500. CRM updated successfully in 2.4 seconds.</div>
                 </div>
              </div>
           </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 relative bg-black/20">
        <div className="container mx-auto px-6">
           <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Next-Gen Automation Capabilities</h2>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, idx) => (
              <motion.div 
                key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon size={24} className="text-emerald-400 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-xl font-bold font-heading mb-3">{feature.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default AIAutomation;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import { BookOpen, Server, ArrowRight, Zap, Search, LayoutGrid, FileText } from 'lucide-react';

const KnowledgeBase = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const categories = [
    {
      title: "LogKaro Fleet Management",
      icon: <Zap size={28} className="text-white" />,
      color: "from-blue-500 to-cyan-400",
      description: "Complete guides, workflows, and FAQS for our flagship CRM software.",
      articles: [
        { title: "Ultimate Guide to Fleet Management with LogKaro", path: "/knowledge-base/logkaro-fleet-management", isHot: true },
        { title: "How Fastag Integration Works", path: "/logkaro/features", isHot: false },
        { title: "Understanding Driver Payroll System", path: "/logkaro/workflow", isHot: false }
      ]
    },
    {
      title: "IT Services & Solutions",
      icon: <Server size={28} className="text-white" />,
      color: "from-purple-500 to-pink-500",
      description: "Resources on Web Development, App Development, and AI Automation.",
      articles: [
        { title: "Why Custom Software is Better than Off-the-shelf", path: "/services/web-development", isHot: false },
        { title: "The Future of AI in Business Operations", path: "/services/ai-automation", isHot: false }
      ]
    }
  ];

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Hand Math Technologies",
    "url": "https://handmathtechnologiesindia.com",
    "logo": "https://handmathtechnologiesindia.com/logo.png",
    "description": "Leading IT Solutions provider and creators of LogKaro Fleet Management CRM.",
    "sameAs": ["https://logkaro.com"]
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>

      {/* Hero Section with Search */}
      <div className="relative pt-32 pb-24 overflow-hidden bg-navy text-center">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="absolute top-0 right-1/2 translate-x-1/2 w-[800px] h-[400px] bg-electric/20 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md text-white rounded-full font-semibold text-sm mb-6 border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              <BookOpen size={16} />
              Resource Center
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
              Knowledge Base & <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-cyan-400">Insights</span>
            </h1>
            <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
              Find expert guides, documentation, and deep dives into our products and IT solutions. Discover how Hand Math is transforming businesses.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search size={20} className="text-gray-400" />
              </div>
              <input 
                type="text" 
                placeholder="Search articles, guides, and FAQs..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-electric transition-all shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-10 relative z-20 pb-24">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto"
        >
          {categories.map((category, index) => (
            <motion.div 
              key={index} 
              variants={fadeUp}
              className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-xl transition-shadow duration-500"
            >
              {/* Card Gradient Top Border */}
              <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${category.color}`}></div>
              
              <div className="flex items-start gap-5 mb-8">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {category.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-navy mb-2">{category.title}</h2>
                  <p className="text-gray-500 text-sm">{category.description}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {category.articles.filter(a => a.title.toLowerCase().includes(searchQuery.toLowerCase())).map((article, idx) => (
                  <RouterLink 
                    key={idx}
                    to={article.path} 
                    className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-300 group/link"
                  >
                    <div className="flex items-center gap-3 pr-4">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0 group-hover/link:bg-white group-hover/link:text-electric transition-colors">
                        <FileText size={14} className="text-gray-500 group-hover/link:text-electric" />
                      </div>
                      <span className="font-semibold text-navy group-hover/link:text-electric transition-colors text-sm md:text-base">
                        {article.title}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-3 shrink-0">
                      {article.isHot && (
                        <span className="hidden sm:inline-block px-2 py-1 bg-red-100 text-red-600 text-[10px] font-bold uppercase tracking-wider rounded-md">Featured</span>
                      )}
                      <ArrowRight size={18} className="text-gray-300 group-hover/link:text-electric group-hover/link:translate-x-1 transition-all" />
                    </div>
                  </RouterLink>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Support Section */}
        <motion.div 
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="mt-24 bg-gradient-to-br from-white to-blue-50 rounded-[2.5rem] p-10 md:p-16 text-center max-w-4xl mx-auto relative overflow-hidden border border-blue-100 shadow-2xl shadow-blue-900/5"
        >
          <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
             <LayoutGrid size={200} />
          </div>
          
          <div className="relative z-10">
            <span className="text-electric font-bold tracking-wider uppercase text-sm mb-4 block">Still have questions?</span>
            <h3 className="text-3xl md:text-4xl font-extrabold text-navy mb-6">Need Custom IT Solutions?</h3>
            <p className="text-gray-600 mb-10 max-w-2xl mx-auto text-lg">
              Can't find what you're looking for? Our team of engineers at Hand Math Technologies is ready to build tailored software for your specific business needs.
            </p>
            <RouterLink to="/contact" className="btn-primary inline-flex items-center gap-3 px-8 py-4 shadow-xl shadow-electric/20 text-lg rounded-full">
              Contact Our Experts
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <ArrowRight size={14} className="text-white" />
              </div>
            </RouterLink>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default KnowledgeBase;

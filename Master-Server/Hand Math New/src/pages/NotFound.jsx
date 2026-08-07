import React from 'react';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import { ArrowLeft, Sparkles, Home, Briefcase, Phone, Zap } from 'lucide-react';

const NotFound = () => {
  const quickLinks = [
    {
      title: 'Our Services',
      description: 'Explore our web, app, and AI solutions.',
      icon: <Briefcase className="text-electric" size={24} />,
      link: '/services'
    },
    {
      title: 'LogKaro CRM',
      description: 'Discover our flagship fleet management CRM.',
      icon: <Zap className="text-electric" size={24} />,
      link: '/logkaro'
    },
    {
      title: 'Contact Support',
      description: 'Need help? Get in touch with our team.',
      icon: <Phone className="text-electric" size={24} />,
      link: '/contact'
    }
  ];

  return (
    <div className="min-h-screen bg-offwhite flex items-center justify-center pt-32 pb-24 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0">
         <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-electric/10 blur-[120px] rounded-full" />
         <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 border border-black/5 rounded-full font-bold text-xs uppercase tracking-widest text-navy mb-8 shadow-sm backdrop-blur-md"
          >
            <Sparkles size={14} className="text-electric" />
            404 Error
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-5xl md:text-7xl font-heading font-bold text-navy mb-6 tracking-tight"
          >
            Page Not Found
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg text-navy/60 max-w-xl mx-auto mb-12 leading-relaxed"
          >
            The page you are looking for doesn't exist yet, or we are currently building it. We are constantly expanding our enterprise solutions. Here are some helpful links to get you back on track:
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="grid md:grid-cols-3 gap-6 mb-12 text-left"
          >
            {quickLinks.map((item, index) => (
              <RouterLink 
                key={index}
                to={item.link}
                className="group bg-white/60 backdrop-blur-sm border border-black/5 rounded-2xl p-6 hover:bg-white hover:shadow-xl hover:shadow-electric/10 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-electric/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="font-heading font-bold text-navy mb-2">{item.title}</h3>
                <p className="text-sm text-navy/60">{item.description}</p>
              </RouterLink>
            ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex justify-center"
          >
            <RouterLink to="/" className="btn-primary inline-flex items-center gap-2 shadow-lg shadow-electric/20 hover:shadow-electric/40 px-8 py-4">
              <Home size={18} />
              Back to Homepage
            </RouterLink>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

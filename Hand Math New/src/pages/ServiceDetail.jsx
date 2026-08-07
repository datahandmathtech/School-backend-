import React from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, CheckCircle2 } from 'lucide-react';

const serviceData = {
  'software-solutions': {
    title: 'Software Solutions',
    description: 'We develop robust, scalable, and secure software tailored to your unique business requirements.',
    details: 'Our custom software solutions range from enterprise ERP systems to niche SaaS products. We use modern tech stacks to ensure performance and longevity.',
    features: ['Custom ERP/CRM Systems', 'SaaS Platform Development', 'Desktop Application Development', 'Legacy System Modernization', 'API Integration & Development']
  },
  'web-development': {
    title: 'Web Development',
    description: 'Build high-performance, scalable, and responsive websites that drive engagement and business growth.',
    details: 'Our web development team crafts custom solutions ranging from complex corporate websites to dynamic single-page applications. Using modern frameworks like React, Vite, and Next.js, we deliver blazing-fast experiences that rank well on search engines and convert visitors into customers.',
    features: ['Custom Web Applications', 'Responsive UI/UX Design', 'E-Commerce Solutions', 'CMS Integration', 'SEO Optimization', 'Performance Auditing']
  },
  'app-development': {
    title: 'App Development',
    description: 'Native and cross-platform mobile applications designed for seamless user experiences on iOS and Android.',
    details: 'We design and build mobile apps that your customers will love to use. Whether you need a native iOS/Android application or a versatile cross-platform Flutter/React Native app, we handle everything from UI/UX design to App Store deployment.',
    features: ['Native iOS & Android Apps', 'Cross-Platform (Flutter/React Native)', 'UI/UX App Design', 'App Store Optimization (ASO)', 'Backend API Integration', 'Post-Launch Support']
  },
  'ai-automation': {
    title: 'AI Automation',
    description: 'Supercharge your business operations with next-generation artificial intelligence and workflow automation.',
    details: 'Stop wasting time on repetitive tasks. We integrate cutting-edge AI models (like GPT-4 and custom ML solutions) into your existing workflows. From intelligent chatbots and data processing pipelines to automated customer support, we help you scale efficiently.',
    features: ['Custom AI Integrations', 'Intelligent Chatbots', 'Workflow Automation', 'Predictive Analytics', 'Data Extraction & Processing', 'Machine Learning Solutions']
  }
};

const ServiceDetail = () => {
  const { id } = useParams();
  const service = serviceData[id] || {
    title: id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    description: 'Expert digital solutions designed to propel your business forward in the modern economy.',
    details: 'Detailed description coming soon. We are hard at work providing the best quality services for our clients.',
    features: ['Strategic Planning', 'Agile Implementation', 'Quality Assurance', 'Scalable Architecture', 'Continuous Support']
  };

  return (
    <div className="pt-32 pb-24 bg-offwhite min-h-screen">
      <div className="container mx-auto px-6">
        <RouterLink to="/services" className="inline-flex items-center gap-2 text-electric mb-12 hover:gap-3 transition-all font-bold">
          <ChevronLeft size={20} />
          Back to Services
        </RouterLink>

        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-2/3">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-heading font-bold mb-8 text-navy"
            >
              {service.title}
            </motion.h1>
            <p className="text-xl text-navy/70 mb-10 leading-relaxed">
              {service.description}
            </p>
            
            <div className="bg-white p-10 rounded-3xl border border-black/5 mb-12 shadow-sm">
              <h3 className="text-2xl font-heading font-bold mb-6 text-navy">Service Overview</h3>
              <p className="text-navy/60 mb-8 leading-relaxed">
                {service.details}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <CheckCircle2 className="text-electric shrink-0" size={24} />
                    <span className="text-navy/70">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:w-1/3">
            <div className="bg-white p-8 rounded-3xl border border-electric/20 sticky top-32 shadow-xl">
              <h3 className="text-2xl font-heading font-bold mb-6 text-navy">Need this service?</h3>
              <p className="text-navy/60 mb-8">
                Book a free consultation with our experts to discuss your requirements.
              </p>
              <RouterLink to="/contact" className="btn-primary w-full text-center block mb-4">
                Get a Quote
              </RouterLink>
              <p className="text-xs text-center text-navy/40">
                Response within 24 hours
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;

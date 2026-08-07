import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Receipt, Package, ArrowRight, Zap } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';

const ProductsPage = () => {
  const products = [
    {
      id: 'logkaro',
      title: 'LogKaro CRM',
      subtitle: 'Flagship Fleet Management',
      description: 'Streamline your logistics, dispatching, and fleet maintenance all in one powerful, AI-driven platform.',
      icon: <Truck size={32} className="text-electric" />,
      features: ['Real-time GPS Tracking', 'Automated Dispatch', 'Driver Performance Analytics'],
      link: '/logkaro',
      badge: 'NEW',
      isPrimary: true
    },
    {
      id: 'billing',
      title: 'Enterprise Billing Software',
      subtitle: 'Streamline Invoicing & Payments',
      description: 'A robust financial system designed to handle complex billing cycles, recurring payments, and deep integrations.',
      icon: <Receipt size={32} className="text-purple-500" />,
      features: ['Automated Invoicing', 'Multi-currency Support', 'Tax Compliance Engine'],
      link: '/billing-software',
      isPrimary: false
    },
    {
      id: 'inventory',
      title: 'Smart Inventory Software',
      subtitle: 'Real-time Stock Tracking',
      description: 'Gain full visibility over your supply chain with advanced forecasting, multi-warehouse support, and barcode scanning.',
      icon: <Package size={32} className="text-blue-500" />,
      features: ['Multi-Warehouse Sync', 'Low Stock Alerts', 'Supplier Management'],
      link: '/inventory-software',
      isPrimary: false
    }
  ];

  return (
    <div className="bg-offwhite min-h-screen pt-32 pb-24">
      {/* Header Section */}
      <section className="relative overflow-hidden mb-20">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-electric/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-40 -left-40 w-[400px] h-[400px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 border border-black/5 rounded-full font-bold text-xs uppercase tracking-widest text-navy mb-8 shadow-sm backdrop-blur-md"
          >
            <Zap size={14} className="text-electric" /> Enterprise Solutions
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-heading font-bold mb-6 text-navy tracking-tight leading-[1.1]"
          >
            Our Software <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-purple-600">Products</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-navy/60 font-light leading-relaxed max-w-3xl mx-auto"
          >
            Purpose-built enterprise applications to digitize, automate, and scale your operations efficiently.
          </motion.p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {products.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx }}
              className={`relative bg-white border border-black/5 rounded-3xl p-8 hover:shadow-2xl hover:shadow-electric/10 transition-all duration-500 flex flex-col ${product.isPrimary ? 'ring-2 ring-electric/20 lg:-translate-y-4' : ''}`}
            >
              {product.badge && (
                <div className="absolute -top-3 right-8 px-4 py-1 bg-gradient-to-r from-electric to-purple-600 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
                  {product.badge}
                </div>
              )}
              
              <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 shadow-sm border border-slate-100">
                {product.icon}
              </div>
              
              <h3 className="text-2xl font-heading font-bold text-navy mb-2">{product.title}</h3>
              <p className="text-sm font-bold text-electric mb-4 uppercase tracking-wider">{product.subtitle}</p>
              <p className="text-navy/60 leading-relaxed mb-8 flex-grow">{product.description}</p>
              
              <ul className="space-y-3 mb-10">
                {product.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-3 text-sm text-navy/70 font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-electric shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <RouterLink 
                to={product.link}
                className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                  product.isPrimary 
                    ? 'bg-electric text-white hover:bg-blue-600 shadow-lg shadow-electric/20' 
                    : 'bg-offwhite text-navy hover:bg-navy/5 border border-black/5'
                }`}
              >
                Explore {product.title.split(' ')[0]} <ArrowRight size={18} />
              </RouterLink>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;

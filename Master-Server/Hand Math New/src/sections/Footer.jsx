import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, ArrowUpRight, Mail, Phone, MapPin } from 'lucide-react';
import { cn } from '../utils/cn';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy relative overflow-hidden text-white/70 mt-20 pt-20 rounded-t-[3rem] md:rounded-t-[4rem] border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">
      {/* Dynamic Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-electric/20 rounded-full blur-[120px] mix-blend-screen opacity-50" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[100px] mix-blend-screen opacity-50" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Massive Top CTA */}
        <div className="flex flex-col md:flex-row items-center justify-between pb-16 mb-16 border-b border-white/10 gap-8 text-center md:text-left">
          <div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
              Have a project in mind?
            </h2>
            <p className="text-xl text-white/60">Let's build something extraordinary together.</p>
          </div>
          <RouterLink to="/contact" className="px-8 py-4 bg-white text-navy font-bold rounded-full hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all flex items-center gap-3 text-lg whitespace-nowrap">
            Start a Conversation <ArrowUpRight size={24} />
          </RouterLink>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Brand & Contact Info - Span 4 */}
          <div className="lg:col-span-4 lg:pr-8">
            <RouterLink to="/" className="inline-block mb-8 bg-white px-4 py-2 rounded-2xl shadow-lg shadow-white/5 hover:shadow-white/10 transition-all">
               <img src="/logo.png" alt="Hand Math Technologies" className="h-10 w-auto" />
            </RouterLink>
            
            <p className="text-white/60 mb-8 text-sm leading-relaxed">
              Engineering the next generation of logistics technology. We build, manage, and scale enterprise infrastructure for high-growth businesses.
            </p>

            <div className="space-y-4 mb-8">
              <a href="mailto:handmathtechnologies@gmail.com" className="flex items-center gap-3 text-white/80 hover:text-electric transition-colors group">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-electric/20 transition-colors">
                  <Mail size={18} />
                </div>
                <span className="text-sm font-medium">handmathtechnologies@gmail.com</span>
              </a>
              <a href="tel:+916367466426" className="flex items-center gap-3 text-white/80 hover:text-electric transition-colors group">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-electric/20 transition-colors">
                  <Phone size={18} />
                </div>
                <span className="text-sm font-medium">+91 636 746 6426</span>
              </a>
              <div className="flex items-start gap-3 text-white/80 group">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <MapPin size={18} />
                </div>
                <span className="text-sm font-medium mt-2 leading-relaxed">20-A, Vijetri Vihar, Adarsh Nagar, Udaipur, Rajasthan 313001</span>
              </div>
            </div>

          </div>

          {/* Quick Links - Span 2 */}
          <div className="lg:col-span-2">
            <h4 className="font-heading font-bold text-white mb-8 text-sm uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-electric" /> Product
            </h4>
            <ul className="space-y-4">
              {['LogKaro CRM', 'Billing & Invoicing', 'Inventory Control', 'Pricing'].map((item) => (
                <li key={item}>
                  <RouterLink to="/" className="text-sm text-white/60 hover:text-white hover:translate-x-2 transition-all flex items-center gap-2 group">
                    <span className="w-0 overflow-hidden group-hover:w-3 transition-all">→</span> {item}
                  </RouterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Services - Span 3 */}
          <div className="lg:col-span-3">
            <h4 className="font-heading font-bold text-white mb-8 text-sm uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500" /> Services
            </h4>
            <ul className="space-y-4">
              {['Software Development', 'Cloud & DevOps', 'Cybersecurity', '24/7 IT Support', 'Mobile App Dev'].map((item) => (
                <li key={item}>
                  <RouterLink to="/" className="text-sm text-white/60 hover:text-white hover:translate-x-2 transition-all flex items-center gap-2 group">
                    <span className="w-0 overflow-hidden group-hover:w-3 transition-all">→</span> {item}
                  </RouterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter - Span 3 */}
          <div className="lg:col-span-3">
            <h4 className="font-heading font-bold text-white mb-8 text-sm uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> Newsletter
            </h4>
            <p className="text-sm text-white/60 mb-6">Subscribe to get the latest tech insights and product updates.</p>
            <form className="relative flex items-center">
              <input 
                type="email" 
                placeholder="Enter your email..." 
                className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-electric transition-colors"
              />
              <button type="submit" className="absolute right-1.5 p-2 bg-electric rounded-full text-white hover:scale-105 transition-transform">
                <ArrowUpRight size={18} />
              </button>
            </form>

            <div className="mt-12 flex gap-4">
              <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-white hover:text-navy hover:-translate-y-1 transition-all">
                <Linkedin size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-white hover:text-navy hover:-translate-y-1 transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-white hover:text-navy hover:-translate-y-1 transition-all">
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono">
          <p className="text-white/40">
            © {currentYear} Hand Math IT Solutions Pvt. Ltd. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-white/40">
            <RouterLink to="/" className="hover:text-white transition-colors">Privacy Policy</RouterLink>
            <RouterLink to="/" className="hover:text-white transition-colors">Terms of Service</RouterLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

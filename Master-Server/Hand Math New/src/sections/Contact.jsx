import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { cn } from '../utils/cn';

const Contact = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    alert("Thank you! We will get back to you soon.");
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-offwhite">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Contact Info */}
          <div className="lg:w-1/3">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-electric font-heading font-bold tracking-widest uppercase text-sm mb-4 block"
            >
              Get In Touch
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-heading font-bold mb-8 text-navy"
            >
              Ready to <br />
              <span className="text-gold">Transform?</span>
            </motion.h2>
            
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-xl bg-electric/5 flex items-center justify-center shrink-0">
                  <Mail className="text-electric" size={24} />
                </div>
                <div>
                  <h4 className="font-heading font-bold mb-1 text-navy">Email Us</h4>
                  <p className="text-navy/60">handmathtechnologies@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-xl bg-gold/5 flex items-center justify-center shrink-0">
                  <Phone className="text-gold" size={24} />
                </div>
                <div>
                  <h4 className="font-heading font-bold mb-1 text-navy">Call Us</h4>
                  <p className="text-navy/60">+91 636 746 6426</p>
                </div>
              </div>
              
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-xl bg-electric/5 flex items-center justify-center shrink-0">
                  <MapPin className="text-electric" size={24} />
                </div>
                <div>
                  <h4 className="font-heading font-bold mb-1 text-navy">Office</h4>
                  <p className="text-navy/60">20-A, Vijetri Vihar, Adarsh Nagar, Udaipur Shastri Circle, Udaipur, Girwa, Rajasthan, India, 313001</p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 glass rounded-2xl border border-black/5 shadow-sm">
              <h4 className="font-heading font-bold mb-4 flex items-center gap-2 text-navy">
                <MessageSquare className="text-electric" size={20} />
                WhatsApp Support
              </h4>
              <p className="text-sm text-navy/60 mb-6">Need a quick answer? Chat with our experts on WhatsApp.</p>
              <a 
                href="https://wa.me/916367466426" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-electric font-bold hover:gap-3 transition-all"
              >
                Start Chatting →
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="lg:w-2/3">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="glass p-8 md:p-12 rounded-3xl border border-black/5 relative shadow-xl"
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-navy/60">Full Name</label>
                    <input 
                      {...register("name", { required: true })}
                      placeholder="John Doe"
                      className={cn(
                        "w-full bg-black/5 border rounded-xl px-4 py-3 outline-none focus:border-electric transition-colors text-navy",
                        errors.name ? "border-red-500" : "border-black/5"
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-navy/60">Email Address</label>
                    <input 
                      {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                      placeholder="john@example.com"
                      className={cn(
                        "w-full bg-black/5 border rounded-xl px-4 py-3 outline-none focus:border-electric transition-colors text-navy",
                        errors.email ? "border-red-500" : "border-black/5"
                      )}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-navy/60">Phone Number</label>
                    <input 
                      {...register("phone")}
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full bg-black/5 border border-black/5 rounded-xl px-4 py-3 outline-none focus:border-electric transition-colors text-navy"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-navy/60">Interest Category</label>
                    <select 
                      {...register("service")}
                      className="w-full bg-black/5 border border-black/5 rounded-xl px-4 py-3 outline-none focus:border-electric transition-colors appearance-none text-navy"
                    >
                      <option value="logkaro-demo">LogKaro CRM Demo Request</option>
                      <option value="software">Custom Software & SaaS Dev</option>
                      <option value="support">24/7 Managed IT Support</option>
                      <option value="cloud">Cloud & DevOps Migration</option>
                      <option value="security">Enterprise Cybersecurity</option>
                      <option value="other">Other IT Services</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-navy/60">Message</label>
                  <textarea 
                    {...register("message", { required: true })}
                    rows={5}
                    placeholder="Tell us about your project..."
                    className={cn(
                      "w-full bg-black/5 border rounded-xl px-4 py-3 outline-none focus:border-electric transition-colors resize-none text-navy",
                      errors.message ? "border-red-500" : "border-black/5"
                    )}
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="btn-primary w-full flex items-center justify-center gap-3 py-4 text-lg"
                >
                  Send Message
                  <Send size={20} />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Google Map Embedded in Glass Frame */}
      <div className="container mx-auto px-6 mt-16 md:mt-20">
        <div className="relative w-full h-[300px] md:h-[450px] rounded-[32px] md:rounded-[40px] overflow-hidden p-1 md:p-2 glass-card border border-white/40 shadow-[0_20px_50px_-20px_rgba(37,99,235,0.2)] bg-white/50 backdrop-blur-3xl group">
          <div className="absolute inset-0 bg-gradient-to-r from-electric/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <div className="w-full h-full rounded-[32px] overflow-hidden">
             <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3628.3188548381596!2d73.6961173!3d24.5828453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3967e5628b056157%3A0xc4874c7764f691bc!2sUdaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1715070000000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy"
            title="Office Location"
            className="grayscale group-hover:grayscale-0 transition-all duration-700"
          ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

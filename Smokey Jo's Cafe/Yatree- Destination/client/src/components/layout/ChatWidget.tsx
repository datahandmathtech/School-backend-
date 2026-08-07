"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Phone, MapPin, Clock, Send, ExternalLink, Video, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Action Buttons Group */}
      <div className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-[90] flex flex-col items-end gap-3">
        
        {/* Instagram Follow Button (Sleek Premium Pill) */}
        <motion.a 
          href="https://www.instagram.com/yatreedestination?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
          target="_blank" 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
          className="h-12 md:h-14 px-3 rounded-full bg-white text-slate-900 hidden md:flex items-center gap-2.5 shadow-xl border border-slate-200 group hover:border-pink-500/30 hover:shadow-pink-500/10 transition-all"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center shrink-0 text-white shadow-inner">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </div>
          <span className="font-bold text-[13px] md:text-sm tracking-wide whitespace-nowrap pr-2">Follow on Instagram</span>
        </motion.a>

        {/* Direct Call Button (Pill with Number) */}
        <motion.a 
          href="tel:+917627013579" 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
          className="h-12 md:h-14 px-3 rounded-full bg-slate-950 text-white hidden md:flex items-center gap-2.5 shadow-xl border border-white/10 group hover:bg-gold-premium hover:text-midnight transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-midnight/10 flex items-center justify-center shrink-0">
             <Phone className="w-4 h-4 fill-current" />
          </div>
          <span className="font-bold text-sm tracking-wider whitespace-nowrap pr-2">+91 76270 13579</span>
        </motion.a>

        {/* Chat Toggle Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.2)] transition-all duration-500 overflow-hidden relative group ${isOpen ? "bg-slate-950 text-white" : "bg-gold-premium text-midnight"
            }`}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <X className="w-6 h-6 md:w-8 md:h-8" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
              >
                <MessageCircle className="w-6 h-6 md:w-8 md:h-8 fill-current" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Chat Board Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 40, scale: 0.95, filter: "blur(10px)" }}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
            className="fixed bottom-32 right-4 md:right-8 z-[110] w-[calc(100vw-32px)] md:w-[400px] bg-white/90 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.25)] border border-white/50 overflow-hidden flex flex-col"
          >
            {/* Luxury Header */}
            <div className="bg-slate-950 p-8 text-white relative overflow-hidden">
              <div className="absolute top-[-20%] right-[-10%] w-48 h-48 bg-gold-premium/30 blur-[60px] rounded-full animate-pulse"></div>
              <div className="absolute bottom-[-20%] left-[-10%] w-32 h-32 bg-blue-500/10 blur-[40px] rounded-full"></div>

              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 relative bg-white rounded-[1.25rem] p-2 shadow-[0_10px_30px_rgba(0,0,0,0.3)] transform hover:rotate-3 transition-transform">
                    <Image 
                      src="/logo.png"
                      alt="Yatree Logo"
                      fill
                      sizes="64px"
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold tracking-tight">Yatree Assistant</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-500/20 rounded-full border border-green-500/30">
                        <span className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e]"></span>
                        <span className="text-[10px] font-bold text-green-400 uppercase tracking-wider">Live Support</span>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div className="p-8 space-y-8 flex-1 overflow-y-auto max-h-[60vh] custom-scrollbar">

              {/* Message from Bot */}
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200">
                  <span className="text-[10px] font-black text-slate-400">YD</span>
                </div>
                <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl rounded-tl-none shadow-sm relative">
                  <p className="text-sm text-slate-700 leading-relaxed">
                    Namaste! Welcome to Udaipur. I'm your personal travel concierge.
                    <span className="block mt-2 font-bold text-slate-900">How can I assist your royal journey today?</span>
                  </p>
                  <span className="absolute bottom-[-18px] left-0 text-[9px] font-bold text-slate-400 uppercase tracking-widest">Just Now</span>
                </div>
              </div>

              {/* Action Grid */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Preferred Channels</h4>
                <div className="grid grid-cols-1 gap-3">
                  <motion.a
                    whileHover={{ y: -2 }}
                    href="https://wa.me/917627013579?text=Hi, I want a live video consultation of the cars."
                    target="_blank"
                    className="flex items-center justify-between p-5 bg-blue-500/5 hover:bg-blue-500/10 border border-blue-500/20 rounded-3xl transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                        <Video className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="block text-base font-bold text-slate-900 leading-tight">Video Consultation</span>
                        <span className="text-[10px] text-blue-600 font-black uppercase tracking-wider">Live Fleet View</span>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:bg-blue-500 group-hover:text-white transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </motion.a>

                  <motion.a
                    whileHover={{ y: -2 }}
                    href="https://wa.me/917627013579?text=Hi, I am interested in booking a luxury ride."
                    target="_blank"
                    className="flex items-center justify-between p-5 bg-[#25D366]/5 hover:bg-[#25D366]/10 border border-[#25D366]/20 rounded-3xl transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#25D366] text-white rounded-2xl flex items-center justify-center shadow-lg shadow-[#25D366]/30">
                        <MessageCircle className="w-6 h-6 fill-current" />
                      </div>
                      <div>
                        <span className="block text-base font-bold text-slate-900 leading-tight">WhatsApp Chat</span>
                        <span className="text-[10px] text-green-600 font-black uppercase tracking-wider">Fastest response</span>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:bg-green-500 group-hover:text-white transition-colors">
                      <Send className="w-4 h-4" />
                    </div>
                  </motion.a>

                  <motion.a
                    whileHover={{ y: -2 }}
                    href="tel:+917627013579"
                    className="flex items-center justify-between p-5 bg-slate-950 hover:bg-slate-900 rounded-3xl transition-all group text-white shadow-xl shadow-slate-900/10"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10">
                        <Phone className="w-6 h-6 text-gold-premium" />
                      </div>
                      <div>
                        <span className="block text-base font-bold leading-tight">Direct Call</span>
                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider">Immediate help</span>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-gold-premium transition-colors">
                      <ExternalLink className="w-4 h-4 text-gold-premium group-hover:text-midnight" />
                    </div>
                  </motion.a>
                </div>
              </div>

              {/* Location Board */}
              <div className="pt-6 border-t border-slate-100 flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gold-premium/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-gold-premium" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-widest text-slate-400">Head Office</span>
                    <span className="text-xs font-bold text-slate-800 leading-tight block">97, BEHIND VIKAS HOSPITAL, HIRAN MAGRI SEC 3, UDAIPUR, Rajasthan, 313001</span>
                  </div>
                </div>
              </div>

              {/* Social Proof */}
              <div className="pt-6 flex items-center justify-between">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-[3px] border-white bg-slate-200 overflow-hidden relative shadow-sm">
                      <Image
                        src={`https://i.pravatar.cc/100?img=${i + 20}`}
                        alt="Satisfied Client"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="text-right">
                  <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Our Reputation</span>
                  <span className="text-xs font-black text-slate-900 bg-slate-100 px-2 py-1 rounded-md">120+ 5-Star Reviews</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

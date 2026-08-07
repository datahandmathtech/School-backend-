"use client";

import { motion } from "framer-motion";
import { Flag, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CartoonCar() {
  return (
    <div className="fixed top-24 left-0 w-full overflow-hidden pointer-events-none z-40 h-32 flex items-center">
      <motion.div
        initial={{ x: "-30vw" }}
        animate={{ x: "120vw" }}
        transition={{
          repeat: Infinity,
          duration: 14,
          ease: "linear",
        }}
        className="flex items-center pointer-events-auto cursor-pointer group"
      >
        <Link href="/explore-udaipur" className="flex items-center group-hover:scale-105 transition-transform duration-500">
          
          {/* Smooth Exhaust Trail */}
          <div className="absolute -left-20 top-1/2 flex items-center gap-2 z-0 opacity-60">
            <motion.div 
              animate={{ opacity: [0, 0.5, 0], scale: [0.5, 2], x: [0, -30] }} 
              transition={{ repeat: Infinity, duration: 1.5 }} 
              className="w-8 h-[2px] bg-gradient-to-r from-transparent to-slate-300 rounded-full" 
            />
          </div>

          {/* Elegant Flowing Banner (Flag) */}
          <motion.div 
            animate={{ 
              y: [0, -4, 4, 0],
              rotate: [0, -2, 2, 0]
            }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="relative flex items-center justify-center bg-gradient-to-r from-gold-premium to-yellow-500 text-midnight font-black text-xl sm:text-2xl md:text-3xl uppercase tracking-[0.2em] px-8 md:px-12 py-4 md:py-5 shadow-[0_10px_30px_rgba(212,175,55,0.4)] z-10 origin-right rounded-l-full rounded-r-md"
          >
            <span className="flex items-center gap-3 drop-shadow-md">
               <Flag className="w-6 h-6 md:w-8 md:h-8" /> EXPLORE UDAIPUR
            </span>
            
            {/* Sleek Tow Cables attaching banner to the car */}
            <div className="absolute -right-8 top-[40%] w-8 h-[2px] bg-slate-300 shadow-sm" />
            <div className="absolute -right-8 top-[60%] w-8 h-[1px] bg-slate-400 shadow-sm" />
          </motion.div>

          {/* Space between banner and car for cables */}
          <div className="w-6" />

          {/* Ultra-Minimalist Premium Car Silhouette with Logo */}
          <motion.div 
            animate={{ y: [0, -2, 0] }}
            transition={{ repeat: Infinity, duration: 0.3, ease: "easeInOut" }}
            className="relative w-[180px] md:w-[220px] h-[60px] z-20 mt-4"
          >
             {/* Aerodynamic Main Body */}
             <div className="absolute bottom-[10px] right-0 w-[160px] md:w-[200px] h-[24px] bg-gradient-to-r from-slate-800 to-slate-950 rounded-full rounded-tr-[30px] rounded-tl-[10px] shadow-2xl flex items-center justify-center overflow-hidden">
                {/* Yatree Logo embedded on the car body */}
                <div className="w-[40px] opacity-90 brightness-200 contrast-150">
                  <img src="/logo-white.png" alt="Yatree" className="w-full h-auto object-contain" onError={(e) => e.currentTarget.src = "/logo.png"} />
                </div>
             </div>
             
             {/* Sleek Glass Cabin */}
             <div className="absolute bottom-[34px] right-[40px] md:right-[50px] w-[80px] md:w-[100px] h-[20px] bg-slate-900 rounded-t-[100px] skew-x-[-25deg] border-t-2 border-white/10" />
             
             {/* Tinted Windows */}
             <div className="absolute bottom-[34px] right-[45px] md:right-[55px] w-[70px] md:w-[90px] h-[18px] bg-sky-100/10 rounded-t-[100px] skew-x-[-25deg] backdrop-blur-sm" />

             {/* Minimalist Details: Tail Light */}
             <div className="absolute bottom-[20px] left-[20px] w-[8px] h-[4px] bg-red-500 rounded-full shadow-[0_0_15px_#ef4444]" />
             
             {/* Minimalist Details: Head Light */}
             <div className="absolute bottom-[18px] right-[4px] w-[12px] h-[6px] bg-white rounded-full shadow-[5px_0_20px_#ffffff]" />
             
             {/* Premium Alloy Wheels */}
             <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 0.5, ease: "linear" }}
                className="absolute bottom-0 left-[35px] md:left-[45px] w-[28px] h-[28px] bg-slate-900 rounded-full border-[5px] border-slate-200 shadow-lg flex items-center justify-center"
             >
                <div className="w-[10px] h-[10px] bg-slate-400 rounded-full shadow-inner relative">
                   <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-600 -translate-y-1/2" />
                   <div className="absolute left-1/2 top-0 h-full w-[2px] bg-slate-600 -translate-x-1/2" />
                </div>
             </motion.div>
             
             <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 0.5, ease: "linear" }}
                className="absolute bottom-0 right-[25px] md:right-[30px] w-[28px] h-[28px] bg-slate-900 rounded-full border-[5px] border-slate-200 shadow-lg flex items-center justify-center"
             >
                <div className="w-[10px] h-[10px] bg-slate-400 rounded-full shadow-inner relative">
                   <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-600 -translate-y-1/2" />
                   <div className="absolute left-1/2 top-0 h-full w-[2px] bg-slate-600 -translate-x-1/2" />
                </div>
             </motion.div>
          </motion.div>

          {/* Subtle magic sparkles */}
          <Sparkles className="absolute -top-2 right-10 w-5 h-5 text-gold-premium animate-pulse" />
          
        </Link>
      </motion.div>
    </div>
  );
}

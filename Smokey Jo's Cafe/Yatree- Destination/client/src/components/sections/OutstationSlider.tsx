"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

type Excursion = {
  name: string;
  tag: string;
  distance: string;
  image: string;
  desc: string;
};

export default function OutstationSlider({ excursions }: { excursions: Excursion[] }) {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % excursions.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [excursions.length, isPaused]);

  return (
    <div 
      className="relative w-full h-[550px] md:h-[550px] lg:h-[580px] overflow-hidden py-4 flex items-center justify-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative w-full h-[90%] flex items-center justify-center">
        {excursions.map((item, index) => {
          let offset = index - activeIndex;
          if (offset < -1) offset += excursions.length;
          if (offset > 1) offset -= excursions.length;
          
          const isCenter = offset === 0;
          const isLeft = offset === -1;
          const isRight = offset === 1;

          let x = "0%";
          let scale = 1;
          let opacity = 1;
          let blur = "blur(0px)";
          let zIndex = 10;

          if (isCenter) {
            x = "0%";
            scale = 1;
            opacity = 1;
            blur = "blur(0px)";
            zIndex = 30;
          } else if (isLeft) {
            x = "-105%";
            scale = 0.85;
            opacity = 0.6;
            blur = "blur(4px)";
            zIndex = 20;
          } else if (isRight) {
            x = "105%";
            scale = 0.85;
            opacity = 0.6;
            blur = "blur(4px)";
            zIndex = 20;
          } else {
            x = offset > 1 ? "200%" : "-200%";
            scale = 0.7;
            opacity = 0;
            blur = "blur(10px)";
            zIndex = 0;
          }

          return (
            <motion.div
              key={index}
              animate={{ x, scale, opacity, filter: blur, zIndex }}
              transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              className={`absolute w-[85vw] md:w-[45vw] lg:w-[30vw] h-full group bg-slate-50 border border-slate-200 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col ${isCenter ? 'border-gold-premium/30 cursor-default' : 'cursor-pointer hover:opacity-100'}`}
              onClick={() => {
                if (!isCenter) setActiveIndex(index);
              }}
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden shrink-0">
                <Image 
                  src={item.image} 
                  alt={item.name} 
                  fill 
                  sizes="(max-width: 768px) 100vw, 300px" 
                  className="object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-slate-900 text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-gold-premium" /> {item.distance}
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-1 justify-between bg-slate-50">
                <div>
                  <span className="text-[9px] text-gold-premium font-black uppercase tracking-widest mb-1.5 block">{item.tag}</span>
                  <h3 className="font-black text-xl text-slate-900 leading-tight mb-3 group-hover:text-gold-premium transition-colors">{item.name}</h3>
                  <p className="text-slate-500 text-xs font-medium leading-relaxed mb-6">{item.desc}</p>
                </div>
                
                <a 
                  href="https://wa.me/917627013579"
                  target="_blank"
                  rel="noopener noreferrer" 
                  className={`w-full bg-white border-2 border-slate-200 hover:border-gold-premium hover:bg-gold-premium hover:text-midnight text-slate-900 font-black text-[10px] uppercase tracking-widest py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 active:scale-[0.98] ${!isCenter && 'pointer-events-none'}`}
                >
                  Book Cab to {item.name.split(' ')[0]} <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-4 z-40 mt-6">
        <button 
          onClick={() => setActiveIndex((prev) => (prev - 1 + excursions.length) % excursions.length)}
          className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-gold-premium hover:text-white transition-colors shadow-lg"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex gap-2">
          {excursions.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all ${idx === activeIndex ? 'w-6 bg-gold-premium' : 'bg-slate-300'}`}
            />
          ))}
        </div>
        <button 
          onClick={() => setActiveIndex((prev) => (prev + 1) % excursions.length)}
          className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-gold-premium hover:text-white transition-colors shadow-lg"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

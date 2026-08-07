"use client";

import Script from "next/script";
import { Star } from "lucide-react";
import { useEffect } from "react";

export default function Testimonials() {
  
  useEffect(() => {
    // Intercept any stray clicks on the main document
    const blockElfsightClicks = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      if (link && link.href.includes('elfsight')) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    window.addEventListener('click', blockElfsightClicks, true);
    return () => window.removeEventListener('click', blockElfsightClicks, true);
  }, []);

  return (
    <section className="py-24 bg-gradient-to-b from-[#eef2f6] to-[#f8fafc] relative overflow-hidden font-sans">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Google Reviews
          </h2>
          <p className="text-slate-500 font-medium text-lg">
             What our esteemed clients say about us on Google
          </p>
        </div>

        {/* Elfsight Google Reviews Widget */}
        <div className="w-full max-w-7xl mx-auto mb-16 relative elfsight-wrapper">
          <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
          <div 
            className="elfsight-app-8e4e76e9-43cc-4b20-9dfc-e8a6b9a56bb4 relative z-10 w-full" 
            style={{ clipPath: 'inset(-100px -100px 65px -100px)', marginBottom: '-65px' }}
            data-elfsight-app-lazy
          ></div>
        </div>

        {/* Leave a Review Button */}
        <div className="flex justify-center">
          <a 
            href="https://g.page/r/CUj5F0eRuHpFEAE/review" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white text-slate-900 border border-slate-200 hover:border-[#0ea5e9] hover:text-[#0ea5e9] font-black uppercase tracking-widest text-xs px-8 py-4 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95"
          >
            <Star className="w-4 h-4 text-[#fbbf24] fill-[#fbbf24]" /> 
            Leave a Review on Google
          </a>
        </div>

      </div>
    </section>
  );
}

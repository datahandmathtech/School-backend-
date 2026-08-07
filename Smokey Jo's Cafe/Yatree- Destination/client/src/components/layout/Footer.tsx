"use client";

import React from "react";
import {
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Star,
  ExternalLink
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Facebook = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const Instagram = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const Twitter = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const services = [
    { name: "Local Taxi Service", href: "/taxi-service-in-udaipur" },
    { name: "Airport Transfers", href: "/airport-taxi-udaipur" },
    { name: "Corporate Fleet", href: "/corporate-travel-udaipur" },
    { name: "Wedding Specials", href: "/wedding-car-rental-udaipur" },
    { name: "Tempo Traveller", href: "/tempo-traveller-udaipur" },
    { name: "Innova Crysta", href: "/innova-crysta-rental-udaipur" },
    { name: "Rajasthan Tours", href: "/rajasthan-tour-packages" }
  ];

  const topRoutes = [
    { name: "Udaipur to Mount Abu", href: "/udaipur-to-mount-abu-taxi" },
    { name: "Udaipur to Kumbhalgarh", href: "/udaipur-to-kumbhalgarh-taxi" },
    { name: "Udaipur to Ranakpur", href: "/udaipur-to-ranakpur-taxi" },
    { name: "Udaipur to Nathdwara", href: "/udaipur-to-nathdwara-taxi" },
    { name: "Udaipur to Chittorgarh", href: "/udaipur-to-chittorgarh-taxi" },
    { name: "Udaipur to Haldighati", href: "/udaipur-to-haldighati-taxi" }
  ];

  return (
    <footer className="relative bg-navy-950 text-white overflow-hidden">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-navy-950 via-gold-premium to-navy-950 opacity-50" />
      
      {/* CTA Section built into Footer */}
      <div className="border-b border-white/5 bg-white/5 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-4 text-white">
                Ready to explore <span className="text-gold-premium">Rajasthan?</span>
              </h2>
              <p className="text-slate-400 text-sm font-medium">
                Book your premium taxi service today and experience luxury, safety, and comfort on every journey.
              </p>
            </div>
            <div className="flex shrink-0">
              <a href="tel:+917627013579" className="group relative inline-flex items-center justify-center gap-3 bg-gold-premium text-navy-950 px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                <Phone className="w-4 h-4" />
                Call Now to Book
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 pt-20 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-8">
            <Link href="/" className="inline-flex items-center gap-4 group">
              <div className="relative w-16 h-16 bg-white rounded-2xl p-2 shadow-xl transition-transform duration-500 group-hover:scale-105">
                <Image 
                  src="/logo.png"
                  alt="Yatree Logo"
                  fill
                  sizes="64px"
                  className="object-contain p-2"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-black tracking-tighter leading-none mb-1 text-white">YATREE</span>
                <span className="text-xs font-bold text-gold-premium uppercase tracking-[0.3em] leading-none">Destination</span>
              </div>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm font-medium">
              Yatree Destination is Udaipur's premier taxi and travel service. We provide luxury Innova Crystas, Tempo Travellers, and premium sedans for local sightseeing and outstation tours.
            </p>

            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-gold-premium hover:text-navy-950 hover:border-gold-premium transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-gold-premium hover:text-navy-950 hover:border-gold-premium transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-gold-premium hover:text-navy-950 hover:border-gold-premium transition-all">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-8">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-white">Contact Us</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 text-gold-premium">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="text-sm text-slate-400 font-medium leading-relaxed pt-1">
                  97, BEHIND VIKAS HOSPITAL, HIRAN MAGRI SEC 3,<br />UDAIPUR, Udaipur, Rajasthan, 313001
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 text-gold-premium">
                  <Phone className="w-4 h-4" />
                </div>
                <a href="tel:+917627013579" className="text-sm text-slate-400 font-medium hover:text-gold-premium transition-colors">
                  +91 76270 13579
                </a>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 text-gold-premium">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex flex-col gap-1">
                  <a href="mailto:Kavishjain@yatreedestination.com" className="text-sm text-slate-400 font-medium hover:text-gold-premium transition-colors">
                    Kavishjain@yatreedestination.com
                  </a>
                  <a href="mailto:info@yatreedestination.com" className="text-sm text-slate-400 font-medium hover:text-gold-premium transition-colors">
                    info@yatreedestination.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-white">Our Fleet</h4>
            <ul className="space-y-4">
              {services.map((s) => (
                <li key={s.name}>
                  <Link href={s.href} className="text-slate-400 hover:text-gold-premium transition-colors text-sm font-medium flex items-center gap-2 group">
                    <ChevronRight className="w-3 h-3 text-gold-premium opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    <span className="group-hover:translate-x-1 transition-transform">{s.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Routes */}
          <div className="lg:col-span-3 space-y-8">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-white">Top Routes</h4>
            <ul className="space-y-4">
              {topRoutes.map((route) => (
                <li key={route.name}>
                  <Link href={route.href} className="text-slate-400 hover:text-gold-premium transition-colors text-sm font-medium flex items-center gap-2 group">
                    <ChevronRight className="w-3 h-3 text-gold-premium opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    <span className="group-hover:translate-x-1 transition-transform">{route.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trust Badges Bar */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-wrap items-center justify-center gap-8 md:gap-16 mb-12">
          <div className="flex items-center gap-3 text-slate-300">
            <ShieldCheck className="w-6 h-6 text-gold-premium" />
            <span className="text-xs font-bold uppercase tracking-wider">100% Safe Rides</span>
          </div>
          <div className="flex items-center gap-3 text-slate-300">
            <Star className="w-6 h-6 text-gold-premium fill-current" />
            <span className="text-xs font-bold uppercase tracking-wider">5-Star Rated Service</span>
          </div>
          <div className="flex items-center gap-3 text-slate-300">
            <Sparkles className="w-6 h-6 text-gold-premium" />
            <span className="text-xs font-bold uppercase tracking-wider">Clean & Sanitized Fleet</span>
          </div>
        </div>

        {/* Copyright & Credits */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/10">
          <p className="text-xs font-medium text-slate-400">
            &copy; {currentYear} Yatree Destination. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6 text-xs font-medium text-slate-400">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>

          <p className="text-xs font-medium text-slate-400 flex items-center gap-1.5 bg-white/5 px-4 py-2 rounded-full border border-white/5 hover:border-gold-premium/50 transition-colors">
            Crafted with ❤️ by
            <a 
              href="https://handmathtechnologiesindia.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white font-bold hover:text-gold-premium transition-colors inline-flex items-center gap-1 ml-1"
            >
              Hand Math Technologies India
              <ExternalLink className="w-3 h-3" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}




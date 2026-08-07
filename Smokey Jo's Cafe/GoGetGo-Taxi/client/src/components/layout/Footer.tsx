"use client";

import React from "react";
import {
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Globe,
  Share2,
  MessageCircle,
  ChevronRight,
  ArrowUpRight,
  Clock,
  Navigation
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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

  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Booking", href: "/booking" },
    { name: "Contact", href: "/contact" },
    { name: "Sitemap", href: "/sitemap" }
  ];

  const landmarks = [
    "City Palace", "Lake Pichola", "Fateh Sagar", "Jagmandir", "Udaivilas",
    "Leela Palace", "Raffles Udaipur", "Airport (UDA)", "Railway Station"
  ];

  return (
    <footer className="relative bg-midnight text-white pt-32 pb-24 md:pb-12 overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-premium/50 to-transparent opacity-30" />
        <div className="absolute bottom-0 right-0 w-full max-w-[800px] h-[800px] bg-gold-premium/5 blur-[150px] rounded-full -mb-96 -mr-96" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.02]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-32">
          
          {/* Brand Identity */}
          <div className="lg:col-span-5 space-y-12">
            <Link href="/" className="inline-flex items-center gap-5 group">
              <div className="relative w-20 h-20 bg-white rounded-3xl p-3 shadow-2xl transition-transform duration-500 group-hover:rotate-3 group-hover:scale-105">
                <Image 
                  src="/logo.png"
                  alt="GoGetGo Logo"
                  fill
                  sizes="80px"
                  className="object-contain p-2"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-4xl font-black tracking-tighter leading-none mb-1 text-white">GOGETGO</span>
                <span className="text-sm font-bold text-gold-premium uppercase tracking-[0.4em] leading-none">Destination</span>
              </div>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-md font-medium opacity-90">
              GoGetGo Taxi is a premier, 5-star rated travel agency and taxi service provider based in Udaipur, Rajasthan. We operate a fully owned, GST-compliant fleet including Innova Crysta, Sedans, and Tempo Travellers for local sightseeing, outstation cabs, and corporate travel.
            </p>

            <div className="flex items-center gap-4">
              <a href="tel:+9180000505810" className="group flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl hover:border-gold-premium/50 transition-all">
                <div className="w-8 h-8 rounded-xl bg-gold-premium/10 flex items-center justify-center text-gold-premium group-hover:bg-gold-premium group-hover:text-midnight transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-sm font-bold text-white tracking-widest">Call Now</span>
              </a>
            </div>
          </div>

          {/* Navigation Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
            <div className="space-y-8">
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-gold-premium/60">Services</h4>
              <ul className="space-y-4">
                {services.slice(0, 5).map((s) => (
                  <li key={s.name}>
                    <Link href={s.href} className="text-slate-400 hover:text-white transition-colors text-[13px] font-medium tracking-tight">
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-gold-premium/60">Explore</h4>
              <ul className="space-y-4">
                {quickLinks.map((l) => (
                  <li key={l.name}>
                    <Link href={l.href} className="text-slate-400 hover:text-white transition-colors text-[13px] font-medium tracking-tight">
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1 space-y-8">
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-gold-premium/60">Legal</h4>
              <ul className="space-y-4">
                <li><Link href="/privacy-policy" className="text-slate-400 hover:text-white transition-colors text-[13px]">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-slate-400 hover:text-white transition-colors text-[13px]">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Corporate Strip */}
        <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 mb-16 flex flex-col lg:flex-row items-center justify-between gap-12 group hover:border-gold-premium/30 transition-colors">
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-gold-premium/10 flex items-center justify-center text-gold-premium">
              <MapPin className="w-7 h-7" />
            </div>
            <div>
              <span className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Corporate HQ</span>
              <p className="text-white font-medium text-sm leading-relaxed">
                Shed no.2, Nokha, 100 Feet Rd, Gayariawas, Udaipur, RJ 313002
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-4 border-midnight bg-slate-800 overflow-hidden relative">
                  <Image src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" fill className="object-cover" />
                </div>
              ))}
            </div>
            <div className="text-right">
              <span className="block text-[10px] font-black text-gold-premium uppercase tracking-[0.2em]">Top Rated Service</span>
              <span className="text-white text-xs font-bold tracking-tight">Trusted by 5,000+ Travelers</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-white/5">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">
            &copy; {currentYear} GOGETGO TAXI. CRAFTED BY <span className="text-white">HAND MATH TECHNOLOGIES</span>
          </p>
          <div className="flex items-center gap-8">
            <a href="#" className="text-slate-500 hover:text-white transition-colors"><Share2 className="w-4 h-4" /></a>
            <a href="#" className="text-slate-500 hover:text-white transition-colors"><Globe className="w-4 h-4" /></a>
            <div className="h-4 w-px bg-white/10" />
            <div className="flex items-center gap-2 text-gold-premium text-[9px] font-black uppercase tracking-widest">
              Udaipur's #1 Fleet <ArrowUpRight className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}




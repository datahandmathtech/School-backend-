"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Star, 
  MapPin, 
  Car, 
  Phone, 
  MessageCircle, 
  Clock, 
  Users, 
  Award, 
  ThumbsUp,
  Map,
  Compass,
  Building2,
  Heart
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/yatree-accordion";

interface SEOLandingProps {
  city: string;
  serviceName: string;
  title: string;
  heroImage: string;
  introduction: string;
  whyChooseContent: string;
  popularRoutes: { from: string; to: string; price: string }[];
  faqs: { q: string; a: string }[];
  mainContent: React.ReactNode;
}

export default function SEOLandingTemplate({
  city,
  serviceName,
  title,
  heroImage,
  introduction,
  whyChooseContent,
  popularRoutes,
  faqs,
  mainContent
}: SEOLandingProps) {
  return (
    <div className="bg-white">
      {/* Hero Section: SEO Focused */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-navy-950 overflow-hidden">
        <Image 
          src={heroImage}
          alt={`${serviceName} in ${city}`}
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/80 to-transparent" />
        
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/20 border border-gold-500/30 text-gold-500 text-sm font-bold mb-6">
              <MapPin className="w-4 h-4" />
              Professional Taxi Services in {city}
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-[1.1]">
              {title}
            </h1>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed">
              {introduction}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="btn-gold h-14 px-10 rounded-full text-xs font-bold uppercase tracking-widest">
                Book Taxi in {city} Now
              </Button>
              <Button variant="outline" className="h-14 px-10 rounded-full border-white/20 text-white hover:bg-white/10 text-xs font-bold uppercase tracking-widest">
                View Tariff Card
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="bg-slate-50 border-b border-slate-100 py-10">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-black text-navy-900 mb-1">50k+</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Happy Travelers</p>
            </div>
            <div>
              <p className="text-3xl font-black text-navy-900 mb-1">12+</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Years Expertise</p>
            </div>
            <div>
              <p className="text-3xl font-black text-navy-900 mb-1">100+</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Verified Drivers</p>
            </div>
            <div>
              <p className="text-3xl font-black text-navy-900 mb-1">4.9/5</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Customer Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main SEO Content: 1000+ Words Structure */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left Content Column */}
            <div className="lg:col-span-8 prose prose-slate prose-lg max-w-none">
              {mainContent}
              
              {/* Specialized Why Choose Section for this specific page */}
              <div className="mt-16 p-10 bg-slate-50 rounded-[3rem] border border-slate-100 not-prose">
                <h3 className="text-3xl font-bold text-navy-900 mb-6">Why Choose Our {serviceName} in {city}?</h3>
                <p className="text-slate-600 leading-relaxed mb-8">
                  {whyChooseContent}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-green-500 mt-1" />
                    <div>
                      <h5 className="font-bold text-navy-900">24/7 Availability</h5>
                      <p className="text-sm text-slate-500">Always ready for airport or emergency city travel.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-green-500 mt-1" />
                    <div>
                      <h5 className="font-bold text-navy-900">Professional Chauffeurs</h5>
                      <p className="text-sm text-slate-500">Local experts who know every shortcut and landmark.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar Column */}
            <div className="lg:col-span-4">
              <div className="sticky top-32 space-y-8">
                {/* Booking Card */}
                <div className="bg-navy-900 p-8 rounded-[2.5rem] text-white">
                  <h3 className="text-2xl font-bold mb-6 text-center">Instant Booking</h3>
                  <div className="space-y-4 mb-8">
                    <a href="https://wa.me/917627013579" className="w-full h-14 bg-emerald-500 hover:bg-emerald-600 rounded-2xl flex items-center justify-center gap-3 font-bold transition-all">
                      <MessageCircle className="w-6 h-6" /> WhatsApp Now
                    </a>
                    <a href="tel:+917627013579" className="w-full h-14 bg-gold-500 hover:bg-gold-600 rounded-2xl flex items-center justify-center gap-3 font-bold text-navy-950 transition-all">
                      <Phone className="w-5 h-5" /> Call Now
                    </a>
                  </div>
                  <p className="text-center text-xs text-slate-400">Get 10% discount on first online booking!</p>
                </div>

                {/* Popular Routes Sidebar */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                  <h4 className="text-xl font-bold text-navy-900 mb-6">Popular {city} Routes</h4>
                  <div className="space-y-4">
                    {popularRoutes.map((route, r) => (
                      <div key={r} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="text-sm font-bold text-navy-900">
                          {route.from} <ArrowRight className="inline w-3 h-3 mx-1" /> {route.to}
                        </div>
                        <div className="text-gold-600 font-black">₹{route.price}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trust Badge */}
                <div className="p-8 bg-gold-500 rounded-[2.5rem] text-white text-center">
                   <Award className="w-12 h-12 mx-auto mb-4" />
                   <h4 className="text-xl font-bold mb-2">Government Approved</h4>
                   <p className="text-xs text-white/80">Authorized & Licensed Taxi Operator in Rajasthan.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SEO FAQ Section */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-navy-900 mb-6">FAQs about {serviceName} in {city}</h2>
            <p className="text-lg text-slate-600">Everything you need to know about booking our taxi services.</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, f) => (
                <AccordionItem key={f} value={`faq-${f}`} className="bg-white border border-slate-200 rounded-3xl px-8 py-2">
                  <AccordionTrigger className="text-lg font-bold text-navy-900 py-6">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-slate-500 pb-8 leading-relaxed">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Footer SEO Text Block */}
      <section className="py-10 border-t border-slate-100 text-center">
         <div className="container-custom">
            <p className="text-[10px] text-slate-300 font-bold uppercase tracking-[0.5em]">
               Udaipur Taxi • Cab Service Rajasthan • Airport Taxi {city} • Luxury Car Rental Udaipur
            </p>
         </div>
      </section>
    </div>
  );
}

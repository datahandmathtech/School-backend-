"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PremiumBookingForm from "@/components/sections/PremiumBookingForm";
import { Phone, MessageCircle, MapPin, Mail, Navigation } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-slate-50 selection:bg-primary selection:text-white pt-24 md:pb-0 pb-16">
      <Navbar />

      {/* Page Header */}
      <div className="bg-slate-900 py-32 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">Experience Excellence</span>
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8 leading-[0.95]">Contact <br className="md:hidden" /><span className="text-primary">Yatree</span> Destination</h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">We are available 24/7 to assist you with your luxury travel bookings, corporate accounts, and royal destination wedding logistics in Udaipur.</p>
      </div>

      <div className="container mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

          {/* Contact Information */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <h2 className="text-4xl font-black text-slate-900 mb-8 tracking-tight uppercase">Our Office</h2>
              <p className="text-slate-500 leading-relaxed text-lg font-light mb-10">
                Whether you need a quick airport transfer or complex event logistics, our team is ready to provide immediate support. Visit us or call our 24/7 dispatch center.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-6 p-8 bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 group hover:border-primary/30 transition-all duration-500">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <MapPin className="w-6 h-6 text-primary group-hover:text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2 uppercase tracking-widest text-xs">Head Office Location</h4>
                  <p className="text-sm text-slate-500 leading-relaxed font-light">
                    97, BEHIND VIKAS HOSPITAL, HIRAN MAGRI SEC 3,<br />
                    UDAIPUR, Udaipur, Rajasthan, 313001
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 p-8 bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 group hover:border-primary/30 transition-all duration-500">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <Phone className="w-6 h-6 text-primary group-hover:text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2 uppercase tracking-widest text-xs">24/7 Dispatch Center</h4>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4 font-light">Available for urgent bookings and support.</p>
                  <a href="tel:+917627013579" className="font-black text-slate-900 text-xl hover:text-primary transition-colors tracking-tighter">Call Now</a>
                </div>
              </div>

              <div className="flex items-start gap-6 p-8 bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 group hover:border-primary/30 transition-all duration-500">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <Mail className="w-6 h-6 text-primary group-hover:text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2 uppercase tracking-widest text-xs">Email Enquiries</h4>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4 font-light">For corporate accounts and wedding packages.</p>
                  <div className="flex flex-col gap-2">
                    <a href="mailto:Kavishjain@yatreedestination.com" className="font-black text-slate-900 hover:text-primary transition-colors tracking-tight text-lg">Kavishjain@yatreedestination.com</a>
                    <a href="mailto:info@yatreedestination.com" className="font-black text-slate-900 hover:text-primary transition-colors tracking-tight text-lg">info@yatreedestination.com</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Container */}
          <div className="lg:col-span-7">
            <div className="mb-10">
              <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px]">Booking Portal</span>
              <h2 className="text-4xl font-black text-slate-900 mt-4 tracking-tight uppercase">Request a Premium Ride</h2>
            </div>
            <PremiumBookingForm />
          </div>

        </div>
      </div>

      <Footer />

      {/* Global CTAs */}
      <div className="fixed bottom-8 right-8 z-[90] hidden md:block">
        <a href="https://wa.me/917627013579" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(37,211,102,0.4)] hover:scale-110 transition-all duration-300">
          <MessageCircle className="w-6 h-6 fill-current" />
        </a>
      </div>
      <div className="fixed bottom-0 left-0 w-full z-[100] md:hidden flex border-t border-slate-200 bg-white">
        <a href="tel:+917627013579" className="flex-1 bg-slate-900 text-white flex items-center justify-center gap-2 py-4 font-bold text-sm uppercase"><Phone className="w-4 h-4 text-primary" /> Call Now</a>
        <a href="https://wa.me/917627013579" className="flex-1 bg-[#25D366] text-white flex items-center justify-center gap-2 py-4 font-bold text-sm uppercase"><MessageCircle className="w-4 h-4" /> WhatsApp</a>
      </div>
    </main>
  );
}

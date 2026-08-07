"use client";

import { motion } from "framer-motion";
import { 
  MapPin, 
  Calendar, 
  Users, 
  Search, 
  Car,
  Clock,
  ChevronRight,
  Navigation,
  Mail
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function PremiumBookingForm() {
  const [activeTab, setActiveTab] = useState("one-way");
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [date, setDate] = useState("");
  const [vehicle, setVehicle] = useState("Any Premium Vehicle");
  const [email, setEmail] = useState("");

  const tabs = [
    { id: "tour-packages", label: "Tour Packages", icon: Navigation },
    { id: "outstation", label: "Outstation Taxi", icon: Car },
    { id: "local", label: "Local Sightseeing", icon: MapPin }
  ];

  const handleBooking = () => {
    const selectedTab = tabs.find(t => t.id === activeTab)?.label || activeTab;
    const emailText = email ? `%0A*Email:* ${email}` : '';
    const message = `Hello Yatree Destination, I would like to request a booking.%0A%0A*Trip Type:* ${selectedTab}%0A*Pickup:* ${pickup || 'Not specified'}%0A*Drop:* ${drop || 'Not specified'}%0A*Date:* ${date || 'Not specified'}%0A*Vehicle:* ${vehicle}${emailText}`;
    window.open(`https://wa.me/917627013579?text=${message}`, '_blank');
  };

  return (
    <div className="w-full bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden">
      {/* 1. Simple Professional Tabs */}
      <div className="flex border-b border-slate-100 px-4 md:px-8 bg-slate-50/50 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-3 px-6 py-6 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative whitespace-nowrap ${
              activeTab === tab.id ? "text-slate-900" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? "text-gold-premium" : "text-slate-300"}`} />
            {tab.label}
            {activeTab === tab.id && (
              <motion.div 
                layoutId="activeTabUnderline"
                className="absolute bottom-0 left-0 right-0 h-1 bg-gold-premium rounded-t-full" 
              />
            )}
          </button>
        ))}
      </div>

      {/* 2. Modern Form Inputs */}
      <div className="p-8 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          
          {/* Pickup */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gold-premium" /> Pickup Location
            </label>
            <input 
              type="text" 
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              placeholder="Enter City or Airport" 
              className="w-full h-14 bg-slate-50 border border-slate-200 text-slate-900 px-6 rounded-2xl focus:outline-none focus:border-gold-premium focus:bg-white transition-all duration-300 font-medium"
            />
          </div>

          {/* Drop */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
              <Navigation className="w-4 h-4 text-gold-premium" /> Drop Location
            </label>
            <input 
              type="text" 
              value={drop}
              onChange={(e) => setDrop(e.target.value)}
              placeholder="Enter Destination" 
              className="w-full h-14 bg-slate-50 border border-slate-200 text-slate-900 px-6 rounded-2xl focus:outline-none focus:border-gold-premium focus:bg-white transition-all duration-300 font-medium"
            />
          </div>

          {/* Date */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gold-premium" /> Journey Date
            </label>
            <div className="relative group">
              <div className="w-full h-14 bg-slate-50 border border-slate-200 px-6 rounded-2xl group-focus-within:border-gold-premium group-focus-within:bg-white transition-all duration-300 flex items-center justify-between pointer-events-none">
                <span className={`font-medium ${date ? "text-slate-900" : "text-slate-400"}`}>
                  {date ? date.split('-').reverse().join('/') : 'DD/MM/YYYY'}
                </span>
                <Calendar className="w-5 h-5 text-slate-400" />
              </div>
              <input 
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                onClick={(e) => {
                  try {
                    if ('showPicker' in HTMLInputElement.prototype) {
                      (e.target as HTMLInputElement).showPicker();
                    }
                  } catch (err) {}
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>

          {/* Vehicle Type */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
              <Car className="w-4 h-4 text-gold-premium" /> Vehicle Preference
            </label>
            <select 
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
              className="w-full h-14 bg-slate-50 border border-slate-200 text-slate-900 px-6 rounded-2xl focus:outline-none focus:border-gold-premium focus:bg-white transition-all duration-300 font-medium appearance-none"
            >
              <option value="Any Premium Vehicle">Any Premium Vehicle</option>
              <option value="Toyota Innova Crysta">Toyota Innova Crysta</option>
              <option value="Luxury Sedan (Etios/Dzire)">Luxury Sedan (Etios/Dzire)</option>
              <option value="Tempo Traveller (12-26 Seater)">Tempo Traveller (12-26 Seater)</option>
              <option value="Electric Rickshaw (Eco-Ride)">Electric Rickshaw (Eco-Ride)</option>
            </select>
          </div>

          {/* Email */}
          <div className="space-y-3 md:col-span-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
              <Mail className="w-4 h-4 text-gold-premium" /> Email Address (Optional)
            </label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address" 
              className="w-full h-14 bg-slate-50 border border-slate-200 text-slate-900 px-6 rounded-2xl focus:outline-none focus:border-gold-premium focus:bg-white transition-all duration-300 font-medium"
            />
          </div>
        </div>

        {/* 3. Quick Booking Features */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8 pt-10 border-t border-slate-100">
           <div className="flex flex-col sm:flex-row items-center gap-8">
              <div className="flex items-center gap-3">
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                 <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Instant Confirmation</span>
              </div>
              <div className="flex items-center gap-3">
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                 <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">No Hidden Charges</span>
              </div>
           </div>

           <button 
              onClick={handleBooking}
              className="w-full sm:w-auto bg-midnight text-white px-12 py-6 rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-gold-premium hover:text-midnight transition-all duration-500 active:scale-95 flex items-center justify-center gap-3"
           >
              Request Booking <ChevronRight className="w-5 h-5" />
           </button>
        </div>

        {/* SEO Keyword Block for Book Now */}
        <div className="mt-12 pt-8 border-t border-slate-100 text-center">
          <p className="text-[11px] leading-loose text-slate-500 font-medium">
            <strong className="text-midnight font-black">Best Taxi Service in Udaipur:</strong> We provide reliable <span className="text-gold-premium font-bold">Udaipur airport taxi</span> transfers, local sightseeing cabs, and premium <span className="text-gold-premium font-bold">outstation cabs from Udaipur</span> to destinations like <strong className="text-midnight font-bold">Mount Abu, Ranakpur, Kumbhalgarh, Nathdwara, and Chittorgarh</strong>. Book your luxury Innova Crysta or sedan with Yatree Destination today.
          </p>
        </div>
      </div>
    </div>
  );
}

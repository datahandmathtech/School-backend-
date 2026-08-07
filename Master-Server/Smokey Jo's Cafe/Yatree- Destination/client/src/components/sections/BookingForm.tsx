"use client";

import { useState } from "react";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MapPin, Users, Car, Mail } from "lucide-react";

export default function BookingForm() {
  const [activeTab, setActiveTab] = useState("One Way");
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [date, setDate] = useState("");
  const [vehicle, setVehicle] = useState("Premium Sedan");
  const [email, setEmail] = useState("");

  const handleBooking = () => {
    const emailText = email ? `%0A*Email:* ${email}` : '';
    const message = `Hello Yatree Destination, I would like to request a booking.%0A%0A*Trip Type:* ${activeTab}%0A*Pickup:* ${pickup || 'Not specified'}%0A*Drop:* ${drop || 'Not specified'}%0A*Date:* ${date || 'Not specified'}%0A*Vehicle:* ${vehicle || 'Not specified'}${emailText}`;
    window.open(`https://wa.me/917627013579?text=${message}`, '_blank');
  };
  return (
    <section className="py-20 relative bg-navy-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto -mt-32 relative z-20"
        >
          <Card className="border-none shadow-2xl glass-dark overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col lg:flex-row">
                {/* Tabs for Trip Types */}
                <div className="w-full lg:w-48 bg-gold-600/10 border-r border-white/10 p-4 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible">
                  {['One Way', 'Round Trip', 'Local', 'Packages'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setActiveTab(type)}
                      className={`px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                        activeTab === type 
                          ? 'bg-gold-600 text-white shadow-lg' 
                          : 'text-white/60 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                {/* Form Content */}
                <div className="flex-1 p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
                  <div className="space-y-2">
                    <Label className="text-white/60 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gold-500" /> Pickup Location
                    </Label>
                    <Input 
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-gold-500" 
                      placeholder="Where from?" 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white/60 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gold-500" /> Drop Location
                    </Label>
                    <Input 
                      value={drop}
                      onChange={(e) => setDrop(e.target.value)}
                      className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-gold-500" 
                      placeholder="Where to?" 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white/60 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gold-500" /> Date & Time
                    </Label>
                    <div className="relative group">
                      <div className="w-full h-12 bg-white/5 border border-white/10 rounded-xl group-focus-within:border-gold-500 group-focus-within:ring-1 group-focus-within:ring-gold-500 transition-all duration-300 flex items-center px-3 pointer-events-none">
                        <span className={`text-sm ${date ? "text-white" : "text-white/50"}`}>
                          {date ? (
                            date.includes('T') 
                              ? `${date.split('T')[0].split('-').reverse().join('/')} ${date.split('T')[1]}` 
                              : date.split('-').reverse().join('/')
                          ) : 'DD/MM/YYYY --:--'}
                        </span>
                        <Calendar className="w-4 h-4 text-white/50 ml-auto" />
                      </div>
                      <input 
                        type="datetime-local" 
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        onClick={(e) => {
                          try {
                            if ('showPicker' in HTMLInputElement.prototype) {
                              (e.target as HTMLInputElement).showPicker();
                            }
                          } catch (err) {}
                        }}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer [color-scheme:dark]" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white/60 flex items-center gap-2">
                      <Car className="w-4 h-4 text-gold-500" /> Vehicle Type
                    </Label>
                    <Select value={vehicle} onValueChange={(val) => setVehicle(val || "")}>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-gold-500">
                        <SelectValue placeholder="Select Fleet" />
                      </SelectTrigger>
                      <SelectContent className="bg-navy-900 border-white/10 text-white">
                        <SelectItem value="Premium Sedan">Premium Sedan</SelectItem>
                        <SelectItem value="Luxury SUV (Innova Crysta)">Luxury SUV (Innova Crysta)</SelectItem>
                        <SelectItem value="Tempo Traveller">Tempo Traveller</SelectItem>
                        <SelectItem value="Ultra Luxury">Ultra Luxury</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 lg:col-span-2">
                    <Label className="text-white/60 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gold-500" /> Email Address (Optional)
                    </Label>
                    <Input 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-gold-500" 
                      placeholder="Enter your email" 
                    />
                  </div>

                  <div className="md:col-span-2 lg:col-span-4 flex justify-end mt-4">
                    <Button 
                      onClick={handleBooking}
                      className="w-full lg:w-auto h-14 px-12 bg-gold-600 hover:bg-gold-700 text-white text-lg font-bold rounded-xl shadow-[0_10px_20px_-10px_rgba(217,119,6,0.5)] transition-all hover:-translate-y-1"
                    >
                      Check Fare & Availability
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
          {[
            { icon: Users, label: "Professional Drivers" },
            { icon: Car, label: "Sanitized Fleet" },
            { icon: MapPin, label: "Real-time Tracking" },
            { icon: Calendar, label: "Easy Cancellation" }
          ].map((item, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              key={i}
              className="flex flex-col items-center text-center space-y-3"
            >
              <div className="w-12 h-12 rounded-full bg-gold-600/20 flex items-center justify-center">
                <item.icon className="w-6 h-6 text-gold-500" />
              </div>
              <p className="text-white font-medium">{item.label}</p>
            </motion.div>
          ))}
        </div>

        {/* SEO Keyword Block for Book Now */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center max-w-4xl mx-auto border-t border-white/10 pt-10"
        >
          <h2 className="text-2xl font-black text-white mb-4 tracking-tight">Top Rated <span className="text-gold-500">Taxi Service in Udaipur</span></h2>
          <p className="text-white/70 text-sm leading-relaxed font-medium">
            Whether you are looking for a reliable <strong className="text-white font-bold">Udaipur airport taxi</strong>, a comfortable cab for local sightseeing, or a premium <strong className="text-white font-bold">outstation cab from Udaipur</strong>, Yatree Destination has you covered. We specialize in outstation trips to popular destinations including <strong className="text-gold-500 font-semibold">Mount Abu, Ranakpur, Kumbhalgarh, Nathdwara, Haldighati, and Chittorgarh</strong>. Experience seamless booking, professional drivers, and the best fares for your next adventure in Rajasthan.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

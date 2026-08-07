"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MapPin, Users, Car } from "lucide-react";

export default function BookingForm() {
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
                      className={`px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                        type === 'One Way' 
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
                    <Input className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-gold-500" placeholder="Where from?" />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white/60 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gold-500" /> Drop Location
                    </Label>
                    <Input className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-gold-500" placeholder="Where to?" />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white/60 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gold-500" /> Date & Time
                    </Label>
                    <Input type="datetime-local" className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-gold-500 [color-scheme:dark]" />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white/60 flex items-center gap-2">
                      <Car className="w-4 h-4 text-gold-500" /> Vehicle Type
                    </Label>
                    <Select>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-gold-500">
                        <SelectValue placeholder="Select Fleet" />
                      </SelectTrigger>
                      <SelectContent className="bg-navy-900 border-white/10 text-white">
                        <SelectItem value="sedan">Premium Sedan</SelectItem>
                        <SelectItem value="suv">Luxury SUV (Innova Crysta)</SelectItem>
                        <SelectItem value="tempo">Tempo Traveller</SelectItem>
                        <SelectItem value="luxury">Ultra Luxury</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="md:col-span-2 lg:col-span-4 flex justify-end mt-4">
                    <Button className="w-full lg:w-auto h-14 px-12 bg-gold-600 hover:bg-gold-700 text-white text-lg font-bold rounded-xl shadow-[0_10px_20px_-10px_rgba(217,119,6,0.5)] transition-all hover:-translate-y-1">
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
      </div>
    </section>
  );
}

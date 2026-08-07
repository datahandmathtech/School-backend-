"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Leaf, Camera, Heart, Users, Music, ChevronRight } from "lucide-react";
import KineticTitle from "../ui/KineticTitle";
import { Reveal } from "../ui/Reveal";

export default function ERickshawSection() {
  const services = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Guest Shuttles",
      desc: "Seamless point-to-point movement for your wedding or event guests."
    },
    {
      icon: <Camera className="w-6 h-6" />,
      title: "Rickshaw Photo Booth",
      desc: "A charming, traditional backdrop for unforgettable event photography."
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Bridal Decoration",
      desc: "Exquisitely decorated rickshaws for the bride and groom's grand entrance."
    },
    {
      icon: <Music className="w-6 h-6" />,
      title: "Rickshaw Baraat",
      desc: "Add a unique, eco-friendly twist to the traditional groom's procession."
    }
  ];

  return (
    <section className="relative py-24 md:py-32 bg-midnight overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-gold-premium/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-blue-500/5 blur-[100px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Visual Side */}
          <div className="relative">
            <Reveal direction="left" width="100%">
              <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 group">
                <Image
                  src="/authentic_udaipur_erickshaw_day_1778820004125.png"
                  alt="Authentic Udaipur E-Rickshaw"
                  fill
                  className="object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 via-transparent to-transparent" />
                
                {/* Secondary Image Inset */}
                <motion.div 
                  initial={{ x: 20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  className="absolute top-10 right-[-20px] w-48 h-64 rounded-3xl overflow-hidden border-4 border-midnight shadow-2xl z-20 hidden md:block"
                >
                  <Image 
                    src="/premium_udaipur_erickshaw_wedding_1778819653490.png"
                    alt="Event Decoration"
                    fill
                    className="object-cover"
                  />
                </motion.div>
                
                {/* Floating Badge */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="absolute bottom-10 left-10 p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gold-premium rounded-2xl flex items-center justify-center text-midnight">
                      <Leaf className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-gold-premium uppercase tracking-widest">Eco-Pioneer</span>
                      <span className="text-white font-bold">100% Electric Fleet</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </Reveal>
          </div>

          {/* Content Side */}
          <div className="space-y-12">
            <div>
              <Reveal width="100%">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-premium/20 bg-gold-premium/5 text-gold-premium text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                  The Green Ride Initiative
                </span>
              </Reveal>
              
              <KineticTitle 
                text="REVOLUTIONIZING THE ROYAL JOURNEY."
                className="text-3xl sm:text-4xl md:text-6xl font-black text-white leading-[0.95] tracking-tighter uppercase mb-8"
              />
              
              <Reveal delay={0.4} width="100%">
                <p className="text-slate-400 text-lg leading-relaxed font-light italic">
                  "Experience an auto-rickshaw parked on a sun-drenched street in Udaipur, its vibrant colors popping against the dusty road. Navigate through narrow lanes, with the city's historic architecture providing a picturesque backdrop."
                </p>
                <p className="text-slate-500 text-base leading-relaxed font-light mt-4">
                  We combine the authentic essence of local transportation with premium service, drawing you into the heart of Udaipur through a curated, eco-friendly journey.
                </p>
              </Reveal>
            </div>

            {/* Service Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <Reveal key={index} delay={0.2 + index * 0.1} width="100%">
                  <div className="group p-6 rounded-[2rem] bg-white/5 border border-white/10 hover:border-gold-premium/30 hover:bg-white/10 transition-all duration-500">
                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-4 group-hover:bg-gold-premium group-hover:text-midnight transition-colors duration-500 text-gold-premium">
                      {service.icon}
                    </div>
                    <h4 className="text-white font-bold mb-2 tracking-tight">{service.title}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed font-light">{service.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.8} width="100%">
              <div className="pt-6">
                <button className="h-14 px-10 bg-gold-premium text-midnight rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:scale-105 transition-all flex items-center gap-2">
                  Inquire for Events <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}

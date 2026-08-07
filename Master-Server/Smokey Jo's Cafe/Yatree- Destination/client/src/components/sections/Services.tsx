"use client";

import { motion } from "framer-motion";
import { 
  Plane, 
  Map, 
  Users, 
  Building2, 
  Heart, 
  Compass,
  ArrowRight,
  ShieldCheck,
  Clock,
  MapPin
} from "lucide-react";
import Image from "next/image";

const services = [
  {
    title: "Airport Taxi Service in Udaipur",
    description: "Reliable, punctual, and premium airport transfers to and from Maharana Pratap Airport (UDR). We ensure a stress-free start to your Rajasthan journey with real-time flight tracking and professional meet-and-greet services.",
    longDescription: "Our Airport Taxi Service in Udaipur is designed for travelers who value punctuality and comfort. Whether you're arriving for a luxury vacation or a quick business meeting, our professional chauffeurs will be waiting for you at the arrival terminal with a personalized paging board. We provide well-maintained Innova Crysta, Sedans, and luxury Tempo Travellers, ensuring ample space for your luggage and a smooth, air-conditioned ride to your hotel or destination.",
    icon: Plane,
    color: "bg-blue-500",
    keywords: ["Udaipur Airport Cab", "Pick and Drop Udaipur", "Airport Transfer Rajasthan"]
  },
  {
    title: "Udaipur Sightseeing & Local Tours",
    description: "Explore the magical City of Lakes with our expert local guides and comfortable taxis. From City Palace to Monsoon Palace, we cover every iconic landmark with flexible itineraries.",
    longDescription: "Experience Udaipur like a local. Our Udaipur Sightseeing Taxi service covers all major attractions including City Palace, Lake Pichola, Jagdish Temple, Saheliyon-ki-Bari, and the breathtaking Monsoon Palace (Sajjangarh). We don't just drive you; we help you navigate the vibrant bazaars and find the best spots for photography. Our drivers are well-versed with the history and culture of Mewar, making your sightseeing tour educational and immersive.",
    icon: Map,
    color: "bg-primary",
    keywords: ["Udaipur Day Tour", "Local Taxi Udaipur", "Sightseeing Cab Services"]
  },
  {
    title: "Outstation Cab & Rajasthan Tours",
    description: "Intercity taxi services from Udaipur to Jaipur, Jodhpur, Jaisalmer, and Kumbhalgarh. Premium one-way and round-trip packages tailored for Rajasthan's royal heritage circuit.",
    longDescription: "Planning a trip across Rajasthan? Our Outstation Cab service provides seamless connectivity between Udaipur and major cities like Jaipur (The Pink City), Jodhpur (The Blue City), and Jaisalmer (The Golden City). We offer competitive pricing for one-way drops and comprehensive round-trip packages. Our vehicles are equipped for long-distance desert travel, ensuring safety and comfort through the scenic Aravalli hills and the vast Thar desert terrains.",
    icon: Compass,
    color: "bg-emerald-500",
    keywords: ["Udaipur to Jaipur Taxi", "Jodhpur Car Rental", "Rajasthan Intercity Cab"]
  },
  {
    title: "Luxury Tempo Traveller for Groups",
    description: "Spacious and luxurious 12 to 26 seater Tempo Travellers for family trips, wedding groups, and corporate outings. Experience group travel without compromising on luxury.",
    longDescription: "For large families or corporate teams, our Tempo Traveller in Udaipur is the perfect solution. We offer premium 12-seater, 14-seater, and 17-seater Maharaja models with push-back seats, high-quality music systems, and powerful air conditioning. Ideal for group sightseeing tours, wedding transfers, and pilgrimage trips, our tempo travellers ensure that everyone travels together in comfort with dedicated space for heavy luggage.",
    icon: Users,
    color: "bg-purple-500",
    keywords: ["Tempo Traveller Udaipur", "Luxury Van Rental", "Group Travel Rajasthan"]
  },
  {
    title: "Corporate Car Rental Solutions",
    description: "Professional transportation services for corporate clients, business executives, and event organizers. Reliable monthly rental plans and executive airport transfers.",
    longDescription: "Yatree Destination provides specialized Corporate Taxi Services in Udaipur for businesses that require high standards of professionalism. We offer monthly car rental contracts, executive airport transfers, and transport management for corporate events or conferences. Our chauffeurs are trained in professional etiquette and our fleet includes premium sedans and SUVs (like Fortuner and Innova) to maintain your brand's executive image.",
    icon: Building2,
    color: "bg-slate-700",
    keywords: ["Corporate Cab Udaipur", "Executive Car Hire", "Business Travel Rajasthan"]
  },
  {
    title: "Wedding & Luxury Car Rental",
    description: "Make your special day even more grand with our decorated luxury cars and premium fleet for guest transportation. We specialize in destination wedding logistics in Udaipur.",
    longDescription: "Udaipur is the ultimate destination wedding hub, and we are the experts in wedding logistics. From vintage cars for the groom's entry to a fleet of luxury SUVs for guest transfers, we handle everything. Our 'Wedding Car Rental Udaipur' service ensures that your guests are transported with royal hospitality between the airport, hotels, and venues like Jagmandir or Zenana Mahal. We provide meticulously cleaned and decorated vehicles to match your wedding theme.",
    icon: Heart,
    color: "bg-rose-500",
    keywords: ["Wedding Taxi Udaipur", "Vintage Car Hire", "Luxury Car for Marriage"]
  }
];

export default function Services() {
  return (
    <section id="services" className="section-padding bg-white relative overflow-hidden">
      {/* Background SEO Text (Subtle/Decorative) */}
      <div className="absolute top-20 right-0 opacity-[0.03] text-[10vw] font-black leading-none pointer-events-none select-none">
        RAJASTHAN TRAVEL
      </div>

      <div className="container-custom relative z-10">
        
        {/* Section Header: More Content Here */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-20">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-premium/10 border border-gold-premium/20 text-gold-premium text-sm font-bold mb-6">
               <ShieldCheck className="w-4 h-4" />
               Award-Winning Taxi Service in Udaipur
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-navy-900 mb-8 leading-[1.1]">
              Professional <span className="text-gold-premium">Travel Solutions</span> for Every Journey
            </h2>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
              At Yatree Destination, we provide more than just a ride. We offer a comprehensive suite of premium 
              taxi and travel services designed to meet the unique needs of tourists, corporate executives, 
              and local residents in Udaipur and across Rajasthan. With a fleet of over 50+ well-maintained 
              vehicles and a team of 100+ professional chauffeurs, we are Udaipur's most trusted car rental company.
            </p>
          </div>
          <div className="space-y-6">
            <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-3xl border border-slate-100">
              <Clock className="w-6 h-6 text-primary mt-1" />
              <div>
                <h4 className="font-bold text-navy-900 mb-1 text-lg">Punctuality Guaranteed</h4>
                <p className="text-slate-500 text-sm">We value your time. Whether it's a 4 AM airport drop or a midnight pickup, our drivers are always on time, every time.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-3xl border border-slate-100">
              <MapPin className="w-6 h-6 text-primary mt-1" />
              <div>
                <h4 className="font-bold text-navy-900 mb-1 text-lg">Rajasthan-wide Network</h4>
                <p className="text-slate-500 text-sm">From the narrow lanes of Udaipur to the highways of Jaipur and the sand dunes of Jaisalmer, our network covers it all.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Services Grid: Detailed Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col"
            >
              {/* Service Icon & Title */}
              <div className="flex items-center gap-5 mb-8">
                <div className={`w-16 h-16 rounded-2xl ${service.color} flex items-center justify-center text-white shadow-lg shadow-current/20`}>
                  <service.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-navy-900 leading-tight group-hover:text-gold-premium transition-colors">
                  {service.title}
                </h3>
              </div>

              {/* Service Description (Short & Long) */}
              <div className="flex-1">
                <p className="text-slate-600 font-medium mb-4">
                  {service.description}
                </p>
                <p className="text-slate-400 text-sm leading-relaxed mb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-4">
                  {service.longDescription}
                </p>
              </div>

              {/* Service Keywords (SEO Booster) */}
              <div className="flex flex-wrap gap-2 mb-8">
                {service.keywords.map((keyword, k) => (
                  <span key={k} className="text-[10px] font-bold uppercase tracking-widest text-slate-300 border border-slate-100 px-2 py-1 rounded-md group-hover:border-gold-premium/20 group-hover:text-gold-premium transition-all">
                    {keyword}
                  </span>
                ))}
              </div>

              {/* CTA Link */}
              <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                <button className="text-navy-900 font-bold flex items-center gap-2 group-hover:text-gold-premium transition-colors">
                  Explore Service <ArrowRight className="w-4 h-4" />
                </button>
                <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center group-hover:bg-gold-premium group-hover:text-midnight transition-all">
                   <ArrowRight className="w-5 h-5 -rotate-45" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Trust Paragraph: Pure SEO & Trust */}
        <div className="mt-24 p-12 bg-navy-900 rounded-[3rem] text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 -skew-x-12 translate-x-1/2" />
           <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                 <h3 className="text-3xl font-bold mb-6">Why Yatree Destination is Udaipur's #1 Choice?</h3>
                 <p className="text-slate-300 leading-relaxed mb-8">
                    Since our inception, we have served over 50,000+ satisfied domestic and international tourists. 
                    Our focus on safety, hygiene, and transparent pricing sets us apart in the competitive 
                    Rajasthan travel market. We use state-of-the-art GPS technology to monitor every trip, 
                    ensuring that our clients are always safe and our drivers are adhering to the highest standards 
                    of professional conduct. Whether it's a simple city transfer or a 15-day Rajasthan grand tour, 
                    we provide the same level of excellence.
                 </p>
                 <div className="flex flex-wrap gap-8">
                    <div className="flex items-center gap-3">
                       <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center font-bold text-gold-premium text-xl italic">50k+</div>
                       <span className="text-sm text-slate-400 font-bold uppercase tracking-widest">Happy Clients</span>
                    </div>
                    <div className="flex items-center gap-3">
                       <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center font-bold text-gold-premium text-xl italic">6+</div>
                       <span className="text-sm text-slate-400 font-bold uppercase tracking-widest">Years Experience</span>
                    </div>
                 </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-white/5 p-6 rounded-3xl border border-white/10 hover:bg-white/10 transition-all">
                    <h5 className="font-bold mb-2">Verified Drivers</h5>
                    <p className="text-xs text-slate-400">Background checked and professionally trained.</p>
                 </div>
                 <div className="bg-white/5 p-6 rounded-3xl border border-white/10 hover:bg-white/10 transition-all">
                    <h5 className="font-bold mb-2">24/7 Availability</h5>
                    <p className="text-xs text-slate-400">We are always ready, day or night.</p>
                 </div>
                 <div className="bg-white/5 p-6 rounded-3xl border border-white/10 hover:bg-white/10 transition-all">
                    <h5 className="font-bold mb-2">Clean Fleet</h5>
                    <p className="text-xs text-slate-400">Sanitized vehicles before every pickup.</p>
                 </div>
                 <div className="bg-white/5 p-6 rounded-3xl border border-white/10 hover:bg-white/10 transition-all">
                    <h5 className="font-bold mb-2">Fair Price</h5>
                    <p className="text-xs text-slate-400">No hidden costs. Just honest pricing.</p>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </section>
  );
}

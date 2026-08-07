"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { 
  MapPin, Star, ArrowRight, Camera, Utensils, Hotel, Map, Phone, MessageCircle 
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import OutstationSlider from "@/components/sections/OutstationSlider";

// ---- DATA ----
const PLACES_TO_VISIT = [
  {
    name: "Taj Lake Palace & Pichola",
    tag: "Scenic Water Mirage",
    image: "/places/lake-pichola.jpg",
    desc: "A breathtaking white marble sanctuary floating majestically upon the azure waters of Lake Pichola. Built as a summer pleasure palace, it represents the absolute zenith of Mewari luxury.",
    span: "col-span-1 md:col-span-2 row-span-1 md:row-span-2",
    position: "object-center"
  },
  {
    name: "Udaipur City Palace",
    tag: "Imperial Mewar Throne",
    image: "/places/city-palace.jpg",
    desc: "A towering fortress of granite and crystal rising proudly over the lake, showcasing unparalleled architectural grandeur.",
    span: "col-span-1 row-span-1",
    position: "object-center"
  },
  {
    name: "Jagdish Temple",
    tag: "Divine Architecture",
    image: "/places/jagdish-temple.jpg",
    desc: "An intricately carved ancient Hindu temple located just outside the Royal Palace, dedicated to Lord Vishnu and a marvel of Indo-Aryan architecture.",
    span: "col-span-1 row-span-1",
    position: "object-bottom"
  },
  {
    name: "Gangaur Ghat",
    tag: "Lakeside Heritage",
    image: "/places/gangaur-ghat.jpg",
    desc: "A prominent main ghat on Lake Pichola surrounded by majestic havelis, famously known as the prime location for vibrant cultural festivals.",
    span: "col-span-1 row-span-1",
    position: "object-bottom"
  },
  {
    name: "Sajjangarh Monsoon Palace",
    tag: "Peak of Sunsets",
    image: "/places/sajjangarh.jpg",
    desc: "A majestic mountaintop fortress overlooking the entire valley, floating amidst clouds with panoramic sunset views.",
    span: "col-span-1 row-span-1",
    position: "object-center"
  }
];

const BEST_FOOD = [
  {
    name: "Smokey Jo's Cafe",
    tag: "Vegan & Rock Vibes",
    image: "/places/smokey-jos-v2.jpg",
    desc: "A vibrant rock-themed cafe offering amazing vegan food, house-made sourdough, great music, and a lively atmosphere.",
  },
  {
    name: "Emjay Brewery",
    tag: "Artisan Kombucha",
    image: "/places/emjay-brewery.jpg",
    desc: "A chic, healthy brewery offering artisan kombucha like Lemongrass Mint and Pomegranate, packed with probiotics.",
  },
  {
    name: "Ambrai Restaurant",
    tag: "Lakeside Dining",
    image: "/places/ambrai.png",
    desc: "Dine at eye-level with the lake, facing the majestic City Palace. The perfect spot for a romantic dinner.",
  },
  {
    name: "Upre by 1559 AD",
    tag: "Rooftop Luxury",
    image: "/places/upre.png",
    desc: "Elegant terrace dining offering spectacular panoramic views of the old city and the glowing lake palaces.",
  },
  {
    name: "Natraj Dining Hall",
    tag: "Authentic Thali",
    image: "/places/natraj.png",
    desc: "The absolute best Gujarati and Rajasthani unlimited thali in town. A must-visit for traditional food lovers.",
  },
  {
    name: "Tribute Restaurant",
    tag: "Fine Dining",
    image: "/places/tribute.png",
    desc: "A beautiful lakeside tribute to the fine Marwari horse breed, offering exquisite local and international cuisine.",
  }
];

const BEST_STAYS = [
  {
    name: "The Oberoi Udaivilas",
    tag: "Zenith of Luxury Resorts",
    image: "/places/oberoi.png",
    desc: "Sprawled over 50 acres of historic royal hunting grounds, featuring private boat arrivals and symmetric lakeside garden pavilions.",
    features: ["Infinity Pools", "Private Boat Arrival", "Wildlife Sanctuary"]
  },
  {
    name: "The Leela Palace",
    tag: "Modern Royal Grandeur",
    image: "/places/leela.png",
    desc: "Experience unparalleled luxury with breathtaking views of the City Palace and Lake Pichola from every room.",
    features: ["ESPA Spa", "Lakeview Balconies", "Sheesh Mahal Dining"]
  },
  {
    name: "Taj Fateh Prakash Palace",
    tag: "Living Heritage",
    image: "/places/fateh.png",
    desc: "Stay within the historic City Palace complex, featuring antique furniture and the world-famous Crystal Gallery.",
    features: ["Crystal Gallery", "Sunset Terrace", "Royal Suites"]
  }
];

const OUTSIDE_EXCURSIONS = [
  {
    name: "Kumbhalgarh Fort",
    tag: "The Great Wall of India",
    distance: "85 km | 2.5 Hrs Drive",
    image: "/places/kumbhalgarh.png",
    desc: "Home to the second longest continuous wall on the planet, stretching over 36 kilometers.",
  },
  {
    name: "Ranakpur Jain Temple",
    tag: "Marble Masterpiece",
    distance: "95 km | 2 Hrs Drive",
    image: "/places/ranakpur.png",
    desc: "An intricately carved white marble temple supported by 1,444 uniquely designed pillars.",
  },
  {
    name: "Chittorgarh Fort",
    tag: "Legacy of Rajput Valor",
    distance: "115 km | 2.5 Hrs Drive",
    image: "/places/chittorgarh.png",
    desc: "The largest fort in India, a UNESCO World Heritage site symbolizing immense bravery and pride.",
  },
  {
    name: "Haldighati",
    distance: "50 km | 1.5 Hrs Drive",
    tag: "Battlefield of Heroes",
    image: "/places/haldighati.png",
    desc: "The historic mountain pass where the legendary battle between Maharana Pratap and the Mughals took place.",
  }
];


// ---- COMPONENTS ----
export default function ExploreUdaipurPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <main className="relative min-h-screen bg-[#FDFBF7] selection:bg-gold-premium selection:text-midnight pt-20 md:pb-0 pb-16 font-sans">
      <Navbar />
      
      {/* 1. Cinematic Parallax Hero Section */}
      <section ref={heroRef} className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 1.15 }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
            className="w-full h-full relative"
          >
            <Image
              src="/places/explore-hero.png"
              alt="Panoramic view of Udaipur City Palace at sunset"
              fill
              className="object-cover pointer-events-none"
              priority
            />
          </motion.div>
          {/* Elegant dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/40 to-[#FDFBF7]" />
        </motion.div>
        
        <motion.div style={{ opacity }} className="container mx-auto px-6 relative z-10 max-w-5xl text-center mt-20">
           <motion.div 
             initial={{ opacity: 0, y: 40 }} 
             animate={{ opacity: 1, y: 0 }} 
             transition={{ duration: 1, ease: "easeOut" }}
             className="space-y-6"
           >
             <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-black uppercase tracking-[0.3em] text-[10px] px-6 py-2.5 rounded-full inline-flex items-center gap-2 shadow-2xl">
               <MapPin className="w-3.5 h-3.5 text-gold-premium" /> The Venice of the East
             </span>
             <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] uppercase drop-shadow-2xl">
               Explore <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold-premium to-amber-600">Udaipur</span>
             </h1>
             <p className="text-sm md:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-lg">
               Step into an oasis of imperial heritage, glittering lakes, and pristine white marble sanctuaries.
             </p>
           </motion.div>
        </motion.div>
      </section>

      {/* 2. Premium Grid: Places to Visit */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="text-gold-premium font-black tracking-[0.2em] uppercase text-[10px] flex items-center gap-2 mb-3">
                <Camera className="w-4 h-4" /> Sightseeing
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tight">Iconic Landmarks</h2>
            </div>
            <p className="text-slate-500 max-w-sm text-sm font-medium leading-relaxed">
              Discover the absolute must-visit royal palaces, island sanctuaries, and museums that define Udaipur's majestic skyline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[300px]">
            {PLACES_TO_VISIT.map((item, i) => (
              <div 
                key={i} 
                className={`group relative rounded-[2rem] overflow-hidden bg-slate-900 shadow-xl ${item.span} h-full w-full`}
              >
                <Image 
                  src={item.image} 
                  alt={item.name} 
                  fill 
                  sizes="(max-width: 768px) 100vw, 500px"
                  className={`object-cover ${item.position || 'object-center'} group-hover:scale-110 transition-transform duration-[1.5s] ease-out opacity-90 group-hover:opacity-100`} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 flex flex-col justify-end h-full">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="bg-gold-premium text-midnight text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-4 inline-block shadow-lg">
                      {item.tag}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-black text-white leading-tight mb-2">{item.name}</h3>
                    <div className="h-0 opacity-0 overflow-hidden group-hover:h-auto group-hover:opacity-100 group-hover:mt-3 transition-all duration-500 ease-out">
                      <p className="text-slate-300 text-xs md:text-sm font-medium leading-relaxed line-clamp-3">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Dark Mode Section: Best Food */}
      <section className="bg-slate-950 py-32 text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-premium/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
          <div className="text-center mb-20">
            <span className="text-gold-premium font-black tracking-[0.2em] uppercase text-[10px] flex items-center justify-center gap-2 mb-3">
              <Utensils className="w-4 h-4" /> Culinary Delights
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">Best Food & Dining</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {BEST_FOOD.map((item, i) => (
              <div key={i} className="group flex flex-col bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 shadow-2xl">
                <div className="relative w-full aspect-video overflow-hidden">
                  <Image src={item.image} alt={item.name} fill sizes="(max-width: 768px) 100vw, 500px" className="object-cover group-hover:scale-110 transition-transform duration-[2s] ease-out" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-slate-950/80 backdrop-blur-md border border-white/10 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                      {item.tag}
                    </span>
                  </div>
                </div>
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-gold-premium transition-colors">{item.name}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Luxurious Alternating Layout: Best Stays */}
      <section className="py-32 bg-[#FDFBF7]">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="text-center mb-24">
            <span className="text-gold-premium font-black tracking-[0.2em] uppercase text-[10px] flex items-center justify-center gap-2 mb-3">
              <Hotel className="w-4 h-4" /> Royal Hospitality
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tight">Premium Stays</h2>
          </div>

          <div className="space-y-32">
            {BEST_STAYS.map((item, i) => (
              <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center group`}>
                {/* Image Side */}
                <div className="w-full lg:w-1/2 relative">
                  <div className="absolute inset-0 bg-gold-premium/20 translate-x-4 translate-y-4 rounded-[3rem] -z-10 transition-transform duration-500 group-hover:translate-x-6 group-hover:translate-y-6" />
                  <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
                    <Image src={item.image} alt={item.name} fill sizes="(max-width: 768px) 100vw, 500px" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                </div>
                
                {/* Text Side */}
                <div className="w-full lg:w-1/2 space-y-6 lg:px-8">
                  <span className="text-gold-premium font-black tracking-[0.2em] uppercase text-[10px]">{item.tag}</span>
                  <h3 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight uppercase">{item.name}</h3>
                  <p className="text-slate-500 text-base leading-relaxed font-medium">
                    {item.desc}
                  </p>
                  
                  <ul className="space-y-3 pt-4 border-t border-slate-200">
                    {item.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm font-bold text-slate-700 uppercase tracking-wider">
                        <Star className="w-4 h-4 text-gold-premium fill-gold-premium/30" /> {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="pt-6">
                     <a 
                      href="https://wa.me/917627013579"
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-2 bg-slate-950 hover:bg-gold-premium text-white hover:text-midnight font-black text-[10px] uppercase tracking-widest px-8 py-4 rounded-xl transition-all shadow-xl active:scale-95"
                    >
                      Inquire Rates <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Clean Modern Cards: Outside Excursions */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="text-gold-premium font-black tracking-[0.2em] uppercase text-[10px] flex items-center gap-2 mb-3">
                <Map className="w-4 h-4" /> Beyond Udaipur
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tight">Outstation Trips</h2>
            </div>
            <a 
              href="https://wa.me/917627013579"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-black text-[10px] uppercase tracking-widest px-6 py-3 rounded-xl transition-all shadow-lg shadow-green-500/20"
            >
              <MessageCircle className="w-4 h-4" /> Plan a Custom Tour
            </a>
          </div>

          <OutstationSlider excursions={OUTSIDE_EXCURSIONS} />
        </div>
      </section>

      <Footer />

      {/* Mobile Sticky CTA footer */}
      <div className="fixed bottom-0 left-0 w-full z-[100] md:hidden flex border-t border-slate-200 bg-white">
        <a href="tel:+917627013579" className="flex-1 bg-slate-950 text-white flex items-center justify-center gap-2 py-4.5 font-bold text-xs uppercase tracking-wider"><Phone className="w-4 h-4 text-gold-premium" /> Call Now</a>
        <a href="https://wa.me/917627013579" className="flex-1 bg-[#25D366] text-white flex items-center justify-center gap-2 py-4.5 font-bold text-xs uppercase tracking-wider"><MessageCircle className="w-4 h-4 fill-current" /> WhatsApp</a>
      </div>
    </main>
  );
}

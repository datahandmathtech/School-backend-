"use client";

import { motion } from "framer-motion";
import { MapPin, Camera, History, ArrowRight } from "lucide-react";
import Image from "next/image";

const attractions = [
  {
    title: "The City Palace Complex",
    description: "A marvel of marble and granite, the City Palace of Udaipur is the largest palace complex in Rajasthan. Built over 400 years, it features a blend of Rajasthani and Mughal architecture. Our drivers provide expert drops to the entrance and suggest the best times to visit to avoid the crowds, ensuring you can peacefully explore the Zenana Mahal and the Crystal Gallery.",
    image: "https://images.unsplash.com/photo-1590050752117-23a533daee5a?auto=format&fit=crop&q=80",
    tips: "Best for: Royal History & Architecture"
  },
  {
    title: "Lake Pichola & Jagmandir",
    description: "Lake Pichola is the soul of Udaipur. An artificial fresh water lake created in 1362 AD, it is home to the world-famous Lake Palace and Jagmandir. We offer boat ride booking assistance and reliable taxi pickups from the ghats. Don't miss the golden hour boat ride that offers breathtaking views of the city's illuminated skyline.",
    image: "https://images.unsplash.com/photo-1565123409695-7b5ef63a24b5?auto=format&fit=crop&q=80",
    tips: "Best for: Romantic Sunsets"
  },
  {
    title: "Sajjangarh (Monsoon Palace)",
    description: "Perched high on a hill overlooking the Aravalli Range, the Monsoon Palace offers the most spectacular panoramic views of Udaipur's lakes and palaces. The drive up the winding hill road is a journey in itself. Our experienced hill-station drivers ensure a safe and smooth climb to this 19th-century hilltop residence of the Mewar dynasty.",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80",
    tips: "Best for: Panoramic City Views"
  },
  {
    title: "Saheliyon-ki-Bari",
    description: "The 'Garden of the Maidens' was built for a group of 48 young women attendants who accompanied a princess to Udaipur as part of her dowry. Famous for its lush green lawns, marble art, and magnificent fountains, it's a peaceful retreat. Our taxi services include half-day local packages that always feature this beautiful heritage garden.",
    image: "https://images.unsplash.com/photo-1603566233074-9b247f152778?auto=format&fit=crop&q=80",
    tips: "Best for: Nature & Relaxation"
  },
  {
    title: "Jagdish Temple",
    description: "Dedicated to Lord Vishnu, this Indo-Aryan architectural masterpiece has been a continuous place of worship since 1651. Located right in the heart of the old city, its intricate carvings and spiritual energy are a must-experience. Since the streets are narrow, our drivers know exactly where to drop you for a short, comfortable walk to the temple gates.",
    image: "https://images.unsplash.com/photo-1582231268305-649033f6797b?auto=format&fit=crop&q=80",
    tips: "Best for: Spiritual & Cultural Heritage"
  },
  {
    title: "Bagore Ki Haveli",
    description: "An 18th-century haveli located at Gangaur Ghat, it now serves as a museum and host for the world-famous 'Dharohar' folk dance show. We provide reliable evening drops and pickups for tourists attending the dance performance. It's the best place to witness the true cultural vibrance of Rajasthan in a traditional setting.",
    image: "https://images.unsplash.com/photo-1567150174113-5a022b794121?auto=format&fit=crop&q=80",
    tips: "Best for: Folk Dance & Culture"
  }
];

export default function SightseeingHighlights() {
  return (
    <section className="section-padding bg-slate-50">
      <div className="container-custom">
        
        <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-3xl text-center lg:text-left">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-premium/10 border border-gold-premium/20 text-gold-premium text-xs font-bold mb-4">
                <Camera className="w-4 h-4" />
                Udaipur Sightseeing Guide
             </div>
             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy-900 leading-tight">
               Discover the <span className="text-gold-premium">Magical Landmarks</span> of Udaipur
             </h2>
          </div>
          <p className="text-slate-500 max-w-sm text-sm leading-relaxed mb-2 text-center lg:text-right">
            Explore the historical soul of Mewar with our specialized local tour guides. 
            We provide door-to-door taxi services to every iconic location.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {attractions.map((spot, index) => (
             <motion.div
               key={index}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: index * 0.1 }}
               viewport={{ once: true }}
               className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
             >
               <div className="relative h-64 overflow-hidden">
                  <Image 
                    src={spot.image} 
                    alt={spot.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-navy-900/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                     {spot.tips}
                  </div>
               </div>
               <div className="p-8">
                  <h3 className="text-xl font-bold text-navy-900 mb-4 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gold-premium" />
                    {spot.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">
                    {spot.description}
                  </p>
                  <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                     <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Heritage Site</span>
                     <button className="text-navy-900 font-bold text-xs flex items-center gap-2 group-hover:text-gold-premium transition-colors">
                        Book Tour <ArrowRight className="w-4 h-4" />
                     </button>
                  </div>
               </div>
             </motion.div>
           ))}
        </div>

        {/* Bottom Detailed Info Block */}
        <div className="mt-20 p-10 bg-navy-900 rounded-[3rem] text-white flex flex-col lg:flex-row items-center gap-12">
           <div className="w-20 h-20 bg-gold-premium rounded-2xl flex items-center justify-center shrink-0">
              <History className="w-10 h-10 text-navy-900" />
           </div>
           <div className="flex-1 text-center lg:text-left">
              <h4 className="text-2xl font-bold mb-4">Why Book Your Udaipur Tour with Us?</h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                Navigating the narrow streets of Udaipur's old city can be challenging for outsiders. Our drivers are local residents who know the best shortcuts, the most authentic food joints, and the quietest photography spots. Experience the 'City of Lakes' with the dignity and comfort you deserve.
              </p>
           </div>
           <button className="h-14 px-10 bg-gold-premium text-midnight rounded-full whitespace-nowrap text-xs font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">
              View Local Packages
           </button>
        </div>

      </div>
    </section>
  );
}

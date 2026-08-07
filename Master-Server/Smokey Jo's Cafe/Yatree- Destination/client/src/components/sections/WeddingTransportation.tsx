import Image from "next/image";
import { Heart, Users, Map, Star } from "lucide-react";

export default function WeddingTransportation() {
  return (
    <section id="weddings" className="py-32 bg-slate-900 relative overflow-hidden">
      {/* Decorative Gold Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-50" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="relative h-[600px] rounded-[2rem] overflow-hidden shadow-2xl border border-white/10">
            <Image 
              src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80"
              alt="Wedding Taxi Service Udaipur"
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-8">
            <div>
              <span className="text-orange-500 font-bold uppercase tracking-[0.2em] text-xs">Royal Destinations</span>
              <h2 className="text-4xl md:text-5xl font-black text-white mt-2 mb-6 tracking-tight">
                Beautiful Wedding Transportation.
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed">
                Udaipur is the city of royal weddings. We ensure that the logistics of your grand celebration are as flawless and elegant as the event itself. From vintage bridal cars to luxury guest coaches, we handle it all.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                 <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center mb-4">
                    <Heart className="w-5 h-5 text-orange-500" />
                 </div>
                 <h4 className="text-white font-bold text-lg mb-2">Luxury Bridal Cars</h4>
                 <p className="text-slate-400 text-sm leading-relaxed">Premium SUVs and luxury sedans beautifully decorated for the bride, groom, and Baraat.</p>
              </div>
              <div>
                 <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center mb-4">
                    <Users className="w-5 h-5 text-orange-500" />
                 </div>
                 <h4 className="text-white font-bold text-lg mb-2">Guest Transportation</h4>
                 <p className="text-slate-400 text-sm leading-relaxed">Fleet of comfortable Tempo Travellers and mini-buses for seamless venue-to-hotel transfers.</p>
              </div>
              <div>
                 <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center mb-4">
                    <Map className="w-5 h-5 text-orange-500" />
                 </div>
                 <h4 className="text-white font-bold text-lg mb-2">Destination Planning</h4>
                 <p className="text-slate-400 text-sm leading-relaxed">Dedicated logistics coordinators stationed at hotels to manage large-scale group movements.</p>
              </div>
              <div>
                 <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center mb-4">
                    <Star className="w-5 h-5 text-orange-500" />
                 </div>
                 <h4 className="text-white font-bold text-lg mb-2">Premium Comfort</h4>
                 <p className="text-slate-400 text-sm leading-relaxed">Immaculate, air-conditioned vehicles ensuring your guests travel in absolute comfort.</p>
              </div>
            </div>

            <div className="pt-6">
               <a href="tel:+917627013579" className="inline-block bg-orange-500 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20">
                  Discuss Your Wedding Logistics
               </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

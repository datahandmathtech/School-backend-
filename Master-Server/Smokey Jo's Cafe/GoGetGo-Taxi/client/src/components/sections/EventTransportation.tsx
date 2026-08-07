import { Mic, Music, Users, ShieldAlert } from "lucide-react";
import Image from "next/image";

export default function EventTransportation() {
  return (
    <section id="events" className="py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-orange-500 font-bold uppercase tracking-[0.2em] text-xs">Flawless Execution</span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-2 mb-6 tracking-tight">
            Professional Event Transportation.
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            From large-scale corporate summits and music festivals to VIP guest handling, we provide the robust logistics infrastructure required to move hundreds of people efficiently and safely.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           
           <div className="group relative h-96 rounded-3xl overflow-hidden cursor-pointer">
              <Image src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80" alt="Corporate Events" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 p-8 w-full">
                 <Mic className="w-8 h-8 text-orange-500 mb-4" />
                 <h3 className="text-2xl font-bold text-white mb-2">Corporate Events</h3>
                 <p className="text-sm text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">Seminars, off-sites, and corporate retreats handled with precision.</p>
              </div>
           </div>

           <div className="group relative h-96 rounded-3xl overflow-hidden cursor-pointer">
              <Image src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80" alt="Concerts and Festivals" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 p-8 w-full">
                 <Music className="w-8 h-8 text-orange-500 mb-4" />
                 <h3 className="text-2xl font-bold text-white mb-2">Festivals & Concerts</h3>
                 <p className="text-sm text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">High-volume crowd transportation and artist logistics.</p>
              </div>
           </div>

           <div className="group relative h-96 rounded-3xl overflow-hidden cursor-pointer">
              <Image src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80" alt="VIP Guest Transport" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 p-8 w-full">
                 <ShieldAlert className="w-8 h-8 text-orange-500 mb-4" />
                 <h3 className="text-2xl font-bold text-white mb-2">VIP Handling</h3>
                 <p className="text-sm text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">Discrete, high-security luxury vehicles for celebrities and dignitaries.</p>
              </div>
           </div>

           <div className="group relative h-96 rounded-3xl overflow-hidden cursor-pointer">
              <Image src="https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80" alt="Group Travel Buses" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 p-8 w-full">
                 <Users className="w-8 h-8 text-orange-500 mb-4" />
                 <h3 className="text-2xl font-bold text-white mb-2">Group Logistics</h3>
                 <p className="text-sm text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">Coordinated fleets of luxury buses moving simultaneously.</p>
              </div>
           </div>

        </div>
      </div>
    </section>
  );
}

import { Briefcase, Plane, Clock, Shield } from "lucide-react";
import Image from "next/image";

export default function CorporateTravel() {
  return (
    <section id="corporate" className="py-32 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="order-2 lg:order-1 space-y-8">
            <div>
              <span className="text-orange-500 font-bold uppercase tracking-[0.2em] text-xs">Executive Logistics</span>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-2 mb-6 tracking-tight">
                Premium Corporate Travel in Udaipur.
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                We understand that in business, time is money and impressions matter. Provide your executives, clients, and employees with a seamless, punctual, and highly professional transportation experience.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <Briefcase className="w-8 h-8 text-orange-500 mb-4" />
                <h4 className="text-lg font-bold text-slate-900 mb-2">Business Meetings</h4>
                <p className="text-sm text-slate-500 leading-relaxed">Chauffeur-driven luxury sedans ensuring you arrive prepared and on time.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <Plane className="w-8 h-8 text-orange-500 mb-4" />
                <h4 className="text-lg font-bold text-slate-900 mb-2">Airport Transfers</h4>
                <p className="text-sm text-slate-500 leading-relaxed">Meet & greet services for your VIP clients at Maharana Pratap Airport.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <Clock className="w-8 h-8 text-orange-500 mb-4" />
                <h4 className="text-lg font-bold text-slate-900 mb-2">Punctuality First</h4>
                <p className="text-sm text-slate-500 leading-relaxed">Advanced route planning guarantees strict adherence to your itinerary.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <Shield className="w-8 h-8 text-orange-500 mb-4" />
                <h4 className="text-lg font-bold text-slate-900 mb-2">Professional Chauffeurs</h4>
                <p className="text-sm text-slate-500 leading-relaxed">Uniformed, English-speaking drivers trained in corporate etiquette.</p>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
            <Image 
              src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80"
              alt="Corporate Cab Service Udaipur"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex flex-col justify-end p-10">
               <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl">
                 <h3 className="text-white font-bold text-xl mb-2">Corporate Account Benefits</h3>
                 <ul className="text-slate-200 text-sm space-y-2">
                   <li>• Priority Booking & Vehicle Upgrades</li>
                   <li>• Dedicated Account Manager</li>
                   <li>• Monthly Post-Paid Invoicing</li>
                 </ul>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

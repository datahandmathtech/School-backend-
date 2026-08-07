import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Phone, Users, Briefcase, Snowflake } from "lucide-react";
import Image from "next/image";

const vehicles = [
  {
    name: "Toyota Etios / Swift Dzire",
    category: "SEDAN CAR",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80",
    passengers: "4+1",
    ac: "AC",
    local8hr: "₹ 1,800",
    outstationKm: "₹ 11 / Km",
    driverAllowance: "₹ 300 / Day"
  },
  {
    name: "Toyota Innova Crysta",
    category: "LUXURY SUV",
    image: "https://images.unsplash.com/photo-1590362891991-f20bc081e533?auto=format&fit=crop&q=80",
    passengers: "6+1",
    ac: "AC",
    local8hr: "₹ 2,500",
    outstationKm: "₹ 15 / Km",
    driverAllowance: "₹ 300 / Day"
  },
  {
    name: "Tempo Traveller (12 Seater)",
    category: "GROUP TRAVEL",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80",
    passengers: "12+1",
    ac: "AC",
    local8hr: "₹ 3,500",
    outstationKm: "₹ 20 / Km",
    driverAllowance: "₹ 500 / Day"
  }
];

export default function Fares() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      
      {/* Page Header */}
      <section className="bg-navy-900 text-white py-16 border-b-4 border-[#f08b1d]">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-wider">Taxi Fares & Tariff</h1>
          <p className="text-lg text-slate-300">Transparent Pricing for Local Sightseeing & Outstation Travel in Udaipur</p>
        </div>
      </section>

      {/* Fares Table / Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="space-y-12">
             {vehicles.map((v, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden flex flex-col md:flex-row">
                   <div className="md:w-1/3 relative h-64 md:h-auto bg-slate-50 p-6 flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-200">
                      <Image src={v.image} alt={v.name} fill className="object-contain p-8" />
                   </div>
                   <div className="md:w-2/3 p-6 md:p-8 flex flex-col justify-between">
                      <div>
                        <span className="text-xs font-bold text-[#f08b1d] uppercase tracking-widest">{v.category}</span>
                        <h2 className="text-3xl font-bold text-navy-900 mt-1 mb-6">{v.name}</h2>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                           <div className="bg-slate-50 p-3 rounded text-center border border-slate-100">
                             <p className="text-[10px] text-slate-500 font-bold uppercase">Local (8Hr/80Km)</p>
                             <p className="text-lg font-bold text-navy-900">{v.local8hr}</p>
                           </div>
                           <div className="bg-slate-50 p-3 rounded text-center border border-slate-100">
                             <p className="text-[10px] text-slate-500 font-bold uppercase">Outstation</p>
                             <p className="text-lg font-bold text-navy-900">{v.outstationKm}</p>
                           </div>
                           <div className="bg-slate-50 p-3 rounded text-center border border-slate-100">
                             <p className="text-[10px] text-slate-500 font-bold uppercase">Driver Bata</p>
                             <p className="text-lg font-bold text-navy-900">{v.driverAllowance}</p>
                           </div>
                           <div className="bg-slate-50 p-3 rounded text-center border border-slate-100">
                             <p className="text-[10px] text-slate-500 font-bold uppercase">Capacity</p>
                             <p className="text-lg font-bold text-navy-900">{v.passengers}</p>
                           </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                        <a href="tel:+917627013579" className="flex-1 bg-[#1a365d] hover:bg-navy-800 text-white font-bold py-4 rounded text-center transition-colors flex justify-center items-center gap-2 uppercase tracking-wide">
                           <Phone className="w-5 h-5 text-[#f08b1d]" /> Book Now
                        </a>
                        <a href="/contact" className="flex-1 border-2 border-[#1a365d] text-[#1a365d] hover:bg-slate-50 font-bold py-4 rounded text-center transition-colors uppercase tracking-wide">
                           Online Enquiry
                        </a>
                      </div>
                   </div>
                </div>
             ))}
          </div>

          <div className="mt-16 bg-slate-100 p-8 rounded-lg border border-slate-200">
             <h3 className="text-xl font-bold text-navy-900 mb-4">Terms & Conditions</h3>
             <ul className="list-disc pl-5 space-y-2 text-slate-600">
                <li>Toll Tax, Parking, and State Tax will be extra as per actuals.</li>
                <li>AC will be turned off in hilly areas to prevent engine heating.</li>
                <li>Night driving allowance applies between 10:00 PM to 6:00 AM.</li>
                <li>Km and Time are calculated from our garage to garage.</li>
             </ul>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

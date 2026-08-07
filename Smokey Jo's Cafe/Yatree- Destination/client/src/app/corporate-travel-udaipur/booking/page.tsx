"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { VEHICLES, type Vehicle } from "@/lib/corporateVehicles";
import { 
  Phone, 
  MessageCircle, 
  Users, 
  Star,
  Check,
  Calendar,
  User,
  Building,
  ChevronLeft
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

function CorporateBookingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const vehicleId = searchParams.get("vehicleId");
  
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    company: "",
    pickupDate: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (vehicleId) {
      const vehicle = VEHICLES.find(v => v.id === vehicleId);
      if (vehicle) {
        setSelectedVehicle(vehicle);
      }
    }
  }, [vehicleId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVehicle) return;
    
    setIsSubmitting(true);
    
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          customerName: formData.name,
          email: `${formData.phone.replace(/[^0-9]/g, '')}@yatreedestination.com`,
          phone: formData.phone,
          pickupLocation: "Corporate Request",
          dropLocation: "Corporate Destination",
          pickupDate: formData.pickupDate,
          tripType: "B2B Concierge Priority Booking",
          vehicleType: selectedVehicle.name,
          customerNotes: `Company: ${formData.company || 'N/A'}. Directives: ${formData.message || 'None'}`
        })
      });
    } catch (err) {
      console.warn("DB save offline", err);
    }

    const whatsappNumber = "917627013579";
    const text = `*YATREE DESTINATION - B2B PRIORITY RESERVATION*\n` +
                 `----------------------------------------\n` +
                 `👤 *Company Rep:* ${formData.name}\n` +
                 `📞 *Direct Phone:* ${formData.phone}\n` +
                 `🏢 *Corporate Org:* ${formData.company || 'N/A'}\n` +
                 `🚕 *Selected Fleet:* ${selectedVehicle.name} (${selectedVehicle.seats})\n` +
                 `📅 *Schedule Date:* ${formData.pickupDate}\n` +
                 `📝 *Special Notes:* ${formData.message || 'None'}\n` +
                 `----------------------------------------\n` +
                 `Please generate commercial B2B tax invoice and assign elite driver.`;
    
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;
    window.open(whatsappUrl, "_blank");
    
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (!selectedVehicle) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-black text-slate-900 mb-4">Vehicle not found</h2>
        <Link href="/corporate-travel-udaipur" className="text-gold-premium font-bold hover:underline flex items-center gap-2">
          <ChevronLeft className="w-4 h-4" /> Return to Showroom
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 max-w-5xl">
      <Link href="/corporate-travel-udaipur#showroom" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold text-xs uppercase tracking-widest mb-8 transition-colors">
        <ChevronLeft className="w-4 h-4" /> Back to Fleet
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[2rem] shadow-[0_30px_70px_rgba(0,0,0,0.08)] border border-slate-100 overflow-hidden grid grid-cols-1 md:grid-cols-12 relative text-left"
      >
        {/* Left Column: Visual Vehicle Frame */}
        <div className="md:col-span-5 bg-gradient-to-tr from-slate-50 via-slate-50 to-amber-50/20 p-8 flex flex-col justify-between border-r border-slate-100 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.06)_0%,transparent_80%)] pointer-events-none" />
          
          <div className="relative z-10">
            <span className="bg-amber-500/10 border border-amber-500/20 text-amber-700 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full inline-flex items-center gap-1.5 mb-4">
              <Star className="w-3.5 h-3.5 text-amber-600 fill-current" /> {selectedVehicle.tag}
            </span>
            <h4 className="text-3xl font-black text-slate-900 uppercase tracking-tighter leading-none mb-3">{selectedVehicle.name}</h4>
            <p className="text-sm text-slate-600 font-medium leading-relaxed mb-6">{selectedVehicle.description}</p>
          </div>

          <div className="my-8 relative h-48 md:h-64 w-full flex items-center justify-center">
            <img src={selectedVehicle.image} alt={selectedVehicle.name} className="w-full h-full object-contain scale-110 mix-blend-multiply relative z-10" />
          </div>

          <div className="space-y-4 relative z-10">
            <div className="flex gap-2">
              <span className="bg-slate-950 text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                <Users className="w-3.5 h-3.5 text-gold-premium" /> {selectedVehicle.seats}
              </span>
              <span className="bg-white text-slate-800 text-xs font-bold tracking-wider uppercase px-3.5 py-1.5 rounded-full border border-slate-200">
                PLATE: YATREE
              </span>
            </div>
            
            <div className="flex flex-wrap gap-1.5">
              {selectedVehicle.features.map((feat, i) => (
                <span key={i} className="text-xs font-semibold text-slate-700 bg-slate-200/50 border border-slate-200/60 px-2.5 py-1 rounded-full">
                  {feat}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Checkout or Success Form */}
        <div className="md:col-span-7 p-8 md:p-12 flex flex-col justify-center">
          {isSuccess ? (
            <div className="text-center flex flex-col items-center justify-center min-h-[300px]">
              <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-6 text-emerald-500 shadow-sm">
                <Check className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-3">Reservation Sent!</h3>
              <p className="text-slate-500 text-sm leading-relaxed max-w-sm mb-8 font-medium">
                Your priority corporate reservation has been recorded. Our dedicated account manager has also been notified via WhatsApp and will confirm matching chauffeur details shortly.
              </p>
              <Link
                href="/corporate-travel-udaipur"
                className="bg-slate-950 hover:bg-gold-premium hover:text-midnight text-white font-black uppercase tracking-widest py-4 px-8 rounded-xl transition-all text-[10px] cursor-pointer inline-flex"
              >
                Return to Showroom
              </Link>
            </div>
          ) : (
            <>
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-2 block">Priority B2B Desk</span>
              <h3 className="text-2xl md:text-3xl font-black text-slate-950 uppercase tracking-tighter mb-8">Concierge Reservation</h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Representative Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-4 w-4 h-4 text-slate-400" />
                    <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200/80 hover:border-slate-300 focus:border-gold-premium px-12 py-4 rounded-xl text-sm font-bold text-slate-900 focus:outline-none transition-all" placeholder="E.g. Rajesh Kumar" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">WhatsApp Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-4 w-4 h-4 text-slate-400" />
                    <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200/80 hover:border-slate-300 focus:border-gold-premium px-12 py-4 rounded-xl text-sm font-bold text-slate-900 focus:outline-none transition-all" placeholder="E.g. +91 96609 53135" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Company / Hotel Name</label>
                    <div className="relative">
                      <Building className="absolute left-4 top-4 w-4 h-4 text-slate-400" />
                      <input type="text" name="company" value={formData.company} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200/80 hover:border-slate-300 focus:border-gold-premium px-12 py-4 rounded-xl text-sm font-bold text-slate-900 focus:outline-none transition-all" placeholder="Optional" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Travel Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-4 w-4 h-4 text-slate-400" />
                      <input required type="date" name="pickupDate" value={formData.pickupDate} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200/80 hover:border-slate-300 focus:border-gold-premium px-12 py-4 rounded-xl text-sm font-bold text-slate-900 focus:outline-none transition-all" />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Special Itinerary Directives (Optional)</label>
                  <textarea rows={3} name="message" value={formData.message} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200/80 hover:border-slate-300 focus:border-gold-premium px-5 py-4 rounded-xl text-sm font-medium text-slate-900 focus:outline-none transition-all resize-none" placeholder="Provide Cost Center details or specific travel routes..."></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-slate-950 hover:bg-gold-premium hover:text-midnight text-white font-black uppercase tracking-widest py-5 rounded-xl transition-all text-xs active:scale-[0.98] cursor-pointer mt-2 flex items-center justify-center gap-2 shadow-xl shadow-slate-950/10"
                >
                  {isSubmitting ? (
                    "Logging Reservation..."
                  ) : (
                    <>
                      Confirm Priority Fleet via WhatsApp
                      <MessageCircle className="w-4 h-4 fill-current" />
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default function CorporateBookingPage() {
  return (
    <main className="relative min-h-screen bg-slate-50 selection:bg-gold-premium selection:text-midnight pt-24">
      <Navbar />
      
      <Suspense fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-gold-premium border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        <CorporateBookingContent />
      </Suspense>

      <Footer />
    </main>
  );
}

"use client";

import { useState, useEffect, Suspense } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { 
  Car, 
  Bus, 
  Users, 
  Briefcase, 
  Phone, 
  MessageCircle, 
  Calendar, 
  MapPin, 
  Navigation, 
  FileText, 
  Mail, 
  User, 
  Sparkles,
  ShieldCheck,
  Star,
  Info,
  Calculator,
  Compass,
  ArrowRight,
  ClipboardList,
  Sparkle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Pricing database from original website
const TAXI_SERVICES_PRICING = [
  { service: "Airport Pickup or Drop", desc: "Maharana Pratap Airport Udaipur", sedan: 1000, innova: 1500 },
  { service: "City Local Sightseeing (8 Hours)", desc: "8 Hours or 80 Km City Tour", sedan: 2500, innova: 3500 },
  { service: "City Local Sightseeing (12 Hours)", desc: "12 Hours or 120 Km City Tour", sedan: 3000, innova: 4000 },
  { service: "Eklingji & Nathdwara Day Tour", desc: "4 Hours Half Day Service", sedan: 3000, innova: 4000 },
  { service: "Eklingji, Nathdwara & Haldighati", desc: "6 Hours Classic Day Tour", sedan: 3500, innova: 4500 },
  { service: "Ranakpur Jain Temple Tour", desc: "6 Hours Day Tour", sedan: 3500, innova: 4500 },
  { service: "Kumbhalgarh Fort Day Tour", desc: "6 Hours Historical Tour", sedan: 3500, innova: 4500 },
  { service: "Chittorgarh Fort Day Tour", desc: "6 Hours Heritage Tour", sedan: 4000, innova: 5000 },
  { service: "Mount Abu Same Day Tour", desc: "10 Hours Hill Station Tour", sedan: 6000, innova: 8000 }
];

const TRAVELLER_SERVICES_PRICING = [
  { service: "Airport Pick & Drop", desc: "Maharana Pratap Airport Udaipur", t12: 3000, t17: 4000, t21: 5000 },
  { service: "Railway Station Pick & Drop", desc: "Udaipur Railway Station Pick/Drop", t12: 2500, t17: 3000, t21: 3500 },
  { service: "City Tour (8 Hours / 80 Km)", desc: "8 Hours or 80 KM Local Ride", t12: 6500, t17: 7500, t21: 8500 },
  { service: "City Tour (12 Hours / 120 Km)", desc: "12 Hours or 120 KM Grand Tour", t12: 7500, t17: 9000, t21: 12000 },
  { service: "Eklingji & Nathdwara Tour", desc: "6 Hours Religious Sightseeing", t12: 9000, t17: 12000, t21: 15000 },
  { service: "Kumbhalgarh Fort Tour", desc: "6 Hours Historical Tour", t12: 9000, t17: 12000, t21: 15000 },
  { service: "Chittorgarh Fort Tour", desc: "6 Hours Heritage Sightseeing", t12: 9500, t17: 12500, t21: 15500 }
];

// Clean light background vehicle display metadata
const VEHICLE_META: Record<string, { name: string; image: string; seats: string; desc: string }> = {
  sedan: {
    name: "Premium Sedan (Dzire/Etios)",
    image: "/etios.png",
    seats: "4 Seater Taxi",
    desc: "Perfect choice for standard comfortable city rides & sightseeing tours. Features custom VIP GOGETGO license plate."
  },
  innova: {
    name: "Toyota Innova Crysta",
    image: "/innova.png",
    seats: "7 Seater Luxury SUV",
    desc: "The gold standard of premium Indian travel. Highly spacious & comfortable. Features custom VIP GOGETGO license plate."
  },
  t12: {
    name: "Force Traveller (12 Seater)",
    image: "/tempo.png",
    seats: "12 Seater Minibus",
    desc: "Perfect for family tours, pushback seats, and chilled dual A/C. Features custom VIP GOGETGO license plate."
  },
  t17: {
    name: "Force Traveller (17 Seater)",
    image: "/traveller-17.png",
    seats: "17 Seater Minibus",
    desc: "Heavy duty passenger van for tourist groups with cargo carrier. Features custom VIP GOGETGO license plate."
  },
  t21: {
    name: "Force Traveller (21 Seater)",
    image: "/traveller-17.png",
    seats: "21 Seater Mini Coach",
    desc: "Grand group explorer for destination weddings and corporate travel. Features custom VIP GOGETGO license plate."
  }
};

function BookingEngine() {
  const searchParams = useSearchParams();
  const params = useParams();
  const router = useRouter();

  const routeType = params?.type?.[0] || searchParams.get("type");

  const [activeTab, setActiveTab] = useState<"car" | "bus">("car");
  
  // Calculator State
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(1); // Default to 8 Hours City Tour
  const [selectedVehicleType, setSelectedVehicleType] = useState<string>("sedan"); // sedan, innova, t12, t17, t21
  const [estimatedFare, setEstimatedFare] = useState<number>(2500);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    pickupLocation: "",
    dropLocation: "",
    pickupDate: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Read URL query parameter or dynamic route on load
  useEffect(() => {
    if (routeType === "tempo" || routeType === "bus") {
      setActiveTab("bus");
      setSelectedServiceIndex(2); // Local 8 Hours for Bus
      setSelectedVehicleType("t12");
    } else if (routeType === "car") {
      setActiveTab("car");
      setSelectedServiceIndex(1); // Local 8 Hours for Car
      setSelectedVehicleType("sedan");
    }
  }, [routeType]);

  // Recalculate Fare dynamically
  useEffect(() => {
    if (activeTab === "car") {
      const selectedItem = TAXI_SERVICES_PRICING[selectedServiceIndex] || TAXI_SERVICES_PRICING[1];
      if (selectedVehicleType === "innova") {
        setEstimatedFare(selectedItem.innova);
      } else {
        setEstimatedFare(selectedItem.sedan);
      }
    } else {
      const selectedItem = TRAVELLER_SERVICES_PRICING[selectedServiceIndex] || TRAVELLER_SERVICES_PRICING[2];
      if (selectedVehicleType === "t17") {
        setEstimatedFare(selectedItem.t17);
      } else if (selectedVehicleType === "t21") {
        setEstimatedFare(selectedItem.t21);
      } else {
        setEstimatedFare(selectedItem.t12);
      }
    }
  }, [activeTab, selectedServiceIndex, selectedVehicleType]);



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const vehicleMeta = VEHICLE_META[selectedVehicleType];
    const vehicleLabel = vehicleMeta ? vehicleMeta.name : "Maruti Dzire";

    const serviceName = activeTab === "car" 
      ? TAXI_SERVICES_PRICING[selectedServiceIndex]?.service 
      : TRAVELLER_SERVICES_PRICING[selectedServiceIndex]?.service;

    // Save booking to Database
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          customerName: formData.name,
          email: formData.email || `${formData.phone.replace(/[^0-9]/g, '')}@gogetgodestination.com`,
          phone: formData.phone,
          pickupLocation: formData.pickupLocation,
          dropLocation: formData.dropLocation,
          pickupDate: formData.pickupDate,
          tripType: serviceName,
          vehicleType: vehicleLabel,
          customerNotes: `Quote: ₹${estimatedFare}. ${formData.message}`
        })
      });
    } catch (err) {
      console.warn("DB save offline", err);
    }

    // Direct WhatsApp prefill
    const whatsappNumber = "9180000505810";
    const text = `*GOGETGO TAXI - RESERVATION WITH RATE*\n` +
                 `----------------------------------------\n` +
                 `👤 *Customer Name:* ${formData.name}\n` +
                 `📞 *Phone Number:* ${formData.phone}\n` +
                 `✉️ *Email:* ${formData.email || 'N/A'}\n` +
                 `🗺️ *Service Requested:* ${serviceName}\n` +
                 `🚗 *Selected Taxi:* ${vehicleLabel} [VIP GOGETGO PLATE]\n` +
                 `💰 *Estimated Fare:* ₹${estimatedFare} (All Inc.)\n` +
                 `🛫 *Pickup From:* ${formData.pickupLocation}\n` +
                 `🛬 *Dropoff To:* ${formData.dropLocation}\n` +
                 `📅 *Schedule Date:* ${formData.pickupDate}\n` +
                 `📝 *Special Notes:* ${formData.message || 'None'}\n` +
                 `----------------------------------------\n` +
                 `Please confirm my instant rate booking. Thank you!`;
    
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;
    window.open(whatsappUrl, "_blank");
    
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const activeVehicleMeta = VEHICLE_META[selectedVehicleType] || VEHICLE_META.sedan;

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 max-w-7xl">
      
      {isSuccess ? (
        /* Success Screen */
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl mx-auto bg-white p-8 md:p-12 rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.1)] border border-slate-100 text-center relative overflow-hidden"
        >
          <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-6 text-slate-800 shadow-sm">
            <ShieldCheck className="w-10 h-10 text-gold-premium" />
          </div>
          
          <h2 className="text-3xl font-black mb-4 uppercase tracking-wider text-slate-900">Enquiry Lodged!</h2>
          <p className="text-slate-600 mb-8 text-xs leading-relaxed">
            Your travel parameters and estimated price of **₹{estimatedFare}** have been successfully sent to our dispatch desk via WhatsApp. We will match a chauffeur and confirm booking inside 30 minutes.
          </p>

          <button 
            onClick={() => {
              setIsSuccess(false);
              setFormData({
                name: "",
                phone: "",
                email: "",
                pickupLocation: "",
                dropLocation: "",
                pickupDate: "",
                message: ""
              });
            }}
            className="w-full bg-midnight hover:bg-gold-premium hover:text-midnight text-white font-black uppercase tracking-widest py-4.5 rounded-xl transition-all text-xs active:scale-[0.98] cursor-pointer"
          >
            Create Another Reservation
          </button>
        </motion.div>
      ) : (
        <>
          {/* Glassmorphic Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            
            {/* Left Column: Premium Rate Cards */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Header Box (Simple clean light theme card) */}
              <div className="bg-white text-slate-950 p-8 rounded-[2rem] border border-slate-200/60 shadow-lg relative overflow-hidden text-left">
                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-4 h-4 text-gold-premium fill-current animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Official Tariffs</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-2 leading-none text-slate-900">Taxi Service in Udaipur</h3>
                <p className="text-slate-600 text-xs md:text-sm font-medium leading-relaxed max-w-lg">
                  Transparent, highly competitive fixed pricing sheets for Rajasthan day-tours and transfers. Inclusive of fuel charges, tolls, and Chauffeur allowances. Custom premium **GOGETGO** VIP plates featured.
                </p>

                {/* Tab Switcher - Car / Bus */}
                <div className="flex bg-slate-950 p-1.5 rounded-xl mt-8 w-full max-w-[280px]">
                  <Link
                    href="/booking/car"
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${activeTab === 'car' ? 'bg-gold-premium text-midnight font-bold' : 'text-white/60 hover:text-white'}`}
                  >
                    <Car className="w-3.5 h-3.5" />
                    Car
                  </Link>
                  <Link
                    href="/booking/tempo"
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${activeTab === 'bus' ? 'bg-gold-premium text-midnight font-bold' : 'text-white/60 hover:text-white'}`}
                  >
                    <Bus className="w-3.5 h-3.5" />
                    Tempo Traveller
                  </Link>
                </div>
              </div>

              {/* Verified Rate Sheet Cards list */}
              <div className="space-y-4">
                <AnimatePresence mode="wait">
                  {activeTab === "car" ? (
                    <motion.div
                      key="car-cards"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      {TAXI_SERVICES_PRICING.map((item, i) => (
                        <div 
                          key={i} 
                          onClick={() => setSelectedServiceIndex(i)}
                          className={`p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-6 cursor-pointer bg-white text-left shadow-sm ${selectedServiceIndex === i ? 'border-gold-premium ring-1 ring-gold-premium/15 shadow' : 'border-slate-200/60 hover:border-gold-premium/30'}`}
                        >
                          <div className="space-y-1">
                            <h4 className="font-extrabold text-slate-950 text-sm md:text-base uppercase tracking-tight">{item.service}</h4>
                            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">{item.desc}</p>
                          </div>
                          
                          <div className="flex gap-4 items-center shrink-0">
                            <div className="text-right">
                              <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">Sedan</span>
                              <span className="font-black text-slate-950 text-sm md:text-base">₹{item.sedan.toLocaleString()}</span>
                            </div>
                            <div className="w-px h-8 bg-slate-100" />
                            <div className="text-right">
                              <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">Innova</span>
                              <span className="font-black text-gold-premium text-sm md:text-base">₹{item.innova.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="bus-cards"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      {TRAVELLER_SERVICES_PRICING.map((item, i) => (
                        <div 
                          key={i} 
                          onClick={() => setSelectedServiceIndex(i)}
                          className={`p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-6 cursor-pointer bg-white text-left shadow-sm ${selectedServiceIndex === i ? 'border-gold-premium ring-1 ring-gold-premium/15 shadow' : 'border-slate-200/60 hover:border-gold-premium/30'}`}
                        >
                          <div className="space-y-1">
                            <h4 className="font-extrabold text-slate-950 text-sm md:text-base uppercase tracking-tight">{item.service}</h4>
                            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">{item.desc}</p>
                          </div>
                          
                          <div className="flex gap-4 items-center shrink-0">
                            <div className="text-right">
                              <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">12 Seater</span>
                              <span className="font-black text-slate-950 text-sm">₹{item.t12.toLocaleString()}</span>
                            </div>
                            <div className="w-px h-8 bg-slate-100" />
                            <div className="text-right">
                              <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">17 Seater</span>
                              <span className="font-black text-slate-800 text-sm">₹{item.t17.toLocaleString()}</span>
                            </div>
                            <div className="w-px h-8 bg-slate-100" />
                            <div className="text-right">
                              <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">21 Seater</span>
                              <span className="font-black text-gold-premium text-sm">₹{item.t21.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Info block */}
              <div className="bg-slate-100/60 border border-slate-200/60 rounded-2xl p-5 flex gap-4 text-left">
                <Info className="w-5.5 h-5.5 text-gold-premium shrink-0" />
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Service Directives</span>
                  <p className="text-xs text-slate-700 leading-relaxed font-semibold">
                    Pricing incorporates all toll costs, commercial permit fees, smart parking dues, and fuel charges. Click any item above to instantly load it into the quote estimator!
                  </p>
                </div>
              </div>

            </div>

            {/* Right Column: Premium Calculator Card */}
            <div className="lg:col-span-5">
              
              <div className="bg-white border border-slate-200 rounded-[2rem] shadow-xl p-6 md:p-8 overflow-hidden relative">
                
                <div className="flex items-center gap-2 mb-4 text-slate-400">
                  <Calculator className="w-4.5 h-4.5 text-gold-premium" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Instant Fare Estimator</span>
                </div>
                
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-6 text-left">Calculate & Book</h3>

                {/* SIMPLE CLEAN VEHICLE DISPLAY FRAME - NO scenery background, clean white frame */}
                <div className="bg-slate-50 rounded-2xl p-4 flex items-center justify-between gap-4 border border-slate-200/60 mb-6 shadow-sm relative overflow-hidden">
                  <div className="text-left relative z-10">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-gold-premium block mb-0.5">{activeVehicleMeta.seats}</span>
                    <h5 className="font-extrabold text-base text-slate-950 uppercase tracking-tight">{activeVehicleMeta.name}</h5>
                    <p className="text-xs text-slate-600 leading-normal font-semibold mt-1 max-w-[170px]">{activeVehicleMeta.desc}</p>
                    
                    {/* VIP Plate Highlight badge */}
                    <span className="inline-block mt-2 bg-slate-950 text-white font-bold text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full shadow-sm">
                      PLATE: GOGETGO
                    </span>
                  </div>
                  
                  {/* Clean Vehicle picture frame */}
                  <div className="relative z-10 w-24 h-16 shrink-0 flex items-center justify-center bg-white rounded-lg border border-slate-100 p-1">
                    <img src={activeVehicleMeta.image} alt={activeVehicleMeta.name} className="w-full h-full object-contain mix-blend-multiply" />
                  </div>
                </div>

                {/* Estimate display */}
                <div className="bg-slate-950 text-white rounded-2xl p-6 text-center border border-white/5 relative overflow-hidden mb-6 shadow-md">
                  <span className="text-xs font-bold uppercase tracking-[0.25em] text-gold-premium block mb-1">Estimated Direct Fare</span>
                  
                  <div className="text-5xl font-black text-white tracking-tight flex items-center justify-center gap-1 leading-none py-1">
                    <span className="text-gold-premium text-2xl font-bold">₹</span>
                    {estimatedFare.toLocaleString()}
                  </div>
                  
                  <span className="text-xs font-medium text-white/50 uppercase tracking-widest block mt-2">All-Inclusive Fixed Pricing</span>
                </div>

                {/* Selectors Form */}
                <div className="space-y-4 mb-6 text-left">
                  
                  {/* Service */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-gold-premium" />
                      1. Destination Route / Tour
                    </label>
                    <select
                      value={selectedServiceIndex}
                      onChange={(e) => setSelectedServiceIndex(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 px-4 py-3.5 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-gold-premium appearance-none cursor-pointer"
                    >
                      {activeTab === "car" 
                        ? TAXI_SERVICES_PRICING.map((item, index) => (
                            <option key={index} value={index}>{item.service}</option>
                          ))
                        : TRAVELLER_SERVICES_PRICING.map((item, index) => (
                            <option key={index} value={index}>{item.service}</option>
                          ))
                      }
                    </select>
                  </div>

                  {/* Vehicle */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                      <Car className="w-3.5 h-3.5 text-gold-premium" />
                      2. Choose Chauffeur Class
                    </label>
                    
                    <select
                      value={selectedVehicleType}
                      onChange={(e) => setSelectedVehicleType(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 px-4 py-3.5 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-gold-premium appearance-none cursor-pointer"
                    >
                      {activeTab === "car" ? (
                        <>
                          <option value="sedan">Maruti Dzire / Toyota Etios (4 Seats)</option>
                          <option value="innova">Toyota Innova Crysta (7 Seats)</option>
                        </>
                      ) : (
                        <>
                          <option value="t12">Force Traveller 12-Seater (Minibus)</option>
                          <option value="t17">Force Traveller 17-Seater (Medium)</option>
                          <option value="t21">Force Traveller 21-Seater (Large)</option>
                        </>
                      )}
                    </select>
                  </div>

                </div>

                {/* Form fields */}
                <div className="border-t border-slate-150 pt-6">
                  <form onSubmit={handleSubmit} className="space-y-4 text-left">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-gold-premium" />
                          Full Name
                        </label>
                        <input required type="text" name="name" autoComplete="off" value={formData.name} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-lg text-xs font-bold focus:outline-none focus:border-gold-premium" placeholder="Enter Full Name" />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5 text-gold-premium" />
                          WhatsApp Phone
                        </label>
                        <input required type="tel" name="phone" autoComplete="off" value={formData.phone} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-lg text-xs font-bold focus:outline-none focus:border-gold-premium" placeholder="+91 00000 00000" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-gold-premium" />
                          Pickup Location
                        </label>
                        <input required type="text" name="pickupLocation" value={formData.pickupLocation} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-lg text-xs font-bold focus:outline-none focus:border-gold-premium" placeholder="Airport / Hotel" />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-gold-premium" />
                          Drop Location
                        </label>
                        <input required type="text" name="dropLocation" value={formData.dropLocation} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-lg text-xs font-bold focus:outline-none focus:border-gold-premium" placeholder="Palace / Hotel" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-gold-premium" />
                        Pickup Date & Time
                      </label>
                      <input required type="datetime-local" name="pickupDate" value={formData.pickupDate} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-lg text-xs font-bold focus:outline-none focus:border-gold-premium" />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5 text-gold-premium" />
                        Itinerary Directives
                      </label>
                      <textarea rows={2} name="message" value={formData.message} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-lg text-xs focus:outline-none focus:border-gold-premium resize-none" placeholder="Provide extra directives or route halts..."></textarea>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-slate-950 hover:bg-gold-premium hover:text-midnight text-white font-black uppercase tracking-widest py-4.5 rounded-xl transition-all shadow-md text-xs active:scale-[0.98] cursor-pointer mt-4 flex items-center justify-center gap-2 border border-white/5 shadow-black/10"
                    >
                      {isSubmitting ? (
                        "Verifying parameters..."
                      ) : (
                        <>
                          Book Taxi at ₹{estimatedFare.toLocaleString()}
                          <MessageCircle className="w-4.5 h-4.5 fill-current" />
                        </>
                      )}
                    </button>

                  </form>
                </div>

              </div>

            </div>

          </div>
        </>
      )}

    </div>
  );
}

export default function BookingPage() {
  return (
    <main className="relative min-h-screen bg-slate-50 selection:bg-gold-premium selection:text-midnight pt-24">
      <Navbar />
      
      {/* Premium Visual Banner */}
      <div className="bg-slate-950 py-24 px-6 text-center relative overflow-hidden">
        {/* Glow */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-[300px] bg-gold-premium/15 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-full max-w-[300px] h-[300px] bg-gold-premium/10 rounded-full blur-[80px]" />
        </div>
        
        <span className="text-gold-premium font-black uppercase tracking-[0.3em] text-[10px] mb-4 block flex items-center justify-center gap-2">
          <Sparkle className="w-4 h-4 text-gold-premium animate-pulse" />
          VIP Tourist Taxi Desk
        </span>
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-4 leading-none">Instant Fare Booking</h1>
        <p className="text-slate-400 max-w-xl mx-auto text-xs md:text-sm leading-relaxed font-medium">
          Official, fully transparent fixed pricing sheets. Select your desired sightseeing parameters or transfer routes to estimate exact prices and reserve instantly.
        </p>
      </div>

      {/* Booking Calculator Engine */}
      <Suspense fallback={
        <div className="container mx-auto px-6 py-32 text-center">
          <div className="w-12 h-12 border-4 border-gold-premium border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Loading Rate Cards...</p>
        </div>
      }>
        <BookingEngine />
      </Suspense>

      <Footer />

      {/* WhatsApp Concierge floating widget */}
      <div className="fixed bottom-8 right-8 z-[90] hidden md:block">
         <a href="https://wa.me/9180000505810" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(37,211,102,0.4)] hover:scale-110 transition-all duration-300">
            <MessageCircle className="w-6 h-6 fill-current" />
         </a>
      </div>
      <div className="fixed bottom-0 left-0 w-full z-[100] md:hidden flex border-t border-slate-200 bg-white">
        <a href="tel:+9180000505810" className="flex-1 bg-slate-950 text-white flex items-center justify-center gap-2 py-4.5 font-bold text-xs uppercase tracking-wider"><Phone className="w-4 h-4 text-gold-premium" /> Call Concierge</a>
        <a href="https://wa.me/9180000505810" className="flex-1 bg-[#25D366] text-white flex items-center justify-center gap-2 py-4.5 font-bold text-xs uppercase tracking-wider"><MessageCircle className="w-4 h-4" /> WhatsApp</a>
      </div>
    </main>
  );
}

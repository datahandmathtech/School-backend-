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
  Sparkle,
  Plus,
  Minus,
  Check
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
    image: "/Dzire (2).png",
    seats: "4 Seater Taxi",
    desc: "Perfect choice for standard comfortable city rides & sightseeing tours. Features custom VIP YATREE license plate."
  },
  innova: {
    name: "Toyota Innova Crysta",
    image: "/Innova crysta.png",
    seats: "7 Seater Luxury SUV",
    desc: "The gold standard of premium Indian travel. Highly spacious & comfortable. Features custom VIP YATREE license plate."
  },
  t12: {
    name: "Force Traveller (12 Seater)",
    image: "/tempo-mice.jpg",
    seats: "12 Seater Minibus",
    desc: "Perfect for family tours, pushback seats, and chilled dual A/C. Features custom VIP YATREE license plate."
  },
  t17: {
    name: "Force Traveller (17 Seater)",
    image: "/urbania-mice.jpg",
    seats: "17 Seater Minibus",
    desc: "Heavy duty passenger van for tourist groups with cargo carrier. Features custom VIP YATREE license plate."
  },
  t21: {
    name: "Volvo Bus (21 Seater)",
    image: "/volvo-21-mice.jpg",
    seats: "21 Seater Mini Coach",
    desc: "Grand group explorer for destination weddings and corporate travel. Features custom VIP YATREE license plate."
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
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

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
          email: formData.email || `${formData.phone.replace(/[^0-9]/g, '')}@yatreedestination.com`,
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
    const whatsappNumber = "917627013579";
    const text = `*YATREE DESTINATION - RESERVATION WITH RATE*\n` +
                 `----------------------------------------\n` +
                 `👤 *Customer Name:* ${formData.name}\n` +
                 `📞 *Phone Number:* ${formData.phone}\n` +
                 `✉️ *Email:* ${formData.email || 'N/A'}\n` +
                 `🗺️ *Service Requested:* ${serviceName}\n` +
                 `🚗 *Selected Taxi:* ${vehicleLabel} [VIP YATREE PLATE]\n` +
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
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-2 leading-none text-slate-900">
                  {activeTab === 'car' 
                    ? 'Taxi Service in Udaipur – Reliable Cab Booking for Airport, Sightseeing & Outstation Travel' 
                    : 'Tempo Traveller in Udaipur – Reliable Minibus Booking'}
                </h3>
                <p className="text-slate-600 text-xs md:text-sm font-medium leading-relaxed max-w-lg">
                  {activeTab === 'car' 
                    ? 'Book trusted taxi service in Udaipur with Yatree Destination. Choose from Sedan, SUV, Innova Crysta, Tempo Traveller and Luxury Coaches for airport transfers, local sightseeing, corporate travel, weddings and outstation trips across Rajasthan.'
                    : 'Book trusted Tempo Traveller service in Udaipur with Yatree Destination. Choose from 12 Seater, 17 Seater, and 21 Seater luxury options for groups, corporate tours, and family trips across Rajasthan.'}
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



            </div>

            {/* Right Column: Premium Calculator Card */}
            <div className="lg:col-span-5">
              
              <div className="bg-white border border-slate-200 rounded-[2rem] shadow-xl p-6 md:p-8 overflow-hidden relative">
                
                <div className="flex items-center gap-2 mb-4 text-slate-400">
                  <Calculator className="w-4.5 h-4.5 text-gold-premium" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Instant Fare Estimator</span>
                </div>
                
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-6 text-left">Calculate & Book</h3>

                {/* Cinematic Vehicle Display Frame */}
                <div className="bg-slate-900 rounded-2xl flex items-end justify-start p-5 mb-6 shadow-md relative overflow-hidden h-44">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-transparent z-10 pointer-events-none" />
                  <img src={activeVehicleMeta.image} alt={activeVehicleMeta.name} className={`absolute inset-0 w-full h-full z-0 transition-transform duration-700 hover:scale-105 ${activeVehicleMeta.image.includes('tempo') || activeVehicleMeta.image.includes('traveller') ? 'object-contain scale-110 pb-4' : 'object-cover object-[center_30%]'}`} />
                  
                  <div className="text-left relative z-20">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gold-premium block mb-1">{activeVehicleMeta.seats}</span>
                    <h5 className="font-extrabold text-lg text-white uppercase tracking-tight leading-none mb-1.5">{activeVehicleMeta.name}</h5>
                    <p className="text-[10px] text-slate-300 leading-relaxed font-medium max-w-[260px] hidden sm:block">{activeVehicleMeta.desc}</p>
                    
                    {/* VIP Plate Highlight badge */}
                    <span className="inline-flex items-center mt-3 bg-gold-premium/10 border border-gold-premium/20 text-gold-premium font-bold text-[9px] tracking-[0.15em] uppercase px-3 py-1 rounded-full shadow-sm">
                      PLATE: YATREE
                    </span>
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

{/* ========================================================================= */}
          {/* RENDER RICH SEO AND TOURIST INFORMATION SECTIONS */}
          {/* ========================================================================= */}
          <div className="relative mt-12 border-t border-slate-200/80 pt-10 space-y-20">
            
            {/* Background ambient glowing elements */}
            <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-gold-premium/4 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse" />
            <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-gold-premium/3 rounded-full blur-[120px] pointer-events-none -z-10" />

            {activeTab === 'car' ? (
              <>
                {/* Call Now Banner Moved Up */}
                <div className="relative overflow-hidden bg-slate-950 text-white p-6 md:p-8 rounded-3xl mb-12 border border-white/5 flex flex-col md:flex-row items-center gap-6 shadow-xl">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gold-premium/10 rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="flex items-center gap-4 text-left mr-auto relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-gold-premium shrink-0 border border-white/5">
                      <Phone className="w-6 h-6 animate-pulse" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Speak to our Coordinator</span>
                      <a href="tel:+917627013579" className="text-xl md:text-2xl font-black text-white hover:text-gold-premium transition-colors tracking-tight">+91 76270 13579</a>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto relative z-10">
                    <a href="tel:+917627013579" className="w-full sm:w-auto text-center bg-gold-premium hover:bg-gold-premium/90 text-midnight font-black uppercase tracking-widest text-xs px-8 py-4 rounded-xl transition-all duration-300 shadow-md">
                      Call Now
                    </a>
                    <a href="https://wa.me/917627013579" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto text-center bg-[#25D366] hover:bg-[#22c35e] text-white font-black uppercase tracking-widest text-xs px-8 py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md">
                      <MessageCircle className="w-4 h-4 fill-current" /> WhatsApp
                    </a>
                  </div>
                </div>

                {/* Section 1: Book the Best Taxi Service in Udaipur */}
                <section className="relative overflow-hidden bg-gradient-to-br from-white via-white to-slate-50/50 border border-slate-200/60 rounded-[3rem] p-8 md:p-14 shadow-[0_20px_60px_rgba(0,0,0,0.02)] hover:shadow-[0_30px_70px_rgba(212,175,55,0.06)] transition-all duration-500 text-left">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-gold-premium/5 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-slate-100 rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="relative z-10 max-w-5xl space-y-6">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-premium/10 border border-gold-premium/20 text-gold-premium text-[10px] font-black uppercase tracking-widest">
                      <Sparkles className="w-3.5 h-3.5 text-gold-premium animate-spin-slow" />
                      Trusted Service
                    </span>
                    
                    <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-gold-premium to-slate-950 uppercase tracking-tighter leading-none">
                      Book the Best Taxi Service in Udaipur
                    </h2>
                    
                    <h3 className="text-lg md:text-xl font-bold text-slate-700 leading-relaxed max-w-3xl border-l-2 border-gold-premium pl-4">
                      Looking for a reliable taxi service in Udaipur?
                    </h3>
                    
                    <p className="text-sm md:text-base text-slate-600 leading-relaxed font-medium max-w-4xl">
                      Yatree Destination offers professionally managed taxi services with verified drivers, clean vehicles and transparent pricing. Whether you are arriving at Maharana Pratap Airport, planning a sightseeing tour of Udaipur or travelling to destinations like Mount Abu, Kumbhalgarh, Chittorgarh or Jodhpur, we provide comfortable and safe transportation for individuals, families and corporate travelers.
                    </p>

                    {/* Bullets Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-6">
                      {[
                        "Airport Transfers",
                        "Local Sightseeing Taxi",
                        "One Way Cab Service",
                        "Round Trip Taxi Booking",
                        "Corporate Travel Solutions",
                        "Wedding Transportation",
                        "Tempo Traveller Rental",
                        "Luxury Coach Booking"
                      ].map((service, idx) => (
                        <div key={idx} className="group flex items-center gap-3 bg-white border border-slate-150 p-4 rounded-2xl hover:border-gold-premium/30 hover:shadow-sm transition-all duration-300">
                          <div className="w-7 h-7 rounded-full bg-gold-premium/10 border border-gold-premium/20 flex items-center justify-center text-gold-premium shrink-0 group-hover:bg-gold-premium group-hover:text-white transition-all duration-300">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                          <span className="text-xs font-bold text-slate-800 uppercase tracking-tight">{service}</span>
                        </div>
                      ))}
                    </div>



                  </div>
                </section>

                {/* Section 2: Why Choose Yatree Destination */}
                <section className="space-y-12 text-left">
                  <div className="text-center md:text-left space-y-4 max-w-3xl">
                    <span className="inline-flex items-center gap-1 text-gold-premium font-black uppercase tracking-[0.3em] text-xs">
                      <Star className="w-3.5 h-3.5 fill-current" /> Our Advantages
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black text-slate-950 uppercase tracking-tight leading-none">
                      Why Choose Yatree Destination
                    </h2>
                    <p className="text-slate-500 font-bold uppercase tracking-wider text-xs md:text-sm">
                      Trusted Taxi Service Provider in Udaipur
                    </p>
                    <div className="w-16 h-1 bg-gold-premium rounded" />
                    <p className="text-sm md:text-base text-slate-600 leading-relaxed font-medium pt-1">
                      With years of experience in Rajasthan tourism and transportation, Yatree Destination has become a preferred choice for travelers visiting Udaipur from across India.
                    </p>
                  </div>

                  {/* Grid of Advantages */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { title: "Professional Drivers", desc: "Experienced, licensed, and highly familiar with local routes and sightseeing destinations.", icon: Users },
                      { title: "Sanitized Vehicles", desc: "Well-maintained, clean cars and Tempo Travellers serviced regularly for maximum safety.", icon: ShieldCheck },
                      { title: "24/7 Support", desc: "Around-the-clock customer help desk to coordinate routes, pick-ups, and bookings.", icon: Phone },
                      { title: "Transparent Pricing", desc: "Fixed rate cards with no hidden fees, dynamic surcharges, or extra mileage surprises.", icon: Calculator },
                      { title: "GST Invoices", desc: "Full tax invoices available for corporate trips, weddings, and official travels.", icon: FileText },
                      { title: "Corporate Solutions", desc: "Tailored executive transfers, contracts, and fleet bookings for business delegates.", icon: Briefcase },
                      { title: "Large Event Fleet", desc: "Diverse fleet of luxury cars, SUVs, Tempo Travellers, and buses for big guest groups.", icon: Car },
                      { title: "On-Time Guarantee", desc: "Strict adherence to pick-up times for airport drops, weddings, and local sight tours.", icon: Calendar }
                    ].map((item, idx) => (
                      <div key={idx} className="group relative bg-white border border-slate-200/80 p-7 rounded-2xl shadow-sm hover:border-gold-premium/30 hover:shadow-[0_20px_40px_rgba(212,175,55,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-[3px] bg-gold-premium scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        
                        <div className="space-y-4">
                          <div className="w-12 h-12 rounded-xl bg-gold-premium/5 border border-gold-premium/10 flex items-center justify-center text-gold-premium group-hover:bg-gold-premium group-hover:text-midnight transition-all duration-300">
                            <item.icon className="w-5.5 h-5.5 group-hover:scale-110 transition-transform duration-300" />
                          </div>
                          <h4 className="font-extrabold text-slate-900 text-sm uppercase tracking-tight">{item.title}</h4>
                          <p className="text-xs text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Section 3: Taxi Services We Offer */}
                <section className="space-y-12 text-left">
                  <div className="space-y-4 max-w-3xl">
                    <span className="inline-flex items-center gap-1 text-gold-premium font-black uppercase tracking-[0.3em] text-xs">
                      <Sparkles className="w-3.5 h-3.5" /> Our Offerings
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black text-slate-950 uppercase tracking-tight leading-none">
                      Taxi Services We Offer
                    </h2>
                    <div className="w-16 h-1 bg-gold-premium rounded" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    
                    {/* Card 1: Airport Taxi */}
                    <div className="group relative bg-white border border-slate-200/80 rounded-3xl p-8 flex flex-col justify-between hover:border-gold-premium/30 hover:shadow-[0_20px_40px_rgba(212,175,55,0.06)] hover:-translate-y-1 transition-all duration-300 space-y-6">
                      <div className="absolute top-5 right-5 w-2 h-2 rounded-full bg-gold-premium opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="space-y-4">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Transfer Service</span>
                        <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight leading-snug group-hover:text-gold-premium transition-colors">Airport Taxi Service in Udaipur</h3>
                        <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-medium">
                          Book airport taxi service in Udaipur for hassle-free pickup and drop from Maharana Pratap Airport. Our drivers monitor flight timings and ensure timely arrivals and departures.
                        </p>
                      </div>
                      <div className="border-t border-slate-100 pt-5 space-y-3">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Suitable For:</span>
                        <div className="flex flex-wrap gap-2">
                          {["Business Travelers", "Families", "Tourists", "Wedding Guests"].map((tag, i) => (
                            <span key={i} className="text-[9px] font-bold uppercase tracking-wider bg-slate-50 border border-slate-200/60 px-2.5 py-1 rounded text-slate-600">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Card 2: Sightseeing Taxi */}
                    <div className="group relative bg-white border border-slate-200/80 rounded-3xl p-8 flex flex-col justify-between hover:border-gold-premium/30 hover:shadow-[0_20px_40px_rgba(212,175,55,0.06)] hover:-translate-y-1 transition-all duration-300 space-y-6">
                      <div className="absolute top-5 right-5 w-2 h-2 rounded-full bg-gold-premium opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="space-y-4">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Explore Lakes</span>
                        <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight leading-snug group-hover:text-gold-premium transition-colors">Udaipur Sightseeing Taxi</h3>
                        <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-medium">
                          Explore the beautiful City of Lakes with our dedicated sightseeing taxi service in Udaipur. Enjoy custom itinerary options with standard day tours.
                        </p>
                      </div>
                      <div className="border-t border-slate-100 pt-5 space-y-3">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Popular Attractions:</span>
                        <div className="flex flex-wrap gap-2">
                          {["City Palace", "Lake Pichola", "Fateh Sagar", "Monsoon Palace", "Jag Mandir"].map((tag, i) => (
                            <span key={i} className="text-[9px] font-bold uppercase tracking-wider bg-slate-50 border border-slate-200/60 px-2.5 py-1 rounded text-slate-600">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Card 3: Outstation Taxi */}
                    <div className="group relative bg-white border border-slate-200/80 rounded-3xl p-8 flex flex-col justify-between hover:border-gold-premium/30 hover:shadow-[0_20px_40px_rgba(212,175,55,0.06)] hover:-translate-y-1 transition-all duration-300 space-y-6">
                      <div className="absolute top-5 right-5 w-2 h-2 rounded-full bg-gold-premium opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="space-y-4">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Rajasthan tours</span>
                        <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight leading-snug group-hover:text-gold-premium transition-colors">Outstation Taxi Service</h3>
                        <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-medium">
                          Travel comfortably to nearby destinations like Mount Abu, Kumbhalgarh, Ranakpur, Chittorgarh, Jodhpur, Jaipur, or Ahmedabad with our outstation cab service. Available for one-way and round-trip bookings.
                        </p>
                      </div>
                      <div className="border-t border-slate-100 pt-5 space-y-3">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Popular Routes:</span>
                        <div className="flex flex-wrap gap-2">
                          {["Mount Abu", "Kumbhalgarh", "Chittorgarh", "Jodhpur", "Jaipur"].map((tag, i) => (
                            <span key={i} className="text-[9px] font-bold uppercase tracking-wider bg-slate-50 border border-slate-200/60 px-2.5 py-1 rounded text-slate-600">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Card 4: Corporate Taxi */}
                    <div className="group relative bg-white border border-slate-200/80 rounded-3xl p-8 flex flex-col justify-between hover:border-gold-premium/30 hover:shadow-[0_20px_40px_rgba(212,175,55,0.06)] hover:-translate-y-1 transition-all duration-300 space-y-6">
                      <div className="absolute top-5 right-5 w-2 h-2 rounded-full bg-gold-premium opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="space-y-4">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Executive fleet</span>
                        <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight leading-snug group-hover:text-gold-premium transition-colors">Corporate Taxi Service</h3>
                        <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-medium">
                          Yatree Destination provides professional corporate taxi services for companies, business meetings, conferences and executive travel. GST billing available.
                        </p>
                      </div>
                      <div className="border-t border-slate-100 pt-5 space-y-3">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Services Include:</span>
                        <div className="flex flex-wrap gap-2">
                          {["Employee Transit", "Executive Transfers", "Corporate Events", "GST Invoices"].map((tag, i) => (
                            <span key={i} className="text-[9px] font-bold uppercase tracking-wider bg-slate-50 border border-slate-200/60 px-2.5 py-1 rounded text-slate-600">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Card 5: Wedding Transportation */}
                    <div className="group relative bg-white border border-slate-200/80 rounded-3xl p-8 flex flex-col justify-between hover:border-gold-premium/30 hover:shadow-[0_20px_40px_rgba(212,175,55,0.06)] hover:-translate-y-1 transition-all duration-300 space-y-6 md:col-span-2">
                      <div className="absolute top-5 right-5 w-2 h-2 rounded-full bg-gold-premium opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="space-y-4">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Royal transfers</span>
                        <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight leading-snug group-hover:text-gold-premium transition-colors">Wedding Transportation Service</h3>
                        <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-medium">
                          Planning a destination wedding in Udaipur? We provide transportation management for wedding guests, including airport pick-ups, hotel transfers, and luxury fleet movement.
                        </p>
                      </div>
                      <div className="border-t border-slate-100 pt-5 space-y-3">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Vehicles Available:</span>
                        <div className="flex flex-wrap gap-2">
                          {["Luxury Cars", "Tempo Travellers", "Volvo Coaches", "Premium SUVs"].map((tag, i) => (
                            <span key={i} className="text-[9px] font-bold uppercase tracking-wider bg-slate-50 border border-slate-200/60 px-2.5 py-1 rounded text-slate-600">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>
                </section>

                {/* Section 4: Our Fleet */}
                <section className="space-y-12 text-left">
                  <div className="space-y-4 max-w-3xl">
                    <span className="inline-flex items-center gap-1 text-gold-premium font-black uppercase tracking-[0.3em] text-xs">
                      <Car className="w-3.5 h-3.5" /> Our Fleet
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black text-slate-950 uppercase tracking-tight leading-none">
                      Vehicles Available
                    </h2>
                    <div className="w-16 h-1 bg-gold-premium rounded" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    {[
                      { title: "Sedan Cars", desc: "Comfortable option for individuals & couples.", model: "Dzire / Etios" },
                      { title: "SUV Vehicles", desc: "Ideal for families and small group tours.", model: "Ertiga / Carens" },
                      { title: "Toyota Innova Crysta", desc: "Premium travel experience with extra comfort.", model: "Innova Crysta" },
                      { title: "Tempo Traveller", desc: "Perfect for family trips and group tours.", model: "12, 17, 21 Seater" },
                      { title: "Luxury Coaches", desc: "Suitable for corporate events & weddings.", model: "27, 35, 45 Seater" }
                    ].map((fleet, idx) => (
                      <div key={idx} className="group relative bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm flex flex-col justify-between space-y-5 hover:border-gold-premium/30 hover:shadow-[0_15px_30px_rgba(212,175,55,0.05)] hover:-translate-y-1 transition-all duration-300">
                        <div className="space-y-3">
                          <span className="text-[10px] font-black text-gold-premium uppercase tracking-widest block">{fleet.model}</span>
                          <h4 className="font-extrabold text-slate-900 text-sm uppercase tracking-tight">{fleet.title}</h4>
                          <p className="text-xs text-slate-500 leading-relaxed font-medium">{fleet.desc}</p>
                        </div>
                        <div className="border-t border-slate-100 pt-3">
                          <span className="inline-flex items-center gap-1.5 text-[10px] font-black text-slate-900 uppercase tracking-widest">
                            VIP YATREE PLATE
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Section 5: FAQs */}
                <section className="max-w-4xl mx-auto space-y-12 text-left">
                  <div className="text-center space-y-4">
                    <span className="inline-flex items-center gap-1 text-gold-premium font-black uppercase tracking-[0.3em] text-xs">
                      <Star className="w-3.5 h-3.5 fill-current" /> FAQ
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black text-slate-950 uppercase tracking-tight leading-none">
                      Frequently Asked Questions
                    </h2>
                    <div className="w-16 h-1 bg-gold-premium rounded mx-auto" />
                  </div>

                  <div className="bg-white border border-slate-200/80 rounded-[2.5rem] p-6 md:p-10 space-y-4 shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
                    {[
                      { q: "How can I book a taxi in Udaipur?", a: "You can book a taxi by calling us directly at +91 7627013579 or by submitting the instant booking inquiry form on this page, which will pre-fill your trip details to send to our coordinator via WhatsApp." },
                      { q: "Do you provide airport pickup and drop services?", a: "Yes, we provide 24/7 dedicated airport transfers to and from Maharana Pratap Airport in Udaipur. Our drivers monitor flight schedules to ensure prompt pick-ups." },
                      { q: "Can I hire a taxi for local sightseeing?", a: "Absolutely! We offer flexible sightseeing taxi packages for Udaipur, including standard half-day (4 Hours) and full-day (8 Hours & 12 Hours) tours." },
                      { q: "Do you provide Tempo Travellers?", a: "Yes, we maintain a fleet of premium Force Tempo Travellers in 12-seater, 17-seater, and 21-seater configurations, ideal for family trips and group travels." },
                      { q: "Are your drivers verified?", a: "Yes. All our drivers are professionally trained, highly experienced with the local Rajasthan routes, polite, and fully verified for your security and safety." }
                    ].map((faq, i) => (
                      <div key={i} className={`border rounded-2xl px-5 py-4 transition-all duration-300 ${openFaqIndex === i ? 'border-gold-premium/30 bg-gradient-to-br from-gold-premium/[0.03] to-transparent shadow-[0_10px_20px_rgba(212,175,55,0.01)]' : 'border-slate-200/80 hover:border-slate-300 bg-white'}`}>
                        <button 
                          type="button"
                          onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                          className="w-full flex items-center justify-between text-left py-2 focus:outline-none cursor-pointer"
                        >
                          <span className={`font-extrabold text-sm md:text-base transition-colors duration-200 uppercase tracking-tight ${openFaqIndex === i ? 'text-gold-premium' : 'text-slate-900'}`}>{faq.q}</span>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${openFaqIndex === i ? 'bg-gold-premium text-midnight rotate-180' : 'bg-slate-100 text-slate-500'}`}>
                            {openFaqIndex === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                          </div>
                        </button>
                        
                        <AnimatePresence initial={false}>
                          {openFaqIndex === i && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-semibold pt-2 pb-3 max-w-3xl">
                                {faq.a}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </section>

            {/* Section 6: Final Conversion Section */}
            <section className="relative bg-slate-950 text-white rounded-[3rem] p-8 md:p-16 text-center overflow-hidden shadow-2xl border border-white/5 grain-overlay">
              <div className="absolute -top-20 -left-20 w-80 h-80 bg-gold-premium/10 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-gold-premium/10 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gold-premium/5 rounded-full blur-[120px] pointer-events-none" />
              
              <div className="max-w-3xl mx-auto space-y-6 relative z-10">
                <span className="text-gold-premium font-black uppercase tracking-[0.3em] text-[10px] block">
                  Get in Touch Instantly
                </span>
                
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none">
                  Need a Taxi Service in Udaipur?
                </h2>
                
                <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-medium max-w-2xl mx-auto">
                  Whether you are visiting Udaipur for a holiday, business trip, wedding or family vacation, Yatree Destination offers dependable taxi services with professional drivers and comfortable vehicles.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                  <a href="tel:+917627013579" className="w-full sm:w-auto bg-gold-premium hover:bg-gold-premium/90 text-midnight font-black uppercase tracking-widest text-xs px-8 py-4.5 rounded-full transition-all duration-300 flex items-center justify-center gap-2 font-bold text-midnight">
                    <Phone className="w-4 h-4" /> Call Now: +91 76270 13579
                  </a>
                  <a href="https://wa.me/917627013579" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto bg-[#25D366] hover:bg-[#22c35e] text-white font-black uppercase tracking-widest text-xs px-8 py-4.5 rounded-full transition-all duration-300 flex items-center justify-center gap-2 font-bold font-bold">
                    <MessageCircle className="w-4 h-4 fill-current" /> WhatsApp Booking
                  </a>
                </div>

                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest pt-4">
                  Book your taxi in Udaipur today and travel with confidence.
                </p>
              </div>
            </section>
              </>
            ) : (
              <>
                {/* RENDER TEMPO TRAVELLER SEO SECTIONS */}
                {/* Section 1: Book the Best Tempo Traveller in Udaipur */}
                <section className="relative overflow-hidden bg-gradient-to-br from-white via-white to-slate-50/50 border border-slate-200/60 rounded-[3rem] p-8 md:p-14 shadow-[0_20px_60px_rgba(0,0,0,0.02)] hover:shadow-[0_30px_70px_rgba(212,175,55,0.06)] transition-all duration-500 text-left">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-gold-premium/5 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-slate-100 rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="relative z-10 max-w-5xl space-y-6">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-premium/10 border border-gold-premium/20 text-gold-premium text-[10px] font-black uppercase tracking-widest">
                      <Sparkles className="w-3.5 h-3.5 text-gold-premium animate-spin-slow" />
                      Trusted Service
                    </span>
                    
                    <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-gold-premium to-slate-950 uppercase tracking-tighter leading-none">
                      Best Tempo Traveller Service in Udaipur
                    </h2>
                    
                    <h3 className="text-lg md:text-xl font-bold text-slate-700 leading-relaxed max-w-3xl border-l-2 border-gold-premium pl-4">
                      Need a reliable Udaipur Tempo Traveller rental?
                    </h3>
                    
                    <p className="text-sm md:text-base text-slate-600 leading-relaxed font-medium max-w-4xl">
                      Yatree Destination is one of the trusted providers of Tempo Traveller service in Udaipur for tourists, corporate groups, wedding guests and family vacations. We provide flexible rental options for half-day bookings, full-day bookings, airport transfers, multi-day Rajasthan tours, and outstation travel. Our rental services are available 24×7 and can be customized according to your itinerary.
                    </p>

                    {/* Bullets Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-6">
                      {[
                        "Udaipur Sightseeing Tours",
                        "Airport Transfers",
                        "Destination Weddings",
                        "Corporate Events",
                        "Religious Tours",
                        "Rajasthan Group Tours",
                        "Outstation Trips",
                        "Elite Travel Comfort"
                      ].map((service, idx) => (
                        <div key={idx} className="group flex items-center gap-3 bg-white border border-slate-150 p-4 rounded-2xl hover:border-gold-premium/30 hover:shadow-sm transition-all duration-300">
                          <div className="w-7 h-7 rounded-full bg-gold-premium/10 border border-gold-premium/20 flex items-center justify-center text-gold-premium shrink-0 group-hover:bg-gold-premium group-hover:text-white transition-all duration-300">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                          <span className="text-xs font-bold text-slate-800 uppercase tracking-tight">{service}</span>
                        </div>
                      ))}
                    </div>

                    {/* Note Banner */}
                    <div className="bg-amber-500/5 border border-amber-500/20 p-4 rounded-2xl text-xs md:text-sm font-semibold text-amber-800">
                      ℹ️ Every booking includes a professional driver and clean, comfortable seating for a hassle-free travel experience.
                    </div>

                    {/* Call Now Banner */}
                    <div className="relative overflow-hidden bg-slate-950 text-white p-6 md:p-8 rounded-3xl mt-10 border border-white/5 flex flex-col md:flex-row items-center gap-6 shadow-xl">
                      <div className="absolute top-0 right-0 w-40 h-40 bg-gold-premium/10 rounded-full blur-2xl pointer-events-none" />
                      
                      <div className="flex items-center gap-4 text-left mr-auto relative z-10">
                        <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-gold-premium shrink-0 border border-white/5">
                          <Phone className="w-6 h-6 animate-pulse" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Speak to our Coordinator</span>
                          <a href="tel:+917627013579" className="text-xl md:text-2xl font-black text-white hover:text-gold-premium transition-colors tracking-tight">+91 76270 13579</a>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto relative z-10">
                        <a href="tel:+917627013579" className="w-full sm:w-auto text-center bg-gold-premium hover:bg-gold-premium/90 text-midnight font-black uppercase tracking-widest text-xs px-8 py-4 rounded-xl transition-all duration-300 shadow-md">
                          Call Now
                        </a>
                        <a href="https://wa.me/917627013579" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto text-center bg-[#25D366] hover:bg-[#22c35e] text-white font-black uppercase tracking-widest text-xs px-8 py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md">
                          <MessageCircle className="w-4 h-4 fill-current" /> WhatsApp
                        </a>
                      </div>
                    </div>

                  </div>
                </section>

                {/* Section 2: Seating Capacities & Options */}
                <section className="space-y-12 text-left">
                  <div className="text-center md:text-left space-y-4 max-w-3xl">
                    <span className="inline-flex items-center gap-1 text-gold-premium font-black uppercase tracking-[0.3em] text-xs">
                      <Car className="w-3.5 h-3.5" /> Fleet Capacity
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black text-slate-950 uppercase tracking-tight leading-none">
                      Tempo Traveller Rental in Udaipur
                    </h2>
                    <p className="text-slate-500 font-bold uppercase tracking-wider text-xs md:text-sm">
                      Select Seating Options & Configurations
                    </p>
                    <div className="w-16 h-1 bg-gold-premium rounded" />
                  </div>

                  {/* Grid of Capacities */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { 
                        title: "12 Seater Tempo", 
                        desc: "Our 12 Seater Tempo Traveller in Udaipur is one of the most popular choices for families and small groups. Perfect for sightseeing, airport runs and weekend trips.", 
                        features: ["Pushback seats", "Air conditioning", "Music system", "Ample luggage space", "Professional chauffeur"] 
                      },
                      { 
                        title: "17 Seater Tempo", 
                        desc: "For medium-sized groups, our 17 Seater Tempo Traveller offers the ideal balance of comfort and capacity.", 
                        features: ["Corporate teams", "Wedding groups", "School tours", "Family vacations"] 
                      },
                      { 
                        title: "20 Seater Tempo", 
                        desc: "Planning travel for a larger group? Our 20 Seater Tempo Traveller in Udaipur is designed to accommodate bigger groups while maintaining comfort.", 
                        features: ["Destination weddings", "Corporate events", "Pilgrimage tours", "Group sightseeing"] 
                      },
                      { 
                        title: "Luxury Tempo Traveller", 
                        desc: "Experience premium group travel with our Luxury Tempo Traveller in Udaipur, ideal for VIP guests, weddings, and high-end tourism.", 
                        features: ["Recliner seats", "Premium interiors", "LED lighting", "Individual charging points", "Extra legroom", "Enhanced comfort"] 
                      }
                    ].map((item, idx) => (
                      <div key={idx} className="group relative bg-white border border-slate-200/80 p-7 rounded-2xl shadow-sm hover:border-gold-premium/30 hover:shadow-[0_20px_40px_rgba(212,175,55,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-[3px] bg-gold-premium scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        
                        <div className="space-y-4">
                          <div className="w-12 h-12 rounded-xl bg-gold-premium/5 border border-gold-premium/10 flex items-center justify-center text-gold-premium group-hover:bg-gold-premium group-hover:text-midnight transition-all duration-300 font-black text-xs">
                            {idx === 3 ? "VIP" : `${item.title.split(' ')[0]}S`}
                          </div>
                          <h4 className="font-extrabold text-slate-900 text-sm uppercase tracking-tight">{item.title}</h4>
                          <p className="text-xs text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                        </div>

                        <div className="border-t border-slate-100 pt-3 mt-4 space-y-1">
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Highlights:</span>
                          <div className="flex flex-wrap gap-1">
                            {item.features.slice(0, 2).map((feat, i) => (
                              <span key={i} className="text-[9px] font-semibold text-slate-600 bg-slate-50 px-2 py-0.5 rounded">{feat}</span>
                            ))}
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                </section>

                {/* Section 3: Services details */}
                <section className="space-y-12 text-left">
                  <div className="space-y-4 max-w-3xl">
                    <span className="inline-flex items-center gap-1 text-gold-premium font-black uppercase tracking-[0.3em] text-xs">
                      <Sparkles className="w-3.5 h-3.5" /> Group Services
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black text-slate-950 uppercase tracking-tight leading-none">
                      Tempo Traveller Rental Services
                    </h2>
                    <div className="w-16 h-1 bg-gold-premium rounded" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    
                    {/* Card 1: Sightseeing */}
                    <div className="group relative bg-white border border-slate-200/80 rounded-3xl p-8 flex flex-col justify-between hover:border-gold-premium/30 hover:shadow-[0_20px_40px_rgba(212,175,55,0.06)] hover:-translate-y-1 transition-all duration-300 space-y-6">
                      <div className="absolute top-5 right-5 w-2 h-2 rounded-full bg-gold-premium opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="space-y-4">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Local Sightseeing</span>
                        <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight leading-snug group-hover:text-gold-premium transition-colors">Udaipur Sightseeing Rent</h3>
                        <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-medium">
                          Explore the beautiful City of Lakes comfortably with our Tempo Traveller on rent in Udaipur. Choose flexible group sightseeing packages.
                        </p>
                      </div>
                      <div className="border-t border-slate-100 pt-5 space-y-3">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Popular Attractions:</span>
                        <div className="flex flex-wrap gap-2">
                          {["City Palace", "Lake Pichola", "Fateh Sagar", "Monsoon Palace", "Jag Mandir", "Saheliyon Bari"].map((tag, i) => (
                            <span key={i} className="text-[9px] font-bold uppercase tracking-wider bg-slate-50 border border-slate-200/60 px-2.5 py-1 rounded text-slate-600">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Card 2: Outstation */}
                    <div className="group relative bg-white border border-slate-200/80 rounded-3xl p-8 flex flex-col justify-between hover:border-gold-premium/30 hover:shadow-[0_20px_40px_rgba(212,175,55,0.06)] hover:-translate-y-1 transition-all duration-300 space-y-6">
                      <div className="absolute top-5 right-5 w-2 h-2 rounded-full bg-gold-premium opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="space-y-4">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Outstation Cabs</span>
                        <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight leading-snug group-hover:text-gold-premium transition-colors">Outstation Traveller Booking</h3>
                        <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-medium">
                          Book a Tempo Traveller from Udaipur for popular Rajasthan outstation destinations. Available for comfortable one-way and round-trip bookings.
                        </p>
                      </div>
                      <div className="border-t border-slate-100 pt-5 space-y-3">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Popular Routes:</span>
                        <div className="flex flex-wrap gap-2">
                          {["Kumbhalgarh", "Ranakpur", "Mount Abu", "Chittorgarh", "Jodhpur", "Jaipur", "Ahmedabad"].map((tag, i) => (
                            <span key={i} className="text-[9px] font-bold uppercase tracking-wider bg-slate-50 border border-slate-200/60 px-2.5 py-1 rounded text-slate-600">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Card 3: Pricing Parameters */}
                    <div className="group relative bg-white border border-slate-200/80 rounded-3xl p-8 flex flex-col justify-between hover:border-gold-premium/30 hover:shadow-[0_20px_40px_rgba(212,175,55,0.06)] hover:-translate-y-1 transition-all duration-300 space-y-6 md:col-span-2 lg:col-span-1">
                      <div className="absolute top-5 right-5 w-2 h-2 rounded-full bg-gold-premium opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="space-y-4">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Transparent Costs</span>
                        <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight leading-snug group-hover:text-gold-premium transition-colors">Tempo Traveller Price List</h3>
                        <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-medium">
                          Tempo Traveller price in Udaipur depends on vehicle type, seating capacity, travel duration, route, and season. Contact us for a customized package.
                        </p>
                      </div>
                      <div className="border-t border-slate-100 pt-5 space-y-3">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Price Factors:</span>
                        <div className="flex flex-wrap gap-2">
                          {["Vehicle Type", "Seating Capacity", "Trip Duration", "Season Demand"].map((tag, i) => (
                            <span key={i} className="text-[9px] font-bold uppercase tracking-wider bg-slate-50 border border-slate-200/60 px-2.5 py-1 rounded text-slate-600">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>
                </section>

                {/* Section 4: FAQs */}
                <section className="max-w-4xl mx-auto space-y-12 text-left">
                  <div className="text-center space-y-4">
                    <span className="inline-flex items-center gap-1 text-gold-premium font-black uppercase tracking-[0.3em] text-xs">
                      <Star className="w-3.5 h-3.5 fill-current" /> FAQ
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black text-slate-950 uppercase tracking-tight leading-none">
                      Frequently Asked Questions
                    </h2>
                    <div className="w-16 h-1 bg-gold-premium rounded mx-auto" />
                  </div>

                  <div className="bg-white border border-slate-200/80 rounded-[2.5rem] p-6 md:p-10 space-y-4 shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
                    {[
                      { q: "How can I book a Tempo Traveller in Udaipur?", a: "You can book a Tempo Traveller by calling us directly at +91 7627013579 or by submitting the instant booking inquiry form on this page to send your parameters directly to our coordinator via WhatsApp." },
                      { q: "Do you provide luxury Tempo Travellers in Udaipur?", a: "Yes. We provide fully equipped luxury Tempo Travellers with premium reclining seats, enhanced legroom, LED lighting, and individual charging points for weddings, corporate events, and VIP travel." },
                      { q: "What is the Tempo Traveller price in Udaipur?", a: "Pricing varies according to seating capacity, travel distance, and trip duration. We recommend contacting our travel experts to get a customized fixed price quotation." },
                      { q: "Do you provide 12 seater Tempo Traveller in Udaipur?", a: "Yes, we offer a wide range of seating options, including 12, 17, 20, and 21-seater Tempo Travellers." },
                      { q: "Can I hire a Tempo Traveller for outstation travel?", a: "Yes. We offer outstation Tempo Traveller bookings from Udaipur to destinations across Rajasthan (Jaipur, Jodhpur, Mount Abu, Chittorgarh) and nearby states like Gujarat (Ahmedabad)." }
                    ].map((faq, i) => (
                      <div key={i} className={`border rounded-2xl px-5 py-4 transition-all duration-300 ${openFaqIndex === i ? 'border-gold-premium/30 bg-gradient-to-br from-gold-premium/[0.03] to-transparent shadow-[0_10px_20px_rgba(212,175,55,0.01)]' : 'border-slate-200/80 hover:border-slate-300 bg-white'}`}>
                        <button 
                          type="button"
                          onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                          className="w-full flex items-center justify-between text-left py-2 focus:outline-none cursor-pointer"
                        >
                          <span className={`font-extrabold text-sm md:text-base transition-colors duration-200 uppercase tracking-tight ${openFaqIndex === i ? 'text-gold-premium' : 'text-slate-900'}`}>{faq.q}</span>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${openFaqIndex === i ? 'bg-gold-premium text-midnight rotate-180' : 'bg-slate-100 text-slate-500'}`}>
                            {openFaqIndex === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                          </div>
                        </button>
                        
                        <AnimatePresence initial={false}>
                          {openFaqIndex === i && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-semibold pt-2 pb-3 max-w-3xl">
                                {faq.a}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </section>

            {/* Section 5: Final Conversion Section */}
            <section className="relative bg-slate-950 text-white rounded-[3rem] p-8 md:p-16 text-center overflow-hidden shadow-2xl border border-white/5 grain-overlay">
              <div className="absolute -top-20 -left-20 w-80 h-80 bg-gold-premium/10 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-gold-premium/10 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gold-premium/5 rounded-full blur-[120px] pointer-events-none" />
              
              <div className="max-w-3xl mx-auto space-y-6 relative z-10">
                <span className="text-gold-premium font-black uppercase tracking-[0.3em] text-[10px] block">
                  Get in Touch Instantly
                </span>
                
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none">
                  Book Tempo Traveller in Udaipur Today
                </h2>
                
                <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-medium max-w-2xl mx-auto">
                  Whether you need a 12 Seater Tempo Traveller in Udaipur, a luxury Tempo Traveller for a wedding, or a Tempo Traveller on rent in Udaipur for sightseeing, Yatree Destination provides safe, comfortable and affordable group transportation.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                  <a href="tel:+917627013579" className="w-full sm:w-auto bg-gold-premium hover:bg-gold-premium/90 text-midnight font-black uppercase tracking-widest text-xs px-8 py-4.5 rounded-full transition-all duration-300 flex items-center justify-center gap-2 font-bold text-midnight font-bold">
                    <Phone className="w-4 h-4" /> Call Now: +91 76270 13579
                  </a>
                  <a href="https://wa.me/917627013579" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto bg-[#25D366] hover:bg-[#22c35e] text-white font-black uppercase tracking-widest text-xs px-8 py-4.5 rounded-full transition-all duration-300 flex items-center justify-center gap-2 font-bold font-bold">
                    <MessageCircle className="w-4 h-4 fill-current" /> WhatsApp Booking
                  </a>
                </div>

                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest pt-4">
                  Book your traveller in Udaipur today and travel with confidence.
                </p>
              </div>
            </section>
              </>
            )}

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
      <div className="hidden md:block bg-slate-950 py-24 px-6 text-center relative overflow-hidden">
        {/* Glow */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-[300px] bg-gold-premium/15 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-full max-w-[300px] h-[300px] bg-gold-premium/10 rounded-full blur-[80px]" />
        </div>
        
        <span className="text-gold-premium font-black uppercase tracking-[0.3em] text-[10px] mb-4 block flex items-center justify-center gap-2">
          <Sparkle className="w-4 h-4 text-gold-premium animate-pulse" />
          Explore Udaipur US
        </span>
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-4 leading-none">Best Taxi Service in udaipur</h1>
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
         <a href="https://wa.me/917627013579" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(37,211,102,0.4)] hover:scale-110 transition-all duration-300">
            <MessageCircle className="w-6 h-6 fill-current" />
         </a>
      </div>
      <div className="fixed bottom-0 left-0 w-full z-[100] md:hidden flex border-t border-slate-200 bg-white">
        <a href="tel:+917627013579" className="flex-1 bg-slate-950 text-white flex items-center justify-center gap-2 py-4.5 font-bold text-xs uppercase tracking-wider"><Phone className="w-4 h-4 text-gold-premium" /> Call Concierge</a>
        <a href="https://wa.me/917627013579" className="flex-1 bg-[#25D366] text-white flex items-center justify-center gap-2 py-4.5 font-bold text-xs uppercase tracking-wider"><MessageCircle className="w-4 h-4" /> WhatsApp</a>
      </div>
    </main>
  );
}

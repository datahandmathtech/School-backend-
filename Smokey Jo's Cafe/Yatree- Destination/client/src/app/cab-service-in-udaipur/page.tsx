"use client";

import SEOLandingTemplate from "@/components/templates/SEOLandingTemplate";
import { CheckCircle2, Star, Navigation, MapPin, ShieldCheck } from "lucide-react";

export default function CabServiceInUdaipur() {
  return (
    <SEOLandingTemplate 
      city="Udaipur"
      serviceName="Cab Service"
      title="Professional Cab Service in Udaipur | 24/7 Local Taxi"
      heroImage="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80"
      introduction="Looking for a reliable cab service in Udaipur? Yatree Destination provides professional, well-maintained, and punctual cabs for local sightseeing, business travel, and outstation trips. Book your ride with the most trusted cab operator in the City of Lakes."
      whyChooseContent="A good cab service should be prompt, clean, and reasonably priced. We pride ourselves on our '5-minute early' arrival policy and our fleet of sanitized vehicles. Our drivers are local residents who know every corner of Udaipur, ensuring you reach your destination through the fastest and safest routes."
      popularRoutes={[
        { from: "Udaipur City", to: "Monsoon Palace", price: "900" },
        { from: "Udaipur City", to: "Fateh Sagar", price: "400" },
        { from: "Udaipur City", to: "Saheliyon-ki-Bari", price: "450" },
        { from: "Udaipur City", to: "City Palace", price: "350" }
      ]}
      faqs={[
        { q: "Can I book a cab for a half-day Udaipur tour?", a: "Yes, we offer flexible half-day (4 hours / 40km) and full-day (8 hours / 80km) cab packages specifically designed for local Udaipur sightseeing." },
        { q: "Do you provide AC cabs in Udaipur?", a: "Yes, our entire fleet consists of well-maintained, air-conditioned vehicles including sedans, SUVs, and luxury vans to ensure a comfortable ride in the Rajasthan heat." },
        { q: "Are your cab rates fixed or per kilometer?", a: "For local city travel, we offer both fixed-price packages and per-kilometer rates. We provide a detailed quote upfront to ensure 100% transparency." }
      ]}
      mainContent={
        <div className="space-y-10">
          <section>
            <h2 className="text-4xl font-bold text-navy-900 mb-6">Your Trusted Partner for Every Mile in Udaipur</h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              Navigating the romantic streets of Udaipur should be as beautiful as the city itself. At Yatree Destination, we provide the most reliable **Cab Service in Udaipur**, catering to thousands of domestic and international travelers every month. Whether you need a quick ride to a dinner reservation at a lakefront restaurant or a full-day cab for exploring the royal heritage monuments, our professional drivers and clean vehicles are always at your service.
            </p>
            <p className="text-slate-600 leading-relaxed text-lg mt-4">
              We understand that modern travelers value punctuality and hygiene above all. That's why our dispatch system ensures that your cab arrives 5-10 minutes before the scheduled time, and every vehicle undergoes a thorough sanitization process after every single trip. With Yatree Destination, you don't just book a cab; you book peace of mind.
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100 flex flex-col items-center text-center">
                <Navigation className="w-12 h-12 text-gold-600 mb-6" />
                <h4 className="text-2xl font-bold text-navy-900 mb-2">Local Expertise</h4>
                <p className="text-sm text-slate-500">Drivers who know every shortcut, market, and hidden gem in the narrow lanes of Udaipur.</p>
             </div>
             <div className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100 flex flex-col items-center text-center">
                <ShieldCheck className="w-12 h-12 text-gold-600 mb-6" />
                <h4 className="text-2xl font-bold text-navy-900 mb-2">Safety Guaranteed</h4>
                <p className="text-sm text-slate-500">Every trip is GPS tracked, and our drivers are background-verified for your security.</p>
             </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-navy-900 mb-6">Affordable Cab Hire for Local Sightseeing and Shopping</h2>
            <p className="text-slate-600 leading-relaxed">
              Udaipur is famous for its vibrant bazaars and cultural landmarks like **Jagdish Temple**, **Bagore Ki Haveli**, and the **Vintage Car Museum**. Our **Udaipur Cab Rental** service provides flexible sightseeing packages that allow you to explore the city at your own pace. Forget about the hassle of parking or navigating busy traffic; our experienced chauffeurs handle everything while you enjoy the royal views.
            </p>
            <p className="text-slate-600 leading-relaxed mt-4">
              We also provide specialized 'Evening Lake Packages' where we take you to the best sunset points like **Sajjangarh (Monsoon Palace)** followed by a drop at the colorful markets for some traditional shopping.
            </p>
          </section>

          <section className="bg-navy-900 text-white p-12 rounded-[3.5rem] relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
             <h3 className="text-3xl font-bold mb-8">Why Our Cabs Stand Out?</h3>
             <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <li className="flex gap-4">
                   <CheckCircle2 className="w-6 h-6 text-gold-500 shrink-0" />
                   <span className="text-slate-300">Professionally Dressed and Behaved Drivers</span>
                </li>
                <li className="flex gap-4">
                   <CheckCircle2 className="w-6 h-6 text-gold-500 shrink-0" />
                   <span className="text-slate-300">Clean, Well-Maintained AC Vehicles</span>
                </li>
                <li className="flex gap-4">
                   <CheckCircle2 className="w-6 h-6 text-gold-500 shrink-0" />
                   <span className="text-slate-300">Transparent Billing with No Hidden Charges</span>
                </li>
                <li className="flex gap-4">
                   <CheckCircle2 className="w-6 h-6 text-gold-500 shrink-0" />
                   <span className="text-slate-300">24/7 Support and Immediate Dispatch</span>
                </li>
             </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-navy-900 mb-6">Reliable Cab Service for Corporate and Event Travel</h2>
            <p className="text-slate-600 leading-relaxed">
              For corporate travelers, we offer professional and reliable cab solutions. From monthly car rental contracts to airport transfers for executives, we provide a fleet of premium sedans and SUVs. Our chauffeurs maintain high standards of professional etiquette, ensuring your business trips are productive and comfortable.
            </p>
            <p className="text-slate-600 leading-relaxed mt-4">
              We also specialize in event transportation for conferences, corporate off-sites, and group meetings in Udaipur. Our dedicated event coordinators manage the fleet, ensuring all your guests and executives are transported on time, every time.
            </p>
          </section>

          <section className="bg-gold-50 p-10 rounded-[3rem] border border-gold-100 flex flex-col md:flex-row items-center gap-8">
             <div className="flex-1 text-center md:text-left">
                <h4 className="text-2xl font-bold text-navy-900 mb-2">Instant Cab Booking Udaipur</h4>
                <p className="text-slate-600">Need a cab right now? Call us or book via WhatsApp for immediate confirmation.</p>
             </div>
             <button className="btn-gold h-14 px-10 rounded-full text-xs font-bold uppercase tracking-widest">
                Book Cab Now
             </button>
          </section>
        </div>
      }
    />
  );
}

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CITIES, SERVICES } from "@/lib/constants";
import { constructMetadata } from "@/lib/seo";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import PremiumBookingForm from "@/components/sections/PremiumBookingForm";
import { ShieldCheck, Star, Clock, MapPin, Phone, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const params: { slug: string }[] = [];
  
  SERVICES.forEach((service) => {
    CITIES.forEach((city) => {
      const slug = `${service.id}-in-${city.toLowerCase().replace(/ /g, "-")}`;
      params.push({ slug });
    });
  });
  
  const outstationDestinations = [
    "mount-abu",
    "kumbhalgarh",
    "ranakpur",
    "nathdwara",
    "chittorgarh",
    "haldighati"
  ];
  
  outstationDestinations.forEach(dest => {
    params.push({ slug: `udaipur-to-${dest}-taxi` });
  });
  
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const decoded = decodeSlug(slug);
  
  if (!decoded) return constructMetadata({ title: "Page Not Found" });
  
  const { service, city, type } = decoded;
  
  if (type === "outstation") {
    return constructMetadata({
      title: `Taxi from Udaipur to ${city} | Best Outstation Cabs | Yatree Destination`,
      description: `Book a premium taxi from Udaipur to ${city}. Enjoy luxury Innova Crysta, Tempo Traveller, or Sedans for your outstation journey with Yatree Destination.`,
    });
  }
  
  return constructMetadata({
    title: `${service.name} in ${city} | Yatree Destination`,
    description: `Premium ${service.name} in ${city}. Book luxury Innova Crysta, Tempo Traveller, or Sedans for ${city} sightseeing, airport transfers, and outstation trips.`,
  });
}

function decodeSlug(slug: string) {
  // Pattern 1: service-id-in-city-name
  if (slug.includes("-in-")) {
    const parts = slug.split("-in-");
    if (parts.length === 2) {
      const serviceId = parts[0];
      const cityName = parts[1].replace(/-/g, " ");
      
      const service = SERVICES.find((s) => s.id === serviceId);
      const city = CITIES.find((c) => c.toLowerCase() === cityName.toLowerCase());
      
      if (service && city) return { service, city, type: "local" };
    }
  }
  
  // Pattern 2: udaipur-to-destination-taxi
  if (slug.startsWith("udaipur-to-") && slug.endsWith("-taxi")) {
    const destination = slug.replace("udaipur-to-", "").replace("-taxi", "").replace(/-/g, " ");
    const formattedDestination = destination.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    
    return {
      service: { id: "outstation-taxi", name: "Outstation Cab", icon: "Car" },
      city: formattedDestination,
      type: "outstation"
    };
  }

  return null;
}

export default async function ProgrammaticPage({ params }: PageProps) {
  const { slug } = await params;
  const decoded = decodeSlug(slug);
  
  if (!decoded) notFound();
  
  const { service, city, type } = decoded;

  return (
    <main className="min-h-screen bg-navy-950">
      <Navbar />
      
      {/* Dynamic Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-midnight">
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/60 via-midnight/40 to-midnight z-10" />
        <div className="absolute inset-0 bg-[url('/premium_udaipur_taxi_hero_1778818369975.png')] bg-cover bg-center" />
        
        <div className="container mx-auto px-4 relative z-20 text-center mt-10">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-[1.1]">
            {type === "outstation" ? (
              <>Premium <span className="text-gold-premium">Taxi</span> <br /> from Udaipur to {city}</>
            ) : (
              <>Premium <span className="text-gold-premium">{service.name}</span> <br /> in {city}</>
            )}
          </h1>
          <p className="text-lg md:text-xl text-slate-200/90 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            {type === "outstation"
              ? `Enjoy a comfortable and luxurious outstation journey from Udaipur to ${city} with our professional drivers and top-rated fleet.`
              : `Luxury travel experiences, professional drivers, and top-rated ${service.name} tailored for your journey in and around ${city}.`
            }
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="#book" className="group flex items-center justify-center relative h-14 px-8 rounded-full overflow-hidden bg-gold-premium text-midnight font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
              <span className="relative z-10 flex items-center gap-2">
                Book Your Ride <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
            <a href="tel:+917627013579" className="h-14 px-8 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white font-bold flex items-center gap-2 transition-all hover:bg-white/10 hover:border-white/40 active:scale-95">
              <Phone className="w-4 h-4 text-gold-premium" />
              Call Now
            </a>
          </div>
        </div>
      </section>

      {/* Booking Form Integration */}
      <div id="book" className="container mx-auto px-4 relative z-30 -mt-24 mb-24">
        <div className="max-w-6xl mx-auto">
          <PremiumBookingForm />
        </div>
      </div>

      {/* SEO Content Section */}
      <section className="py-24 bg-white dark:bg-navy-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-heading font-bold mb-8 text-navy-900 dark:text-white">
              {type === "outstation" 
                ? `Why Choose Our Taxi from Udaipur to ${city}?` 
                : `Why Choose Our ${service.name} in ${city}?`
              }
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  When it comes to **{type === "outstation" ? `traveling from Udaipur to ${city}` : `${service.name} in ${city}`}**, Yatree Destination stands out as the premier choice. 
                  We understand that your travel needs are unique, whether you're a tourist exploring 
                  the City of Lakes or a corporate traveler on a tight schedule.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  Our fleet of well-maintained vehicles, including the luxury **Innova Crysta** and 
                  spacious **Tempo Travellers**, ensures that you travel in comfort and style {type === "outstation" ? `to ${city}` : `throughout ${city}`}.
                </p>
              </div>
              <div className="bg-navy-50 dark:bg-navy-900/50 p-8 rounded-3xl border border-gold-600/20">
                <h3 className="text-xl font-bold mb-4 text-gold-600">Service Highlights:</h3>
                <ul className="space-y-4">
                  {[
                    type === "outstation" ? `24/7 Availability for ${city} route` : `24/7 Availability in all areas of ${city}`,
                    "Verified & Professional English-speaking drivers",
                    "No hidden charges - Transparent pricing",
                    "Luxury fleet with high-end safety features",
                    type === "outstation" ? `Customizable outstation packages for ${city}` : `Customizable tour packages for ${city}`
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-navy-900 dark:text-white/80">
                      <ShieldCheck className="w-5 h-5 text-gold-600 shrink-0 mt-1" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 border-y border-white/5 bg-navy-950">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Happy Clients", value: "10,000+" },
              { label: "Luxury Cars", value: "50+" },
              { label: "Expert Drivers", value: "100+" },
              { label: "Years Experience", value: "6+" }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <h4 className="text-4xl font-bold text-gold-500 mb-2">{stat.value}</h4>
                <p className="text-white/60 uppercase tracking-widest text-xs font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      <Footer />
    </main>
  );
}

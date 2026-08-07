import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CITIES, SERVICES } from "@/lib/constants";
import { constructMetadata } from "@/lib/seo";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import BookingForm from "@/components/sections/BookingForm";
import { ShieldCheck, Star, Clock, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const decoded = decodeSlug(slug);
  
  if (!decoded) return constructMetadata({ title: "Page Not Found" });
  
  const { service, city } = decoded;
  
  return constructMetadata({
    title: `${service.name} in ${city} | GoGetGo Taxi`,
    description: `Premium ${service.name} in ${city}. Book luxury Innova Crysta, Tempo Traveller, or Sedans for ${city} sightseeing, airport transfers, and outstation trips.`,
  });
}

function decodeSlug(slug: string) {
  // Pattern: service-id-in-city-name
  const parts = slug.split("-in-");
  if (parts.length !== 2) return null;
  
  const serviceId = parts[0];
  const cityName = parts[1].replace(/-/g, " ");
  
  const service = SERVICES.find((s) => s.id === serviceId);
  const city = CITIES.find((c) => c.toLowerCase() === cityName.toLowerCase());
  
  if (!service || !city) return null;
  
  return { service, city };
}

export default async function ProgrammaticPage({ params }: PageProps) {
  const { slug } = await params;
  const decoded = decodeSlug(slug);
  
  if (!decoded) notFound();
  
  const { service, city } = decoded;

  return (
    <main className="min-h-screen bg-navy-950">
      <Navbar />
      
      {/* Dynamic Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-navy-950/60 z-10" />
        <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center" />
        
        <div className="container mx-auto px-4 relative z-20 text-center">
          <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6">
            Premium <span className="text-gold-500">{service.name}</span> <br />
            in {city}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
            Luxury travel experiences, professional drivers, and top-rated {service.name} 
            tailored for your journey in and around {city}.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-gold-600 hover:bg-gold-700 text-white h-14 px-8 rounded-full text-lg">
              Book Your Ride
            </Button>
            <a href="tel:+9180000505810" className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-8 rounded-full text-white border border-white/20 hover:bg-white/20 transition-all">
              <Phone className="w-5 h-5 text-gold-500" />
              Call Now
            </a>
          </div>
        </div>
      </section>

      {/* Booking Form Integration */}
      <BookingForm />

      {/* SEO Content Section */}
      <section className="py-24 bg-white dark:bg-navy-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-heading font-bold mb-8 text-navy-900 dark:text-white">
              Why Choose Our {service.name} in {city}?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  When it comes to **{service.name} in {city}**, GoGetGo Taxi stands out as the premier choice. 
                  We understand that your travel needs are unique, whether you're a tourist exploring 
                  the City of Lakes or a corporate traveler on a tight schedule.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  Our fleet of well-maintained vehicles, including the luxury **Innova Crysta** and 
                  spacious **Tempo Travellers**, ensures that you travel in comfort and style throughout {city}.
                </p>
              </div>
              <div className="bg-navy-50 dark:bg-navy-900/50 p-8 rounded-3xl border border-gold-600/20">
                <h3 className="text-xl font-bold mb-4 text-gold-600">Service Highlights:</h3>
                <ul className="space-y-4">
                  {[
                    "24/7 Availability in all areas of " + city,
                    "Verified & Professional English-speaking drivers",
                    "No hidden charges - Transparent pricing",
                    "Luxury fleet with high-end safety features",
                    "Customizable tour packages for " + city
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
              { label: "Years Experience", value: "15+" }
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

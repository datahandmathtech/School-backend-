export interface Vehicle {
  id: string;
  name: string;
  type: "car" | "bus";
  tag: string;
  image: string;
  description: string;
  seats: string;
  luggage: string;
  ac: boolean;
  features: string[];
}

export const VEHICLES: Vehicle[] = [
  {
    id: "maruti-dzire",
    name: "Maruti Suzuki Dzire",
    type: "car",
    tag: "SEDAN",
    image: "/dzire.png",
    description: "Compact, highly economical, and perfect for navigating narrow palace streets. Custom GOGETGO plates.",
    seats: "4 Seater",
    luggage: "2 Bags",
    ac: true,
    features: ["Exceptional Fuel Mileage", "Compact & Agile", "Good Trunk", "VIP GOGETGO Plates"]
  },
  {
    id: "maruti-ciaz",
    name: "Maruti Suzuki Ciaz",
    type: "car",
    tag: "PREMIUM SEDAN",
    image: "/etios.png", 
    description: "Premium sedan offering a smooth and spacious ride for comfortable city and highway travel. Custom GOGETGO plates.",
    seats: "4 Seater",
    luggage: "3 Bags",
    ac: true,
    features: ["Spacious Legroom", "Premium Interiors", "High AC Comfort", "VIP GOGETGO Plates"]
  },
  {
    id: "toyota-etios",
    name: "Toyota Etios",
    type: "car",
    tag: "SEDAN",
    image: "/etios.png",
    description: "Extremely comfortable and reliable sedan offering a smooth ride and deep boot storage for highway journeys. Custom GOGETGO plates.",
    seats: "4 Seater",
    luggage: "3 Bags",
    ac: true,
    features: ["Deep Boot Space", "Premium Suspension", "High AC Comfort", "VIP GOGETGO Plates"]
  },
  {
    id: "toyota-innova",
    name: "Toyota Innova",
    type: "car",
    tag: "SUV",
    image: "/innova.png",
    description: "The classic Indian luxury SUV for family travel. Spacious, reliable, and comfortable. Custom GOGETGO plates.",
    seats: "7 Seater",
    luggage: "4 Bags",
    ac: true,
    features: ["Family SUV", "Spacious Cabin", "Rear AC", "VIP GOGETGO Plates"]
  },
  {
    id: "innova-crysta",
    name: "Toyota Innova Crysta",
    type: "car",
    tag: "PREMIUM SUV",
    image: "/innova.png",
    description: "The gold standard of luxury travel in India. Extremely spacious, unmatched comfort, and a flawless premium ride. Custom GOGETGO plates.",
    seats: "7 Seater",
    luggage: "4 Bags",
    ac: true,
    features: ["Plush Captain Seats", "Dual Zone AC", "Premium Audio System", "VIP GOGETGO Plates"]
  },
  {
    id: "innova-hycross",
    name: "Toyota Innova Hycross",
    type: "car",
    tag: "HYBRID SUV",
    image: "/innova.png",
    description: "Advanced hybrid SUV with unmatched comfort, silence, and panoramic views. Custom GOGETGO plates.",
    seats: "7 Seater",
    luggage: "4 Bags",
    ac: true,
    features: ["Hybrid Engine", "Panoramic Sunroof", "Ultra Premium", "VIP GOGETGO Plates"]
  },
  {
    id: "force-traveller",
    name: "Force Traveller",
    type: "bus",
    tag: "TEMPO",
    image: "/tempo.png",
    description: "Spacious luxury minibus designed specifically for family groups touring Rajasthan. Custom GOGETGO plates.",
    seats: "12 to 17 Seater",
    luggage: "10-15 Bags",
    ac: true,
    features: ["Pushback Seats", "Dual Roof Blowers", "LED Screen", "VIP GOGETGO Plates"]
  },
  {
    id: "volvo-21",
    name: "Volvo Bus (21 Seater)",
    type: "bus",
    tag: "VOLVO AC COACH",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=600&q=80",
    description: "Premium Volvo coach for mid-size groups. Smooth air suspension and reclining seats. Custom GOGETGO plates.",
    seats: "21 Seater",
    luggage: "15 Bags",
    ac: true,
    features: ["Air Suspension", "Reclining Seats", "High Capacity A/C", "VIP GOGETGO Plates"]
  },
  {
    id: "volvo-27",
    name: "Volvo Bus (27 Seater)",
    type: "bus",
    tag: "VOLVO AC COACH",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=600&q=80",
    description: "Luxury Volvo coach for group travel. Unmatched comfort for intercity Rajasthan tours. Custom GOGETGO plates.",
    seats: "27 Seater",
    luggage: "20 Bags",
    ac: true,
    features: ["Air Suspension", "Panoramic Windows", "Underdeck Storage", "VIP GOGETGO Plates"]
  },
  {
    id: "volvo-35",
    name: "Volvo Bus (35 Seater)",
    type: "bus",
    tag: "VOLVO AC COACH",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=600&q=80",
    description: "Spacious Volvo coach offering premium amenities for large wedding groups and corporate events. Custom GOGETGO plates.",
    seats: "35 Seater",
    luggage: "25 Bags",
    ac: true,
    features: ["Air Suspension", "Reclining Seats", "Premium Audio", "VIP GOGETGO Plates"]
  },
  {
    id: "volvo-45",
    name: "Volvo Bus (45 Seater)",
    type: "bus",
    tag: "VOLVO GRAND COACH",
    image: "https://images.unsplash.com/photo-1557223562-6c77ef16210f?auto=format&fit=crop&w=600&q=80",
    description: "Grand Volvo passenger cruiser. Ideal for massive destination weddings and heavy corporate tours. Custom GOGETGO plates.",
    seats: "45 Seater",
    luggage: "35 Bags",
    ac: true,
    features: ["Heavy Air Suspension", "PA Mic System", "Deep Cargo Bay", "VIP GOGETGO Plates"]
  }
];

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
    image: "/Dzire (2).png",
    description: "Compact, highly economical, and perfect for navigating narrow palace streets. Custom YATREE plates.",
    seats: "4 Seater",
    luggage: "2 Bags",
    ac: true,
    features: ["Exceptional Fuel Mileage", "Compact & Agile", "Good Trunk", "VIP YATREE Plates"]
  },
  {
    id: "maruti-ciaz",
    name: "Maruti Suzuki Ciaz",
    type: "car",
    tag: "PREMIUM SEDAN",
    image: "/Ciaz.png", 
    description: "Premium sedan offering a smooth and spacious ride for comfortable city and highway travel. Custom YATREE plates.",
    seats: "4 Seater",
    luggage: "3 Bags",
    ac: true,
    features: ["Spacious Legroom", "Premium Interiors", "High AC Comfort", "VIP YATREE Plates"]
  },
  {
    id: "toyota-etios",
    name: "Toyota Etios",
    type: "car",
    tag: "SEDAN",
    image: "/Etios (2).png",
    description: "Extremely comfortable and reliable sedan offering a smooth ride and deep boot storage for highway journeys. Custom YATREE plates.",
    seats: "4 Seater",
    luggage: "3 Bags",
    ac: true,
    features: ["Deep Boot Space", "Premium Suspension", "High AC Comfort", "VIP YATREE Plates"]
  },
  {
    id: "toyota-innova",
    name: "Toyota Innova",
    type: "car",
    tag: "SUV",
    image: "/Innova (2).png",
    description: "The classic Indian luxury SUV for family travel. Spacious, reliable, and comfortable. Custom YATREE plates.",
    seats: "7 Seater",
    luggage: "4 Bags",
    ac: true,
    features: ["Family SUV", "Spacious Cabin", "Rear AC", "VIP YATREE Plates"]
  },
  {
    id: "innova-crysta",
    name: "Toyota Innova Crysta",
    type: "car",
    tag: "PREMIUM SUV",
    image: "/Innova crysta.png",
    description: "The gold standard of luxury travel in India. Extremely spacious, unmatched comfort, and a flawless premium ride. Custom YATREE plates.",
    seats: "7 Seater",
    luggage: "4 Bags",
    ac: true,
    features: ["Plush Captain Seats", "Dual Zone AC", "Premium Audio System", "VIP YATREE Plates"]
  },
  {
    id: "innova-hycross",
    name: "Toyota Innova Hycross",
    type: "car",
    tag: "HYBRID SUV",
    image: "/innova hycross.png",
    description: "Advanced hybrid SUV with unmatched comfort, silence, and panoramic views. Custom YATREE plates.",
    seats: "7 Seater",
    luggage: "4 Bags",
    ac: true,
    features: ["Hybrid Engine", "Panoramic Sunroof", "Ultra Premium", "VIP YATREE Plates"]
  },
  {
    id: "force-traveller",
    name: "Force Traveller",
    type: "bus",
    tag: "TEMPO",
    image: "/tempo-mice.jpg",
    description: "Spacious luxury minibus designed specifically for family groups touring Rajasthan. Custom YATREE plates.",
    seats: "12 to 17 Seater",
    luggage: "10-15 Bags",
    ac: true,
    features: ["Pushback Seats", "Dual Roof Blowers", "LED Screen", "VIP YATREE Plates"]
  },
  {
    id: "force-urbania",
    name: "Force Urbania",
    type: "bus",
    tag: "LUXURY VAN",
    image: "/urbania-mice.jpg",
    description: "Next-gen luxury passenger van with premium styling, superior air conditioning, and top-tier passenger comfort. Custom YATREE plates.",
    seats: "10 to 17 Seater",
    luggage: "10-15 Bags",
    ac: true,
    features: ["Advanced Aerodynamics", "Individual AC Vents", "Plush Reclining Seats", "VIP YATREE Plates"]
  },
  {
    id: "volvo-21",
    name: "Volvo Bus (21 Seater)",
    type: "bus",
    tag: "VOLVO AC COACH",
    image: "/volvo-21-mice.jpg",
    description: "Premium Volvo coach for mid-size groups. Smooth air suspension and reclining seats. Custom YATREE plates.",
    seats: "21 Seater",
    luggage: "15 Bags",
    ac: true,
    features: ["Air Suspension", "Reclining Seats", "High Capacity A/C", "VIP YATREE Plates"]
  },
  {
    id: "volvo-27",
    name: "Volvo Bus (27 Seater)",
    type: "bus",
    tag: "VOLVO AC COACH",
    image: "/volvo-27-mice.jpg",
    description: "Luxury Volvo coach for group travel. Unmatched comfort for intercity Rajasthan tours. Custom YATREE plates.",
    seats: "27 Seater",
    luggage: "20 Bags",
    ac: true,
    features: ["Air Suspension", "Panoramic Windows", "Underdeck Storage", "VIP YATREE Plates"]
  },
  {
    id: "volvo-35",
    name: "Volvo Bus (35 Seater)",
    type: "bus",
    tag: "VOLVO AC COACH",
    image: "/volvo-35-mice.jpg",
    description: "Spacious Volvo coach offering premium amenities for large wedding groups and corporate events. Custom YATREE plates.",
    seats: "35 Seater",
    luggage: "25 Bags",
    ac: true,
    features: ["Air Suspension", "Reclining Seats", "Premium Audio", "VIP YATREE Plates"]
  },
  {
    id: "volvo-45",
    name: "Volvo Bus (45 Seater)",
    type: "bus",
    tag: "VOLVO GRAND COACH",
    image: "/volvo-45-mice.jpg",
    description: "Grand Volvo passenger cruiser. Ideal for massive destination weddings and heavy corporate tours. Custom YATREE plates.",
    seats: "45 Seater",
    luggage: "35 Bags",
    ac: true,
    features: ["Heavy Air Suspension", "PA Mic System", "Deep Cargo Bay", "VIP YATREE Plates"]
  }
];

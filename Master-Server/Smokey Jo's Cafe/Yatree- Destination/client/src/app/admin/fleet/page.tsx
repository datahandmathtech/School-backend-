"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Car, 
  Users, 
  Fuel, 
  ShieldCheck,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

interface Vehicle {
  _id: string;
  name: string;
  type: string;
  model: string;
  seats: number;
  pricePerKm: number;
  image: string;
  isAvailable: boolean;
}

export default function FleetPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchVehicles = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/vehicles`);
      const data = await response.json();
      if (data.status === "success") {
        setVehicles(data.data.vehicles);
      }
    } catch (error) {
      console.error("Failed to fetch vehicles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const filteredVehicles = vehicles.filter(v => 
    v.name.toLowerCase().includes(search.toLowerCase()) || 
    v.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-heading font-bold text-white mb-2">Fleet Management</h1>
            <p className="text-white/60">Manage your luxury vehicle inventory and pricing.</p>
          </div>
          <Button className="bg-gold-600 hover:bg-gold-700 text-white h-12 px-6">
            <Plus className="w-5 h-5 mr-2" /> Add New Vehicle
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <Input 
            placeholder="Search by vehicle name or type..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-navy-900 border-white/5 text-white pl-12 h-14 rounded-2xl"
          />
        </div>

        {isLoading ? (
          <div className="py-20 text-center">
            <Loader2 className="w-10 h-10 animate-spin text-gold-500 mx-auto mb-4" />
            <p className="text-white/60 text-lg">Loading your fleet...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVehicles.map((vehicle) => (
              <div 
                key={vehicle._id} 
                className="group bg-navy-900 border border-white/5 rounded-3xl overflow-hidden hover:border-gold-600/30 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="relative h-56 bg-white/5 overflow-hidden">
                  <Image 
                    src={vehicle.image} 
                    alt={vehicle.name} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button className="p-2 bg-navy-950/80 backdrop-blur-md rounded-xl text-white/60 hover:text-white transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-red-500/10 backdrop-blur-md rounded-xl text-red-400 hover:bg-red-500 transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      vehicle.isAvailable ? "bg-green-500 text-white" : "bg-red-500 text-white"
                    }`}>
                      {vehicle.isAvailable ? "Available" : "On Duty"}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-xl font-bold text-white">{vehicle.name}</h3>
                      <p className="text-gold-500 font-bold">₹{vehicle.pricePerKm}/km</p>
                    </div>
                    <p className="text-white/40 text-sm">{vehicle.type} • {vehicle.model}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 text-white/60 text-sm">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                        <Users className="w-4 h-4 text-gold-500" />
                      </div>
                      {vehicle.seats} Seats
                    </div>
                    <div className="flex items-center gap-3 text-white/60 text-sm">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                        <ShieldCheck className="w-4 h-4 text-gold-500" />
                      </div>
                      Premium
                    </div>
                  </div>

                  <Button variant="outline" className="w-full border-white/5 bg-white/5 text-white hover:bg-gold-600 hover:text-white transition-all h-12 rounded-xl font-bold">
                    View Full Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && filteredVehicles.length === 0 && (
          <div className="py-20 text-center bg-navy-900 border border-white/5 rounded-3xl">
            <Car className="w-16 h-16 text-white/10 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No Vehicles Found</h3>
            <p className="text-white/60">Try adjusting your search filters.</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Eye, 
  CheckCircle, 
  XCircle,
  Truck,
  Download,
  Loader2,
  Calendar,
  User,
  Phone,
  MapPin,
  Car
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Booking {
  _id: string;
  customerName: string;
  email: string;
  phone: string;
  pickupLocation: string;
  dropLocation: string;
  pickupDate: string;
  tripType: string;
  vehicleType: string;
  status: string;
  totalFare?: number;
  paymentStatus: string;
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/bookings`);
      const data = await response.json();
      if (data.status === "success") {
        setBookings(data.data.bookings);
      }
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const filteredBookings = bookings.filter(b => {
    const matchesSearch = b.customerName.toLowerCase().includes(search.toLowerCase()) || 
                         b.phone.includes(search);
    const matchesStatus = filterStatus === "All" || b.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed": return "bg-green-500/10 text-green-500 border-green-500/20";
      case "Pending": return "bg-gold-500/10 text-gold-500 border-gold-500/20";
      case "Assigned": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "Completed": return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      case "Cancelled": return "bg-red-500/10 text-red-500 border-red-500/20";
      default: return "bg-white/10 text-white/60";
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-heading font-bold text-white mb-2">Booking Management</h1>
            <p className="text-white/60">Manage your trips, assign drivers, and track booking statuses.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10">
              <Download className="w-4 h-4 mr-2" /> Export CSV
            </Button>
            <Button className="bg-gold-600 hover:bg-gold-700 text-white">
              Create New Booking
            </Button>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-navy-900/50 border border-white/5 p-4 rounded-2xl flex flex-col lg:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <Input 
              placeholder="Search by name or phone..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white/5 border-white/10 text-white pl-10 h-11"
            />
          </div>
          <div className="flex gap-2 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0">
            {["All", "Pending", "Confirmed", "Assigned", "Completed", "Cancelled"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                  filterStatus === status 
                    ? "bg-gold-600 text-white" 
                    : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-navy-900 border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-white/40 text-xs uppercase tracking-widest bg-white/5 border-b border-white/5">
                  <th className="px-6 py-4 font-semibold">Customer & Trip</th>
                  <th className="px-6 py-4 font-semibold">Pickup/Drop</th>
                  <th className="px-6 py-4 font-semibold">Schedule</th>
                  <th className="px-6 py-4 font-semibold">Vehicle</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-20 text-center">
                      <Loader2 className="w-8 h-8 animate-spin text-gold-500 mx-auto mb-4" />
                      <p className="text-white/60">Loading bookings...</p>
                    </td>
                  </tr>
                ) : filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-20 text-center text-white/40">
                      No bookings found matching your criteria.
                    </td>
                  </tr>
                ) : filteredBookings.map((booking) => (
                  <tr key={booking._id} className="group hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-navy-800 flex items-center justify-center text-gold-500 font-bold">
                          {booking.customerName.charAt(0)}
                        </div>
                        <div>
                          <p className="text-white font-medium">{booking.customerName}</p>
                          <p className="text-xs text-white/40">{booking.tripType}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm space-y-1">
                        <p className="text-white/80 flex items-center gap-2">
                          <MapPin className="w-3 h-3 text-gold-500" /> {booking.pickupLocation}
                        </p>
                        <p className="text-white/40 flex items-center gap-2">
                          <Truck className="w-3 h-3" /> {booking.dropLocation}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm space-y-1">
                        <p className="text-white/80 flex items-center gap-2">
                          <Calendar className="w-3 h-3 text-gold-500" /> 
                          {new Date(booking.pickupDate).toLocaleDateString()}
                        </p>
                        <p className="text-white/40">
                          {new Date(booking.pickupDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className="bg-navy-800 border-white/10 text-white/80">
                        <Car className="w-3 h-3 mr-2" /> {booking.vehicleType}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="text-white/40 hover:text-white hover:bg-white/10">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-white/40 hover:text-gold-500 hover:bg-gold-500/10">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

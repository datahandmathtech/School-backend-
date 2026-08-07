import AdminLayout from "@/components/layout/AdminLayout";
import { 
  Users, 
  CalendarCheck, 
  TrendingUp, 
  MessageSquare,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

const stats = [
  { 
    name: "Total Bookings", 
    value: "156", 
    change: "+12.5%", 
    trend: "up", 
    icon: CalendarCheck,
    color: "text-blue-500",
    bg: "bg-blue-500/10"
  },
  { 
    name: "New Inquiries", 
    value: "42", 
    change: "+18.2%", 
    trend: "up", 
    icon: MessageSquare,
    color: "text-gold-500",
    bg: "bg-gold-500/10"
  },
  { 
    name: "Total Revenue", 
    value: "₹2.4L", 
    change: "+5.4%", 
    trend: "up", 
    icon: TrendingUp,
    color: "text-green-500",
    bg: "bg-green-500/10"
  },
  { 
    name: "Active Fleet", 
    value: "18/24", 
    change: "-2.1%", 
    trend: "down", 
    icon: Users,
    color: "text-purple-500",
    bg: "bg-purple-500/10"
  },
];

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white mb-2">Welcome Back, Admin</h1>
          <p className="text-white/60">Here's what's happening with Yatree Destination today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-navy-900 border border-white/5 p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bg}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  stat.trend === "up" ? "text-green-500" : "text-red-500"
                }`}>
                  {stat.change}
                  {stat.trend === "up" ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                </div>
              </div>
              <p className="text-white/60 text-sm font-medium mb-1">{stat.name}</p>
              <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
            </div>
          ))}
        </div>

        {/* Recent Bookings Table (Mock) */}
        <div className="bg-navy-900 border border-white/5 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Recent Bookings</h2>
            <button className="text-gold-500 text-sm font-medium hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-white/40 text-xs uppercase tracking-widest bg-white/5">
                  <th className="px-6 py-4 font-semibold">Customer</th>
                  <th className="px-6 py-4 font-semibold">Trip Type</th>
                  <th className="px-6 py-4 font-semibold">Vehicle</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { name: "Abhay Sharma", type: "Round Trip", vehicle: "Innova Crysta", status: "Confirmed", date: "Oct 24, 2023" },
                  { name: "Rahul Gupta", type: "Airport Transfer", vehicle: "Premium Sedan", status: "Pending", date: "Oct 23, 2023" },
                  { name: "Priya Singh", type: "Local Sightseeing", vehicle: "Tempo Traveller", status: "Completed", date: "Oct 22, 2023" },
                  { name: "Vikram Rathore", type: "One Way", vehicle: "Innova Crysta", status: "Cancelled", date: "Oct 21, 2023" },
                ].map((booking, i) => (
                  <tr key={i} className="text-sm text-white/80 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-medium">{booking.name}</td>
                    <td className="px-6 py-4">{booking.type}</td>
                    <td className="px-6 py-4">{booking.vehicle}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        booking.status === "Confirmed" ? "bg-green-500/10 text-green-500" :
                        booking.status === "Pending" ? "bg-gold-500/10 text-gold-500" :
                        booking.status === "Completed" ? "bg-blue-500/10 text-blue-500" :
                        "bg-red-500/10 text-red-500"
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-white/40">{booking.date}</td>
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

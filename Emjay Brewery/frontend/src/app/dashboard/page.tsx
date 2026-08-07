'use client'
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import api from '@/services/api';
import toast from 'react-hot-toast';
import {
  TrendingUp,
  FlaskConical,
  Package,
  ShoppingCart,
  AlertTriangle,
  IndianRupee,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Users,
  Wallet,
  ClipboardList,
  Truck,
  Droplets,
  Coins,
  ChevronDown
} from 'lucide-react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { cn } from '@/utils/cn';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState('Full Year');
  const [selectedFY, setSelectedFY] = useState('2026-2027');

  useEffect(() => {
    fetchData();
  }, [selectedMonth, selectedFY]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const statsRes = await api.get(`/dashboard/stats?month=${selectedMonth}&fy=${selectedFY}`);
      setStats(statsRes.data);
    } catch (error: any) {
      toast.error('Could not load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="flex h-screen bg-gray-50 items-center justify-center font-bold text-gray-400 italic">
      Loading Dashboard...
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 lg:ml-64 p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">Overview of sales and inventory for Emjay Brewery</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Calendar / FY Selectors */}
            <div className="relative group">
               <select 
                   value={selectedMonth} 
                   onChange={(e) => setSelectedMonth(e.target.value)} 
                   className="appearance-none bg-white text-gray-900 font-bold text-sm rounded-xl px-5 py-2.5 pr-10 outline-none cursor-pointer border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors"
               >
                   <option>Full Year</option>
                   <option>April</option>
                   <option>May</option>
                   <option>June</option>
                   <option>July</option>
                   <option>August</option>
                   <option>September</option>
                   <option>October</option>
                   <option>November</option>
                   <option>December</option>
                   <option>January</option>
                   <option>February</option>
                   <option>March</option>
               </select>
               <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            
            <div className="relative group">
               <select 
                   value={selectedFY} 
                   onChange={(e) => setSelectedFY(e.target.value)} 
                   className="appearance-none bg-white text-gray-900 font-bold text-sm rounded-xl pl-10 pr-10 py-2.5 outline-none cursor-pointer border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors"
               >
                   <option>2023-2024</option>
                   <option>2024-2025</option>
                   <option>2025-2026</option>
                   <option>2026-2027</option>
               </select>
               <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-black text-[10px] pointer-events-none">FY</span>
               <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <div className="bg-white border border-gray-200 px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-2 ml-2">
              <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
              <span className="text-xs font-black text-gray-600 uppercase tracking-widest">System Live</span>
            </div>
          </div>
        </div>

        {/* 12-Box Stats Grid - Light Theme adapted from the reference */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          <StatBox title="Total Sales" value={stats?.totalSales} prefix="₹" icon={<IndianRupee />} color="text-emerald-600" bgColor="bg-emerald-50" />
          <StatBox title="Total Profit" value={stats?.profit} prefix="₹" icon={<TrendingUp />} color="text-emerald-600" bgColor="bg-emerald-50" />
          <StatBox title="Total Production" value={stats?.totalFilledStock || 0} icon={<FlaskConical />} color="text-blue-600" bgColor="bg-blue-50" />
          <StatBox title="Filled Bottles" value={stats?.totalFilledStock || 0} icon={<Package />} color="text-indigo-600" bgColor="bg-indigo-50" />
          <StatBox title="Empty Bottles" value={stats?.availableEmptyStock || 0} icon={<Droplets />} color="text-sky-600" bgColor="bg-sky-50" />
          <StatBox title="Caps Inventory" value={0} icon={<ShoppingCart />} color="text-orange-600" bgColor="bg-orange-50" />
          
          <StatBox title="Staff Payroll" value={0} prefix="₹" icon={<Users />} color="text-rose-600" bgColor="bg-rose-50" />
          <StatBox title="General Purchases" value={0} prefix="₹" icon={<Truck />} color="text-amber-600" bgColor="bg-amber-50" />
          <StatBox title="Cash Balance" value={0} prefix="₹" icon={<Wallet />} color="text-teal-600" bgColor="bg-teal-50" />
          <StatBox title="Pending Payments" value={stats?.pendingPayments || 0} prefix="₹" icon={<AlertTriangle />} color="text-rose-600" bgColor="bg-rose-50" />
          <StatBox title="Low Stock Items" value={stats?.lowStockProducts?.length || 0} icon={<ClipboardList />} color="text-red-600" bgColor="bg-red-50" />
          <StatBox title="Total Orders" value={0} icon={<Coins />} color="text-purple-600" bgColor="bg-purple-50" />
        </div>

        {/* Low Stock Alerts and Finance Summary removed as requested */}
      </main>
    </div>
  );
};

const StatBox = ({ title, value, icon, color, bgColor, prefix = '' }: any) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col justify-between hover:shadow-lg transition-all shadow-sm">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${bgColor} ${color}`}>
        {React.cloneElement(icon as React.ReactElement, { className: 'w-5 h-5' })}
      </div>
      <div>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 line-clamp-1" title={title}>{title}</p>
        <h4 className="text-xl font-black text-gray-900 tracking-tighter">
          {prefix}{typeof value === 'number' ? value.toLocaleString() : value || 0}
        </h4>
      </div>
    </div>
  );
};

const MetadataRow = ({ label, value, color = "text-gray-900" }: any) => (
  <div className="flex justify-between items-center text-sm">
    <span className="text-gray-500">{label}</span>
    <span className={`font-bold ${color}`}>{value}</span>
  </div>
)

export default Dashboard;

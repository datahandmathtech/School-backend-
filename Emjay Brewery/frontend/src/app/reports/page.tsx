'use client'
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import api from '@/services/api';
import toast from 'react-hot-toast';
import {
  FileText,
  Download,
  Calendar,
  Filter,
  TrendingUp,
  Package,
  CreditCard,
  ChevronRight,
  Search,
  CheckCircle,
  Truck,
  Trash2,
  XCircle
} from 'lucide-react';
import { cn } from '@/utils/cn';

const Reports = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [productions, setProductions] = useState<any[]>([]);
    const [bottles, setBottles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('orders'); // New state for tabs

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [orderRes, prodRes, bottleRes] = await Promise.all([
                api.get('/orders'),
                api.get('/production'),
                api.get('/bottles/stock')
            ]);
            setOrders(orderRes.data);
            setProductions(prodRes.data);
            setBottles(bottleRes.data.history);
        } catch (error) {
            toast.error('Failed to load report data');
        } finally {
            setLoading(false);
        }
    };

    const handleExport = (type: string) => {
        toast.success(`Exporting as ${type}... (Simulated)`);
    };

    const deleteItem = async (id: string, type: 'order' | 'production') => {
        if (!confirm(`Delete this ${type} record?`)) return;
        try {
            await api.delete(`/${type === 'order' ? 'orders' : 'production'}/${id}`);
            toast.success(`${type === 'order' ? 'Order' : 'Production'} deleted`);
            fetchData();
        } catch (error) {
            toast.error('Delete failed');
        }
    };

    return (
        <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <Sidebar />
      <main className="flex-1 lg:ml-64 p-8 overflow-y-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic underline decoration-indigo-500 underline-offset-8">Audit & Reports</h1>
            <p className="text-slate-500 mt-4 font-semibold uppercase tracking-widest text-[10px]">Detailed transaction logs and performance metrics</p>
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-2xl text-slate-600 hover:text-indigo-600 font-black text-[10px] uppercase tracking-widest transition-all shadow-sm">
                <Filter className="w-4 h-4" />
                Customize View
            </button>
            <button className="btn-primary flex items-center gap-2 group shadow-xl shadow-indigo-600/20">
                <Download className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                Export Ledger
            </button>
          </div>
        </div>

        <div className="flex bg-slate-100 p-1.5 rounded-2xl w-fit mb-8 shadow-inner">
          <button
            onClick={() => setActiveTab('orders')}
            className={cn(
              "flex items-center gap-3 px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] transition-all",
              activeTab === 'orders' ? "bg-white text-indigo-600 shadow-xl scale-[1.02]" : "text-slate-500 hover:text-slate-900"
            )}
          >
            <TrendingUp className="w-4 h-4" />
            Consolidated Sales
          </button>
          <button
            onClick={() => setActiveTab('production')}
            className={cn(
              "flex items-center gap-3 px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] transition-all",
              activeTab === 'production' ? "bg-white text-indigo-600 shadow-xl scale-[1.02]" : "text-slate-500 hover:text-slate-900"
            )}
          >
            <Package className="w-4 h-4" />
            Production Ledger
          </button>
        </div>

        <div className="card !p-0 border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
               <h3 className="font-black text-slate-900 uppercase tracking-tight italic">Commercial Records</h3>
               <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="text" placeholder="Global search..." className="bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 w-64" />
               </div>
            </div>
            <div className="overflow-x-auto">
              {activeTab === 'orders' ? (
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest h-12">
                    <tr>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Timestamp</th>
                      <th className="px-6 py-4">Counterparty</th>
                      <th className="px-6 py-4">Total Value</th>
                      <th className="px-6 py-4 text-right">Delete</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600 font-medium lowercase">
                    {orders.map((o) => (
                      <tr key={o._id} className="hover:bg-slate-50/50 transition-all font-medium first-letter:uppercase">
                        <td className="px-6 py-4">
                          <span className={cn(
                            "flex items-center gap-1.5 text-[10px] font-black uppercase",
                            o.orderStatus === 'delivered' ? "text-emerald-600" : "text-amber-600"
                          )}>
                             <CheckCircle className="w-3 h-3" />
                             {o.orderStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-900">{new Date(o.date).toLocaleDateString()}</td>
                        <td className="px-6 py-4">
                           <p className="font-black text-slate-800 uppercase text-xs tracking-tight italic">{o.customerName}</p>
                           <p className="text-[10px] text-slate-400 font-bold uppercase">{o.shopName || 'RETAIL'}</p>
                        </td>
                        <td className="px-6 py-4 font-black italic text-indigo-600">₹{o.totalAmount}</td>
                        <td className="px-6 py-4 text-right">
                          <button onClick={() => deleteItem(o._id, 'order')} className="p-1.5 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg transition-all"><Trash2 className="w-4 h-4" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest h-12">
                    <tr>
                      <th className="px-6 py-4">Log ID</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Juice Variant</th>
                      <th className="px-6 py-4">Quantity</th>
                      <th className="px-6 py-4 text-right">Delete</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600 font-medium">
                    {productions.map((p) => (
                      <tr key={p._id} className="hover:bg-slate-50/50 transition-all">
                        <td className="px-6 py-4 font-mono text-[10px] text-slate-400">#{p._id.slice(-6).toUpperCase()}</td>
                        <td className="px-6 py-4 text-slate-900">{new Date(p.date).toLocaleDateString()}</td>
                        <td className="px-6 py-4 font-black text-slate-800 uppercase tracking-tight italic">{p.juiceType?.name}</td>
                        <td className="px-6 py-4">
                             <span className="font-black italic text-indigo-600">{p.quantityProduced}</span>
                             <span className="text-[10px] font-bold text-slate-500 uppercase ml-1">units</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button onClick={() => deleteItem(p._id, 'production')} className="p-1.5 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg transition-all"><Trash2 className="w-4 h-4" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
            </main>
        </div>
    );
};

const ReportStatCard = ({ label, value, icon, trend, suffix = '' }: any) => (
    <div className="card bg-slate-900 border-slate-800 flex items-center justify-between group hover:border-indigo-500/20 transition-all p-5">
        <div>
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">{label}</p>
            <h4 className="text-xl font-black text-white italic group-hover:text-indigo-400 transition-colors">
                {typeof value === 'number' && !suffix.includes('units') ? '₹' : ''}
                {(value || 0).toLocaleString()}{suffix}
            </h4>
        </div>
        <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 group-hover:bg-indigo-500/10 transition-colors">
            {icon}
        </div>
    </div>
);

const ReportSection = ({ title, icon, data, columns, renderRow }: any) => (
    <div className="card !p-0 overflow-hidden shadow-2xl border-slate-800 bg-slate-900/20 backdrop-blur-xl">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
            {icon}
            <h3 className="font-bold text-lg text-white tracking-tight uppercase text-[15px]">{title}</h3>
            <div className="ml-auto flex items-center gap-2">
                 <Calendar className="w-3.5 h-3.5 text-slate-500" />
                 <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest italic underline decoration-slate-800">Historical Intelligence</span>
            </div>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-slate-900 text-slate-500 text-[10px] uppercase font-black tracking-widest">
                    <tr>
                        {columns.map((c: string) => <th key={c} className="px-6 py-4">{c}</th>)}
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                    {data.map(renderRow)}
                </tbody>
            </table>
        </div>
    </div>
);

export default Reports;

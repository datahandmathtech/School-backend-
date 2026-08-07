'use client'
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import api from '@/services/api';
import toast from 'react-hot-toast';
import { 
  Package, 
  Wine, 
  Calendar, 
  Filter, 
  ArrowUpRight, 
  ArrowDownLeft, 
  TrendingUp,
  History,
  Database,
  ArrowRight,
  TrendingDown,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';

const StockReport = () => {
    const [activeSection, setActiveSection] = useState<'production' | 'bottles'>('production');
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState<any[]>([]);
    
    // Filters
    const [selectedProduct, setSelectedProduct] = useState('');
    const [bottleType, setBottleType] = useState('New');
    const [dateRange, setDateRange] = useState({
        start: '',
        end: new Date().toISOString().split('T')[0]
    });

    const [reportData, setReportData] = useState<any[]>([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await api.get('/products');
            setProducts(res.data);
            if (res.data.length > 0) {
                setSelectedProduct(res.data[0]._id);
            }
        } catch (error) {
            toast.error('Failed to load products');
        }
    };

    const fetchReport = async () => {
        setLoading(true);
        try {
            let res;
            if (activeSection === 'production') {
                if (!selectedProduct) return;
                res = await api.get('/reports/production-stock', {
                    params: {
                        productId: selectedProduct,
                        startDate: dateRange.start,
                        endDate: dateRange.end
                    }
                });
            } else {
                res = await api.get('/reports/bottle-stock', {
                    params: {
                        bottleType,
                        startDate: dateRange.start,
                        endDate: dateRange.end
                    }
                });
            }
            const sorted = res.data.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());
            setReportData(sorted);
        } catch (error) {
            toast.error('Failed to fetch report');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setReportData([]); // Clear old data when switching tabs to avoid property mismatches
        if (activeSection === 'production' && selectedProduct) {
            fetchReport();
        } else if (activeSection === 'bottles') {
            fetchReport();
        }
    }, [activeSection, selectedProduct, bottleType, dateRange.start, dateRange.end]);

    return (
        <div className="flex min-h-screen bg-slate-50 text-slate-900">
            <Sidebar />
            <main className="flex-1 lg:ml-64 p-4 md:p-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wider">Inventory Intelligence</span>
                        </div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight italic">
                            STOCK <span className="text-blue-600 underline decoration-4 decoration-blue-100 underline-offset-4">REPORT</span>
                        </h1>
                        <p className="text-slate-500 text-sm mt-2 font-medium">Detailed daily ledger for production and bottles.</p>
                    </div>

                    <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
                        <button 
                            onClick={() => setActiveSection('production')}
                            className={cn(
                                "flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-bold transition-all",
                                activeSection === 'production' ? "bg-slate-900 text-white shadow-lg" : "text-slate-500 hover:bg-slate-50"
                            )}
                        >
                            <Package className="w-4 h-4" />
                            Production Stock
                        </button>
                        <button 
                            onClick={() => setActiveSection('bottles')}
                            className={cn(
                                "flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-bold transition-all",
                                activeSection === 'bottles' ? "bg-slate-900 text-white shadow-lg" : "text-slate-500 hover:bg-slate-50"
                            )}
                        >
                            <Wine className="w-4 h-4" />
                            Bottle Inventory
                        </button>
                    </div>
                </div>

                {/* Filters Row */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    {activeSection === 'production' ? (
                        <div className="md:col-span-1">
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Select Product</label>
                            <div className="relative">
                                <select 
                                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none appearance-none transition-all shadow-sm"
                                    value={selectedProduct}
                                    onChange={(e) => setSelectedProduct(e.target.value)}
                                >
                                    {products.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
                                </select>
                                <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            </div>
                        </div>
                    ) : (
                        <div className="md:col-span-1">
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Bottle Type</label>
                            <div className="flex bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
                                <button 
                                    onClick={() => setBottleType('New')}
                                    className={cn("flex-1 py-1.5 rounded-lg text-[11px] font-bold transition-all", bottleType === 'New' ? "bg-blue-50 text-blue-600" : "text-slate-500 hover:bg-slate-50")}
                                >
                                    New Bottles
                                </button>
                                <button 
                                    onClick={() => setBottleType('Old')}
                                    className={cn("flex-1 py-1.5 rounded-lg text-[11px] font-bold transition-all", bottleType === 'Old' ? "bg-blue-50 text-blue-600" : "text-slate-500 hover:bg-slate-50")}
                                >
                                    Old Bottles
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="md:col-span-1">
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">From Date</label>
                        <input 
                            type="date" 
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
                            value={dateRange.start}
                            onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                        />
                    </div>
                    <div className="md:col-span-1">
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">To Date</label>
                        <input 
                            type="date" 
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
                            value={dateRange.end}
                            onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                        />
                    </div>
                    
                    <div className="flex items-end">
                        <button 
                            onClick={fetchReport}
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-2.5 text-[11px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 active:scale-95 transition-all disabled:opacity-50"
                        >
                            {loading ? 'Refreshing...' : 'Generate Report'}
                        </button>
                    </div>
                </div>

                {/* Report Table */}
                <div className="card !p-0 border-slate-200 shadow-xl overflow-hidden bg-white/50 backdrop-blur-md">
                    <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className={cn(
                                "p-2.5 rounded-xl",
                                activeSection === 'production' ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"
                            )}>
                                {activeSection === 'production' ? <Database className="w-5 h-5" /> : <Wine className="w-5 h-5" />}
                            </div>
                            <div>
                                <h3 className="font-black text-slate-900 uppercase tracking-tight italic">
                                    {activeSection === 'production' ? 'Production & Sales Ledger' : 'Bottle Procurement Ledger'}
                                </h3>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Running balance calculations</p>
                            </div>
                        </div>
                        {reportData.length > 0 && reportData[reportData.length - 1]?.closingStock !== undefined && (
                            <div className="flex items-center gap-6">
                                <div className="text-right">
                                    <p className="text-[9px] font-bold text-slate-400 uppercase">Closing Balance</p>
                                    <p className="text-xs font-black text-slate-900 italic">{(reportData[reportData.length - 1].closingStock || 0).toLocaleString()} Units</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="overflow-x-auto">
                        {loading ? (
                            <div className="p-20 flex flex-col items-center justify-center text-slate-400 gap-4">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
                                <p className="text-xs font-bold uppercase tracking-widest">Calculating Stock History...</p>
                            </div>
                        ) : reportData.length === 0 ? (
                            <div className="p-20 text-center">
                                <p className="text-slate-400 text-sm font-medium">No records found for the selected criteria.</p>
                            </div>
                        ) : (
                            <table className="w-full text-left">
                                <thead className="bg-slate-50/80 text-slate-500 text-[10px] font-black uppercase tracking-widest h-14 border-b border-slate-100">
                                    <tr>
                                        <th className="px-8 py-4">Transaction Date</th>
                                        <th className="px-8 py-4 text-center">Opening Stock</th>
                                        <th className="px-8 py-4 text-center">
                                            {activeSection === 'production' ? 'Produced (+)' : 'Purchased (+)'}
                                        </th>
                                        <th className="px-8 py-4 text-center">
                                            {activeSection === 'production' ? 'Sales (-)' : 'Used (-)'}
                                        </th>
                                        <th className="px-8 py-4 text-center">Closing Stock</th>
                                        <th className="px-8 py-4 text-right">Trend</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-slate-700">
                                    {reportData.map((row, idx) => (
                                        <motion.tr 
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                            key={row.date} 
                                            className="hover:bg-slate-50/70 transition-colors group"
                                        >
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-full bg-slate-100 flex flex-col items-center justify-center text-[9px] font-black text-slate-500 leading-tight">
                                                        <span>{new Date(row.date).toLocaleString('en-US', { month: 'short' }).toUpperCase()}</span>
                                                        <span className="text-slate-900 text-xs">{new Date(row.date).getDate()}</span>
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-slate-900 uppercase text-xs tracking-tight italic">{new Date(row.date).toLocaleDateString('en-IN', { weekday: 'long' })}</p>
                                                        <p className="text-[10px] text-slate-400 font-bold">{row.date}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-center font-bold text-slate-500 text-sm">{(row.openingStock || 0).toLocaleString()}</td>
                                            <td className="px-8 py-5 text-center">
                                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                                                    <ArrowUpRight className="w-3.5 h-3.5" />
                                                    <span className="font-black italic text-xs">+{ ( (activeSection === 'production' ? row.production : row.buy) || 0).toLocaleString() }</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-center">
                                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-600 border border-rose-100">
                                                    <ArrowDownLeft className="w-3.5 h-3.5" />
                                                    <span className="font-black italic text-xs">-{ ( (activeSection === 'production' ? row.sales : row.used) || 0).toLocaleString() }</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-center">
                                                <span className="px-4 py-1.5 rounded-xl bg-slate-900 text-white font-black italic text-xs shadow-md shadow-slate-200">
                                                    {(row.closingStock || 0).toLocaleString()}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5 text-right">
                                                {row.closingStock > row.openingStock ? (
                                                    <TrendingUp className="w-4 h-4 text-emerald-500 inline-block group-hover:scale-125 transition-transform" />
                                                ) : row.closingStock < row.openingStock ? (
                                                    <TrendingDown className="w-4 h-4 text-rose-500 inline-block group-hover:scale-125 transition-transform" />
                                                ) : (
                                                    <span className="w-4 h-0.5 bg-slate-200 inline-block rounded-full mb-1.5" />
                                                )}
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

                {/* Legend / Info */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-500/20 relative overflow-hidden group">
                        <TrendingUp className="w-32 h-32 absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform" />
                        <h4 className="font-black uppercase tracking-widest text-[10px] mb-2">Calculation Logic</h4>
                        <p className="text-sm font-medium leading-relaxed opacity-90 italic">
                            Opening Stock + {activeSection === 'production' ? 'Production' : 'Purchases'} - {activeSection === 'production' ? 'Sales' : 'Usage'} = Closing Stock.
                        </p>
                        <div className="mt-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-300 animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Real-time Reconciliation</span>
                        </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-center">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center">
                                <History className="w-6 h-6 text-slate-400" />
                            </div>
                            <div>
                                <h4 className="font-black text-slate-900 uppercase text-xs italic tracking-tighter">Perfect Data Verification</h4>
                                <p className="text-[11px] text-slate-500 font-medium">Every transaction and item edit is automatically re-applied to the stock history to ensure 100% accuracy.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default StockReport;

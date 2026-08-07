'use client'
import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '@/components/Sidebar';
import api from '@/services/api';
import toast from 'react-hot-toast';
import { 
  RefreshCcw,
  ShoppingCart,
  FlaskConical,
  ArrowRightLeft,
  ShoppingBag,
  Filter,
  Plus,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { useRouter } from 'next/navigation';

export default function LiveBoard() {
  const router = useRouter();
  const dateInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [dailyReport, setDailyReport] = useState<any>(null);
  const [reportLoading, setReportLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('sales');

  useEffect(() => {
     fetchDailyReport();
  }, [selectedDate]);

  const handlePrevDay = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() - 1);
    setSelectedDate(d.toISOString().split('T')[0]);
  };

  const handleNextDay = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + 1);
    setSelectedDate(d.toISOString().split('T')[0]);
  };

  const fetchDailyReport = async () => {
      try {
          setReportLoading(true);
          const res = await api.get(`/dashboard/daily-report?date=${selectedDate}`);
          setDailyReport(res.data);
      } catch (error) {
          toast.error('Failed to fetch live board data');
      } finally {
          setReportLoading(false);
          setLoading(false);
      }
  }

  if (loading) return (
    <div className="flex h-screen bg-gray-50 items-center justify-center">
       <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-gray-900 font-sans">
      <Sidebar />
      <main className="flex-1 lg:ml-64 p-6 lg:p-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
                <h1 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">Live Board</h1>
                <p className="text-gray-500 text-sm mt-1 flex items-center gap-2 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Real-time overview of today&apos;s business activity
                </p>
            </div>

            <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 bg-white border border-gray-200 p-1 rounded-xl shadow-sm hover:border-gray-300 transition-colors">
                    <button 
                        onClick={handlePrevDay}
                        className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"
                        title="Previous Day"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div 
                        className="relative flex items-center justify-center min-w-[90px] cursor-pointer"
                        onClick={() => {
                            try {
                                dateInputRef.current?.showPicker();
                            } catch (e) {
                                // Fallback for browsers that don't support showPicker
                                dateInputRef.current?.focus();
                            }
                        }}
                    >
                        <span className="text-sm font-bold text-gray-700 px-2 pointer-events-none">
                            {(() => {
                                const [y, m, d] = selectedDate.split('-');
                                return `${d}/${m}/${y.slice(-2)}`;
                            })()}
                        </span>
                        <input 
                            ref={dateInputRef}
                            type="date" 
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer pointer-events-none"
                        />
                    </div>
                    <button 
                        onClick={handleNextDay}
                        className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"
                        title="Next Day"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
                <button 
                    onClick={fetchDailyReport}
                    className="p-3 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl shadow-sm text-gray-600 transition-all active:scale-95"
                    title="Refresh Data"
                >
                    <RefreshCcw className={cn("w-5 h-5", reportLoading && "animate-spin")} />
                </button>
            </div>
        </div>

        {/* 4 Cards Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Sales Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                        <ShoppingCart className="w-6 h-6" />
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">TODAY&apos;S SALES</p>
                        <h3 className="text-2xl font-black text-blue-600 tracking-tight">₹{(dailyReport?.summary?.totalSales || 0).toLocaleString()}</h3>
                    </div>
                </div>
                <div className="flex justify-between items-center text-xs font-bold text-gray-500 pt-4 border-t border-gray-100">
                    <span>Transactions</span>
                    <span className="text-gray-900">{dailyReport?.orders?.length || 0}</span>
                </div>
            </div>

            {/* Production Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                        <FlaskConical className="w-6 h-6" />
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">TODAY&apos;S PRODUCTION</p>
                        <h3 className="text-2xl font-black text-emerald-600 tracking-tight">{(dailyReport?.summary?.totalProduced || 0).toLocaleString()} <span className="text-sm">Bottles</span></h3>
                    </div>
                </div>
                <div className="flex justify-between items-center text-xs font-bold text-gray-500 pt-4 border-t border-gray-100">
                    <span>Batches</span>
                    <span className="text-gray-900">{dailyReport?.productions?.length || 0}</span>
                </div>
            </div>

            {/* Branch Transfer Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
                        <ArrowRightLeft className="w-6 h-6" />
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">TODAY&apos;S BRANCH TRANSFER</p>
                        <h3 className="text-2xl font-black text-orange-500 tracking-tight">{(dailyReport?.summary?.totalBranchTransferBottles || 0).toLocaleString()} <span className="text-sm">Bottles</span></h3>
                    </div>
                </div>
                <div className="flex justify-between items-center text-xs font-bold text-gray-500 pt-4 border-t border-gray-100">
                    <span>Transactions</span>
                    <span className="text-gray-900">{dailyReport?.branchTransfers?.length || 0}</span>
                </div>
            </div>

            {/* Purchase Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                        <ShoppingBag className="w-6 h-6" />
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">TODAY&apos;S PURCHASE</p>
                        <h3 className="text-2xl font-black text-purple-600 tracking-tight">₹{(dailyReport?.summary?.totalPurchases || 0).toLocaleString()}</h3>
                    </div>
                </div>
                <div className="flex justify-between items-center text-xs font-bold text-gray-500 pt-4 border-t border-gray-100">
                    <span>Transactions</span>
                    <span className="text-gray-900">{dailyReport?.purchases?.length || 0}</span>
                </div>
            </div>
        </div>

        {/* Tabs Row */}
        <div className="flex items-center gap-2 md:gap-8 border-b border-gray-200 mb-6 px-2 overflow-x-auto scrollbar-hide">
             <button 
                onClick={() => setActiveTab('sales')} 
                className={cn("pb-4 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors border-b-2 whitespace-nowrap", activeTab === 'sales' ? "text-blue-600 border-blue-600" : "text-gray-500 border-transparent hover:text-gray-700")}
             >
                  <ShoppingCart className="w-4 h-4" /> SALES ENTRIES
             </button>
             <button 
                onClick={() => setActiveTab('production')} 
                className={cn("pb-4 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors border-b-2 whitespace-nowrap", activeTab === 'production' ? "text-blue-600 border-blue-600" : "text-gray-500 border-transparent hover:text-gray-700")}
             >
                  <FlaskConical className="w-4 h-4" /> PRODUCTION ENTRIES
             </button>
             <button 
                onClick={() => setActiveTab('transfers')} 
                className={cn("pb-4 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors border-b-2 whitespace-nowrap", activeTab === 'transfers' ? "text-blue-600 border-blue-600" : "text-gray-500 border-transparent hover:text-gray-700")}
             >
                  <ArrowRightLeft className="w-4 h-4" /> BRANCH TRANSFER ENTRIES
             </button>
             <button 
                onClick={() => setActiveTab('purchases')} 
                className={cn("pb-4 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors border-b-2 whitespace-nowrap", activeTab === 'purchases' ? "text-blue-600 border-blue-600" : "text-gray-500 border-transparent hover:text-gray-700")}
             >
                  <ShoppingBag className="w-4 h-4" /> PURCHASE ENTRIES
             </button>
        </div>

        {/* Tab Content Box */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
            
            {/* Header Toolbar */}
            <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100">
                <div>
                    <h2 className="text-lg font-bold text-gray-900 capitalize">{activeTab.replace('transfers', 'Branch Transfer')} Entries</h2>
                    <p className="text-xs text-gray-500 mt-1">All {activeTab.replace('transfers', 'branch transfer')} transactions for selected date</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-lg hover:bg-gray-50 transition-colors">
                        <Filter className="w-4 h-4" /> Filter
                    </button>
                    {activeTab === 'sales' && (
                        <button onClick={() => router.push('/sales')} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                            <Plus className="w-4 h-4" /> Add Sale
                        </button>
                    )}
                    {activeTab === 'production' && (
                        <button onClick={() => router.push('/production')} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                            <Plus className="w-4 h-4" /> Add Production
                        </button>
                    )}
                    {activeTab === 'purchases' && (
                        <button onClick={() => router.push('/purchases')} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                            <Plus className="w-4 h-4" /> Add Purchase
                        </button>
                    )}
                    {activeTab === 'transfers' && (
                        <button onClick={() => router.push('/branch-stock')} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                            <Plus className="w-4 h-4" /> Add Transfer
                        </button>
                    )}
                </div>
            </div>

            {/* Table Area */}
            <div className="flex-1 overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-[#F8FAFC] text-[10px] font-black uppercase tracking-wider text-gray-500 border-b border-gray-100">
                        {activeTab === 'sales' && (
                            <tr>
                                <th className="px-6 py-4">#</th>
                                <th className="px-6 py-4">Date & Time</th>
                                <th className="px-6 py-4">Invoice No.</th>
                                <th className="px-6 py-4 text-center">Customer Type</th>
                                <th className="px-6 py-4">Customer Name</th>
                                <th className="px-6 py-4">Payment Mode</th>
                                <th className="px-6 py-4 text-right">Amount (₹)</th>
                                <th className="px-6 py-4 text-center">Bottles (Qty)</th>
                                <th className="px-6 py-4 text-center">Payment Status</th>
                                <th className="px-6 py-4 text-center">Action</th>
                            </tr>
                        )}
                        {activeTab === 'production' && (
                            <tr>
                                <th className="px-6 py-4">#</th>
                                <th className="px-6 py-4">Date & Time</th>
                                <th className="px-6 py-4">Product Name</th>
                                <th className="px-6 py-4 text-center">Name of Verk</th>
                                <th className="px-6 py-4 text-right">Quantity Produced</th>
                                <th className="px-6 py-4 text-center">Action</th>
                            </tr>
                        )}
                        {activeTab === 'transfers' && (
                            <tr>
                                <th className="px-6 py-4">#</th>
                                <th className="px-6 py-4">Date & Time</th>
                                <th className="px-6 py-4">Branch/Distributor</th>
                                <th className="px-6 py-4">Product</th>
                                <th className="px-6 py-4 text-center">Type</th>
                                <th className="px-6 py-4 text-right">Quantity</th>
                                <th className="px-6 py-4 text-center">Action</th>
                            </tr>
                        )}
                        {activeTab === 'purchases' && (
                            <tr>
                                <th className="px-6 py-4">#</th>
                                <th className="px-6 py-4">Date & Time</th>
                                <th className="px-6 py-4">Invoice No.</th>
                                <th className="px-6 py-4">Supplier</th>
                                <th className="px-6 py-4 text-right">Amount (₹)</th>
                                <th className="px-6 py-4 text-center">Status</th>
                                <th className="px-6 py-4 text-center">Action</th>
                            </tr>
                        )}
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {reportLoading && (
                            <tr>
                                <td colSpan={10} className="px-6 py-10 text-center text-gray-400 font-bold">
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                                        Loading entries...
                                    </div>
                                </td>
                            </tr>
                        )}

                        {!reportLoading && activeTab === 'sales' && dailyReport?.orders?.map((o: any, idx: number) => (
                            <tr key={o._id} className="hover:bg-gray-50 transition-colors text-gray-700 font-medium">
                                <td className="px-6 py-4 text-gray-400 text-xs">{idx + 1}</td>
                                <td className="px-6 py-4 text-xs">
                                    {new Date(o.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })},{' '}
                                    {new Date(o.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                </td>
                                <td className="px-6 py-4">{o.invoiceNo || o.orderNumber || `INV-${String(idx + 1).padStart(4, '0')}`}</td>
                                <td className="px-6 py-4 text-center">
                                    <span className={cn("px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide", o.type === 'B2B' ? "bg-blue-50 text-blue-600" : "bg-purple-50 text-purple-600")}>
                                        {o.type === 'B2B' ? 'Wholesaler' : 'Retailer'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">{o.customerName}</td>
                                <td className="px-6 py-4">{o.paymentMode || 'Cash'}</td>
                                <td className="px-6 py-4 text-right font-black text-gray-900">₹{o.totalAmount.toLocaleString()}</td>
                                <td className="px-6 py-4 text-center font-bold">{o.items?.reduce((sum: number, item: any) => sum + (item.quantity || 0), 0) || 0}</td>
                                <td className="px-6 py-4 text-center">
                                    {o.paidAmount >= o.totalAmount ? (
                                        <span className="text-emerald-500 font-bold text-xs">Paid</span>
                                    ) : (
                                        <span className="text-rose-500 font-bold text-xs">Due</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <button className="text-gray-400 hover:text-gray-600" onClick={() => router.push('/sales')}>
                                        <MoreHorizontal className="w-5 h-5 mx-auto" />
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {!reportLoading && activeTab === 'production' && dailyReport?.productions?.map((p: any, idx: number) => (
                            <tr key={p._id} className="hover:bg-gray-50 transition-colors text-gray-700 font-medium">
                                <td className="px-6 py-4 text-gray-400 text-xs">{idx + 1}</td>
                                <td className="px-6 py-4 text-xs">
                                    {new Date(p.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })},{' '}
                                    {new Date(p.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                </td>
                                <td className="px-6 py-4 font-bold text-gray-900">{p.juiceType?.name || 'Unknown'}</td>
                                <td className="px-6 py-4 text-center">{p.nameOfVerk || 'System'}</td>
                                <td className="px-6 py-4 text-right font-black text-emerald-600">+{p.quantityProduced}</td>
                                <td className="px-6 py-4 text-center">
                                    <button className="text-gray-400 hover:text-gray-600" onClick={() => router.push('/production')}>
                                        <MoreHorizontal className="w-5 h-5 mx-auto" />
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {!reportLoading && activeTab === 'transfers' && dailyReport?.branchTransfers?.map((b: any, idx: number) => (
                            <tr key={b._id} className="hover:bg-gray-50 transition-colors text-gray-700 font-medium">
                                <td className="px-6 py-4 text-gray-400 text-xs">{idx + 1}</td>
                                <td className="px-6 py-4 text-xs">
                                    {new Date(b.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })},{' '}
                                    {new Date(b.createdAt || b.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                </td>
                                <td className="px-6 py-4">{b.partyId?.name || 'Branch'}</td>
                                <td className="px-6 py-4 font-bold text-gray-900">{b.juiceType?.name || 'Item'}</td>
                                <td className="px-6 py-4 text-center">
                                    <span className={cn("px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide", b.type === 'IN' ? "bg-emerald-50 text-emerald-600" : "bg-orange-50 text-orange-600")}>
                                        {b.type}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right font-black text-gray-900">{b.quantity}</td>
                                <td className="px-6 py-4 text-center">
                                    <button className="text-gray-400 hover:text-gray-600" onClick={() => router.push('/branch-stock')}>
                                        <MoreHorizontal className="w-5 h-5 mx-auto" />
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {!reportLoading && activeTab === 'purchases' && dailyReport?.purchases?.map((p: any, idx: number) => (
                            <tr key={p._id} className="hover:bg-gray-50 transition-colors text-gray-700 font-medium">
                                <td className="px-6 py-4 text-gray-400 text-xs">{idx + 1}</td>
                                <td className="px-6 py-4 text-xs">
                                    {new Date(p.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })},{' '}
                                    {new Date(p.createdAt || p.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                </td>
                                <td className="px-6 py-4">{p.invoiceNumber || '-'}</td>
                                <td className="px-6 py-4 font-bold text-gray-900">{p.partyId?.name || p.supplier || 'Unknown'}</td>
                                <td className="px-6 py-4 text-right font-black text-gray-900">₹{(p.totalCost || p.cost || 0).toLocaleString()}</td>
                                <td className="px-6 py-4 text-center">
                                    {p.status === 'Paid' || p.status === 'paid' ? (
                                        <span className="text-emerald-500 font-bold text-xs">Paid</span>
                                    ) : (
                                        <span className="text-rose-500 font-bold text-xs">{p.status}</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <button className="text-gray-400 hover:text-gray-600" onClick={() => router.push('/purchases')}>
                                        <MoreHorizontal className="w-5 h-5 mx-auto" />
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {!reportLoading && (
                            (activeTab === 'sales' && (!dailyReport?.orders || dailyReport.orders.length === 0)) ||
                            (activeTab === 'production' && (!dailyReport?.productions || dailyReport.productions.length === 0)) ||
                            (activeTab === 'transfers' && (!dailyReport?.branchTransfers || dailyReport.branchTransfers.length === 0)) ||
                            (activeTab === 'purchases' && (!dailyReport?.purchases || dailyReport.purchases.length === 0))
                        ) && (
                            <tr>
                                <td colSpan={10} className="px-6 py-12 text-center text-gray-400 font-bold uppercase tracking-wider text-xs">
                                    No entries found for this period
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer / Pagination */}
            <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-white text-xs font-medium text-gray-500 mt-auto">
                <div>
                    Showing {activeTab === 'sales' ? (dailyReport?.orders?.length || 0) : activeTab === 'production' ? (dailyReport?.productions?.length || 0) : activeTab === 'transfers' ? (dailyReport?.branchTransfers?.length || 0) : (dailyReport?.purchases?.length || 0)} entries
                </div>
                <div className="flex items-center gap-1">
                    <button className="px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors opacity-50 cursor-not-allowed">Previous</button>
                    <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg font-bold shadow-sm">1</button>
                    <button className="px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors opacity-50 cursor-not-allowed">Next</button>
                </div>
            </div>
        </div>

      </main>
    </div>
  );
}

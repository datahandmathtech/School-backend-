'use client'
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import api from '@/services/api';
import toast from 'react-hot-toast';
import { 
  Activity,
  TrendingUp,
  Package,
  FlaskConical,
  ShoppingCart,
  AlertCircle,
  RefreshCcw,
  Clock,
  ChevronRight,
  ChevronLeft,
  Calendar as CalendarIcon,
  PlusCircle,
  MinusCircle,
  Zap,
  Box
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';
import { cn } from '@/utils/cn';

const LiveBoardClient = () => {
  const [stats, setStats] = useState<any>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dailyReport, setDailyReport] = useState<any>(null);
  const [reportLoading, setReportLoading] = useState(false);

  useEffect(() => {
    fetchData();
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
     fetchDailyReport();
     const dataTimer = setInterval(() => {
       fetchData();
       fetchDailyReport();
     }, 10000); // 10 seconds update for real "live" feel
     return () => clearInterval(dataTimer);
  }, [selectedDate]);

  const fetchData = async () => {
    try {
      const [statsRes, chartRes] = await Promise.all([
        api.get('/dashboard/stats'),
        api.get('/dashboard/sales-chart')
      ]);
      setStats(statsRes.data);
      setChartData(chartRes.data);
    } catch (error: any) {
      console.error('Live Board Fetch Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDailyReport = async () => {
      try {
          setReportLoading(true);
          const dateStr = selectedDate.toLocaleDateString('en-CA'); // YYYY-MM-DD
          const res = await api.get(`/dashboard/daily-report?date=${dateStr}`);
          setDailyReport(res.data);
      } catch (error) {
          toast.error('Failed to fetch daily report');
      } finally {
          setReportLoading(false);
      }
  }

  const changeDate = (days: number) => {
      const newDate = new Date(selectedDate);
      newDate.setDate(newDate.getDate() + days);
      setSelectedDate(newDate);
  }

  if (loading) return (
    <div className="flex h-screen bg-gray-50 items-center justify-center">
       <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      <Sidebar />
      <main className="flex-1 lg:ml-64 p-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Live Board</h1>
                <p className="text-gray-500 text-sm mt-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Real-time Business Feed
                </p>
            </div>

            {/* Custom Calendar UI */}
            <div className="bg-slate-900 p-1 rounded-3xl flex items-center shadow-lg">
                <button 
                    onClick={() => changeDate(-1)}
                    className="p-2.5 hover:bg-slate-800 rounded-full transition-all text-slate-400"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                
                <div className="px-6 py-2 bg-slate-900 border border-amber-500/20 rounded-2xl flex items-center gap-3 mx-1">
                    <CalendarIcon className="w-4 h-4 text-amber-500" />
                    <span className="text-base font-bold italic text-white tabular-nums">
                        {selectedDate.toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
                </div>

                <button 
                    onClick={() => changeDate(1)}
                    className="p-2.5 hover:bg-slate-800 rounded-full transition-all text-slate-400"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        </div>

        {/* Daily Stats Summary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <MetricCard 
                title="Sales" 
                value={dailyReport?.summary.totalSales} 
                prefix="₹" 
                color="blue" 
                icon={<TrendingUp className="w-4 h-4" />} 
            />
            <MetricCard 
                title="Production" 
                value={dailyReport?.summary.totalProduced} 
                color="emerald" 
                icon={<FlaskConical className="w-4 h-4" />} 
            />
            <MetricCard 
                title="Bottles In" 
                value={dailyReport?.summary.bottlesIn} 
                color="amber" 
                icon={<PlusCircle className="w-4 h-4" />} 
            />
            <MetricCard 
                title="Bottles Out" 
                value={dailyReport?.summary.bottlesOut} 
                color="rose" 
                icon={<MinusCircle className="w-4 h-4" />} 
            />
        </div>

        {/* Logs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Production Log */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <h3 className="font-bold text-gray-900 uppercase text-[10px] tracking-widest flex items-center gap-2">
                        <FlaskConical className="w-3.5 h-3.5 text-emerald-600" /> Production Log
                    </h3>
                </div>
                <div className="p-2 space-y-1 max-h-[350px] overflow-y-auto">
                    {dailyReport?.productions.map((p: any) => (
                        <div key={p._id} className="p-3 rounded-lg border border-transparent hover:border-emerald-100 hover:bg-emerald-50/30 transition-all">
                             <p className="text-[9px] font-bold uppercase text-gray-400 mb-0.5">{p.juiceType?.name}</p>
                             <div className="flex justify-between items-center">
                                 <h4 className="text-base font-bold text-gray-900">+{p.quantityProduced}</h4>
                                 <p className="text-[9px] font-medium text-gray-500 uppercase">{p.nameOfVerk}</p>
                             </div>
                        </div>
                    ))}
                    {!dailyReport?.productions?.length && <p className="p-6 text-center text-[10px] text-gray-400 font-bold uppercase">No records</p>}
                </div>
            </div>

            {/* Sales Log */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <h3 className="font-bold text-gray-900 uppercase text-[10px] tracking-widest flex items-center gap-2">
                        <ShoppingCart className="w-3.5 h-3.5 text-blue-600" /> Sales Ledger
                    </h3>
                </div>
                <div className="p-2 space-y-1 max-h-[350px] overflow-y-auto">
                    {dailyReport?.orders.map((o: any) => (
                        <div key={o._id} className="p-3 rounded-lg border border-transparent hover:border-blue-100 hover:bg-blue-50/30 transition-all">
                             <div className="flex justify-between items-start mb-0.5">
                                <p className="text-[9px] font-bold uppercase text-gray-900 truncate flex gap-1">
                                    <span>{o.customerName}</span>
                                    {o.invoiceNo && <span className="text-blue-500">[{o.invoiceNo}]</span>}
                                </p>
                                <span className="text-[8px] font-medium text-gray-400">
                                    {new Date(o.date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                                </span>
                             </div>
                             <div className="flex justify-between items-center">
                                 <h4 className="text-base font-bold text-blue-600">₹{o.totalAmount.toLocaleString()}</h4>
                                 <span className={cn(
                                     "text-[8px] font-bold uppercase px-1.5 py-0.5 rounded",
                                     o.paidAmount >= o.totalAmount ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                                 )}>{o.paidAmount >= o.totalAmount ? 'Paid' : 'Due'}</span>
                             </div>
                        </div>
                    ))}
                    {!dailyReport?.orders?.length && <p className="p-6 text-center text-[10px] text-gray-400 font-bold uppercase">No sales</p>}
                </div>
            </div>

            {/* Bottle Log */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <h3 className="font-bold text-gray-900 uppercase text-[10px] tracking-widest flex items-center gap-2">
                        <Package className="w-3.5 h-3.5 text-amber-600" /> Bottle Activity
                    </h3>
                </div>
                <div className="p-2 space-y-1 max-h-[350px] overflow-y-auto">
                    {dailyReport?.bottles.map((b: any, i: number) => (
                        <div key={i} className="p-3 rounded-lg border border-transparent hover:border-amber-100 hover:bg-amber-50/30 transition-all">
                             <div className="flex justify-between items-center mb-0.5">
                                <p className="text-[9px] font-bold uppercase text-gray-500">{b.bottleType}</p>
                                <span className={cn(
                                     "text-[8px] font-bold px-1.5 py-0.5 rounded",
                                     b.type === 'IN' ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                )}>{b.type}</span>
                             </div>
                             <div className="flex justify-between items-center">
                                 <h4 className={cn("text-base font-bold", b.type === 'IN' ? "text-green-600" : "text-red-600")}>
                                     {b.type === 'IN' ? '+' : '-'}{b.quantity}
                                 </h4>
                                 <p className="text-[8px] font-medium text-gray-400 uppercase truncate max-w-[80px]">{b.description || 'Update'}</p>
                             </div>
                        </div>
                    ))}
                    {!dailyReport?.bottles?.length && <p className="p-6 text-center text-[10px] text-gray-400 font-bold uppercase">No activity</p>}
                </div>
            </div>
        </div>

        {/* Chart Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-gray-900 uppercase text-xs tracking-widest flex items-center gap-2">
                    <Activity className="w-4 h-4 text-blue-600" /> Performance
                </h3>
                <RefreshCcw onClick={fetchData} className="w-3.5 h-3.5 text-gray-400 hover:text-blue-600 cursor-pointer transition-all" />
            </div>
            <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                        <XAxis 
                            dataKey="date" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fill: '#94a3b8', fontSize: 9}} 
                            tickFormatter={(val) => new Date(val).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
                        />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 9}} />
                        <Tooltip contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                        <Area type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2.5} fillOpacity={1} fill="url(#chartGradient)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>

      </main>
    </div>
  );
};

const MetricCard = ({ title, value, prefix = '', color, icon }: any) => {
    const colorClasses: any = {
        blue: 'text-blue-600 bg-blue-50',
        emerald: 'text-emerald-600 bg-emerald-50',
        amber: 'text-amber-600 bg-amber-50',
        rose: 'text-rose-600 bg-rose-50'
    };

    return (
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all group">
            <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center mb-3 transition-transform group-hover:scale-110", colorClasses[color])}>
                {icon}
            </div>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">{title}</p>
            <h4 className="text-xl font-bold text-gray-900 tabular-nums">
                {prefix}{typeof value === 'number' ? value.toLocaleString() : value || '0'}
            </h4>
        </div>
    );
};

export default LiveBoardClient;

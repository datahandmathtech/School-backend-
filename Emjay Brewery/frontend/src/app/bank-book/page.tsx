'use client'
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import api from '@/services/api';
import toast from 'react-hot-toast';
import { 
  Plus, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Wallet, 
  Calendar,
  History,
  Trash2,
  TrendingUp,
  TrendingDown,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  XCircle
} from 'lucide-react';
import MonthYearFilter from '@/components/MonthYearFilter';
import { cn } from '@/utils/cn';
import { motion, AnimatePresence } from 'framer-motion';

const BankBook = () => {
  const [data, setData] = useState<any>({ logs: [], stats: { totalIn: 0, totalOut: 0, balance: 0 } });
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<'day' | 'month'>('day');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form, setForm] = useState({
    type: 'IN',
    amount: '',
    category: 'Sale',
    paymentMode: 'Online/UPI',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const params: any = {};
      if (filterType === 'day') {
        params.date = selectedDate;
      } else {
        params.month = selectedMonth;
        params.year = selectedYear;
      }
      const res = await api.get('/bank-book', { params });
      setData(res.data);
    } catch (error) {
      toast.error('Failed to load bank book');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedMonth, selectedYear, selectedDate, filterType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/bank-book', form);
      toast.success('Entry added');
      setIsModalOpen(false);
      setForm({ type: 'IN', amount: '', category: 'Sale', paymentMode: 'Online/UPI', description: '', date: new Date().toISOString().split('T')[0] });
      fetchData();
    } catch (error) {
      toast.error('Failed to save entry');
    }
  };

  const deleteEntry = async (id: string) => {
    if (!confirm('Delete this entry?')) return;
    try {
      await api.delete(`/bank-book/${id}`);
      toast.success('Entry deleted');
      fetchData();
    } catch (error) {
      toast.error('Delete failed');
    }
  };

  if (loading) return <div className="flex h-screen bg-gray-50 items-center justify-center font-bold text-gray-400">Loading Bank Book...</div>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 lg:ml-64 p-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Bank Book</h1>
            <p className="text-sm text-gray-500 mt-1">Real-time online bank payments and inflows</p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex bg-white rounded-xl border p-1 shadow-sm">
              <button 
                onClick={() => setFilterType('day')} 
                className={cn("px-4 py-2 text-xs font-bold rounded-lg transition-all", filterType === 'day' ? "bg-indigo-50 text-indigo-700" : "text-gray-500 hover:bg-gray-50")}
              >
                Daily
              </button>
              <button 
                onClick={() => setFilterType('month')} 
                className={cn("px-4 py-2 text-xs font-bold rounded-lg transition-all", filterType === 'month' ? "bg-indigo-50 text-indigo-700" : "text-gray-500 hover:bg-gray-50")}
              >
                Monthly
              </button>
            </div>
            
            {filterType === 'day' ? (
              <div className="flex items-center gap-2 bg-white border border-gray-200 p-1.5 rounded-xl shadow-sm">
                <button 
                  onClick={() => {
                    const d = new Date(selectedDate);
                    d.setDate(d.getDate() - 1);
                    const y = d.getFullYear(); const m = String(d.getMonth()+1).padStart(2,'0'); const date = String(d.getDate()).padStart(2,'0');
                    setSelectedDate(`${y}-${m}-${date}`);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-2 px-2 border-x border-gray-100">
                  <CalendarDays className="w-4 h-4 text-indigo-600" />
                  <input 
                    type="date" 
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="text-sm font-bold text-gray-700 outline-none bg-transparent cursor-pointer"
                  />
                </div>
                <button 
                  onClick={() => {
                    const d = new Date(selectedDate);
                    d.setDate(d.getDate() + 1);
                    const y = d.getFullYear(); const m = String(d.getMonth()+1).padStart(2,'0'); const date = String(d.getDate()).padStart(2,'0');
                    setSelectedDate(`${y}-${m}-${date}`);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <MonthYearFilter 
                selectedMonth={selectedMonth} 
                selectedYear={selectedYear} 
                onFilterChange={(m, y) => { setSelectedMonth(m); setSelectedYear(y); }} 
              />
            )}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/10 active:scale-95 text-sm"
            >
              <Plus className="w-5 h-5" />
              New Entry
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Income (In)</p>
              <h3 className="text-2xl font-black text-emerald-600">
                <span className="text-sm opacity-50">+</span> ₹{data.stats.totalIn.toLocaleString()}
              </h3>
            </div>
            <div className="flex justify-end mt-4">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><TrendingUp className="w-5 h-5" /></div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Expense (Out)</p>
              <h3 className="text-2xl font-black text-rose-600">
                <span className="text-sm opacity-50">-</span> ₹{data.stats.totalOut.toLocaleString()}
              </h3>
            </div>
            <div className="flex justify-end mt-4">
              <div className="p-2 bg-rose-50 text-rose-600 rounded-lg"><TrendingDown className="w-5 h-5" /></div>
            </div>
          </div>
          <div className={cn(
            "p-6 rounded-2xl border flex flex-col justify-between shadow-xl transition-all",
            data.stats.balance >= 0 ? "bg-slate-900 border-slate-800" : "bg-red-900 border-red-800"
          )}>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Current Balance</p>
              <h3 className="text-2xl font-black text-white italic tracking-tighter">₹{data.stats.balance.toLocaleString()}</h3>
            </div>
            <div className="flex justify-end mt-4">
              <div className="p-2 bg-white/10 text-white rounded-lg"><Wallet className="w-5 h-5" /></div>
            </div>
          </div>
        </div>

        {/* Entries Table */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center gap-3 bg-gray-50/50">
            <div className="p-2 bg-blue-600 text-white rounded-lg"><History className="w-5 h-5" /></div>
            <h3 className="font-bold text-gray-900 uppercase text-sm tracking-tight">Recent Transactions</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-widest border-b border-gray-100">
                <tr>
                  <th className="px-8 py-4">Date</th>
                  <th className="px-8 py-4">Particulars / Party Details</th>
                  <th className="px-8 py-4">Category</th>
                  <th className="px-8 py-4 text-emerald-600">Debit (IN)</th>
                  <th className="px-8 py-4 text-rose-600">Credit (OUT)</th>
                  <th className="px-8 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[...data.logs].sort((a,b) => {
                    const d1 = new Date(b.date).getTime() - new Date(a.date).getTime();
                    if (d1 === 0 && b.createdAt && a.createdAt) return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                    return d1;
                }).map((log: any) => (
                  <tr key={log._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-8 py-5 text-xs font-bold text-gray-500">
                      {new Date(log.date).toLocaleDateString()}
                    </td>
                    <td className="px-8 py-5">
                      <p className="font-bold text-gray-900 text-sm">{log.description || 'No description'}</p>
                      {log.isAutoGenerated && log.paymentStatus && log.paymentStatus !== 'paid' && (
                        <span className={cn(
                          "text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full mt-1 inline-block",
                          log.paymentStatus === 'partial' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-600'
                        )}>
                          {log.paymentStatus === 'partial' ? 'Partial' : 'Unpaid / Due'}
                        </span>
                      )}
                    </td>
                    <td className="px-8 py-5">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-gray-100 text-gray-600">
                        {log.category}
                      </span>
                    </td>
                    <td className="px-8 py-5 font-bold text-emerald-600">
                      {log.type === 'IN' ? `₹${log.amount.toLocaleString()}` : '-'}
                    </td>
                    <td className="px-8 py-5 font-bold text-rose-600">
                      {log.type === 'OUT' ? `₹${log.amount.toLocaleString()}` : '-'}
                    </td>
                    <td className="px-8 py-5 text-right">
                      {!log.isAutoGenerated ? (
                        <button onClick={() => deleteEntry(log._id)} className="text-gray-300 hover:text-red-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      ) : (
                        <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">Auto</span>
                      )}
                    </td>
                  </tr>
                ))}
                {data.logs.length === 0 && (
                  <tr>
                    <td colSpan={7} className="p-16 text-center text-gray-400 font-bold">No transactions found for this period.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Entry Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
              <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white rounded-2xl w-full max-w-lg z-50 relative shadow-xl overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">New Cash Book Entry</h2>
                  <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors"><XCircle className="w-6 h-6" /></button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Type</label>
                      <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm font-bold text-gray-800 outline-none" value={form.type} onChange={e => setForm({...form, type: e.target.value, category: e.target.value === 'IN' ? 'Sale' : 'Salary'})}>
                        <option value="IN">Income</option>
                        <option value="OUT">Expense</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Date</label>
                      <input type="date" required className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm font-bold text-gray-800 outline-none" value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Category</label>
                      <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm font-bold text-gray-800 outline-none" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                        {form.type === 'IN' ? (
                          <>
                            <option>Sale</option>
                            <option>Capital Introduced</option>
                            <option>Other Income</option>
                            <option>Loan Received</option>
                            <option>Refund Received</option>
                            <option>Miscellaneous Income</option>
                          </>
                        ) : (
                          <>
                            <option>Salary</option>
                            <option>Rent</option>
                            <option>Electricity</option>
                            <option>Fuel</option>
                            <option>Maintenance</option>
                            <option>Marketing</option>
                            <option>Internet</option>
                            <option>Courier</option>
                            <option>Travel</option>
                            <option>Office Expense</option>
                            <option>Miscellaneous</option>
                          </>
                        )}
                      </select>
                    </div>
                    <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-600">Payment Mode</label>
                    <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      value={form.paymentMode} onChange={e => setForm({ ...form, paymentMode: e.target.value })}>
                      <option value="Online/UPI">Online / UPI</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="NEFT/RTGS">NEFT / RTGS</option>
                      <option value="Cheque">Cheque</option>
                    </select>
                  </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest text-blue-600">Amount (₹)</label>
                    <input type="number" required className="w-full bg-blue-50 border border-blue-100 rounded-lg px-4 py-4 text-2xl font-black text-blue-600 outline-none" placeholder="0" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Description</label>
                    <textarea className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm font-bold text-gray-800 outline-none h-24" placeholder="Enter details..." value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
                  </div>

                  <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold uppercase tracking-wider shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-[0.98]">
                    Save Transaction
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </main>
    </div>
  );
};

export default BankBook;

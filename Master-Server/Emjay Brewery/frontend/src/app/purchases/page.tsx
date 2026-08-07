'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import api from '@/services/api';
import toast from 'react-hot-toast';
import {
  Plus,
  ShoppingCart,
  Search,
  XCircle,
  TrendingDown,
  Activity,
  Trash2,
  Edit,
  Package,
  Truck,
  IndianRupee,
  Eye,
  Image as ImageIcon
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { motion, AnimatePresence } from 'framer-motion';
import MonthYearFilter from '@/components/MonthYearFilter';

const PurchasesPage = () => {
  const router = useRouter();
  const [purchases, setPurchases] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({ totalCost: 0, pending: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [returnToVendorId, setReturnToVendorId] = useState<string | null>(null);
  const [isVendorModalOpen, setIsVendorModalOpen] = useState(false);
  const [selectedProfileVendor, setSelectedProfileVendor] = useState<any>(null);
  const [selectedBillImage, setSelectedBillImage] = useState<string | null>(null);
  const [vendorForm, setVendorForm] = useState({ _id: '', name: '', phone: '', email: '', address: '', hasGST: 'No', gstNo: '', type: 'supplier', openingBalance: '' });
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState('All');
  const [selectedSupplier, setSelectedSupplier] = useState('All');
  const [activeTab, setActiveTab] = useState<'list' | 'vendors'>('list');
  const [vendors, setVendors] = useState<any[]>([]);
  const [searchVendor, setSearchVendor] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('tab') === 'vendors') {
        setActiveTab('vendors');
      }
    }
  }, []);
  
  const flatPurchases = purchases.flatMap(p => {
      const supplierName = p.partyId ? vendors.find(v => v._id === p.partyId)?.name || 'Unknown' : p.supplier || '-';
      if (p.items && p.items.length > 0) {
        return p.items.map((item: any, idx: number) => ({
          ...p,
          _rowId: `${p._id}_${idx}`,
          displayItem: item.name,
          displayCategory: item.category,
          displayCost: item.amount,
          isGrouped: p.items.length > 1,
          displaySupplier: supplierName
        }));
      }
      return [{
        ...p,
        _rowId: p._id,
        displayItem: p.item,
        displayCategory: p.category,
        displayCost: p.totalCost || p.cost || 0,
        isGrouped: false,
        displaySupplier: supplierName
      }];
  });

  const uniqueItems = Array.from(new Set(flatPurchases.map(p => p.displayItem).filter(Boolean))).sort();
  const uniqueCategories = Array.from(new Set(flatPurchases.map(p => p.displayCategory).filter(Boolean))).sort();
  const uniqueSuppliers = Array.from(new Set(flatPurchases.map(p => p.displaySupplier).filter(Boolean))).sort();

  const activeFilteredPurchases = flatPurchases.filter(p => {
      const matchCat = selectedCategory === 'All' || p.displayCategory === selectedCategory;
      const matchItem = selectedItem === 'All' || p.displayItem === selectedItem;
      const matchSup = selectedSupplier === 'All' || p.displaySupplier === selectedSupplier;
      return matchCat && matchItem && matchSup;
  }).sort((a, b) => {
      const d1 = new Date(b.date).getTime() - new Date(a.date).getTime();
      if (d1 === 0 && b.createdAt && a.createdAt) return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return d1;
  });

  const filteredTotalSpend = activeFilteredPurchases.reduce((acc, p) => acc + (p.displayCost || 0), 0);

  const [form, setForm] = useState({
    items: [{ name: '', category: 'Raw Materials', quantity: 1, unit: 'Units', numberOfPieces: '', rate: 0, amount: 0 }],
    totalCost: 0,
    partyId: '',
    invoiceNumber: '',
    status: 'Cash',
    paidCash: '' as string | number,
    paidOnline: '' as string | number,
    date: new Date().toISOString().split('T')[0],
    description: '',
    billImage: ''
  });

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...form.items];
    (newItems[index] as any)[field] = value;
    if (field === 'quantity' || field === 'rate') {
        newItems[index].amount = (Number(newItems[index].quantity) || 0) * (Number(newItems[index].rate) || 0);
    }
    const newTotal = newItems.reduce((acc, item) => acc + item.amount, 0);
    setForm({ ...form, items: newItems, totalCost: newTotal });
  };
  
  const addItem = () => {
    setForm({ ...form, items: [...form.items, { name: '', category: 'Raw Materials', quantity: 1, unit: 'Units', numberOfPieces: '', rate: 0, amount: 0 }] });
  };
  
  const removeItem = (index: number) => {
    const newItems = form.items.filter((_, i) => i !== index);
    const newTotal = newItems.reduce((acc, item) => acc + item.amount, 0);
    setForm({ ...form, items: newItems, totalCost: newTotal });
  };

  const handleFileUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, billImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVendorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...vendorForm,
        gstRegistered: vendorForm.hasGST === 'Yes',
        gstNumber: vendorForm.gstNo,
        openingBalance: vendorForm.openingBalance || '0'
      };
      
      if (vendorForm._id) {
        await api.put(`/parties/${vendorForm._id}`, payload);
        toast.success('Vendor Updated');
      } else {
        const { _id, ...postPayload } = payload;
        await api.post('/parties', postPayload);
        toast.success('Vendor Created');
      }
      setIsVendorModalOpen(false);
      setVendorForm({ _id: '', name: '', phone: '', email: '', address: '', hasGST: 'No', gstNo: '', type: 'supplier', openingBalance: '' });
      fetchData();
    } catch (error) {
      toast.error('Failed to save vendor');
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const [listRes, statsRes, vendorRes] = await Promise.all([
        api.get('/purchases', { params: { month: selectedMonth, year: selectedYear } }),
        api.get('/purchases/stats'),
        api.get('/parties')
      ]);
      setPurchases(listRes.data);
      setStats(statsRes.data);
      setVendors(vendorRes.data.filter((p: any) => p.type === 'supplier'));
    } catch (error) {
      toast.error('Could not load data');
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    // On first load, recalculate all vendor balances to fix any corrupted data
    api.get('/parties/recalculate').catch(() => {});
    fetchData();
  }, [selectedMonth, selectedYear]);

  useEffect(() => {
    if (purchases.length > 0 && typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const editPurchaseId = params.get('editPurchase');
      const returnVendor = params.get('returnToVendor');
      if (editPurchaseId) {
        if (returnVendor) setReturnToVendorId(returnVendor);
        const purchaseToEdit = purchases.find(p => p._id === editPurchaseId);
        if (purchaseToEdit) {
          startEdit(purchaseToEdit);
          // Remove the query parameter so it doesn't trigger again
          const newUrl = window.location.pathname + (params.get('tab') ? `?tab=${params.get('tab')}` : '');
          window.history.replaceState({}, '', newUrl);
        }
      }
    }
  }, [purchases]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let payload: any = { ...form };
      if (payload.status === 'Split') {
        payload.dueAmount = payload.totalCost - (Number(payload.paidCash) || 0) - (Number(payload.paidOnline) || 0);
        if (payload.dueAmount < 0) payload.dueAmount = 0;
      } else {
        payload.paidCash = 0;
        payload.paidOnline = 0;
      }

      if (!payload.partyId) {
        toast.error('Selecting a Vendor is mandatory');
        return;
      }

      if (editingItem) {
        await api.put(`/purchases/${editingItem._id}`, payload);
        toast.success('Updated');
      } else {
        await api.post('/purchases', payload);
        toast.success('Recorded');
      }
      closeModal();
      fetchData();
    } catch (error) {
      toast.error('Save failed');
    }
  };

  const deleteRecord = async (id: string) => {
    if (!confirm('Are you sure you want to delete this record?')) return;
    try {
      await api.delete(`/purchases/${id}`);
      toast.success('Deleted');
      fetchData();
    } catch (error) {
      toast.error('Deletion failed');
    }
  };

  const deleteVendor = async (id: string) => {
    if (!confirm('Are you sure? This will delete the vendor and ALL their transaction history.')) return;
    try {
      await api.delete(`/parties/${id}`);
      toast.success('Vendor deleted');
      fetchData();
    } catch (error) {
      toast.error('Could not delete vendor');
    }
  };

  const startEdit = (item: any) => {
    setEditingItem(item);
    setForm({
      items: item.items && item.items.length ? item.items.map((i: any) => ({...i, numberOfPieces: i.numberOfPieces || ''})) : [{ name: item.item || '', category: item.category || 'Raw Materials', quantity: Number(item.quantity) || 1, unit: item.unit || 'Units', numberOfPieces: item.numberOfPieces || '', rate: item.cost || 0, amount: item.cost || 0 }],
      totalCost: item.totalCost || item.cost || 0,
      partyId: item.partyId || '',
      invoiceNumber: item.invoiceNumber || '',
      status: item.status || 'Cash',
      paidCash: item.paidCash || '',
      paidOnline: item.paidOnline || '',
      date: new Date(item.date).toISOString().split('T')[0],
      description: item.description || '',
      billImage: item.billImage || ''
    });
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setForm({
      items: [{ name: '', category: 'Raw Materials', quantity: 1, unit: 'Units', numberOfPieces: '', rate: 0, amount: 0 }],
      totalCost: 0,
      partyId: '', invoiceNumber: '', status: 'Cash', paidCash: '', paidOnline: '', date: new Date().toISOString().split('T')[0], description: '', billImage: ''
    });
    setEditingItem(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
    if (returnToVendorId) {
      router.push(`/vendors/?id=${returnToVendorId}`);
    }
  };

  if (loading) return (
    <div className="flex h-screen bg-gray-50 items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 lg:ml-64 p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Purchases</h1>
            <p className="text-sm text-gray-500 mt-1">Track brewery expenses and raw materials</p>
          </div>
          <div className="flex items-center gap-3">
            <MonthYearFilter
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
              onFilterChange={(m, y) => { setSelectedMonth(m); setSelectedYear(y); }}
            />
            {activeTab === 'list' && (
              <button
                onClick={() => { resetForm(); setIsModalOpen(true); }}
                className="btn-primary flex items-center gap-2 whitespace-nowrap"
              >
                <Plus className="w-5 h-5" />
                New Purchase
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-white p-1 rounded-xl border border-gray-200 w-fit mb-8 shadow-sm">
          <button
            onClick={() => setActiveTab('list')}
            className={cn(
              "px-6 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2",
              activeTab === 'list' ? "bg-slate-900 text-white shadow-md" : "text-gray-500 hover:bg-slate-50"
            )}
          >
            <Package className="w-4 h-4" />
            Purchase History
          </button>
          <button
            onClick={() => setActiveTab('vendors')}
            className={cn(
              "px-6 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2",
              activeTab === 'vendors' ? "bg-slate-900 text-white shadow-md" : "text-gray-500 hover:bg-slate-50"
            )}
          >
            <Truck className="w-4 h-4" />
            Vendors / Suppliers
          </button>
        </div>

        {activeTab === 'list' ? (
          <>

            <div className="flex flex-wrap gap-4 mb-8">
              <div className="bg-white border border-gray-200 rounded-2xl flex items-center p-4 gap-4 flex-1 min-w-[220px] shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <IndianRupee className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">Total Spend (Filtered)</p>
                  <h4 className="text-xl font-bold text-gray-900 tracking-tight">₹{filteredTotalSpend.toLocaleString()}</h4>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl flex items-center p-4 gap-4 flex-1 min-w-[220px] shadow-sm">
                <div className="flex-1">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Item Filter</p>
                  <select 
                    value={selectedItem}
                    onChange={(e) => setSelectedItem(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-700 font-medium text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
                  >
                    <option value="All">All Items</option>
                    {uniqueItems.map(item => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl flex items-center p-4 gap-4 flex-1 min-w-[220px] shadow-sm">
                <div className="flex-1">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Category Filter</p>
                  <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-700 font-medium text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
                  >
                    <option value="All">All Categories</option>
                    {uniqueCategories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl flex items-center p-4 gap-4 flex-1 min-w-[220px] shadow-sm">
                <div className="flex-1">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Supplier Filter</p>
                  <select 
                    value={selectedSupplier}
                    onChange={(e) => setSelectedSupplier(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-700 font-medium text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
                  >
                    <option value="All">All Suppliers</option>
                    {uniqueSuppliers.map(sup => (
                      <option key={sup} value={sup}>{sup}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-10">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/10">
                <h3 className="font-bold text-gray-900">All Purchases</h3>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" placeholder="Search..." className="border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm outline-none w-64" />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Item</th>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4">Supplier</th>
                      <th className="px-6 py-4">Cost</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {activeFilteredPurchases.map(p => (
                      <tr key={p._rowId} className={cn("hover:bg-gray-50 transition-colors", p.isGrouped ? "border-l-4 border-l-indigo-200" : "")}>
                        <td className="px-6 py-4 text-sm font-medium text-gray-600">{new Date(p.date).toLocaleDateString()}</td>
                        <td className="px-6 py-4 font-bold text-gray-900">
                          {p.displayItem}
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-lg font-medium">
                            {p.displayCategory}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600 font-medium">
                          {p.displaySupplier}
                        </td>
                        <td className="px-6 py-4 text-gray-600 font-medium">₹{(p.displayCost || 0).toLocaleString()}</td>
                        <td className="px-6 py-4">
                          {p.status === 'Split' ? (
                            <div className="flex flex-col gap-1">
                              <span className="px-2 py-1 bg-purple-100 text-purple-700 text-[10px] font-bold rounded w-fit">SPLIT</span>
                              <span className="text-[10px] text-gray-500">
                                Cash: ₹{p.paidCash || 0} | UPI: ₹{p.paidOnline || 0}
                                {(p.dueAmount || 0) > 0 && ` | Due: ₹${p.dueAmount}`}
                              </span>
                            </div>
                          ) : (
                            <span className={cn(
                              "px-3 py-1 rounded-full text-xs font-bold",
                              p.status === 'Cash' || p.status === 'Paid' ? 'bg-green-100 text-green-700' :
                                p.status === 'UPI' ? 'bg-blue-100 text-blue-700' :
                                  'bg-red-100 text-red-700'
                            )}>{p.status}</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-3">
                            {p.billImage && (
                              <button 
                                onClick={() => setSelectedBillImage(p.billImage)}
                                className="p-1.5 text-slate-400 hover:text-indigo-600 transition-colors"
                                title="View Bill"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                            )}
                            <button onClick={() => startEdit(p)} className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors"><Edit className="w-4 h-4" /></button>
                            <button onClick={() => deleteRecord(p._id)} className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm gap-4">
              <div className="relative w-full max-w-md">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search vendors..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none"
                  value={searchVendor}
                  onChange={e => setSearchVendor(e.target.value)}
                />
              </div>
              <button 
                onClick={() => {
                  setVendorForm({ _id: '', name: '', phone: '', email: '', address: '', hasGST: 'No', gstNo: '', type: 'supplier', openingBalance: '' });
                  setIsVendorModalOpen(true);
                }} 
                className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-95 w-full md:w-auto"
              >
                <div className="bg-white/20 rounded-lg p-1">
                  <Plus className="w-4 h-4" />
                </div>
                Enlist New Vendor
              </button>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl shadow-blue-900/5 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-slate-50 to-white text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-gray-100">
                      <th className="px-8 py-5">Vendor Details</th>
                      <th className="px-8 py-5">Last Purchase</th>
                      <th className="px-8 py-5">Contact</th>
                      <th className="px-8 py-5 text-right">Net Balance</th>
                      <th className="px-8 py-5 text-center">Status</th>
                      <th className="px-8 py-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {vendors.filter(v => v.name.toLowerCase().includes(searchVendor.toLowerCase())).map(v => (
                      <tr 
                        key={v._id} 
                        onClick={() => router.push(`/vendors?id=${v._id}`)}
                        className="group hover:bg-blue-50/50 transition-all duration-300 cursor-pointer"
                      >
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-4">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedProfileVendor(v);
                              }}
                              className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center text-blue-600 shadow-sm border border-blue-100/50 hover:scale-110 hover:rotate-3 hover:shadow-blue-200 transition-all duration-300 cursor-pointer"
                              title="View Vendor Profile"
                            >
                              <Truck className="w-5 h-5" />
                            </button>
                            <div>
                              <h4 
                                className="font-black text-slate-900 text-sm tracking-tight group-hover:text-blue-700 transition-colors"
                              >
                                {v.name}
                              </h4>
                              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-1">Supplier / Vendor</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          {v.lastTransactionDate ? (
                            <div className="flex items-center gap-2 text-slate-600 bg-slate-50 w-max px-3 py-1.5 rounded-lg border border-slate-100">
                              <Activity className="w-3.5 h-3.5 text-blue-500" />
                              <span className="text-xs font-bold">{new Date(v.lastTransactionDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                            </div>
                          ) : (
                            <span className="text-xs font-bold text-slate-300">-</span>
                          )}
                        </td>
                        <td className="px-8 py-5 space-y-2">
                          <div className="inline-flex items-center px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-100 text-xs font-bold text-slate-600 shadow-sm">
                            {v.phone || 'No Contact Info'}
                          </div>
                          <div>
                            {v.gstRegistered ? (
                                <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-1 rounded font-bold uppercase tracking-wider border border-blue-100">GST: {v.gstNumber}</span>
                            ) : (
                                <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-1 rounded font-bold uppercase tracking-wider">Unregistered</span>
                            )}
                          </div>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <p className={cn(
                              "text-xl font-black tracking-tighter",
                              (v.balance || 0) >= 0 ? "text-emerald-500" : "text-rose-500"
                          )}>{/* Removed minus sign */}₹{Math.abs(v.balance || 0).toLocaleString()}</p>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">
                            {(v.balance || 0) >= 0 ? ((v.balance || 0) === 0 ? 'Settled' : 'Advance Paid') : 'Amount Payable'}
                          </p>
                        </td>
                        <td className="px-8 py-5 text-center">
                          <span className={cn(
                            "inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm border transition-all",
                            (v.balance || 0) >= 0 
                                ? "bg-emerald-50 text-emerald-600 border-emerald-100 shadow-emerald-100/20" 
                                : "bg-rose-50 text-rose-600 border-rose-100 shadow-rose-100/20"
                          )}>
                            <span className={cn("w-1.5 h-1.5 rounded-full animate-pulse", (v.balance || 0) >= 0 ? "bg-emerald-500" : "bg-rose-500")} />
                            {(v.balance || 0) >= 0 ? 'Account Clear' : 'Action Required'}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => router.push(`/vendors?id=${v._id}`)}
                              className="p-2 text-blue-400 hover:text-blue-600 bg-white hover:bg-blue-50 rounded-lg shadow-sm border border-slate-100 transition-colors"
                              title="Go to Ledger"
                            >
                              <Activity className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => deleteVendor(v._id)}
                              className="p-2 text-rose-400 hover:text-rose-600 bg-white hover:bg-rose-50 rounded-lg shadow-sm border border-slate-100 transition-colors"
                              title="Delete Vendor"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {!vendors.length && <tr><td colSpan={4} className="p-16 text-center">
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-slate-50 border border-slate-100 mb-6 shadow-inner">
                        <Truck className="w-8 h-8 text-slate-300" />
                      </div>
                      <h3 className="font-black text-slate-900 text-lg">No Vendors Found</h3>
                      <p className="text-slate-500 text-sm mt-2 font-medium">Add a party or create a new purchase to automatically track vendors.</p>
                    </td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={closeModal}></div>
            <div className="bg-white rounded-xl w-full max-w-2xl z-50 relative shadow-xl overflow-hidden max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                <h2 className="text-lg font-bold text-gray-900">{editingItem ? 'Edit Purchase' : 'New Purchase (Multiple Items)'}</h2>
                <button onClick={closeModal}><XCircle className="w-6 h-6 text-gray-400" /></button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-600">Supplier / Vendor (Required)</label>
                    <select
                      className="input-field"
                      required
                      value={form.partyId}
                      onChange={e => setForm({ ...form, partyId: e.target.value })}
                    >
                      <option value="" disabled>Select Vendor</option>
                      {vendors.map(v => (
                        <option key={v._id} value={v._id}>{v.name}</option>
                      ))}
                    </select>
                    {form.partyId && (
                      <div className="mt-1.5 flex items-center">
                        {vendors.find(v => v._id === form.partyId)?.gstRegistered ? (
                          <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded border border-blue-100 font-bold uppercase tracking-wider shadow-sm">
                            GST: {vendors.find(v => v._id === form.partyId)?.gstNumber}
                          </span>
                        ) : (
                          <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded border border-gray-200 font-bold uppercase tracking-wider shadow-sm">
                            GST Unregistered
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-600">Invoice Number</label>
                    <input type="text" className="input-field" placeholder="Optional" value={form.invoiceNumber} onChange={e => setForm({ ...form, invoiceNumber: e.target.value })} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-600">Purchase Date</label>
                    <input type="date" className="input-field" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
                  </div>
                </div>

                <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-4">
                    <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold text-sm text-slate-700">Items List</h4>
                        <button type="button" onClick={addItem} className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-lg font-bold hover:bg-indigo-200 transition-colors">+ Add Item</button>
                    </div>
                    {form.items.map((item, index) => (
                        <div key={index} className="grid grid-cols-12 gap-3 items-end bg-white p-3 rounded-xl border border-slate-200 shadow-sm relative transition-all hover:border-blue-200">
                            <div className="col-span-3">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Item Name</label>
                                <input type="text" required className="w-full text-xs p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" value={item.name} onChange={e => updateItem(index, 'name', e.target.value)} placeholder="e.g. Malt" />
                            </div>
                            <div className="col-span-2">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Category</label>
                                <select className="w-full text-xs p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white" value={item.category} onChange={e => updateItem(index, 'category', e.target.value)}>
                                    <option>Raw Materials</option>
                                    
                                    <option>Packaging</option>
                                    <option>Machinery</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div className="col-span-3">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Qty & Unit</label>
                                <div className="flex gap-1.5">
                                    <input type="number" required className="w-1/2 text-xs p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" value={item.quantity} onChange={e => updateItem(index, 'quantity', e.target.value)} placeholder="0" />
                                    <select className="w-1/2 text-xs p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white" value={item.unit || 'Units'} onChange={e => updateItem(index, 'unit', e.target.value)}>
                                        <option>Units</option>
                                        <option>Pieces</option>
                                        <option>Pcs</option>
                                        <option>KG</option>
                                        <option>GM</option>
                                        <option>Ltr</option>
                                        <option>ML</option>
                                        <option>Boxes</option>
                                        <option>Bags</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-span-2">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Rate (₹)</label>
                                <input type="number" required className="w-full text-xs p-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" value={item.rate} onChange={e => updateItem(index, 'rate', e.target.value)} placeholder="0" />
                            </div>
                            <div className="col-span-1">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Total</label>
                                <div className="w-full text-xs py-2.5 px-1 bg-slate-50 border border-slate-100 rounded-lg font-black text-slate-700 text-center">₹{item.amount}</div>
                            </div>
                            <div className="col-span-1 flex items-end justify-center pb-2">
                                {form.items.length > 1 ? (
                                    <button type="button" onClick={() => removeItem(index)} className="p-2 text-rose-500 hover:bg-rose-50 hover:text-rose-600 rounded-lg transition-colors border border-transparent hover:border-rose-100" title="Remove Item">
                                        <Trash2 className="w-4 h-4 mx-auto" />
                                    </button>
                                ) : (
                                    <div className="w-8 h-8"></div>
                                )}
                            </div>
                        </div>
                    ))}
                    <div className="text-right font-black text-slate-800 text-lg mt-4">
                        Total Bill: ₹{form.totalCost.toLocaleString()}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-600">Upload Bill (Camera/Photo)</label>
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="w-full text-xs border p-2 rounded-xl bg-white" />
                    {form.billImage && <img src={form.billImage} alt="Bill Preview" className="h-16 mt-2 rounded border" />}
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-600">Payment Status</label>
                    <select className="input-field" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                      <option value="Cash">Cash Only</option>
                      <option value="UPI">UPI / Online Only</option>
                      <option value="Split">Split (Cash + UPI)</option>
                      <option value="Due">Due / Unpaid</option>
                    </select>
                  </div>
                </div>

                {form.status === 'Split' && (
                  <div className="grid grid-cols-3 gap-4 border border-indigo-100 bg-indigo-50/50 p-4 rounded-xl">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-600">Cash Paid</label>
                      <input type="number" className="input-field" placeholder="₹0" value={form.paidCash} onChange={e => setForm({ ...form, paidCash: e.target.value })} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-600">Online/UPI Paid</label>
                      <input type="number" className="input-field" placeholder="₹0" value={form.paidOnline} onChange={e => setForm({ ...form, paidOnline: e.target.value })} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-600">Due Amount</label>
                      <div className="input-field bg-gray-100 text-gray-500 font-bold flex items-center">
                        ₹{Math.max(0, form.totalCost - (Number(form.paidCash) || 0) - (Number(form.paidOnline) || 0)).toLocaleString()}
                      </div>
                    </div>
                  </div>
                )}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600">Notes / Description</label>
                  <input type="text" className="input-field" placeholder="Optional notes" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                </div>
                <button type="submit" className="w-full btn-primary py-3 font-bold text-sm">Save Complete Bill</button>
              </form>
            </div>
          </div>
        )}
        
        {isVendorModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setIsVendorModalOpen(false)}></div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="bg-white rounded-3xl w-full max-w-md z-[101] relative shadow-2xl overflow-hidden border border-white/20"
            >
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                <div className="flex justify-between items-start relative z-10">
                  <div>
                    <h2 className="text-xl font-black tracking-tight">Enlist New Vendor</h2>
                    <p className="text-blue-100 text-xs font-medium mt-1 opacity-90">Add supplier details for purchase tracking</p>
                  </div>
                  <button onClick={() => setIsVendorModalOpen(false)} className="p-2 bg-white/10 hover:bg-white/20 rounded-xl backdrop-blur-sm transition-all text-white">
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <form onSubmit={handleVendorSubmit} className="p-6 space-y-5 bg-slate-50/50">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black uppercase tracking-widest text-slate-500">Company / Vendor Name</label>
                  <input type="text" required className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm" placeholder="e.g. Acme Supplies Ltd." value={vendorForm.name} onChange={e => setVendorForm({ ...vendorForm, name: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-black uppercase tracking-widest text-slate-500">Contact No.</label>
                    <input type="text" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm" placeholder="+91..." value={vendorForm.phone} onChange={e => setVendorForm({ ...vendorForm, phone: e.target.value })} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-black uppercase tracking-widest text-slate-500">GST Registration</label>
                    <div className="flex bg-slate-100 p-1 rounded-xl shadow-inner gap-1">
                        <button type="button" onClick={() => setVendorForm({...vendorForm, hasGST: 'Yes'})} className={`flex-1 text-xs font-bold py-2.5 rounded-lg transition-all ${vendorForm.hasGST === 'Yes' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>Yes</button>
                        <button type="button" onClick={() => setVendorForm({...vendorForm, hasGST: 'No'})} className={`flex-1 text-xs font-bold py-2.5 rounded-lg transition-all ${vendorForm.hasGST === 'No' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>No</button>
                    </div>
                  </div>
                </div>
                {vendorForm.hasGST === 'Yes' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-1.5">
                    <label className="text-[11px] font-black uppercase tracking-widest text-blue-600">GST / TAX ID Number</label>
                    <input type="text" required className="w-full bg-blue-50/50 border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900 placeholder:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all shadow-inner uppercase" placeholder="22AAAAA0000A1Z5" value={vendorForm.gstNo} onChange={e => setVendorForm({ ...vendorForm, gstNo: e.target.value })} />
                  </motion.div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-black uppercase tracking-widest text-slate-500">Address (Optional)</label>
                    <input type="text" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm" placeholder="Full address" value={vendorForm.address} onChange={e => setVendorForm({ ...vendorForm, address: e.target.value })} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-black uppercase tracking-widest text-slate-500">Opening Balance / Purana Baki (₹)</label>
                    <input type="number" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm" placeholder="e.g. 5000 (Amount we owe)" value={vendorForm.openingBalance} onChange={e => setVendorForm({ ...vendorForm, openingBalance: e.target.value })} />
                    <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">Leave 0 if no old dues</p>
                  </div>
                </div>
                <div className="pt-2">
                  <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-600/25 active:scale-95 transition-all text-sm flex items-center justify-center gap-2">
                    <Truck className="w-4 h-4" />
                    Register Vendor Now
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
        
        {selectedProfileVendor && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedProfileVendor(null)}></div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="bg-white rounded-3xl w-full max-w-sm z-[121] relative shadow-2xl overflow-hidden"
            >
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 flex flex-col items-center justify-center relative border-b border-indigo-100/50">
                <button onClick={() => setSelectedProfileVendor(null)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 bg-white/50 rounded-full hover:bg-white transition-all shadow-sm">
                  <XCircle className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => {
                    setVendorForm({ 
                      _id: selectedProfileVendor._id, 
                      name: selectedProfileVendor.name || '', 
                      phone: selectedProfileVendor.phone || '', 
                      email: selectedProfileVendor.email || '', 
                      address: selectedProfileVendor.address || '', 
                      hasGST: selectedProfileVendor.gstRegistered ? 'Yes' : 'No', 
                      gstNo: selectedProfileVendor.gstNumber || '', 
                      type: 'supplier',
                      openingBalance: selectedProfileVendor.openingBalance?.toString() || '0'
                    });
                    setSelectedProfileVendor(null);
                    setIsVendorModalOpen(true);
                  }}
                  className="absolute top-4 left-4 px-3 py-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-white/50 rounded-xl hover:bg-white transition-all shadow-sm border border-indigo-100 flex items-center gap-1.5"
                >
                  <Edit className="w-3.5 h-3.5" />
                  Edit
                </button>
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-[2rem] flex items-center justify-center text-white shadow-xl shadow-indigo-600/30 mb-4 rotate-3">
                  <Truck className="w-8 h-8 -rotate-3" />
                </div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight text-center">{selectedProfileVendor.name}</h2>
                <span className="mt-1 px-3 py-1 bg-white border border-slate-200 text-slate-500 text-[9px] font-black uppercase tracking-widest rounded-full shadow-sm">Supplier / Vendor</span>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Phone</p>
                    <p className="text-sm font-bold text-slate-700">{selectedProfileVendor.phone || 'N/A'}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">GST NO.</p>
                    <p className="text-sm font-bold text-slate-700">{selectedProfileVendor.gstNumber || 'N/A'}</p>
                  </div>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Address</p>
                  <p className="text-sm font-medium text-slate-600 leading-relaxed">{selectedProfileVendor.address || 'No address provided'}</p>
                </div>
                <button 
                  onClick={() => router.push(`/vendors?id=${selectedProfileVendor._id}`)}
                  className="w-full mt-2 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-colors shadow-lg flex items-center justify-center gap-2"
                >
                  <Activity className="w-4 h-4" />
                  View Full Ledger
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Bill Image Viewer Modal */}
        {selectedBillImage && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={() => setSelectedBillImage(null)}></div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative z-[151] max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col"
              style={{ maxHeight: '90vh' }}
            >
              <div className="flex justify-between items-center p-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-indigo-600" /> Uploaded Bill
                </h3>
                <button onClick={() => setSelectedBillImage(null)} className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors">
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4 overflow-auto flex justify-center bg-gray-50 flex-1">
                <img src={selectedBillImage} alt="Bill" className="max-w-full h-auto object-contain rounded-lg shadow-sm border border-gray-200" />
              </div>
            </motion.div>
          </div>
        )}
        
        {/* Modals have been removed in favor of dedicated page */}
      </main>
    </div>
  );
};

export default PurchasesPage;

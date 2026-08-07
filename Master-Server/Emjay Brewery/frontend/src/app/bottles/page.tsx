'use client'
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import api from '@/services/api';
import toast from 'react-hot-toast';
import { 
  Plus, 
  Trash2, 
  History,
  Package,
  XCircle,
  Truck,
  IndianRupee,
  ClipboardList,
  ArrowUpRight,
  ArrowDownLeft,
  ChevronDown,
  Warehouse,
  Eye,
  User,
  Search,
  Calendar,
  Activity
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';
import MonthYearFilter from '@/components/MonthYearFilter';
import { Pencil } from 'lucide-react';

const Bottles = () => {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'purchases' | 'ledger' | 'vendors'>('ledger');
  const [selectedDateFilter, setSelectedDateFilter] = useState('');

  const [ledgerData, setLedgerData] = useState<any[]>([]);
  const [parties, setParties] = useState<any[]>([]);
  const [searchSupplier, setSearchSupplier] = useState('');
  const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);
  const [supplierForm, setSupplierForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    hasGST: 'No',
    gstNo: '',
    openingBalance: '',
    type: 'bottle_supplier'
  });
  const [selectedProfileSupplier, setSelectedProfileSupplier] = useState<any>(null);
  const [bottleTypeFilter, setBottleTypeFilter] = useState('Bottles');
  const [ledgerLoading, setLedgerLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatDate = (dateString: string) => {
      const d = new Date(dateString);
      if (isNaN(d.getTime())) return dateString;
      return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear().toString().slice(-2)}`;
  };

  const [items, setItems] = useState<{bottleType: string, quantity: string, pricePerUnit: string, totalCost: number, billFile: File | null}[]>([{
    bottleType: 'New',
    quantity: '',
    pricePerUnit: '',
    totalCost: 0,
    billFile: null
  }]);

  const [form, setForm] = useState({
    partyId: '',
    supplier: '',
    date: new Date().toISOString().split('T')[0],
    status: 'Cash',
    paidCash: '' as string | number,
    paidOnline: '' as string | number
  });
  const [viewBillModal, setViewBillModal] = useState(false);
  const [selectedBillUrl, setSelectedBillUrl] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any>(null);
  const [editForm, setEditForm] = useState({
    partyId: '',
    bottleType: '',
    quantity: '',
    pricePerUnit: '',
    supplierName: '',
    date: ''
  });

  const addItem = () => {
    setItems([...items, { bottleType: 'New', quantity: '', pricePerUnit: '', totalCost: 0, billFile: null }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    if (field === 'quantity' || field === 'pricePerUnit') {
        newItems[index].totalCost = Number(newItems[index].quantity) * Number(newItems[index].pricePerUnit);
    }
    setItems(newItems);
  };

  const fetchData = async () => {
    try {
      const [stockRes, partiesRes] = await Promise.all([
        api.get('/bottles/stock', { params: { month: selectedMonth, year: selectedYear, date: selectedDateFilter || undefined } }),
        api.get('/parties')
      ]);
      setData(stockRes.data);
      setParties(partiesRes.data.filter((p: any) => p.type === 'bottle_supplier'));
    } catch (error) {
      toast.error('Could not load bottle data');
    } finally {
      setLoading(false);
    }
  };

  const handleSupplierSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/parties', {
        ...supplierForm,
        gstRegistered: supplierForm.hasGST === 'Yes',
        gstNumber: supplierForm.gstNo
      });
      toast.success('Supplier enlisted successfully');
      setIsSupplierModalOpen(false);
      setSupplierForm({
        name: '',
        phone: '',
        email: '',
        address: '',
        hasGST: 'No',
        gstNo: '',
        openingBalance: '',
        type: 'bottle_supplier'
      });
      fetchData();
    } catch {
      toast.error('Failed to enlist supplier');
    }
  };

  const fetchLedger = async () => {
      setLedgerLoading(true);
      try {
          const res = await api.get('/reports/bottle-stock', {
              params: { bottleType: bottleTypeFilter, month: selectedMonth, year: selectedYear }
          });
          const sorted = res.data.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
          setLedgerData(sorted);
      } catch (error) {
          toast.error('Failed to load bottle ledger');
      } finally {
          setLedgerLoading(false);
      }
  };

  useEffect(() => {
    fetchData();
  }, [selectedMonth, selectedYear, selectedDateFilter]);

  useEffect(() => {
    if (activeTab === 'ledger') {
        fetchLedger();
    }
  }, [activeTab, bottleTypeFilter, selectedMonth, selectedYear]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('items', JSON.stringify(items.map(item => ({
          bottleType: item.bottleType,
          quantity: Number(item.quantity),
          pricePerUnit: Number(item.pricePerUnit),
          totalCost: Number(item.quantity) * Number(item.pricePerUnit)
      }))));
      formData.append('supplierName', form.supplier);
      if (form.partyId) {
          formData.append('partyId', form.partyId);
      }
      formData.append('date', form.date);
      formData.append('status', form.status);
      if (form.status === 'Split') {
          formData.append('paidCash', form.paidCash.toString());
          formData.append('paidOnline', form.paidOnline.toString());
      }

      items.forEach((item, index) => {
          if (item.billFile) {
              formData.append(`billImage_${index}`, item.billFile);
          }
      });

      await api.post('/bottles/purchase', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
      });

      toast.success('Purchases recorded');
      setIsModalOpen(false);
      setItems([{ bottleType: 'New', quantity: '', pricePerUnit: '', totalCost: 0, billFile: null }]);
      setForm({ partyId: '', supplier: '', date: new Date().toISOString().split('T')[0], status: 'Cash', paidCash: '', paidOnline: '' });
      fetchData();
      if (activeTab === 'ledger') fetchLedger();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to record purchase');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;
    try {
      await api.delete(`/bottles/${id}`);
      toast.success('Record deleted');
      fetchData();
      if (activeTab === 'ledger') fetchLedger();
    } catch (error) {
      toast.error('Failed to delete record');
    }
  };

  const handleEdit = (record: any) => {
    setEditingRecord(record);
    setEditForm({
      partyId: record.partyId || '',
      bottleType: record.bottleType,
      quantity: record.quantity.toString(),
      pricePerUnit: record.costPerUnit.toString(),
      supplierName: record.supplierName || '',
      date: new Date(record.date).toISOString().split('T')[0]
    });
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const selectedParty = parties.find(p => p._id === editForm.partyId);
      const supplierName = selectedParty ? selectedParty.name : editForm.supplierName;

      await api.put(`/bottles/${editingRecord._id}`, {
        ...editForm,
        supplierName,
        quantity: Number(editForm.quantity),
        costPerUnit: Number(editForm.pricePerUnit)
      });
      toast.success('Record updated');
      setIsEditModalOpen(false);
      fetchData();
      if (activeTab === 'ledger') fetchLedger();
    } catch (error) {
      toast.error('Failed to update record');
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
      <main className="flex-1 lg:ml-64 p-8 relative">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
           <div>
              <h1 className="text-2xl font-bold text-gray-900">Empty Bottle Management</h1>
              <p className="text-sm text-gray-500 mt-1">Track purchasing, production usage & bill records</p>
           </div>
            <div className="flex flex-col md:flex-row items-center gap-4">
                <MonthYearFilter 
                    selectedMonth={selectedMonth} 
                    selectedYear={selectedYear} 
                    onFilterChange={(m, y) => { setSelectedMonth(m); setSelectedYear(y); setSelectedDateFilter(''); }}
                    selectedDate={selectedDateFilter}
                    onDateSelect={setSelectedDateFilter}
                />
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
                >
                    <Plus className="w-5 h-5" />
                    Record Purchase
                </button>
            </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            <div className="card bg-white border border-gray-200 p-6 flex flex-col justify-between hover:shadow-xl transition-all group">
                <div>
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Buy Bottles</p>
                   <h3 className="text-2xl font-black text-gray-900 italic tracking-tighter">{data?.totalPurchased || 0}</h3>
                </div>
                <div className="flex justify-end mt-4">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors"><Truck className="w-5 h-5" /></div>
                </div>
            </div>
            
            <div className="card bg-white border border-gray-200 p-6 flex flex-col justify-between hover:shadow-xl transition-all group">
                <div>
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Production</p>
                   <h3 className="text-2xl font-black text-gray-900 italic tracking-tighter">{data?.totalUsed || 0}</h3>
                </div>
                <div className="flex justify-end mt-4">
                    <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors"><ArrowUpRight className="w-5 h-5" /></div>
                </div>
            </div>

            <div className="card bg-white border border-gray-200 p-6 flex flex-col justify-between hover:shadow-xl transition-all group">
                <div>
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Empty Bottles</p>
                   <h3 className="text-2xl font-black text-blue-600 italic tracking-tighter">{data?.availableEmptyBottles || 0}</h3>
                </div>
                <div className="flex justify-end mt-4">
                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors"><Package className="w-5 h-5" /></div>
                </div>
            </div>

            <div className="card bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between hover:shadow-xl transition-all group relative overflow-hidden">
                <div className="z-10">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Caps Inventory</p>
                   <h3 className="text-2xl font-black text-white italic tracking-tighter">{data?.availableCaps || 0}</h3>
                </div>
                <div className="flex justify-end mt-4 z-10">
                    <div className="p-2 bg-white/10 text-white rounded-lg border border-white/10 hover:bg-white/20 transition-colors"><ClipboardList className="w-5 h-5" /></div>
                </div>
                <div className="absolute -right-4 -bottom-4 opacity-10 rotate-12 scale-150">
                     <Package className="w-24 h-24 text-white" />
                </div>
            </div>

            {/* Re-adding Stock Value card to match original length exactly */}
            <div className="card bg-emerald-600 border border-emerald-500 p-6 flex flex-col justify-between hover:shadow-xl transition-all group relative overflow-hidden">
                <div className="z-10">
                   <p className="text-[10px] font-black text-emerald-100 uppercase tracking-widest mb-1">Stock Value</p>
                   <h3 className="text-2xl font-black text-white italic tracking-tighter">₹{(data?.history?.reduce((acc: number, h: any) => acc + (h.quantity * h.costPerUnit), 0) || 0).toLocaleString()}</h3>
                </div>
                <div className="flex justify-end mt-4 z-10">
                    <div className="p-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"><IndianRupee className="w-5 h-5" /></div>
                </div>
            </div>
        </div>

        {/* Section Tabs */}
        <div className="flex bg-white p-1 rounded-xl border border-gray-200 w-fit mb-6 shadow-sm">
            <button 
                onClick={() => setActiveTab('ledger')}
                className={cn(
                    "px-6 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2",
                    activeTab === 'ledger' ? "bg-slate-900 text-white shadow-md" : "text-gray-500 hover:bg-slate-50"
                )}
            >
                <ClipboardList className="w-4 h-4" />
                Stock Flow Report
            </button>
            <button 
                onClick={() => setActiveTab('purchases')}
                className={cn(
                    "px-6 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2",
                    activeTab === 'purchases' ? "bg-slate-900 text-white shadow-md" : "text-gray-500 hover:bg-slate-50"
                )}
            >
                <Truck className="w-4 h-4" />
                Purchase History
            </button>
            <button 
                onClick={() => setActiveTab('vendors')}
                className={cn(
                    "px-6 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2",
                    activeTab === 'vendors' ? "bg-slate-900 text-white shadow-md" : "text-gray-500 hover:bg-slate-50"
                )}
            >
                <User className="w-4 h-4" />
                Suppliers / Vendors
            </button>
        </div>

        {activeTab === 'purchases' ? (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-10">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/10">
                    <h3 className="font-bold text-gray-900 underline decoration-indigo-500 underline-offset-4">Recent Procurements</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-500 text-[10px] font-black uppercase tracking-widest border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Variant</th>
                                <th className="px-6 py-4">Supplier Entity</th>
                                <th className="px-6 py-4 text-center">Batch Quantity</th>
                                <th className="px-6 py-4 text-right">Investment</th>
                                <th className="px-6 py-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {[...(data?.history || [])].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((h: any, i: number) => (
                                <tr key={i} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-5 text-xs text-gray-600 font-bold">
                                        {formatDate(h.date)}
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className={cn(
                                            "px-2.5 py-1 rounded text-[10px] font-black uppercase ring-1 shadow-sm",
                                            h.bottleType === 'New' || h.bottleType === 'Old' ? 'bg-blue-50 text-blue-600 ring-blue-100' : 'bg-orange-50 text-orange-600 ring-orange-100'
                                        )}>{h.bottleType}</span>
                                    </td>
                                    <td className="px-6 py-5 text-sm text-gray-900 font-black italic">{h.supplierName || 'N/A'}</td>
                                    <td className="px-6 py-5 text-center font-black text-gray-800 tracking-tighter">{h.quantity} units</td>
                                    <td className="px-6 py-5 text-right font-black text-blue-600">₹{(h.quantity * h.costPerUnit).toLocaleString()}</td>
                                    <td className="px-6 py-5 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            {h.billImage && (
                                                <button 
                                                    onClick={() => { setSelectedBillUrl(h.billImage); setViewBillModal(true); }} 
                                                    className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                                    title="View Bill"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                            )}
                                            <button onClick={() => handleEdit(h)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Pencil className="w-4 h-4" /></button>
                                            <button onClick={() => handleDelete(h._id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {!data?.history?.length && <tr><td colSpan={6} className="p-12 text-center text-gray-400">No purchase records found.</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        ) : activeTab === 'vendors' ? (
          <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="h-5 w-5 text-slate-400" />
                  </span>
                  <input 
                    type="text" 
                    placeholder="Search bottle suppliers..." 
                    className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                    value={searchSupplier}
                    onChange={(e) => setSearchSupplier(e.target.value)}
                  />
                </div>
                <button 
                  onClick={() => {
                    setSupplierForm({
                      name: '',
                      phone: '',
                      email: '',
                      address: '',
                      hasGST: 'No',
                      gstNo: '',
                      openingBalance: '',
                      type: 'bottle_supplier'
                    });
                    setIsSupplierModalOpen(true);
                  }}
                  className="bg-slate-900 text-white px-5 py-3 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 flex items-center gap-2"
                >
                  <div className="bg-white/20 rounded-lg p-1">
                    <Plus className="w-4 h-4" />
                  </div>
                  Enlist New Supplier
                </button>
              </div>

              <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl shadow-blue-900/5 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gradient-to-r from-slate-50 to-white text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-gray-100">
                        <th className="px-8 py-5">Supplier Details</th>
                        <th className="px-8 py-5">Contact</th>
                        <th className="px-8 py-5 text-right">Net Balance</th>
                        <th className="px-8 py-5 text-center">Status</th>
                        <th className="px-8 py-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {parties.filter(p => p.name.toLowerCase().includes(searchSupplier.toLowerCase())).map(p => (
                        <tr 
                          key={p._id} 
                          onClick={() => router.push(`/vendors?id=${p._id}`)}
                          className="group hover:bg-blue-50/50 transition-all duration-300 cursor-pointer"
                        >
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-4">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedProfileSupplier(p);
                                }}
                                className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center text-blue-600 shadow-sm border border-blue-100/50 hover:scale-110 hover:rotate-3 hover:shadow-blue-200 transition-all duration-300 cursor-pointer"
                                title="View Profile"
                              >
                                <User className="w-5 h-5" />
                              </button>
                              <div>
                                <h4 className="font-black text-slate-900 text-sm tracking-tight group-hover:text-blue-700 transition-colors">
                                  {p.name}
                                </h4>
                                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-1">Bottle Supplier</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-5 space-y-2">
                            <div className="inline-flex items-center px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-100 text-xs font-bold text-slate-600 shadow-sm">
                              {p.phone || 'No Contact Info'}
                            </div>
                          </td>
                          <td className="px-8 py-5 text-right">
                            <p className={cn(
                              "text-sm font-black tracking-tight",
                              (p.balance || 0) >= 0 ? "text-emerald-600" : "text-rose-600"
                            )}>
                              ₹{Math.abs(p.balance || 0).toLocaleString()}
                            </p>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">
                              {(p.balance || 0) >= 0 ? 'Settled' : 'Amount Payable'}
                            </p>
                          </td>
                          <td className="px-8 py-5 text-center">
                            <span className={cn(
                              "px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border shadow-sm",
                              (p.balance || 0) >= 0 ? "bg-emerald-50 border-emerald-100 text-emerald-600" : "bg-rose-50 border-rose-100 text-rose-600"
                            )}>
                              {(p.balance || 0) >= 0 ? 'Account Clear' : 'Action Required'}
                            </span>
                          </td>
                          <td className="px-8 py-5 text-right">
                            <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                              <button 
                                onClick={async () => {
                                  if (confirm('Are you sure you want to delete this supplier?')) {
                                    try {
                                      await api.delete(`/parties/${p._id}`);
                                      toast.success('Supplier deleted');
                                      fetchData();
                                    } catch {
                                      toast.error('Failed to delete supplier');
                                    }
                                  }
                                }}
                                className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                                title="Delete Supplier"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {parties.length === 0 && (
                        <tr>
                          <td colSpan={5} className="px-8 py-16 text-center text-slate-400">
                            No bottle suppliers found. Enlist one to begin.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
          </div>
        ) : (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div className="flex bg-white border border-gray-200 p-1 rounded-xl shadow-sm">
                        <button 
                            onClick={() => setBottleTypeFilter('Bottles')}
                            className={cn("px-4 py-1.5 rounded-lg text-xs font-bold transition-all", bottleTypeFilter === 'Bottles' ? "bg-blue-600 text-white shadow-md" : "text-gray-500")}
                        >Bottles</button>
                        <button 
                            onClick={() => setBottleTypeFilter('Caps')}
                            className={cn("px-4 py-1.5 rounded-lg text-xs font-bold transition-all", bottleTypeFilter === 'Caps' ? "bg-blue-600 text-white shadow-md" : "text-gray-500")}
                        >Caps</button>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-slate-50/50">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-indigo-600 rounded-lg text-white">
                                <Warehouse className="w-4 h-4" />
                            </div>
                            <h3 className="font-bold text-gray-900 uppercase text-sm tracking-tight italic">Daily Stock Flow Ledger</h3>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-widest border-b border-gray-100">
                                <tr>
                                    <th className="px-8 py-4">Transaction Date</th>
                                    <th className="px-8 py-4 text-center">Opening</th>
                                    <th className="px-8 py-4 text-center text-blue-600">Buy (+)</th>
                                    <th className="px-8 py-4 text-center text-red-600">Used (-)</th>
                                    <th className="px-8 py-4 text-center">Closing Balance</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {ledgerLoading ? (
                                    <tr><td colSpan={5} className="p-12 text-center text-gray-400 font-bold animate-pulse text-[10px] tracking-widest uppercase">Calculating Metrics...</td></tr>
                                ) : (() => {
                                    if (ledgerData.length === 0) {
                                        return <tr><td colSpan={5} className="p-12 text-center text-gray-400 text-sm">No inventory flow recorded for this type.</td></tr>;
                                    }

                                    let displayRows = ledgerData;
                                    let emptyStateRow = null;

                                    if (selectedDateFilter) {
                                        displayRows = ledgerData.filter(r => r.date.startsWith(selectedDateFilter));
                                        
                                        if (displayRows.length === 0) {
                                            const targetDate = new Date(selectedDateFilter).getTime();
                                            const beforeRecords = ledgerData.filter((d: any) => new Date(d.date).getTime() < targetDate);
                                            
                                            let opening = 0;
                                            if (beforeRecords.length > 0) {
                                                opening = beforeRecords[0].closingStock; // Array is descending, so [0] is the most recent
                                            } else {
                                                opening = ledgerData[ledgerData.length - 1].openingStock;
                                            }

                                            emptyStateRow = (
                                                <tr className="bg-amber-50/50 border-t border-b border-amber-100">
                                                    <td className="px-8 py-5">
                                                        <p className="font-black text-gray-800 text-xs italic">{formatDate(selectedDateFilter)}</p>
                                                    </td>
                                                    <td className="px-8 py-5 text-center font-bold text-gray-400 text-xs">
                                                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full mr-2 bg-amber-100 text-amber-700">OPENING</span>
                                                    </td>
                                                    <td className="px-8 py-5 text-center">-</td>
                                                    <td className="px-8 py-5 text-center">-</td>
                                                    <td className="px-8 py-5 text-center">
                                                        <span className="px-5 py-1.5 bg-slate-900 text-white rounded-lg font-black italic text-[11px] shadow-sm tracking-tighter">
                                                            {opening}
                                                        </span>
                                                    </td>
                                                </tr>
                                            );
                                        }
                                    }

                                    return (
                                        <>
                                            {emptyStateRow}
                                            {displayRows.map((row, idx) => (
                                                <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                                                    <td className="px-8 py-5">
                                                        <p className="font-black text-gray-800 text-xs italic">{formatDate(row.date)}</p>
                                                    </td>
                                                    <td className="px-8 py-5 text-center font-bold text-gray-400 text-xs">{row.openingStock}</td>
                                                    <td className="px-8 py-5 text-center">
                                                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-blue-50 text-blue-700 font-black text-[11px]">
                                                            <ArrowUpRight className="w-3 h-3" />
                                                            +{row.buy}
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-5 text-center">
                                                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-red-50 text-red-700 font-black text-[11px]">
                                                            <ArrowDownLeft className="w-3 h-3" />
                                                            -{row.used}
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-5 text-center">
                                                        <span className="px-5 py-1.5 bg-slate-900 text-white rounded-lg font-black italic text-[11px] shadow-sm tracking-tighter">
                                                            {row.closingStock}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </>
                                    );
                                })()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )}

        <AnimatePresence>
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
                    <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white rounded-xl w-full max-w-3xl z-50 relative shadow-xl overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-lg font-bold text-gray-900">Record Procurement</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><XCircle className="w-6 h-6" /></button>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-600 uppercase tracking-widest">Supplier Name</label>
                                    <select 
                                        required
                                        className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm w-full font-bold cursor-pointer"
                                        value={form.partyId}
                                        onChange={e => {
                                            const selectedParty = parties.find(p => p._id === e.target.value);
                                            setForm({
                                                ...form,
                                                partyId: e.target.value,
                                                supplier: selectedParty ? selectedParty.name : ''
                                            });
                                        }}
                                    >
                                        <option value="">Select Bottle Supplier...</option>
                                        {parties.map(p => (
                                            <option key={p._id} value={p._id}>{p.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-600 uppercase tracking-widest">Date</label>
                                    <input type="date" required className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm w-full" value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-600 uppercase tracking-widest">Payment Status</label>
                                    <select className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm w-full" value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
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
                                        <label className="text-xs font-bold text-gray-600 uppercase tracking-widest">Cash Paid</label>
                                        <input type="number" className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm w-full" placeholder="₹0" value={form.paidCash} onChange={e => setForm({ ...form, paidCash: e.target.value })} />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-600 uppercase tracking-widest">Online/UPI Paid</label>
                                        <input type="number" className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm w-full" placeholder="₹0" value={form.paidOnline} onChange={e => setForm({ ...form, paidOnline: e.target.value })} />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-600 uppercase tracking-widest">Due Amount</label>
                                        <div className="bg-gray-100 border border-gray-200 rounded-lg px-4 py-2 text-sm w-full text-gray-500 font-bold">
                                            ₹{Math.max(0, items.reduce((acc, curr) => acc + (Number(curr.quantity)*Number(curr.pricePerUnit)), 0) - (Number(form.paidCash) || 0) - (Number(form.paidOnline) || 0)).toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-tight">Items</h3>
                                    <button type="button" onClick={addItem} className="text-blue-600 text-xs font-bold flex items-center gap-1 hover:underline">
                                        <Plus className="w-4 h-4" /> Add Item
                                    </button>
                                </div>
                                {items.map((item, idx) => (
                                    <div key={idx} className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-4 relative">
                                        {items.length > 1 && (
                                            <button type="button" onClick={() => removeItem(idx)} className="absolute -top-3 -right-3 p-1.5 bg-red-100 text-red-600 hover:bg-red-500 hover:text-white rounded-lg transition-all"><Trash2 className="w-4 h-4" /></button>
                                        )}
                                        <div className="grid grid-cols-12 gap-3 items-end">
                                            <div className="col-span-12 md:col-span-4 space-y-1">
                                                <label className="text-[10px] font-bold text-gray-400 uppercase">Variant</label>
                                                <select className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs w-full" value={item.bottleType} onChange={e => updateItem(idx, 'bottleType', e.target.value)}>
                                                    <option value="New">New Bottles</option>
                                                    <option value="Old">Old Bottles</option>
                                                    <option value="Caps">Bottle Caps</option>
                                                </select>
                                            </div>
                                            <div className="col-span-6 md:col-span-4 space-y-1">
                                                <label className="text-[10px] font-bold text-gray-400 uppercase">Qty</label>
                                                <input type="number" required className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs w-full" value={item.quantity} onChange={e => updateItem(idx, 'quantity', e.target.value)} />
                                            </div>
                                            <div className="col-span-6 md:col-span-4 space-y-1">
                                                <label className="text-[10px] font-bold text-gray-400 uppercase">Rate (₹)</label>
                                                <input type="number" step="0.01" required className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs w-full" value={item.pricePerUnit} onChange={e => updateItem(idx, 'pricePerUnit', e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="pt-2 border-t border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                            <div className="space-y-1 flex-1 w-full">
                                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Attach Bill (Optional)</label>
                                                <input 
                                                    type="file" 
                                                    accept="image/*,application/pdf"
                                                    className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-600 w-full file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:uppercase file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 transition-all cursor-pointer" 
                                                    onChange={e => updateItem(idx, 'billFile', e.target.files?.[0] || null)} 
                                                />
                                            </div>
                                            <div className="text-right sm:text-left">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Item Total</p>
                                                <p className="text-lg font-black text-indigo-600 tracking-tighter">₹{item.totalCost.toLocaleString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Gross Commitment</p>
                                    <p className="text-2xl font-black text-indigo-600 italic tracking-tighter">₹{items.reduce((acc, item) => acc + (Number(item.quantity) * Number(item.pricePerUnit)), 0).toLocaleString()}</p>
                                </div>
                                <button type="submit" disabled={isSubmitting} className="bg-blue-600 text-white py-3 px-8 rounded-lg font-bold shadow-lg shadow-indigo-600/20 disabled:opacity-50">
                                    {isSubmitting ? 'Authorizing...' : 'Authorize Purchase'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>

        {/* Edit Modal */}
        <AnimatePresence>
            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setIsEditModalOpen(false)} />
                    <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white rounded-xl w-full max-w-lg z-50 relative shadow-xl overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-lg font-bold text-gray-900">Edit Purchase Record</h2>
                            <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-gray-600"><XCircle className="w-6 h-6" /></button>
                        </div>
                        
                        <form onSubmit={handleUpdate} className="p-6 space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-600 uppercase">Supplier Name</label>
                                <select 
                                    className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm w-full font-bold cursor-pointer"
                                    value={editForm.partyId}
                                    onChange={e => {
                                        const selectedParty = parties.find(p => p._id === e.target.value);
                                        setEditForm({
                                            ...editForm,
                                            partyId: e.target.value,
                                            supplierName: selectedParty ? selectedParty.name : ''
                                        });
                                    }}
                                >
                                    <option value="">Select Bottle Supplier...</option>
                                    {parties.map(p => (
                                        <option key={p._id} value={p._id}>{p.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-600 uppercase">Date</label>
                                    <input type="date" required className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm w-full" value={editForm.date} onChange={e => setEditForm({...editForm, date: e.target.value})} />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-600 uppercase">Variant</label>
                                    <select className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm w-full" value={editForm.bottleType} onChange={e => setEditForm({...editForm, bottleType: e.target.value})}>
                                        <option value="New">New Bottles</option>
                                        <option value="Old">Old Bottles</option>
                                        <option value="Caps">Bottle Caps</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-600 uppercase">Qty</label>
                                    <input type="number" required className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm w-full" value={editForm.quantity} onChange={e => setEditForm({...editForm, quantity: e.target.value})} />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-600 uppercase">Rate (₹)</label>
                                    <input type="number" step="0.01" required className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm w-full" value={editForm.pricePerUnit} onChange={e => setEditForm({...editForm, pricePerUnit: e.target.value})} />
                                </div>
                            </div>
                            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold shadow-lg shadow-blue-600/20 mt-4">Update Record</button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>

        {/* Enlist Supplier Modal */}
        <AnimatePresence>
            {isSupplierModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setIsSupplierModalOpen(false)} />
                    <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white rounded-3xl w-full max-w-lg z-50 relative shadow-2xl overflow-hidden">
                        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white relative">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                          <div className="flex justify-between items-start relative z-10">
                            <div>
                              <h2 className="text-xl font-black tracking-tight">Enlist New Supplier</h2>
                              <p className="text-blue-100 text-xs font-medium mt-1 opacity-90">Add supplier details for bottle tracking</p>
                            </div>
                            <button onClick={() => setIsSupplierModalOpen(false)} className="p-2 bg-white/10 hover:bg-white/20 rounded-xl backdrop-blur-sm transition-all text-white">
                              <XCircle className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                        <form onSubmit={handleSupplierSubmit} className="p-6 space-y-5 bg-slate-50/50">
                          <div className="space-y-1.5">
                            <label className="text-[11px] font-black uppercase tracking-widest text-slate-500">Company / Supplier Name</label>
                            <input type="text" required className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm" placeholder="e.g. ABC Glassware Ltd." value={supplierForm.name} onChange={e => setSupplierForm({ ...supplierForm, name: e.target.value })} />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                              <label className="text-[11px] font-black uppercase tracking-widest text-slate-500">Contact No.</label>
                              <input type="text" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm" placeholder="+91..." value={supplierForm.phone} onChange={e => setSupplierForm({ ...supplierForm, phone: e.target.value })} />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[11px] font-black uppercase tracking-widest text-slate-500">GST Registration</label>
                              <div className="flex bg-slate-100 p-1 rounded-xl shadow-inner gap-1">
                                  <button type="button" onClick={() => setSupplierForm({...supplierForm, hasGST: 'Yes'})} className={`flex-1 text-xs font-bold py-2.5 rounded-lg transition-all ${supplierForm.hasGST === 'Yes' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>Yes</button>
                                  <button type="button" onClick={() => setSupplierForm({...supplierForm, hasGST: 'No'})} className={`flex-1 text-xs font-bold py-2.5 rounded-lg transition-all ${supplierForm.hasGST === 'No' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>No</button>
                              </div>
                            </div>
                          </div>
                          {supplierForm.hasGST === 'Yes' && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-1.5">
                              <label className="text-[11px] font-black uppercase tracking-widest text-blue-600">GST / TAX ID Number</label>
                              <input type="text" required className="w-full bg-blue-50/50 border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-900 placeholder:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all shadow-inner uppercase" placeholder="22AAAAA0000A1Z5" value={supplierForm.gstNo} onChange={e => setSupplierForm({ ...supplierForm, gstNo: e.target.value })} />
                            </motion.div>
                          )}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                              <label className="text-[11px] font-black uppercase tracking-widest text-slate-500">Email Address</label>
                              <input type="email" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm" placeholder="contact@supplier.com" value={supplierForm.email} onChange={e => setSupplierForm({ ...supplierForm, email: e.target.value })} />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[11px] font-black uppercase tracking-widest text-slate-500">Opening Balance (₹)</label>
                              <input type="number" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm" placeholder="0" value={supplierForm.openingBalance} onChange={e => setSupplierForm({ ...supplierForm, openingBalance: e.target.value })} />
                            </div>
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[11px] font-black uppercase tracking-widest text-slate-500">Business Address</label>
                            <textarea rows={2} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm resize-none" placeholder="Enter complete billing address..." value={supplierForm.address} onChange={e => setSupplierForm({ ...supplierForm, address: e.target.value })} />
                          </div>
                          <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-500/25 mt-4 text-sm">
                            Enlist Supplier Entity
                          </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>

        {/* View Bill Modal */}
        <AnimatePresence>
            {viewBillModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setViewBillModal(false)} />
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white rounded-xl w-full max-w-4xl z-[70] relative shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white">
                            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <Eye className="w-5 h-5 text-indigo-600" />
                                Digital Bill Receipt
                            </h2>
                            <button onClick={() => setViewBillModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><XCircle className="w-6 h-6 text-gray-400" /></button>
                        </div>
                        <div className="flex-1 bg-gray-50 overflow-auto p-4 flex items-center justify-center">
                            {selectedBillUrl.toLowerCase().endsWith('.pdf') ? (
                                <iframe src={selectedBillUrl} className="w-full h-full min-h-[600px] rounded-lg shadow-inner" />
                            ) : (
                                <img src={selectedBillUrl} alt="Bill" className="max-w-full h-auto rounded-lg shadow-lg" />
                            )}
                        </div>
                        <div className="p-4 border-t border-gray-100 bg-white flex justify-end">
                            <button onClick={() => window.open(selectedBillUrl, '_blank')} className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold text-sm hover:bg-indigo-700 transition-colors">Open in New Tab</button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Bottles;

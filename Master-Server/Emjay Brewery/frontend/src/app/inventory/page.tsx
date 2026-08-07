'use client'
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import api from '@/services/api';
import toast from 'react-hot-toast';
import { 
  Plus, 
  Trash2, 
  Search,
  FlaskConical,
  Package,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';

const Inventory = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [bottles, setBottles] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Products');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form, setForm] = useState({
    name: '',
    size: '',
    pricePerUnit: '',
    currentStock: '0',
    minStock: '10'
  });

  const fetchData = async () => {
    try {
      const [prodRes, bottleRes] = await Promise.all([
        api.get('/products'),
        api.get('/bottles/stock')
      ]);
      setProducts(prodRes.data);
      setBottles(bottleRes.data);
    } catch (error) {
      toast.error('Could not load inventory');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/products', form);
      toast.success('Product added successfully');
      setIsModalOpen(false);
      setForm({ name: '', size: '', pricePerUnit: '', currentStock: '0', minStock: '10' });
      fetchData();
    } catch (error) {
      toast.error('Failed to add product');
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
              <h1 className="text-2xl font-bold text-gray-900">Product Inventory</h1>
              <p className="text-sm text-gray-500 mt-1">Manage bottles and finished products</p>
           </div>
           {activeTab === 'Products' && (
               <button 
                    onClick={() => setIsModalOpen(true)}
                    className="btn-primary flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    Add New Product
                </button>
           )}
        </div>

        {/* Tabs */}
        <div className="flex bg-white p-1 rounded-lg border border-gray-200 w-fit mb-8 shadow-sm">
            {['Products', 'Empty Bottles'].map(tab => (
                <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                        "px-8 py-2 rounded-md text-sm font-semibold transition-all",
                        activeTab === tab ? "bg-blue-600 text-white shadow-md" : "text-gray-500 hover:text-gray-700"
                    )}
                >
                    {tab}
                </button>
            ))}
        </div>

        {activeTab === 'Products' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(p => (
                    <div key={p._id} className="card relative group">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                                <FlaskConical className="w-6 h-6" />
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-bold text-gray-400 uppercase">Current Stock</p>
                                <p className={cn(
                                    "text-2xl font-bold",
                                    p.currentStock <= p.minStock ? "text-red-500" : "text-gray-900"
                                )}>{p.currentStock}</p>
                            </div>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">{p.name}</h3>
                        <p className="text-sm text-gray-500 mb-6">{p.size} ml Bottle</p>
                        
                        <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                           <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase">Selling Price</p>
                                <p className="text-xl font-bold text-gray-900">₹{p.pricePerUnit}</p>
                           </div>
                           {p.currentStock <= p.minStock && (
                               <div className="flex items-center gap-1.5 text-red-500 animate-pulse">
                                   <AlertCircle className="w-4 h-4" />
                                   <span className="text-[10px] font-bold uppercase">Low Stock</span>
                               </div>
                           )}
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="card border-l-4 border-blue-500">
                        <p className="text-xs font-bold text-gray-400 uppercase mb-2">Total Empty Bottles</p>
                        <h3 className="text-3xl font-bold text-gray-900">{bottles?.availableEmptyBottles || 0}</h3>
                   </div>
                   <div className="card border-l-4 border-green-500">
                        <p className="text-xs font-bold text-gray-400 uppercase mb-2">Total Investment</p>
                        <h3 className="text-3xl font-bold text-gray-900">₹{bottles?.totalValue?.toLocaleString() || 0}</h3>
                   </div>
                </div>
                
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Type</th>
                                <th className="px-6 py-4">Supplier</th>
                                <th className="px-6 py-4 text-center">Batch Vol</th>
                                <th className="px-6 py-4 text-right">Price</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {bottles?.history?.map((h: any, i: number) => (
                                <tr key={i} className="text-sm hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-gray-500">{new Date(h.date).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 font-bold text-gray-900">{h.type}</td>
                                    <td className="px-6 py-4 text-gray-600">{h.supplier || 'N/A'}</td>
                                    <td className="px-6 py-4 text-center font-bold text-blue-600">{h.quantity}</td>
                                    <td className="px-6 py-4 text-right font-bold text-gray-900">₹{h.costPerUnit}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )}

        {/* Modal */}
        <AnimatePresence>
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
                    <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white rounded-xl w-full max-w-lg z-50 relative shadow-xl overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-lg font-bold text-gray-900">Add New Product</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><XCircle className="w-6 h-6" /></button>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-600">Product Name</label>
                                <input type="text" required className="input-field" placeholder="e.g. Classic Ale" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-600">Bottle Size (ml)</label>
                                    <input type="number" required className="input-field" placeholder="500" value={form.size} onChange={e => setForm({...form, size: e.target.value})} />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-600">Price (₹)</label>
                                    <input type="number" required className="input-field" placeholder="0" value={form.pricePerUnit} onChange={e => setForm({...form, pricePerUnit: e.target.value})} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-600">Initial Stock</label>
                                    <input type="number" required className="input-field" value={form.currentStock} onChange={e => setForm({...form, currentStock: e.target.value})} />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-600">Low Stock Warning At</label>
                                    <input type="number" required className="input-field" value={form.minStock} onChange={e => setForm({...form, minStock: e.target.value})} />
                                </div>
                            </div>
                            <button type="submit" className="w-full btn-primary py-3">Confirm Product</button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Inventory;

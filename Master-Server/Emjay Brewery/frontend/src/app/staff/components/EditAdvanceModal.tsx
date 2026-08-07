import React, { useState } from 'react';
import { X, Save, Edit3 } from 'lucide-react';
import api from '@/services/api';
import toast from 'react-hot-toast';

export default function EditAdvanceModal({ advance, onClose, onRefresh }: any) {
  const [form, setForm] = useState({
    amount: advance.amount || '',
    date: advance.date ? new Date(advance.date).toISOString().split('T')[0] : '',
    givenBy: advance.givenBy || 'Office',
    description: advance.description || ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put(`/admin/staff/advances/${advance._id}`, form);
      toast.success('Advance updated successfully');
      onRefresh();
      onClose();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update advance');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden relative">
        <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
              <Edit3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-gray-900">Edit Advance</h3>
              <p className="text-xs font-bold text-gray-500">Update deduction record</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-xs font-black text-gray-500 uppercase tracking-wider block mb-2">Amount (₹)</label>
            <input type="number" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} />
          </div>
          <div>
            <label className="text-xs font-black text-gray-500 uppercase tracking-wider block mb-2">Date</label>
            <input type="date" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
          </div>
          <div>
            <label className="text-xs font-black text-gray-500 uppercase tracking-wider block mb-2">Given By</label>
            <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" value={form.givenBy} onChange={e => setForm({...form, givenBy: e.target.value})}>
              <option value="Office">Office</option>
              <option value="Owner">Owner</option>
              <option value="Manager">Manager</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-black text-gray-500 uppercase tracking-wider block mb-2">Description</label>
            <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
          </div>

          <button type="submit" className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl py-3 flex items-center justify-center gap-2 transition-colors">
            <Save className="w-5 h-5" /> Update Record
          </button>
        </form>
      </div>
    </div>
  );
}

'use client';
import React, { useState, useEffect } from 'react';
import { UserPlus, Trash2, Shield } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import api from '@/services/api';

export default function ManageAdmin() {
  const [admins, setAdmins] = useState([]);
  const [branches, setBranches] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    mobile: '',
    branchId: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAdmins();
    fetchBranches();
  }, []);

  const fetchAdmins = async () => {
    try {
      const res = await api.get('/manage-admins');
      setAdmins(res.data);
    } catch (error) {
      console.error('Error fetching admins:', error);
    }
  };

  const fetchBranches = async () => {
    try {
      const res = await api.get('/parties');
      setBranches(res.data.filter((p: any) => p.isBranch));
    } catch (error) {
      console.error('Error fetching branches:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/manage-admins', formData);
      setFormData({ name: '', username: '', email: '', password: '', mobile: '', branchId: '' });
      fetchAdmins();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Error creating admin');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this admin?')) return;
    try {
      await api.delete(`/manage-admins/${id}`);
      fetchAdmins();
    } catch (error) {
      console.error('Error deleting admin:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto p-4 pt-20 lg:p-8 lg:pt-8 ml-0 lg:ml-64 transition-all duration-300">
        <div className="max-w-6xl mx-auto space-y-4 lg:space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 lg:p-6 rounded-2xl shadow-sm border border-gray-100">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Manage Admins</h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">Create and manage branch admins.</p>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <Shield className="w-6 h-6" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Add Branch Admin</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Username / Email</label>
                  <input type="text" name="username" value={formData.username} onChange={handleInputChange} required className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input type="password" name="password" value={formData.password} onChange={handleInputChange} required className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assign Branch</label>
                  <select name="branchId" value={formData.branchId} onChange={handleInputChange} required className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                    <option value="">Select Branch</option>
                    {branches.map((b: any) => (
                      <option key={b._id} value={b._id}>{b.name}</option>
                    ))}
                  </select>
                </div>

                <button type="submit" disabled={loading} className="w-full py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                  <UserPlus className="w-4 h-4" />
                  {loading ? 'Creating...' : 'Create Admin'}
                </button>
              </form>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-100">
                      <th className="p-3 sm:p-4 text-xs font-semibold text-gray-500 uppercase">Name</th>
                      <th className="p-3 sm:p-4 text-xs font-semibold text-gray-500 uppercase">Username</th>
                      <th className="p-3 sm:p-4 text-xs font-semibold text-gray-500 uppercase">Branch</th>
                      <th className="p-3 sm:p-4 text-xs font-semibold text-gray-500 uppercase text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {admins.map((admin: any) => (
                      <tr key={admin._id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="p-3 sm:p-4 text-sm font-medium text-gray-900 whitespace-nowrap">{admin.name}</td>
                        <td className="p-3 sm:p-4 text-sm text-gray-600 whitespace-nowrap">{admin.username || admin.email}</td>
                        <td className="p-3 sm:p-4 text-sm text-gray-600 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                            {admin.branchId?.name || 'No Branch'}
                          </span>
                        </td>
                        <td className="p-3 sm:p-4 text-right whitespace-nowrap">
                          <button onClick={() => handleDelete(admin._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {admins.length === 0 && (
                      <tr>
                        <td colSpan={4} className="p-8 text-center text-sm text-gray-500">
                          No branch admins found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

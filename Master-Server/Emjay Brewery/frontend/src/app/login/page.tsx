'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/services/api';
import toast from 'react-hot-toast';
import { Mail, Lock, Loader2, Beer, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('user', JSON.stringify(data));
      toast.success('Successfully logged in!');
      if (data.role === 'Staff' || data.role === 'staff') {
        router.push('/staff-portal');
      } else if (data.role === 'branch_admin') {
        router.push('/sales');
      } else {
        router.push('/dashboard');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 relative overflow-hidden font-sans">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] -z-10 animate-pulse delay-700" />

      <div className="w-full max-w-md">
        <div className="card shadow-2xl space-y-8 bg-white border border-slate-200 p-10 rounded-[40px]">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-[32px] bg-white border border-slate-100 overflow-hidden shadow-2xl shadow-indigo-600/10 group hover:scale-105 transition-all duration-500 p-2">
              <img src="/Logo.jpg" alt="Emjay Brewery" className="w-full h-full object-contain" />
            </div>
            <div className="space-y-2">
              <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none italic">EMJAY</h1>
              <p className="text-[10px] font-black text-indigo-600 tracking-[0.4em] uppercase">Enterprise Management</p>
            </div>
            <div className="h-1 w-12 bg-indigo-500 mx-auto rounded-full" />
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 ml-1 uppercase tracking-widest italic">Email / Username / Mobile</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-12 h-14 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm font-bold focus:bg-white transition-all"
                  placeholder="admin@emjay.com or username"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 ml-1 uppercase tracking-widest italic">Access Key</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-12 h-14 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm font-bold focus:bg-white transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary h-14 text-sm font-black uppercase tracking-widest flex items-center justify-center gap-3 mt-8 shadow-xl shadow-indigo-600/20 group"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <>
                  Enter Dashboard
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

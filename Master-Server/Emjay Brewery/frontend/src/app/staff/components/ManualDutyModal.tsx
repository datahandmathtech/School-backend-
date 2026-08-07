import React, { useState, useEffect } from 'react';
import api from '@/services/api';
import { X, ShieldCheck, AlertCircle, CheckCircle } from 'lucide-react';

interface ManualDutyModalProps {
  isOpen: boolean;
  onClose: () => void;

  defaultStaffId?: string | null;
  defaultDate?: string | null;
  defaultTimeIn?: string | null;
  onSubmit: (data: { staffId: string; date: string; status: string; timeIn: string; timeOut: string }) => void;
}

export default function ManualDutyModal({ isOpen, onClose, defaultStaffId, defaultDate, defaultTimeIn, onSubmit }: ManualDutyModalProps) {
  const [staffList, setStaffList] = useState<any[]>([]);
  const [staffId, setStaffId] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('present');
  const [timeIn, setTimeIn] = useState('');
  const [timeOut, setTimeOut] = useState('');

  useEffect(() => {
    if (isOpen) {
      setStaffId(defaultStaffId || '');
      setDate(defaultDate || new Date().toISOString().split('T')[0]);
      setStatus('present');
      setTimeIn(defaultTimeIn || '09:00');
      setTimeOut('');
      
      api.get('/admin/staff').then(res => {
        setStaffList(res.data);
        if (!defaultStaffId && res.data.length > 0) {
          setStaffId(res.data[0]._id);
        }
      });
    }
  }, [isOpen, defaultStaffId, defaultDate, defaultTimeIn]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ staffId, date, status, timeIn, timeOut });
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center p-4 bg-black/80 backdrop-blur-md font-sans">
      <div className="relative w-full max-w-lg bg-[#0b1121] rounded-3xl overflow-hidden shadow-2xl border border-gray-800">
        
        {/* Yellow top accent line */}
        <div className="absolute top-0 left-10 right-10 h-1.5 bg-yellow-400 rounded-b-xl"></div>

        <div className="p-8 pt-10">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div className="flex gap-4 items-center">
              <div className="w-14 h-14 rounded-2xl bg-indigo-900/40 border border-indigo-500/30 flex items-center justify-center shadow-inner">
                <ShieldCheck className="w-7 h-7 text-yellow-400" />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">
                  <span className="text-yellow-500">Security Panel</span> • Admin Override
                </p>
                <h2 className="text-2xl font-black text-white tracking-tight">Mark Attendance</h2>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 text-gray-400 hover:text-white transition-colors border border-gray-700/50">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Warning Box */}
          <div className="flex gap-4 items-center bg-[#17161b] border border-[#3e3423] rounded-2xl p-4 mb-8">
            <div className="w-10 h-10 rounded-full bg-yellow-900/30 flex items-center justify-center shrink-0 border border-yellow-900/50">
              <AlertCircle className="w-5 h-5 text-yellow-500" />
            </div>
            <div>
              <p className="font-black text-yellow-500 text-sm tracking-wide">Attendance Policy</p>
              <p className="text-[11px] font-bold text-yellow-500/70 mt-0.5">Backdated entries are limited to the previous 60 days (2 Months).</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Staff Dropdown */}
            <div className="relative">
              <label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-2">Staff Member</label>
              <select 
                value={staffId} 
                onChange={(e) => setStaffId(e.target.value)} 
                required
                className="w-full bg-[#111827] border border-gray-800 text-white rounded-xl px-4 py-4 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 appearance-none transition-colors shadow-inner"
              >
                <option value="" disabled>Select a staff member</option>
                {staffList.map(s => (
                  <option key={s._id} value={s._id}>{s.name} {s.designation ? `(${s.designation})` : ''}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-5">
              {/* Date */}
              <div>
                <label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-2">Date</label>
                <input 
                  type="date" 
                  value={date} 
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full bg-[#111827] border border-gray-800 text-white rounded-xl px-4 py-4 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 [color-scheme:dark] shadow-inner"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-2">Official Status</label>
                <select 
                  value={status} 
                  onChange={(e) => setStatus(e.target.value)}
                  required
                  className="w-full bg-[#111827] border border-gray-800 text-white rounded-xl px-4 py-4 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 appearance-none uppercase tracking-widest shadow-inner"
                >
                  <option value="present">Present</option>
                  <option value="half-day">Half Day</option>
                  <option value="absent">Absent</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              {/* Punch In */}
              <div>
                <label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-2">Punch In Time</label>
                <input 
                  type="time" 
                  value={timeIn} 
                  onChange={(e) => setTimeIn(e.target.value)}
                  required={status !== 'absent'}
                  disabled={status === 'absent'}
                  className="w-full bg-[#080d19] border border-gray-900 text-white rounded-xl px-4 py-4 font-black focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 [color-scheme:dark] disabled:opacity-50 shadow-inner"
                />
              </div>

              {/* Punch Out */}
              <div>
                <label className="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-2">Punch Out Time</label>
                <input 
                  type="time" 
                  value={timeOut} 
                  onChange={(e) => setTimeOut(e.target.value)}
                  disabled={status === 'absent'}
                  className="w-full bg-[#080d19] border border-gray-900 text-white rounded-xl px-4 py-4 font-black focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 [color-scheme:dark] disabled:opacity-50 shadow-inner"
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="mt-6 w-full bg-gradient-to-r from-[#d2a342] to-[#765dd7] hover:from-[#c2963c] hover:to-[#6751be] text-white font-black py-4 rounded-xl shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-3 transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              <CheckCircle className="w-5 h-5" />
              AUTHORIZE ENTRY
            </button>
            
            <p className="text-center text-[10px] font-black text-gray-600 uppercase tracking-widest mt-2 mb-2">
              Action will be logged in security audit history
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

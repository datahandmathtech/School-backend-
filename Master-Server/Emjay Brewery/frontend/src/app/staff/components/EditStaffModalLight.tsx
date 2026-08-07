import React, { useState } from 'react';
import { X, MapPin, Search, Clock, UserPlus, Info, Calendar, DollarSign } from 'lucide-react';
import api from '@/services/api';
import toast from 'react-hot-toast';
import { cn } from '@/utils/cn';
import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('./MapComponent'), { ssr: false, loading: () => <div className="w-full h-full bg-gray-100 rounded-xl animate-pulse"></div> });

export default function EditStaffModal({ staff, onClose }: any) {
  const [form, setForm] = useState({ 
    name: staff?.name || '', 
    mobile: staff?.mobile || '', 
    designation: staff?.designation || '', 
    salary: staff?.salary || '', 
    joiningDate: staff?.joiningDate ? new Date(staff.joiningDate).toISOString().split('T')[0] : '', 
    staffType: staff?.staffType || 'Regular', 
    monthlyTarget: staff?.monthlyTarget || 26,
    monthlyLeaveQuota: staff?.monthlyLeaveQuota ?? 4,
    overtime: staff?.overtime || { enabled: false, thresholdHours: 9, ratePerHour: 100 },
    username: staff?.username || '', 
    password: '', // leave empty to not update
    geofence: (staff?.geofence && staff.geofence.lat) ? staff.geofence : { lat: 28.6129, lng: 77.2295, radius: 200 },
    shift: staff?.shift || { startTime: '09:00', endTime: '18:00' }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put(`/admin/staff/${staff._id}`, form);
      toast.success('Staff updated successfully!');
      onClose();
      window.location.reload();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update staff');
    }
  };

  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setForm({ ...form, geofence: { ...form.geofence, lat: position.coords.latitude, lng: position.coords.longitude } });
          toast.success('Location updated!');
        },
        () => toast.error('Unable to retrieve your location')
      );
    } else {
      toast.error('Geolocation not supported');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-gray-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-[2.5rem] w-full max-w-5xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden relative my-auto">
        
        {/* Header */}
        <div className="bg-gray-50 p-6 lg:p-8 border-b border-gray-200 flex justify-between items-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/10 blur-[50px] rounded-full"></div>
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center shadow-sm border border-blue-200">
              <UserPlus className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">EDIT STAFF RECORD</h2>
              <p className="text-xs font-medium text-gray-500 mt-1">Update personnel details</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full bg-white hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all z-10 border border-gray-200 shadow-sm">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 lg:p-10 overflow-y-auto max-h-[75vh]">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* LEFT COLUMN */}
            <div className="space-y-8">
              
              {/* Personal Identity */}
              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1 h-4 bg-blue-600 rounded-full"></div>
                  <h3 className="text-sm font-black text-gray-800 tracking-widest uppercase">Personal Identity</h3>
                </div>
                <div className="space-y-5">
                  <div>
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Full Name</label>
                    <input required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" placeholder="e.g. John Doe" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Mobile Number</label>
                    <input required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" placeholder="e.g. 9876543210" value={form.mobile} onChange={e=>setForm({...form,mobile:e.target.value})} />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Designation</label>
                    <input className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" placeholder="e.g. Senior Manager" value={form.designation} onChange={e=>setForm({...form,designation:e.target.value})} />
                  </div>
                </div>
              </div>

              {/* System Access */}
              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1 h-4 bg-blue-600 rounded-full"></div>
                  <h3 className="text-sm font-black text-gray-800 tracking-widest uppercase">System Access</h3>
                </div>
                <div className="space-y-5">
                  <div>
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Username</label>
                    <input required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" placeholder="e.g. john_staff" value={form.username} onChange={e=>setForm({...form,username:e.target.value})} />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Password</label>
                    <input type="password" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" placeholder="••••••••" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-8">
              
              {/* Payroll & Leave Policy */}
              {/* Payroll & Leave Policy */}
              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[50px] rounded-full"></div>
                <div className="flex items-center gap-2 mb-6 relative z-10">
                  <div className="w-1 h-4 bg-blue-600 rounded-full"></div>
                  <h3 className="text-sm font-black text-gray-800 tracking-widest uppercase">Payroll & Leave Policy</h3>
                </div>
                
                <div className="relative z-10">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-4">Staff Type</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    {/* Regular Card */}
                    <div 
                      onClick={() => setForm({...form, staffType: 'Regular'})}
                      className={cn(
                        "cursor-pointer p-4 rounded-2xl border-2 transition-all duration-300 relative overflow-hidden flex flex-col items-center text-center gap-2",
                        form.staffType === 'Regular' ? "border-blue-500 bg-blue-50/50 shadow-[0_0_15px_rgba(59,130,246,0.15)] scale-[1.02]" : "border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50"
                      )}
                    >
                      <div>
                        <p className={cn("font-black text-xs tracking-tight mb-1", form.staffType === 'Regular' ? "text-blue-900" : "text-gray-700")}>Regular</p>
                        <p className="text-[9px] font-bold text-gray-400 leading-snug">Standard Salary</p>
                      </div>
                    </div>

                    {/* Fixed Card */}
                    <div 
                      onClick={() => setForm({...form, staffType: 'Fixed'})}
                      className={cn(
                        "cursor-pointer p-4 rounded-2xl border-2 transition-all duration-300 relative overflow-hidden flex flex-col items-center text-center gap-2",
                        form.staffType === 'Fixed' ? "border-purple-500 bg-purple-50/50 shadow-[0_0_15px_rgba(168,85,247,0.15)] scale-[1.02]" : "border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50"
                      )}
                    >
                      <div>
                        <p className={cn("font-black text-xs tracking-tight mb-1", form.staffType === 'Fixed' ? "text-purple-900" : "text-gray-700")}>Fixed</p>
                        <p className="text-[9px] font-bold text-gray-400 leading-snug">Fixed Monthly Pay</p>
                      </div>
                    </div>

                    {/* Daily Wage Card */}
                    <div 
                      onClick={() => setForm({...form, staffType: 'Daily'})}
                      className={cn(
                        "cursor-pointer p-4 rounded-2xl border-2 transition-all duration-300 relative overflow-hidden flex flex-col items-center text-center gap-2",
                        form.staffType === 'Daily' ? "border-green-500 bg-green-50/50 shadow-[0_0_15px_rgba(34,197,94,0.15)] scale-[1.02]" : "border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50"
                      )}
                    >
                      <div>
                        <p className={cn("font-black text-xs tracking-tight mb-1", form.staffType === 'Daily' ? "text-green-900" : "text-gray-700")}>Daily Wage</p>
                        <p className="text-[9px] font-bold text-gray-400 leading-snug">Paid per day</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5 mb-5 relative z-10">
                  <div>
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">{form.staffType === 'Daily' ? 'Daily Wage (Per Day)' : 'Monthly Salary'}</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600 font-black">₹</span>
                      <input type="number" required className="w-full bg-gray-50/50 border border-gray-200 rounded-xl pl-8 pr-4 py-3 text-sm font-black text-blue-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner focus:bg-white" placeholder="0" value={form.salary} onChange={e=>setForm({...form,salary:e.target.value})} />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2 text-right">Joining Date</label>
                    <input type="date" required className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-black text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner focus:bg-white text-right" value={form.joiningDate} onChange={e=>setForm({...form,joiningDate:e.target.value})} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5 mb-5 relative z-10">
                  <div>
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Monthly Target</label>
                    <input type="number" className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-black text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner focus:bg-white" value={form.monthlyTarget} onChange={e=>setForm({...form,monthlyTarget:Number(e.target.value)})} />
                  </div>
                  {form.staffType === 'Regular' && (
                  <div>
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Monthly Leave Quota</label>
                    <input type="number" className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-black text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner focus:bg-white" value={form.monthlyLeaveQuota} onChange={e=>setForm({...form,monthlyLeaveQuota:Number(e.target.value)})} />
                  </div>
                  )}
                  <div>
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2 text-right">Overtime Check</label>
                    <div className="flex items-center justify-end h-full">
                       <input type="checkbox" checked={form.overtime.enabled} onChange={e=>setForm({...form, overtime: {...form.overtime, enabled: e.target.checked}})} className="w-5 h-5" />
                       <span className="ml-2 text-sm font-bold text-gray-700">Enabled</span>
                    </div>
                  </div>
                </div>

                {form.overtime.enabled && (
                  <div className="grid grid-cols-2 gap-5 mb-5 relative z-10 bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <div>
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Threshold Hours</label>
                      <input type="number" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-black text-gray-900 focus:outline-none focus:border-blue-500" value={form.overtime.thresholdHours} onChange={e=>setForm({...form, overtime: {...form.overtime, thresholdHours: Number(e.target.value)}})} />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2 text-right">Rate Per Hour</label>
                      <input type="number" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-black text-gray-900 focus:outline-none focus:border-blue-500 text-right" value={form.overtime.ratePerHour} onChange={e=>setForm({...form, overtime: {...form.overtime, ratePerHour: Number(e.target.value)}})} />
                    </div>
                  </div>
                )}
              </div>

              {/* Work Geofencing */}
              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <h3 className="text-sm font-black text-gray-800 tracking-widest uppercase">Work Geofencing</h3>
                </div>

                <div className="flex gap-3 mb-4">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm font-bold text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" placeholder="Search Office (e.g. City Branch Office)" />
                  </div>
                  <button type="button" onClick={handleLocateMe} className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-xl font-bold text-xs flex items-center gap-2 transition-colors whitespace-nowrap shadow-md">
                    <div className="w-3 h-3 rounded-full border-2 border-white flex items-center justify-center"><div className="w-1 h-1 bg-white rounded-full"></div></div> LOCATE ME
                  </button>
                </div>

                <div className="h-48 rounded-xl border border-gray-200 overflow-hidden relative mb-4">
                  <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur border border-gray-200 px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-[10px] font-black text-gray-800 tracking-widest uppercase">Live Preview</span>
                  </div>
                  {/* The interactive map goes here */}
                  <DynamicMap lat={form.geofence.lat} lng={form.geofence.lng} radius={form.geofence.radius} onChangeLocation={(lat:number, lng:number) => setForm({...form, geofence: {...form.geofence, lat, lng}})} />
                  
                  {/* Floating Info inside Map */}
                  <div className="absolute bottom-4 left-4 z-10 bg-white/90 backdrop-blur border border-gray-200 px-4 py-3 rounded-2xl flex items-center gap-3 shadow-sm">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100">
                      <div className="w-3 h-3 rounded-full border-2 border-blue-500 flex items-center justify-center"><div className="w-1 h-1 bg-blue-500 rounded-full"></div></div>
                    </div>
                    <div>
                      <p className="text-xs font-black text-gray-900 tracking-tight">{form.geofence.radius}m Radius</p>
                      <p className="text-[9px] font-bold text-gray-500">Allowed Punch-In Area</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 p-5 rounded-2xl mb-4">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-blue-500" />
                      <p className="text-[10px] font-black text-gray-800 tracking-widest uppercase">Range Control</p>
                    </div>
                    <div className="bg-white border border-gray-200 px-3 py-1 rounded-lg shadow-sm">
                      <span className="text-[10px] font-black text-blue-600">{form.geofence.radius}m</span>
                    </div>
                  </div>
                  <input type="range" min="50" max="1000" step="50" value={form.geofence.radius} onChange={e=>setForm({...form, geofence: {...form.geofence, radius: Number(e.target.value)}})} className="w-full accent-blue-600 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                  <div className="flex justify-between mt-3 text-[9px] font-bold text-gray-500 uppercase tracking-widest">
                    <span>50m (Strict)</span>
                    <span>1000m (Relaxed)</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Info className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
                  <p className="text-[10px] font-medium text-gray-500 leading-relaxed">Drag the marker on the map to fine-tune the center point. Punch-in will only be allowed within the highlighted circle.</p>
                </div>
              </div>

              {/* Shift Timings */}
              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <h3 className="text-sm font-black text-gray-800 tracking-widest uppercase">Shift Timings</h3>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Punch-In Time</label>
                    <div className="relative">
                      <input type="time" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-black text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" value={form.shift.startTime} onChange={e=>setForm({...form, shift: {...form.shift, startTime: e.target.value}})} />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">Punch-Out Time</label>
                    <div className="relative">
                      <input type="time" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-black text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" value={form.shift.endTime} onChange={e=>setForm({...form, shift: {...form.shift, endTime: e.target.value}})} />
                    </div>
                  </div>
                </div>
              </div>

              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black tracking-widest uppercase py-5 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 mt-4 text-sm">
                <div className="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center"><CheckCircle className="w-3 h-3 text-white" /></div> UPDATE STAFF RECORD
              </button>

            </div>
          </form>
        </div>

      </div>
    </div>
  );
}

const CheckCircle = ({ className }: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12"></polyline></svg>
);

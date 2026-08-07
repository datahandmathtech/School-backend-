import React from 'react';
import { X, User, Phone, Briefcase, MapPin, Calendar, Clock, DollarSign, Target, Settings, AlertCircle } from 'lucide-react';
import { cn } from '@/utils/cn';
import api from '@/services/api';
import toast from 'react-hot-toast';

export default function StaffDetailView({ staff, onClose, onRefresh }: any) {
  if (!staff) return null;

  const handleBlockStaff = async () => {
    if (!window.confirm(`Are you sure you want to ${staff.status === 'blocked' ? 'unblock' : 'block'} this staff member?`)) return;
    try {
      await api.put(`/admin/staff/${staff._id}/block`);
      toast.success(`Staff ${staff.status === 'blocked' ? 'unblocked' : 'blocked'} successfully`);
      onRefresh();
      onClose();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-gray-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-[2rem] w-full max-w-4xl shadow-2xl overflow-hidden relative my-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white relative">
          <div className="absolute top-4 right-4 z-10 flex gap-2">
            <button onClick={handleBlockStaff} className={cn("px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm", staff.status === 'blocked' ? "bg-green-500 hover:bg-green-600 text-white" : "bg-red-500 hover:bg-red-600 text-white")}>
              {staff.status === 'blocked' ? 'UNBLOCK STAFF' : 'BLOCK STAFF'}
            </button>
            <button onClick={onClose} className="p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center gap-6 relative z-10">
            <div className="w-24 h-24 rounded-2xl bg-white flex items-center justify-center text-blue-600 text-3xl font-black shadow-lg">
              {staff.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-3xl font-black">{staff.name}</h2>
                {staff.status === 'blocked' && (
                  <span className="bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-md tracking-wider">BLOCKED</span>
                )}
              </div>
              <p className="text-blue-100 font-medium mt-1 text-sm flex items-center gap-2">
                <Briefcase className="w-4 h-4" /> {staff.designation || 'Staff Member'}
              </p>
              <p className="text-blue-200 font-medium mt-1 text-sm flex items-center gap-2">
                <Phone className="w-4 h-4" /> {staff.mobile}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-50/50">
          
          {/* Identity & Access */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-xs font-black text-gray-400 tracking-widest uppercase mb-4 flex items-center gap-2">
                <Settings className="w-4 h-4" /> System Access
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] text-gray-500 font-bold tracking-wider mb-1">USERNAME</p>
                  <p className="font-bold text-gray-900">{staff.username || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-bold tracking-wider mb-1">ROLE</p>
                  <p className="font-bold text-gray-900 capitalize">{staff.role}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-bold tracking-wider mb-1">JOINING DATE</p>
                  <p className="font-bold text-gray-900">{staff.joiningDate ? new Date(staff.joiningDate).toLocaleDateString() : 'N/A'}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-xs font-black text-gray-400 tracking-widest uppercase mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Location & Shift
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] text-gray-500 font-bold tracking-wider mb-1">GEOFENCE</p>
                  <p className="font-bold text-gray-900">{staff.geofence?.radius}m Radius</p>
                  {staff.geofence?.lat && <p className="text-xs text-gray-400 mt-1">Lat: {staff.geofence.lat.toFixed(4)}, Lng: {staff.geofence.lng.toFixed(4)}</p>}
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-bold tracking-wider mb-1">SHIFT TIMINGS</p>
                  <p className="font-bold text-gray-900">{staff.shift?.startTime} to {staff.shift?.endTime}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payroll & Policy */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full blur-[40px]"></div>
              <h3 className="text-xs font-black text-blue-600 tracking-widest uppercase mb-4 flex items-center gap-2 relative z-10">
                <DollarSign className="w-4 h-4" /> Payroll & Compensation
              </h3>
              
              <div className="grid grid-cols-2 gap-6 relative z-10">
                <div>
                  <p className="text-[10px] text-gray-500 font-bold tracking-wider mb-1">STAFF TYPE</p>
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 font-bold text-xs rounded-lg">{staff.staffType || 'Regular'}</span>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-bold tracking-wider mb-1">BASE SALARY</p>
                  <p className="font-black text-xl text-gray-900">₹{staff.salary?.toLocaleString()}</p>
                </div>
                
                {staff.staffType === 'Regular' && (
                  <div>
                    <p className="text-[10px] text-gray-500 font-bold tracking-wider mb-1">LEAVE QUOTA</p>
                    <p className="font-bold text-gray-900">{staff.monthlyLeaveQuota} Days / Month</p>
                  </div>
                )}
                
                <div>
                  <p className="text-[10px] text-gray-500 font-bold tracking-wider mb-1">MONTHLY TARGET</p>
                  <div className="flex items-center gap-1.5 font-bold text-gray-900">
                    <Target className="w-4 h-4 text-orange-500" /> {staff.monthlyTarget || 26} Days
                  </div>
                </div>
              </div>

              {staff.overtime?.enabled && (
                <div className="mt-6 pt-6 border-t border-gray-100 relative z-10">
                  <h4 className="text-[10px] font-black text-gray-500 tracking-widest mb-3 flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5" /> OVERTIME RULES
                  </h4>
                  <div className="flex gap-8">
                    <div>
                      <p className="text-xs text-gray-500">Threshold</p>
                      <p className="font-bold text-gray-900">{staff.overtime.thresholdHours} Hours/Day</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Rate</p>
                      <p className="font-bold text-gray-900">₹{staff.overtime.ratePerHour} / Hour</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {!staff.faceDescriptor || staff.faceDescriptor.length === 0 ? (
              <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-orange-900 text-sm">Face Not Registered</p>
                  <p className="text-xs text-orange-700 mt-1">This staff member cannot punch in via the mobile app until they register their face.</p>
                </div>
              </div>
            ) : (
              <div className="bg-green-50 border border-green-100 p-4 rounded-xl flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">✓</div>
                <div>
                  <p className="font-bold text-green-900 text-sm">Face Registered</p>
                  <p className="text-xs text-green-700 mt-1">Biometric authentication is active for this personnel.</p>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

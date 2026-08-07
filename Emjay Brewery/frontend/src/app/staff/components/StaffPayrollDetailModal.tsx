import React, { useState, useEffect } from 'react';
import { X, FileText, Download, Calendar, DollarSign, Clock, Settings, ArrowRight } from 'lucide-react';
import api from '@/services/api';

interface StaffPayrollDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  staff: any;
  payroll: any;
  month: number;
  year: number;
  onSettle: (payrollId: string) => void;
}

export default function StaffPayrollDetailModal({ isOpen, onClose, staff, payroll, month, year, onSettle }: StaffPayrollDetailModalProps) {
  const [attendance, setAttendance] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const selectedMonthName = monthNames[month];

  useEffect(() => {
    if (isOpen && staff) {
      setLoading(true);
      api.get(`/admin/staff/attendance?month=${month + 1}&year=${year}`)
        .then(res => {
          const staffAttendance = res.data.filter((a: any) => a.staff?._id === staff._id || a.staff === staff._id);
          setAttendance(staffAttendance);
        })
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [isOpen, staff, month, year]);

  if (!isOpen || !staff || !payroll) return null;

  // Generate calendar days
  const getDaysInMonth = (m: number, y: number) => new Date(y, m + 1, 0).getDate();
  const daysInMonth = getDaysInMonth(month, year);
  
  const days = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const record = attendance.find(a => a.date === dateStr);
    return {
      day,
      status: record ? record.status : 'absent'
    };
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-5xl rounded-[2rem] shadow-2xl flex flex-col md:flex-row overflow-hidden max-h-[90vh]">
        
        {/* Left Side: Summary & Actions */}
        <div className="w-full md:w-[35%] bg-gray-50 border-r border-gray-200 p-8 flex flex-col overflow-y-auto custom-scrollbar">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-full bg-blue-600 text-white font-bold text-xl flex items-center justify-center shadow-lg">
              {staff.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{staff.name}</h2>
              <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest">{staff.role}</p>
            </div>
          </div>

          {/* Earned So Far */}
          <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-6 relative overflow-hidden group hover:border-gray-200 transition-colors">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <FileText className="w-16 h-16" />
            </div>
            <p className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-1 relative z-10">Earned So Far</p>
            <div className="flex items-baseline gap-1 relative z-10">
              <span className="text-3xl font-bold text-gray-400">₹</span>
              <span className="text-5xl font-black text-gray-900 tracking-tight">{Math.round(payroll.amount || 0).toLocaleString('en-IN')}</span>
            </div>
            <p className="text-[10px] text-gray-400 mt-2 font-bold flex items-center gap-1.5 relative z-10 uppercase tracking-widest">
              <Calendar className="w-3.5 h-3.5" /> {payroll.cycleStart} → {payroll.cycleEnd}
            </p>
            <button className="w-full mt-6 bg-gray-900 hover:bg-black text-white font-bold py-3.5 px-4 rounded-xl text-sm transition-all flex items-center justify-center gap-2 relative z-10 shadow-lg shadow-gray-900/20 active:scale-[0.98]">
              <Download className="w-4 h-4" />
              DOWNLOAD SALARY SLIP
            </button>
          </div>

          {/* Leave Pool */}
          {payroll.carryForwardStats && staff.staffType === 'Regular' && (
            <div className="bg-white border-2 border-gray-100 rounded-2xl p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] mb-6">
              <h3 className="text-[10px] font-black text-gray-400 tracking-widest uppercase mb-4">Leave Carry-Forward Pool</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50/50 border border-blue-100/50 rounded-xl p-3.5 flex flex-col justify-center">
                  <p className="text-2xl font-black text-blue-600 leading-none">{payroll.carryForwardStats.historicalBalance || 0}</p>
                  <p className="text-[9px] font-bold text-blue-500/70 uppercase tracking-widest mt-1.5">Previous C/F</p>
                </div>
                <div className="bg-gray-50/50 border border-gray-100/80 rounded-xl p-3.5 flex flex-col justify-center">
                  <p className="text-2xl font-black text-gray-900 leading-none">{staff.monthlyLeaveQuota !== undefined ? staff.monthlyLeaveQuota : 4}</p>
                  <p className="text-[9px] font-bold text-gray-500/70 uppercase tracking-widest mt-1.5">Allowed Leaves</p>
                </div>
                <div className="bg-green-50/50 border border-green-100/50 rounded-xl p-3.5 flex flex-col justify-center">
                  <p className="text-2xl font-black text-green-600 leading-none">{payroll.carryForwardStats.availableThisMonth || 0}</p>
                  <p className="text-[9px] font-bold text-green-600/70 uppercase tracking-widest mt-1.5">Total Available</p>
                </div>
                <div className="bg-red-50/50 border border-red-100/50 rounded-xl p-3.5 flex flex-col justify-center">
                  <p className="text-2xl font-black text-red-600 leading-none">{payroll.carryForwardStats.utilizedThisMonth || 0}</p>
                  <p className="text-[9px] font-bold text-red-500/70 uppercase tracking-widest mt-1.5">Utilized This Month</p>
                </div>
              </div>
            </div>
          )}

          {/* Final Calculation */}
          <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] mt-auto">
            <h3 className="text-[10px] font-black text-gray-400 tracking-widest uppercase mb-4 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" /> Final Payout Calculation
            </h3>
            <div className="space-y-3 text-xs font-bold text-gray-500 uppercase tracking-wide">
              <p className="flex justify-between items-center"><span>Base Salary:</span> <span className="text-gray-900 font-black text-sm">₹{payroll.basicSalary?.toLocaleString('en-IN')}</span></p>
              <p className="flex justify-between items-center"><span>Total Days in Cycle:</span> <span className="text-gray-900 font-black text-sm">{payroll.totalDaysInCycle}</span></p>
              <p className="flex justify-between items-center"><span>Present Days:</span> <span className="text-gray-900 font-black text-sm">{payroll.presentDays}</span></p>
              <p className="flex justify-between items-center"><span>Paid Leaves:</span> <span className="text-gray-900 font-black text-sm">{payroll.paidLeaves}</span></p>
              <p className="flex justify-between items-center"><span>Advances Deducted:</span> <span className="text-gray-900 font-black text-sm">₹{payroll.advances?.toLocaleString('en-IN') || 0}</span></p>
            </div>
            
            <div className="mt-5 pt-5 border-t border-gray-100">
              <p className="text-[10px] font-bold text-gray-400 tracking-widest mb-1.5">
                ({payroll.basicSalary?.toLocaleString('en-IN')} / {payroll.totalDaysInCycle}) x {payroll.presentDays + payroll.paidLeaves}
              </p>
              <p className="text-lg font-black text-blue-600 uppercase tracking-wide flex items-center gap-2">
                <ArrowRight className="w-4 h-4"/> ₹{Math.round(payroll.amount || 0).toLocaleString('en-IN')} (TOTAL SALARY)
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Calendar & Actions */}
        <div className="w-full md:w-[65%] p-8 flex flex-col relative bg-white h-full overflow-hidden">
          <button onClick={onClose} className="absolute top-6 right-6 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors text-gray-500 z-10">
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pr-12 gap-4">
            <div>
              <h2 className="text-2xl font-black text-gray-900">{selectedMonthName} {year} Cycle Calendar</h2>
              <p className="text-xs font-bold text-gray-500 mt-1.5 uppercase tracking-widest">{payroll.cycleStart} → {payroll.cycleEnd}</p>
            </div>
            
            <div className="flex gap-4 items-center bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-100 shadow-sm shrink-0">
              <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-green-500"></div><span className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">PRESENT</span></div>
              <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div><span className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">HALF DAY</span></div>
              <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-red-500"></div><span className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">ABSENT</span></div>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="flex-1 bg-gray-50 border border-gray-200 rounded-3xl p-6 mb-8 overflow-y-auto custom-scrollbar shadow-inner">
            {loading ? (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                <p className="text-xs font-bold text-gray-400 mt-4 animate-pulse uppercase tracking-widest">Loading Records...</p>
              </div>
            ) : (
              <div className="grid grid-cols-7 gap-3 sm:gap-4">
                {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                  <div key={day} className="text-center text-[10px] font-black text-gray-400 tracking-widest uppercase mb-2">
                    {day}
                  </div>
                ))}
                
                {/* Empty slots for start of month */}
                {Array.from({ length: new Date(year, month, 1).getDay() }).map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square rounded-2xl bg-transparent opacity-50"></div>
                ))}
                
                {/* Days */}
                {days.map((d, i) => {
                  let bgColor = 'bg-white hover:bg-gray-50 border border-gray-200';
                  let dotColor = 'bg-gray-200';
                  let textColor = 'text-gray-400';
                  
                  if (d.status === 'present') {
                    bgColor = 'bg-green-50 border border-green-100 shadow-[0_2px_10px_rgba(34,197,94,0.1)]';
                    dotColor = 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]';
                    textColor = 'text-green-700';
                  } else if (d.status === 'half-day') {
                    bgColor = 'bg-yellow-50 border border-yellow-100 shadow-[0_2px_10px_rgba(234,179,8,0.1)]';
                    dotColor = 'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]';
                    textColor = 'text-yellow-700';
                  } else if (d.status === 'absent') {
                    // Highlight absent if it's in the past (before today)
                    const isPast = new Date(year, month, d.day) < new Date();
                    if (isPast) {
                      bgColor = 'bg-red-50 border border-red-100 shadow-[0_2px_10px_rgba(239,68,68,0.1)]';
                      dotColor = 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]';
                      textColor = 'text-red-700';
                    }
                  }
                  
                  return (
                    <div key={i} className={`aspect-square rounded-2xl flex flex-col items-center justify-center relative transition-all duration-300 cursor-pointer ${bgColor}`}>
                      <span className={`text-xl font-black ${textColor}`}>{d.day}</span>
                      <div className={`absolute bottom-3 w-1.5 h-1.5 rounded-full ${dotColor}`}></div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          
          <div className="flex justify-between items-center mt-auto shrink-0 border-t border-gray-100 pt-6">
            <div className="flex gap-8 px-2">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">PAYROLL ACCRUAL</p>
                <p className="text-base font-black text-gray-800 mt-1">100%</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">EARNED DAYS RATE</p>
                <p className="text-base font-black text-gray-800 mt-1">{payroll.presentDays}/{payroll.totalDaysInCycle}</p>
              </div>
            </div>
            
            {payroll.status === 'pending' && (
              <button onClick={() => { onClose(); onSettle(payroll._id); }} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-8 rounded-xl text-sm shadow-[0_8px_16px_rgba(37,99,235,0.2)] transition-all flex items-center gap-2">
                SETTLE PAYMENT <ArrowRight className="w-4 h-4" />
              </button>
            )}
            {payroll.status === 'paid' && (
              <div className="bg-green-100 text-green-700 font-bold py-3.5 px-8 rounded-xl text-sm shadow-sm flex items-center gap-2 border border-green-200">
                SETTLED ALREADY
              </div>
            )}
          </div>
        </div>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #E5E7EB;
          border-radius: 20px;
        }
      `}</style>
    </div>
  );
}

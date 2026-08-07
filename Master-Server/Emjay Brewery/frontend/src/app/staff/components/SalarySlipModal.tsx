import React, { useState, useEffect } from 'react';
import { X, Download, FileText, CheckCircle2, AlertCircle, Info, ChevronDown, Camera } from 'lucide-react';
import api from '@/services/api';
import toast from 'react-hot-toast';
import { generateSalarySlipPDF } from '@/utils/pdfGenerator';

export default function SalarySlipModal({ payroll, onClose, onProcess }: any) {
  const [attendance, setAttendance] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Parse the month and year from payroll
  const month = payroll.month;
  const year = payroll.year;
  const totalDays = new Date(year, month + 1, 0).getDate();

  const getInitials = (name: string) => name?.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase() || 'SM';

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        setLoading(true);
        // The API returns all attendance for the month, we filter by staffId
        const res = await api.get(`/admin/staff/attendance?month=${month + 1}&year=${year}`);
        const staffAttendance = res.data.filter((a: any) => a.staff?._id === payroll.staff?._id);
        setAttendance(staffAttendance);
      } catch (err) {
        toast.error('Failed to load attendance details');
      } finally {
        setLoading(false);
      }
    };
    fetchAttendance();
  }, [month, year, payroll.staff?._id]);

  const daysPresent = payroll.presentDays || 0;
  const paidLeaves = payroll.paidLeaves || 0;
  const earnedSalary = payroll.earnedSalary || 0;
  const totalBaseSalary = payroll.basicSalary || 0;
  const perDay = totalBaseSalary / totalDays;

  // Placeholder calculations based on screenshot
  const leaveCarryForward = 16;
  const leaveUsed = 39;
  const leavePool = 4;
  const unpaidAbsentDays = totalDays - daysPresent - paidLeaves; // Simplistic
  const unpaidDeduction = unpaidAbsentDays > 0 ? unpaidAbsentDays * perDay : 0;

  const handleDownload = () => {
    if (payroll.status === 'pending' && onProcess) {
      onProcess(payroll.staff._id);
    } else {
      toast.success('Generating Salary Slip PDF...');
      try {
        const doc = generateSalarySlipPDF(payroll, month, year);
        const monthName = getMonthName(month);
        doc.save(`Salary_Slip_${payroll.staff?.name || 'Staff'}_${monthName}_${year}.pdf`);
        toast.success('PDF Downloaded successfully!');
      } catch (err) {
        toast.error('Failed to generate PDF');
      }
    }
  };

  const getMonthName = (m: number) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[m] || '';
  };

  const getStatusColor = (status: string) => {
    if (status === 'present') return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    if (status === 'half-day') return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    if (status === 'absent') return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
    return 'bg-gray-800 text-gray-500 border-gray-700';
  };

  const getDotColor = (status: string) => {
    if (status === 'present') return 'bg-emerald-400';
    if (status === 'half-day') return 'bg-yellow-400';
    if (status === 'absent') return 'bg-rose-500';
    return 'bg-transparent';
  };

  // Build calendar grid
  const daysArray = Array.from({ length: totalDays }, (_, i) => {
    const d = i + 1;
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const record = attendance.find(a => new Date(a.date).toISOString().split('T')[0] === dateStr);
    return { day: d, dateStr, record };
  });

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-gray-900/60 backdrop-blur-md overflow-y-auto">
      <div className="bg-white rounded-[2.5rem] w-full max-w-6xl shadow-2xl border border-gray-200 flex flex-col lg:flex-row overflow-hidden relative my-auto">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900 transition-all z-10 border border-gray-200">
          <X className="w-5 h-5" />
        </button>

        {/* LEFT PANEL - Summary */}
        <div className="w-full lg:w-[400px] bg-gray-50 p-8 lg:p-10 flex flex-col border-r border-gray-200">
          
          {/* Profile Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-yellow-50 text-yellow-600 border border-yellow-200 flex items-center justify-center font-black text-xl shadow-sm">
              {getInitials(payroll.staff?.name)}
            </div>
            <div>
              <h2 className="text-xl font-black text-gray-900">{payroll.staff?.name}</h2>
              <p className="text-xs font-black tracking-widest text-yellow-600 uppercase">Staff Member</p>
            </div>
          </div>

          {/* Earned So Far Card */}
          <div className="bg-gradient-to-b from-[#1e293b] to-[#0f172a] rounded-3xl p-6 border border-slate-700/50 mb-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600"></div>
            <div className="text-center mb-6 mt-2">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Earned So Far</p>
              <div className="flex items-start justify-center gap-1">
                <span className="text-xl font-bold text-amber-500 mt-2">₹</span>
                <span className="text-5xl font-black text-white tracking-tight">{Math.round(payroll.amount || 0).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-center gap-2 mt-4 text-xs font-medium text-slate-400">
                <FileText className="w-3.5 h-3.5 text-slate-500" />
                <span>01/{String(month+1).padStart(2,'0')}/{year} → {totalDays}/{String(month+1).padStart(2,'0')}/{year}</span>
              </div>
            </div>
            <button 
              onClick={handleDownload}
              className="w-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 border border-amber-500/30 font-bold py-3.5 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.1)] text-sm tracking-wide"
            >
              <Download className="w-4 h-4" />
              {payroll.status === 'pending' ? 'PROCESS & DOWNLOAD SLIP' : 'DOWNLOAD SALARY SLIP'}
            </button>
          </div>

          {/* Breakdown List */}
          <div className="flex-1 space-y-3">
            
            <div className="bg-[#1e293b]/40 rounded-2xl p-4 border border-indigo-500/20">
              <div className="flex items-center gap-2 mb-1">
                <Info className="w-3.5 h-3.5 text-indigo-400" />
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">How is Salary Calculated?</p>
              </div>
              <p className="text-xs font-medium text-slate-300">(Present + Sundays + Extras) × ₹{Math.round(perDay)}/day</p>
            </div>

            <div className="bg-emerald-900/10 rounded-2xl p-4 border border-emerald-500/10 flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Days Present</p>
                </div>
                <p className="text-[10px] font-medium text-emerald-500/70">Of {totalDays} working days passed</p>
              </div>
              <p className="text-lg font-black text-emerald-400">{daysPresent} <span className="text-xs font-bold text-emerald-500/70">days</span></p>
            </div>

            <div className="bg-amber-900/10 rounded-2xl p-4 border border-amber-500/10 flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3.5 h-1 bg-amber-500 rounded-full" />
                  <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Total Leaves Taken</p>
                </div>
                <p className="text-[10px] font-medium text-amber-500/70">All leaves are unpaid as per policy</p>
              </div>
              <p className="text-lg font-black text-amber-400">{paidLeaves} <span className="text-xs font-bold text-amber-500/70">days</span></p>
            </div>

            <div className="bg-rose-900/10 rounded-2xl p-4 border border-rose-500/10 flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <X className="w-3.5 h-3.5 text-rose-500" />
                  <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Unpaid Absent Days</p>
                </div>
                <p className="text-[10px] font-medium text-rose-500/70">Beyond free allowance → deducted</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-black text-rose-400">{unpaidAbsentDays} <span className="text-xs font-bold text-rose-500/70">days</span></p>
                <p className="text-xs font-bold text-rose-500">-₹{unpaidDeduction.toLocaleString()}</p>
              </div>
            </div>

            {payroll.staff?.staffType === 'Regular' && (
              <div className="bg-[#1e293b]/40 rounded-2xl p-4 border border-slate-700/50">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Leave Carry-Forward Pool</p>
                <div className="flex justify-between">
                  <div>
                    <p className="text-lg font-black text-white">{leaveCarryForward}</p>
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Accrued (Total)</p>
                  </div>
                  <div>
                    <p className="text-lg font-black text-rose-400">{leaveUsed}</p>
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Used (Till Date)</p>
                  </div>
                  <div>
                    <p className="text-lg font-black text-emerald-400">{leavePool}</p>
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Available (Pool)</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Leave Pool Info */}
          {payroll.staff?.staffType === 'Regular' && (
            <div className="mb-8">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Leave Carry-Forward Pool</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                  <span className="text-2xl font-black text-blue-600">{leaveCarryForward}</span>
                  <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-1">Previous C/F</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                  <span className="text-2xl font-black text-gray-900">{leavePool}</span>
                  <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-1">Allowed Leaves</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-emerald-200 shadow-sm">
                  <span className="text-2xl font-black text-emerald-600">{leaveCarryForward + leavePool}</span>
                  <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest mt-1">Total Available</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-rose-200 shadow-sm">
                  <span className="text-2xl font-black text-rose-500">{leaveUsed}</span>
                  <p className="text-[9px] font-bold text-rose-500 uppercase tracking-widest mt-1">Utilized This Month</p>
                </div>
              </div>
            </div>
          )}

          {/* Calculation Summary */}
          <div className="mt-auto">
            <h4 className="text-[10px] font-black text-yellow-600 uppercase tracking-widest mb-3 flex items-center gap-1"><FileText className="w-3 h-3" /> Final Payout Calculation</h4>
            <div className="bg-yellow-50 rounded-2xl p-4 border border-yellow-100 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-gray-600">Extra Leaves: {Math.max(0, unpaidAbsentDays)} day(s)</span>
              </div>
              <p className="text-[11px] font-bold text-gray-500 mb-2">
                ({totalBaseSalary.toLocaleString()} / {totalDays}) x {daysPresent + paidLeaves}
              </p>
              <p className="text-xs font-bold text-gray-500 mb-2">Advances Deducted: -₹{payroll.advances?.toLocaleString()}</p>
              <p className="text-sm font-black text-yellow-600">= ₹{Math.round(payroll.amount || 0).toLocaleString()} (TOTAL SALARY)</p>
            </div>
          </div>

        </div>

        {/* RIGHT PANEL - Calendar & Details */}
        <div className="flex-1 p-8 lg:p-10 bg-white overflow-y-auto max-h-[85vh] scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-xl font-black text-gray-900 tracking-tight">{new Date(year, month).toLocaleString('default', {month:'long'})} {year} Cycle Calendar</h3>
              <p className="text-xs font-medium text-gray-500 mt-1">01/{String(month+1).padStart(2,'0')}/{year} → {totalDays}/{String(month+1).padStart(2,'0')}/{year}</p>
            </div>
            
            <div className="flex gap-4">
              <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div><span className="text-[10px] font-black text-emerald-600 uppercase tracking-wider">Present</span></div>
              <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-yellow-500"></div><span className="text-[10px] font-black text-yellow-600 uppercase tracking-wider">Half Day</span></div>
              <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-rose-500"></div><span className="text-[10px] font-black text-rose-600 uppercase tracking-wider">Absent</span></div>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-3 mb-10">
            {daysArray.map((item, index) => {
              const isActive = !!item.record;
              const statusColor = item.record ? getStatusColor(item.record.status).replace('bg-', 'bg-').replace('border-', 'border-').replace('text-', 'text-') : 'bg-gray-50 text-gray-500 border-gray-200 hover:border-gray-300';
              const dotColor = item.record ? getDotColor(item.record.status) : '';
              
              return (
                <div key={index} className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all cursor-pointer shadow-sm ${statusColor}`}>
                  <span className="text-xs font-black mb-1">{item.day}</span>
                  <span className="text-[8px] font-bold uppercase tracking-widest opacity-60 mb-1">{new Date(year, month, item.day).toLocaleString('default', {weekday:'short'})}</span>
                  {isActive && <div className={`w-1.5 h-1.5 rounded-full ${dotColor} shadow-[0_0_8px_currentColor]`}></div>}
                  {!isActive && <div className="w-1.5 h-1.5 rounded-full bg-transparent"></div>}
                </div>
              );
            })}
          </div>

          {/* Progress Bars */}
          <div className="flex flex-col sm:flex-row gap-8 mb-10 bg-gray-50 p-6 rounded-3xl border border-gray-200 shadow-sm">
            <div className="flex-1">
              <div className="flex justify-between text-xs font-black uppercase tracking-widest mb-3">
                <span className="text-gray-500">Payroll Accrual</span>
                <span className="text-yellow-600">{Math.round((payroll.amount / totalBaseSalary) * 100 || 0)}%</span>
              </div>
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-500 shadow-sm rounded-full" style={{ width: `${Math.min(100, (payroll.amount / totalBaseSalary) * 100 || 0)}%` }}></div>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex justify-between text-xs font-black uppercase tracking-widest mb-3">
                <span className="text-gray-500">Earned Days Rate</span>
                <span className="text-emerald-500">{Math.round((daysPresent / totalDays) * 100 || 0)}%</span>
              </div>
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 shadow-sm rounded-full" style={{ width: `${Math.min(100, (daysPresent / totalDays) * 100 || 0)}%` }}></div>
              </div>
            </div>
          </div>
          {/* Activity Log */}
          <div>
            <h3 className="text-lg font-black text-gray-900 tracking-tight mb-6">Attendance Activity Log</h3>
            <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-gray-50 text-gray-500 font-bold text-[10px] uppercase tracking-widest border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Photos</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Time (In/Out)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {attendance.length > 0 ? attendance.slice().reverse().map((record: any) => (
                    <tr key={record._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-bold text-gray-900">{new Date(record.date).toLocaleDateString('en-GB')}</p>
                        <p className="text-[10px] font-medium text-gray-500">{new Date(record.date).toLocaleDateString('en-GB')}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {record.photoInUrl ? (
                            <img src={record.photoInUrl} alt="In" className="w-8 h-8 rounded-lg object-cover border border-gray-200" />
                          ) : (
                            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center border border-gray-200">
                              <Camera className="w-3 h-3 text-gray-400" />
                            </div>
                          )}
                          {record.photoOutUrl && (
                            <img src={record.photoOutUrl} alt="Out" className="w-8 h-8 rounded-lg object-cover border border-gray-200" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider ${getStatusColor(record.status)}`}>
                          {record.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-emerald-600 text-xs">{record.timeIn || '--:--'}</p>
                        <p className="font-bold text-rose-600 text-xs mt-0.5">{record.timeOut || '--:--'}</p>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-gray-400 font-medium">
                        {loading ? 'Loading records...' : 'No attendance records found for this cycle.'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

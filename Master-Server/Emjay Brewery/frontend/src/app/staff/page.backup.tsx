'use client'
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import SalarySlipModal from './components/SalarySlipModal';
import AddStaffModalLight from './components/AddStaffModalLight';
import EditStaffModalLight from './components/EditStaffModalLight';
import StaffDetailView from './components/StaffDetailView';
import PhotoViewerModal from './components/PhotoViewerModal';
import EditAdvanceModal from './components/EditAdvanceModal';
import { generateBulkSalarySlipsPDF } from '@/utils/pdfGenerator';
import { exportAttendanceToExcel, exportPayrollToExcel } from '@/utils/excelGenerator';
import api from '@/services/api';
import toast from 'react-hot-toast';
import { 
  Users, UserPlus, User, Calendar, Clock, DollarSign,
  CheckCircle, XCircle, FileText, Search, ChevronLeft, ChevronRight,
  Camera, MapPin, Download, Edit2, Trash2, Lock, ArrowUpRight, ArrowDownRight, ArrowRight, Wallet
} from 'lucide-react';
import { cn } from '@/utils/cn';
import ManualDutyModal from './components/ManualDutyModal';
import StaffPayrollDetailModal from './components/StaffPayrollDetailModal';

const StaffManagement = () => {
  const [activeTab, setActiveTab] = useState('directory');
  const [stats, setStats] = useState({ totalPersonnel: 0, todayAttendance: 0 });
  const [payrollStats, setPayrollStats] = useState({ totalBaseSalary: 0, salaryPaid: 0, pendingSalary: 0, totalAdvances: 0 });
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  });

  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);
  const [isManualDutyOpen, setIsManualDutyOpen] = useState(false);
  const [manualDutyDefaultStaff, setManualDutyDefaultStaff] = useState<string | null>(null);
  const [manualDutyDefaultDate, setManualDutyDefaultDate] = useState<string | null>(null);
  const [manualDutyDefaultTimeIn, setManualDutyDefaultTimeIn] = useState<string | null>(null);
  const [isRecordAdvanceOpen, setIsRecordAdvanceOpen] = useState(false);
  const [selectedPayroll, setSelectedPayroll] = useState<any>(null);
  const [settlePayrollData, setSettlePayrollData] = useState<any>(null);
  const [detailModalPayroll, setDetailModalPayroll] = useState<any>(null);

  const [refreshKey, setRefreshKey] = useState(0);
  const triggerRefresh = () => setRefreshKey(prev => prev + 1);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const searchVal = params.get('search') || params.get('name') || params.get('staff');
      if (searchVal) {
        setSearchQuery(searchVal);
      }
    }
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/admin/staff/dashboard-stats');
        setStats(res.data);
      } catch (err) {}
    };
    fetchStats();
  }, [refreshKey]);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 lg:ml-64 p-6 overflow-y-auto pb-20 max-w-7xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Staff Management & Payroll</h1>
        
        {/* Dynamic Stats Cards (Retained for functionality) */}
        <div className={cn("grid gap-6 mb-6", activeTab === 'salary' ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" : "grid-cols-1 md:grid-cols-2")}>
          {activeTab !== 'salary' ? (
            <>
              <div className="bg-white rounded-xl p-6 shadow border border-gray-200 flex justify-between items-center">
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Total Personnel</p>
                  <p className="text-4xl font-black text-gray-900">{stats.totalPersonnel}</p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
              <div className="bg-white rounded-xl p-6 shadow border border-gray-200 flex justify-between items-center">
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Today Attendance</p>
                  <p className="text-4xl font-black text-green-600">{stats.todayAttendance}</p>
                </div>
                <Clock className="w-8 h-8 text-green-500" />
              </div>
            </>
          ) : (
            <>
              <div className="bg-white rounded-xl p-6 shadow border border-gray-200 flex justify-between items-center">
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Total Base Salary</p>
                  <p className="text-2xl font-black text-gray-900">₹{Math.round(payrollStats.totalBaseSalary).toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-gray-400" />
              </div>
              <div className="bg-white rounded-xl p-6 shadow border border-gray-200 flex justify-between items-center">
                <div>
                  <p className="text-xs font-bold text-red-500 uppercase tracking-widest mb-2">Total Advances</p>
                  <p className="text-2xl font-black text-red-600">₹{Math.round(payrollStats.totalAdvances || 0).toLocaleString()}</p>
                </div>
                <ArrowDownRight className="w-8 h-8 text-red-500" />
              </div>
              <div className="bg-white rounded-xl p-6 shadow border border-gray-200 flex justify-between items-center">
                <div>
                  <p className="text-xs font-bold text-green-500 uppercase tracking-widest mb-2">Salary Paid</p>
                  <p className="text-2xl font-black text-green-600">₹{Math.round(payrollStats.salaryPaid).toLocaleString()}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <div className="bg-white rounded-xl p-6 shadow border border-gray-200 flex justify-between items-center">
                <div>
                  <p className="text-xs font-bold text-yellow-500 uppercase tracking-widest mb-2">Pending Salary</p>
                  <p className="text-2xl font-black text-yellow-600">₹{Math.round(payrollStats.pendingSalary).toLocaleString()}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-500" />
              </div>
            </>
          )}
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6 border-b pb-2 overflow-x-auto no-scrollbar">
            <button onClick={() => setActiveTab('directory')} className={`flex items-center gap-2 p-2 whitespace-nowrap transition-colors ${activeTab === 'directory' ? 'border-b-2 border-blue-600 text-blue-600 font-bold' : 'text-gray-500 hover:text-gray-700'}`}>
                <Users size={20} /> Directory
            </button>
            <button onClick={() => setActiveTab('attendance')} className={`flex items-center gap-2 p-2 whitespace-nowrap transition-colors ${activeTab === 'attendance' ? 'border-b-2 border-blue-600 text-blue-600 font-bold' : 'text-gray-500 hover:text-gray-700'}`}>
                <Calendar size={20} /> Attendance
            </button>
            <button onClick={() => setActiveTab('salary')} className={`flex items-center gap-2 p-2 whitespace-nowrap transition-colors ${activeTab === 'salary' ? 'border-b-2 border-blue-600 text-blue-600 font-bold' : 'text-gray-500 hover:text-gray-700'}`}>
                <DollarSign size={20} /> Payroll
            </button>
            <button onClick={() => setActiveTab('advances')} className={`flex items-center gap-2 p-2 whitespace-nowrap transition-colors ${activeTab === 'advances' ? 'border-b-2 border-blue-600 text-blue-600 font-bold' : 'text-gray-500 hover:text-gray-700'}`}>
                <Wallet size={20} /> Advances
            </button>
            <button onClick={() => setActiveTab('leaves')} className={`flex items-center gap-2 p-2 whitespace-nowrap transition-colors ${activeTab === 'leaves' ? 'border-b-2 border-blue-600 text-blue-600 font-bold' : 'text-gray-500 hover:text-gray-700'}`}>
                <FileText size={20} /> Leaves
            </button>
        </div>

        {/* Action Bar (Filters, Search, Add buttons) */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex items-center gap-2">
             <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input type="text" placeholder="Search Personnel..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-9 pr-4 py-2 bg-white border border-gray-300 rounded shadow-sm text-sm w-full sm:w-64 focus:outline-none focus:ring-1 focus:ring-blue-500" />
             </div>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
             {activeTab === 'attendance' ? (
                <div className="flex items-center gap-2 bg-white border border-gray-300 rounded shadow-sm px-2 py-1">
                  <button onClick={() => { const d = new Date(selectedDate); d.setDate(d.getDate() - 1); setSelectedDate(d.toISOString().split('T')[0]); }} className="p-1 hover:bg-gray-100 rounded"><ChevronLeft className="w-4 h-4" /></button>
                  <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="bg-transparent text-sm font-bold text-gray-700 focus:outline-none" />
                  <button onClick={() => { const d = new Date(selectedDate); d.setDate(d.getDate() + 1); setSelectedDate(d.toISOString().split('T')[0]); }} className="p-1 hover:bg-gray-100 rounded"><ChevronRight className="w-4 h-4" /></button>
                </div>
             ) : (
                <div className="flex items-center gap-2 bg-white border border-gray-300 rounded shadow-sm px-2 py-1">
                  <button className="p-1 hover:bg-gray-100 rounded"><ChevronLeft className="w-4 h-4" /></button>
                  <select value={month} onChange={e=>setMonth(Number(e.target.value))} className="bg-transparent text-sm font-bold text-gray-700 focus:outline-none cursor-pointer">
                    {Array.from({length:12}).map((_,i) => <option key={i} value={i}>{new Date(2000, i).toLocaleString('default', {month:'short'}).toUpperCase()}</option>)}
                  </select>
                  <select value={year} onChange={e=>setYear(Number(e.target.value))} className="bg-transparent text-sm font-bold text-gray-700 focus:outline-none cursor-pointer pr-2">
                    {[2024, 2025, 2026, 2027].map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                  <button className="p-1 hover:bg-gray-100 rounded"><ChevronRight className="w-4 h-4" /></button>
                </div>
             )}

            <button onClick={() => setIsAddStaffOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold text-sm shadow flex items-center gap-2">
              <UserPlus className="w-4 h-4" /> Add Staff
            </button>
            <button onClick={() => { setManualDutyDefaultStaff(null); setManualDutyDefaultDate(null); setManualDutyDefaultTimeIn(null); setIsManualDutyOpen(true); }} className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded font-semibold text-sm shadow-sm flex items-center gap-2">
              <Clock className="w-4 h-4" /> Manual Duty
            </button>
            <button onClick={() => setIsRecordAdvanceOpen(true)} className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded font-semibold text-sm shadow-sm flex items-center gap-2">
              <DollarSign className="w-4 h-4" /> Record Advance
            </button>
          </div>
        </div>

        {/* Tab Contents */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 min-h-[500px]">
          {activeTab === 'directory' && <StaffDirectoryTab refreshKey={refreshKey} triggerRefresh={triggerRefresh} getInitials={getInitials} searchQuery={searchQuery} />}
          
          {activeTab === 'attendance' && <AttendanceTrackerTab refreshKey={refreshKey} triggerRefresh={triggerRefresh} selectedDate={selectedDate} getInitials={getInitials} searchQuery={searchQuery} />}
          
          {activeTab === 'salary' && (
              <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold text-gray-800">Payroll Settlement (Auto-Calculated)</h2>
                  </div>
                  <p className="text-gray-500 mb-4 text-sm">Run payroll to apply formula: (Base / Days) * Present + Allowances - Advances.</p>
                  <div className="overflow-x-auto">
                      <SalaryProcessingTab refreshKey={refreshKey} month={month} year={year} getInitials={getInitials} setPayrollStats={setPayrollStats} setSelectedPayroll={setSelectedPayroll} setSettlePayrollData={setSettlePayrollData} setDetailModalPayroll={setDetailModalPayroll} searchQuery={searchQuery} />
                  </div>
              </div>
          )}
          
          {activeTab === 'advances' && <AdvancesTab refreshKey={refreshKey} month={month} year={year} getInitials={getInitials} triggerRefresh={triggerRefresh} searchQuery={searchQuery} />}
          
          {activeTab === 'leaves' && <LeaveRequestsTab refreshKey={refreshKey} triggerRefresh={triggerRefresh} month={month} year={year} getInitials={getInitials} searchQuery={searchQuery} />}
        </div>

        {/* Modals */}
        {isAddStaffOpen && <AddStaffModalLight onClose={() => setIsAddStaffOpen(false)} onSuccess={triggerRefresh} />}
        {isManualDutyOpen && (
          <ManualDutyModal 
            isOpen={isManualDutyOpen}
            onClose={() => setIsManualDutyOpen(false)} 
            defaultStaffId={manualDutyDefaultStaff}
            defaultDate={manualDutyDefaultDate}
            defaultTimeIn={manualDutyDefaultTimeIn}
            onSubmit={async (data) => {
              try {
                await api.post('/admin/staff/manual-duty', data);
                toast.success('Attendance updated successfully');
                triggerRefresh();
                setIsManualDutyOpen(false);
              } catch (err) {
                toast.error('Failed to update attendance');
              }
            }} 
          />
        )}
        {isRecordAdvanceOpen && <RecordAdvanceModal onClose={() => setIsRecordAdvanceOpen(false)} onSuccess={triggerRefresh} />}
        {settlePayrollData && <SettlePaymentModalLight payroll={settlePayrollData} onClose={() => setSettlePayrollData(null)} onSuccess={() => { setSettlePayrollData(null); triggerRefresh(); }} />}
        {selectedPayroll && (
          <SalarySlipModal
            payroll={selectedPayroll}
            onClose={() => setSelectedPayroll(null)}
            onProcess={async (staffId: string) => {
              try {
                await api.post('/admin/staff/salary/process', { staffId, month, year });
                toast.success('Salary Processed & Generated!');
                setSelectedPayroll(null);
                triggerRefresh();
              } catch (err) {
                toast.error('Failed to process salary');
              }
            }}
          />
        )}
        <StaffPayrollDetailModal
          isOpen={!!detailModalPayroll}
          onClose={() => setDetailModalPayroll(null)}
          staff={detailModalPayroll?.staff}
          payroll={detailModalPayroll}
          month={month}
          year={year}
          onSettle={(id) => {
            setSettlePayrollData(detailModalPayroll);
          }}
        />
      </main>
    </div>
  );
};

// -----------------------------------------------------------------------------
// 1. Staff Directory Tab
// -----------------------------------------------------------------------------
const StaffDirectoryTab = ({ refreshKey, triggerRefresh, getInitials, searchQuery }: any) => {
  const [staff, setStaff] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editStaffData, setEditStaffData] = useState<any>(null);
  const [detailStaffData, setDetailStaffData] = useState<any>(null);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        setLoading(true);
        const res = await api.get('/admin/staff');
        setStaff(res.data);
      } catch (err) {} finally { setLoading(false); }
    };
    fetchStaff();
  }, [refreshKey]);

  const deleteStaff = async (id: string) => {
    if (!window.confirm('Delete this staff member permanently?')) return;
    try {
      await api.delete(`/admin/staff/${id}`);
      setStaff(staff.filter(s => s._id !== id));
      toast.success('Staff deleted successfully');
    } catch (err) {
      toast.error('Failed to delete staff');
    }
  };

  if (loading) return <div className="p-12 text-center text-gray-500 font-bold">Loading Personnel...</div>;

  return (
    <>
    <table className="w-full text-left text-sm whitespace-nowrap">
      <thead className="text-gray-400 font-bold text-xs uppercase tracking-widest border-b border-gray-100">
        <tr>
          <th className="px-6 py-5">Personnel</th>
          <th className="px-6 py-5">Designation</th>
          <th className="px-6 py-5">Contact</th>
          <th className="px-6 py-5">Join Date</th>
          <th className="px-6 py-5">Status</th>
          <th className="px-6 py-5 text-right">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-50">
        {staff.filter((s: any) => s.name?.toLowerCase().includes((searchQuery || '').toLowerCase()) || s.username?.toLowerCase().includes((searchQuery || '').toLowerCase())).map((s: any) => (
          <tr key={s._id} className="hover:bg-gray-50/50 transition-colors">
            <td className="px-6 py-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-black text-sm">
                  {getInitials(s.name)}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{s.name}</p>
                  <p className="text-xs text-gray-500 font-medium">@{s.username}</p>
                </div>
              </div>
            </td>
            <td className="px-6 py-4">
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Staff</span>
            </td>
            <td className="px-6 py-4">
              <p className="font-bold text-gray-700">{s.mobile || 'N/A'}</p>
              <p className="text-xs text-gray-400 font-medium">Regular Duty</p>
            </td>
            <td className="px-6 py-4 font-bold text-gray-700">
              {new Date(s.createdAt).toLocaleDateString('en-GB')}
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="font-bold text-green-600 text-xs tracking-wider">ACTIVE</span>
              </div>
            </td>
            <td className="px-6 py-4 text-right">
              <div className="flex justify-end gap-2">
                <button onClick={() => setDetailStaffData(s)} className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors" title="View Details"><User className="w-4 h-4" /></button>
                <button onClick={() => setEditStaffData(s)} className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors" title="Edit"><Edit2 className="w-4 h-4" /></button>
                <button onClick={() => deleteStaff(s._id)} className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
              </div>
            </td>
          </tr>
        ))}
          {staff.length === 0 && <tr><td colSpan={6} className="p-12 text-center text-gray-400 font-medium">No personnel found.</td></tr>}
        </tbody>
      </table>
        {editStaffData && <EditStaffModalLight staff={editStaffData} onClose={() => setEditStaffData(null)} onSuccess={triggerRefresh} />}
        {detailStaffData && <StaffDetailView staff={detailStaffData} onClose={() => setDetailStaffData(null)} onRefresh={triggerRefresh} />}
      </>
    );
};

// -----------------------------------------------------------------------------
// 2. Attendance Tracker Tab
// -----------------------------------------------------------------------------
const AttendanceTrackerTab = ({ refreshKey, triggerRefresh, selectedDate, getInitials, searchQuery }: any) => {
  const [attendance, setAttendance] = useState<any[]>([]);
  const [staffList, setStaffList] = useState<any[]>([]);
  const [photoViewerUrl, setPhotoViewerUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!selectedDate) return;
        const [y, m] = selectedDate.split('-');
        const [attRes, staffRes] = await Promise.all([
          api.get(`/admin/staff/attendance?month=${parseInt(m, 10)}&year=${y}`),
          api.get('/admin/staff')
        ]);
        setAttendance(attRes.data);
        setStaffList(staffRes.data);
      } catch (err) {}
    };
    fetchData();
  }, [selectedDate, refreshKey]);

  const deleteAttendance = async (id: string) => {
    try {
      await api.delete(`/admin/staff/attendance/${id}`);
      toast.success('Attendance record deleted');
      setAttendance(attendance.filter(a => a._id !== id));
    } catch (err) {
      toast.error('Failed to delete attendance');
    }
  };

  const markOut = async (id: string) => {
    try {
      const res = await api.put(`/admin/staff/attendance/${id}/mark-out`);
      toast.success('Staff marked out successfully');
      triggerRefresh();
    } catch (err) {
      toast.error('Failed to mark out');
    }
  };

  const filteredAttendance = attendance.filter(a => {
    if (!a.date) return false;
    const dateStr = new Date(a.date).toISOString().split('T')[0];
    return dateStr === selectedDate;
  });

  const mergedData = staffList.map(staff => {
    const att = filteredAttendance.find(a => a.staff?._id === staff._id || a.staff === staff._id);
    return { staff, attendance: att || null };
  });

  const filteredMerged = mergedData.filter(({ staff, attendance }) => {
    if (!attendance) return false;
    return staff.name?.toLowerCase().includes((searchQuery || '').toLowerCase());
  });

  return (
    <div>
      <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <div>
          <h3 className="font-bold text-gray-900 text-lg tracking-tight">Daily Attendance Tracker</h3>
          <p className="text-xs text-gray-500 font-medium mt-0.5">Date: {new Date(selectedDate).toLocaleDateString('en-GB')}</p>
        </div>
        <button onClick={() => exportAttendanceToExcel(filteredMerged, selectedDate)} className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-bold text-sm shadow-sm flex items-center gap-2 hover:bg-gray-50 transition-colors">
          <Download className="w-4 h-4" /> EXPORT EXCEL
        </button>
      </div>
      <table className="w-full text-left text-sm whitespace-nowrap">
        <thead className="text-gray-400 font-bold text-xs uppercase tracking-widest border-b border-gray-100">
          <tr>
            <th className="px-6 py-5">Date</th>
            <th className="px-6 py-5">Staff Member</th>
            <th className="px-6 py-5">In / Out Times</th>
            <th className="px-6 py-5">Evidence (In / Out)</th>
            <th className="px-6 py-5">Location</th>
            <th className="px-6 py-5 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {filteredMerged.map(({ staff, attendance: a }) => (
            <tr key={staff._id} className="hover:bg-gray-50/50 transition-colors">
              <td className="px-6 py-4">
                <p className="font-bold text-gray-900">{new Date(selectedDate).toLocaleDateString('en-GB')}</p>
                <p className="text-xs text-gray-500 font-medium">{new Date(selectedDate).toLocaleDateString('en-US', {weekday:'long'})}</p>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-black text-sm">
                    {getInitials(staff.name || 'S M')}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{staff.name}</p>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{staff.designation || 'USER: SYSTEM'}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                {a && (a.status === 'present' || a.status === 'half-day') ? (
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-md bg-green-50 flex items-center justify-center">
                        <ArrowUpRight className="w-3.5 h-3.5 text-green-600" />
                      </div>
                      <span className="font-bold text-sm text-gray-800">{a.punchIn?.time ? new Date(a.punchIn.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '--:--'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-md bg-orange-50 flex items-center justify-center">
                        <ArrowDownRight className="w-3.5 h-3.5 text-orange-600" />
                      </div>
                      <span className="font-bold text-sm text-gray-800">{a.punchOut?.time ? new Date(a.punchOut.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'ACTIVE SHIFT'}</span>
                      {!a.punchOut?.time && <button onClick={() => markOut(a._id)} className="text-[10px] font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-100 px-1.5 py-0.5 rounded ml-1 transition-colors">MARK OUT</button>}
                    </div>
                  </div>
                ) : (
                  <span className="bg-gray-50 text-gray-500 border border-gray-200 px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider">Not Punched In</span>
                )}
              </td>
              <td className="px-6 py-4">
                {a && (a.status === 'present' || a.status === 'half-day') ? (
                  <div className="flex items-center gap-1.5">
                    {/* Punch In Evidence */}
                    <div className="relative w-10 h-10 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center shadow-sm border border-gray-200 cursor-pointer" title="Punch In Photo" onClick={() => a.punchIn?.evidence && setPhotoViewerUrl(a.punchIn.evidence)}>
                      {a.punchIn?.evidence ? (
                        <img src={a.punchIn.evidence} alt="In" className="w-full h-full object-cover" />
                      ) : (
                        <Camera className="w-4 h-4 text-gray-400" />
                      )}
                      <div className="absolute top-0 right-0 bg-green-500 w-2.5 h-2.5 rounded-full border border-white shadow-sm"></div>
                    </div>
                    
                    {/* Punch Out Evidence */}
                    <div className="relative w-10 h-10 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center shadow-sm border border-gray-200 opacity-90 cursor-pointer" title="Punch Out Photo" onClick={() => a.punchOut?.evidence && setPhotoViewerUrl(a.punchOut.evidence)}>
                      {a.punchOut?.evidence ? (
                        <img src={a.punchOut.evidence} alt="Out" className="w-full h-full object-cover" />
                      ) : (
                        <Camera className="w-4 h-4 text-gray-400" />
                      )}
                      {a.punchOut?.time && <div className="absolute top-0 right-0 bg-orange-500 w-2.5 h-2.5 rounded-full border border-white shadow-sm"></div>}
                    </div>
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200 border-dashed flex items-center justify-center">
                    <Camera className="w-4 h-4 text-gray-300" />
                  </div>
                )}
              </td>
              <td className="px-6 py-4">
                {a && (a.status === 'present' || a.status === 'half-day') ? (
                  <div className="flex items-start gap-3 max-w-[200px]">
                    <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-gray-900 truncate">
                        {a.punchIn?.location?.lat ? 'Location Tracked' : 'Location unknown'}
                      </p>
                      {a.punchIn?.location?.lat && (
                        <a href={`https://maps.google.com/?q=${a.punchIn.location.lat},${a.punchIn.location.lng}`} target="_blank" className="text-[10px] font-black text-blue-600 hover:text-blue-700 uppercase tracking-widest mt-0.5 block">
                          OPEN MAP →
                        </a>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-3 opacity-60">
                    <div className="p-1.5 rounded-lg bg-gray-50 text-gray-400 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <p className="font-bold text-sm text-gray-400 mt-1">Location unknown</p>
                  </div>
                )}
              </td>
              <td className="px-6 py-4 text-right">
                {a ? (
                  <button onClick={() => deleteAttendance(a._id)} className="w-10 h-10 inline-flex items-center justify-center bg-red-50 hover:bg-red-100 text-red-500 rounded-full transition-colors shadow-sm">
                    <Trash2 className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="w-10 h-10 inline-flex items-center justify-center bg-gray-50 border border-gray-100 rounded-full">
                    <Trash2 className="w-4 h-4 text-gray-300" />
                  </div>
                )}
              </td>
            </tr>
          ))}
          {filteredMerged.length === 0 && (
            <tr>
              <td colSpan={6} className="px-6 py-12 text-center text-gray-400 font-medium bg-gray-50/50">
                No attendance records found for this date.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {photoViewerUrl && <PhotoViewerModal photoUrl={photoViewerUrl} onClose={() => setPhotoViewerUrl(null)} />}
    </div>
  );
};

// -----------------------------------------------------------------------------
// 3. Leave Requests Tab
// -----------------------------------------------------------------------------
const LeaveRequestsTab = ({ refreshKey, triggerRefresh, month, year, getInitials, searchQuery }: any) => {
  const [leaves, setLeaves] = useState<any[]>([]);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const res = await api.get('/admin/staff/leaves');
        setLeaves(res.data);
      } catch (err) {}
    };
    fetchLeaves();
  }, [month, year, refreshKey]);

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-2 h-6 bg-yellow-400 rounded-full"></div>
        <h2 className="text-lg font-black text-gray-900 tracking-tight uppercase">Pending Leave Requests</h2>
      </div>
      
      <table className="w-full text-left text-sm whitespace-nowrap">
        <thead className="text-gray-400 font-bold text-xs uppercase tracking-widest border-b border-gray-100">
          <tr>
            <th className="px-6 py-5">Staff Member</th>
            <th className="px-6 py-5">Leave Dates</th>
            <th className="px-6 py-5">Applied On</th>
            <th className="px-6 py-5 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {leaves.filter((l: any) => l.staff?.name?.toLowerCase().includes((searchQuery || '').toLowerCase())).map((l: any) => (
            <tr key={l._id} className="hover:bg-gray-50/50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-black text-sm">
                    {getInitials(l.staff?.name || 'SM')}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{l.staff?.name}</p>
                    <p className="text-xs text-gray-500 font-medium">{l.type}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <p className="font-bold text-gray-700">{l.startDate} to {l.endDate}</p>
                <p className="text-xs text-gray-400 font-medium truncate w-48">{l.reason}</p>
              </td>
              <td className="px-6 py-4 font-bold text-gray-700">
                {new Date(l.createdAt).toLocaleDateString('en-GB')}
              </td>
              <td className="px-6 py-4 text-right">
                {l.status === 'Pending' ? (
                  <div className="flex justify-end gap-2">
                    <button onClick={async () => {
                      await api.put(`/admin/staff/leaves/${l._id}`, { status: 'Approved' });
                      toast.success('Approved');
                      triggerRefresh();
                    }} className="px-4 py-1.5 rounded-lg bg-green-50 text-green-700 font-bold text-xs hover:bg-green-100 transition-colors">APPROVE</button>
                    <button onClick={async () => {
                      await api.put(`/admin/staff/leaves/${l._id}`, { status: 'Rejected' });
                      toast.success('Rejected');
                      triggerRefresh();
                    }} className="px-4 py-1.5 rounded-lg bg-red-50 text-red-700 font-bold text-xs hover:bg-red-100 transition-colors">REJECT</button>
                  </div>
                ) : (
                  <span className={cn("px-3 py-1 rounded-full text-xs font-bold uppercase", l.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800')}>{l.status}</span>
                )}
              </td>
            </tr>
          ))}
          {leaves.length === 0 && <tr>
            <td colSpan={4} className="py-20 text-center">
              <Calendar className="w-12 h-12 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-400 font-bold">No pending leave requests at the moment.</p>
            </td>
          </tr>}
        </tbody>
      </table>
    </div>
  );
};

// -----------------------------------------------------------------------------
// 4. Advances Tab
// -----------------------------------------------------------------------------
const AdvancesTab = ({ refreshKey, month, year, getInitials, triggerRefresh, searchQuery }: any) => {
  const [advances, setAdvances] = useState<any[]>([]);
  const [editAdvanceData, setEditAdvanceData] = useState<any>(null);
  const totalAdvance = advances.reduce((sum, a) => sum + (a.amount || 0), 0);

  useEffect(() => {
    const fetchAdvances = async () => {
      try {
        const res = await api.get(`/admin/staff/advances?month=${month}&year=${year}`);
        setAdvances(res.data);
      } catch (err) {}
    };
    fetchAdvances();
  }, [month, year, refreshKey]);

  const deleteAdvance = async (id: string) => {
    try {
      await api.delete(`/admin/staff/advances/${id}`);
      setAdvances(advances.filter(a => a._id !== id));
      toast.success('Advance record deleted');
    } catch (err) {
      toast.error('Failed to delete advance');
    }
  };

  return (
    <div>
      <div className="bg-red-50 border-b border-red-100 p-6 flex justify-between items-center">
        <div>
          <p className="text-xs font-bold text-red-600 uppercase tracking-widest mb-1">Total Advances Given</p>
          <p className="text-3xl font-black text-red-700">₹{totalAdvance.toLocaleString()}</p>
          <p className="text-xs font-medium text-red-500 mt-1">Selected Period: {new Date(year, month).toLocaleString('default', {month:'long'})} {year}</p>
        </div>
        <div className="bg-red-100 p-4 rounded-full">
          <DollarSign className="w-8 h-8 text-red-500" />
        </div>
      </div>
      
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h3 className="font-bold text-gray-900 text-lg tracking-tight">Advance Payment Records</h3>
        <p className="text-sm font-bold text-gray-400">{advances.length} Records found</p>
      </div>

      <table className="w-full text-left text-sm whitespace-nowrap">
        <thead className="text-gray-400 font-bold text-xs uppercase tracking-widest border-b border-gray-100">
          <tr>
            <th className="px-6 py-5">Staff Member</th>
            <th className="px-6 py-5">Date</th>
            <th className="px-6 py-5">Amount</th>
            <th className="px-6 py-5">Remark</th>
            <th className="px-6 py-5 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {advances.filter((a: any) => a.staff?.name?.toLowerCase().includes((searchQuery || '').toLowerCase())).map((a: any) => (
            <tr key={a._id} className="hover:bg-gray-50/50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center font-black text-sm">
                    {getInitials(a.staff?.name || 'SM')}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{a.staff?.name}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 font-bold text-gray-700">{new Date(a.date).toLocaleDateString('en-GB')}</td>
              <td className="px-6 py-4 font-black text-red-600">₹{a.amount.toLocaleString()}</td>
              <td className="px-6 py-4 text-gray-500 font-medium">{a.description || '-'}</td>
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2">
                  <button onClick={() => setEditAdvanceData(a)} className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => deleteAdvance(a._id)} className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </td>
            </tr>
          ))}
          {advances.length === 0 && <tr><td colSpan={5} className="p-12 text-center text-gray-400 font-medium">No advances found for this month.</td></tr>}
        </tbody>
      </table>
      {editAdvanceData && <EditAdvanceModal advance={editAdvanceData} onClose={() => setEditAdvanceData(null)} onRefresh={triggerRefresh} />}
    </div>
  );
};

// -----------------------------------------------------------------------------
// 5. Payroll Tab
// -----------------------------------------------------------------------------
const SalaryProcessingTab = ({ refreshKey, month, year, getInitials, setPayrollStats, setSelectedPayroll, setSettlePayrollData, setDetailModalPayroll, searchQuery }: any) => {
  const [payrollData, setPayrollData] = useState<any[]>([]);

  const fetchPayroll = async () => {
    try {
      const res = await api.get(`/admin/staff/payroll-data?month=${month}&year=${year}`);
      setPayrollData(res.data.payments);
      setPayrollStats(res.data.stats);
    } catch (err) {}
  };

  useEffect(() => {
    fetchPayroll();
  }, [month, year, refreshKey]);

  const processSalary = async (staffId: string) => {
    try {
      await api.post('/admin/staff/salary/process', { staffId, month, year });
      toast.success('Salary Processed & Generated!');
      fetchPayroll();
    } catch (err) {
      toast.error('Failed to process salary');
    }
  };

  const generateBulkPayroll = async () => {
    try {
      await api.post('/admin/staff/salary/bulk-process', { month, year });
      toast.success('Bulk Payroll Generated Successfully!');
      fetchPayroll();
    } catch (err) {
      toast.error('Failed to generate bulk payroll');
    }
  };

  const downloadBulkSlips = () => {
    if (payrollData.length === 0) {
      toast.error('No payroll records found. Please generate payroll first.');
      return;
    }
    toast.success('Generating Bulk Salary Slips PDF...');
    try {
      const doc = generateBulkSalarySlipsPDF(payrollData, month, year);
      doc.save(`Bulk_Salary_Slips_${month + 1}_${year}.pdf`);
      toast.success('Bulk PDF Downloaded!');
    } catch (err) {
      toast.error('Failed to generate bulk slips');
    }
  };

  const filteredPayroll = payrollData.filter((p: any) => p.staff?.name?.toLowerCase().includes((searchQuery || '').toLowerCase()));

  return (
    <div>
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h3 className="font-bold text-gray-900 text-lg tracking-tight">Payroll Records</h3>
        <div className="flex gap-3">
          <button onClick={generateBulkPayroll} className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-bold text-sm shadow-sm flex items-center gap-2 hover:bg-gray-50 transition-colors">
            <FileText className="w-4 h-4" /> CALCULATE PAYROLL
          </button>
          <button onClick={downloadBulkSlips} className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-bold text-sm shadow-sm flex items-center gap-2 hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" /> BULK PDF SLIPS
          </button>
          <button onClick={() => exportPayrollToExcel(filteredPayroll, month, year)} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-md flex items-center gap-2 hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" /> EXPORT EXCEL
          </button>
        </div>
      </div>
      
      <table className="w-full text-left text-sm whitespace-nowrap">
        <thead className="text-gray-400 font-bold text-xs uppercase tracking-widest border-b border-gray-100">
          <tr>
            <th className="px-6 py-5">Staff Member</th>
            <th className="px-6 py-5">Attendance</th>
            <th className="px-6 py-5">Base Salary</th>
            <th className="px-6 py-5">Advances</th>
            <th className="px-6 py-5">Total Salary</th>
            <th className="px-6 py-5">Status</th>
            <th className="px-6 py-5 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {filteredPayroll.map((p: any) => (
            <tr key={p._id} className="hover:bg-gray-50/50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-black text-sm">
                    {getInitials(p.staff?.name || 'SM')}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{p.staff?.name}</p>
                    <p className="text-[10px] text-gray-500 font-black tracking-widest uppercase">Specialist</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                  <div className="flex gap-4">
                    <div>
                      <p className="font-black text-green-600 text-sm">{p.presentDays || 0} PRES</p>
                      <p className="text-[9px] font-black tracking-widest text-green-600 uppercase">PRESENT</p>
                    </div>
                    <div>
                      <p className="font-bold text-gray-700 text-sm">01/{String(month+1).padStart(2,'0')}/{String(year).slice(-2)} - 30/{String(month+1).padStart(2,'0')}/{String(year).slice(-2)}</p>
                      <p className="text-[9px] text-gray-400 font-black tracking-widest uppercase mt-0.5">Month Cycle</p>
                    </div>
                  </div>
                </td>
              <td className="px-6 py-4 font-black text-gray-800">₹{Math.round(p.basicSalary || 0).toLocaleString()}</td>
              <td className="px-6 py-4">
                <p className="font-bold text-red-600">₹{Math.round(p.advances || 0).toLocaleString()}</p>
                <p className="text-[10px] text-gray-400 font-black tracking-widest uppercase">Monthly Advance</p>
              </td>
              <td className="px-6 py-4">
                <p className="font-black text-gray-900 text-lg">₹{Math.round((p.earnedSalary || 0) + (p.allowances || 0) - (p.advances || 0)).toLocaleString()}</p>
                <p className="text-[10px] text-yellow-600 font-black tracking-widest uppercase">Net Payable</p>
              </td>
              <td className="px-6 py-4">
                <span className={cn("px-3 py-1.5 rounded-lg text-xs font-black tracking-wider uppercase",
                  p.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                )}>• {p.status}</span>
              </td>
              <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => setDetailModalPayroll(p)} className="w-8 h-8 rounded-xl border border-yellow-200 text-yellow-600 flex items-center justify-center hover:bg-yellow-50 transition-colors shadow-sm" title="Details">
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </td>
            </tr>
          ))}
          {payrollData.length === 0 && <tr>
            <td colSpan={7} className="p-12 text-center">
              <p className="text-gray-400 font-bold mb-4">No payroll records generated for this month.</p>
              <button className="text-blue-600 font-bold text-sm bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100" onClick={generateBulkPayroll}>Generate Payroll Records</button>
            </td>
          </tr>}
        </tbody>
      </table>
    </div>
  );
};

  // -----------------------------------------------------------------------------
  // Modals
  // -----------------------------------------------------------------------------
  
  const SettlePaymentModalLight = ({ payroll, onClose, onSuccess }: any) => {
    const [bonus, setBonus] = useState<number | string>('');
    const [deduction, setDeduction] = useState<number | string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);
  
    const initialAmount = payroll.amount || 0;
    const finalAmount = Math.max(0, initialAmount + Number(bonus || 0) - Number(deduction || 0));
  
    const handleSettle = async () => {
      try {
        setIsSubmitting(true);
        await api.post('/admin/staff/salary/settle', { staffId: payroll.staff._id, month: payroll.month, year: payroll.year, bonus: Number(bonus || 0), deduction: Number(deduction || 0) });
        toast.success('Payment Settled Successfully!');
        onSuccess();
      } catch (e) {
        toast.error('Failed to settle payment');
      } finally {
        setIsSubmitting(false);
      }
    };
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
        <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl p-8 border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-yellow-400"></div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-black text-gray-900 tracking-tight">Settle Final Payment</h2>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <XCircle className="w-6 h-6 text-gray-400 hover:text-gray-600" />
            </button>
          </div>
  
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 flex justify-between items-center">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Net Payable</span>
              <span className="text-lg font-black text-gray-900">₹{initialAmount.toLocaleString()}</span>
            </div>
  
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black text-green-600 uppercase tracking-widest block mb-2">Bonus (+)</label>
                <input type="number" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-black text-green-600 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" value={bonus} onChange={(e) => setBonus(e.target.value)} placeholder="0" />
              </div>
              <div>
                <label className="text-[10px] font-black text-red-600 uppercase tracking-widest block mb-2">Deduction (-)</label>
                <input type="number" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-black text-red-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500" value={deduction} onChange={(e) => setDeduction(e.target.value)} placeholder="0" />
              </div>
            </div>
  
            <div className="bg-yellow-50 rounded-2xl p-5 border border-yellow-200 flex justify-between items-center">
              <span className="text-sm font-black text-yellow-700 uppercase tracking-widest">Final Amount</span>
              <span className="text-2xl font-black text-yellow-600">₹{finalAmount.toLocaleString()}</span>
            </div>
  
            <button onClick={handleSettle} disabled={isSubmitting} className="w-full bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-black tracking-widest uppercase text-sm py-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2">
              {isSubmitting ? 'Processing...' : 'Mark as Paid'}
            </button>
          </div>
        </div>
      </div>
    );
  };
  


const RecordAdvanceModal = ({ onClose, onSuccess }: any) => {
  const [staffList, setStaffList] = useState<any[]>([]);
  const [form, setForm] = useState({ staffId: '', amount: '', date: '', description: '' });

  useEffect(() => {
    api.get('/admin/staff').then(res => {
      setStaffList(res.data);
      if(res.data.length > 0) setForm(f => ({...f, staffId: res.data[0]._id}));
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/admin/staff/advance', form);
      toast.success('Advance Recorded');
      onSuccess?.();
      onClose();
    } catch (error) { toast.error('Failed to record advance'); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl p-8 border border-gray-100">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-black text-gray-900">Record Salary Advance</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100"><XCircle className="w-6 h-6 text-gray-400" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div><label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Select Staff</label>
            <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.staffId} onChange={e=>setForm({...form,staffId:e.target.value})}>
              {staffList.map((s:any) => <option key={s._id} value={s._id}>{s.name}</option>)}
            </select>
          </div>
          <div><label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Advance Amount (₹)</label><input type="number" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-2xl font-black text-red-600 focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.amount} onChange={e=>setForm({...form,amount:e.target.value})} /></div>
          <div><label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Advance Date</label><input type="date" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} /></div>
          <div><label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Reason / Remark</label><input type="text" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} /></div>
          <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-lg mt-4 transition-all">Record Advance</button>
        </form>
      </div>
    </div>
  );
};

export default StaffManagement;

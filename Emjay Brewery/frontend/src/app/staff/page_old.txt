'use client'
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import SalarySlipModal from './components/SalarySlipModal';
import AddStaffModalLight from './components/AddStaffModalLight';
import api from '@/services/api';
import toast from 'react-hot-toast';
import { 
  Users, UserPlus, Calendar, Clock, DollarSign,
  CheckCircle, XCircle, FileText, Search, ChevronLeft, ChevronRight,
  Camera, MapPin, Download, Edit2, Trash2, Lock
} from 'lucide-react';
import { cn } from '@/utils/cn';

const StaffManagement = () => {
  const [activeTab, setActiveTab] = useState('directory');
  const [stats, setStats] = useState({ totalPersonnel: 0, todayAttendance: 0 });
  const [payrollStats, setPayrollStats] = useState({ totalBaseSalary: 0, salaryPaid: 0, pendingSalary: 0 });
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  });

  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);
  const [isManualDutyOpen, setIsManualDutyOpen] = useState(false);
  const [isRecordAdvanceOpen, setIsRecordAdvanceOpen] = useState(false);
  const [selectedPayroll, setSelectedPayroll] = useState<any>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/admin/staff/dashboard-stats');
        setStats(res.data);
      } catch (err) {}
    };
    fetchStats();
  }, []);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <div className="flex min-h-screen bg-[#F5F7FA]">
      <Sidebar />
      <main className="flex-1 lg:ml-64 p-8 overflow-y-auto pb-20">
        {/* Header Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 text-blue-600 p-2 rounded-xl">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-gray-900 tracking-tight">Staff Operations</h1>
                <p className="text-sm text-gray-500 font-medium">Manage personnel, attendance and monthly payroll</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setIsAddStaffOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-md transition-all flex items-center gap-2">
              <UserPlus className="w-4 h-4" /> Add Staff
            </button>
            <button onClick={() => setIsManualDutyOpen(true)} className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-5 py-2.5 rounded-full font-bold text-sm shadow-sm transition-all flex items-center gap-2">
              <Clock className="w-4 h-4" /> Manual Duty
            </button>
            <button onClick={() => setIsRecordAdvanceOpen(true)} className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-5 py-2.5 rounded-full font-bold text-sm shadow-sm transition-all flex items-center gap-2">
              <DollarSign className="w-4 h-4" /> Record Advance
            </button>
            <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 p-2.5 rounded-full shadow-sm transition-all">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dynamic Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {activeTab !== 'salary' ? (
            <>
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200 flex justify-between items-center relative overflow-hidden group hover:shadow-md transition-shadow">
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Total Personnel</p>
                  <p className="text-4xl font-black text-gray-900">{stats.totalPersonnel}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8 text-gray-400" />
                </div>
              </div>
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200 flex justify-between items-center relative overflow-hidden group hover:shadow-md transition-shadow">
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Today Attendance</p>
                  <p className="text-4xl font-black text-green-600">{stats.todayAttendance}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-2xl group-hover:scale-110 transition-transform">
                  <Clock className="w-8 h-8 text-green-500" />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200 flex justify-between items-center relative overflow-hidden group hover:shadow-md transition-shadow">
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Total Base Salary</p>
                  <p className="text-4xl font-black text-gray-900">₹{payrollStats.totalBaseSalary.toLocaleString()}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl group-hover:scale-110 transition-transform">
                  <DollarSign className="w-8 h-8 text-gray-400" />
                </div>
              </div>
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200 flex justify-between items-center relative overflow-hidden group hover:shadow-md transition-shadow">
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Pending Salary</p>
                  <p className="text-4xl font-black text-yellow-600">₹{payrollStats.pendingSalary.toLocaleString()}</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-2xl group-hover:scale-110 transition-transform">
                  <Clock className="w-8 h-8 text-yellow-500" />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Tab Navigation & Filters */}
        <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-200 flex justify-between items-center mb-6">
          <div className="flex gap-2 flex-wrap">
            {[
              { id: 'directory', label: 'Personnel', icon: <Users className="w-4 h-4" /> },
              { id: 'attendance', label: 'Attendance', icon: <Clock className="w-4 h-4" /> },
              { id: 'leaves', label: 'Leaves', icon: <Calendar className="w-4 h-4" /> },
              { id: 'advances', label: 'Advances', icon: <DollarSign className="w-4 h-4" /> },
              { id: 'salary', label: 'Payroll', icon: <FileText className="w-4 h-4" /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all",
                  activeTab === tab.id 
                    ? "bg-blue-600 text-white shadow-md" 
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
          
          <div className="flex gap-4 items-center px-4">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="text" placeholder="Search Personnel..." className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium w-48 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            
            {activeTab === 'attendance' ? (
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-2 py-1">
                <button 
                  onClick={() => {
                    const d = new Date(selectedDate);
                    d.setDate(d.getDate() - 1);
                    setSelectedDate(d.toISOString().split('T')[0]);
                  }}
                  className="p-1 hover:bg-gray-200 rounded-lg"><ChevronLeft className="w-4 h-4 text-gray-600" /></button>
                <input 
                  type="date" 
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="bg-transparent text-sm font-bold text-gray-700 focus:outline-none cursor-pointer px-1"
                />
                <button 
                  onClick={() => {
                    const d = new Date(selectedDate);
                    d.setDate(d.getDate() + 1);
                    setSelectedDate(d.toISOString().split('T')[0]);
                  }}
                  className="p-1 hover:bg-gray-200 rounded-lg"><ChevronRight className="w-4 h-4 text-gray-600" /></button>
              </div>
            ) : (
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-2 py-1">
                <button className="p-1 hover:bg-gray-200 rounded-lg"><ChevronLeft className="w-4 h-4 text-gray-600" /></button>
                <select value={month} onChange={e=>setMonth(Number(e.target.value))} className="bg-transparent text-sm font-bold text-gray-700 focus:outline-none appearance-none px-2 cursor-pointer">
                  {Array.from({length:12}).map((_,i) => <option key={i} value={i}>{new Date(2000, i).toLocaleString('default', {month:'short'}).toUpperCase()}</option>)}
                </select>
                <select value={year} onChange={e=>setYear(Number(e.target.value))} className="bg-transparent text-sm font-bold text-gray-700 focus:outline-none appearance-none pr-4 cursor-pointer">
                  {[2024, 2025, 2026, 2027].map(y => <option key={y} value={y}>{y}</option>)}
                </select>
                <button className="p-1 hover:bg-gray-200 rounded-lg"><ChevronRight className="w-4 h-4 text-gray-600" /></button>
              </div>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden min-h-[500px]">
          {activeTab === 'directory' && <StaffDirectoryTab month={month} year={year} getInitials={getInitials} />}
          {activeTab === 'attendance' && <AttendanceTrackerTab selectedDate={selectedDate} getInitials={getInitials} />}
          {activeTab === 'leaves' && <LeaveRequestsTab month={month} year={year} getInitials={getInitials} />}
          {activeTab === 'advances' && <AdvancesTab month={month} year={year} getInitials={getInitials} />}
          {activeTab === 'salary' && <SalaryProcessingTab month={month} year={year} getInitials={getInitials} setPayrollStats={setPayrollStats} setSelectedPayroll={setSelectedPayroll} />}
        </div>

        {/* Modals */}
        {isAddStaffOpen && <AddStaffModalLight onClose={() => setIsAddStaffOpen(false)} />}
        {isManualDutyOpen && <ManualDutyModal onClose={() => setIsManualDutyOpen(false)} />}
        {isRecordAdvanceOpen && <RecordAdvanceModal onClose={() => setIsRecordAdvanceOpen(false)} />}
        {selectedPayroll && (
          <SalarySlipModal
            payroll={selectedPayroll}
            onClose={() => setSelectedPayroll(null)}
            onProcess={async (staffId: string) => {
              try {
                await api.post('/admin/staff/salary/process', { staffId, month, year });
                toast.success('Salary Processed & Generated!');
                setSelectedPayroll(null);
                // Need to fetchPayroll here, but we don't have access to it directly in StaffManagement.
                // The easiest way is to let the tab auto-refresh when it mounts, or we just reload the page for now
                window.location.reload();
              } catch (err) {
                toast.error('Failed to process salary');
              }
            }}
          />
        )}
      </main>
    </div>
  );
};

// -----------------------------------------------------------------------------
// 1. Staff Directory Tab
// -----------------------------------------------------------------------------
const StaffDirectoryTab = ({ month, year, getInitials }: any) => {
  const [staff, setStaff] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        setLoading(true);
        const res = await api.get('/admin/staff');
        setStaff(res.data);
      } catch (err) {} finally { setLoading(false); }
    };
    fetchStaff();
  }, [month, year]);

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
        {staff.map((s: any) => (
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
                <button onClick={() => toast('Lock Account feature coming soon')} className="p-2 rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"><Lock className="w-4 h-4" /></button>
                <button onClick={() => toast('Edit Staff feature coming soon')} className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"><Edit2 className="w-4 h-4" /></button>
                <button onClick={() => deleteStaff(s._id)} className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </td>
          </tr>
        ))}
        {staff.length === 0 && <tr><td colSpan={6} className="p-12 text-center text-gray-400 font-medium">No personnel found.</td></tr>}
      </tbody>
    </table>
  );
};

// -----------------------------------------------------------------------------
// 2. Attendance Tracker Tab
// -----------------------------------------------------------------------------
const AttendanceTrackerTab = ({ selectedDate, getInitials }: any) => {
  const [attendance, setAttendance] = useState<any[]>([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        if (!selectedDate) return;
        const [y, m] = selectedDate.split('-');
        const res = await api.get(`/admin/staff/attendance?month=${parseInt(m, 10)}&year=${y}`);
        setAttendance(res.data);
      } catch (err) {}
    };
    fetchAttendance();
  }, [selectedDate]);

  const deleteAttendance = async (id: string) => {
    try {
      await api.delete(`/admin/staff/attendance/${id}`);
      toast.success('Attendance record deleted');
      setAttendance(attendance.filter(a => a._id !== id));
    } catch (err) {
      toast.error('Failed to delete attendance');
    }
  };

  const filteredAttendance = attendance.filter(a => a.date === selectedDate);

  return (
    <div>
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
          {filteredAttendance.map((a: any) => (
            <tr key={a._id} className="hover:bg-gray-50/50 transition-colors">
              <td className="px-6 py-4">
                <p className="font-bold text-gray-900">{new Date(a.date).toLocaleDateString('en-GB')}</p>
                <p className="text-xs text-gray-500 font-medium">{new Date(a.date).toLocaleDateString('en-US', {weekday:'long'})}</p>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-black text-sm">
                    {getInitials(a.staff?.name || 'S M')}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{a.staff?.name}</p>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">USER: SYSTEM</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                {a.status === 'present' || a.status === 'half-day' ? (
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-green-500 font-black text-xs">↗</span>
                      <span className="font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded text-xs">{a.punchIn?.time ? new Date(a.punchIn.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '--:--'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-orange-500 font-black text-xs">↘</span>
                      <span className="font-bold text-orange-700 bg-orange-50 px-2 py-0.5 rounded text-xs">{a.punchOut?.time ? new Date(a.punchOut.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'ACTIVE SHIFT'}</span>
                    </div>
                  </div>
                ) : (
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider">On Leave / Absent</span>
                )}
              </td>
              <td className="px-6 py-4">
                {a.status === 'present' || a.status === 'half-day' ? (
                  <div className="flex items-center gap-3">
                    {/* Punch In Evidence */}
                    <div className="relative w-12 h-12 rounded-xl bg-gray-200 overflow-hidden flex items-center justify-center shadow-sm border border-gray-200" title="Punch In Photo">
                      {a.punchIn?.evidence ? (
                        <img src={a.punchIn.evidence} alt="Punch In Evidence" className="w-full h-full object-cover" />
                      ) : (
                        <Camera className="w-4 h-4 text-gray-400" />
                      )}
                      <div className="absolute -top-1 -right-1 bg-green-500 w-3 h-3 rounded-full border-2 border-white shadow-sm"></div>
                    </div>
                    
                    {/* Punch Out Evidence */}
                    <div className="relative w-12 h-12 rounded-xl bg-gray-200 overflow-hidden flex items-center justify-center shadow-sm border border-gray-200 opacity-90" title="Punch Out Photo">
                      {a.punchOut?.evidence ? (
                        <img src={a.punchOut.evidence} alt="Punch Out Evidence" className="w-full h-full object-cover" />
                      ) : (
                        <Camera className="w-4 h-4 text-gray-400" />
                      )}
                      {a.punchOut?.time && <div className="absolute -top-1 -right-1 bg-orange-500 w-3 h-3 rounded-full border-2 border-white shadow-sm"></div>}
                    </div>
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-gray-100 border border-gray-200 border-dashed flex items-center justify-center">
                    <Camera className="w-4 h-4 text-gray-300" />
                  </div>
                )}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4 text-yellow-500" />
                  <div>
                    <p className="font-bold text-sm">Location Tracked</p>
                    <p className="text-xs text-gray-400 font-medium w-48 truncate">Geo-coordinates saved</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-right">
                <button onClick={() => deleteAttendance(a._id)} className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"><Trash2 className="w-4 h-4" /></button>
              </td>
            </tr>
          ))}
          {filteredAttendance.length === 0 && <tr><td colSpan={6} className="p-12 text-center text-gray-400 font-medium">No attendance records found for selected period.</td></tr>}
        </tbody>
      </table>
    </div>
  );
};

// -----------------------------------------------------------------------------
// 3. Leave Requests Tab
// -----------------------------------------------------------------------------
const LeaveRequestsTab = ({ month, year, getInitials }: any) => {
  const [leaves, setLeaves] = useState<any[]>([]);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const res = await api.get('/admin/staff/leaves');
        setLeaves(res.data);
      } catch (err) {}
    };
    fetchLeaves();
  }, [month, year]);

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
          {leaves.map((l: any) => (
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
                      window.location.reload();
                    }} className="px-4 py-1.5 rounded-lg bg-green-50 text-green-700 font-bold text-xs hover:bg-green-100 transition-colors">APPROVE</button>
                    <button onClick={async () => {
                      await api.put(`/admin/staff/leaves/${l._id}`, { status: 'Rejected' });
                      toast.success('Rejected');
                      window.location.reload();
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
const AdvancesTab = ({ month, year, getInitials }: any) => {
  const [advances, setAdvances] = useState<any[]>([]);
  const totalAdvance = advances.reduce((sum, a) => sum + (a.amount || 0), 0);

  useEffect(() => {
    const fetchAdvances = async () => {
      try {
        const res = await api.get(`/admin/staff/advances?month=${month}&year=${year}`);
        setAdvances(res.data);
      } catch (err) {}
    };
    fetchAdvances();
  }, [month, year]);

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
          {advances.map((a: any) => (
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
                <button className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"><Trash2 className="w-4 h-4" /></button>
              </td>
            </tr>
          ))}
          {advances.length === 0 && <tr><td colSpan={5} className="p-12 text-center text-gray-400 font-medium">No advances found for this month.</td></tr>}
        </tbody>
      </table>
    </div>
  );
};

// -----------------------------------------------------------------------------
// 5. Payroll Tab
// -----------------------------------------------------------------------------
const SalaryProcessingTab = ({ month, year, getInitials, setPayrollStats, setSelectedPayroll }: any) => {
  const [payroll, setPayroll] = useState<any[]>([]);

  const fetchPayroll = async () => {
    try {
      const res = await api.get(`/admin/staff/payroll-data?month=${month}&year=${year}`);
      setPayroll(res.data.payments);
      setPayrollStats(res.data.stats);
    } catch (err) {}
  };

  useEffect(() => {
    fetchPayroll();
  }, [month, year]);

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

  return (
    <div>
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h3 className="font-bold text-gray-900 text-lg tracking-tight">Payroll Records</h3>
        <div className="flex gap-3">
          <button onClick={generateBulkPayroll} className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-bold text-sm shadow-sm flex items-center gap-2 hover:bg-gray-50 transition-colors">
            <FileText className="w-4 h-4" /> BULK SLIPS
          </button>
          <button onClick={() => toast('Export feature coming soon')} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-md flex items-center gap-2 hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" /> EXPORT DATA
          </button>
        </div>
      </div>
      
      <table className="w-full text-left text-sm whitespace-nowrap">
        <thead className="text-gray-400 font-bold text-xs uppercase tracking-widest border-b border-gray-100">
          <tr>
            <th className="px-6 py-5">Staff Member</th>
            <th className="px-6 py-5">Payroll Month</th>
            <th className="px-6 py-5">Base Salary</th>
            <th className="px-6 py-5">Advances</th>
            <th className="px-6 py-5">Total Salary</th>
            <th className="px-6 py-5">Status</th>
            <th className="px-6 py-5 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {payroll.map((p: any) => (
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
                <p className="font-bold text-gray-700">01 {new Date(year, month).toLocaleString('default', {month:'short'})} {year} - 30 {new Date(year, month).toLocaleString('default', {month:'short'})} {year}</p>
                <p className="text-[10px] text-gray-400 font-black tracking-widest uppercase">Payroll Month</p>
              </td>
              <td className="px-6 py-4 font-black text-gray-800">₹{p.basicSalary?.toLocaleString() || 0}</td>
              <td className="px-6 py-4">
                <p className="font-bold text-red-600">₹{p.advances?.toLocaleString() || 0}</p>
                <p className="text-[10px] text-gray-400 font-black tracking-widest uppercase">Monthly Advance</p>
              </td>
              <td className="px-6 py-4">
                <p className="font-black text-gray-900 text-lg">₹{((p.earnedSalary || 0) + (p.allowances || 0) - (p.advances || 0)).toLocaleString()}</p>
                <p className="text-[10px] text-yellow-600 font-black tracking-widest uppercase">Net Payable</p>
              </td>
              <td className="px-6 py-4">
                <span className={cn("px-3 py-1.5 rounded-lg text-xs font-black tracking-wider uppercase",
                  p.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                )}>• {p.status}</span>
              </td>
              <td className="px-6 py-4 text-right">
                {p.status === 'pending' ? (
                  <button onClick={() => setSelectedPayroll(p)} className="px-4 py-2 bg-green-50 text-green-600 font-bold rounded-lg hover:bg-green-100 transition-colors text-xs">PROCESS</button>
                ) : (
                  <button onClick={() => setSelectedPayroll(p)} className="p-2.5 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors border border-gray-200 shadow-sm"><FileText className="w-4 h-4" /></button>
                )}
              </td>
            </tr>
          ))}
          {payroll.length === 0 && <tr>
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



const ManualDutyModal = ({ onClose }: any) => {
  const [staffList, setStaffList] = useState([]);
  const [form, setForm] = useState({ staffId: '', date: '', timeIn: '09:00', timeOut: '18:00', status: 'present' });

  useEffect(() => {
    api.get('/admin/staff').then(res => {
      setStaffList(res.data);
      if(res.data.length > 0) setForm(f => ({...f, staffId: res.data[0]._id}));
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/admin/staff/manual-duty', form);
      toast.success('Manual Duty Logged');
      onClose();
      window.location.reload();
    } catch (error) { toast.error('Failed to log duty'); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl p-8 border border-gray-100">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-black text-gray-900">Manual Duty Logging</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100"><XCircle className="w-6 h-6 text-gray-400" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div><label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Select Staff</label>
            <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.staffId} onChange={e=>setForm({...form,staffId:e.target.value})}>
              {staffList.map((s:any) => <option key={s._id} value={s._id}>{s.name}</option>)}
            </select>
          </div>
          <div><label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Date</label><input type="date" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Time In</label><input type="time" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.timeIn} onChange={e=>setForm({...form,timeIn:e.target.value})} /></div>
            <div><label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Time Out</label><input type="time" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.timeOut} onChange={e=>setForm({...form,timeOut:e.target.value})} /></div>
          </div>
          <div><label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Status</label>
            <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.status} onChange={e=>setForm({...form,status:e.target.value})}>
              <option value="present">Present</option>
              <option value="half-day">Half Day</option>
              <option value="absent">Absent</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg mt-4 transition-all">Submit Manual Duty</button>
        </form>
      </div>
    </div>
  );
};

const RecordAdvanceModal = ({ onClose }: any) => {
  const [staffList, setStaffList] = useState([]);
  const [form, setForm] = useState({ staffId: '', amount: '', description: '', month: new Date().getMonth(), year: new Date().getFullYear() });

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
      onClose();
      window.location.reload();
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
          <div><label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-2">Reason / Remark</label><input type="text" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} /></div>
          <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-lg mt-4 transition-all">Record Advance</button>
        </form>
      </div>
    </div>
  );
};

export default StaffManagement;

'use client'
import React, { useState, useEffect } from 'react';
import api from '@/services/api';
import toast from 'react-hot-toast';
import { 
  LogOut, Clock, Calendar, History, 
  MapPin, CheckCircle2, ChevronRight,
  Shield, Wallet, LayoutGrid, User, X, Lock
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { useRouter } from 'next/navigation';
import Webcam from 'react-webcam';

export default function StaffPortal() {
  const [activeTab, setActiveTab] = useState('hub');
  const [user, setUser] = useState<any>(null);
  const [showScanner, setShowScanner] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      router.push('/login');
      return;
    }
    const parsed = JSON.parse(userStr);
    if (parsed.role !== 'Staff' && parsed.role !== 'staff') {
      toast.error('Access restricted to Staff only');
      router.push('/dashboard');
      return;
    }
    setUser(parsed);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#0B0E14] text-white flex flex-col font-sans relative">
      {/* Scanner Overlay */}
      {showScanner && (
        <FaceScannerOverlay 
          onClose={() => setShowScanner(false)} 
        />
      )}

      {/* Header */}
      <header className="p-6 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center text-black font-black text-lg">
            {user.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-sm font-bold text-white tracking-wide">
              {user.name}
            </h1>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">STAFF</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2.5 bg-[#1A1F2B] border border-[#2A3143] rounded-xl hover:bg-[#2A3143] transition-colors">
            <Lock className="w-4 h-4 text-yellow-500" />
          </button>
          <button onClick={handleLogout} className="p-2.5 bg-[#1A1F2B] border border-[#2A3143] rounded-xl hover:bg-red-500/20 transition-colors">
            <LogOut className="w-4 h-4 text-red-400" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 flex flex-col max-w-lg mx-auto w-full">
        {activeTab === 'hub' && <HubTab onOpenScanner={() => setShowScanner(true)} />}
        {activeTab === 'logs' && <AttendanceHistoryTab />}
        {activeTab === 'leave' && <LeaveTab />}
        {activeTab === 'pay' && <SalaryTab />}
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-[#0B0E14] border-t border-[#1A1F2B] p-4 pb-safe flex justify-around sticky bottom-0 z-10">
        {[
          { id: 'hub', icon: <LayoutGrid className="w-5 h-5" />, label: 'HUB' },
          { id: 'logs', icon: <History className="w-5 h-5" />, label: 'LOGS' },
          { id: 'leave', icon: <Calendar className="w-5 h-5" />, label: 'LEAVE' },
          { id: 'pay', icon: <Wallet className="w-5 h-5" />, label: 'PAY' }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex flex-col items-center gap-1.5 transition-all duration-300",
              activeTab === tab.id ? "text-yellow-400" : "text-gray-600 hover:text-gray-400"
            )}
          >
            {tab.icon}
            <span className="text-[9px] font-bold tracking-widest">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Face Scanner Overlay
// -----------------------------------------------------------------------------
const FaceScannerOverlay = ({ onClose }: any) => {
  const [loading, setLoading] = useState(true);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [status, setStatus] = useState<any>(null);
  const webcamRef = React.useRef<Webcam>(null);

  const fetchStatus = async () => {
    try {
      const res = await api.get('/staff-portal/status');
      setStatus(res.data);
    } catch (err) {}
    finally { setLoading(false); }
  };

  const loadModels = async () => {
    try {
      const faceapi = await import('@vladmandic/face-api');
      const MODEL_URL = '/models';
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      ]);
      setModelsLoaded(true);
    } catch (err: any) {
      console.error(err);
      toast.error('Could not load AI models: ' + (err.message || String(err)));
    }
  };

  useEffect(() => {
    fetchStatus();
    loadModels();
  }, []);

  const getFaceDescriptor = async () => {
    if (!webcamRef.current) return null;
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return null;
    
    const faceapi = await import('@vladmandic/face-api');
    const img = document.createElement('img');
    img.src = imageSrc;
    await new Promise((resolve) => { img.onload = resolve; });
    
    const detection = await faceapi.detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();
      
    return detection?.descriptor;
  };

  const handleScan = async () => {
    if (!modelsLoaded) return toast.error('Models are still loading...');
    if (!navigator.geolocation) return toast.error('Geolocation not supported');
    
    setLoading(true);
    try {
      const descriptor = await getFaceDescriptor();
      if (!descriptor) {
        toast.error('No face detected. Please position face in circle.');
        setLoading(false);
        return;
      }

      if (!status?.hasFaceRegistered) {
        // Registration Flow
        await api.post('/staff-portal/register-face', { faceDescriptor: Array.from(descriptor) });
        toast.success('Face registered successfully!');
        onClose();
        return;
      }

      // Punch Flow
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const location = { lat: pos.coords.latitude, lng: pos.coords.longitude, accuracy: pos.coords.accuracy };
        try {
          if (status?.status === 'Not Punched In') {
            await api.post('/staff-portal/punch-in', { 
              location, 
              faceDescriptor: Array.from(descriptor),
              evidence: webcamRef.current?.getScreenshot() 
            });
            toast.success('Punched In successfully!');
          } else if (status?.status === 'Punched In') {
            await api.post('/staff-portal/punch-out', { 
              location, 
              faceDescriptor: Array.from(descriptor),
              evidence: webcamRef.current?.getScreenshot()
            });
            toast.success('Punched Out successfully!');
          } else {
            toast.success('Shift already completed for today!');
          }
          onClose();
        } catch (err: any) {
          toast.error(err.response?.data?.message || 'Authentication Failed');
          setLoading(false);
        }
      }, () => {
        toast.error('Please allow location access to punch in/out');
        setLoading(false);
      });
    } catch (err) {
      toast.error('Camera error');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#000000] flex flex-col justify-between">
      {/* Header */}
      <div className="p-6 flex justify-between items-start">
        <div>
          <h2 className="text-white font-black text-lg tracking-wider">FACE BIOMETRIC</h2>
          <p className="text-yellow-500 text-[10px] font-bold tracking-widest mt-1">POSITION FACE IN CIRCLE</p>
        </div>
        <button onClick={onClose} className="p-2 bg-[#1A1F2B] border border-[#2A3143] rounded-xl hover:bg-[#2A3143] transition-colors">
          <X className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Scanner Area */}
      <div className="flex-1 flex items-center justify-center relative px-6">
        <div className="w-72 h-72 rounded-full border-4 border-yellow-500 overflow-hidden relative shadow-[0_0_50px_rgba(234,179,8,0.2)]">
          <Webcam 
            ref={webcamRef} 
            audio={false} 
            screenshotFormat="image/jpeg" 
            className="absolute inset-0 w-full h-full object-cover" 
            mirrored={true} 
          />
          {loading && <div className="absolute inset-0 bg-black/80 flex items-center justify-center backdrop-blur-sm"><div className="animate-spin h-8 w-8 border-4 border-yellow-500 border-t-transparent rounded-full" /></div>}
          
          {/* Faint User Outline overlay like screenshot */}
          {!loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-30 mix-blend-screen pointer-events-none pb-8">
              <div className="w-20 h-20 border-4 border-white rounded-full mb-2"></div>
              <div className="w-32 h-16 border-4 border-white border-b-0 rounded-t-full"></div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Action */}
      <div className="p-6">
        <button 
          onClick={handleScan}
          disabled={loading || !modelsLoaded}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-black text-sm tracking-widest py-4 rounded-2xl shadow-[0_0_20px_rgba(234,179,8,0.3)] transition-all disabled:opacity-50"
        >
          {!modelsLoaded ? 'LOADING AI MODULE...' : status && !status.hasFaceRegistered ? 'REGISTER FACE' : 'SCAN FACE'}
        </button>
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// Hub Tab (Home)
// -----------------------------------------------------------------------------
const HubTab = ({ onOpenScanner }: any) => {
  const [status, setStatus] = useState<any>(null);
  const [salaries, setSalaries] = useState<any[]>([]);

  useEffect(() => {
    api.get('/staff-portal/status').then(res => setStatus(res.data));
    api.get('/staff-portal/salary-cycles').then(res => setSalaries(res.data));
  }, []);

  const currentPayout = salaries.length > 0 ? salaries[0].amount : 0;
  
  // Fake rating calculation based on punch ins
  const attendanceScore = status?.punchInTime ? '100%' : '35%';

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 pb-20">
      
      {/* Main Terminal Card */}
      <div className="bg-[#121620] border border-[#1A1F2B] rounded-[2rem] p-8 flex flex-col items-center justify-center text-center shadow-2xl relative overflow-hidden">
        {/* Decorative Grid Lines / Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1A2033] via-[#121620] to-[#121620] opacity-50"></div>
        
        <p className="text-[10px] text-yellow-500 font-bold tracking-[0.2em] mb-10 relative z-10">
          SECURE ACCESS TERMINAL
        </p>
        
        <button 
          onClick={onOpenScanner}
          className="w-28 h-28 bg-yellow-400 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(234,179,8,0.4)] hover:scale-105 hover:shadow-[0_0_60px_rgba(234,179,8,0.6)] transition-all duration-500 relative z-10 mb-8 group"
        >
          <Shield className="w-12 h-12 text-[#0B0E14] group-hover:scale-110 transition-transform duration-500" />
        </button>

        <h2 className="text-sm font-bold text-white tracking-widest relative z-10 mb-3 uppercase">
          {status && !status.hasFaceRegistered ? 'REGISTER BIOMETRICS' : 
           status?.status === 'Punched In' ? 'INITIALIZE PUNCH OUT' : 
           status?.status === 'Punched Out' ? 'SHIFT COMPLETED' :
           'INITIALIZE PUNCH IN'}
        </h2>

        <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase relative z-10">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short' })}
        </p>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-2 gap-4">
        {/* Payout Card */}
        <div className="bg-[#121620] border border-[#1A1F2B] rounded-3xl p-5 shadow-lg relative overflow-hidden group">
          <div className="flex justify-between items-start mb-4">
            <p className="text-[9px] text-gray-500 font-bold tracking-widest uppercase">PAYOUT</p>
            <Wallet className="w-4 h-4 text-yellow-500/50" />
          </div>
          <h3 className="text-2xl font-black text-white tracking-tight mb-2">₹{currentPayout.toLocaleString()}</h3>
          <p className="text-[9px] text-yellow-500 font-bold tracking-widest uppercase">CURRENT CYCLE</p>
        </div>

        {/* Rating Card */}
        <div className="bg-[#121620] border border-[#1A1F2B] rounded-3xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <p className="text-[9px] text-gray-500 font-bold tracking-widest uppercase">RATING</p>
            <span className="text-green-500 font-black text-lg leading-none mt-[-5px]">↗</span>
          </div>
          <h3 className="text-2xl font-black text-white tracking-tight mb-2">{attendanceScore}</h3>
          <p className="text-[9px] text-teal-500 font-bold tracking-widest uppercase">ATTENDANCE SCORE</p>
        </div>
      </div>

    </div>
  );
};

// -----------------------------------------------------------------------------
// History Tab
// -----------------------------------------------------------------------------
const AttendanceHistoryTab = () => {
  const [history, setHistory] = useState<any[]>([]);
  useEffect(() => {
    api.get('/staff-portal/history').then(res => setHistory(res.data));
  }, []);

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <h2 className="text-sm font-bold text-gray-500 tracking-widest uppercase mb-6 mt-4">Past 30 Days Logs</h2>
      <div className="space-y-3">
        {history.map(item => (
          <div key={item._id} className="bg-[#121620] border border-[#1A1F2B] rounded-2xl p-5 flex justify-between items-center">
            <div>
              <p className="text-white font-bold text-sm tracking-wide">{new Date(item.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }).toUpperCase()}</p>
              <div className="flex gap-4 text-xs font-bold mt-2">
                <span className="text-gray-500">IN: <span className="text-white ml-1">{item.punchIn?.time ? new Date(item.punchIn.time).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}) : '--:--'}</span></span>
                <span className="text-gray-500">OUT: <span className="text-white ml-1">{item.punchOut?.time ? new Date(item.punchOut.time).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}) : '--:--'}</span></span>
              </div>
            </div>
            <div className={cn("w-3 h-3 rounded-full", 
              item.status === 'present' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]'
            )}></div>
          </div>
        ))}
        {history.length === 0 && <p className="text-gray-600 font-bold text-center py-8 text-sm uppercase tracking-widest">No logs found.</p>}
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// Leave Tab
// -----------------------------------------------------------------------------
const LeaveTab = () => {
  const [leaves, setLeaves] = useState<any[]>([]);
  const [form, setForm] = useState({ startDate: '', endDate: '', type: 'Casual Leave', reason: '' });
  const [isApplying, setIsApplying] = useState(false);

  const fetchLeaves = async () => {
    const res = await api.get('/staff-portal/leaves');
    setLeaves(res.data);
  };
  useEffect(() => { fetchLeaves(); }, []);

  const submitLeave = async (e: any) => {
    e.preventDefault();
    try {
      await api.post('/staff-portal/leave', form);
      toast.success('Leave applied successfully');
      setForm({ startDate: '', endDate: '', type: 'Casual Leave', reason: '' });
      setIsApplying(false);
      fetchLeaves();
    } catch (err) { toast.error('Failed to apply leave'); }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex justify-between items-center mt-4">
        <h2 className="text-sm font-bold text-gray-500 tracking-widest uppercase">My Leaves</h2>
        <button onClick={() => setIsApplying(!isApplying)} className="text-[10px] font-bold uppercase tracking-widest bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-500 transition-colors">
          {isApplying ? 'CANCEL' : 'APPLY LEAVE'}
        </button>
      </div>

      {isApplying && (
        <form onSubmit={submitLeave} className="bg-[#121620] border border-[#1A1F2B] p-6 rounded-3xl space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2">Start Date</label>
              <input type="date" required className="w-full bg-[#1A1F2B] border border-[#2A3143] rounded-xl p-3 text-sm font-bold text-white focus:outline-none focus:border-yellow-500 transition-colors" value={form.startDate} onChange={e=>setForm({...form, startDate:e.target.value})} />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2">End Date</label>
              <input type="date" required className="w-full bg-[#1A1F2B] border border-[#2A3143] rounded-xl p-3 text-sm font-bold text-white focus:outline-none focus:border-yellow-500 transition-colors" value={form.endDate} onChange={e=>setForm({...form, endDate:e.target.value})} />
            </div>
          </div>
          <div>
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2">Leave Type</label>
            <select className="w-full bg-[#1A1F2B] border border-[#2A3143] rounded-xl p-3 text-sm font-bold text-white focus:outline-none focus:border-yellow-500 transition-colors appearance-none" value={form.type} onChange={e=>setForm({...form, type:e.target.value})}>
              <option value="Casual Leave">CASUAL LEAVE</option>
              <option value="Sick Leave">SICK LEAVE</option>
              <option value="Paid Leave">PAID LEAVE</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2">Reason</label>
            <textarea required rows={2} className="w-full bg-[#1A1F2B] border border-[#2A3143] rounded-xl p-3 text-sm font-bold text-white focus:outline-none focus:border-yellow-500 transition-colors" value={form.reason} onChange={e=>setForm({...form, reason:e.target.value})}></textarea>
          </div>
          <button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-black text-sm tracking-widest py-4 rounded-xl transition-all">SUBMIT REQUEST</button>
        </form>
      )}

      <div className="space-y-4">
        {leaves.map(l => (
          <div key={l._id} className="bg-[#121620] border border-[#1A1F2B] rounded-2xl p-5">
            <div className="flex justify-between items-center mb-3">
              <span className="font-bold text-white tracking-wide uppercase text-sm">{l.type}</span>
              <span className={cn("text-[9px] px-2.5 py-1 rounded-full font-black uppercase tracking-widest",
                l.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-500' :
                l.status === 'Approved' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
              )}>{l.status}</span>
            </div>
            <p className="text-xs font-bold text-gray-500 tracking-wide">{l.startDate} TO {l.endDate}</p>
          </div>
        ))}
        {leaves.length === 0 && !isApplying && <p className="text-gray-600 font-bold text-center py-8 text-sm uppercase tracking-widest">No leave requests.</p>}
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// Salary Tab
// -----------------------------------------------------------------------------
const SalaryTab = () => {
  const [salaries, setSalaries] = useState<any[]>([]);
  useEffect(() => {
    api.get('/staff-portal/salary-cycles').then(res => setSalaries(res.data));
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <h2 className="text-sm font-bold text-gray-500 tracking-widest uppercase mt-4 mb-6">Payment History</h2>
      <div className="space-y-4">
        {salaries.map(s => (
          <div key={s._id} className="bg-[#121620] border border-[#1A1F2B] rounded-3xl p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-yellow-400"></div>
            
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-lg font-black text-white tracking-wider uppercase">{new Date(s.year, s.month).toLocaleString('default', {month:'long'})} {s.year}</h3>
                <span className="text-[9px] text-green-500 bg-green-500/10 px-2 py-1 rounded mt-2 inline-block uppercase font-black tracking-widest">{s.status}</span>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1">NET PAYABLE</p>
                <p className="text-3xl font-black text-yellow-400 tracking-tighter">₹{s.amount.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm border-t border-[#1A1F2B] pt-4 mt-2">
              <div>
                <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1">PRESENT</p>
                <p className="text-white font-bold tracking-wide">{s.presentDays} DAYS</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1">PAID LEAVES</p>
                <p className="text-white font-bold tracking-wide">{s.paidLeaves} DAYS</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1">ALLOWANCES</p>
                <p className="text-green-400 font-bold tracking-wide">+₹{s.allowances.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-1">DEDUCTIONS</p>
                <p className="text-red-400 font-bold tracking-wide">-₹{s.advances.toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
        {salaries.length === 0 && <p className="text-gray-600 font-bold text-center py-8 text-sm uppercase tracking-widest">No payout records.</p>}
      </div>
    </div>
  );
};

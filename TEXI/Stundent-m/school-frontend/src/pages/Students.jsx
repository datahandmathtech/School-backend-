import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useCompany } from '../context/CompanyContext';
import { Users, Plus, Edit, Trash2, MapPin, Bus, Phone, Navigation, Search, X, CheckCircle, CreditCard, User, Calendar, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
// Leaflet map removed based on new requirements

const Students = () => {
    const { selectedCompany } = useCompany();
    const [students, setStudents] = useState([]);
    const [buses, setBuses] = useState([]);
    const [loading, setLoading] = useState(true);

    const uniqueClasses = [...new Set(students.map(s => s.className).filter(Boolean))];
    const uniqueBatches = [...new Set(students.map(s => s.batch).filter(Boolean))];

    const [showModal, setShowModal] = useState(false);
    
    const getFinancialYears = () => {
        const currentYear = new Date().getFullYear();
        const years = [];
        for (let i = -2; i <= 3; i++) {
            years.push(`${currentYear + i}-${currentYear + i + 1}`);
        }
        return years;
    };
    const financialYears = getFinancialYears();

    const [formData, setFormData] = useState({
        name: '', className: '', batch: '', rollNumber: '', contactNumber: '', parentName: '',
        feeAmount: '', feeType: 'Monthly', financialYear: `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`,
        assignedBus: '', pickupLocationName: '', pickupLat: '', pickupLng: ''
    });
    const [editingId, setEditingId] = useState(null);
    
    // New state for Timeline and Search
    const [routeTimeline, setRouteTimeline] = useState(null);
    const [nearestStopId, setNearestStopId] = useState(null);
    const [searchError, setSearchError] = useState('');
    const [allStops, setAllStops] = useState([]);
    const [matchedStops, setMatchedStops] = useState([]);

    useEffect(() => {
        if (selectedCompany) {
            fetchStudents();
            fetchBuses();
            fetchRoutesAndStops();
        }
    }, [selectedCompany]);

    const fetchStudents = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`/api/students/${selectedCompany._id}`);
            setStudents(data);
        } catch (err) {
            console.error('Error fetching students', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchBuses = async () => {
        try {
            const { data } = await axios.get(`/api/admin/vehicles/${selectedCompany._id}?usePagination=false`);
            const vehicles = data.vehicles || (Array.isArray(data) ? data : []);
            setBuses(vehicles.filter(v => v.carType === 'Bus' || v.carType === 'Mini Bus'));
        } catch (err) {
            console.error('Error fetching buses', err);
        }
    };

    const fetchRoutesAndStops = async () => {
        try {
            const { data } = await axios.get(`/api/routes/${selectedCompany._id}`);
            const stops = [];
            data.forEach(route => {
                if (route.stops) {
                    route.stops.forEach(stop => stops.push(stop));
                }
            });
            setAllStops(stops);
        } catch (err) {
            console.error('Error fetching routes for stops caching', err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = { ...formData, company: selectedCompany._id };
            if (!payload.assignedBus) delete payload.assignedBus;
            if (!payload.assignedSeatNumber) delete payload.assignedSeatNumber;

            if (editingId) {
                await axios.put(`/api/students/${editingId}`, payload);
            } else {
                await axios.post('/api/students', payload);
            }
            setShowModal(false);
            setEditingId(null);
            setFormData({ name: '', className: '', batch: '', rollNumber: '', contactNumber: '', parentName: '', feeAmount: '', feeType: 'Monthly', financialYear: `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`, assignedBus: '', pickupLocationName: '', pickupLat: '', pickupLng: '' });
            setRouteTimeline(null);
            setNearestStopId(null);
            setSearchError('');
            setMatchedStops([]);
            fetchStudents();
        } catch (err) {
            alert(err.response?.data?.message || 'Error saving student');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this student?')) {
            try {
                await axios.delete(`/api/students/${id}`);
                fetchStudents();
            } catch (err) {
                alert('Error deleting student');
            }
        }
    };

    const studentLocations = students.map(s => s.pickupLocationName).filter(Boolean);
    const routeStops = allStops.map(s => s.stopName);
    const uniqueStops = [...new Set([...studentLocations, ...routeStops])].sort();

    const handleLocationSelect = (selectedStopName) => {
        setFormData({ ...formData, pickupLocationName: selectedStopName });
        if (selectedStopName) {
            const matches = allStops.filter(s => s.stopName.toLowerCase().includes(selectedStopName.toLowerCase()));
            
            // Check if any existing students are assigned to buses at this location (Informal Route)
            const studentMatches = students
                .filter(s => s.pickupLocationName && s.assignedBus && s.pickupLocationName.toLowerCase().includes(selectedStopName.toLowerCase()))
                .map(s => ({
                    stopName: s.pickupLocationName,
                    routeName: 'Direct Student Assignment',
                    assignedBus: s.assignedBus,
                    expectedTime: null
                }));

            // Merge and deduplicate by bus ID
            const allMatches = [...matches, ...studentMatches];
            const uniqueMatches = [];
            const seenBuses = new Set();
            for (const match of allMatches) {
                if (match.assignedBus && !seenBuses.has(match.assignedBus._id)) {
                    seenBuses.add(match.assignedBus._id);
                    uniqueMatches.push(match);
                }
            }
            
            if (uniqueMatches.length > 0) {
                setMatchedStops(uniqueMatches);
                setSearchError('');
            } else {
                setMatchedStops([]);
                setSearchError(''); // No error, just a new location
            }
            setRouteTimeline(null);
        } else {
            setMatchedStops([]);
            setSearchError('');
            setRouteTimeline(null);
        }
    };

    const handleSelectStop = (stop) => {
        const busId = stop.assignedBus ? (typeof stop.assignedBus === 'object' ? stop.assignedBus._id : stop.assignedBus) : '';
        setFormData(prev => ({
            ...prev,
            pickupLocationName: stop.stopName,
            pickupLat: stop.lat,
            pickupLng: stop.lng,
            assignedBus: busId
        }));
        
        // Populate timeline
        const fullRoute = allStops.filter(s => s.routeId === stop.routeId);
        setRouteTimeline(fullRoute);
        setNearestStopId(stop._id);
        setMatchedStops([]);
    };



    return (
        <div className="page-container" style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <div>
                    <h1 style={{ color: 'white', fontSize: '32px', margin: 0, fontWeight: '900', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Users size={32} color="var(--primary)" /> Student Directory
                    </h1>
                    <p style={{ color: 'var(--text-muted)' }}>Manage student profiles and bus assignments</p>
                </div>
                <button className="btn-primary" style={{ padding: '10px 20px', borderRadius: '12px', fontSize: '15px' }} onClick={() => { setEditingId(null); setRouteTimeline(null); setNearestStopId(null); setSearchError(''); setFormData({ name: '', className: '', rollNumber: '', contactNumber: '', parentName: '', feeAmount: '', feeType: 'Monthly', financialYear: `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`, assignedBus: '', pickupLocationName: '', pickupLat: '', pickupLng: '' }); setShowModal(true); }}>
                    <Plus size={20} /> Register Student
                </button>
            </header>

            {loading ? (
                <div style={{ color: 'white', textAlign: 'center', padding: '50px' }}>Loading Students...</div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
                    {students.map(student => (
                        <motion.div key={student._id} className="glass-card-hover-effect" style={{ padding: '24px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)', background: 'linear-gradient(145deg, rgba(15,23,42,0.8), rgba(30,41,59,0.5))' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 'bold', color: 'white' }}>
                                        {student.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h3 style={{ color: 'white', fontSize: '18px', margin: '0 0 2px 0', fontWeight: 'bold' }}>{student.name}</h3>
                                        <p style={{ color: 'var(--primary)', fontSize: '12px', margin: 0, fontWeight: 'bold' }}>Class {student.className} • Roll {student.rollNumber}</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button onClick={() => { setEditingId(student._id); setRouteTimeline(null); setNearestStopId(null); setSearchError(''); setFormData({ ...student, assignedBus: student.assignedBus?._id || '' }); setShowModal(true); }} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', padding: '6px', borderRadius: '8px', cursor: 'pointer', color: 'white' }}>
                                        <Edit size={16} />
                                    </button>
                                    <button onClick={() => handleDelete(student._id)} style={{ background: 'rgba(244,63,94,0.1)', border: 'none', padding: '6px', borderRadius: '8px', cursor: 'pointer', color: '#f43f5e' }}>
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                            
                            <div style={{ marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '15px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                    <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Parent Contact</span>
                                    <span style={{ color: 'white', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <Phone size={12} /> {student.contactNumber || 'N/A'}
                                    </span>
                                </div>
                                
                                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '12px', marginTop: '10px' }}>
                                        <div style={{ color: 'white', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            <Bus size={14} color="var(--primary)" /> 
                                            {student.assignedBus ? <strong>{student.assignedBus.carNumber}</strong> : <span style={{ color: 'var(--text-muted)' }}>No Bus</span>}
                                        </div>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <MapPin size={12} /> Pickup: {student.pickupLocationName || 'Not Set'}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            <AnimatePresence>
                {showModal && (
                    <div style={{ position: 'fixed', inset: 0, background: 'rgba(5, 10, 20, 0.85)', backdropFilter: 'blur(12px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px' }}>
                        <motion.div initial={{ scale: 0.92, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.92, opacity: 0, y: 20 }} transition={{ type: "spring", duration: 0.4 }} style={{ width: '100%', maxWidth: '980px', maxHeight: '92vh', overflowY: 'auto', borderRadius: '28px', background: 'linear-gradient(165deg, rgba(20, 30, 50, 0.95), rgba(10, 15, 30, 0.98))', border: '1px solid rgba(255, 255, 255, 0.12)', boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7)' }}>
                            
                            {/* Modal Header */}
                            <div style={{ padding: '24px 32px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ width: '42px', height: '42px', borderRadius: '14px', background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(245, 158, 11, 0.05))', border: '1px solid rgba(245, 158, 11, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Users size={22} color="#f59e0b" />
                                    </div>
                                    <div>
                                        <h2 style={{ color: 'white', margin: 0, fontSize: '22px', fontWeight: '800', letterSpacing: '-0.5px' }}>{editingId ? 'Edit Student Profile' : 'Register New Student'}</h2>
                                        <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '13px' }}>Fill in the details below to save student transport information</p>
                                    </div>
                                </div>
                                <button type="button" onClick={() => setShowModal(false)} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', width: '36px', height: '36px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }} onMouseOver={e => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'; e.currentTarget.style.color = '#ef4444'; }} onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'var(--text-muted)'; }}>
                                    <X size={18} />
                                </button>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '28px', padding: '28px' }}>
                                {/* Left Side: Details */}
                                <div>
                                    <form id="studentForm" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                        {/* Personal Info Section */}
                                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.06)' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: '#f59e0b', fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                                <User size={16} /> Personal Information
                                            </div>

                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                                <div className="form-group">
                                                    <label style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px', display: 'block', fontWeight: '600' }}>FULL NAME *</label>
                                                    <input className="dark-input" style={{ width: '100%', borderRadius: '12px', padding: '10px 14px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)' }} value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required placeholder="Enter student's full name" />
                                                </div>

                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                                                    <div className="form-group">
                                                        <label style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '6px', display: 'block', fontWeight: '600' }}>CLASS *</label>
                                                        <input className="dark-input" style={{ width: '100%', borderRadius: '10px', padding: '9px 12px', fontSize: '13px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)' }} list="class-list" value={formData.className} onChange={e => setFormData({ ...formData, className: e.target.value })} required placeholder="e.g. Class 1" />
                                                        <datalist id="class-list">
                                                            {uniqueClasses.map(c => <option key={c} value={c} />)}
                                                        </datalist>
                                                    </div>
                                                    <div className="form-group">
                                                        <label style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '6px', display: 'block', fontWeight: '600' }}>BATCH</label>
                                                        <input className="dark-input" style={{ width: '100%', borderRadius: '10px', padding: '9px 12px', fontSize: '13px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)' }} list="batch-list" value={formData.batch} onChange={e => setFormData({ ...formData, batch: e.target.value })} placeholder="e.g. A" />
                                                        <datalist id="batch-list">
                                                            {uniqueBatches.map(b => <option key={b} value={b} />)}
                                                        </datalist>
                                                    </div>
                                                    <div className="form-group">
                                                        <label style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '6px', display: 'block', fontWeight: '600' }}>ROLL NO.</label>
                                                        <input className="dark-input" style={{ width: '100%', borderRadius: '10px', padding: '9px 12px', fontSize: '13px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)' }} value={formData.rollNumber} onChange={e => setFormData({ ...formData, rollNumber: e.target.value })} placeholder="101" />
                                                    </div>
                                                </div>

                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                                    <div className="form-group">
                                                        <label style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '6px', display: 'block', fontWeight: '600' }}>PARENT / GUARDIAN</label>
                                                        <input className="dark-input" style={{ width: '100%', borderRadius: '10px', padding: '9px 12px', fontSize: '13px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)' }} value={formData.parentName} onChange={e => setFormData({ ...formData, parentName: e.target.value })} placeholder="Parent's Name" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '6px', display: 'block', fontWeight: '600' }}>CONTACT PHONE</label>
                                                        <input className="dark-input" style={{ width: '100%', borderRadius: '10px', padding: '9px 12px', fontSize: '13px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)' }} value={formData.contactNumber} onChange={e => setFormData({ ...formData, contactNumber: e.target.value })} placeholder="Phone Number" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Fee & Transport Section */}
                                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.06)' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: '#10b981', fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                                <CreditCard size={16} /> Fee & Bus Assignment
                                            </div>

                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                                                <div className="form-group">
                                                    <label style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '6px', display: 'block', fontWeight: '600' }}>FEE AMOUNT (₹)</label>
                                                    <input type="number" className="dark-input" style={{ width: '100%', borderRadius: '10px', padding: '9px 12px', fontSize: '13px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)' }} value={formData.feeAmount} onChange={e => setFormData({ ...formData, feeAmount: e.target.value })} placeholder="e.g. 500" />
                                                </div>
                                                <div className="form-group">
                                                    <label style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '6px', display: 'block', fontWeight: '600' }}>FEE TYPE</label>
                                                    <select className="dark-input" style={{ width: '100%', borderRadius: '10px', padding: '9px 12px', fontSize: '13px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)' }} value={formData.feeType} onChange={e => setFormData({ ...formData, feeType: e.target.value })}>
                                                        <option value="Monthly">Monthly</option>
                                                        <option value="Half-Yearly">Half-Yearly</option>
                                                        <option value="Yearly">Yearly</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                                <div className="form-group">
                                                    <label style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '6px', display: 'block', fontWeight: '600' }}>FINANCIAL YEAR</label>
                                                    <select className="dark-input" style={{ width: '100%', borderRadius: '10px', padding: '9px 12px', fontSize: '13px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)' }} value={formData.financialYear} onChange={e => setFormData({ ...formData, financialYear: e.target.value })}>
                                                        {financialYears.map(fy => (
                                                            <option key={fy} value={fy}>{fy}</option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <div className="form-group">
                                                    <label style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '6px', display: 'block', fontWeight: '600' }}>ASSIGNED BUS</label>
                                                    <select className="dark-input" style={{ width: '100%', borderRadius: '10px', padding: '9px 12px', fontSize: '13px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)' }} value={formData.assignedBus} onChange={e => setFormData({ ...formData, assignedBus: e.target.value })}>
                                                        <option value="">No Bus Assigned</option>
                                                        {buses.map(bus => (
                                                            <option key={bus._id} value={bus._id}>{bus.carNumber} ({bus.seatingCapacity || bus.capacity || 'N/A'} Seats)</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>

                                {/* Right Side: Pickup Location Search & Buses */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.06)', height: '100%', display: 'flex', flexDirection: 'column' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: '#60a5fa', fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                            <MapPin size={16} /> Pickup Location Search
                                        </div>
                                        
                                        <div className="form-group" style={{ marginBottom: '16px' }}>
                                            <label style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '6px', display: 'block', fontWeight: '600' }}>TYPE OR SELECT LOCATION</label>
                                            <div style={{ position: 'relative' }}>
                                                <input 
                                                    className="dark-input" 
                                                    style={{ width: '100%', borderRadius: '12px', padding: '11px 36px 11px 14px', fontSize: '14px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(96, 165, 250, 0.3)' }} 
                                                    list="stop-list"
                                                    placeholder="Type location e.g. Ashok Nagar"
                                                    value={formData.pickupLocationName} 
                                                    onChange={e => handleLocationSelect(e.target.value)}
                                                />
                                                <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                                            </div>
                                            <datalist id="stop-list">
                                                {uniqueStops.map(stopName => (
                                                    <option key={stopName} value={stopName} />
                                                ))}
                                            </datalist>
                                            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '6px' }}>Type to search existing routes or create a custom stop.</p>
                                        </div>

                                        {/* Matched Buses / Locations */}
                                        {formData.pickupLocationName.trim() !== '' && (
                                            <div style={{ flex: 1, overflowY: 'auto' }}>
                                                {matchedStops.length > 0 ? (
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: 'rgba(16, 185, 129, 0.04)', padding: '16px', borderRadius: '16px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                                                            <h4 style={{ color: 'white', fontSize: '13px', margin: 0, fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                                <Bus size={15} color="#10b981" /> Matching Buses ({matchedStops.length})
                                                            </h4>
                                                            <span style={{ fontSize: '10px', color: '#10b981', background: 'rgba(16, 185, 129, 0.15)', padding: '2px 8px', borderRadius: '10px', fontWeight: '600' }}>Click bus to auto-assign</span>
                                                        </div>

                                                        {matchedStops.map((stop, index) => {
                                                            const rawBus = stop.assignedBus;
                                                            const actualBus = buses.find(b => b._id === (typeof rawBus === 'object' ? rawBus?._id : rawBus)) || (typeof rawBus === 'object' ? rawBus : null);
                                                            
                                                            const capacity = Number(actualBus?.seatingCapacity || actualBus?.capacity || actualBus?.totalSeats || 0);
                                                            const occupied = actualBus ? students.filter(s => {
                                                                const sBusId = typeof s.assignedBus === 'object' ? s.assignedBus?._id : s.assignedBus;
                                                                return sBusId === actualBus._id;
                                                            }).length : 0;

                                                            const availableSeats = capacity > 0 ? Math.max(0, capacity - occupied) : null;
                                                            const carNumber = actualBus?.carNumber || (typeof rawBus === 'object' ? rawBus?.carNumber : 'Bus Assigned');

                                                            return (
                                                                <div 
                                                                    key={index} 
                                                                    style={{ 
                                                                        background: formData.assignedBus === actualBus?._id ? 'rgba(16, 185, 129, 0.15)' : 'rgba(0,0,0,0.4)', 
                                                                        borderRadius: '14px', 
                                                                        padding: '14px 16px', 
                                                                        cursor: 'pointer', 
                                                                        transition: 'all 0.2s', 
                                                                        border: formData.assignedBus === actualBus?._id ? '1px solid #10b981' : '1px solid rgba(255,255,255,0.08)' 
                                                                    }} 
                                                                    onClick={() => handleSelectStop(stop)} 
                                                                    onMouseOver={e => { if (formData.assignedBus !== actualBus?._id) e.currentTarget.style.border = '1px solid rgba(16, 185, 129, 0.5)'; }} 
                                                                    onMouseOut={e => { if (formData.assignedBus !== actualBus?._id) e.currentTarget.style.border = '1px solid rgba(255,255,255,0.08)'; }}
                                                                >
                                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                        <div>
                                                                            <h5 style={{ color: 'white', margin: '0 0 4px 0', fontSize: '14px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                                                <MapPin size={13} color="#60a5fa"/> {stop.stopName}
                                                                            </h5>
                                                                            <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '11px' }}>
                                                                                Route: {stop.routeName} {stop.expectedTime && `• ${stop.expectedTime}`}
                                                                            </p>
                                                                        </div>

                                                                        {actualBus ? (
                                                                            <div style={{ textAlign: 'right' }}>
                                                                                <div style={{ color: 'white', fontWeight: '800', fontSize: '14px', letterSpacing: '0.3px' }}>{carNumber}</div>
                                                                                {availableSeats !== null ? (
                                                                                    <div style={{ 
                                                                                        color: availableSeats > 0 ? '#10b981' : '#f43f5e', 
                                                                                        fontSize: '11px', 
                                                                                        fontWeight: '700', 
                                                                                        background: availableSeats > 0 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)', 
                                                                                        padding: '3px 8px', 
                                                                                        borderRadius: '6px', 
                                                                                        marginTop: '4px', 
                                                                                        display: 'inline-block' 
                                                                                    }}>
                                                                                        {availableSeats} Seats Available
                                                                                    </div>
                                                                                ) : (
                                                                                    <div style={{ color: 'var(--text-muted)', fontSize: '11px', marginTop: '4px' }}>Capacity N/A</div>
                                                                                )}
                                                                            </div>
                                                                        ) : (
                                                                            <div style={{ color: '#f43f5e', fontSize: '11px', fontWeight: '700', background: 'rgba(244, 63, 94, 0.15)', padding: '3px 8px', borderRadius: '6px' }}>
                                                                                No Bus Assigned
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                ) : (
                                                    <div style={{ background: 'rgba(245, 158, 11, 0.06)', border: '1px solid rgba(245, 158, 11, 0.25)', padding: '16px', borderRadius: '16px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                                        <div style={{ color: '#f59e0b', marginTop: '2px', background: 'rgba(245, 158, 11, 0.15)', padding: '6px', borderRadius: '10px' }}>
                                                            <Navigation size={18} />
                                                        </div>
                                                        <div>
                                                            <h4 style={{ color: 'white', margin: '0 0 4px 0', fontSize: '13px', fontWeight: '700' }}>New Location Detected</h4>
                                                            <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '12px', lineHeight: '1.4' }}>
                                                                No existing bus routes pass through <strong>"{formData.pickupLocationName}"</strong>.
                                                            </p>
                                                            <p style={{ color: 'rgba(255,255,255,0.5)', margin: '6px 0 0 0', fontSize: '11px' }}>
                                                                You can manually assign a bus from the dropdown on the left.
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* Route Timeline UI */}
                                        {routeTimeline && routeTimeline.length > 0 && !matchedStops.length && (
                                            <div style={{ marginTop: '16px', background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
                                                <h4 style={{ color: 'white', fontSize: '13px', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700' }}>
                                                    <Bus size={15} color="#60a5fa" /> Route Overview Timeline
                                                </h4>
                                                <div style={{ position: 'relative', paddingLeft: '16px', borderLeft: '2px solid rgba(96, 165, 250, 0.3)', marginLeft: '8px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                                    {routeTimeline.map((stop, index) => {
                                                        const isNearest = stop._id === nearestStopId;
                                                        return (
                                                            <div key={index} style={{ position: 'relative' }}>
                                                                <div style={{
                                                                    position: 'absolute', left: '-23px', top: '3px', width: '12px', height: '12px',
                                                                    borderRadius: '50%', background: isNearest ? '#10b981' : 'rgba(255,255,255,0.2)',
                                                                    border: isNearest ? '2px solid #10b981' : '2px solid #0f172a', zIndex: 2,
                                                                    boxShadow: isNearest ? '0 0 10px #10b981' : 'none'
                                                                }}></div>
                                                                <div style={{ color: isNearest ? '#10b981' : 'white', fontSize: '13px', fontWeight: isNearest ? '700' : '500' }}>
                                                                    {stop.stopName}
                                                                </div>
                                                                {isNearest && (
                                                                    <div style={{ color: '#10b981', fontSize: '10px', marginTop: '2px', fontWeight: '700' }}>
                                                                        ★ Selected Pickup Stop
                                                                    </div>
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div style={{ padding: '18px 32px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'flex-end', gap: '14px', background: 'rgba(0,0,0,0.3)', borderBottomLeftRadius: '28px', borderBottomRightRadius: '28px' }}>
                                <button type="button" className="btn-secondary" style={{ padding: '10px 22px', borderRadius: '12px', fontSize: '14px', fontWeight: '600' }} onClick={() => setShowModal(false)}>
                                    Cancel
                                </button>
                                <button type="submit" form="studentForm" className="btn-primary" style={{ padding: '10px 26px', borderRadius: '12px', fontSize: '14px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, #f59e0b, #d97706)', border: 'none', boxShadow: '0 4px 14px rgba(245, 158, 11, 0.4)' }}>
                                    <CheckCircle size={16} /> Save Student Profile
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Students;

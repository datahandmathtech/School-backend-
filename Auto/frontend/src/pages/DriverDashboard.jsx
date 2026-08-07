import React, { useState, useEffect } from 'react';
import { useAuth } from '../store/AuthContext';
import api from '../services/api';
import { Clock, Car, CheckCircle, MapPin, Power, Loader2, LogOut } from 'lucide-react';
import logo from '../assets/logo.png';

const DriverDashboard = () => {
    const { user, logout } = useAuth();
    const [driverProfile, setDriverProfile] = useState(null);
    const [attendance, setAttendance] = useState(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);

    const fetchData = async () => {
        try {
            const [profileRes, attRes] = await Promise.all([
                api.get(`/api/drivers/profile/${user._id}`),
                api.get('/api/attendance/today')
            ]);
            setDriverProfile(profileRes.data);
            setAttendance(attRes.data);
        } catch (error) {
            console.error('Error fetching driver data', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCheckIn = async () => {
        setActionLoading(true);
        try {
            await api.post('/api/attendance/check-in');
            await fetchData();
        } catch (error) {
            alert(error.response?.data?.message || 'Error checking in');
        } finally {
            setActionLoading(false);
        }
    };

    const handleCheckOut = async () => {
        setActionLoading(true);
        try {
            await api.put('/api/attendance/check-out');
            await fetchData();
        } catch (error) {
            alert(error.response?.data?.message || 'Error checking out');
        } finally {
            setActionLoading(false);
        }
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'var(--bg-primary)' }}>
                <Loader2 className="pulse-active" size={48} style={{ animation: 'spin 1s linear infinite', color: 'var(--accent)' }} />
            </div>
        );
    }

    const isCheckedIn = attendance !== null;
    const isCheckedOut = attendance?.checkOutTime != null;

    return (
        <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', padding: '1rem', color: 'var(--text-primary)', paddingBottom: '5rem' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '8px' }}>
                        <img src={logo} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>
                    <div>
                        <h1 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Hello, {user.name.split(' ')[0]}</h1>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Driver Portal</p>
                    </div>
                </div>
                <button className="btn btn-glass" style={{ padding: '0.5rem' }} onClick={logout}>
                    <LogOut size={18} />
                </button>
            </div>

            {/* Attendance Card */}
            <div className="glass-card" style={{ marginBottom: '1.5rem', textAlign: 'center', padding: '2rem 1.5rem' }}>
                <h2 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>Daily Attendance</h2>
                
                {!isCheckedIn ? (
                    <button 
                        onClick={handleCheckIn} 
                        disabled={actionLoading}
                        style={{
                            background: 'linear-gradient(135deg, #00f0ff 0%, #0080ff 100%)',
                            border: 'none', borderRadius: '50%', width: '150px', height: '150px',
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            margin: '0 auto', color: '#fff', fontSize: '1.2rem', fontWeight: 700,
                            boxShadow: '0 0 30px rgba(0, 240, 255, 0.4)', cursor: 'pointer', transition: 'transform 0.2s'
                        }}
                    >
                        {actionLoading ? <Loader2 size={32} style={{ animation: 'spin 1s linear infinite' }} /> : (
                            <>
                                <Power size={36} style={{ marginBottom: '0.5rem' }} />
                                Check In
                            </>
                        )}
                    </button>
                ) : !isCheckedOut ? (
                    <button 
                        onClick={handleCheckOut} 
                        disabled={actionLoading}
                        style={{
                            background: 'linear-gradient(135deg, #ff3366 0%, #cc0033 100%)',
                            border: 'none', borderRadius: '50%', width: '150px', height: '150px',
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            margin: '0 auto', color: '#fff', fontSize: '1.2rem', fontWeight: 700,
                            boxShadow: '0 0 30px rgba(255, 51, 102, 0.4)', cursor: 'pointer', transition: 'transform 0.2s'
                        }}
                    >
                        {actionLoading ? <Loader2 size={32} style={{ animation: 'spin 1s linear infinite' }} /> : (
                            <>
                                <Power size={36} style={{ marginBottom: '0.5rem' }} />
                                Check Out
                            </>
                        )}
                    </button>
                ) : (
                    <div style={{
                        background: 'rgba(0, 255, 157, 0.1)', border: '1px solid var(--success)',
                        borderRadius: '20px', padding: '2rem 1rem', margin: '0 auto'
                    }}>
                        <CheckCircle size={48} style={{ color: 'var(--success)', margin: '0 auto 1rem' }} />
                        <h3 style={{ color: 'var(--success)', fontSize: '1.2rem' }}>Duty Completed</h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>You have successfully checked out for today.</p>
                    </div>
                )}
            </div>

            {/* Vehicle Info */}
            <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Car size={18} /> Assigned Vehicle
                </h3>
                {driverProfile?.assignedAuto ? (
                    <div>
                        <p style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent)', fontFamily: 'monospace' }}>
                            {driverProfile.assignedAuto.rcNumber || driverProfile.assignedAuto.autoNumber}
                        </p>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{driverProfile.assignedAuto.model}</p>
                    </div>
                ) : (
                    <p style={{ color: 'var(--text-muted)' }}>No vehicle assigned currently.</p>
                )}
            </div>

        </div>
    );
};

export default DriverDashboard;

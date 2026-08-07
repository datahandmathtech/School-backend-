import React, { useState, useEffect } from 'react';
import { Activity, MapPin, Clock, Loader2, PlayCircle, CheckCircle } from 'lucide-react';
import api from '../services/api';

const ActiveLogs = () => {
    const [activeDuties, setActiveDuties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    
    // Admin Management Modals
    const [showStartTrip, setShowStartTrip] = useState(false);
    const [showEndTrip, setShowEndTrip] = useState(false);
    const [selectedTripId, setSelectedTripId] = useState(null);
    const [tripStartKM, setTripStartKM] = useState(null);
    
    // Lists for Start Trip
    const [drivers, setDrivers] = useState([]);
    const [autos, setAutos] = useState([]);
    const [startForm, setStartForm] = useState({ driverId: '', autoId: '', startKM: '' });
    const [endForm, setEndForm] = useState({ endKM: '', earnings: '', batteryUsed: '', notes: '' });

    const fetchData = async () => {
        setLoading(true);
        try {
            const [tripRes, driverRes, autoRes] = await Promise.all([
                api.get('/api/trips'),
                api.get('/api/drivers'),
                api.get('/api/autos')
            ]);
            setActiveDuties(tripRes.data.filter(trip => trip.status === 'Active'));
            setDrivers(driverRes.data);
            setAutos(autoRes.data);
        } catch (error) {
            console.error('Error fetching active logs', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleStartTrip = async (e) => {
        e.preventDefault();
        setActionLoading(true);
        try {
            await api.post('/api/trips/start', {
                driverId: startForm.driverId,
                autoId: startForm.autoId,
                startKM: Number(startForm.startKM)
            });
            setShowStartTrip(false);
            setStartForm({ driverId: '', autoId: '', startKM: '' });
            fetchData();
        } catch (error) {
            alert(error.response?.data?.message || 'Error starting trip');
        } finally {
            setActionLoading(false);
        }
    };

    const handleEndTrip = async (e) => {
        e.preventDefault();
        setActionLoading(true);
        try {
            await api.put(`/api/trips/${selectedTripId}/end`, {
                endKM: Number(endForm.endKM),
                earnings: Number(endForm.earnings),
                batteryUsed: Number(endForm.batteryUsed),
                notes: endForm.notes
            });
            setShowEndTrip(false);
            setEndForm({ endKM: '', earnings: '', batteryUsed: '', notes: '' });
            setSelectedTripId(null);
            fetchData();
        } catch (error) {
            alert(error.response?.data?.message || 'Error ending trip');
        } finally {
            setActionLoading(false);
        }
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', color: 'var(--accent)' }}>
                <Loader2 className="pulse-active" size={48} style={{ animation: 'spin 1s linear infinite' }} />
            </div>
        );
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.75rem', color: 'var(--text-primary)' }}>Active Logs</h1>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Track ongoing duties and real-time vehicle status.</p>
                </div>
                <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#00ff9d', color: '#0a0f1c' }} onClick={() => setShowStartTrip(true)}>
                    <PlayCircle size={18} /> Start New Duty
                </button>
            </div>

            {activeDuties.length === 0 ? (
                <div className="glass-card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                    <Activity size={48} style={{ margin: '0 auto 1rem auto', opacity: 0.5 }} />
                    <h3>No Active Logs Found</h3>
                    <p>There are no ongoing duties at the moment.</p>
                </div>
            ) : (
                <div className="grid-cards">
                    {activeDuties.map(duty => (
                        <div key={duty._id} className="glass-card" style={{ position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--success)', boxShadow: 'var(--shadow-glow)' }}></div>
                            
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{duty.driver?.name || 'Unknown Driver'}</h3>
                                    <p style={{ fontFamily: 'monospace', color: 'var(--accent)', fontSize: '0.9rem', fontWeight: 600 }}>{duty.auto?.rcNumber || duty.auto?.autoNumber}</p>
                                </div>
                                <span className="badge badge-success pulse-active">
                                    {duty.status}
                                </span>
                            </div>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary)' }}>
                                    <Clock size={16} color="var(--accent)" />
                                    <span style={{ fontSize: '0.9rem' }}>Started at {new Date(duty.startTime).toLocaleTimeString()}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary)' }}>
                                    <MapPin size={16} color="var(--accent)" />
                                    <span style={{ fontSize: '0.9rem' }}>Location tracking enabled</span>
                                </div>
                            </div>

                            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
                                <button className="btn btn-primary" style={{ flex: 1, fontSize: '0.9rem', padding: '0.6rem', background: '#ff4d4d' }} onClick={() => { setSelectedTripId(duty._id); setTripStartKM(duty.startKM); setShowEndTrip(true); }}>
                                    <CheckCircle size={16} style={{ marginRight: '0.4rem' }} /> End Duty
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            )}

            {/* Start Trip Modal */}
            {showStartTrip && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem' }}>
                    <div className="glass-card" style={{ width: '100%', maxWidth: '400px', padding: '2rem' }}>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><PlayCircle size={20} color="#00ff9d" /> Start New Duty</h3>
                        <form onSubmit={handleStartTrip}>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Select Driver</label>
                                <select required className="glass-input" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px' }} value={startForm.driverId} onChange={e => setStartForm({...startForm, driverId: e.target.value})}>
                                    <option value="" style={{ color: '#000' }}>-- Select Driver --</option>
                                    {drivers.map(d => <option key={d._id} value={d._id} style={{ color: '#000' }}>{d.name}</option>)}
                                </select>
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Select Vehicle</label>
                                <select required className="glass-input" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px' }} value={startForm.autoId} onChange={e => setStartForm({...startForm, autoId: e.target.value})}>
                                    <option value="" style={{ color: '#000' }}>-- Select Vehicle --</option>
                                    {autos.map(a => <option key={a._id} value={a._id} style={{ color: '#000' }}>{a.rcNumber || a.autoNumber}</option>)}
                                </select>
                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Start Dashboard KM</label>
                                <input required type="number" className="glass-input" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px' }} value={startForm.startKM} onChange={e => setStartForm({...startForm, startKM: e.target.value})} placeholder="e.g. 15050" />
                            </div>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button type="button" className="btn btn-glass" style={{ flex: 1 }} onClick={() => setShowStartTrip(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary" style={{ flex: 1, background: '#00ff9d', color: '#0a0f1c' }} disabled={actionLoading}>
                                    {actionLoading ? <Loader2 size={16} className="pulse-active" style={{ animation: 'spin 1s linear infinite' }} /> : 'Start Duty'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* End Trip Modal */}
            {showEndTrip && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem' }}>
                    <div className="glass-card" style={{ width: '100%', maxWidth: '400px', padding: '2rem' }}>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={20} color="#ff4d4d" /> End Duty</h3>
                        <form onSubmit={handleEndTrip}>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Ending Dashboard KM</label>
                                <input required type="number" min={tripStartKM || 0} className="glass-input" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px' }} value={endForm.endKM} onChange={e => setEndForm({...endForm, endKM: e.target.value})} placeholder={`Must be > ${tripStartKM}`} />
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Total Earnings / Collection (₹)</label>
                                <input required type="number" min="0" className="glass-input" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px' }} value={endForm.earnings} onChange={e => setEndForm({...endForm, earnings: e.target.value})} placeholder="e.g. 800" />
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Battery Used (%)</label>
                                <input required type="number" min="0" max="100" className="glass-input" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px' }} value={endForm.batteryUsed} onChange={e => setEndForm({...endForm, batteryUsed: e.target.value})} placeholder="e.g. 25" />
                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Notes / Expenses (Optional)</label>
                                <input type="text" className="glass-input" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px' }} value={endForm.notes} onChange={e => setEndForm({...endForm, notes: e.target.value})} placeholder="e.g. Traffic challan 100 Rs" />
                            </div>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button type="button" className="btn btn-glass" style={{ flex: 1 }} onClick={() => setShowEndTrip(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary" style={{ flex: 1, background: '#ff4d4d' }} disabled={actionLoading}>
                                    {actionLoading ? <Loader2 size={16} className="pulse-active" style={{ animation: 'spin 1s linear infinite' }} /> : 'Finish Duty'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ActiveLogs;

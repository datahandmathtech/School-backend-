import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Calendar, Car, IndianRupee, MapPin, Clock, TrendingUp } from 'lucide-react';

const Trips = () => {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedTrip, setSelectedTrip] = useState(null);
    const [closeData, setCloseData] = useState({ endKM: '', earnings: '', notes: '', batteryUsed: 10 });

    const fetchTrips = async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/api/trips');
            setTrips(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTrips();
    }, []);

    const handleEndTrip = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/api/trips/${selectedTrip._id}/end`, closeData);
            setShowModal(false);
            setSelectedTrip(null);
            setCloseData({ endKM: '', earnings: '', notes: '', batteryUsed: 10 });
            fetchTrips();
            alert('Duty closed successfully!');
        } catch (err) {
            alert(err.response?.data?.message || 'Error closing duty');
        }
    };

    const formatTime = (date) => {
        return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    return (
        <div style={{ padding: '0.5rem' }}>
            <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0f172a' }}>Daily Tracking</h1>
                    <p style={{ color: '#64748b', fontSize: '1rem' }}>Live log of vehicle movements.</p>
                </div>
                <button className="btn btn-primary" onClick={fetchTrips} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Clock size={16} /> Refresh logs
                </button>
            </div>

            <div className="card table-container" style={{ padding: 0, overflow: 'hidden', border: 'none', boxShadow: '0 15px 35px rgba(0,0,0,0.05)', borderRadius: '24px' }}>
                {loading ? (
                    <div style={{ padding: '5rem', textAlign: 'center' }}>
                        <div className="spinner"></div>
                        <p style={{ marginTop: '1rem', color: '#64748b', fontWeight: 600 }}>Syncing travel logs...</p>
                    </div>
                ) : trips.length === 0 ? (
                    <div style={{ padding: '6rem', textAlign: 'center', background: '#fff' }}>
                        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                            <Car size={32} color="#94a3b8" />
                        </div>
                        <h3 style={{ fontSize: '1.5rem', color: '#1e293b', marginBottom: '0.5rem' }}>No travel logs found</h3>
                        <p style={{ color: '#64748b' }}>Logs will appear here once drivers start their duties.</p>
                    </div>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead style={{ background: 'linear-gradient(to right, #f8fafc, #eff6ff)', borderBottom: '2px solid #e2e8f0' }}>
                                <tr>
                                    <th style={{ padding: '1.25rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 800 }}>Date & Time</th>
                                    <th style={{ padding: '1.25rem 1rem', textAlign: 'left', fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 800 }}>Auto & Driver</th>
                                    <th style={{ padding: '1.25rem 1rem', textAlign: 'left', fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 800 }}>Mileage (KM)</th>
                                    <th style={{ padding: '1.25rem 1rem', textAlign: 'left', fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 800 }}>Duty Remark</th>
                                    <th style={{ padding: '1.25rem 1rem', textAlign: 'center', fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 800 }}>Status</th>
                                    <th style={{ padding: '1.25rem 1.5rem', textAlign: 'right', fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 800 }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trips.map((trip) => (
                                    <tr key={trip._id} className="table-row" style={{ borderBottom: '1px solid #f1f5f9', background: '#fff', transition: 'all 0.2s' }}>
                                        <td style={{ padding: '1.25rem 1.5rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Calendar size={18} color="var(--primary)" />
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <span style={{ fontWeight: 800, color: '#1e293b' }}>{formatDate(trip.startTime)}</span>
                                                    <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>{formatTime(trip.startTime)}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td style={{ padding: '1.25rem 1rem' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '1rem' }}>{trip.auto?.autoNumber}</span>
                                                <span style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: 600 }}>{trip.driver?.name}</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '1.25rem 1rem' }}>
                                            <div style={{ fontSize: '0.875rem' }}>
                                                <p style={{ fontWeight: 700, color: '#334155' }}>{trip.startKM} → {trip.endKM || '---'}</p>
                                                <p style={{ fontWeight: 800, color: '#10b981', fontSize: '1rem' }}>{trip.totalKM ? `${trip.totalKM} KM` : '--'}</p>
                                            </div>
                                        </td>
                                        <td style={{ padding: '1.25rem 1rem', maxWidth: '300px' }}>
                                            <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '0.9rem', color: trip.notes ? '#334155' : '#94a3b8', fontStyle: trip.notes ? 'normal' : 'italic' }}>
                                                {trip.notes || 'No remarks added yet'}
                                            </div>
                                        </td>
                                        <td style={{ padding: '1.25rem 1rem', textAlign: 'center' }}>
                                            <span className={`badge badge-${trip.status === 'Completed' ? 'success' : 'warning'}`} style={{ borderRadius: '8px', padding: '0.5rem 1rem' }}>
                                                {trip.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                                            {trip.status === 'Active' ? (
                                                <button 
                                                    className="btn btn-primary" 
                                                    style={{ padding: '0.5rem 1rem', fontSize: '0.75rem' }} 
                                                    onClick={() => { setSelectedTrip(trip); setCloseData({...closeData, startKM: trip.startKM}); setShowModal(true); }}
                                                >
                                                    Close Duty
                                                </button>
                                            ) : (
                                                <div style={{ fontWeight: 800, color: 'var(--secondary)' }}>₹{trip.earnings} Net</div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {showModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15,23,42,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' }}>
                    <div className="card" style={{ width: '100%', maxWidth: '500px', padding: '2rem' }}>
                        <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                                <Clock size={20} />
                            </div>
                            Close Daily Duty
                        </h2>
                        <form onSubmit={handleEndTrip} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>End Mileage (KM)</label>
                                    <input type="number" className="input" placeholder="Current KM" value={closeData.endKM} onChange={(e) => setCloseData({...closeData, endKM: e.target.value})} required />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Total Earned (₹)</label>
                                    <input type="number" className="input" placeholder="Today's Cash" value={closeData.earnings} onChange={(e) => setCloseData({...closeData, earnings: e.target.value})} required />
                                </div>
                            </div>
                            <div>
                                <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Battery Consumption (%)</label>
                                <input type="number" className="input" placeholder="Estimated battery used" value={closeData.batteryUsed} onChange={(e) => setCloseData({...closeData, batteryUsed: e.target.value})} />
                            </div>
                            <div>
                                <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Daily Remark (Work Details)</label>
                                <textarea 
                                    className="input" 
                                    style={{ height: '100px', paddingTop: '0.75rem' }} 
                                    placeholder="e.g. Completed 10 pick-ups, vehicle maintenance checked." 
                                    value={closeData.notes} 
                                    onChange={(e) => setCloseData({...closeData, notes: e.target.value})} 
                                    required 
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <button type="button" className="btn btn-ghost" style={{ flex: 1, border: '1px solid #e2e8f0' }} onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary" style={{ flex: 2, justifyContent: 'center' }}>Complete Duty</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Trips;

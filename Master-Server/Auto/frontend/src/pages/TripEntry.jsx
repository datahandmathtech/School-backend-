import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../store/AuthContext';
import { Play, Square, Plus, IndianRupee, MapPin } from 'lucide-react';

const TripEntry = () => {
    const { user } = useAuth();
    const [profile, setProfile] = useState(null);
    const [activeTrip, setActiveTrip] = useState(null);
    const [formData, setFormData] = useState({
        startKM: '',
        endKM: '',
        earnings: '',
        batteryUsed: '',
        notes: ''
    });

    useEffect(() => {
        fetchProfile();
        fetchActiveTrip();
    }, []);

    const fetchProfile = async () => {
        const { data } = await api.get(`/api/drivers/profile/${user._id}`);
        setProfile(data);
        if (data && !activeTrip) {
            setFormData(prev => ({ ...prev, startKM: data.assignedAuto?.lastKM || 0 }));
        }
    };

    const fetchActiveTrip = async () => {
        const { data } = await api.get('/api/trips');
        const active = data.find(t => t.driver._id === user._id && t.status === 'Active');
        setActiveTrip(active);
    };

    const handleStartTrip = async () => {
        if (!profile?.assignedAuto) return alert('No auto assigned!');
        try {
            const { data } = await api.post('/api/trips/start', {
                autoId: profile.assignedAuto._id,
                startKM: formData.startKM
            });
            setActiveTrip(data);
        } catch (err) {
            alert(err.response?.data?.message || 'Error starting trip');
        }
    };

    const handleEndTrip = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/api/trips/${activeTrip._id}/end`, {
                endKM: formData.endKM,
                earnings: formData.earnings,
                batteryUsed: formData.batteryUsed,
                notes: formData.notes
            });
            setActiveTrip(null);
            setFormData({ startKM: formData.endKM, endKM: '', earnings: '', batteryUsed: '', notes: '' });
            alert('Trip ended successfully!');
        } catch (err) {
            alert(err.response?.data?.message || 'Error ending trip');
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h1 style={{ marginBottom: '2rem', fontSize: '1.875rem', fontWeight: 800 }}>Daily Trip Entry</h1>

            {!activeTrip ? (
                <div className="card">
                    <h3 style={{ marginBottom: '1.5rem' }}>Start New Shift</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <label style={{ fontSize: '0.875rem', display: 'block', marginBottom: '0.5rem' }}>Start Odometer (KM)</label>
                            <input
                                type="number"
                                className="input"
                                value={formData.startKM}
                                onChange={e => setFormData({ ...formData, startKM: e.target.value })}
                            />
                        </div>
                        <button className="btn btn-primary" onClick={handleStartTrip} style={{ height: '50px' }}>
                            <Play size={20} /> Start Trip
                        </button>
                    </div>
                </div>
            ) : (
                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <h3 style={{ color: 'var(--primary)' }}>Trip in Progress...</h3>
                        <span className="badge badge-warning">Active since {new Date(activeTrip.startTime).toLocaleTimeString()}</span>
                    </div>

                    <form onSubmit={handleEndTrip} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={{ fontSize: '0.875rem' }}>End Odometer (KM)</label>
                                <input
                                    type="number"
                                    className="input"
                                    required
                                    value={formData.endKM}
                                    onChange={e => setFormData({ ...formData, endKM: e.target.value })}
                                />
                            </div>
                            <div>
                                <label style={{ fontSize: '0.875rem' }}>Today's Total Collection (₹)</label>
                                <input
                                    type="number"
                                    className="input"
                                    required
                                    value={formData.earnings}
                                    onChange={e => setFormData({ ...formData, earnings: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label style={{ fontSize: '0.875rem' }}>Battery Used (%)</label>
                            <input
                                type="number"
                                className="input"
                                required
                                value={formData.batteryUsed}
                                onChange={e => setFormData({ ...formData, batteryUsed: e.target.value })}
                            />
                        </div>

                        <div>
                            <label style={{ fontSize: '0.875rem' }}>Additional Notes</label>
                            <textarea
                                className="input"
                                style={{ height: '80px', paddingTop: '0.5rem' }}
                                value={formData.notes}
                                onChange={e => setFormData({ ...formData, notes: e.target.value })}
                                placeholder="Any issues or charging stops?"
                            />
                        </div>

                        <button type="submit" className="btn btn-danger" style={{ height: '50px', marginTop: '1rem' }}>
                            <Square size={20} /> End Trip & Submit
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default TripEntry;

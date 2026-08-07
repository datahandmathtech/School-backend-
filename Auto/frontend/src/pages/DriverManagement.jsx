import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Plus, UserPlus, Phone, MapPin, Clipboard } from 'lucide-react';

const DriverManagement = () => {
    const [drivers, setDrivers] = useState([]);
    const [autos, setAutos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [assignModal, setAssignModal] = useState(false);
    const [selectedDriver, setSelectedDriver] = useState(null);
    const [selectedAuto, setSelectedAuto] = useState('');

    const [formData, setFormData] = useState({
        name: '', email: '', password: '', licenseNumber: '', phone: '', address: ''
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const [driversRes, autosRes] = await Promise.all([
            api.get('/api/drivers'),
            api.get('/api/autos')
        ]);
        setDrivers(driversRes.data);
        setAutos(autosRes.data);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            // 1. Register User
            const { data: user } = await api.post('/api/auth/register', {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role: 'driver'
            });

            // 2. Save Driver Profile
            await api.post('/api/drivers', {
                userId: user._id,
                licenseNumber: formData.licenseNumber,
                phone: formData.phone,
                address: formData.address
            });

            setShowModal(false);
            fetchData();
        } catch (err) {
            alert(err.response?.data?.message || 'Error creating driver');
        }
    };

    const handleAssign = async (e) => {
        e.preventDefault();
        try {
            await api.put('/api/drivers/assign', {
                driverId: selectedDriver._id,
                autoId: selectedAuto
            });
            setAssignModal(false);
            fetchData();
        } catch (err) {
            alert(err.response?.data?.message || 'Error assigning auto');
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: 800 }}>Driver Management</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Monitor and assign drivers to vehicles</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    <UserPlus size={20} /> Register Driver
                </button>
            </div>

            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
                gap: '2rem',
                marginTop: '1rem'
            }}>
                {drivers.map(driver => (
                    <div key={driver._id} className="card" style={{ 
                        position: 'relative', 
                        overflow: 'hidden',
                        border: 'none',
                        boxShadow: '0 10px 30px -5px rgba(0,0,0,0.1)',
                        transition: 'transform 0.2s',
                        background: '#fff'
                    }}>
                        <div style={{ 
                            position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', 
                            background: driver.status === 'On Duty' ? 'var(--secondary)' : 'var(--warning)' 
                        }}></div>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
                            <div>
                                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1e293b' }}>{driver.user.name}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{driver.user.email}</p>
                            </div>
                            <span className={`badge badge-${driver.status === 'On Duty' ? 'success' : 'warning'}`} style={{ borderRadius: '6px', fontSize: '0.7rem' }}>
                                {driver.status}
                            </span>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem' }}>
                            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', color: '#475569' }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Phone size={16} color="var(--primary)" />
                                </div>
                                <span>{driver.phone}</span>
                            </div>
                            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', color: '#475569' }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Clipboard size={16} color="var(--primary)" />
                                </div>
                                <span style={{ fontWeight: 600 }}>Lic: {driver.licenseNumber}</span>
                            </div>
                            
                            <div style={{ 
                                marginTop: '0.5rem', 
                                padding: '1.25rem', 
                                background: driver.assignedAuto ? 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)' : '#fff1f2', 
                                borderRadius: '12px',
                                border: `1px dashed ${driver.assignedAuto ? '#86efac' : '#fecaca'}`
                            }}>
                                <p style={{ fontWeight: 700, fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>Assigned Vehicle</p>
                                {driver.assignedAuto ? (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                                            <MapPin size={18} color="var(--secondary)" />
                                        </div>
                                        <div>
                                            <p style={{ fontWeight: 800, color: '#166534', fontSize: '1.1rem' }}>{driver.assignedAuto.autoNumber}</p>
                                            <p style={{ fontSize: '0.75rem', color: '#15803d' }}>{driver.assignedAuto.model}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <p style={{ color: '#991b1b', fontWeight: 700, fontStyle: 'italic' }}>No vehicle assigned yet</p>
                                )}
                            </div>
                        </div>

                        <button
                            className="btn btn-primary"
                            style={{ 
                                width: '100%', 
                                marginTop: '1.5rem', 
                                justifyContent: 'center',
                                padding: '0.875rem',
                                background: 'linear-gradient(135deg, #334155 0%, #1e293b 100%)',
                                color: 'white',
                                borderRadius: '10px'
                            }}
                            onClick={() => { setSelectedDriver(driver); setAssignModal(true); }}
                        >
                            {driver.assignedAuto ? 'Change Assignment' : 'Assign Vehicle Now'}
                        </button>
                    </div>
                ))}
            </div>

            {showModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backdropFilter: 'blur(4px)', zIndex: 100
                }}>
                    <div className="card" style={{ width: '100%', maxWidth: '500px' }}>
                        <h2>New Driver Registration</h2>
                        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
                            <input className="input" placeholder="Full Name" onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                            <input className="input" type="email" placeholder="Email" onChange={e => setFormData({ ...formData, email: e.target.value })} required />
                            <input className="input" type="password" placeholder="Password" onChange={e => setFormData({ ...formData, password: e.target.value })} required />
                            <input className="input" placeholder="License Number" onChange={e => setFormData({ ...formData, licenseNumber: e.target.value })} required />
                            <input className="input" placeholder="Phone Number" onChange={e => setFormData({ ...formData, phone: e.target.value })} required />
                            <input className="input" placeholder="Address" onChange={e => setFormData({ ...formData, address: e.target.value })} required />
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <button type="button" className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {assignModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backdropFilter: 'blur(4px)', zIndex: 100
                }}>
                    <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
                        <h2>Assign Auto to {selectedDriver?.user.name}</h2>
                        <form onSubmit={handleAssign} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
                            <select className="input" value={selectedAuto} onChange={e => setSelectedAuto(e.target.value)} required>
                                <option value="">Select Auto</option>
                                {autos.map(auto => (
                                    <option key={auto._id} value={auto._id}>{auto.autoNumber} - {auto.model}</option>
                                ))}
                            </select>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <button type="button" className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setAssignModal(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>Confirm Assignment</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DriverManagement;

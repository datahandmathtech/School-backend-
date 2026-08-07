import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Modal from '../components/Modal';
import { Plus, Edit, Trash2, Battery, Car, ShieldAlert, ShieldCheck, FileText, CheckCircle2, Activity, Info, Loader2, Search, Filter } from 'lucide-react';

const Vehicles = () => {
    const [autos, setAutos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);
    const [fullScreenImage, setFullScreenImage] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const [formData, setFormData] = useState({ 
        autoNumber: '', 
        model: '', 
        rcNumber: '', 
        rcExpiry: '', 
        insuranceExpiry: '',
        rcPhoto: '',
        insurancePhoto: '',
        lastKM: '',
        batteryStatus: ''
    });
    const [previews, setPreviews] = useState({ rcPhoto: null, insurancePhoto: null });

    useEffect(() => {
        fetchAutos();
    }, []);

    const fetchAutos = async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/api/autos');
            setAutos(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e, field) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, [field]: file }));
            setPreviews(prev => ({ ...prev, [field]: URL.createObjectURL(file) }));
        }
    };

    const handleEdit = (auto) => {
        setFormData({
            autoNumber: auto.autoNumber,
            model: auto.model,
            rcNumber: auto.rcNumber || '',
            rcExpiry: auto.rcExpiry ? new Date(auto.rcExpiry).toISOString().split('T')[0] : '',
            insuranceExpiry: auto.insuranceExpiry ? new Date(auto.insuranceExpiry).toISOString().split('T')[0] : '',
            rcPhoto: auto.rcPhoto || '',
            insurancePhoto: auto.insurancePhoto || '',
            lastKM: auto.lastKM || '',
            batteryStatus: auto.batteryStatus || ''
        });
        setPreviews({ rcPhoto: auto.rcPhoto, insurancePhoto: auto.insurancePhoto });
        setEditingId(auto._id);
        setShowModal(true);
    };

    const compressImage = async (file) => {
        if (!file || !file.type.startsWith('image/')) return file;
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const MAX_WIDTH = 1024;
                    const MAX_HEIGHT = 1024;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    canvas.toBlob((blob) => {
                        const newFile = new File([blob], file.name, {
                            type: 'image/jpeg',
                            lastModified: Date.now(),
                        });
                        resolve(newFile);
                    }, 'image/jpeg', 0.7);
                };
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        const data = new FormData();
        
        for (const key of Object.keys(formData)) {
            if (formData[key] !== null && formData[key] !== undefined && formData[key] !== '') {
                if ((key === 'rcPhoto' || key === 'insurancePhoto') && formData[key] instanceof File) {
                    const compressedFile = await compressImage(formData[key]);
                    data.append(key, compressedFile);
                } else {
                    data.append(key, formData[key]);
                }
            }
        }

        try {
            if (editingId) {
                await api.put(`/api/autos/${editingId}`, data);
            } else {
                await api.post('/api/autos', data);
            }
            setShowModal(false);
            setEditingId(null);
            setFormData({ autoNumber: '', model: '', rcNumber: '', rcExpiry: '', insuranceExpiry: '', rcPhoto: '', insurancePhoto: '', lastKM: '', batteryStatus: '' });
            setPreviews({ rcPhoto: null, insurancePhoto: null });
            fetchAutos();
        } catch (err) {
            alert(err.response?.data?.message || 'Error saving auto');
        } finally {
            setSaving(false);
        }
    };

    const handleBlockToggle = async (auto) => {
        const newStatus = auto.status === 'Inactive' ? 'Active' : 'Inactive';
        if (window.confirm(`Are you sure you want to change status to ${newStatus}?`)) {
            try {
                const data = new FormData();
                data.append('status', newStatus);
                await api.put(`/api/autos/${auto._id}`, data);
                fetchAutos();
            } catch (err) {
                alert('Error updating status');
            }
        }
    };

    const deleteAuto = async (id) => {
        if (window.confirm('Are you sure you want to completely delete this vehicle? This action cannot be undone.')) {
            try {
                await api.delete(`/api/autos/${id}`);
                fetchAutos();
            } catch (err) {
                alert('Error deleting auto');
            }
        }
    };

    const totalAutos = autos.length;
    const activeAutos = autos.filter(a => a.status === 'Active').length;
    const maintenanceAutos = autos.filter(a => a.status === 'Maintenance').length;
    const blockedAutos = autos.filter(a => a.status === 'Inactive').length;

    const filteredAutos = autos.filter(auto => 
        auto.autoNumber?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        auto.rcNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        auto.model?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ backgroundColor: '#0d111c', minHeight: '100vh', padding: '1rem', borderRadius: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.5rem', color: '#fff', margin: 0 }}>Vehicles MGT</h1>
                    <p style={{ color: '#8a94a6', fontSize: '0.8rem', marginTop: '0.2rem' }}>Complete inventory of all fleet vehicles.</p>
                </div>
                <button className="btn btn-primary" onClick={() => { setEditingId(null); setFormData({ autoNumber: '', model: '', rcNumber: '', rcExpiry: '', insuranceExpiry: '', rcPhoto: '', insurancePhoto: '', lastKM: '', batteryStatus: '' }); setPreviews({ rcPhoto: null, insurancePhoto: null }); setShowModal(true); }} style={{ padding: '0.6rem 1.2rem', borderRadius: '8px' }}>
                    <Plus size={16} /> Add Vehicle
                </button>
            </div>

            {/* Stats Overview */}
            <div className="grid-cards" style={{ marginBottom: '2rem' }}>
                <div style={{ backgroundColor: '#1a1f2e', borderRadius: '12px', padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <p style={{ color: '#8a94a6', fontSize: '0.875rem' }}>Total Fleet</p>
                            <h3 style={{ fontSize: '2rem', color: '#fff', marginTop: '0.5rem', margin: 0 }}>{totalAutos}</h3>
                        </div>
                        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(136, 117, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8875ff' }}><Car size={24} /></div>
                    </div>
                </div>
                <div style={{ backgroundColor: '#1a1f2e', borderRadius: '12px', padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <p style={{ color: '#8a94a6', fontSize: '0.875rem' }}>Active / Running</p>
                            <h3 style={{ fontSize: '2rem', color: '#00ff9d', marginTop: '0.5rem', margin: 0 }}>{activeAutos}</h3>
                        </div>
                        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(0, 255, 157, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00ff9d' }}><Activity size={24} /></div>
                    </div>
                </div>
                <div style={{ backgroundColor: '#1a1f2e', borderRadius: '12px', padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <p style={{ color: '#8a94a6', fontSize: '0.875rem' }}>In Maintenance</p>
                            <h3 style={{ fontSize: '2rem', color: maintenanceAutos > 0 ? '#ffb800' : '#8a94a6', marginTop: '0.5rem', margin: 0 }}>{maintenanceAutos}</h3>
                        </div>
                        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: maintenanceAutos > 0 ? 'rgba(255, 184, 0, 0.1)' : 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: maintenanceAutos > 0 ? '#ffb800' : '#8a94a6' }}><Info size={24} /></div>
                    </div>
                </div>
                <div style={{ backgroundColor: '#1a1f2e', borderRadius: '12px', padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <p style={{ color: '#8a94a6', fontSize: '0.875rem' }}>Blocked / Inactive</p>
                            <h3 style={{ fontSize: '2rem', color: blockedAutos > 0 ? '#ff4d4d' : '#8a94a6', marginTop: '0.5rem', margin: 0 }}>{blockedAutos}</h3>
                        </div>
                        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: blockedAutos > 0 ? 'rgba(255, 77, 77, 0.1)' : 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: blockedAutos > 0 ? '#ff4d4d' : '#8a94a6' }}><ShieldAlert size={24} /></div>
                    </div>
                </div>
            </div>

            {/* List Table */}
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', color: 'var(--accent)' }}>
                    <Loader2 className="pulse-active" size={32} style={{ animation: 'spin 1s linear infinite' }} />
                </div>
            ) : (
                <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
                    <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ position: 'relative', width: '300px' }}>
                            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input 
                                type="text" 
                                className="glass-input" 
                                placeholder="Search by RC number or model..." 
                                style={{ paddingLeft: '2.5rem', width: '100%', borderRadius: '8px' }}
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button className="btn btn-glass" style={{ borderRadius: '8px' }}>
                            <Filter size={18} />
                            Filter
                        </button>
                    </div>
                    
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                                <th style={{ padding: '1.2rem', color: '#8a94a6', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.5px' }}>AUTO NO & MODEL</th>
                                <th style={{ padding: '1.2rem', color: '#8a94a6', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.5px' }}>BATTERY & KM</th>
                                <th style={{ padding: '1.2rem', color: '#8a94a6', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.5px' }}>RC DETAILS</th>
                                <th style={{ padding: '1.2rem', color: '#8a94a6', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.5px' }}>INSURANCE</th>
                                <th style={{ padding: '1.2rem', color: '#8a94a6', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.5px' }}>STATUS</th>
                                <th style={{ padding: '1.2rem', color: '#8a94a6', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.5px', textAlign: 'right' }}>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAutos.map(auto => {
                                const isBlocked = auto.status === 'Inactive';
                                return (
                                <tr key={auto._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', opacity: isBlocked ? 0.6 : 1, transition: 'all 0.3s' }}>
                                    <td style={{ padding: '1.2rem' }}>
                                        <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            {auto.autoNumber} {isBlocked && <ShieldAlert size={14} color="#ff4d4d" />}
                                        </div>
                                        <div style={{ color: '#8875ff', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                                            {auto.model}
                                        </div>
                                    </td>
                                    
                                    <td style={{ padding: '1.2rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: auto.batteryStatus > 20 ? '#00ff9d' : '#ff4d4d', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.3rem' }}>
                                            <Battery size={16} /> {auto.batteryStatus}%
                                        </div>
                                        <div style={{ color: '#6e7a93', fontSize: '0.8rem' }}>
                                            Run: {auto.lastKM?.toLocaleString() || 0} KM
                                        </div>
                                    </td>

                                    <td style={{ padding: '1.2rem' }}>
                                        <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.3rem' }}>
                                            {auto.rcNumber || 'No RC'}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            {auto.rcPhoto ? (
                                                <button onClick={() => setFullScreenImage(auto.rcPhoto)} style={{ background: '#2a2418', border: '1px solid #f5b841', borderRadius: '4px', padding: '0.2rem 0.5rem', fontSize: '0.7rem', color: '#f5b841', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><FileText size={12}/> View RC</button>
                                            ) : (
                                                <span style={{ fontSize: '0.75rem', color: '#6e7a93' }}>No File</span>
                                            )}
                                            {auto.rcExpiry && <span style={{ fontSize: '0.75rem', color: '#8a94a6' }}>Exp: {new Date(auto.rcExpiry).toLocaleDateString('en-GB')}</span>}
                                        </div>
                                    </td>

                                    <td style={{ padding: '1.2rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                                            {auto.insurancePhoto ? (
                                                <button onClick={() => setFullScreenImage(auto.insurancePhoto)} style={{ background: '#1c1b3b', border: '1px solid #8875ff', borderRadius: '4px', padding: '0.2rem 0.5rem', fontSize: '0.7rem', color: '#8875ff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><CheckCircle2 size={12}/> Policy</button>
                                            ) : (
                                                <span style={{ fontSize: '0.75rem', color: '#6e7a93' }}>No Policy Uploaded</span>
                                            )}
                                        </div>
                                        {auto.insuranceExpiry && <div style={{ fontSize: '0.75rem', color: '#8a94a6' }}>Exp: {new Date(auto.insuranceExpiry).toLocaleDateString('en-GB')}</div>}
                                    </td>

                                    <td style={{ padding: '1.2rem' }}>
                                        <span style={{ 
                                            backgroundColor: auto.status === 'Active' ? 'rgba(0, 255, 157, 0.1)' : auto.status === 'Maintenance' ? 'rgba(255, 184, 0, 0.1)' : 'rgba(255, 77, 77, 0.1)', 
                                            color: auto.status === 'Active' ? '#00ff9d' : auto.status === 'Maintenance' ? '#ffb800' : '#ff4d4d', 
                                            border: `1px solid ${auto.status === 'Active' ? 'rgba(0, 255, 157, 0.3)' : auto.status === 'Maintenance' ? 'rgba(255, 184, 0, 0.3)' : 'rgba(255, 77, 77, 0.3)'}`, 
                                            padding: '0.3rem 0.6rem', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.5px' 
                                        }}>
                                            {auto.status}
                                        </span>
                                    </td>

                                    <td style={{ padding: '1.2rem', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                            <button onClick={() => handleEdit(auto)} style={{ backgroundColor: '#262933', border: 'none', borderRadius: '6px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} title="Edit">
                                                <Edit size={16} color="#a0a0b0" />
                                            </button>
                                            <button onClick={() => handleBlockToggle(auto)} style={{ backgroundColor: isBlocked ? '#1c3b2e' : '#3b1b1b', border: 'none', borderRadius: '6px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} title={isBlocked ? "Unblock" : "Block"}>
                                                {isBlocked ? <ShieldCheck size={16} color="#00ff9d" /> : <ShieldAlert size={16} color="#ff4d4d" />}
                                            </button>
                                            <button onClick={() => deleteAuto(auto._id)} style={{ backgroundColor: '#3b1b1b', border: 'none', borderRadius: '6px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} title="Delete">
                                                <Trash2 size={16} color="#ff4d4d" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )})}
                            {filteredAutos.length === 0 && (
                                <tr><td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: '#6e7a93' }}>No vehicles found matching search.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Premium Add/Edit Modal */}
            <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editingId ? 'Edit Vehicle Details' : 'Register New Vehicle'}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '0.5rem' }}>
                    
                    {/* Basic Info Section */}
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
                        <h4 style={{ color: '#fff', fontSize: '0.9rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Car size={16} color="#8875ff" /> Core Identity
                        </h4>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.4rem', color: '#8a94a6', fontSize: '0.8rem', fontWeight: 600 }}>Auto Number</label>
                                <input required type="text" placeholder="e.g. MH01 AB 1234" className="glass-input" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px' }} value={formData.autoNumber} onChange={e => setFormData({...formData, autoNumber: e.target.value})} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.4rem', color: '#8a94a6', fontSize: '0.8rem', fontWeight: 600 }}>Model Name</label>
                                <input required type="text" placeholder="e.g. Mahindra Treo" className="glass-input" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px' }} value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.4rem', color: '#8a94a6', fontSize: '0.8rem', fontWeight: 600 }}>Current Battery (%)</label>
                                <input required type="number" min="0" max="100" placeholder="e.g. 100" className="glass-input" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px' }} value={formData.batteryStatus} onChange={e => setFormData({...formData, batteryStatus: e.target.value})} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.4rem', color: '#8a94a6', fontSize: '0.8rem', fontWeight: 600 }}>Total Run (KM)</label>
                                <input required type="number" placeholder="0" className="glass-input" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px' }} value={formData.lastKM} onChange={e => setFormData({...formData, lastKM: e.target.value})} />
                            </div>
                        </div>
                    </div>

                    {/* Documentation Section */}
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
                        <h4 style={{ color: '#fff', fontSize: '0.9rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <FileText size={16} color="#f5b841" /> Documentation
                        </h4>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.4rem', color: '#8a94a6', fontSize: '0.8rem', fontWeight: 600 }}>RC Number</label>
                                <input required type="text" placeholder="Enter RC No." className="glass-input" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px' }} value={formData.rcNumber} onChange={e => setFormData({...formData, rcNumber: e.target.value})} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.4rem', color: '#8a94a6', fontSize: '0.8rem', fontWeight: 600 }}>RC Expiry Date</label>
                                <input required type="date" className="glass-input" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px' }} value={formData.rcExpiry} onChange={e => setFormData({...formData, rcExpiry: e.target.value})} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.4rem', color: '#8a94a6', fontSize: '0.8rem', fontWeight: 600 }}>Insurance Expiry Date</label>
                                <input required type="date" className="glass-input" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px' }} value={formData.insuranceExpiry} onChange={e => setFormData({...formData, insuranceExpiry: e.target.value})} />
                            </div>
                            <div></div>
                            
                            {/* File Uploads */}
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.4rem', color: '#8a94a6', fontSize: '0.8rem', fontWeight: 600 }}>Upload RC Photo</label>
                                <input type="file" accept="image/*" className="glass-input" style={{ width: '100%', padding: '0.65rem', borderRadius: '8px' }} onChange={e => handleFileChange(e, 'rcPhoto')} />
                                {previews.rcPhoto && <img src={previews.rcPhoto} alt="RC Preview" style={{ width: '100%', height: '80px', objectFit: 'cover', marginTop: '0.5rem', borderRadius: '8px', border: '1px solid var(--border-glass)' }} />}
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.4rem', color: '#8a94a6', fontSize: '0.8rem', fontWeight: 600 }}>Upload Insurance Photo</label>
                                <input type="file" accept="image/*" className="glass-input" style={{ width: '100%', padding: '0.65rem', borderRadius: '8px' }} onChange={e => handleFileChange(e, 'insurancePhoto')} />
                                {previews.insurancePhoto && <img src={previews.insurancePhoto} alt="Ins Preview" style={{ width: '100%', height: '80px', objectFit: 'cover', marginTop: '0.5rem', borderRadius: '8px', border: '1px solid var(--border-glass)' }} />}
                            </div>
                        </div>
                    </div>

                    <button disabled={saving} type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', borderRadius: '12px', fontSize: '1rem', fontWeight: 600, display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                        {saving ? <Loader2 size={20} className="pulse-active" style={{ animation: 'spin 1s linear infinite' }} /> : (editingId ? 'Update Vehicle' : 'Register Vehicle')}
                    </button>
                </form>
            </Modal>

            {/* Image Viewer */}
            {fullScreenImage && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.9)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out', backdropFilter: 'blur(10px)' }} onClick={() => setFullScreenImage(null)}>
                    <img src={fullScreenImage} alt="Full Screen" style={{ maxWidth: '90%', maxHeight: '90%', borderRadius: '12px', boxShadow: '0 25px 50px rgba(0,0,0,0.5)' }} />
                    <button style={{ position: 'absolute', top: '2rem', right: '2rem', background: '#fff', border: 'none', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', fontWeight: 800, fontSize: '1.2rem', color: '#000' }} onClick={() => setFullScreenImage(null)}>✕</button>
                </div>
            )}
        </div>
    );
};

export default Vehicles;

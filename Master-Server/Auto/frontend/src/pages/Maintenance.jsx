import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Settings, Wrench, IndianRupee, Calendar, Search, Filter, AlertCircle, CheckCircle2, X } from 'lucide-react';
import StatCard from '../components/StatCard';

const Maintenance = () => {
    const [history, setHistory] = useState([]);
    const [autos, setAutos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [formData, setFormData] = useState({
        autoId: '', 
        vendorName: '', 
        totalCost: '', 
        nextServiceDate: '', 
        description: '',
        serviceCategory: '',
        specificTasks: []
    });

    const SERVICE_CATEGORIES = {
        'Battery Check': ['Battery voltage check', 'Battery terminals clean', 'Weak battery replace'],
        'Wiring Inspection': ['Wiring check', 'Short circuit check', 'Proper insulation'],
        'Lights & Indicators': ['Headlight, tail light, indicator check', 'Fuse change', 'Bulb replacement'],
        'Starter Motor & Self System': ['Self start work check', 'Starter motor servicing'],
        'Alternator / Charging System': ['Battery charge check', 'Alternator belt/output check'],
        'Fuse & Relay Check': ['Burn fuse replace', 'Relay work check'],
        'Horn & Switches': ['Horn work check', 'Switches check'],
        'Dashboard & Meter': ['Speedometer', 'fuel meter', 'warning lights check'],
        'Others': []
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [histRes, autosRes] = await Promise.all([
                api.get('/api/maintenance'),
                api.get('/api/autos')
            ]);
            setHistory(histRes.data);
            setAutos(autosRes.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleTaskToggle = (task) => {
        const tasks = [...formData.specificTasks];
        if (tasks.includes(task)) {
            setFormData({ ...formData, specificTasks: tasks.filter(t => t !== task) });
        } else {
            setFormData({ ...formData, specificTasks: [...tasks, task] });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/api/maintenance', formData);
            setShowModal(false);
            setFormData({
                autoId: '', vendorName: '', totalCost: '', nextServiceDate: '', 
                description: '', serviceCategory: '', specificTasks: []
            });
            fetchData();
        } catch (err) {
            alert('Error recording maintenance');
        }
    };

    const filteredHistory = history.filter(item => 
        item.auto?.autoNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.serviceCategory?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.vendorName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalMaintenanceSpend = history.reduce((acc, curr) => acc + curr.totalCost, 0);
    const overdueServices = history.filter(item => new Date(item.nextServiceDate) < new Date()).length;

    return (
        <div style={{ padding: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a' }}>Maintenance Logs</h1>
                    <p style={{ color: '#64748b', fontSize: '1rem' }}>Track vehicle repairs and service health</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowModal(true)} style={{ padding: '0.75rem 1.5rem', fontSize: '1rem' }}>
                    <Wrench size={20} /> Record Maintenance
                </button>
            </div>

            {/* Quick Stats Grid */}
            <div className="responsive-grid" style={{ marginBottom: '2.5rem' }}>
                <StatCard title="Total Spends (₹)" value={totalMaintenanceSpend.toLocaleString('en-IN')} icon={IndianRupee} color="#4f46e5" />
                <StatCard title="Auto Fleet" value={autos.length} icon={Settings} color="#10b981" />
                <StatCard title="Pending Services" value={overdueServices} icon={AlertCircle} color="#ef4444" />
                <StatCard title="Successful Repairs" value={history.length} icon={CheckCircle2} color="#f59e0b" />
            </div>

            {/* Filter Bar */}
            <div className="card" style={{ marginBottom: '2rem', padding: '1.25rem' }}>
                <div style={{ position: 'relative' }}>
                    <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input 
                        type="text" 
                        className="input" 
                        placeholder="Search by Auto Number, Vendor or Category..." 
                        style={{ paddingLeft: '3rem', fontSize: '1rem', background: '#f8fafc' }}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="card table-container" style={{ padding: 0, overflow: 'hidden', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', borderRadius: '24px' }}>
                {loading ? (
                    <div style={{ padding: '4rem', textAlign: 'center' }}>Loading maintenance data...</div>
                ) : filteredHistory.length === 0 ? (
                    <div style={{ padding: '5rem', textAlign: 'center' }}>
                         <div style={{ fontSize: '3rem' }}>🛠️</div>
                         <h3 style={{ marginTop: '1rem', color: '#475569' }}>No repair history found</h3>
                         <p style={{ color: '#94a3b8' }}>Try a different search or record your first maintenance.</p>
                    </div>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ background: '#f8fafc', borderBottom: '1px solid var(--border)' }}>
                            <tr>
                                <th style={{ padding: '1.25rem 1rem', textAlign: 'left', fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b' }}>Service Detail</th>
                                <th style={{ padding: '1.25rem 1rem', textAlign: 'left', fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b' }}>Vehicle</th>
                                <th style={{ padding: '1.25rem 1rem', textAlign: 'left', fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b' }}>Cost & Vendor</th>
                                <th style={{ padding: '1.25rem 1rem', textAlign: 'left', fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b' }}>Tasks & Notes</th>
                                <th style={{ padding: '1.25rem 1rem', textAlign: 'left', fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b' }}>Schedule</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredHistory.map(item => (
                                <tr key={item._id} className="table-row" style={{ borderBottom: '1px solid var(--border)' }}>
                                    <td style={{ padding: '1.25rem 1rem' }}>
                                        <div style={{ fontWeight: 800, color: '#1e293b' }}>{item.serviceCategory}</div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>
                                            <Calendar size={12} /> {new Date(item.maintenanceDate).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td style={{ padding: '1.25rem 1rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--primary)' }}></div>
                                            <span style={{ fontWeight: 800, color: 'var(--primary)' }}>{item.auto?.autoNumber}</span>
                                        </div>
                                        <div style={{ fontSize: '0.7rem', color: '#94a3b8', paddingLeft: '18px' }}>{item.auto?.model}</div>
                                    </td>
                                    <td style={{ padding: '1.25rem 1rem' }}>
                                        <div style={{ fontWeight: 900, color: '#0f172a', fontSize: '1.1rem' }}>₹{item.totalCost.toLocaleString('en-IN')}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{item.vendorName}</div>
                                    </td>
                                    <td style={{ padding: '1.25rem 1rem' }}>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
                                            {item.specificTasks?.map((task, i) => (
                                                <span key={i} style={{ background: '#f1f5f9', color: '#475569', padding: '3px 8px', borderRadius: '6px', fontSize: '0.65rem', fontWeight: 700 }}>{task}</span>
                                            ))}
                                        </div>
                                        <div style={{ fontSize: '0.8rem', color: '#64748b', fontStyle: 'italic' }}>{item.description || 'No notes added'}</div>
                                    </td>
                                    <td style={{ padding: '1.25rem 1rem' }}>
                                        <div style={{ 
                                            padding: '4px 10px', 
                                            borderRadius: '8px', 
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            fontSize: '0.75rem',
                                            fontWeight: 800,
                                            background: new Date(item.nextServiceDate) < new Date() ? '#fee2e2' : '#dcfce7',
                                            color: new Date(item.nextServiceDate) < new Date() ? '#ef4444' : '#15803d'
                                        }}>
                                            <Calendar size={14} /> Next: {new Date(item.nextServiceDate).toLocaleDateString()}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Record Maintenance Modal */}
            {showModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(15, 23, 42, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backdropFilter: 'blur(8px)', zIndex: 1000, padding: '1rem'
                }}>
                    <div className="card" style={{ width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', position: 'relative', padding: '2.5rem' }}>
                        <button 
                            onClick={() => setShowModal(false)}
                            style={{ position: 'absolute', right: '1.5rem', top: '1.5rem', background: '#f1f5f9', border: 'none', borderRadius: '50%', padding: '0.5rem', cursor: 'pointer' }}
                        >
                            <X size={20} color="#64748b" />
                        </button>
                        
                        <div style={{ marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 900 }}>Record Repair/Service</h2>
                            <p style={{ color: '#64748b' }}>Log a new maintenance activity for transparency</p>
                        </div>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
                                <div>
                                    <label style={{ fontSize: '0.875rem', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>Vehicle (Auto)</label>
                                    <select className="input" value={formData.autoId} onChange={e => setFormData({ ...formData, autoId: e.target.value })} required>
                                        <option value="">Select Vehicle</option>
                                        {autos.map(auto => (
                                            <option key={auto._id} value={auto._id}>{auto.autoNumber}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.875rem', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>Service Category</label>
                                    <select 
                                        className="input" 
                                        value={formData.serviceCategory} 
                                        onChange={e => setFormData({ ...formData, serviceCategory: e.target.value, specificTasks: [] })} 
                                        required
                                    >
                                        <option value="">Select Category</option>
                                        {Object.keys(SERVICE_CATEGORIES).map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            
                            {formData.serviceCategory && SERVICE_CATEGORIES[formData.serviceCategory].length > 0 && (
                               <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--border)' }}>
                                   <div style={{ fontSize: '0.75rem', fontWeight: 800, marginBottom: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tasks Performed:</div>
                                   <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
                                       {SERVICE_CATEGORIES[formData.serviceCategory].map(task => (
                                           <label key={task} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem', cursor: 'pointer', fontWeight: 600, color: '#334155' }}>
                                               <input 
                                                   type="checkbox" 
                                                   style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
                                                   checked={formData.specificTasks.includes(task)}
                                                   onChange={() => handleTaskToggle(task)}
                                               />
                                               {task}
                                           </label>
                                       ))}
                                   </div>
                               </div>
                            )}

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
                                <div>
                                    <label style={{ fontSize: '0.875rem', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>Vendor / Mechanic</label>
                                    <input className="input" placeholder="e.g. Salim Auto Works" value={formData.vendorName} onChange={e => setFormData({ ...formData, vendorName: e.target.value })} required />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.875rem', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>Total Cost (₹)</label>
                                    <input className="input" type="number" placeholder="0" value={formData.totalCost} onChange={e => setFormData({ ...formData, totalCost: e.target.value })} required />
                                </div>
                            </div>

                            <div>
                                <label style={{ fontSize: '0.875rem', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>Next Recommended Service</label>
                                <input className="input" type="date" value={formData.nextServiceDate} onChange={e => setFormData({ ...formData, nextServiceDate: e.target.value })} required />
                            </div>
                            
                            <div>
                                <label style={{ fontSize: '0.875rem', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>Work Details (Description)</label>
                                <textarea className="input" placeholder="Added 2L oil, adjusted chain..." style={{ height: '80px', resize: 'none' }} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <button type="button" className="btn btn-ghost" style={{ flex: 1, height: '3.5rem' }} onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary" style={{ flex: 1, height: '3.5rem', justifyContent: 'center', fontSize: '1rem' }}>Save Record</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Maintenance;

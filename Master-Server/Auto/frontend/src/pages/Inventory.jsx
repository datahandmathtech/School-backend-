import React, { useState, useEffect } from 'react';
import { Package, Search, Plus, Filter, Loader2, AlertTriangle, Edit, Trash2 } from 'lucide-react';
import api from '../services/api';
import Modal from '../components/Modal';

const Inventory = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    
    // Form State
    const [formData, setFormData] = useState({
        itemName: '', category: 'Battery', stockQuantity: 0, unitPrice: 0, minStockLevel: 5, description: ''
    });

    const fetchInventory = async () => {
        try {
            const res = await api.get('/api/inventory');
            setItems(res.data);
        } catch (error) {
            console.error('Error fetching inventory', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInventory();
    }, []);

    const handleAddItem = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await api.post('/api/inventory', formData);
            setIsModalOpen(false);
            setFormData({ itemName: '', category: 'Battery', stockQuantity: 0, unitPrice: 0, minStockLevel: 5, description: '' });
            fetchInventory();
        } catch (error) {
            console.error('Error adding item', error);
            alert(error.response?.data?.message || 'Error adding item');
        } finally {
            setSaving(false);
        }
    };

    // Calculate totals
    const totalItems = items.reduce((acc, curr) => acc + curr.stockQuantity, 0);
    const totalValue = items.reduce((acc, curr) => acc + (curr.stockQuantity * curr.unitPrice), 0);
    const lowStockItems = items.filter(i => i.stockQuantity <= i.minStockLevel);

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
                    <h1 style={{ fontSize: '1.75rem', color: 'var(--text-primary)' }}>Inventory MGT</h1>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Manage garage stock, auto parts, and total valuation.</p>
                </div>
                <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
                    <Plus size={18} />
                    Add Stock Item
                </button>
            </div>

            <div className="grid-cards" style={{ marginBottom: '2rem' }}>
                <div className="glass-card stat-card" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Total Parts in Stock</p>
                            <h3 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginTop: '0.5rem' }}>{totalItems}</h3>
                        </div>
                        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(0, 240, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                            <Package size={24} />
                        </div>
                    </div>
                </div>

                <div className="glass-card stat-card" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Total Stock Value</p>
                            <h3 style={{ fontSize: '2rem', color: 'var(--success)', marginTop: '0.5rem' }}>₹{totalValue.toLocaleString()}</h3>
                        </div>
                        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(0, 255, 157, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--success)' }}>
                            <span style={{ fontSize: '1.5rem', fontWeight: 600 }}>₹</span>
                        </div>
                    </div>
                </div>

                <div className="glass-card stat-card" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Low Stock Alerts</p>
                            <h3 style={{ fontSize: '2rem', color: lowStockItems.length > 0 ? 'var(--danger)' : 'var(--text-primary)', marginTop: '0.5rem' }}>{lowStockItems.length}</h3>
                        </div>
                        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: lowStockItems.length > 0 ? 'rgba(255, 51, 102, 0.1)' : 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: lowStockItems.length > 0 ? 'var(--danger)' : 'var(--text-secondary)' }}>
                            <AlertTriangle size={24} />
                        </div>
                    </div>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Stock Item">
                <form onSubmit={handleAddItem} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Item Name</label>
                            <input required type="text" className="glass-input" style={{ width: '100%' }} value={formData.itemName} onChange={e => setFormData({...formData, itemName: e.target.value})} placeholder="e.g. 12V Exide Battery" />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Category</label>
                            <select className="glass-input" style={{ width: '100%' }} value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                                <option value="Battery">Battery</option>
                                <option value="Tyres">Tyres</option>
                                <option value="Filters">Filters</option>
                                <option value="Electricals">Electricals</option>
                                <option value="Mechanical">Mechanical</option>
                                <option value="Tools">Tools</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Stock Quantity</label>
                            <input required type="number" min="0" className="glass-input" style={{ width: '100%' }} value={formData.stockQuantity} onChange={e => setFormData({...formData, stockQuantity: Number(e.target.value)})} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Unit Price (₹)</label>
                            <input required type="number" min="0" className="glass-input" style={{ width: '100%' }} value={formData.unitPrice} onChange={e => setFormData({...formData, unitPrice: Number(e.target.value)})} />
                        </div>
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Low Stock Alert Level</label>
                        <input required type="number" min="0" className="glass-input" style={{ width: '100%' }} value={formData.minStockLevel} onChange={e => setFormData({...formData, minStockLevel: Number(e.target.value)})} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Description / Notes</label>
                        <input type="text" className="glass-input" style={{ width: '100%' }} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                    </div>
                    <button disabled={saving} type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', justifyContent: 'center' }}>
                        {saving ? <Loader2 size={18} className="pulse-active" style={{ animation: 'spin 1s linear infinite' }} /> : 'Save Item to Stock'}
                    </button>
                </form>
            </Modal>

            <div className="glass-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <div style={{ position: 'relative', width: '300px' }}>
                        <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input 
                            type="text" 
                            className="glass-input" 
                            placeholder="Search inventory items..." 
                            style={{ paddingLeft: '2.5rem' }}
                        />
                    </div>
                    <button className="btn btn-glass" onClick={() => alert("Coming Soon")}>
                        <Filter size={18} />
                        Filter
                    </button>
                </div>

                <div className="table-container">
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--border-glass)', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                                <th style={{ padding: '1rem' }}>Item Name</th>
                                <th style={{ padding: '1rem' }}>Category</th>
                                <th style={{ padding: '1rem' }}>Stock Available</th>
                                <th style={{ padding: '1rem' }}>Unit Price</th>
                                <th style={{ padding: '1rem' }}>Total Value</th>
                                <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.length > 0 ? items.map(item => (
                                <tr key={item._id} className="table-row" style={{ borderBottom: '1px solid var(--border-glass)', transition: 'var(--transition)' }}>
                                    <td style={{ padding: '1rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                                        {item.itemName}
                                        {item.stockQuantity <= item.minStockLevel && (
                                            <span style={{ marginLeft: '0.5rem', color: 'var(--danger)', fontSize: '0.75rem' }} title="Low Stock">⚠️ Low</span>
                                        )}
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <span className="badge badge-active">{item.category}</span>
                                    </td>
                                    <td style={{ padding: '1rem', color: item.stockQuantity <= item.minStockLevel ? 'var(--danger)' : 'var(--text-secondary)', fontWeight: 600 }}>
                                        {item.stockQuantity} Units
                                    </td>
                                    <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>₹{item.unitPrice}</td>
                                    <td style={{ padding: '1rem', color: 'var(--success)', fontWeight: 600 }}>₹{(item.stockQuantity * item.unitPrice).toLocaleString()}</td>
                                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                            <button className="btn btn-glass" style={{ padding: '0.5rem' }} title="Edit"><Edit size={16} /></button>
                                            <button className="btn btn-glass" style={{ padding: '0.5rem', color: 'var(--danger)' }} title="Delete"><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                                        No inventory items found. Click "Add Stock Item" to get started.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Inventory;

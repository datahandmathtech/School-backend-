import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Settings, Wrench, Calendar, Loader2, Plus, PackagePlus, Trash2, Package, AlertTriangle, FileText, ChevronDown, CreditCard, MapPin, Car, Info, Search, BarChart2 } from 'lucide-react';
import api from '../services/api';
import Modal from '../components/Modal';

const VehiclesLife = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('maintenance');
    const [maintenanceLogs, setMaintenanceLogs] = useState([]);
    const [inventoryItems, setInventoryItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const [isMaintModalOpen, setIsMaintModalOpen] = useState(false);
    const [isEditMaintModalOpen, setIsEditMaintModalOpen] = useState(false);
    const [usePartsInAdd, setUsePartsInAdd] = useState(false);
    const [isBillModalOpen, setIsBillModalOpen] = useState(false);
    const [currentBillUrl, setCurrentBillUrl] = useState('');
    const [isStockModalOpen, setIsStockModalOpen] = useState(false);
    const [isEditStockModalOpen, setIsEditStockModalOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const [autos, setAutos] = useState([]);

    // Filters
    const [filterGarage, setFilterGarage] = useState('All Garages');
    const [filterCar, setFilterCar] = useState('All Cars');
    const [filterCategory, setFilterCategory] = useState('All Types');
    const [filterMonth, setFilterMonth] = useState('All Months');
    const [filterFY, setFilterFY] = useState('All FY');

    // Forms
    const [maintForm, setMaintForm] = useState({ 
        autoId: '', serviceCategory: 'Body / Interior', vendorName: '', nextServiceDate: '', maintenanceDate: new Date().toISOString().split('T')[0], description: '', kmReading: '', billNumber: '', paymentStatus: 'PAID', billPhotoBase64: ''
    });
    const [editMaintId, setEditMaintId] = useState(null);
    const [stockForm, setStockForm] = useState({ itemName: '', category: 'Battery', stockQuantity: '', unitPrice: '', minStockLevel: 5, description: '', billPhotoBase64: '', date: new Date().toISOString().split('T')[0] });
    const [editStockId, setEditStockId] = useState(null);
    
    // Inventory integration in Maintenance
    const [serviceCharge, setServiceCharge] = useState('');
    const [selectedParts, setSelectedParts] = useState([]);
    const [partToAdd, setPartToAdd] = useState('');
    const [partQty, setPartQty] = useState(1);
    const [outsidePartsCost, setOutsidePartsCost] = useState('');

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await api.get('/api/maintenance');
            setMaintenanceLogs(res.data);
            const invRes = await api.get('/api/inventory');
            setInventoryItems(invRes.data);
        } catch (error) {
            console.error(`Error fetching data`, error);
        } finally {
            setLoading(false);
        }
    };

    const fetchAutos = async () => {
        try {
            const res = await api.get('/api/autos');
            setAutos(res.data);
        } catch(e) {}
    };

    useEffect(() => {
        fetchData();
        fetchAutos();
    }, []);

    const getFYFromDate = (dateStr) => {
        if (!dateStr) return 'Unknown FY';
        const d = new Date(dateStr);
        const m = d.getMonth();
        const y = d.getFullYear();
        if (m < 3) return `FY ${y - 1}-${y}`;
        return `FY ${y}-${y + 1}`;
    };

    const getMonthFromDate = (dateStr) => {
        if (!dateStr) return 'Unknown Month';
        return new Date(dateStr).toLocaleString('default', { month: 'long' });
    };

    // Static List of All Months (Financial Year Order: April to March)
    const uniqueMonths = [
        "April", "May", "June", "July", "August", "September", 
        "October", "November", "December", "January", "February", "March"
    ];

    // Generate last 2 years, current year, and next 2 years
    const currentYear = new Date().getFullYear();
    const uniqueFYs = Array.from({length: 5}, (_, i) => {
        const y = currentYear - 2 + i;
        return `FY ${y}-${y + 1}`;
    });

    const uniqueGarages = [...new Set(maintenanceLogs.map(log => log.vendorName))];
    const uniqueCars = [...new Set(maintenanceLogs.map(log => log.auto?.autoNumber || 'Unknown'))];
    const uniqueCategories = [...new Set(maintenanceLogs.map(log => log.serviceCategory))];

    const filteredLogs = maintenanceLogs.filter(log => {
        const matchGarage = filterGarage === 'All Garages' || log.vendorName === filterGarage;
        const carStr = log.auto?.autoNumber || 'Unknown';
        const matchCar = filterCar === 'All Cars' || carStr === filterCar;
        const matchCategory = filterCategory === 'All Types' || log.serviceCategory === filterCategory;
        
        const dateToUse = log.maintenanceDate || log.createdAt;
        const matchMonth = filterMonth === 'All Months' || getMonthFromDate(dateToUse) === filterMonth;
        const matchFY = filterFY === 'All FY' || getFYFromDate(dateToUse) === filterFY;

        return matchGarage && matchCar && matchCategory && matchMonth && matchFY;
    });

    const totalSpend = filteredLogs.reduce((acc, curr) => acc + curr.totalCost, 0);

    const filteredStock = inventoryItems.filter(item => {
        const dateToUse = item.createdAt;
        const matchMonth = filterMonth === 'All Months' || getMonthFromDate(dateToUse) === filterMonth;
        const matchFY = filterFY === 'All FY' || getFYFromDate(dateToUse) === filterFY;
        return matchMonth && matchFY;
    });

    // === Maintenance Add Logic ===
    const handleAddPart = () => {
        if (!partToAdd || partQty < 1) return;
        const item = inventoryItems.find(i => i._id === partToAdd);
        if (item) {
            if (item.stockQuantity < partQty) {
                alert('Not enough stock available!');
                return;
            }
            setSelectedParts([...selectedParts, { 
                itemName: item.itemName, 
                unitPrice: item.unitPrice, 
                quantity: partQty,
                fromStock: true,
                alreadySaved: false,
                itemId: item._id
            }]);
            setPartToAdd('');
            setPartQty(1);
        }
    };

    const handleRemovePart = (index) => {
        const updated = [...selectedParts];
        updated.splice(index, 1);
        setSelectedParts(updated);
    };

    const grandTotal = Number(serviceCharge) + (Number(outsidePartsCost) || 0) + selectedParts.reduce((acc, curr) => acc + (curr.unitPrice * curr.quantity), 0);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setMaintForm({ ...maintForm, billPhotoBase64: reader.result });
            };
        }
    };

    const handleAddMaintenance = async (e) => {
        e.preventDefault();
        setSaving(true);
        let finalPartsReplaced = selectedParts.map(p => ({ name: p.itemName, cost: p.unitPrice * p.quantity }));
        if (Number(outsidePartsCost) > 0) {
            finalPartsReplaced.push({ name: 'Outside Parts', cost: Number(outsidePartsCost) });
        }

        const payload = {
            ...maintForm,
            totalCost: grandTotal,
            serviceCost: Number(serviceCharge),
            partsReplaced: finalPartsReplaced,
            inventoryItemsUsed: selectedParts.filter(p => p.fromStock).map(p => ({ itemId: p.itemId, quantity: p.quantity }))
        };

        try {
            await api.post('/api/maintenance', payload);
            setIsMaintModalOpen(false);
            setMaintForm({ 
                autoId: '', serviceCategory: 'Body / Interior', vendorName: '', nextServiceDate: '', maintenanceDate: new Date().toISOString().split('T')[0], description: '', kmReading: '', billNumber: '', paymentStatus: 'PAID', billPhotoBase64: '' 
            });
            setSelectedParts([]);
            setServiceCharge('');
            setOutsidePartsCost('');
            fetchData();
        } catch (error) {
            alert(error.response?.data?.message || 'Error adding maintenance');
        } finally {
            setSaving(false);
        }
    };

    const openEditModal = (log) => {
        setMaintForm({
            autoId: log.auto?._id || '',
            serviceCategory: log.serviceCategory,
            vendorName: log.vendorName,
            nextServiceDate: log.nextServiceDate ? log.nextServiceDate.split('T')[0] : '',
            maintenanceDate: new Date(log.maintenanceDate || Date.now()).toISOString().split('T')[0],
            description: log.description || '',
            kmReading: log.kmReading || '',
            billNumber: log.billNumber || '',
            paymentStatus: log.paymentStatus || 'PAID',
            billPhotoBase64: ''
        });
        setServiceCharge(log.serviceCost || '');
        if (log.partsReplaced) {
            setSelectedParts(log.partsReplaced.map(p => ({
                itemName: p.name,
                unitPrice: p.cost, 
                quantity: 1,
                fromStock: false, 
                alreadySaved: true,
                itemId: null 
            })));
        } else {
            setSelectedParts([]);
        }
        setOutsidePartsCost('');
        setEditMaintId(log._id);
        setIsEditMaintModalOpen(true);
    };

    const handleEditMaintenance = async (e) => {
        e.preventDefault();
        setSaving(true);
        let finalPartsReplaced = selectedParts.map(p => ({ name: p.itemName, cost: p.unitPrice * p.quantity }));
        if (Number(outsidePartsCost) > 0) {
            finalPartsReplaced.push({ name: 'Outside Parts', cost: Number(outsidePartsCost) });
        }

        const payload = {
            ...maintForm,
            serviceCost: Number(serviceCharge),
            partsReplaced: finalPartsReplaced,
            inventoryItemsUsed: selectedParts.filter(p => p.fromStock && !p.alreadySaved).map(p => ({ itemId: p.itemId, quantity: p.quantity }))
        };

        try {
            await api.put(`/api/maintenance/${editMaintId}`, payload);
            setIsEditMaintModalOpen(false);
            setMaintForm({ autoId: '', serviceCategory: 'Body / Interior', vendorName: '', nextServiceDate: '', maintenanceDate: new Date().toISOString().split('T')[0], description: '', kmReading: 0, billNumber: '', paymentStatus: 'PAID', billPhotoBase64: '' });
            setServiceCharge(0);
            setSelectedParts([]);
            setOutsidePartsCost('');
            fetchData();
        } catch (error) {
            alert(error.response?.data?.message || 'Error updating maintenance');
        } finally {
            setSaving(false);
        }
    };

    const getBadgeStyle = (category) => {
        if (category === 'Body / Interior') return { bg: '#1c1b3b', color: '#8875ff' };
        if (category === 'Battery Check') return { bg: '#3b2f1b', color: '#ffaa00' };
        if (category === 'Engine Overhaul') return { bg: '#3b1b1b', color: '#ff4d4d' };
        return { bg: '#162044', color: '#4d88ff' }; // Others
    };

    const handleDeleteMaintenance = async (id) => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            try {
                await api.delete(`/api/maintenance/${id}`);
                fetchData();
            } catch (error) {
                alert(error.response?.data?.message || 'Error deleting record');
            }
        }
    };

    const handleAddStock = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await api.post('/api/inventory', stockForm);
            setIsStockModalOpen(false);
            setStockForm({ itemName: '', category: 'Battery', stockQuantity: 0, unitPrice: 0, minStockLevel: 5, description: '', billPhotoBase64: '', date: new Date().toISOString().split('T')[0] });
            fetchData();
        } catch (error) {
            alert(error.response?.data?.message || 'Error adding stock');
        } finally {
            setSaving(false);
        }
    };

    const handleStockFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setStockForm({ ...stockForm, billPhotoBase64: reader.result });
            };
        }
    };

    const openEditStockModal = (item) => {
        setStockForm({
            itemName: item.itemName,
            category: item.category,
            stockQuantity: item.stockQuantity,
            unitPrice: item.unitPrice,
            minStockLevel: item.minStockLevel || 5,
            description: item.description || '',
            billPhotoBase64: '',
            date: item.date ? item.date.split('T')[0] : new Date().toISOString().split('T')[0]
        });
        setEditStockId(item._id);
        setIsEditStockModalOpen(true);
    };

    const handleEditStock = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await api.put(`/api/inventory/${editStockId}`, stockForm);
            setIsEditStockModalOpen(false);
            setStockForm({ itemName: '', category: 'Battery', stockQuantity: 0, unitPrice: 0, minStockLevel: 5, description: '', billPhotoBase64: '', date: new Date().toISOString().split('T')[0] });
            fetchData();
        } catch (error) {
            alert(error.response?.data?.message || 'Error updating stock');
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteStock = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await api.delete(`/api/inventory/${id}`);
                fetchData();
            } catch (error) {
                alert(error.response?.data?.message || 'Error deleting stock');
            }
        }
    };

    // Derived Stock Stats
    const totalItems = filteredStock.reduce((acc, curr) => acc + curr.stockQuantity, 0);
    const totalValue = filteredStock.reduce((acc, curr) => acc + (curr.stockQuantity * curr.unitPrice), 0);
    const lowStockItems = filteredStock.filter(i => i.stockQuantity <= i.minStockLevel);

    return (
        <div style={{ backgroundColor: '#0d111c', minHeight: '100vh', padding: '1rem', borderRadius: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.5rem', color: '#fff', margin: 0 }}>Vehicles Life</h1>
                    <p style={{ color: '#8a94a6', fontSize: '0.8rem', marginTop: '0.2rem' }}>Track maintenance and manage garage stock.</p>
                </div>
                <button className="btn btn-primary" onClick={() => activeTab === 'maintenance' ? setIsMaintModalOpen(true) : setIsStockModalOpen(true)} style={{ padding: '0.6rem 1.2rem', borderRadius: '8px' }}>
                    <Plus size={16} /> Add {activeTab === 'maintenance' ? 'Record' : 'Stock'}
                </button>
            </div>

            {/* Custom Segmented Control for Tabs and FY/Month Filters */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', background: 'rgba(255,255,255,0.02)', padding: '0.5rem', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
                    <button 
                        onClick={() => setActiveTab('maintenance')}
                        style={{ padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', border: 'none', cursor: 'pointer', borderRadius: '8px', fontWeight: 600, transition: 'all 0.3s ease', background: activeTab === 'maintenance' ? '#1c1b3b' : 'transparent', color: activeTab === 'maintenance' ? '#8875ff' : '#6e7a93' }}
                    >
                        <Wrench size={18} /> Maintenance
                    </button>
                    <button 
                        onClick={() => setActiveTab('stock')}
                        style={{ padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', border: 'none', cursor: 'pointer', borderRadius: '8px', fontWeight: 600, transition: 'all 0.3s ease', background: activeTab === 'stock' ? '#1c1b3b' : 'transparent', color: activeTab === 'stock' ? '#8875ff' : '#6e7a93' }}
                    >
                        <Package size={18} /> Garage Stock
                    </button>
                </div>

                {/* Calendar / Date Filters */}
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ position: 'relative' }}>
                        <select 
                            style={{ 
                                backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', 
                                color: '#fff', padding: '0.8rem 2.5rem 0.8rem 1rem', borderRadius: '12px', 
                                fontSize: '0.9rem', fontWeight: 600, appearance: 'none', cursor: 'pointer',
                                outline: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                            }}
                            value={filterMonth} onChange={e => setFilterMonth(e.target.value)}
                        >
                            <option value="All Months" style={{ color: '#000' }}>All Months</option>
                            {uniqueMonths.map(m => <option key={m} value={m} style={{ color: '#000' }}>{m}</option>)}
                        </select>
                        <ChevronDown size={16} color="#8a94a6" style={{ position: 'absolute', right: '0.8rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                    </div>

                    <div style={{ position: 'relative' }}>
                        <select 
                            style={{ 
                                backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', 
                                color: '#fff', padding: '0.8rem 2.5rem 0.8rem 1rem', borderRadius: '12px', 
                                fontSize: '0.9rem', fontWeight: 600, appearance: 'none', cursor: 'pointer',
                                outline: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                            }}
                            value={filterFY} onChange={e => setFilterFY(e.target.value)}
                        >
                            <option value="All FY" style={{ color: '#000' }}>All FY</option>
                            {uniqueFYs.map(f => <option key={f} value={f} style={{ color: '#000' }}>{f}</option>)}
                        </select>
                        <ChevronDown size={16} color="#8a94a6" style={{ position: 'absolute', right: '0.8rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                    </div>
                </div>
            </div>

            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', color: 'var(--accent)' }}>
                    <Loader2 className="pulse-active" size={32} style={{ animation: 'spin 1s linear infinite' }} />
                </div>
            ) : activeTab === 'maintenance' ? (
                <>
                    {/* Top Filter Bar */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
                        
                        {/* Total Spend */}
                        <div style={{ backgroundColor: '#1a1f2e', borderRadius: '12px', padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#2a2418', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <CreditCard size={20} color="#f5b841" />
                            </div>
                            <div>
                                <p style={{ color: '#8a94a6', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.5px', marginBottom: '0.2rem', textTransform: 'uppercase' }}>Total Spend (Filtered)</p>
                                <h3 style={{ color: '#fff', fontSize: '1.4rem', margin: 0 }}>₹{totalSpend.toLocaleString()}</h3>
                            </div>
                        </div>

                        {/* Garage Filter */}
                        <div style={{ backgroundColor: '#1a1f2e', borderRadius: '12px', padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', position: 'relative' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#1f1b36', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <MapPin size={20} color="#9e75ff" />
                            </div>
                            <div style={{ flex: 1 }}>
                                <p style={{ color: '#8a94a6', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.5px', marginBottom: '0.2rem', textTransform: 'uppercase' }}>Garage Filter</p>
                                <select style={{ backgroundColor: 'transparent', color: '#fff', border: 'none', fontSize: '1rem', fontWeight: 600, width: '100%', outline: 'none', appearance: 'none', cursor: 'pointer' }}
                                    value={filterGarage} onChange={e => setFilterGarage(e.target.value)}
                                >
                                    <option value="All Garages" style={{ color: '#000' }}>All Garages</option>
                                    {uniqueGarages.map(g => g && <option key={g} value={g} style={{ color: '#000' }}>{g}</option>)}
                                </select>
                                <ChevronDown size={14} color="#8a94a6" style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                            </div>
                        </div>

                        {/* Car Filter */}
                        <div style={{ backgroundColor: '#1a1f2e', borderRadius: '12px', padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', position: 'relative' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#2a2418', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Car size={20} color="#f5b841" />
                            </div>
                            <div style={{ flex: 1 }}>
                                <p style={{ color: '#8a94a6', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.5px', marginBottom: '0.2rem', textTransform: 'uppercase' }}>Car Filter</p>
                                <select style={{ backgroundColor: 'transparent', color: '#fff', border: 'none', fontSize: '1rem', fontWeight: 600, width: '100%', outline: 'none', appearance: 'none', cursor: 'pointer' }}
                                    value={filterCar} onChange={e => setFilterCar(e.target.value)}
                                >
                                    <option value="All Cars" style={{ color: '#000' }}>All Cars</option>
                                    {uniqueCars.map(c => c && <option key={c} value={c} style={{ color: '#000' }}>{c}</option>)}
                                </select>
                                <ChevronDown size={14} color="#8a94a6" style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                            </div>
                        </div>

                        {/* Category Filter */}
                        <div style={{ backgroundColor: '#1a1f2e', borderRadius: '12px', padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', position: 'relative' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#172733', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Settings size={20} color="#00d2ff" />
                            </div>
                            <div style={{ flex: 1 }}>
                                <p style={{ color: '#8a94a6', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.5px', marginBottom: '0.2rem', textTransform: 'uppercase' }}>Category Filter</p>
                                <select style={{ backgroundColor: 'transparent', color: '#fff', border: 'none', fontSize: '1rem', fontWeight: 600, width: '100%', outline: 'none', appearance: 'none', cursor: 'pointer' }}
                                    value={filterCategory} onChange={e => setFilterCategory(e.target.value)}
                                >
                                    <option value="All Types" style={{ color: '#000' }}>All Types</option>
                                    {uniqueCategories.map(c => c && <option key={c} value={c} style={{ color: '#000' }}>{c}</option>)}
                                </select>
                                <ChevronDown size={14} color="#8a94a6" style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                            </div>
                        </div>

                    </div>

                    {/* Table */}
                    <div style={{ backgroundColor: '#131824', borderRadius: '12px', overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <th style={{ padding: '1.2rem', color: '#8a94a6', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.5px' }}>DATE & VEHICLE</th>
                                    <th style={{ padding: '1.2rem', color: '#8a94a6', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.5px' }}>SERVICE DETAILS</th>
                                    <th style={{ padding: '1.2rem', color: '#8a94a6', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.5px' }}>KM READING</th>
                                    <th style={{ padding: '1.2rem', color: '#8a94a6', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.5px' }}>GARAGE / VENDOR</th>
                                    <th style={{ padding: '1.2rem', color: '#8a94a6', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.5px' }}>COST & PAY</th>
                                    <th style={{ padding: '1.2rem', color: '#8a94a6', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.5px', textAlign: 'right' }}>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredLogs.map(log => {
                                    const style = getBadgeStyle(log.serviceCategory);
                                    return (
                                    <tr key={log._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                                        <td style={{ padding: '1.2rem' }}>
                                            <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.3rem' }}>
                                                {new Date(log.maintenanceDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#f5b841', fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.2rem' }}>
                                                <Car size={14} /> {log.auto?.autoNumber || 'Unknown'}
                                            </div>
                                            <div style={{ color: '#6e7a93', fontSize: '0.8rem' }}>
                                                Driver: {log.auto?.currentDriver?.name || 'Unassigned'}
                                            </div>
                                        </td>
                                        
                                        <td style={{ padding: '1.2rem' }}>
                                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                                <span style={{ backgroundColor: style.bg, color: style.color, padding: '0.3rem 0.6rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                                                    {log.serviceCategory}
                                                </span>
                                                {log.specificTasks && log.specificTasks.map((task, i) => (
                                                    <span key={i} style={{ backgroundColor: '#1c1b3b', color: '#8875ff', padding: '0.3rem 0.6rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                                                        {task}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        
                                        <td style={{ padding: '1.2rem' }}>
                                            <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.2rem' }}>
                                                {log.kmReading ? log.kmReading.toLocaleString() : '0'}
                                            </div>
                                            <div style={{ color: '#6e7a93', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.5px' }}>
                                                KILOMETERS
                                            </div>
                                        </td>

                                        <td style={{ padding: '1.2rem' }}>
                                            <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.2rem', textTransform: 'capitalize' }}>
                                                {log.vendorName}
                                            </div>
                                            <div style={{ color: '#6e7a93', fontSize: '0.8rem' }}>
                                                Bill: {log.billNumber || 'N/A'}
                                            </div>
                                        </td>

                                        <td style={{ padding: '1.2rem' }}>
                                            <div style={{ color: '#00ff9d', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.3rem' }}>
                                                ₹{log.totalCost.toLocaleString()}
                                            </div>
                                            <span style={{ backgroundColor: log.paymentStatus === 'PAID' ? 'rgba(0, 255, 157, 0.1)' : 'rgba(255, 184, 0, 0.1)', color: log.paymentStatus === 'PAID' ? '#00ff9d' : '#ffb800', border: `1px solid ${log.paymentStatus === 'PAID' ? 'rgba(0, 255, 157, 0.3)' : 'rgba(255, 184, 0, 0.3)'}`, padding: '0.1rem 0.4rem', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.5px' }}>
                                                {log.paymentStatus || 'PAID'}
                                            </span>
                                        </td>

                                        <td style={{ padding: '1.2rem', textAlign: 'right' }}>
                                            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                                {log.billPhoto && (
                                                    <button onClick={() => { setCurrentBillUrl(log.billPhoto); setIsBillModalOpen(true); }} style={{ backgroundColor: '#2a2418', border: 'none', borderRadius: '6px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                                        <FileText size={16} color="#f5b841" />
                                                    </button>
                                                )}
                                                <button onClick={() => openEditModal(log)} style={{ backgroundColor: '#262933', border: 'none', borderRadius: '6px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                                    <Wrench size={16} color="#a0a0b0" />
                                                </button>
                                                <button onClick={() => handleDeleteMaintenance(log._id)} style={{ backgroundColor: '#3b1b1b', border: 'none', borderRadius: '6px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                                    <Trash2 size={16} color="#ff4d4d" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )})}
                                {filteredLogs.length === 0 && (
                                    <tr><td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: '#6e7a93' }}>No maintenance records found.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </>
            ) : (
                <>
                    {/* --- STOCK VIEW --- */}
                    <div className="grid-cards" style={{ marginBottom: '2rem' }}>
                        <div style={{ backgroundColor: '#1a1f2e', borderRadius: '12px', padding: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>
                                    <p style={{ color: '#8a94a6', fontSize: '0.875rem' }}>Parts in Stock</p>
                                    <h3 style={{ fontSize: '2rem', color: '#fff', marginTop: '0.5rem', margin: 0 }}>{totalItems}</h3>
                                </div>
                                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(0, 240, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00d2ff' }}><Package size={24} /></div>
                            </div>
                        </div>
                        <div style={{ backgroundColor: '#1a1f2e', borderRadius: '12px', padding: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>
                                    <p style={{ color: '#8a94a6', fontSize: '0.875rem' }}>Stock Value</p>
                                    <h3 style={{ fontSize: '2rem', color: '#00ff9d', marginTop: '0.5rem', margin: 0 }}>₹{totalValue.toLocaleString()}</h3>
                                </div>
                                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(0, 255, 157, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00ff9d' }}><span style={{ fontSize: '1.5rem', fontWeight: 600 }}>₹</span></div>
                            </div>
                        </div>
                        <div style={{ backgroundColor: '#1a1f2e', borderRadius: '12px', padding: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>
                                    <p style={{ color: '#8a94a6', fontSize: '0.875rem' }}>Low Stock Alerts</p>
                                    <h3 style={{ fontSize: '2rem', color: lowStockItems.length > 0 ? '#ff4d4d' : '#fff', marginTop: '0.5rem', margin: 0 }}>{lowStockItems.length}</h3>
                                </div>
                                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: lowStockItems.length > 0 ? 'rgba(255, 77, 77, 0.1)' : 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: lowStockItems.length > 0 ? '#ff4d4d' : '#8a94a6' }}><AlertTriangle size={24} /></div>
                            </div>
                        </div>
                    </div>
                    
                    <div style={{ backgroundColor: '#131824', borderRadius: '12px', overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <th style={{ padding: '1.2rem', color: '#8a94a6', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.5px' }}>ITEM NAME</th>
                                    <th style={{ padding: '1.2rem', color: '#8a94a6', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.5px' }}>CATEGORY</th>
                                    <th style={{ padding: '1.2rem', color: '#8a94a6', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.5px' }}>TOTAL STOCK</th>
                                    <th style={{ padding: '1.2rem', color: '#8a94a6', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.5px' }}>USED STOCK</th>
                                    <th style={{ padding: '1.2rem', color: '#8a94a6', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.5px' }}>AVAILABLE</th>
                                    <th style={{ padding: '1.2rem', color: '#8a94a6', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.5px' }}>UNIT PRICE</th>
                                    <th style={{ padding: '1.2rem', color: '#8a94a6', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.5px', textAlign: 'right' }}>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStock.map(item => (
                                    <tr key={item._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                                        <td style={{ padding: '1.2rem', color: '#fff', fontWeight: 600 }}>
                                            {item.itemName} {item.stockQuantity <= item.minStockLevel && <span style={{ color: '#ff4d4d', fontSize: '0.75rem', marginLeft: '0.5rem' }}>⚠️ Low</span>}
                                        </td>
                                        <td style={{ padding: '1.2rem' }}><span style={{ backgroundColor: '#1c1b3b', color: '#8875ff', padding: '0.3rem 0.6rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase' }}>{item.category}</span></td>
                                        <td style={{ padding: '1.2rem', color: '#fff', fontWeight: 600 }}>{item.totalPurchased || item.stockQuantity}</td>
                                        <td style={{ padding: '1.2rem', color: '#ffb800', fontWeight: 600 }}>{item.totalUsed || 0}</td>
                                        <td style={{ padding: '1.2rem', color: item.stockQuantity <= item.minStockLevel ? '#ff4d4d' : '#00ff9d', fontWeight: 700 }}>{item.stockQuantity}</td>
                                        <td style={{ padding: '1.2rem', color: '#8a94a6' }}>₹{item.unitPrice}</td>
                                        <td style={{ padding: '1.2rem', textAlign: 'right' }}>
                                            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                                <button onClick={() => navigate(`/stock-report/${item._id}`)} style={{ backgroundColor: '#1c1b3b', border: 'none', borderRadius: '6px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} title="Stock Report">
                                                    <BarChart2 size={16} color="#8875ff" />
                                                </button>
                                                {item.billPhoto && (
                                                    <button onClick={() => { setCurrentBillUrl(item.billPhoto); setIsBillModalOpen(true); }} style={{ backgroundColor: '#2a2418', border: 'none', borderRadius: '6px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} title="View Bill">
                                                        <FileText size={16} color="#f5b841" />
                                                    </button>
                                                )}
                                                <button onClick={() => openEditStockModal(item)} style={{ backgroundColor: '#262933', border: 'none', borderRadius: '6px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                                    <Wrench size={16} color="#a0a0b0" />
                                                </button>
                                                <button onClick={() => handleDeleteStock(item._id)} style={{ backgroundColor: '#3b1b1b', border: 'none', borderRadius: '6px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                                    <Trash2 size={16} color="#ff4d4d" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredStock.length === 0 && (
                                    <tr><td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: '#6e7a93' }}>No inventory found for selected filters.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </>
            )}

            {/* Maintenance Modal */}
            <Modal isOpen={isMaintModalOpen} onClose={() => setIsMaintModalOpen(false)} title="Add Maintenance Record">
                <form onSubmit={handleAddMaintenance} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '0.5rem' }}>
                    
                    {/* Basic Info Section */}
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
                        <h4 style={{ color: '#fff', fontSize: '0.9rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Info size={16} color="#8875ff" /> General Information
                        </h4>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.4rem', color: '#8a94a6', fontSize: '0.8rem', fontWeight: 600 }}>Select Vehicle</label>
                                <select required className="glass-input" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px' }} value={maintForm.autoId} onChange={e => setMaintForm({...maintForm, autoId: e.target.value})}>
                                    <option value="" style={{ color: '#000' }}>-- Choose Vehicle --</option>
                                    {autos.map(a => <option key={a._id} value={a._id} style={{ color: '#000' }}>{a.autoNumber}</option>)}
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.4rem', color: '#8a94a6', fontSize: '0.8rem', fontWeight: 600 }}>Date of Bill</label>
                                <DatePicker required selected={maintForm.maintenanceDate ? new Date(maintForm.maintenanceDate) : null} onChange={date => setMaintForm({...maintForm, maintenanceDate: date ? date.toISOString().split('T')[0] : ''})} dateFormat="dd/MM/yyyy" className="glass-input" placeholderText="dd/mm/yyyy" wrapperClassName="w-full" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.4rem', color: '#8a94a6', fontSize: '0.8rem', fontWeight: 600 }}>Service Category</label>
                                <select className="glass-input" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px' }} value={maintForm.serviceCategory} onChange={e => setMaintForm({...maintForm, serviceCategory: e.target.value})}>
                                    <option value="Body / Interior" style={{ color: '#000' }}>Body / Interior</option>
                                    <option value="Battery Check" style={{ color: '#000' }}>Battery Check</option>
                                    <option value="Engine Overhaul" style={{ color: '#000' }}>Engine Overhaul</option>
                                    <option value="Tire Replacement" style={{ color: '#000' }}>Tire Replacement</option>
                                    <option value="Others" style={{ color: '#000' }}>Others</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.4rem', color: '#8a94a6', fontSize: '0.8rem', fontWeight: 600 }}>KM Reading</label>
                                <input required type="number" placeholder="e.g. 50000" className="glass-input" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px' }} value={maintForm.kmReading} onChange={e => setMaintForm({...maintForm, kmReading: Number(e.target.value)})} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.4rem', color: '#8a94a6', fontSize: '0.8rem', fontWeight: 600 }}>Vendor / Garage Name</label>
                                <input required type="text" placeholder="Garage name" className="glass-input" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px' }} value={maintForm.vendorName} onChange={e => setMaintForm({...maintForm, vendorName: e.target.value})} />
                            </div>
                        </div>
                    </div>

                    {/* Billing Section */}
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
                        <h4 style={{ color: '#fff', fontSize: '0.9rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <FileText size={16} color="#f5b841" /> Billing & Payment
                        </h4>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.4rem', color: '#8a94a6', fontSize: '0.8rem', fontWeight: 600 }}>Bill Number (Optional)</label>
                                <input type="text" placeholder="Enter Bill No." className="glass-input" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px' }} value={maintForm.billNumber} onChange={e => setMaintForm({...maintForm, billNumber: e.target.value})} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.4rem', color: '#8a94a6', fontSize: '0.8rem', fontWeight: 600 }}>Upload Bill Photo</label>
                                <input type="file" accept="image/*" className="glass-input" style={{ width: '100%', padding: '0.65rem', borderRadius: '8px' }} onChange={handleFileChange} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.4rem', color: '#8a94a6', fontSize: '0.8rem', fontWeight: 600 }}>Payment Status</label>
                                <select className="glass-input" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px' }} value={maintForm.paymentStatus} onChange={e => setMaintForm({...maintForm, paymentStatus: e.target.value})}>
                                    <option value="PAID" style={{ color: '#000' }}>PAID</option>
                                    <option value="PENDING" style={{ color: '#000' }}>PENDING</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.4rem', color: '#8a94a6', fontSize: '0.8rem', fontWeight: 600 }}>Next Service Date</label>
                                <DatePicker selected={maintForm.nextServiceDate ? new Date(maintForm.nextServiceDate) : null} onChange={date => setMaintForm({...maintForm, nextServiceDate: date ? date.toISOString().split('T')[0] : ''})} dateFormat="dd/MM/yyyy" className="glass-input" placeholderText="dd/mm/yyyy" wrapperClassName="w-full" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px' }} />
                            </div>
                        </div>
                    </div>

                    {/* Parts & Cost Section */}
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h4 style={{ color: '#fff', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                                <PackagePlus size={16} color="#00ff9d" /> Parts Replaced (Optional)
                            </h4>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: '#8a94a6', fontSize: '0.8rem', background: 'rgba(255,255,255,0.05)', padding: '0.4rem 0.8rem', borderRadius: '8px' }}>
                                <input type="checkbox" checked={usePartsInAdd} onChange={e => { setUsePartsInAdd(e.target.checked); }} style={{ accentColor: '#00ff9d', width: '16px', height: '16px', cursor: 'pointer' }} />
                                Select from Garage Stock?
                            </label>
                        </div>
                        
                        {usePartsInAdd ? (
                            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                                <select className="glass-input" style={{ flex: 2, padding: '0.8rem', borderRadius: '8px' }} value={partToAdd} onChange={e => setPartToAdd(e.target.value)}>
                                    <option value="" style={{ color: '#000' }}>-- Select Item from Stock --</option>
                                    {inventoryItems.map(item => (
                                        <option key={item._id} value={item._id} disabled={item.stockQuantity === 0} style={{ color: '#000' }}>
                                            {item.itemName} (Stock: {item.stockQuantity} | ₹{item.unitPrice})
                                        </option>
                                    ))}
                                </select>
                                <input type="number" min="1" className="glass-input" style={{ flex: 0.5, padding: '0.8rem', borderRadius: '8px' }} value={partQty} onChange={e => setPartQty(Number(e.target.value))} placeholder="Qty"/>
                                <button type="button" className="btn btn-glass" style={{ borderRadius: '8px', padding: '0 1rem' }} onClick={handleAddPart}>Add</button>
                            </div>
                        ) : (
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.4rem', color: '#8a94a6', fontSize: '0.8rem', fontWeight: 600 }}>Outside Parts Cost (₹)</label>
                                <input type="number" min="0" placeholder="0" className="glass-input" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px' }} value={outsidePartsCost} onChange={e => setOutsidePartsCost(e.target.value)} />
                                <p style={{ fontSize: '0.75rem', color: '#8a94a6', marginTop: '0.4rem' }}>Enter total cost of any parts purchased from outside. (No stock will be deducted)</p>
                            </div>
                        )}

                        {selectedParts.length > 0 && (
                            <div style={{ background: '#131824', borderRadius: '8px', padding: '0.5rem', marginBottom: '1rem' }}>
                                {selectedParts.map((part, index) => (
                                    <div key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', borderBottom: index !== selectedParts.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                                        <span style={{ color: '#8a94a6', fontSize: '0.85rem' }}>
                                            {part.itemName} {part.fromStock ? `(x${part.quantity})` : ''}
                                            {part.fromStock && <span style={{ fontSize: '0.65rem', color: '#00ff9d', marginLeft: '0.5rem', border: '1px solid rgba(0,255,157,0.3)', padding: '2px 4px', borderRadius: '4px', background: 'rgba(0,255,157,0.1)' }}>Stock Item</span>}
                                        </span>
                                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                            <span style={{ color: '#fff', fontWeight: 600, fontSize: '0.85rem' }}>₹{part.unitPrice * part.quantity}</span>
                                            <Trash2 size={16} color="#ff4d4d" style={{ cursor: 'pointer', opacity: 0.8 }} onClick={() => handleRemovePart(index)} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '1rem' }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: '0.4rem', color: '#8a94a6', fontSize: '0.8rem', fontWeight: 600 }}>Service / Labour Charge (₹)</label>
                                <input required type="number" min="0" placeholder="0" className="glass-input" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px' }} value={serviceCharge} onChange={e => setServiceCharge(e.target.value)} />
                            </div>
                            <div style={{ flex: 1, padding: '1rem', background: 'rgba(0, 255, 157, 0.05)', borderRadius: '8px', border: '1px solid rgba(0, 255, 157, 0.2)', textAlign: 'right' }}>
                                <p style={{ fontSize: '0.7rem', color: '#00ff9d', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Grand Total</p>
                                <h3 style={{ fontSize: '1.6rem', color: '#00ff9d', margin: '0.2rem 0 0 0' }}>₹{grandTotal.toLocaleString()}</h3>
                            </div>
                        </div>
                    </div>
                    
                    <button disabled={saving} type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', borderRadius: '12px', fontSize: '1rem', fontWeight: 600, display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                        {saving ? <Loader2 size={20} className="pulse-active" style={{ animation: 'spin 1s linear infinite' }} /> : 'Save Record & Deduct Stock'}
                    </button>
                </form>
            </Modal>

            {/* Edit Maintenance Modal */}
            <Modal isOpen={isEditMaintModalOpen} onClose={() => setIsEditMaintModalOpen(false)} title="Edit Maintenance Record">
                <form onSubmit={handleEditMaintenance} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '0.5rem' }}>
                    
                    {/* Basic Info Section */}
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
                        <h4 style={{ color: '#fff', fontSize: '0.9rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Info size={16} color="#8875ff" /> General Information
                        </h4>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.4rem', color: '#8a94a6', fontSize: '0.8rem', fontWeight: 600 }}>Date of Bill</label>
                                <DatePicker required selected={maintForm.maintenanceDate ? new Date(maintForm.maintenanceDate) : null} onChange={date => setMaintForm({...maintForm, maintenanceDate: date ? date.toISOString().split('T')[0] : ''})} dateFormat="dd/MM/yyyy" className="glass-input" placeholderText="dd/mm/yyyy" wrapperClassName="w-full" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.4rem', color: '#8a94a6', fontSize: '0.8rem', fontWeight: 600 }}>KM Reading</label>
                                <input required type="number" className="glass-input" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px' }} value={maintForm.kmReading} onChange={e => setMaintForm({...maintForm, kmReading: Number(e.target.value)})} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.4rem', color: '#8a94a6', fontSize: '0.8rem', fontWeight: 600 }}>Vendor / Garage Name</label>
                                <input required type="text" className="glass-input" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px' }} value={maintForm.vendorName} onChange={e => setMaintForm({...maintForm, vendorName: e.target.value})} />
                            </div>
                        </div>
                    </div>

                    {/* Billing Section */}
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
                        <h4 style={{ color: '#fff', fontSize: '0.9rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <FileText size={16} color="#f5b841" /> Billing & Payment
                        </h4>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.4rem', color: '#8a94a6', fontSize: '0.8rem', fontWeight: 600 }}>Bill Number</label>
                                <input type="text" className="glass-input" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px' }} value={maintForm.billNumber} onChange={e => setMaintForm({...maintForm, billNumber: e.target.value})} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.4rem', color: '#8a94a6', fontSize: '0.8rem', fontWeight: 600 }}>Update Bill Photo (Optional)</label>
                                <input type="file" accept="image/*" className="glass-input" style={{ width: '100%', padding: '0.65rem', borderRadius: '8px' }} onChange={handleFileChange} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.4rem', color: '#8a94a6', fontSize: '0.8rem', fontWeight: 600 }}>Payment Status</label>
                                <select className="glass-input" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px' }} value={maintForm.paymentStatus} onChange={e => setMaintForm({...maintForm, paymentStatus: e.target.value})}>
                                    <option value="PAID" style={{ color: '#000' }}>PAID</option>
                                    <option value="PENDING" style={{ color: '#000' }}>PENDING</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.4rem', color: '#8a94a6', fontSize: '0.8rem', fontWeight: 600 }}>Next Service Date</label>
                                <DatePicker selected={maintForm.nextServiceDate ? new Date(maintForm.nextServiceDate) : null} onChange={date => setMaintForm({...maintForm, nextServiceDate: date ? date.toISOString().split('T')[0] : ''})} dateFormat="dd/MM/yyyy" className="glass-input" placeholderText="dd/mm/yyyy" wrapperClassName="w-full" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px' }} />
                            </div>
                        </div>
                    </div>

                    {/* Cost & Parts Section */}
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
                        <h4 style={{ color: '#fff', fontSize: '0.9rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <PackagePlus size={16} color="#00ff9d" /> Parts & Service Cost
                        </h4>
                        
                        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                            <select className="glass-input" style={{ flex: 2, padding: '0.8rem', borderRadius: '8px' }} value={partToAdd} onChange={e => setPartToAdd(e.target.value)}>
                                <option value="" style={{ color: '#000' }}>-- Select new item from Stock --</option>
                                {inventoryItems.map(item => (
                                    <option key={item._id} value={item._id} disabled={item.stockQuantity === 0} style={{ color: '#000' }}>
                                        {item.itemName} (Stock: {item.stockQuantity} | ₹{item.unitPrice})
                                    </option>
                                ))}
                            </select>
                            <input type="number" min="1" className="glass-input" style={{ flex: 0.5, padding: '0.8rem', borderRadius: '8px' }} value={partQty} onChange={e => setPartQty(Number(e.target.value))} placeholder="Qty"/>
                            <button type="button" className="btn btn-glass" style={{ borderRadius: '8px', padding: '0 1rem' }} onClick={handleAddPart}>Add</button>
                        </div>

                        {selectedParts.length > 0 && (
                            <div style={{ background: '#131824', borderRadius: '8px', padding: '0.5rem', marginBottom: '1rem' }}>
                                {selectedParts.map((part, index) => (
                                    <div key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', borderBottom: index !== selectedParts.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                                        <span style={{ color: '#8a94a6', fontSize: '0.85rem' }}>
                                            {part.itemName} {part.fromStock ? `(x${part.quantity})` : ''}
                                            {part.fromStock && <span style={{ fontSize: '0.65rem', color: '#00ff9d', marginLeft: '0.5rem', border: '1px solid rgba(0,255,157,0.3)', padding: '2px 4px', borderRadius: '4px', background: 'rgba(0,255,157,0.1)' }}>Stock Item</span>}
                                            {part.alreadySaved && <span style={{ fontSize: '0.65rem', color: '#ffb800', marginLeft: '0.5rem', border: '1px solid rgba(255,184,0,0.3)', padding: '2px 4px', borderRadius: '4px' }}>Existing</span>}
                                        </span>
                                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                            <span style={{ color: '#fff', fontWeight: 600, fontSize: '0.85rem' }}>₹{part.unitPrice * part.quantity}</span>
                                            <Trash2 size={16} color="#ff4d4d" style={{ cursor: 'pointer', opacity: 0.8 }} onClick={() => handleRemovePart(index)} title="Remove Part" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '1rem' }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: '0.4rem', color: '#8a94a6', fontSize: '0.8rem', fontWeight: 600 }}>Service / Labour Charge (₹)</label>
                                <input required type="number" min="0" placeholder="0" className="glass-input" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px' }} value={serviceCharge} onChange={e => setServiceCharge(e.target.value)} />
                            </div>
                            <div style={{ flex: 1, padding: '1rem', background: 'rgba(0, 255, 157, 0.05)', borderRadius: '8px', border: '1px solid rgba(0, 255, 157, 0.2)', textAlign: 'right' }}>
                                <p style={{ fontSize: '0.7rem', color: '#00ff9d', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Grand Total</p>
                                <h3 style={{ fontSize: '1.6rem', color: '#00ff9d', margin: '0.2rem 0 0 0' }}>₹{grandTotal.toLocaleString()}</h3>
                            </div>
                        </div>
                    </div>
                    
                    <button disabled={saving} type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', borderRadius: '12px', fontSize: '1rem', fontWeight: 600, display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                        {saving ? <Loader2 size={20} className="pulse-active" style={{ animation: 'spin 1s linear infinite' }} /> : 'Update Record'}
                    </button>
                </form>
            </Modal>

            {/* View Bill Modal */}
            <Modal isOpen={isBillModalOpen} onClose={() => setIsBillModalOpen(false)} title="Bill Document">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem' }}>
                    {currentBillUrl ? (
                        <img src={currentBillUrl} alt="Bill" style={{ maxWidth: '100%', maxHeight: '70vh', borderRadius: '8px', objectFit: 'contain' }} />
                    ) : (
                        <p style={{ color: 'var(--text-muted)' }}>No bill uploaded</p>
                    )}
                </div>
            </Modal>

            {/* Stock Modal */}
            <Modal isOpen={isStockModalOpen} onClose={() => setIsStockModalOpen(false)} title="Add Stock Item">
                <form onSubmit={handleAddStock} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '0.5rem' }}>
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
                        <h4 style={{ color: '#fff', fontSize: '0.9rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Package size={16} color="#00d2ff" /> Item Details
                        </h4>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.4rem', color: '#8a94a6', fontSize: '0.8rem', fontWeight: 600 }}>Item Name / Description</label>
                                <input required list="inventory-names" type="text" placeholder="e.g. Exide Battery 12V" className="glass-input" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px' }} value={stockForm.itemName} onChange={e => {
                                    const val = e.target.value;
                                    const existing = inventoryItems.find(i => i.itemName.toLowerCase() === val.toLowerCase());
                                    if(existing) {
                                        setStockForm({...stockForm, itemName: existing.itemName, category: existing.category, unitPrice: existing.unitPrice});
                                    } else {
                                        setStockForm({...stockForm, itemName: val});
                                    }
                                }} />
                                <datalist id="inventory-names">
                                    {Array.from(new Set(inventoryItems.map(i => i.itemName))).map(name => (
                                        <option key={name} value={name} />
                                    ))}
                                </datalist>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.4rem', color: '#8a94a6', fontSize: '0.8rem', fontWeight: 600 }}>Date of Bill</label>
                                <DatePicker required selected={stockForm.date ? new Date(stockForm.date) : null} onChange={date => setStockForm({...stockForm, date: date ? date.toISOString().split('T')[0] : ''})} dateFormat="dd/MM/yyyy" className="glass-input" placeholderText="dd/mm/yyyy" wrapperClassName="w-full" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.4rem', color: '#8a94a6', fontSize: '0.8rem', fontWeight: 600 }}>Category</label>
                                <select className="glass-input" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px' }} value={stockForm.category} onChange={e => setStockForm({...stockForm, category: e.target.value})}>
                                    <option value="Battery" style={{ color: '#000' }}>Battery</option>
                                    <option value="Tyres" style={{ color: '#000' }}>Tyres</option>
                                    <option value="Filters" style={{ color: '#000' }}>Filters</option>
                                    <option value="Other" style={{ color: '#000' }}>Other</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.4rem', color: '#8a94a6', fontSize: '0.8rem', fontWeight: 600 }}>Stock Quantity</label>
                                <input required type="number" className="glass-input" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px' }} value={stockForm.stockQuantity} onChange={e => setStockForm({...stockForm, stockQuantity: Number(e.target.value)})} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.4rem', color: '#8a94a6', fontSize: '0.8rem', fontWeight: 600 }}>Unit Price (₹)</label>
                                <input required type="number" className="glass-input" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px' }} value={stockForm.unitPrice} onChange={e => setStockForm({...stockForm, unitPrice: Number(e.target.value)})} />
                            </div>
                        </div>
                    </div>

                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
                        <h4 style={{ color: '#fff', fontSize: '0.9rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <FileText size={16} color="#f5b841" /> Documentation
                        </h4>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.4rem', color: '#8a94a6', fontSize: '0.8rem', fontWeight: 600 }}>Upload Purchase Receipt (Optional)</label>
                            <input type="file" accept="image/*" className="glass-input" style={{ width: '100%', padding: '0.65rem', borderRadius: '8px' }} onChange={handleStockFileChange} />
                        </div>
                    </div>

                    <button disabled={saving} type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', borderRadius: '12px', fontSize: '1rem', fontWeight: 600, display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                        {saving ? <Loader2 size={20} className="pulse-active" style={{ animation: 'spin 1s linear infinite' }} /> : 'Save Stock'}
                    </button>
                </form>
            </Modal>

            {/* Edit Stock Modal */}
            <Modal isOpen={isEditStockModalOpen} onClose={() => setIsEditStockModalOpen(false)} title="Edit Stock Item">
                <form onSubmit={handleEditStock} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '0.5rem' }}>
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
                        <h4 style={{ color: '#fff', fontSize: '0.9rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Package size={16} color="#00d2ff" /> Item Details
                        </h4>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.4rem', color: '#8a94a6', fontSize: '0.8rem', fontWeight: 600 }}>Item Name</label>
                                <input required type="text" className="glass-input" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px' }} value={stockForm.itemName} onChange={e => setStockForm({...stockForm, itemName: e.target.value})} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.4rem', color: '#8a94a6', fontSize: '0.8rem', fontWeight: 600 }}>Date of Bill</label>
                                <DatePicker required selected={stockForm.date ? new Date(stockForm.date) : null} onChange={date => setStockForm({...stockForm, date: date ? date.toISOString().split('T')[0] : ''})} dateFormat="dd/MM/yyyy" className="glass-input" placeholderText="dd/mm/yyyy" wrapperClassName="w-full" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.4rem', color: '#8a94a6', fontSize: '0.8rem', fontWeight: 600 }}>Category</label>
                                <select className="glass-input" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px' }} value={stockForm.category} onChange={e => setStockForm({...stockForm, category: e.target.value})}>
                                    <option value="Battery" style={{ color: '#000' }}>Battery</option>
                                    <option value="Tyres" style={{ color: '#000' }}>Tyres</option>
                                    <option value="Filters" style={{ color: '#000' }}>Filters</option>
                                    <option value="Other" style={{ color: '#000' }}>Other</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.4rem', color: '#8a94a6', fontSize: '0.8rem', fontWeight: 600 }}>Stock Quantity</label>
                                <input required type="number" className="glass-input" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px' }} value={stockForm.stockQuantity} onChange={e => setStockForm({...stockForm, stockQuantity: Number(e.target.value)})} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.4rem', color: '#8a94a6', fontSize: '0.8rem', fontWeight: 600 }}>Unit Price (₹)</label>
                                <input required type="number" className="glass-input" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px' }} value={stockForm.unitPrice} onChange={e => setStockForm({...stockForm, unitPrice: Number(e.target.value)})} />
                            </div>
                        </div>
                    </div>

                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
                        <h4 style={{ color: '#fff', fontSize: '0.9rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <FileText size={16} color="#f5b841" /> Documentation
                        </h4>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.4rem', color: '#8a94a6', fontSize: '0.8rem', fontWeight: 600 }}>Update Purchase Receipt (Optional)</label>
                            <input type="file" accept="image/*" className="glass-input" style={{ width: '100%', padding: '0.65rem', borderRadius: '8px' }} onChange={handleStockFileChange} />
                        </div>
                    </div>

                    <button disabled={saving} type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', borderRadius: '12px', fontSize: '1rem', fontWeight: 600, display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                        {saving ? <Loader2 size={20} className="pulse-active" style={{ animation: 'spin 1s linear infinite' }} /> : 'Update Stock'}
                    </button>
                </form>
            </Modal>

        </div>
    );
};

export default VehiclesLife;

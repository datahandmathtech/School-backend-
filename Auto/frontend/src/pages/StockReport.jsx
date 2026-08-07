import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Loader2, ArrowLeft, PackagePlus, Wrench, Package, FileText, Plus, Trash2, Car, ChevronDown } from 'lucide-react';

const StockReport = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [loading, setLoading] = useState(true);
    const [reportData, setReportData] = useState(null);
    
    const [filterMonth, setFilterMonth] = useState('All Months');
    const [filterFY, setFilterFY] = useState('All FY');

    const [processedTransactions, setProcessedTransactions] = useState([]);

    useEffect(() => {
        const fetchReport = async () => {
            setLoading(true);
            try {
                const itemsRes = await api.get('/api/inventory');
                const item = itemsRes.data.find(i => i._id === id);
                
                if (item) {
                    const txRes = await api.get(`/api/inventory/${id}/transactions`);
                    
                    // Process transactions to calculate Running Balance
                    // Sort chronological first (oldest to newest)
                    const sortedTx = [...txRes.data].sort((a, b) => new Date(a.date) - new Date(b.date));
                    
                    let runningBalance = 0;
                    const withBalance = sortedTx.map(tx => {
                        if (tx.type === 'ADD') runningBalance += tx.quantity;
                        else runningBalance -= tx.quantity;
                        return { ...tx, balance: runningBalance };
                    });

                    // Reverse to show newest at top
                    withBalance.reverse();

                    setReportData({ item, transactions: txRes.data });
                    setProcessedTransactions(withBalance);
                }
            } catch (error) {
                console.error("Error fetching report:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchReport();
    }, [id]);

    const getMonthFromDate = (dateStr) => {
        if (!dateStr) return 'Unknown Month';
        return new Date(dateStr).toLocaleString('default', { month: 'long' });
    };

    const getFYFromDate = (dateStr) => {
        if (!dateStr) return 'Unknown FY';
        const d = new Date(dateStr);
        const m = d.getMonth();
        const y = d.getFullYear();
        if (m < 3) return `FY ${y - 1}-${y}`;
        return `FY ${y}-${y + 1}`;
    };

    const uniqueMonths = [
        "April", "May", "June", "July", "August", "September", 
        "October", "November", "December", "January", "February", "March"
    ];

    const currentYear = new Date().getFullYear();
    const uniqueFYs = Array.from({length: 5}, (_, i) => {
        const y = currentYear - 2 + i;
        return `FY ${y}-${y + 1}`;
    });

    if (loading) {
        return (
            <div style={{ padding: '3rem', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
                <Loader2 className="pulse-active" size={48} style={{ animation: 'spin 1s linear infinite', color: '#8875ff', marginBottom: '1rem' }} />
                <h3>Loading Ledger...</h3>
            </div>
        );
    }

    if (!reportData?.item) {
        return (
            <div style={{ padding: '3rem', color: '#fff', textAlign: 'center' }}>
                <h3>Item not found.</h3>
                <button className="btn btn-primary" onClick={() => navigate('/vehicles-life')} style={{ marginTop: '1rem' }}>Go Back</button>
            </div>
        );
    }

    return (
        <div className="animate-fade-in" style={{ padding: '1rem', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <button 
                    onClick={() => navigate('/vehicles-life')}
                    className="btn btn-glass" 
                    style={{ padding: '0.6rem', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ArrowLeft size={20} color="#8875ff" />
                </button>
                <div>
                    <h1 style={{ margin: 0, fontSize: '2rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        Stock Ledger: <span style={{ color: '#00ff9d' }}>{reportData.item.itemName}</span>
                    </h1>
                    <p style={{ margin: '0.2rem 0 0 0', color: '#8a94a6', fontSize: '0.9rem' }}>Detailed transaction history and stock balance</p>
                </div>
            </div>

            {/* Top Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ background: 'linear-gradient(145deg, #161b28 0%, #0d111c 100%)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(136, 117, 255, 0.2)', boxShadow: '0 8px 32px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ background: 'rgba(136, 117, 255, 0.1)', padding: '1rem', borderRadius: '12px' }}>
                        <PackagePlus size={32} color="#8875ff" />
                    </div>
                    <div>
                        <p style={{ margin: 0, color: '#8a94a6', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Purchased</p>
                        <h2 style={{ margin: '0.2rem 0 0 0', color: '#fff', fontSize: '2.5rem' }}>{reportData.item.totalPurchased || reportData.item.stockQuantity}</h2>
                    </div>
                </div>

                <div style={{ background: 'linear-gradient(145deg, #161b28 0%, #0d111c 100%)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255, 184, 0, 0.2)', boxShadow: '0 8px 32px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ background: 'rgba(255, 184, 0, 0.1)', padding: '1rem', borderRadius: '12px' }}>
                        <Wrench size={32} color="#ffb800" />
                    </div>
                    <div>
                        <p style={{ margin: 0, color: '#8a94a6', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Used in Maint.</p>
                        <h2 style={{ margin: '0.2rem 0 0 0', color: '#ffb800', fontSize: '2.5rem' }}>{reportData.item.totalUsed || 0}</h2>
                    </div>
                </div>

                <div style={{ background: 'linear-gradient(145deg, #161b28 0%, #0d111c 100%)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(0, 255, 157, 0.3)', boxShadow: '0 8px 32px rgba(0,255,157,0.1)', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ background: 'rgba(0, 255, 157, 0.1)', padding: '1rem', borderRadius: '12px' }}>
                        <Package size={32} color="#00ff9d" />
                    </div>
                    <div>
                        <p style={{ margin: 0, color: '#00ff9d', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Current Stock</p>
                        <h2 style={{ margin: '0.2rem 0 0 0', color: '#00ff9d', fontSize: '2.5rem', textShadow: '0 0 15px rgba(0,255,157,0.3)' }}>{reportData.item.stockQuantity}</h2>
                    </div>
                </div>
            </div>

            {/* Transaction Ledger Section */}
            <div className="glass-card" style={{ padding: '0', overflow: 'hidden', border: '1px solid var(--border-glass)' }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <h3 style={{ margin: 0, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.2rem' }}>
                            <FileText size={20} color="#8875ff" /> Item Ledger Account
                        </h3>
                        <p style={{ margin: '0.2rem 0 0 0', color: '#8a94a6', fontSize: '0.85rem' }}>Detailed chronological statement of inward and outward stock.</p>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div style={{ position: 'relative' }}>
                            <select 
                                className="glass-input" 
                                style={{ padding: '0.6rem 2.5rem 0.6rem 1rem', borderRadius: '8px', fontSize: '0.9rem', appearance: 'none', minWidth: '150px' }}
                                value={filterMonth} 
                                onChange={e => setFilterMonth(e.target.value)}
                            >
                                <option value="All Months" style={{ color: '#000' }}>All Months</option>
                                {uniqueMonths.map(m => <option key={m} value={m} style={{ color: '#000' }}>{m}</option>)}
                            </select>
                            <ChevronDown size={16} color="#8a94a6" style={{ position: 'absolute', right: '0.8rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                        </div>
                        <div style={{ position: 'relative' }}>
                            <select 
                                className="glass-input" 
                                style={{ padding: '0.6rem 2.5rem 0.6rem 1rem', borderRadius: '8px', fontSize: '0.9rem', appearance: 'none', minWidth: '150px' }}
                                value={filterFY} 
                                onChange={e => setFilterFY(e.target.value)}
                            >
                                <option value="All FY" style={{ color: '#000' }}>All FY</option>
                                {uniqueFYs.map(fy => <option key={fy} value={fy} style={{ color: '#000' }}>{fy}</option>)}
                            </select>
                            <ChevronDown size={16} color="#8a94a6" style={{ position: 'absolute', right: '0.8rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                        </div>
                    </div>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
                        <thead>
                            <tr style={{ background: '#131824', borderBottom: '2px solid rgba(136, 117, 255, 0.3)' }}>
                                <th style={{ padding: '1rem', color: '#8a94a6', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px', width: '15%' }}>DATE</th>
                                <th style={{ padding: '1rem', color: '#8a94a6', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px', width: '40%' }}>PARTICULARS (REFERENCE)</th>
                                <th style={{ padding: '1rem', color: '#00ff9d', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px', textAlign: 'center', width: '15%' }}>INWARD (+QTY)</th>
                                <th style={{ padding: '1rem', color: '#ffb800', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px', textAlign: 'center', width: '15%' }}>OUTWARD (-QTY)</th>
                                <th style={{ padding: '1rem', color: '#fff', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px', textAlign: 'right', width: '15%' }}>CLOSING BAL.</th>
                            </tr>
                        </thead>
                        <tbody>
                            {processedTransactions.filter(tx => {
                                const mName = getMonthFromDate(tx.date);
                                const fy = getFYFromDate(tx.date);
                                if (filterMonth !== 'All Months' && mName !== filterMonth) return false;
                                if (filterFY !== 'All FY' && fy !== filterFY) return false;
                                return true;
                            }).map((tx, index) => (
                                <tr key={tx._id} style={{ 
                                    borderBottom: '1px solid rgba(255,255,255,0.05)', 
                                    background: index % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)',
                                    transition: 'background 0.2s', 
                                    ':hover': { background: 'rgba(255,255,255,0.03)' } 
                                }}>
                                    <td style={{ padding: '1.2rem 1rem', color: '#a0a0b0', fontSize: '0.85rem' }}>
                                        {new Date(tx.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                        <div style={{ fontSize: '0.7rem', color: '#565f74', marginTop: '0.2rem' }}>
                                            {new Date(tx.date).toLocaleTimeString('en-US', { hour: '2-digit', minute:'2-digit' })}
                                        </div>
                                    </td>
                                    
                                    <td style={{ padding: '1.2rem 1rem' }}>
                                        <div style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 500, marginBottom: '0.4rem' }}>
                                            {tx.reference}
                                        </div>
                                        {tx.maintenanceId && tx.maintenanceId.auto && (
                                            <div style={{ 
                                                fontSize: '0.75rem', color: '#8875ff', 
                                                display: 'inline-flex', alignItems: 'center', gap: '0.4rem', 
                                                background: 'rgba(136, 117, 255, 0.1)', border: '1px solid rgba(136, 117, 255, 0.2)',
                                                padding: '0.2rem 0.6rem', borderRadius: '4px' 
                                            }}>
                                                <Car size={12} /> Vehicle: <span style={{ fontWeight: 600 }}>{tx.maintenanceId.auto.autoNumber}</span>
                                            </div>
                                        )}
                                        {tx.type === 'ADD' && (
                                            <div style={{ fontSize: '0.75rem', color: '#00ff9d', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', padding: '0.2rem 0', marginTop: '0.2rem' }}>
                                                <Plus size={12} /> Direct Restock
                                            </div>
                                        )}
                                    </td>

                                    <td style={{ padding: '1.2rem 1rem', textAlign: 'center', borderLeft: '1px dashed rgba(255,255,255,0.05)' }}>
                                        {tx.type === 'ADD' ? (
                                            <span style={{ color: '#00ff9d', fontWeight: 700, fontSize: '1.1rem', background: 'rgba(0,255,157,0.1)', padding: '0.3rem 0.8rem', borderRadius: '6px' }}>
                                                {tx.quantity}
                                            </span>
                                        ) : <span style={{ color: '#3f4657' }}>-</span>}
                                    </td>

                                    <td style={{ padding: '1.2rem 1rem', textAlign: 'center', borderLeft: '1px dashed rgba(255,255,255,0.05)' }}>
                                        {tx.type === 'USE' ? (
                                            <span style={{ color: '#ffb800', fontWeight: 700, fontSize: '1.1rem', background: 'rgba(255,184,0,0.1)', padding: '0.3rem 0.8rem', borderRadius: '6px' }}>
                                                {tx.quantity}
                                            </span>
                                        ) : <span style={{ color: '#3f4657' }}>-</span>}
                                    </td>

                                    <td style={{ padding: '1.2rem 1rem', textAlign: 'right', borderLeft: '1px dashed rgba(255,255,255,0.05)' }}>
                                        <span style={{ color: '#fff', fontWeight: 800, fontSize: '1.2rem' }}>
                                            {tx.balance}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            
                            {(!processedTransactions || processedTransactions.filter(tx => {
                                const mName = getMonthFromDate(tx.date);
                                const fy = getFYFromDate(tx.date);
                                if (filterMonth !== 'All Months' && mName !== filterMonth) return false;
                                if (filterFY !== 'All FY' && fy !== filterFY) return false;
                                return true;
                            }).length === 0) && (
                                <tr>
                                    <td colSpan="5" style={{ padding: '6rem 2rem', textAlign: 'center' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                                            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <FileText size={32} color="#454c5c" />
                                            </div>
                                            <div>
                                                <h4 style={{ color: '#fff', margin: '0 0 0.5rem 0', fontSize: '1.2rem' }}>No Ledger Entries Found</h4>
                                                <p style={{ color: '#6e7a93', fontSize: '0.95rem', margin: 0, maxWidth: '400px', lineHeight: '1.5' }}>
                                                    There are no stock movements recorded for this item in the selected period.
                                                </p>
                                            </div>
                                        </div>
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

export default StockReport;

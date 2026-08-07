import React, { useState, useEffect } from 'react';
import { FileText, Search, Eye, Edit, Trash2, Calendar as CalendarIcon, DownloadCloud, Clock } from 'lucide-react';
import api from '../services/api';

export default function LogBook() {
    const today = new Date();
    const [globalMonth, setGlobalMonth] = useState(today.getMonth() + 1);
    const [globalYear, setGlobalYear] = useState(today.getFullYear());
    const [globalDay, setGlobalDay] = useState(today.getDate());
    const [searchQuery, setSearchQuery] = useState('');
    
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Duty Evidence Report Modal State
    const [isEvidenceModalOpen, setEvidenceModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [editForm, setEditForm] = useState({ _id: '', dutyType: '', dutyDate: '', punchInTime: '', punchOutTime: '', startKM: '', endKM: '', wage: '' });
    const [selectedTrip, setSelectedTrip] = useState(null);

    const fetchTrips = async () => {
        try {
            setLoading(true);
            const res = await api.get('/api/trips');
            // Fetch all drivers to map driverType properly since trip.driver only has User info
            const driversRes = await api.get('/api/drivers');
            
            const driverTypeMap = {};
            driversRes.data.forEach(d => {
                if (d.user && d.user._id) {
                    driverTypeMap[d.user._id] = d.driverType || 'STAFF';
                }
            });

            // Map driverType into trip
            const enrichedTrips = res.data.map(t => ({
                ...t,
                computedDriverType: (t.driver && driverTypeMap[t.driver._id]) ? driverTypeMap[t.driver._id] : 'STAFF'
            }));

            setTrips(enrichedTrips);
        } catch (error) {
            console.error('Error fetching logbook trips:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTrips();
    }, []);

    const filteredTrips = trips.filter(t => {
        const d = new Date(t.startTime || t.createdAt);
        
        // Month / Year filter
        if (d.getMonth() + 1 !== globalMonth) return false;
        if (d.getFullYear() !== globalYear) return false;
        
        // Specific Day filter if set
        if (globalDay !== null && d.getDate() !== globalDay) return false;
        
        // Search Filter
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            const driverName = t.driver?.name?.toLowerCase() || '';
            const vehicle = t.auto?.autoNumber?.toLowerCase() || '';
            if (!driverName.includes(q) && !vehicle.includes(q)) return false;
        }

        return true;
    });

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this trip log?')) {
            try {
                await api.delete(`/api/trips/${id}`);
                fetchTrips();
            } catch (err) {
                alert('Error deleting trip');
            }
        }
    };

    const handleDownloadExcel = () => {
        // Convert to CSV
        const headers = ["DATE", "TYPE", "DRIVER & VEHICLE", "PUNCH IN", "PUNCH OUT", "OPEN KM", "CLOSE KM", "TOTAL KM"];
        const rows = filteredTrips.map(trip => {
            const dateStr = new Date(trip.startTime).toLocaleDateString('en-GB');
            const typeStr = trip.computedDriverType;
            const driverStr = `${trip.driver?.name || 'Unknown'} - ${trip.auto?.autoNumber || 'Unknown'}`;
            const punchIn = new Date(trip.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const punchOut = trip.endTime ? new Date(trip.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Active';
            const openKm = trip.startKM || 0;
            const closeKm = trip.endKM || 0;
            const totalKm = trip.totalKM || 0;
            
            return `"${dateStr}","${typeStr}","${driverStr}","${punchIn}","${punchOut}","${openKm}","${closeKm}","${totalKm}"`;
        });
        
        const csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n" + rows.join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `LogBook_${globalMonth}_${globalYear}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const openEvidenceModal = (trip) => {
        setSelectedTrip(trip);
        setEvidenceModalOpen(true);
    };

    const getParkingExpense = (trip) => {
        if (!trip || !trip.expenses) return { amount: 0, paidBy: 'Self' };
        const parking = trip.expenses.find(e => e.category === 'Parking/Toll');
        return parking ? { amount: parking.amount || 0, paidBy: parking.paidBy || 'Self' } : { amount: 0, paidBy: 'Self' };
    };

    const openEditModal = (trip) => {
        setSelectedTrip(trip);
        const formatDatetimeLocal = (d) => {
            if (!d) return '';
            const dt = new Date(d);
            return new Date(dt.getTime() - dt.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
        };
        const formatDate = (d) => {
            if (!d) return '';
            const dt = new Date(d);
            return new Date(dt.getTime() - dt.getTimezoneOffset() * 60000).toISOString().split('T')[0];
        };
        
        setEditForm({
            _id: trip._id,
            dutyType: trip.dutyType || 'City Local (Base Only)',
            dutyDate: formatDate(trip.startTime),
            punchInTime: formatDatetimeLocal(trip.startTime),
            punchOutTime: formatDatetimeLocal(trip.endTime),
            startKM: trip.startKM || '',
            endKM: trip.endKM || '',
            wage: trip.wage || ''
        });
        setEditModalOpen(true);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            // Reconstruct dates if needed, though input type="datetime-local" sends strings backend can parse
            // But we actually only send what they typed
            const payload = {
                dutyType: editForm.dutyType,
                startKM: editForm.startKM,
                endKM: editForm.endKM,
                wage: editForm.wage,
                startTime: editForm.punchInTime,
                endTime: editForm.punchOutTime
            };
            await api.put(`/api/trips/${editForm._id}`, payload);
            setEditModalOpen(false);
            fetchTrips();
        } catch (err) {
            alert('Error updating trip');
        }
    };

    // UI Styles mapped from screenshots
    const styles = {
        container: { padding: '2rem', color: '#fff', minHeight: '100vh' },
        headerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' },
        titleBox: { display: 'flex', alignItems: 'center', gap: '1rem' },
        iconWrapper: { background: 'rgba(245, 158, 11, 0.1)', padding: '0.75rem', borderRadius: '12px', border: '1px solid rgba(245, 158, 11, 0.2)' },
        filtersRow: { display: 'flex', alignItems: 'center', gap: '1rem' },
        glassInput: { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '0.5rem 1rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem', outline: 'none' },
        downloadBtn: { background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '0.5rem 1rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 'bold' },
        tabsRow: { display: 'flex', gap: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '1.5rem' },
        tabBtn: (active) => ({
            background: 'none', border: 'none', color: active ? '#a855f7' : '#9ca3af',
            padding: '0.5rem 0', fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer',
            borderBottom: active ? '2px solid #a855f7' : '2px solid transparent', display: 'flex', alignItems: 'center', gap: '0.5rem'
        }),
        card: { background: 'rgba(17, 24, 39, 0.7)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '1.5rem' },
        table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left' },
        th: { color: '#00f0ff', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' },
        td: { padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.9rem', verticalAlign: 'middle' },
        badge: { background: 'rgba(168, 85, 247, 0.1)', color: '#a855f7', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold', border: '1px solid rgba(168, 85, 247, 0.2)' },
        punchText: { color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem' },
        punchOutText: { color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem' },
        kmText: { color: '#3b82f6', fontWeight: 'bold' },
        kmOutText: { color: '#ef4444', fontWeight: 'bold' },
        actionIconBtn: { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#3b82f6', cursor: 'pointer', padding: '0.4rem', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
        actionIconBtnEdit: { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#00f0ff', cursor: 'pointer', padding: '0.4rem', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
        actionIconBtnRed: { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#ef4444', cursor: 'pointer', padding: '0.4rem', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
        
        // Modal Styles
        modalOverlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
        modalContent: { background: '#0f172a', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', width: '90%', maxWidth: '900px', position: 'relative' },
        closeBtn: { position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', borderRadius: '8px', padding: '0.5rem', cursor: 'pointer' },
        proofGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginTop: '2rem' },
        proofBoxGreen: { background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '12px', padding: '1.5rem' },
        proofBoxRed: { background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '12px', padding: '1.5rem' },
        proofBoxPurple: { background: 'rgba(168, 85, 247, 0.05)', border: '1px solid rgba(168, 85, 247, 0.2)', borderRadius: '12px', padding: '1.5rem' },
        // Edit Modal Styles
        editModalContent: { background: '#0f172a', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', width: '90%', maxWidth: '600px', position: 'relative' },
        inputGroup: { marginBottom: '1.5rem', flex: 1 },
        label: { display: 'block', color: '#9ca3af', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '0.5rem' },
        flexRow: { display: 'flex', gap: '1.5rem' }
    };

    const renderDutyEvidenceModal = () => {
        if (!selectedTrip) return null;
        const dutyPayable = selectedTrip.wage || 0;

        return (
            <div style={styles.modalOverlay}>
                <div style={styles.modalContent}>
                    <button style={styles.closeBtn} onClick={() => setEvidenceModalOpen(false)}>✕</button>
                    <h2 style={{ margin: 0, fontSize: '1.5rem' }}>Duty Evidence Report</h2>
                    <div style={{ color: '#9ca3af', fontSize: '0.85rem', marginTop: '0.25rem', textTransform: 'uppercase' }}>
                        {selectedTrip.driver?.name} • {selectedTrip.auto?.autoNumber} • {new Date(selectedTrip.startTime).toLocaleDateString('en-GB')}
                    </div>

                    <div style={styles.proofGrid}>
                        {/* Punch In Box */}
                        <div style={styles.proofBoxGreen}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                                <span>↗ PUNCH-IN PROOF</span>
                                <span>{new Date(selectedTrip.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                            <div style={styles.row}>
                                <span style={{color: '#9ca3af'}}>Opening KM</span>
                                <span style={{color: '#3b82f6', fontWeight: 'bold'}}>{selectedTrip.startKM} km</span>
                            </div>
                            <div style={styles.row}>
                                <span style={{color: '#9ca3af'}}>Date</span>
                                <span style={{color: '#fff', fontWeight: 'bold'}}>{new Date(selectedTrip.startTime).toLocaleDateString('en-GB')}</span>
                            </div>
                            <div style={{...styles.row, borderBottom: 'none'}}>
                                <span style={{color: '#9ca3af'}}>Vehicle</span>
                                <span style={{color: '#fff', fontWeight: 'bold'}}>{selectedTrip.auto?.autoNumber}</span>
                            </div>
                        </div>

                        {/* Punch Out Box */}
                        <div style={styles.proofBoxRed}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ef4444', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                                <span>↙ PUNCH-OUT PROOF</span>
                                <span>{selectedTrip.endTime ? new Date(selectedTrip.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Active'}</span>
                            </div>
                            <div style={styles.row}>
                                <span style={{color: '#9ca3af'}}>Closing KM</span>
                                <span style={{color: '#ef4444', fontWeight: 'bold'}}>{selectedTrip.endKM || '-'} km</span>
                            </div>
                            <div style={{...styles.row, borderBottom: 'none'}}>
                                <span style={{color: '#9ca3af'}}>Shift Run</span>
                                <div style={{textAlign: 'right'}}>
                                    <div style={{color: '#fff', fontWeight: 'bold'}}>{selectedTrip.totalKM || '-'} km</div>
                                    <div style={{color: '#6b7280', fontSize: '0.7rem'}}>{selectedTrip.startKM} → {selectedTrip.endKM || '?'}</div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Parking & Settlement */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>


                            <div style={{...styles.proofBoxGreen, background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.3)'}}>
                                <div style={{ color: '#10b981', fontWeight: 'bold', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    ₹ SETTLEMENT
                                </div>
                                <div style={styles.row}>
                                    <span style={{color: '#9ca3af'}}>Daily Wage</span>
                                    <span style={{color: '#fff', fontWeight: 'bold'}}>₹{selectedTrip.wage || 0}</span>
                                </div>

                                <div style={{...styles.row, borderBottom: 'none', paddingTop: '1rem', marginTop: '0.5rem'}}>
                                    <span style={{color: '#10b981', fontWeight: 'bold', fontSize: '1.1rem'}}>DUTY PAYABLE</span>
                                    <span style={{color: '#10b981', fontWeight: 'bold', fontSize: '1.2rem'}}>₹{dutyPayable}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderEditModal = () => {
        if (!selectedTrip) return null;
        
        return (
            <div style={styles.modalOverlay}>
                <div style={styles.editModalContent}>
                    <button style={styles.closeBtn} onClick={() => setEditModalOpen(false)}>✕</button>
                    <h2 style={{ margin: 0, fontSize: '1.5rem', marginBottom: '1.5rem', color: '#fff' }}>Edit Log Entry</h2>
                    
                    <div style={{...styles.proofBoxPurple, background: 'rgba(255,255,255,0.03)', padding: '1rem', marginBottom: '2rem'}}>
                        <div style={{...styles.label, marginBottom: '0.2rem'}}>DRIVER / SERVICE PROVIDER</div>
                        <div style={{color: '#00f0ff', fontWeight: 'bold', fontSize: '1.1rem'}}>{selectedTrip.driver?.name}</div>
                        <div style={{color: '#3b82f6', fontSize: '0.85rem'}}>{selectedTrip.auto?.autoNumber}</div>
                    </div>

                    <form onSubmit={handleEditSubmit}>
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Duty Type (Selection)</label>
                            <select 
                                style={{...styles.glassInput, width: '100%', padding: '0.75rem'}}
                                value={editForm.dutyType}
                                onChange={e => setEditForm({...editForm, dutyType: e.target.value})}
                            >
                                <option value="City Local (Base Only)" style={{color: '#000'}}>City Local (Base Only)</option>
                                <option value="Outstation" style={{color: '#000'}}>Outstation</option>
                                <option value="Fixed Rental" style={{color: '#000'}}>Fixed Rental</option>
                            </select>
                            <div style={{fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem', fontStyle: 'italic'}}>Changing this will auto-adjust the T/A amount.</div>
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Duty Date</label>
                            <input 
                                type="date" 
                                style={{...styles.glassInput, width: '100%', padding: '0.75rem'}}
                                value={editForm.dutyDate}
                                onChange={e => setEditForm({...editForm, dutyDate: e.target.value})}
                            />
                        </div>

                        <div style={styles.flexRow}>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}><Clock size={12}/> Punch In</label>
                                <input 
                                    type="datetime-local" 
                                    style={{...styles.glassInput, width: '100%', padding: '0.75rem'}}
                                    value={editForm.punchInTime}
                                    onChange={e => setEditForm({...editForm, punchInTime: e.target.value})}
                                    required
                                />
                            </div>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}><Clock size={12}/> Punch Out</label>
                                <input 
                                    type="datetime-local" 
                                    style={{...styles.glassInput, width: '100%', padding: '0.75rem'}}
                                    value={editForm.punchOutTime}
                                    onChange={e => setEditForm({...editForm, punchOutTime: e.target.value})}
                                />
                            </div>
                        </div>

                        <div style={styles.flexRow}>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>Start KM</label>
                                <input 
                                    type="number" 
                                    style={{...styles.glassInput, width: '100%', padding: '0.75rem'}}
                                    value={editForm.startKM}
                                    onChange={e => setEditForm({...editForm, startKM: e.target.value})}
                                />
                            </div>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>End KM</label>
                                <input 
                                    type="number" 
                                    style={{...styles.glassInput, width: '100%', padding: '0.75rem'}}
                                    value={editForm.endKM}
                                    onChange={e => setEditForm({...editForm, endKM: e.target.value})}
                                />
                            </div>
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Daily Wage (Base Pay)</label>
                            <input 
                                type="number" 
                                style={{...styles.glassInput, width: '100%', padding: '0.75rem'}}
                                value={editForm.wage}
                                onChange={e => setEditForm({...editForm, wage: e.target.value})}
                            />
                        </div>

                        <button type="submit" style={{...styles.downloadBtn, background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', border: '1px solid rgba(59, 130, 246, 0.3)', width: '100%', justifyContent: 'center', marginTop: '1rem', padding: '1rem'}}>
                            Update Log Entry
                        </button>
                    </form>
                </div>
            </div>
        );
    };

    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.headerRow}>
                <div style={styles.titleBox}>
                    <div style={styles.iconWrapper}>
                        <FileText size={24} color="#00f0ff" />
                    </div>
                    <div>
                        <div style={{ color: '#9ca3af', fontSize: '0.8rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Operational Insights</div>
                        <h1 style={{ margin: 0, fontSize: '2rem' }}>Overall Log Book</h1>
                    </div>
                </div>

                <div style={styles.filtersRow}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <div style={styles.glassInput}>
                            <input 
                                type="date" 
                                style={{ background: 'transparent', border: 'none', color: '#fff', outline: 'none', colorScheme: 'dark' }}
                                value={globalDay ? `${globalYear}-${String(globalMonth).padStart(2, '0')}-${String(globalDay).padStart(2, '0')}` : ''}
                                onChange={(e) => {
                                    if (e.target.value) {
                                        const d = new Date(e.target.value);
                                        setGlobalYear(d.getFullYear());
                                        setGlobalMonth(d.getMonth() + 1);
                                        setGlobalDay(d.getDate());
                                    } else {
                                        setGlobalDay(null);
                                    }
                                }}
                            />
                        </div>
                        {globalDay && (
                            <button 
                                onClick={() => setGlobalDay(null)}
                                style={{
                                    background: 'rgba(239, 68, 68, 0.15)',
                                    border: '1px solid rgba(239, 68, 68, 0.3)',
                                    color: '#ef4444',
                                    padding: '0.6rem 1rem',
                                    borderRadius: '12px',
                                    cursor: 'pointer',
                                    fontSize: '0.85rem',
                                    fontWeight: 'bold',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                Full Month
                            </button>
                        )}
                    </div>
                    <div style={{...styles.glassInput, width: '200px'}}>
                        <Search size={16} color="#9ca3af" />
                        <input 
                            placeholder="Search Logs..." 
                            style={{ background: 'transparent', border: 'none', color: '#fff', outline: 'none', width: '100%' }}
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <select 
                        style={styles.glassInput}
                        value={`${globalMonth}-${globalYear}`}
                        onChange={(e) => {
                            const [m, y] = e.target.value.split('-');
                            setGlobalMonth(Number(m));
                            setGlobalYear(Number(y));
                            setGlobalDay(null);
                        }}
                    >
                        {Array.from({length: 12}).map((_, i) => (
                            <option key={i} value={`${i+1}-2026`} style={{color:'#000'}}>{new Date(0, i).toLocaleString('default', {month: 'short'})} 2026</option>
                        ))}
                    </select>
                    <button style={styles.downloadBtn} onClick={handleDownloadExcel}>
                        <DownloadCloud size={16} /> DOWNLOAD EXCEL
                    </button>
                </div>
            </div>

            {/* Content Box */}
            <div style={styles.card}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', color: '#fff', fontWeight: 'bold' }}>
                    <FileText size={18} color="#00f0ff" /> Overall Log Book 
                    <span style={{color: '#6b7280', fontSize: '0.8rem', fontWeight: 'normal'}}>• {filteredTrips.length} records</span>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>Date</th>
                                <th style={styles.th}>Type</th>
                                <th style={styles.th}>Driver & Vehicle</th>
                                <th style={styles.th}>Punch In</th>
                                <th style={styles.th}>Punch Out</th>
                                <th style={styles.th}>Open KM</th>
                                <th style={styles.th}>Close KM</th>
                                <th style={styles.th}>Total KM</th>
                                <th style={styles.th}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTrips.map(trip => (
                                <tr key={trip._id}>
                                    <td style={styles.td}>{new Date(trip.startTime).toLocaleDateString('en-GB')}</td>
                                    <td style={styles.td}>
                                        <span style={styles.badge}>{trip.computedDriverType}</span>
                                    </td>
                                    <td style={styles.td}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.5rem', borderRadius: '50%' }}>
                                                <UsersIcon size={14} color="#10b981" />
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 'bold' }}>{trip.driver?.name || 'Unknown'}</div>
                                                <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{trip.auto?.autoNumber || 'No Vehicle'}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={styles.td}>
                                        <div style={styles.punchText}>↗ {new Date(trip.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                    </td>
                                    <td style={styles.td}>
                                        <div style={styles.punchOutText}>↙ {trip.endTime ? new Date(trip.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '---'}</div>
                                    </td>
                                    <td style={styles.td}>
                                        <div style={styles.kmText}>{trip.startKM}</div>
                                        <div style={{fontSize: '0.65rem', color: '#6b7280', marginTop: '0.2rem'}}>OPEN KM</div>
                                    </td>
                                    <td style={styles.td}>
                                        <div style={styles.kmOutText}>{trip.endKM || '-'}</div>
                                        <div style={{fontSize: '0.65rem', color: '#6b7280', marginTop: '0.2rem'}}>CLOSE KM</div>
                                    </td>
                                    <td style={styles.td}>
                                        <div style={{fontWeight: 'bold', color: '#fff'}}>{trip.totalKM || '-'}</div>
                                        <div style={{fontSize: '0.65rem', color: '#6b7280', marginTop: '0.2rem'}}>KM RUN</div>
                                    </td>
                                    <td style={styles.td}>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button style={styles.actionIconBtn} title="View Evidence Report" onClick={() => openEvidenceModal(trip)}>
                                                <Eye size={14} />
                                            </button>
                                            <button style={styles.actionIconBtnEdit} title="Edit Trip" onClick={() => openEditModal(trip)}>
                                                <Edit size={14} />
                                            </button>
                                            <button style={styles.actionIconBtnRed} title="Delete Trip" onClick={() => handleDelete(trip._id)}>
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredTrips.length === 0 && !loading && (
                                <tr>
                                    <td colSpan="9" style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
                                        No logbook entries found for this selection.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modals */}
            {isEvidenceModalOpen && renderDutyEvidenceModal()}
            {isEditModalOpen && renderEditModal()}
        </div>
    );
}

// Simple Icon component inline since we forgot to import Users in the main list
function UsersIcon({ size, color, style }) {
    return <svg style={style} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
}

function MapPinIcon({ size, color, style }) {
    return <svg style={style} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>;
}

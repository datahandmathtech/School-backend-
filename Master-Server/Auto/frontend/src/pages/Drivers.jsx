import React, { useState, useEffect } from 'react';
import { Search, MapPin, Edit, Trash2, ChevronLeft, ChevronRight, RefreshCw, Download, ArrowLeft, Eye, Users, Calendar } from 'lucide-react';
import api from '../services/api';
import Modal from '../components/Modal';

// ----- CSS Styles (matching the screenshots) -----
const styles = {
    pageContainer: { backgroundColor: '#12141d', minHeight: '100vh', color: '#fff', padding: '2rem', fontFamily: "'Inter', sans-serif" },
    headerBox: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' },
    titleSmall: { fontSize: '0.7rem', color: '#00f0ff', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' },
    titleBig: { fontSize: '2rem', fontWeight: 900, color: '#fff', margin: 0 },
    searchBar: { background: '#1b1e2b', border: '1px solid #2d3142', borderRadius: '20px', padding: '0.6rem 1rem', width: '300px', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' },
    searchInput: { background: 'transparent', border: 'none', color: '#fff', outline: 'none', width: '100%' },
    onboardBtn: { background: '#00f0ff', color: '#000', border: 'none', borderRadius: '12px', padding: '0.8rem 1.5rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' },
    
    tabsContainer: { background: '#1b1e2b', borderRadius: '16px', padding: '0.5rem', display: 'inline-flex', gap: '0.5rem', marginBottom: '2rem' },
    tabBtn: (active) => ({ background: active ? '#2d3142' : 'transparent', color: active ? '#00f0ff' : '#6b7280', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: '0.2s' }),
    
    tableContainer: { background: '#1b1e2b', borderRadius: '16px', border: '1px solid #2d3142', overflow: 'hidden' },
    th: { padding: '1.2rem 1.5rem', fontSize: '0.75rem', fontWeight: 'bold', color: '#6b7280', textTransform: 'uppercase', textAlign: 'left', borderBottom: '1px solid #2d3142' },
    td: { padding: '1rem 1.5rem', borderBottom: '1px solid #2d3142', verticalAlign: 'middle' },
    
    avatar: { width: '40px', height: '40px', borderRadius: '50%', background: '#252a41', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#818cf8', fontWeight: 'bold' },
    greenDot: { width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' },
    dutyBadge: { background: '#252a41', color: '#818cf8', padding: '0.4rem 1rem', borderRadius: '20px', fontWeight: 'bold', fontSize: '0.9rem' },
    
    actionBtnPurple: { background: '#252a41', color: '#818cf8', border: 'none', padding: '0.5rem 1rem', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.8rem' },
    actionIconBtn: { width: '32px', height: '32px', borderRadius: '50%', background: '#252a41', color: '#6b7280', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
    actionIconBtnRed: { width: '32px', height: '32px', borderRadius: '50%', background: '#4c1d24', color: '#ef4444', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
    
    statCard: { background: '#1b1e2b', border: '1px solid #2d3142', borderRadius: '16px', padding: '1.5rem', flex: 1 },
    statCardTitle: { fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '0.5rem' },
    statCardValue: { fontSize: '1.8rem', fontWeight: 900, color: '#fff', margin: 0 },
    
    plateYellow: { background: 'transparent', border: '1px solid #00f0ff', color: '#00f0ff', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold', display: 'inline-block' },
    
    glassInput: { background: '#12141d', border: '1px solid #2d3142', borderRadius: '8px', padding: '0.8rem', color: '#fff', width: '100%', outline: 'none' }
};

const DriversHub = () => {
    const [activeTab, setActiveTab] = useState('DRIVERS');
    const [globalMonth, setGlobalMonth] = useState(new Date().getMonth() + 1);
    const [globalYear, setGlobalYear] = useState(new Date().getFullYear());
    const [globalDay, setGlobalDay] = useState(new Date().getDate());
    
    // Data State
    const [drivers, setDrivers] = useState([]);
    const [autos, setAutos] = useState([]);
    const [trips, setTrips] = useState([]);
    const [salariesData, setSalariesData] = useState({}); // mapped by driverId
    const [loading, setLoading] = useState(true);

    // Detail View State
    const [selectedDriverReport, setSelectedDriverReport] = useState(null); // stores driver obj

    // Modal States
    const [modals, setModals] = useState({
        driver: false, punchIn: false, punchOut: false, payment: false,
        editDriver: false, editTrip: false, editPayment: false
    });

    // Form States
    const [driverForm, setDriverForm] = useState({ name: '', phone: '', address: '', nightStayBonus: '', driverType: 'STAFF' });
    const [punchInForm, setPunchInForm] = useState({ driverId: '', autoId: '', startKM: '', pickupLocation: '', wage: '', startTime: '' });
    const [punchOutForm, setPunchOutForm] = useState({ tripId: '', endKM: '', dropLocation: '', earnings: '', batteryUsed: '', otherBonuses: '', endTime: '' });
    const [paymentForm, setPaymentForm] = useState({ driverId: '', date: '', amount: '', remarks: '' });

    const [editDriverForm, setEditDriverForm] = useState({ _id: '', name: '', phone: '', address: '', nightStayBonus: '', driverType: 'STAFF' });
    const [editTripForm, setEditTripForm] = useState({ _id: '', startKM: '', endKM: '', pickupLocation: '', dropLocation: '', otherBonuses: '' });
    const [editPaymentForm, setEditPaymentForm] = useState({ _id: '', date: '', amount: '', remarks: '' });

    const openModal = (name) => setModals({ ...modals, [name]: true });
    const closeModal = (name) => setModals({ ...modals, [name]: false });

    const fetchData = async () => {
        setLoading(true);
        try {
            const driversRes = await api.get('/api/drivers');
            setDrivers(driversRes.data);

            const autoRes = await api.get('/api/autos');
            setAutos(autoRes.data);

            const tripsRes = await api.get('/api/trips');
            setTrips(tripsRes.data);

            // Fetch Settlements for the active month/year for all drivers
            let sData = {};
            for (let d of driversRes.data) {
                try {
                    const res = await api.get(`/api/settlements/calculate/${d.user._id}?month=${globalMonth}&year=${globalYear}`);
                    sData[d.user._id] = res.data;
                } catch (e) {
                    console.error("Error fetching settlement for", d.user.name);
                }
            }
            setSalariesData(sData);
            
        } catch (error) {
            console.error('Error fetching data', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [globalMonth, globalYear]);

    // ----------- Handlers -----------
    const handleAddDriver = async (e) => {
        e.preventDefault();
        try {
            const randomSuffix = Math.floor(Math.random() * 1000);
            const userRes = await api.post('/api/auth/register', {
                name: driverForm.name, email: `driver_${Date.now()}_${randomSuffix}@auto.com`, password: `pass123`, role: 'driver'
            });
            await api.post('/api/drivers', {
                userId: userRes.data._id, phone: driverForm.phone, address: driverForm.address, nightStayBonus: driverForm.nightStayBonus, driverType: driverForm.driverType
            });
            closeModal('driver');
            setDriverForm({ name: '', phone: '', address: '', nightStayBonus: '', driverType: 'STAFF' });
            fetchData();
        } catch (err) { alert('Error adding driver'); }
    };

    const handlePunchIn = async (e) => {
        e.preventDefault();
        try {
            await api.post('/api/trips/start', punchInForm);
            closeModal('punchIn');
            setPunchInForm({ driverId: '', autoId: '', startKM: '', pickupLocation: '', wage: '', startTime: '' });
            fetchData();
        } catch (err) { alert('Error starting duty'); }
    };

    const handlePunchOut = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/api/trips/${punchOutForm.tripId}/end`, punchOutForm);
            
            closeModal('punchOut');
            setPunchOutForm({ tripId: '', endKM: '', dropLocation: '', earnings: '', batteryUsed: '', otherBonuses: '', endTime: '' });
            fetchData();
        } catch (err) { alert('Error ending duty'); }
    };

    const handleRecordPayment = async (e) => {
        e.preventDefault();
        try {
            await api.post('/api/settlements/advances', paymentForm);
            closeModal('payment');
            setPaymentForm({ driverId: '', date: '', amount: '', remarks: '' });
            fetchData();
        } catch (err) { alert('Error recording payment'); }
    };

    const handleDeleteTrip = async (tripId) => {
        if (!window.confirm("Delete this duty?")) return;
        try {
            await api.delete(`/api/trips/${tripId}`);
            fetchData();
        } catch (err) { alert('Error deleting duty'); }
    };

    const handleDeletePayment = async (advId) => {
        if (!window.confirm("Delete this payment?")) return;
        try {
            await api.delete(`/api/settlements/advances/${advId}`);
            fetchData();
        } catch (err) { alert('Error deleting payment'); }
    };

    const handleDeleteDriver = async (driverId) => {
        if (!window.confirm("Delete this Driver? This cannot be undone.")) return;
        try {
            await api.delete(`/api/drivers/${driverId}`);
            if (selectedDriverReport && selectedDriverReport._id === driverId) setSelectedDriverReport(null);
            fetchData();
        } catch (err) { alert('Error deleting driver'); }
    };

    const handleUpdateDriver = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/api/drivers/${editDriverForm._id}`, editDriverForm);
            closeModal('editDriver');
            fetchData();
            // If viewing report for this driver, might need to re-fetch or clear
            if (selectedDriverReport && selectedDriverReport._id === editDriverForm._id) {
                const res = await api.get('/api/drivers');
                const updated = res.data.find(d => d._id === editDriverForm._id);
                if(updated) setSelectedDriverReport(updated);
            }
        } catch (err) { alert('Error updating driver'); }
    };

    const handleUpdateTrip = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/api/trips/${editTripForm._id}`, editTripForm);
            closeModal('editTrip');
            fetchData();
        } catch (err) { alert('Error updating duty'); }
    };

    const handleUpdatePayment = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/api/settlements/advances/${editPaymentForm._id}`, editPaymentForm);
            closeModal('editPayment');
            fetchData();
        } catch (err) { alert('Error updating payment'); }
    };

    const handlePrevDate = () => {
        if (globalDay === null) {
            if (globalMonth === 1) { setGlobalMonth(12); setGlobalYear(y => y - 1); }
            else { setGlobalMonth(m => m - 1); }
        } else {
            const d = new Date(globalYear, globalMonth - 1, globalDay);
            d.setDate(d.getDate() - 1);
            setGlobalDay(d.getDate());
            setGlobalMonth(d.getMonth() + 1);
            setGlobalYear(d.getFullYear());
        }
    };

    const handleNextDate = () => {
        if (globalDay === null) {
            if (globalMonth === 12) { setGlobalMonth(1); setGlobalYear(y => y + 1); }
            else { setGlobalMonth(m => m + 1); }
        } else {
            const d = new Date(globalYear, globalMonth - 1, globalDay);
            d.setDate(d.getDate() + 1);
            setGlobalDay(d.getDate());
            setGlobalMonth(d.getMonth() + 1);
            setGlobalYear(d.getFullYear());
        }
    };

    // ----------- Render Helpers -----------
    const renderMonthYearSelectors = () => (
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', background: '#12141d', border: '1px solid #2d3142', borderRadius: '24px', overflow: 'hidden' }}>
                <button onClick={handlePrevDate} style={{ background: 'transparent', border: 'none', color: '#6b7280', padding: '0.5rem 1rem', cursor: 'pointer' }}><ChevronLeft size={16} /></button>
                <div style={{ padding: '0 1rem', color: '#fff', fontWeight: 'bold', fontSize: '0.9rem', minWidth: '100px', textAlign: 'center', position: 'relative' }}>
                    {globalDay !== null 
                        ? `${String(globalDay).padStart(2, '0')}/${String(globalMonth).padStart(2, '0')}/${globalYear}` 
                        : new Date(globalYear, globalMonth - 1).toLocaleString('default', { month: 'short', year: 'numeric' })
                    }
                    <input 
                        type="date" 
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                        value={globalDay ? `${globalYear}-${String(globalMonth).padStart(2, '0')}-${String(globalDay).padStart(2, '0')}` : `${globalYear}-${String(globalMonth).padStart(2, '0')}-01`}
                        onChange={(e) => {
                            if(e.target.value) {
                                const [y, m, d] = e.target.value.split('-');
                                setGlobalYear(parseInt(y));
                                setGlobalMonth(parseInt(m));
                                setGlobalDay(parseInt(d));
                            }
                        }}
                    />
                </div>
                <button onClick={handleNextDate} style={{ background: 'transparent', border: 'none', color: '#6b7280', padding: '0.5rem 1rem', cursor: 'pointer' }}><ChevronRight size={16} /></button>
            </div>
            
            <button onClick={() => setGlobalDay(globalDay === null ? new Date().getDate() : null)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', border: '1px solid #00f0ff', color: '#00f0ff', padding: '0.5rem 1rem', borderRadius: '24px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem' }}>
                <Calendar size={14} />
                {globalDay === null ? 'DAY VIEW' : 'FULL MONTH'}
            </button>

            <button onClick={fetchData} style={{ background: 'transparent', border: '1px solid #2d3142', color: '#818cf8', padding: '0.5rem', borderRadius: '8px', cursor: 'pointer', marginLeft: '0.5rem' }}><RefreshCw size={16} /></button>
            <button style={{ background: 'transparent', border: '1px solid #2d3142', color: '#10b981', padding: '0.5rem', borderRadius: '8px', cursor: 'pointer' }}><Download size={16} /></button>
        </div>
    );

    // ----------- TABS -----------

    const renderDriversTab = () => (
        <div style={styles.tableContainer}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={styles.th}>FREELANCER</th>
                        <th style={styles.th}>CURRENT STATUS</th>
                        <th style={styles.th}>DUTIES</th>
                        <th style={{ ...styles.th, textAlign: 'right' }}>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {drivers.map(driver => {
                        const activeTrip = trips.find(t => t.driver?._id === driver.user._id && t.status === 'Active');
                        const hasActiveTrip = !!activeTrip;
                        const dutyCount = trips.filter(t => t.driver?._id === driver.user._id && new Date(t.createdAt).getMonth() + 1 === globalMonth).length;
                        return (
                            <tr key={driver._id}>
                                <td style={styles.td}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={styles.avatar}>{driver.user?.name?.charAt(0) || 'U'}</div>
                                        <div>
                                            <div style={{ fontWeight: 'bold', color: '#fff' }}>{driver.user?.name}</div>
                                            <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '4px' }}>
                                                📞 {driver.phone} - {driver._id.toString().substring(0,8).toUpperCase()}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td style={styles.td}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <div style={{ ...styles.greenDot, background: hasActiveTrip ? '#ef4444' : '#10b981', boxShadow: `0 0 8px ${hasActiveTrip ? '#ef4444' : '#10b981'}` }}></div>
                                        <span style={{ color: hasActiveTrip ? '#ef4444' : '#10b981', fontWeight: 'bold', fontSize: '0.8rem' }}>{hasActiveTrip ? 'ON DUTY' : 'AVAILABLE'}</span>
                                    </div>
                                </td>
                                <td style={styles.td}><span style={styles.dutyBadge}>{dutyCount}</span></td>
                                <td style={{ ...styles.td, textAlign: 'right' }}>
                                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', alignItems: 'center' }}>
                                        {hasActiveTrip ? (
                                            <button style={{...styles.actionBtnPurple, background: 'transparent', border: '1px solid #ef4444', color: '#ef4444'}} onClick={() => { setPunchOutForm({...punchOutForm, tripId: activeTrip._id}); openModal('punchOut'); }}>FINISH</button>
                                        ) : (
                                            <button style={styles.actionBtnPurple} onClick={() => { setPunchInForm({...punchInForm, driverId: driver.user._id}); openModal('punchIn'); }}>START</button>
                                        )}
                                        <button style={styles.actionIconBtn} onClick={() => { setEditDriverForm({ _id: driver._id, name: driver.user?.name, phone: driver.phone, address: driver.address, nightStayBonus: driver.nightStayBonus, driverType: driver.driverType || 'STAFF' }); openModal('editDriver'); }}><Edit size={14} /></button>
                                        <button style={styles.actionIconBtnRed} onClick={() => handleDeleteDriver(driver._id)}><Trash2 size={14} /></button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );

    const renderDutysTab = () => {
        const monthTrips = trips.filter(t => {
            const d = new Date(t.createdAt);
            const isSameMonth = d.getMonth() + 1 === globalMonth && d.getFullYear() === globalYear;
            if (!isSameMonth) return false;
            if (globalDay) return d.getDate() === globalDay;
            return true;
        }).sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));

        const totalDuties = monthTrips.length;
        // Just rough payout estimation for the top card (actual exact is in salaries)
        const totalPayout = monthTrips.reduce((acc, t) => acc + (t.earnings || 0), 0); // Using earnings field or calculated

        return (
            <div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
                    {renderMonthYearSelectors()}
                </div>
                
                <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem' }}>
                    <div style={styles.statCard}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                            <div>
                                <div style={styles.statCardTitle}>TOTAL DUTIES</div>
                                <div style={styles.statCardValue}>{totalDuties}</div>
                            </div>
                            <div style={{ ...styles.actionIconBtn, background: '#064e3b', color: '#10b981' }}><MapPin size={16} /></div>
                        </div>
                    </div>
                    <div style={styles.statCard}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                            <div>
                                <div style={styles.statCardTitle}>TOTAL PAYOUT</div>
                                <div style={{ ...styles.statCardValue, color: '#00f0ff' }}>₹{totalPayout.toLocaleString()}</div>
                            </div>
                            <div style={{ ...styles.actionIconBtn, background: '#422006', color: '#00f0ff' }}>₹</div>
                        </div>
                    </div>
                </div>

                <div style={styles.tableContainer}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={styles.th}>DATE</th>
                                <th style={styles.th}>DRIVER</th>
                                <th style={styles.th}>VEHICLE</th>
                                <th style={styles.th}>ROUTE DETAILS</th>
                                <th style={styles.th}>TIMING & KM</th>
                                <th style={styles.th}>FINANCIALS</th>
                                <th style={{ ...styles.th, textAlign: 'right' }}>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {monthTrips.map(trip => {
                                const driverData = drivers.find(d => d.user._id === trip.driver?._id);
                                const wage = trip.wage || driverData?.dailyWage || 0;
                                const totalFin = wage;

                                return (
                                    <tr key={trip._id}>
                                        <td style={styles.td}>
                                            <div style={{ fontWeight: 'bold', color: '#fff', fontSize: '0.9rem' }}>{new Date(trip.createdAt).getDate()} {new Date(trip.createdAt).toLocaleString('default', { month: 'short' })}</div>
                                            <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{new Date(trip.createdAt).getFullYear()}</div>
                                        </td>
                                        <td style={styles.td}>
                                            <div style={{ fontWeight: 'bold', color: '#fff', fontSize: '0.9rem' }}>{trip.driver?.name}</div>
                                            <div style={{ fontSize: '0.65rem', background: trip.status === 'Completed' ? '#064e3b' : '#422006', color: trip.status === 'Completed' ? '#10b981' : '#00f0ff', padding: '0.1rem 0.4rem', borderRadius: '4px', display: 'inline-block', marginTop: '4px', fontWeight: 'bold' }}>{trip.status.toUpperCase()}</div>
                                        </td>
                                        <td style={styles.td}>
                                            <div style={styles.plateYellow}>{trip.auto?.autoNumber || 'N/A'}</div>
                                            <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '4px' }}>{trip.auto?.model || 'Auto'}</div>
                                        </td>
                                        <td style={styles.td}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#fff' }}>
                                                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }}></div> {trip.pickupLocation || 'Office'}
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#6b7280', marginTop: '4px' }}>
                                                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ef4444' }}></div> {trip.dropLocation || 'Office'}
                                            </div>
                                        </td>
                                        <td style={styles.td}>
                                            <div style={{ fontWeight: 'bold', color: '#fff', fontSize: '0.8rem' }}>
                                                {new Date(trip.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {trip.endTime ? new Date(trip.endTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'Ongoing'}
                                            </div>
                                            <div style={{ fontSize: '0.75rem', color: '#818cf8', fontWeight: 'bold', marginTop: '4px' }}>{trip.totalKM || 0} KM Run</div>
                                        </td>
                                        <td style={styles.td}>
                                            <div style={{ fontWeight: 'bold', color: '#10b981', fontSize: '1rem' }}>₹{totalFin}</div>
                                            <div style={{ fontSize: '0.7rem', color: '#6b7280' }}>W: ₹{wage}</div>
                                        </td>
                                        <td style={{ ...styles.td, textAlign: 'right' }}>
                                            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                                <button style={styles.actionIconBtn} onClick={() => { 
                                                    if(trip.status==='Active') { 
                                                        setPunchOutForm({...punchOutForm, tripId: trip._id}); openModal('punchOut'); 
                                                    } else { 
                                                        setEditTripForm({ _id: trip._id, startKM: trip.startKM, endKM: trip.endKM, pickupLocation: trip.pickupLocation, dropLocation: trip.dropLocation, otherBonuses: trip.otherBonuses || 0 });
                                                        openModal('editTrip');
                                                    } 
                                                }}><Edit size={14} /></button>
                                                <button style={styles.actionIconBtnRed} onClick={() => handleDeleteTrip(trip._id)}><Trash2 size={14} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    const renderSalariesTab = () => {
        if (selectedDriverReport) return renderSalaryReport();

        // Calculate global totals
        let grandEarned = 0;
        let grandAdvance = 0;
        let grandOwed = 0;

        const driversList = drivers.map(d => {
            const s = salariesData[d.user._id];
            if (!s) return { driver: d, earned: 0, advance: 0, net: 0, days: 0 };
            
            grandEarned += s.earningsBreakdown.totalEarnings;
            grandAdvance += s.deductionsBreakdown.totalAdvances;
            grandOwed += s.netPayable; // negative means company owes, wait: TotalEarnings - Advances. If Net > 0, company owes driver.

            return { driver: d, earned: s.earningsBreakdown.totalEarnings, advance: s.deductionsBreakdown.totalAdvances, net: s.netPayable, days: s.earningsBreakdown.totalDuties };
        });

        // In the screenshot: Net Company Owed is -900. (Meaning driver owes company 900? Or company owes driver? Usually if advance > earned, driver owes).
        const netCompanyOwed = grandEarned - grandAdvance;

        return (
            <div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
                    {renderMonthYearSelectors()}
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    <div style={{ width: '4px', height: '24px', background: '#00f0ff', borderRadius: '2px' }}></div>
                    <h2 style={{ fontSize: '1.2rem', margin: 0 }}>Monthly Settlement Summary</h2>
                </div>

                <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem' }}>
                    <div style={styles.statCard}>
                        <div style={styles.statCardTitle}>TOTAL EARNED</div>
                        <div style={{ ...styles.statCardValue, color: '#10b981' }}>₹{grandEarned.toLocaleString()}</div>
                    </div>
                    <div style={styles.statCard}>
                        <div style={styles.statCardTitle}>TOTAL ADVANCE</div>
                        <div style={{ ...styles.statCardValue, color: '#ef4444' }}>₹{grandAdvance.toLocaleString()}</div>
                    </div>
                    <div style={styles.statCard}>
                        <div style={styles.statCardTitle}>NET COMPANY OWED</div>
                        <div style={{ ...styles.statCardValue, color: '#00d2ff' }}>₹{netCompanyOwed.toLocaleString()}</div>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {driversList.map(item => (
                        <div key={item.driver._id} 
                             onClick={() => setSelectedDriverReport(item.driver)}
                             style={{ background: '#1b1e2b', border: '1px solid #2d3142', borderRadius: '12px', padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', transition: '0.2s' }}
                             onMouseOver={(e) => e.currentTarget.style.background = '#252a41'}
                             onMouseOut={(e) => e.currentTarget.style.background = '#1b1e2b'}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={styles.avatar}>{item.driver.user?.name?.charAt(0)}</div>
                                <div>
                                    <div style={{ fontWeight: 'bold', color: '#fff' }}>{item.driver.user?.name}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '4px' }}>{item.days} days worked</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '0.65rem', color: '#6b7280', fontWeight: 'bold', marginBottom: '4px' }}>EARNED</div>
                                    <div style={{ color: '#10b981', fontWeight: 'bold' }}>₹{item.earned.toLocaleString()}</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '0.65rem', color: '#6b7280', fontWeight: 'bold', marginBottom: '4px' }}>ADVANCE</div>
                                    <div style={{ color: '#ef4444', fontWeight: 'bold' }}>₹{item.advance.toLocaleString()}</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '0.65rem', color: '#6b7280', fontWeight: 'bold', marginBottom: '4px' }}>NET PAYABLE</div>
                                    <div style={{ color: '#10b981', fontWeight: 'bold' }}>₹{item.net.toLocaleString()}</div>
                                </div>
                                <ChevronRight size={16} color="#6b7280" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderSalaryReport = () => {
        const driver = selectedDriverReport;
        const s = salariesData[driver.user._id];
        if (!s) return <div style={{color: '#fff'}}>Loading report...</div>;

        return (
            <div>
                {/* Header Profile Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <button onClick={() => setSelectedDriverReport(null)} style={{ background: '#252a41', border: 'none', color: '#fff', width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                            <ArrowLeft size={18} />
                        </button>
                        <div style={styles.avatar}>{driver.user?.name?.charAt(0)}</div>
                        <div>
                            <div style={{ fontSize: '0.65rem', color: '#6b7280', fontWeight: 'bold', letterSpacing: '1px' }}>FREELANCER - SALARY REPORT</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#fff' }}>{driver.user?.name}</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        {renderMonthYearSelectors()}
                        <button onClick={() => { setPaymentForm({...paymentForm, driverId: driver.user._id}); openModal('payment'); }} style={styles.onboardBtn}>
                            + RECORD PAYMENT
                        </button>
                    </div>
                </div>

                {/* 5 Stat Cards */}
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{ ...styles.statCard, padding: '1rem' }}>
                        <div style={{ fontSize: '0.65rem', color: '#818cf8', fontWeight: 'bold', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={12}/> WAGES</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>₹{s.earningsBreakdown.totalWages.toLocaleString()}</div>
                        <div style={{ fontSize: '0.7rem', color: '#6b7280', marginTop: '4px' }}>{s.earningsBreakdown.totalDuties} duty days</div>
                    </div>
                    <div style={{ ...styles.statCard, padding: '1rem' }}>
                        <div style={{ fontSize: '0.65rem', color: '#a78bfa', fontWeight: 'bold', marginBottom: '0.5rem' }}>BONUSES</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>₹{(s.earningsBreakdown.totalAllowanceTA + s.earningsBreakdown.totalNightStayBonuses + s.earningsBreakdown.totalOtherBonuses).toLocaleString()}</div>
                        <div style={{ fontSize: '0.7rem', color: '#6b7280', marginTop: '4px' }}>T/A + Night Stay</div>
                    </div>
                    <div style={{ ...styles.statCard, padding: '1rem' }}>
                        <div style={{ fontSize: '0.65rem', color: '#00f0ff', fontWeight: 'bold', marginBottom: '0.5rem' }}>PARKING</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>₹{s.earningsBreakdown.totalSelfPaidTolls.toLocaleString()}</div>
                        <div style={{ fontSize: '0.7rem', color: '#6b7280', marginTop: '4px' }}>Self Paid</div>
                    </div>
                    <div style={{ ...styles.statCard, padding: '1rem' }}>
                        <div style={{ fontSize: '0.65rem', color: '#10b981', fontWeight: 'bold', marginBottom: '0.5rem' }}>GROSS EARNED</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>₹{s.earningsBreakdown.totalEarnings.toLocaleString()}</div>
                        <div style={{ fontSize: '0.7rem', color: '#6b7280', marginTop: '4px' }}>Wages + Bonuses + Parking</div>
                    </div>
                    <div style={{ ...styles.statCard, padding: '1rem' }}>
                        <div style={{ fontSize: '0.65rem', color: '#ef4444', fontWeight: 'bold', marginBottom: '0.5rem' }}>PAID / ADVANCE</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>₹{s.deductionsBreakdown.totalAdvances.toLocaleString()}</div>
                        <div style={{ fontSize: '0.7rem', color: '#6b7280', marginTop: '4px' }}>{s.advances?.length || 0} payments</div>
                    </div>
                </div>

                {/* Net Payable Banner */}
                <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '16px', padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <div>
                        <div style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '0.5rem' }}>NET PAYABLE — {new Date(globalYear, globalMonth - 1).toLocaleString('default', { month: 'long', year: 'numeric' }).toUpperCase()}</div>
                        <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>₹{s.earningsBreakdown.totalEarnings.toLocaleString()} earned - ₹{s.deductionsBreakdown.totalAdvances.toLocaleString()} paid</div>
                    </div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 900, color: s.netPayable >= 0 ? '#10b981' : '#ef4444' }}>₹{s.netPayable.toLocaleString()}</div>
                </div>

                {/* Duty Calendar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <div style={{ width: '4px', height: '20px', background: '#818cf8', borderRadius: '2px' }}></div>
                    <h3 style={{ fontSize: '1rem', margin: 0, color: '#fff', textTransform: 'uppercase' }}>Duty Calendar — Earnings</h3>
                </div>
                <div style={{ ...styles.tableContainer, marginBottom: '2rem' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={styles.th}>DATE</th>
                                <th style={{...styles.th, textAlign: 'right'}}>WAGES</th>
                                <th style={{...styles.th, textAlign: 'right'}}>T/A</th>
                                <th style={{...styles.th, textAlign: 'right'}}>NIGHT STAY</th>
                                <th style={{...styles.th, textAlign: 'right'}}>PARKING</th>
                                <th style={{...styles.th, textAlign: 'right'}}>TOTAL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {s.trips?.filter(t => !globalDay || new Date(t.createdAt).getDate() === globalDay).map(t => {
                                const wage = t.wage || s.earningsBreakdown.dailyWageRate || 0;
                                const ta = t.allowanceTA || 0;
                                const ns = t.nightStayAmount || 0;
                                const parkingExp = t.expenses?.find(e => e.category === 'Parking/Toll' && e.paidBy === 'Self');
                                const parking = parkingExp ? parkingExp.amount : 0;
                                const total = wage + ta + ns + parking;
                                return (
                                    <tr key={t._id}>
                                        <td style={styles.td}>
                                            <div style={{ fontWeight: 'bold', color: '#fff', fontSize: '0.85rem' }}>{new Date(t.createdAt).toLocaleDateString('en-GB')}</div>
                                            <div style={{ fontSize: '0.7rem', color: '#6b7280' }}>Duty</div>
                                        </td>
                                        <td style={{...styles.td, textAlign: 'right', color: '#fff'}}>₹{wage}</td>
                                        <td style={{...styles.td, textAlign: 'right', color: ta > 0 ? '#00f0ff' : '#00f0ff'}}>₹{ta}</td>
                                        <td style={{...styles.td, textAlign: 'right', color: ns > 0 ? '#00f0ff' : '#00f0ff'}}>₹{ns}</td>
                                        <td style={{...styles.td, textAlign: 'right', color: parking > 0 ? '#00f0ff' : '#00f0ff'}}>₹{parking}</td>
                                        <td style={{...styles.td, textAlign: 'right', color: '#10b981', fontWeight: 'bold'}}>₹{total}</td>
                                    </tr>
                                );
                            })}
                            <tr style={{ background: '#252a41' }}>
                                <td colSpan="5" style={{ padding: '1rem 1.5rem', fontWeight: 'bold', color: '#10b981', fontSize: '0.8rem' }}>GRAND TOTAL (WAGES + BONUSES + PARKING)</td>
                                <td style={{ padding: '1rem 1.5rem', fontWeight: 'bold', color: '#10b981', textAlign: 'right', fontSize: '1.2rem' }}>₹{s.earningsBreakdown.totalEarnings.toLocaleString()}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Payments Issued */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <div style={{ width: '4px', height: '20px', background: '#ef4444', borderRadius: '2px' }}></div>
                    <h3 style={{ fontSize: '1rem', margin: 0, color: '#fff', textTransform: 'uppercase' }}>Payments Issued — This Month</h3>
                </div>
                <div style={styles.tableContainer}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={styles.th}>DATE</th>
                                <th style={styles.th}>REMARK</th>
                                <th style={{...styles.th, textAlign: 'right'}}>AMOUNT</th>
                                <th style={{...styles.th, textAlign: 'right'}}>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {s.advances?.map(a => (
                                <tr key={a._id}>
                                    <td style={{...styles.td, color: '#fff', fontWeight: 'bold', fontSize: '0.85rem'}}>{new Date(a.date).toLocaleDateString('en-GB')}</td>
                                    <td style={{...styles.td, color: '#8b949e', fontSize: '0.85rem', fontStyle: 'italic'}}>{a.remarks || 'Payment'}</td>
                                    <td style={{...styles.td, textAlign: 'right', color: '#ef4444', fontWeight: 'bold'}}>₹{a.amount}</td>
                                    <td style={{ ...styles.td, textAlign: 'right' }}>
                                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                            <button style={{background:'transparent', border:'none', color:'#3b82f6', cursor:'pointer'}} onClick={() => { setEditPaymentForm({ _id: a._id, date: new Date(a.date).toISOString().split('T')[0], amount: a.amount, remarks: a.remarks }); openModal('editPayment'); }}><Edit size={14}/></button>
                                            <button style={{background:'transparent', border:'none', color:'#ef4444', cursor:'pointer'}} onClick={() => handleDeletePayment(a._id)}><Trash2 size={14}/></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    return (
        <div style={styles.pageContainer}>
            {/* Header */}
            <div style={styles.headerBox}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '48px', height: '48px', background: '#fff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Users size={28} color="#00f0ff" />
                    </div>
                    <div>
                        <div style={styles.titleSmall}><span style={{color: '#00f0ff'}}>●</span> EXTERNAL WORKFORCE</div>
                        <h1 style={styles.titleBig}>Drivers Hub</h1>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={styles.searchBar}>
                        <Search size={18} color="#6b7280" />
                        <input type="text" placeholder="Search names..." style={styles.searchInput} />
                    </div>
                    <button style={styles.onboardBtn} onClick={() => openModal('driver')}>+ ONBOARD DRIVER</button>
                </div>
            </div>

            {/* Main Tabs (Hidden if in Detail Report) */}
            {!selectedDriverReport && (
                <div style={styles.tabsContainer}>
                    {['DRIVERS', 'DUTYS', 'SALARIES'].map(tab => (
                        <button key={tab} style={styles.tabBtn(activeTab === tab)} onClick={() => setActiveTab(tab)}>
                            {tab === 'DRIVERS' && <Users size={16} />}
                            {tab === 'DUTYS' && <MapPin size={16} />}
                            {tab === 'SALARIES' && <span>₹</span>}
                            {tab}
                        </button>
                    ))}
                </div>
            )}

            {/* Tab Content */}
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem', color: '#00f0ff' }}>Loading Data...</div>
            ) : (
                <>
                    {!selectedDriverReport && activeTab === 'DRIVERS' && renderDriversTab()}
                    {!selectedDriverReport && activeTab === 'DUTYS' && renderDutysTab()}
                    {(activeTab === 'SALARIES' || selectedDriverReport) && renderSalariesTab()}
                </>
            )}

            {/* --------- MODALS --------- */}
            
            <Modal isOpen={modals.driver} onClose={() => closeModal('driver')} title="Onboard Driver">
                <form onSubmit={handleAddDriver} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input style={styles.glassInput} placeholder="Full Name" value={driverForm.name} onChange={e => setDriverForm({...driverForm, name: e.target.value})} required />
                    <input style={styles.glassInput} placeholder="Phone" value={driverForm.phone} onChange={e => setDriverForm({...driverForm, phone: e.target.value})} required />
                    <input style={styles.glassInput} placeholder="Address" value={driverForm.address} onChange={e => setDriverForm({...driverForm, address: e.target.value})} required />
                    <select style={styles.glassInput} value={driverForm.driverType} onChange={e => setDriverForm({...driverForm, driverType: e.target.value})}>
                        <option value="STAFF" style={{color: '#000'}}>STAFF</option>
                        <option value="FREELANCER" style={{color: '#000'}}>FREELANCER</option>
                    </select>
                    <button type="submit" style={{ ...styles.onboardBtn, justifyContent: 'center', width: '100%', marginTop: '1rem' }}>Save Driver</button>
                </form>
            </Modal>

            <Modal isOpen={modals.punchIn} onClose={() => closeModal('punchIn')} title="Start Duty">
                <form onSubmit={handlePunchIn} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <select style={styles.glassInput} value={punchInForm.autoId} onChange={e => setPunchInForm({...punchInForm, autoId: e.target.value})} required>
                        <option value="">Select Vehicle</option>
                        {autos.map(a => <option key={a._id} value={a._id} style={{background:'#12141d'}}>{a.autoNumber}</option>)}
                    </select>
                    <input type="number" style={styles.glassInput} placeholder="Start KM" value={punchInForm.startKM} onChange={e => setPunchInForm({...punchInForm, startKM: e.target.value})} required />
                    <input type="text" style={styles.glassInput} placeholder="Pickup Location (e.g. Office)" value={punchInForm.pickupLocation} onChange={e => setPunchInForm({...punchInForm, pickupLocation: e.target.value})} required />
                    <input type="number" style={styles.glassInput} placeholder="Wage for this Duty (₹)" value={punchInForm.wage} onChange={e => setPunchInForm({...punchInForm, wage: e.target.value})} required />
                    <div>
                        <label style={{color: '#9ca3af', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '4px', display: 'block'}}>PUNCH IN TIME (OPTIONAL)</label>
                        <input type="datetime-local" style={styles.glassInput} value={punchInForm.startTime} onChange={e => setPunchInForm({...punchInForm, startTime: e.target.value})} />
                    </div>
                    <button type="submit" style={{ ...styles.onboardBtn, justifyContent: 'center', width: '100%', marginTop: '1rem' }}>Punch In</button>
                </form>
            </Modal>

            <Modal isOpen={modals.punchOut} onClose={() => closeModal('punchOut')} title="End Duty">
                <form onSubmit={handlePunchOut} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '60vh', overflowY: 'auto' }}>
                    <input type="number" style={styles.glassInput} placeholder="End KM" value={punchOutForm.endKM} onChange={e => setPunchOutForm({...punchOutForm, endKM: e.target.value})} required />
                    <input type="text" style={styles.glassInput} placeholder="Drop Location" value={punchOutForm.dropLocation} onChange={e => setPunchOutForm({...punchOutForm, dropLocation: e.target.value})} required />
                    <div>
                        <label style={{color: '#9ca3af', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '4px', display: 'block'}}>PUNCH OUT TIME (OPTIONAL)</label>
                        <input type="datetime-local" style={styles.glassInput} value={punchOutForm.endTime} onChange={e => setPunchOutForm({...punchOutForm, endTime: e.target.value})} />
                    </div>

                    <button type="submit" style={{ ...styles.onboardBtn, justifyContent: 'center', width: '100%', marginTop: '1rem' }}>Complete Duty</button>
                </form>
            </Modal>

            <Modal isOpen={modals.payment} onClose={() => closeModal('payment')} title="Record Payment Issued">
                <form onSubmit={handleRecordPayment} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input type="date" style={styles.glassInput} value={paymentForm.date} onChange={e => setPaymentForm({...paymentForm, date: e.target.value})} required />
                    <input type="number" style={styles.glassInput} placeholder="Amount (₹)" value={paymentForm.amount} onChange={e => setPaymentForm({...paymentForm, amount: e.target.value})} required />
                    <input type="text" style={styles.glassInput} placeholder="Remark (e.g. Bank Transfer, Cash)" value={paymentForm.remarks} onChange={e => setPaymentForm({...paymentForm, remarks: e.target.value})} required />
                    <button type="submit" style={{ ...styles.onboardBtn, justifyContent: 'center', width: '100%', marginTop: '1rem' }}>Save Payment</button>
                </form>
            </Modal>

            <Modal isOpen={modals.editDriver} onClose={() => closeModal('editDriver')} title="Edit Driver">
                <form onSubmit={handleUpdateDriver} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input style={styles.glassInput} placeholder="Full Name" value={editDriverForm.name || ''} onChange={e => setEditDriverForm({...editDriverForm, name: e.target.value})} required />
                    <input style={styles.glassInput} placeholder="Phone" value={editDriverForm.phone || ''} onChange={e => setEditDriverForm({...editDriverForm, phone: e.target.value})} required />
                    <input style={styles.glassInput} placeholder="Address" value={editDriverForm.address || ''} onChange={e => setEditDriverForm({...editDriverForm, address: e.target.value})} required />
                    <select style={styles.glassInput} value={editDriverForm.driverType || 'STAFF'} onChange={e => setEditDriverForm({...editDriverForm, driverType: e.target.value})}>
                        <option value="STAFF" style={{color: '#000'}}>STAFF</option>
                        <option value="FREELANCER" style={{color: '#000'}}>FREELANCER</option>
                    </select>
                    <button type="submit" style={{ ...styles.onboardBtn, justifyContent: 'center', width: '100%', marginTop: '1rem' }}>Update Driver</button>
                </form>
            </Modal>

            <Modal isOpen={modals.editTrip} onClose={() => closeModal('editTrip')} title="Edit Duty">
                <form onSubmit={handleUpdateTrip} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '60vh', overflowY: 'auto' }}>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <input type="number" style={{...styles.glassInput, flex: 1}} placeholder="Start KM" value={editTripForm.startKM || ''} onChange={e => setEditTripForm({...editTripForm, startKM: e.target.value})} />
                        <input type="number" style={{...styles.glassInput, flex: 1}} placeholder="End KM" value={editTripForm.endKM || ''} onChange={e => setEditTripForm({...editTripForm, endKM: e.target.value})} />
                    </div>
                    <input type="text" style={styles.glassInput} placeholder="Pickup Location" value={editTripForm.pickupLocation || ''} onChange={e => setEditTripForm({...editTripForm, pickupLocation: e.target.value})} />
                    <input type="text" style={styles.glassInput} placeholder="Drop Location" value={editTripForm.dropLocation || ''} onChange={e => setEditTripForm({...editTripForm, dropLocation: e.target.value})} />
                    
                    <button type="submit" style={{ ...styles.onboardBtn, justifyContent: 'center', width: '100%', marginTop: '1rem' }}>Update Duty</button>
                </form>
            </Modal>

            <Modal isOpen={modals.editPayment} onClose={() => closeModal('editPayment')} title="Edit Payment">
                <form onSubmit={handleUpdatePayment} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input type="date" style={styles.glassInput} value={editPaymentForm.date || ''} onChange={e => setEditPaymentForm({...editPaymentForm, date: e.target.value})} required />
                    <input type="number" style={styles.glassInput} placeholder="Amount (₹)" value={editPaymentForm.amount || ''} onChange={e => setEditPaymentForm({...editPaymentForm, amount: e.target.value})} required />
                    <input type="text" style={styles.glassInput} placeholder="Remark (e.g. Bank Transfer)" value={editPaymentForm.remarks || ''} onChange={e => setEditPaymentForm({...editPaymentForm, remarks: e.target.value})} required />
                    <button type="submit" style={{ ...styles.onboardBtn, justifyContent: 'center', width: '100%', marginTop: '1rem' }}>Update Payment</button>
                </form>
            </Modal>

        </div>
    );
};

export default DriversHub;

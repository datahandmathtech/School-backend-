import React, { useState, useEffect } from 'react';
import { 
    Activity, 
    Users, 
    Car, 
    Clock, 
    AlertCircle, 
    Calendar,
    ChevronLeft,
    ChevronRight,
    MapPin,
    ArrowRight
} from 'lucide-react';
import api from '../services/api';

const LiveFeed = () => {
    // State
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [liveData, setLiveData] = useState({
        stats: { activeDrivers: 0, activeFleet: 0, totalFuelCost: 0, totalRunningCost: 0 },
        trips: [],
        absentDrivers: [],
        idleAutos: [],
        fuelLogs: []
    });
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('Drivers'); // Drivers, Fleet, Absent, Idle

    // Fetch data
    const fetchLiveFeed = async () => {
        try {
            const formattedDate = selectedDate.toISOString().split('T')[0];
            const res = await api.get(`/api/live-feed?date=${formattedDate}`);
            setLiveData(res.data);
        } catch (error) {
            console.error("Error fetching live feed:", error);
        } finally {
            setLoading(false);
        }
    };

    // Auto-refresh and fetch on date change
    useEffect(() => {
        setLoading(true);
        fetchLiveFeed();
        
        const interval = setInterval(fetchLiveFeed, 60000); // 60s
        return () => clearInterval(interval);
    }, [selectedDate]);

    const handlePrevDay = () => {
        const d = new Date(selectedDate);
        d.setDate(d.getDate() - 1);
        setSelectedDate(d);
    };

    const handleNextDay = () => {
        const d = new Date(selectedDate);
        d.setDate(d.getDate() + 1);
        setSelectedDate(d);
    };

    const handleJumpToToday = () => {
        setSelectedDate(new Date());
    };

    const isToday = () => {
        const today = new Date();
        return selectedDate.getDate() === today.getDate() && 
               selectedDate.getMonth() === today.getMonth() && 
               selectedDate.getFullYear() === today.getFullYear();
    };

    // Styles
    const styles = {
        container: { padding: '2rem', color: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column' },
        header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' },
        titleBox: { display: 'flex', alignItems: 'center', gap: '1rem' },
        iconBox: { width: '48px', height: '48px', background: 'rgba(0, 240, 255, 0.1)', border: '1px solid #00d2ff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
        titleText: { fontSize: '1.5rem', fontWeight: 900, letterSpacing: '1px', textTransform: 'uppercase' },
        dateSelector: { display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#12141d', border: '1px solid #2d3142', borderRadius: '24px', overflow: 'hidden' },
        btnGhost: { background: 'transparent', border: 'none', color: '#6b7280', padding: '0.5rem 1rem', cursor: 'pointer' },
        dateTextWrapper: { padding: '0 1rem', color: '#fff', fontWeight: 'bold', fontSize: '0.9rem', position: 'relative', minWidth: '100px', textAlign: 'center' },
        hiddenDateInput: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' },
        todayBtn: { background: 'transparent', border: '1px solid #00d2ff', color: '#00d2ff', padding: '0.5rem 1rem', borderRadius: '24px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' },
        
        statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' },
        statCard: { background: 'rgba(255, 255, 255, 0.02)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' },
        statTitle: { fontSize: '0.75rem', color: '#9ca3af', fontWeight: 'bold', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '0.5rem' },
        statValue: { fontSize: '2rem', fontWeight: 900, color: '#fff' },
        
        mainLayout: { display: 'flex', flexDirection: 'column', gap: '2rem', flex: 1 },
        
        // Left Column
        leftCol: { display: 'flex', flexDirection: 'column', gap: '1rem' },
        tabs: { display: 'flex', gap: '0.5rem', background: '#12141d', padding: '0.5rem', borderRadius: '12px', overflowX: 'auto' },
        tabBtn: (active) => ({ flex: 1, padding: '0.75rem', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem', transition: 'all 0.2s', background: active ? '#2d3142' : 'transparent', color: active ? '#fff' : '#6b7280', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }),
        feedContent: { flex: 1, background: 'rgba(255, 255, 255, 0.02)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '16px', padding: '1.5rem', overflowY: 'auto', maxHeight: '600px' },
        
        // Cards
        card: { background: 'rgba(0,0,0,0.2)', border: '1px solid #2d3142', borderRadius: '12px', padding: '1rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
        pulseDot: { width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 10px #10b981, 0 0 20px #10b981', animation: 'pulse 2s infinite' },
        offlineDot: { width: '10px', height: '10px', borderRadius: '50%', background: '#6b7280' },
        
        // Right Column
        rightCol: { background: 'rgba(255, 255, 255, 0.02)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column' },
        timelineWrapper: { flex: 1, overflowY: 'auto', marginTop: '1rem', paddingLeft: '1rem', borderLeft: '2px solid #2d3142' },
        timelineItem: { position: 'relative', paddingBottom: '1.5rem', paddingLeft: '1.5rem' },
        timelineDot: { position: 'absolute', left: '-1.5rem', top: '0', width: '12px', height: '12px', borderRadius: '50%', background: '#00d2ff', transform: 'translateX(-45%)' },
        timelineDotEnd: { position: 'absolute', left: '-1.5rem', top: '0', width: '12px', height: '12px', borderRadius: '50%', background: '#10b981', transform: 'translateX(-45%)' }
    };

    // Sub-renders
    const renderStats = () => (
        <div style={styles.statsGrid}>
            <div style={styles.statCard}>
                <div style={styles.statTitle}><Users size={16} color="#00d2ff"/> ACTIVE DRIVERS</div>
                <div style={styles.statValue}>{liveData.stats.activeDrivers}</div>
            </div>
            <div style={styles.statCard}>
                <div style={styles.statTitle}><Car size={16} color="#10b981"/> ACTIVE FLEET</div>
                <div style={styles.statValue}>{liveData.stats.activeFleet}</div>
            </div>

            <div style={styles.statCard}>
                <div style={styles.statTitle}><Activity size={16} color="#8b5cf6"/> EST. RUNNING COST</div>
                <div style={{...styles.statValue, color: '#8b5cf6'}}>₹{liveData.stats.totalRunningCost.toLocaleString()}</div>
            </div>
        </div>
    );

    const renderDriversFeed = () => (
        <div>
            {liveData.trips.length === 0 ? <p style={{color:'#6b7280'}}>No active drivers on this date.</p> : null}
            {liveData.trips.map(trip => (
                <div key={trip._id} style={styles.card}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={trip.status === 'Active' ? styles.pulseDot : styles.offlineDot}></div>
                            <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{trip.driver?.name || 'Unknown'}</h3>
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#9ca3af', marginTop: '0.25rem' }}>
                            Assigned: <span style={{ color: '#fff', fontWeight: 'bold' }}>{trip.auto?.autoNumber}</span>
                        </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.8rem', color: trip.status === 'Active' ? '#10b981' : '#6b7280', fontWeight: 'bold' }}>
                            {trip.status.toUpperCase()}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
                            Started: {new Date(trip.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderFleetFeed = () => (
        <div>
            {liveData.trips.length === 0 ? <p style={{color:'#6b7280'}}>No vehicles used on this date.</p> : null}
            {liveData.trips.map(trip => (
                <div key={trip._id} style={styles.card}>
                    <div>
                        <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#00d2ff' }}>{trip.auto?.autoNumber || 'Unknown'}</h3>
                        <div style={{ fontSize: '0.8rem', color: '#9ca3af', marginTop: '0.25rem' }}>
                            Model: {trip.auto?.model}
                        </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.8rem', color: '#fff' }}>
                            Driver: <b>{trip.driver?.name}</b>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );



    const renderAbsentFeed = () => (
        <div>
            {liveData.absentDrivers.length === 0 ? <p style={{color:'#6b7280'}}>No absent drivers!</p> : null}
            {liveData.absentDrivers.map(d => (
                <div key={d._id} style={styles.card}>
                    <div>
                        <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#ef4444' }}>{d.user?.name}</h3>
                        <div style={{ fontSize: '0.8rem', color: '#9ca3af', marginTop: '0.25rem' }}>
                            Phone: {d.phone}
                        </div>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#ef4444', fontWeight: 'bold' }}>ABSENT</div>
                </div>
            ))}
        </div>
    );

    const renderIdleFeed = () => (
        <div>
            {liveData.idleAutos.length === 0 ? <p style={{color:'#6b7280'}}>No idle vehicles! All are in use.</p> : null}
            {liveData.idleAutos.map(a => (
                <div key={a._id} style={styles.card}>
                    <div>
                        <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#6b7280' }}>{a.autoNumber}</h3>
                        <div style={{ fontSize: '0.8rem', color: '#9ca3af', marginTop: '0.25rem' }}>
                            Model: {a.model}
                        </div>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280', fontWeight: 'bold' }}>IDLE</div>
                </div>
            ))}
        </div>
    );



    return (
        <div style={styles.container}>
            {/* Custom pulse animation in DOM */}
            <style>
                {`
                @keyframes pulse {
                    0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
                    70% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
                }
                `}
            </style>

            {/* Header */}
            <div style={styles.header}>
                <div style={styles.titleBox}>
                    <div style={styles.iconBox}><Activity size={24} color="#00d2ff"/></div>
                    <div>
                        <div style={{ fontSize: '0.75rem', color: '#00d2ff', fontWeight: 'bold', letterSpacing: '2px' }}>COMMAND CENTER</div>
                        <h1 style={styles.titleText}>Live Feed & LogBook</h1>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    {!isToday() && (
                        <button onClick={handleJumpToToday} style={styles.todayBtn}>
                            <Clock size={14} /> JUMP TO TODAY
                        </button>
                    )}
                    <div style={styles.dateSelector}>
                        <button onClick={handlePrevDay} style={styles.btnGhost}><ChevronLeft size={16}/></button>
                        <div style={styles.dateTextWrapper}>
                            {selectedDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                            <input 
                                type="date" 
                                style={styles.hiddenDateInput}
                                value={selectedDate.toISOString().split('T')[0]}
                                onChange={e => {
                                    if(e.target.value) setSelectedDate(new Date(e.target.value));
                                }}
                            />
                        </div>
                        <button onClick={handleNextDay} style={styles.btnGhost}><ChevronRight size={16}/></button>
                    </div>
                </div>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', color: '#00d2ff', marginTop: '2rem' }}>Syncing with fleet...</div>
            ) : (
                <>
                    {renderStats()}

                    <div style={styles.mainLayout}>
                        {/* Left Col: Live Feed */}
                        <div style={styles.leftCol}>
                            <h2 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Activity size={18} color="#10b981"/> Live Operations
                            </h2>
                            <div style={styles.tabs}>
                                {['Drivers', 'Fleet', 'Absent', 'Idle'].map(tab => (
                                    <button 
                                        key={tab} 
                                        style={styles.tabBtn(activeTab === tab)} 
                                        onClick={() => setActiveTab(tab)}
                                    >
                                        {tab === 'Drivers' && <Users size={14}/>}
                                        {tab === 'Fleet' && <Car size={14}/>}
                                        {tab === 'Absent' && <AlertCircle size={14}/>}
                                        {tab === 'Idle' && <Clock size={14}/>}
                                        {tab}
                                    </button>
                                ))}
                            </div>
                            <div style={styles.feedContent}>
                                {activeTab === 'Drivers' && renderDriversFeed()}
                                {activeTab === 'Fleet' && renderFleetFeed()}
                                {activeTab === 'Absent' && renderAbsentFeed()}
                                {activeTab === 'Idle' && renderIdleFeed()}
                            </div>
                        </div>


                    </div>
                </>
            )}
        </div>
    );
};

export default LiveFeed;

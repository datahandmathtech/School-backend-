import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useCompany } from '../context/CompanyContext';
import { Car, User, Search, Circle, DoorOpen, Info, IndianRupee } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BusSeating = () => {
    const { selectedCompany } = useCompany();
    const [buses, setBuses] = useState([]);
    const [selectedBus, setSelectedBus] = useState(null);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [assignModal, setAssignModal] = useState({ show: false, seatNumber: null });

    useEffect(() => {
        if (selectedCompany) {
            fetchBuses();
        }
    }, [selectedCompany]);

    const fetchBuses = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`/api/admin/vehicles/${selectedCompany._id}?usePagination=false`);
            const vehicles = data.vehicles || (Array.isArray(data) ? data : []);
            setBuses(vehicles.filter(v => v.carType === 'Bus' || v.carType === 'Mini Bus'));
        } catch (err) {
            console.error('Error fetching buses', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchStudentsForBus = async (busId) => {
        try {
            const { data } = await axios.get(`/api/students/${selectedCompany._id}`);
            // Save all students to memory for the assignment modal, but we only need to show assigned ones on the bus map
            setStudents(data);
        } catch (err) {
            console.error('Error fetching students', err);
        }
    };

    const handleSelectBus = (bus) => {
        setSelectedBus(bus);
        fetchStudentsForBus(bus._id);
    };

    const handleAssignSeat = async (studentId, seatNumber) => {
        try {
            await axios.put(`/api/students/${studentId}`, {
                assignedBus: selectedBus._id,
                assignedSeatNumber: seatNumber
            });
            fetchStudentsForBus(selectedBus._id);
            setAssignModal({ show: false, seatNumber: null });
        } catch (err) {
            alert(err.response?.data?.message || 'Error assigning seat');
        }
    };

    const handleUnassignSeat = async (studentId) => {
        if (!window.confirm('Are you sure you want to unassign this seat?')) return;
        try {
            await axios.put(`/api/students/${studentId}`, {
                assignedSeatNumber: null
            });
            fetchStudentsForBus(selectedBus._id);
        } catch (err) {
            alert(err.response?.data?.message || 'Error removing seat assignment');
        }
    };

    const renderBusLayout = () => {
        if (!selectedBus) return null;
        const capacity = parseInt(selectedBus.seatingCapacity) || 40;
        
        let seatsRendered = 0;
        const rows = [];
        const numRows = Math.ceil(capacity / 4);

        for (let r = 0; r < numRows; r++) {
            const rowSeats = [];
            const isBackRow = r === numRows - 1;
            const remainingSeats = capacity - seatsRendered;
            // Back row might be 5 contiguous seats, but if standard 2+2, let's keep it simple: 
            // 2 seats, Aisle, 2 seats for all rows. (Unless backrow needs to be 5, user asked for 2+aisle+2)
            
            for (let c = 0; c < 5; c++) {
                const isAisle = c === 2;
                
                if (isAisle) {
                    rowSeats.push(<div key={`aisle-${r}-${c}`} style={{ width: '45px', height: '45px' }} />);
                    continue;
                }

                if (seatsRendered >= capacity) break;

                seatsRendered++;
                const seatNum = seatsRendered;
                const studentInSeat = students.find(s => s.assignedBus?._id === selectedBus._id && s.assignedSeatNumber === seatNum);

                rowSeats.push(
                    <motion.div 
                        key={seatNum}
                        whileHover={{ scale: 1.1, zIndex: 10 }}
                        onClick={() => {
                            if (studentInSeat) {
                                handleUnassignSeat(studentInSeat._id);
                            } else {
                                setAssignModal({ show: true, seatNumber: seatNum });
                            }
                        }}
                        className="seat-card-hover group"
                        style={{
                            width: '45px',
                            height: '45px',
                            background: studentInSeat ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'rgba(255,255,255,0.05)',
                            border: studentInSeat ? 'none' : '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '8px 8px 4px 4px', // Seat shape
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            position: 'relative',
                            boxShadow: studentInSeat ? '0 4px 10px rgba(16,185,129,0.3)' : 'none',
                            color: studentInSeat ? 'white' : 'rgba(255,255,255,0.4)',
                        }}
                    >
                        {studentInSeat ? (
                            <User size={20} />
                        ) : (
                            <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{seatNum}</span>
                        )}

                        {/* Tooltip on Hover */}
                        {studentInSeat && (
                            <div className="tooltip hidden group-hover:block" style={{
                                position: 'absolute',
                                bottom: '120%',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                background: '#1e293b',
                                padding: '10px 15px',
                                borderRadius: '12px',
                                width: '180px',
                                boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                                zIndex: 100,
                                border: '1px solid rgba(255,255,255,0.1)'
                            }}>
                                <p style={{ margin: '0 0 5px 0', fontSize: '14px', fontWeight: 'bold', color: 'white' }}>{studentInSeat.name}</p>
                                <p style={{ margin: 0, fontSize: '11px', color: '#94a3b8' }}>Class: {studentInSeat.className}</p>
                                <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#94a3b8' }}>Seat: {seatNum}</p>
                            </div>
                        )}
                    </motion.div>
                );
            }

            rows.push(
                <div key={r} style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '10px' }}>
                    {rowSeats}
                </div>
            );
        }

        return (
            <div style={{
                background: '#0f172a',
                border: '8px solid #334155',
                borderRadius: '40px 40px 10px 10px',
                padding: '30px 20px',
                width: 'fit-content',
                margin: '0 auto',
                position: 'relative',
                boxShadow: 'inset 0 0 30px rgba(0,0,0,0.5), 0 20px 50px rgba(0,0,0,0.5)'
            }}>
                {/* Driver Cabin */}
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px dashed rgba(255,255,255,0.1)', paddingBottom: '20px', marginBottom: '30px' }}>
                    <div style={{ width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.2)' }}>
                        <DoorOpen size={30} />
                    </div>
                    <div style={{ width: '45px', height: '45px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                        <Circle size={24} />
                    </div>
                </div>

                {/* Passenger Seats */}
                <div style={{ minHeight: '300px' }}>
                    {rows}
                </div>
            </div>
        );
    };

    const unassignedStudents = students.filter(s => !s.assignedSeatNumber);
    const filteredUnassigned = unassignedStudents.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className="page-container" style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
            <header style={{ marginBottom: '30px' }}>
                <h1 style={{ color: 'white', fontSize: '32px', margin: 0, fontWeight: '900' }}>Live Inventory & Seating</h1>
                <p style={{ color: 'var(--text-muted)' }}>Interactive seating layout and assignments</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '30px' }}>
                {/* Left Panel: Bus List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <h3 style={{ color: 'white', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>Select Bus</h3>
                    {loading ? <div style={{ color: 'white' }}>Loading buses...</div> : null}
                    {buses.map(bus => (
                        <motion.div
                            key={bus._id}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => handleSelectBus(bus)}
                            style={{
                                padding: '15px',
                                background: selectedBus?._id === bus._id ? 'var(--primary)' : 'rgba(255,255,255,0.03)',
                                color: selectedBus?._id === bus._id ? 'black' : 'white',
                                borderRadius: '16px',
                                cursor: 'pointer',
                                border: selectedBus?._id === bus._id ? '1px solid transparent' : '1px solid rgba(255,255,255,0.05)',
                                boxShadow: selectedBus?._id === bus._id ? '0 10px 20px rgba(0,0,0,0.2)' : 'none',
                                transition: 'all 0.3s'
                            }}
                        >
                            <div style={{ fontWeight: 'bold', fontSize: '18px' }}>{bus.carNumber}</div>
                            <div style={{ fontSize: '13px', opacity: 0.8, marginTop: '4px' }}>{bus.seatingCapacity} Seats Capacity</div>
                        </motion.div>
                    ))}
                </div>

                {/* Right Panel: Seating Layout */}
                <div>
                    {selectedBus ? (
                        <div className="glass-card" style={{ padding: '40px', minHeight: '600px', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '30px' }}>
                                <div>
                                    <h2 style={{ color: 'white', margin: 0, fontSize: '24px' }}>Seating Layout: {selectedBus.carNumber}</h2>
                                    <p style={{ color: 'var(--text-muted)', margin: '5px 0 0 0' }}>Click a seat to assign or unassign a student.</p>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
                                    <div style={{ display: 'flex', gap: '20px', background: 'rgba(0,0,0,0.2)', padding: '10px 20px', borderRadius: '20px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div style={{ width: '14px', height: '14px', borderRadius: '4px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}></div>
                                            <span style={{ color: 'white', fontSize: '13px', fontWeight: 'bold' }}>Occupied</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div style={{ width: '14px', height: '14px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)' }}></div>
                                            <span style={{ color: 'white', fontSize: '13px', fontWeight: 'bold' }}>Empty</span>
                                        </div>
                                    </div>
                                    <div style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.1), rgba(16,185,129,0.2))', padding: '10px 20px', borderRadius: '12px', border: '1px solid rgba(16,185,129,0.3)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <div style={{ background: '#10b981', color: 'black', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <IndianRupee size={16} />
                                        </div>
                                        <div>
                                            <div style={{ color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase', fontWeight: 'bold' }}>Monthly Revenue</div>
                                            <div style={{ color: '#10b981', fontSize: '18px', fontWeight: '900' }}>
                                                ₹{(() => {
                                                    let total = 0;
                                                    students.filter(s => s.assignedBus?._id === selectedBus._id).forEach(s => {
                                                        const amount = s.feeAmount || 0;
                                                        if (s.feeType === 'Yearly') total += (amount / 12);
                                                        else if (s.feeType === 'Half-Yearly') total += (amount / 6);
                                                        else total += amount;
                                                    });
                                                    return total.toFixed(2);
                                                })()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {renderBusLayout()}
                            </div>
                        </div>
                    ) : (
                        <div className="glass-card" style={{ padding: '80px', textAlign: 'center', border: '2px dashed rgba(255,255,255,0.1)', background: 'transparent' }}>
                            <Car size={64} color="rgba(255,255,255,0.1)" style={{ margin: '0 auto 20px' }} />
                            <h3 style={{ color: 'white', fontSize: '24px' }}>No Bus Selected</h3>
                            <p style={{ color: 'var(--text-muted)' }}>Please select a bus from the left panel to view its seating layout.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Assignment Modal */}
            <AnimatePresence>
                {assignModal.show && (
                    <div style={{
                        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                        background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)',
                        zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="glass-card"
                            style={{ width: '90%', maxWidth: '500px', padding: '30px' }}
                        >
                            <h2 style={{ color: 'white', marginTop: 0, marginBottom: '20px' }}>Assign Seat {assignModal.seatNumber}</h2>
                            
                            <div style={{ position: 'relative', marginBottom: '20px' }}>
                                <Search size={18} color="rgba(255,255,255,0.5)" style={{ position: 'absolute', left: '15px', top: '12px' }} />
                                <input
                                    type="text"
                                    placeholder="Search student by name..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="dark-input"
                                    style={{ width: '100%', paddingLeft: '45px' }}
                                />
                            </div>

                            <div style={{ maxHeight: '300px', overflowY: 'auto', paddingRight: '5px' }} className="custom-scroll">
                                {filteredUnassigned.length === 0 ? (
                                    <p style={{ color: 'var(--text-muted)', textAlign: 'center', margin: '20px 0' }}>No unassigned students found.</p>
                                ) : (
                                    filteredUnassigned.map(student => (
                                        <div
                                            key={student._id}
                                            onClick={() => handleAssignSeat(student._id, assignModal.seatNumber)}
                                            style={{
                                                padding: '12px 15px',
                                                background: 'rgba(255,255,255,0.03)',
                                                border: '1px solid rgba(255,255,255,0.05)',
                                                borderRadius: '12px',
                                                marginBottom: '10px',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center'
                                            }}
                                            className="hover:bg-white/10 transition-colors"
                                        >
                                            <div>
                                                <div style={{ color: 'white', fontWeight: 'bold' }}>{student.name}</div>
                                                <div style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Class: {student.className}</div>
                                            </div>
                                            <div style={{ padding: '6px 12px', background: 'var(--primary)', color: 'black', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold' }}>
                                                Assign
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            <button
                                onClick={() => { setAssignModal({ show: false, seatNumber: null }); setSearchQuery(''); }}
                                className="btn-secondary"
                                style={{ width: '100%', marginTop: '20px' }}
                            >
                                Cancel
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <style>{`
                .seat-card-hover:hover .tooltip {
                    display: block !important;
                }
                .custom-scroll::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scroll::-webkit-scrollbar-thumb {
                    background: rgba(255,255,255,0.1);
                    border-radius: 10px;
                }
            `}</style>
        </div>
    );
};

export default BusSeating;

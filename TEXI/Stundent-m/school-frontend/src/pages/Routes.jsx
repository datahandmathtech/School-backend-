import React, { useState, useEffect, useRef } from 'react';
import axios from '../api/axios';
import { useCompany } from '../context/CompanyContext';
import { MapPin, Plus, Trash2, Edit, Route as RouteIcon, Bus, CheckCircle, Navigation, ArrowUp, ArrowDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Leaflet imports
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix leaflet icon issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to handle map clicks for adding new stops
const MapClickHandler = ({ onMapClick }) => {
    useMapEvents({
        click(e) {
            onMapClick(e.latlng);
        },
    });
    return null;
};

const Routes = () => {
    const { selectedCompany } = useCompany();
    const [routes, setRoutes] = useState([]);
    const [buses, setBuses] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ name: '', assignedBus: '', stops: [] });
    const [editingId, setEditingId] = useState(null);

    const [newStop, setNewStop] = useState({ stopName: '', lat: '', lng: '', expectedTime: '' });

    useEffect(() => {
        if (selectedCompany) {
            fetchRoutes();
            fetchBuses();
        }
    }, [selectedCompany]);

    const fetchRoutes = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`/api/routes/${selectedCompany._id}`);
            setRoutes(data);
        } catch (err) {
            console.error('Error fetching routes', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchBuses = async () => {
        try {
            const { data } = await axios.get(`/api/admin/vehicles/${selectedCompany._id}?usePagination=false`);
            const vehicles = data.vehicles || (Array.isArray(data) ? data : []);
            setBuses(vehicles.filter(v => v.carType === 'Bus' || v.carType === 'Mini Bus'));
        } catch (err) {
            console.error('Error fetching buses', err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = { ...formData, company: selectedCompany._id };
            if (!payload.assignedBus) delete payload.assignedBus;

            if (editingId) {
                await axios.put(`/api/routes/${editingId}`, payload);
            } else {
                await axios.post('/api/routes', payload);
            }
            setShowModal(false);
            setEditingId(null);
            setFormData({ name: '', assignedBus: '', stops: [] });
            fetchRoutes();
        } catch (err) {
            alert(err.response?.data?.message || 'Error saving route');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this route?')) {
            try {
                await axios.delete(`/api/routes/${id}`);
                fetchRoutes();
            } catch (err) {
                alert('Error deleting route');
            }
        }
    };

    const handleAddStop = () => {
        if (!newStop.stopName || !newStop.lat || !newStop.lng) return alert('Please enter stop name, lat, and lng');
        setFormData(prev => ({
            ...prev,
            stops: [...prev.stops, { ...newStop }]
        }));
        setNewStop({ stopName: '', lat: '', lng: '', expectedTime: '' });
    };

    const handleRemoveStop = (index) => {
        setFormData(prev => {
            const updated = [...prev.stops];
            updated.splice(index, 1);
            return { ...prev, stops: updated };
        });
    };

    const moveStopUp = (index) => {
        if (index === 0) return;
        setFormData(prev => {
            const updated = [...prev.stops];
            const temp = updated[index - 1];
            updated[index - 1] = updated[index];
            updated[index] = temp;
            return { ...prev, stops: updated };
        });
    };

    const moveStopDown = (index) => {
        if (index === formData.stops.length - 1) return;
        setFormData(prev => {
            const updated = [...prev.stops];
            const temp = updated[index + 1];
            updated[index + 1] = updated[index];
            updated[index] = temp;
            return { ...prev, stops: updated };
        });
    };

    const handleOptimizeRoute = async (id) => {
        try {
            const { data } = await axios.post(`/api/routes/optimize/${id}`);
            alert(data.message || 'Route optimized using AI Engine');
            fetchRoutes();
        } catch (err) {
            alert(err.response?.data?.message || 'Error optimizing route');
        }
    };

    const handleMapClick = (latlng) => {
        setNewStop(prev => ({
            ...prev,
            lat: latlng.lat.toFixed(5),
            lng: latlng.lng.toFixed(5)
        }));
    };

    // Calculate center of the map based on existing stops or default
    const mapCenter = formData.stops.length > 0 
        ? [formData.stops[0].lat, formData.stops[0].lng] 
        : [28.6139, 77.2090]; // Default to New Delhi if no stops

    const polylinePositions = formData.stops.map(stop => [parseFloat(stop.lat), parseFloat(stop.lng)]);

    return (
        <div className="page-container" style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <div>
                    <h1 style={{ color: 'white', fontSize: '32px', margin: 0, fontWeight: '900', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <RouteIcon size={32} color="var(--primary)" /> Route & Map Management
                    </h1>
                    <p style={{ color: 'var(--text-muted)' }}>Manage bus routes, AI optimization, and live map pins</p>
                </div>
                <button className="btn-primary" style={{ padding: '10px 20px', borderRadius: '12px', fontSize: '15px' }} onClick={() => { setEditingId(null); setFormData({ name: '', assignedBus: '', stops: [] }); setShowModal(true); }}>
                    <Plus size={20} /> Create Route
                </button>
            </header>

            {loading ? (
                <div style={{ color: 'white', textAlign: 'center', padding: '50px' }}>Loading routes...</div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '20px' }}>
                    {routes.map(route => (
                        <motion.div key={route._id} className="glass-card-hover-effect" style={{ padding: '24px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)', background: 'linear-gradient(145deg, rgba(15,23,42,0.8), rgba(30,41,59,0.5))' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <h3 style={{ color: 'white', fontSize: '22px', margin: '0 0 5px 0', fontWeight: 'bold' }}>{route.name}</h3>
                                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', marginBottom: '15px' }}>
                                        <Bus size={14} /> {route.assignedBus ? route.assignedBus.carNumber : 'Unassigned'}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button onClick={() => { setEditingId(route._id); setFormData({ ...route, assignedBus: route.assignedBus?._id || '' }); setShowModal(true); }} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer', color: 'white' }}>
                                        <Edit size={18} />
                                    </button>
                                    <button onClick={() => handleDelete(route._id)} style={{ background: 'rgba(244,63,94,0.1)', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer', color: '#f43f5e' }}>
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                            
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', marginBottom: '15px' }}>
                                <h4 style={{ color: 'white', fontSize: '14px', margin: 0, display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <MapPin size={16} color="var(--primary)" /> {route.stops?.length || 0} Stops Added
                                </h4>
                                {route.stops && route.stops.length >= 3 && (
                                    <button onClick={() => handleOptimizeRoute(route._id)} className="btn-primary" style={{ padding: '6px 12px', fontSize: '12px', borderRadius: '8px', display: 'flex', gap: '5px', alignItems: 'center', background: 'linear-gradient(90deg, #8b5cf6, #d946ef)' }}>
                                        <Navigation size={14} /> Optimize Route
                                    </button>
                                )}
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '180px', overflowY: 'auto', paddingRight: '5px' }} className="custom-scroll">
                                {route.stops?.map((stop, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '12px', borderLeft: '3px solid var(--primary)' }}>
                                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '12px', fontWeight: '900' }}>
                                            {i + 1}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ color: 'white', fontSize: '14px', fontWeight: 'bold' }}>{stop.stopName}</div>
                                            <div style={{ color: 'var(--text-muted)', fontSize: '11px', marginTop: '2px' }}>
                                                {stop.expectedTime ? `${stop.expectedTime} • ` : ''}Lat: {stop.lat}, Lng: {stop.lng}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {route.stops?.length === 0 && (
                                    <div style={{ color: 'var(--text-muted)', fontSize: '13px', textAlign: 'center', padding: '20px', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '10px' }}>No stops added to this route yet.</div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            <AnimatePresence>
                {showModal && (
                    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px' }}>
                        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="glass-card" style={{ padding: '30px', width: '100%', maxWidth: '1100px', maxHeight: '95vh', overflowY: 'auto', borderRadius: '24px' }}>
                            <h2 style={{ color: 'white', marginBottom: '25px', fontSize: '28px' }}>{editingId ? 'Edit Route & Stops' : 'Create Interactive Route'}</h2>
                            
                            <form onSubmit={handleSubmit}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '25px' }}>
                                    <div className="form-group">
                                        <label style={{ color: 'var(--text-muted)', marginBottom: '8px', display: 'block', fontWeight: 'bold' }}>Route Name</label>
                                        <input className="dark-input" style={{ width: '100%' }} value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. Morning Route A" required />
                                    </div>
                                    <div className="form-group">
                                        <label style={{ color: 'var(--text-muted)', marginBottom: '8px', display: 'block', fontWeight: 'bold' }}>Assign Bus</label>
                                        <select className="dark-input" style={{ width: '100%' }} value={formData.assignedBus} onChange={e => setFormData({ ...formData, assignedBus: e.target.value })}>
                                            <option value="">No Bus Assigned</option>
                                            {buses.map(bus => (
                                                <option key={bus._id} value={bus._id}>{bus.carNumber} ({bus.seatingCapacity} Seats)</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '30px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '25px' }}>
                                    
                                    {/* Left Side: Map Builder */}
                                    <div>
                                        <h3 style={{ color: 'white', fontSize: '18px', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <MapPin size={20} color="var(--primary)" /> Interactive Map Builder
                                        </h3>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '15px' }}>Click anywhere on the map to automatically pick Latitude & Longitude for a new stop.</p>
                                        
                                        <div style={{ height: '350px', borderRadius: '16px', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.1)' }}>
                                            <MapContainer center={mapCenter} zoom={13} style={{ height: '100%', width: '100%' }}>
                                                <TileLayer
                                                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                />
                                                <MapClickHandler onMapClick={handleMapClick} />
                                                
                                                {/* Draw existing stops */}
                                                {formData.stops.map((stop, idx) => (
                                                    <Marker key={idx} position={[parseFloat(stop.lat), parseFloat(stop.lng)]}>
                                                        <Popup>
                                                            <strong>{idx + 1}. {stop.stopName}</strong><br/>
                                                            Time: {stop.expectedTime || 'N/A'}
                                                        </Popup>
                                                    </Marker>
                                                ))}

                                                {/* Draw Polyline to show route */}
                                                {polylinePositions.length > 1 && (
                                                    <Polyline positions={polylinePositions} color="#8b5cf6" weight={4} opacity={0.7} />
                                                )}
                                                
                                                {/* Temporary marker for clicked location */}
                                                {newStop.lat && newStop.lng && (
                                                    <Marker position={[parseFloat(newStop.lat), parseFloat(newStop.lng)]} opacity={0.6}>
                                                        <Popup>New Stop Location (Add details below)</Popup>
                                                    </Marker>
                                                )}
                                            </MapContainer>
                                        </div>

                                        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '16px', marginTop: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                            <h4 style={{ color: 'white', margin: '0 0 15px 0', fontSize: '15px' }}>Add Stop Details</h4>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                                                <div>
                                                    <label style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '5px', display: 'block', textTransform: 'uppercase' }}>Stop Name</label>
                                                    <input className="dark-input" style={{ width: '100%', height: '40px' }} value={newStop.stopName} onChange={e => setNewStop({ ...newStop, stopName: e.target.value })} placeholder="e.g. Central Park" />
                                                </div>
                                                <div>
                                                    <label style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '5px', display: 'block', textTransform: 'uppercase' }}>Expected Time</label>
                                                    <input type="time" className="dark-input" style={{ width: '100%', height: '40px' }} value={newStop.expectedTime} onChange={e => setNewStop({ ...newStop, expectedTime: e.target.value })} />
                                                </div>
                                                <div>
                                                    <label style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '5px', display: 'block', textTransform: 'uppercase' }}>Lat (Auto-filled by map)</label>
                                                    <input type="number" step="any" className="dark-input" style={{ width: '100%', height: '40px' }} value={newStop.lat} onChange={e => setNewStop({ ...newStop, lat: e.target.value })} placeholder="Latitude" />
                                                </div>
                                                <div>
                                                    <label style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '5px', display: 'block', textTransform: 'uppercase' }}>Lng (Auto-filled by map)</label>
                                                    <input type="number" step="any" className="dark-input" style={{ width: '100%', height: '40px' }} value={newStop.lng} onChange={e => setNewStop({ ...newStop, lng: e.target.value })} placeholder="Longitude" />
                                                </div>
                                            </div>
                                            <button type="button" onClick={handleAddStop} className="btn-primary" style={{ width: '100%', padding: '12px', borderRadius: '10px' }}>
                                                <Plus size={18} style={{ display: 'inline', marginRight: '5px' }} /> Add to Route Sequence
                                            </button>
                                        </div>
                                    </div>

                                    {/* Right Side: Stop Sequence List */}
                                    <div>
                                        <h3 style={{ color: 'white', fontSize: '18px', marginBottom: '15px' }}>Route Sequence ({formData.stops.length})</h3>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '15px' }}>Review the order of stops. The route will be followed in this sequence.</p>
                                        
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '550px', overflowY: 'auto', paddingRight: '10px' }} className="custom-scroll">
                                            {formData.stops.length === 0 ? (
                                                <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px dashed rgba(255,255,255,0.2)', borderRadius: '12px', padding: '40px', textAlign: 'center' }}>
                                                    <CheckCircle size={40} color="rgba(255,255,255,0.2)" style={{ margin: '0 auto 10px' }} />
                                                    <div style={{ color: 'white', fontWeight: 'bold' }}>No stops added</div>
                                                    <div style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '5px' }}>Click on the map and add stops to build the route sequence.</div>
                                                </div>
                                            ) : (
                                                formData.stops.map((stop, i) => (
                                                    <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '12px', borderLeft: '4px solid var(--primary)' }}>
                                                        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                                            <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }}>
                                                                {i + 1}
                                                            </div>
                                                            <div>
                                                                <div style={{ color: 'white', fontWeight: 'bold', fontSize: '15px' }}>{stop.stopName}</div>
                                                                <div style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '4px' }}>
                                                                    <MapPin size={12} style={{ display: 'inline', marginRight: '3px' }} />
                                                                    {stop.lat}, {stop.lng}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                                                <button type="button" disabled={i === 0} onClick={() => moveStopUp(i)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: i === 0 ? 'rgba(255,255,255,0.2)' : 'white', cursor: i === 0 ? 'default' : 'pointer', borderRadius: '4px', padding: '2px' }}><ArrowUp size={14} /></button>
                                                                <button type="button" disabled={i === formData.stops.length - 1} onClick={() => moveStopDown(i)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: i === formData.stops.length - 1 ? 'rgba(255,255,255,0.2)' : 'white', cursor: i === formData.stops.length - 1 ? 'default' : 'pointer', borderRadius: '4px', padding: '2px' }}><ArrowDown size={14} /></button>
                                                            </div>
                                                            <div style={{ color: 'white', fontSize: '12px', background: 'rgba(0,0,0,0.4)', padding: '6px 10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', minWidth: '70px', textAlign: 'center' }}>
                                                                {stop.expectedTime || 'Any Time'}
                                                            </div>
                                                            <Trash2 size={18} color="#f43f5e" style={{ cursor: 'pointer', background: 'rgba(244,63,94,0.1)', padding: '4px', borderRadius: '4px' }} onClick={() => handleRemoveStop(i)} />
                                                        </div>
                                                    </motion.div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px', marginTop: '40px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
                                    <button type="button" className="btn-secondary" style={{ padding: '12px 25px', borderRadius: '10px' }} onClick={() => setShowModal(false)}>Cancel</button>
                                    <button type="submit" className="btn-primary" style={{ padding: '12px 25px', borderRadius: '10px' }}>Save Route Setup</button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <style>{`
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

export default Routes;

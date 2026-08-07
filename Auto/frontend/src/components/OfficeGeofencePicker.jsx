import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

const OfficeGeofencePicker = ({ value, onChange }) => {
    const [address, setAddress] = useState(value?.address || '');
    const [coords, setCoords] = useState({ lat: value?.latitude || 22.3, lng: value?.longitude || 73.1 });

    const handleGetLocation = () => {
        if (!navigator.geolocation) {
            alert('Geolocation not supported by your browser');
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                setCoords({ lat, lng });
                const newAddress = `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`;
                setAddress(newAddress);
                if (onChange) {
                    onChange({
                        latitude: lat,
                        longitude: lng,
                        address: newAddress,
                        radius: 200
                    });
                }
            },
            (err) => alert('Error getting location: ' + err.message)
        );
    };

    const handleChange = (e) => {
        setAddress(e.target.value);
        if (onChange) {
            onChange({
                latitude: coords.lat,
                longitude: coords.lng,
                address: e.target.value,
                radius: 200
            });
        }
    };

    return (
        <div className="premium-input-group">
            <label className="premium-label">Office Location / Geofence</label>
            <div style={{ display: 'flex', gap: '10px' }}>
                <input 
                    type="text" 
                    value={address} 
                    onChange={handleChange}
                    placeholder="Enter Address"
                    className="premium-compact-input"
                    style={{ flex: 1, height: '56px', fontSize: '15px', fontWeight: '700' }}
                />
                <button 
                    type="button"
                    onClick={handleGetLocation}
                    title="Get Current Location"
                    style={{ 
                        height: '56px', width: '56px', borderRadius: '16px', 
                        background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                        display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer',
                        color: 'var(--primary)'
                    }}
                >
                    <MapPin size={24} />
                </button>
            </div>
        </div>
    );
};

export default OfficeGeofencePicker;

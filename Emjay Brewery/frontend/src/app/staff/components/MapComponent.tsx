'use client';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';

const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const MapUpdater = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 15);
  }, [center, map]);
  return null;
};

export default function MapComponent({ lat, lng, radius, onChangeLocation }: any) {
  const [position, setPosition] = useState<[number, number]>([lat, lng]);

  useEffect(() => {
    setPosition([lat, lng]);
  }, [lat, lng]);

  return (
    <>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <div className="w-full h-full rounded-xl overflow-hidden border border-gray-200">
        <MapContainer center={position} zoom={15} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker 
            position={position} 
            draggable={true}
            icon={customIcon}
            eventHandlers={{
              dragend: (e) => {
                const marker = e.target;
                const pos = marker.getLatLng();
                onChangeLocation(pos.lat, pos.lng);
              },
            }}
          />
          <Circle center={position} radius={radius} pathOptions={{ color: '#4f46e5', fillColor: '#4f46e5', fillOpacity: 0.2 }} />
          <MapUpdater center={position} />
        </MapContainer>
      </div>
    </>
  );
}

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Navigation } from 'lucide-react';
import L from 'leaflet';

// Fix for default Leaflet marker icons in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Component to recenter map when coordinates change
function RecenterMap({ lat, lng }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng, map]);
  return null;
}

export function HospitalMap({ userLocation, hospitals }) {
  if (!userLocation) return (
    <div className="h-64 w-full bg-gray-100 rounded-xl flex items-center justify-center animate-pulse">
      <span className="text-gray-500">Loading Map Data...</span>
    </div>
  );

  return (
    <div className="h-[400px] w-full rounded-xl overflow-hidden shadow-lg border border-gray-200 z-0 relative">
      <MapContainer 
        center={[userLocation.lat, userLocation.lng]} 
        zoom={13} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* User Location Marker */}
        <Marker position={[userLocation.lat, userLocation.lng]}>
          <Popup>
            <div className="text-center">
              <strong>You are here</strong>
            </div>
          </Popup>
        </Marker>

        {/* Hospital Markers */}
        {hospitals.map((hospital) => (
          <Marker 
            key={hospital.id} 
            position={[hospital.lat, hospital.lng]}
          >
            <Popup>
              <div className="p-1">
                <h3 className="font-bold text-sm">{hospital.name}</h3>
                <p className="text-xs text-gray-500 capitalize">{hospital.type}</p>
                <p className="text-xs font-medium mt-1">{hospital.distance} km away</p>
                <a 
                  href={`https://www.google.com/maps/dir/?api=1&destination=${hospital.lat},${hospital.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-2 text-center bg-blue-600 text-white text-xs py-1 px-2 rounded hover:bg-blue-700"
                >
                  Get Directions
                </a>
              </div>
            </Popup>
          </Marker>
        ))}

        <RecenterMap lat={userLocation.lat} lng={userLocation.lng} />
      </MapContainer>
    </div>
  );
}

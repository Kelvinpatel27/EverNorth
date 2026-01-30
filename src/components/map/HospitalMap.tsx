import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { Hospital } from '../../types';
import { getAvailabilityInfo } from '../../utils/availability';

interface Props {
  hospitals: Hospital[];
  userLocation: { lat: number; lng: number };
}
const getMarkerColor = (status: string) => {
  switch (status) {
    case 'available':
      return '#16a34a'; // green
    case 'limited':
      return '#ca8a04'; // yellow
    case 'full':
      return '#dc2626'; // red
    default:
      return '#2563eb'; // fallback blue
  }
};
const getAvailabilityStatus = (hospital: any) => {
  const { status, available, total } = getAvailabilityInfo(hospital);
  return status;
  
};

const HospitalMap: React.FC<Props> = ({ hospitals, userLocation }) => {
  return (
    <MapContainer
      center={[userLocation.lat, userLocation.lng]}
      zoom={11}
      className="h-full w-full rounded-lg"
    >
      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* User location */}
      <CircleMarker
        center={[userLocation.lat, userLocation.lng]}
        radius={8}
        pathOptions={{
          color: '#2563eb',
          fillColor: '#3b82f6',
          fillOpacity: 0.9,
        }}
      >
        <Popup>Your Location</Popup>
      </CircleMarker>

      {/* Hospital markers */}
      {hospitals.map(hospital => {
        const status = getAvailabilityStatus(hospital);
        const color = getMarkerColor(status);
        const totalAvailable = Object.values(hospital.beds).reduce(
          (sum: number, bed: any) => sum + bed.available,
          0
        );

        return (
          <CircleMarker
            key={hospital.id}
            center={[
              hospital.coordinates.lat,
              hospital.coordinates.lng,
            ]}
            radius={10}
            pathOptions={{
              color,
              fillColor: color,
              fillOpacity: 0.8,
              weight: 2,
            }}
          >
            <Popup>
              <div className="space-y-1">
                <strong>{hospital.name}</strong>
                <div>Status: <b>{status.toUpperCase()}</b></div>
                <div>Available Beds: {totalAvailable}</div>
                <div>Wait Time: {hospital.waitTime} min</div>
              </div>
            </Popup>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
};

export default HospitalMap;

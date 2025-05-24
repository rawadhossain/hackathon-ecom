'use client';

import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import L from 'leaflet';

// Fix for default marker icons in Leaflet with Next.js
const DefaultIcon = L.icon({
	iconUrl: '/images/marker-icon.png',
	iconRetinaUrl: '/images/marker-icon-2x.png',
	shadowUrl: '/images/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Component to handle map click events
function MapClickHandler({ onLocationSelect }) {
	useMapEvents({
		click: (e) => {
			onLocationSelect(e.latlng);
		},
	});
	return null;
}

const InteractiveMap = ({
	initialPosition = [51.505, -0.09], // Default position (London)
	initialZoom = 13,
	onLocationSelect,
	markers = [],
	height = '400px',
	width = '100%',
}) => {
	const [selectedLocation, setSelectedLocation] = useState(null);

	const handleLocationSelect = (latlng) => {
		setSelectedLocation(latlng);
		if (onLocationSelect) {
			onLocationSelect(latlng);
		}
	};

	return (
		<div style={{ height, width, position: 'relative' }}>
			<MapContainer
				center={initialPosition}
				zoom={initialZoom}
				style={{ height: '100%', width: '100%' }}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>

				<MapClickHandler onLocationSelect={handleLocationSelect} />

				{/* Render existing markers */}
				{markers.map((marker, index) => (
					<Marker key={index} position={[marker.lat, marker.lng]}>
						<Popup>
							{marker.title || 'Selected Location'}
							{marker.description && <br />}
							{marker.description}
						</Popup>
					</Marker>
				))}

				{/* Render selected location marker */}
				{selectedLocation && (
					<Marker position={[selectedLocation.lat, selectedLocation.lng]}>
						<Popup>
							Selected Location
							<br />
							Lat: {selectedLocation.lat.toFixed(6)}
							<br />
							Lng: {selectedLocation.lng.toFixed(6)}
						</Popup>
					</Marker>
				)}
			</MapContainer>
		</div>
	);
};

export default InteractiveMap;

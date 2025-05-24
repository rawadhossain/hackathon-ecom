'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import L from 'leaflet';

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

// MapController updates map view on prop change
function MapController({ center, zoom }) {
	const map = useMap();
	useEffect(() => {
		if (center?.lat && center?.lng) {
			map.setView([center.lat, center.lng], zoom);
		}
	}, [center, zoom, map]);
	return null;
}

// Handles user clicks on map
function ClickHandler({ onLocationSelect }) {
	useMapEvents({
		click(e) {
			const { lat, lng } = e.latlng;
			if (onLocationSelect) {
				onLocationSelect({ lat, lng });
			}
		},
	});
	return null;
}

export default function InteractiveMap({
	latitude = 23.875854,
	longitude = 90.379547,
	initialZoom = 15,
	height = '400px',
	width = '100%',
	onLocationSelect, // ✅ now used
}) {
	const [mapCenter, setMapCenter] = useState({ lat: latitude, lng: longitude });

	useEffect(() => {
		setMapCenter({ lat: latitude, lng: longitude });
	}, [latitude, longitude]);

	return (
		<div style={{ height, width }}>
			<MapContainer
				center={[mapCenter.lat, mapCenter.lng]}
				zoom={initialZoom}
				style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
			>
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				/>

				<MapController center={mapCenter} zoom={initialZoom} />
				<ClickHandler onLocationSelect={onLocationSelect} />

				<Marker position={[mapCenter.lat, mapCenter.lng]}>
					<Popup>
						Lat: {mapCenter.lat.toFixed(6)} <br />
						Lng: {mapCenter.lng.toFixed(6)}
					</Popup>
				</Marker>
			</MapContainer>
		</div>
	);
}

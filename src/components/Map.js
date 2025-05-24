// components/Map.js
'use client';
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const Map = ({ initialLatitude, initialLongitude, onLocationSelect }) => {
	const [position, setPosition] = useState([initialLatitude, initialLongitude]);

	useEffect(() => {
		// Ensure Leaflet CSS is included
		import('leaflet/dist/leaflet.css');
	}, []);

	const handleDragEnd = (event) => {
		const { lat, lng } = event.target.getLatLng();
		setPosition([lat, lng]);
		onLocationSelect(lat, lng); // Pass updated location to parent
	};

	return (
		<MapContainer
			center={position}
			zoom={14}
			style={{ width: '100%', height: '500px' }} // Map container style
			whenCreated={(map) => map.on('dragend', handleDragEnd)}
		>
			{/* OpenStreetMap tile layer */}
			<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

			{/* Marker */}
			<Marker position={position} draggable={true}>
				<Popup>Drag me to select a location</Popup>
			</Marker>
		</MapContainer>
	);
};

export default Map;

'use client';

import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react';
import L from 'leaflet';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation } from 'lucide-react';

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

// Component to handle map centering
function MapController({ center, zoom }) {
	const map = useMap();

	useEffect(() => {
		map.setView(center, zoom);
	}, [center, zoom, map]);

	return null;
}

const InteractiveMap = ({
	initialPosition = [23.875854, 90.379547], // Default position (Dhaka)
	initialZoom = 15,
	onLocationSelect,
	markers = [],
	height = '400px',
	width = '100%',
}) => {
	const [selectedLocation, setSelectedLocation] = useState(null);
	const [currentLocation, setCurrentLocation] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleLocationSelect = (latlng) => {
		setSelectedLocation(latlng);
		if (onLocationSelect) {
			onLocationSelect(latlng);
		}
	};

	const getCurrentLocation = () => {
		setIsLoading(true);
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					const newLocation = { lat: latitude, lng: longitude };
					setCurrentLocation(newLocation);
					setSelectedLocation(newLocation);
					if (onLocationSelect) {
						onLocationSelect(newLocation);
					}
					setIsLoading(false);
				},
				(error) => {
					console.error('Error getting location:', error);
					setIsLoading(false);
				}
			);
		} else {
			console.error('Geolocation is not supported by this browser.');
			setIsLoading(false);
		}
	};

	return (
		<div className="relative" style={{ height, width }}>
			<div className="absolute top-4 right-4 z-[1000] flex gap-2">
				<Button
					variant="secondary"
					size="icon"
					onClick={getCurrentLocation}
					disabled={isLoading}
					className="bg-white hover:bg-gray-100 shadow-md"
				>
					<Navigation className="h-4 w-4" />
				</Button>
			</div>

			<MapContainer
				center={initialPosition}
				zoom={initialZoom}
				style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
				className="shadow-lg"
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>

				<MapClickHandler onLocationSelect={handleLocationSelect} />
				<MapController center={currentLocation || initialPosition} zoom={initialZoom} />

				{/* Render existing markers */}
				{markers.map((marker, index) => (
					<Marker key={index} position={[marker.lat, marker.lng]}>
						<Popup>
							<div className="p-1">
								<h3 className="font-semibold">
									{marker.title || 'Selected Location'}
								</h3>
								{marker.description && (
									<p className="text-sm text-gray-600 mt-1">
										{marker.description}
									</p>
								)}
							</div>
						</Popup>
					</Marker>
				))}

				{/* Render selected location marker */}
				{selectedLocation && (
					<Marker position={[selectedLocation.lat, selectedLocation.lng]}>
						<Popup>
							<div className="p-1">
								<h3 className="font-semibold">Selected Location</h3>
								<p className="text-sm text-gray-600 mt-1">
									Lat: {selectedLocation.lat.toFixed(6)}
									<br />
									Lng: {selectedLocation.lng.toFixed(6)}
								</p>
							</div>
						</Popup>
					</Marker>
				)}
			</MapContainer>
		</div>
	);
};

export default InteractiveMap;

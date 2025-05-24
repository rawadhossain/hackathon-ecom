'use client';

import { useState } from 'react';
import InteractiveMap from '@/components/Map/InteractiveMap';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MapTestPage = () => {
	const [selectedLocation, setSelectedLocation] = useState(null);

	// Example campus landmarks
	const campusLandmarks = [
		{
			lat: 51.505,
			lng: -0.09,
			title: 'Main Library',
			description: 'A quiet place for exchanges',
		},
		{
			lat: 51.51,
			lng: -0.1,
			title: 'Student Center',
			description: 'Busy area with security cameras',
		},
		{
			lat: 51.515,
			lng: -0.095,
			title: 'Campus Cafe',
			description: 'Public space with staff present',
		},
	];

	const handleLocationSelect = (latlng) => {
		setSelectedLocation(latlng);
	};

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Campus Map for Safe Meetups</h1>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<Card>
					<CardHeader>
						<CardTitle>Interactive Campus Map</CardTitle>
					</CardHeader>
					<CardContent>
						<InteractiveMap
							initialPosition={[51.505, -0.09]}
							initialZoom={15}
							onLocationSelect={handleLocationSelect}
							markers={campusLandmarks}
							height="500px"
						/>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Selected Location</CardTitle>
					</CardHeader>
					<CardContent>
						{selectedLocation ? (
							<div className="space-y-2">
								<p>
									<strong>Latitude:</strong> {selectedLocation.lat.toFixed(6)}
								</p>
								<p>
									<strong>Longitude:</strong> {selectedLocation.lng.toFixed(6)}
								</p>
								<p className="text-sm text-muted-foreground">
									Click on the map to select a different location
								</p>
							</div>
						) : (
							<p className="text-muted-foreground">
								Click on the map to select a meetup location
							</p>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default MapTestPage;

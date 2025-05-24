'use client';

import { useState } from 'react';
import InteractiveMap from '@/components/Map/InteractiveMap';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Navigation, Info } from 'lucide-react';

const MapTestPage = () => {
	const [selectedLocation, setSelectedLocation] = useState(null);

	// Example campus landmarks in Dhaka
	const campusLandmarks = [
		{
			lat: 23.875854,
			lng: 90.379547,
			title: 'University of Dhaka',
			description: 'Main campus area with high security and surveillance',
		},
		{
			lat: 23.877854,
			lng: 90.381547,
			title: 'Central Library',
			description: 'Quiet and secure location with staff presence',
		},
		{
			lat: 23.873854,
			lng: 90.377547,
			title: 'Student Center',
			description: 'Public space with high foot traffic and security cameras',
		},
	];

	const handleLocationSelect = (latlng) => {
		setSelectedLocation(latlng);
	};

	return (
		<div className="container mx-auto p-4 max-w-7xl">
			<div className="mb-8">
				<h1 className="text-3xl font-bold mb-2">Campus Map for Safe Meetups</h1>
				<p className="text-muted-foreground">
					Select a safe location for your meetup or use your current location
				</p>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<div className="lg:col-span-2">
					<Card className="overflow-hidden">
						<CardHeader className="bg-muted/50">
							<CardTitle className="flex items-center gap-2">
								<MapPin className="h-5 w-5" />
								Interactive Campus Map
							</CardTitle>
						</CardHeader>
						<CardContent className="p-0">
							<InteractiveMap
								initialPosition={[23.875854, 90.379547]}
								initialZoom={16}
								onLocationSelect={handleLocationSelect}
								markers={campusLandmarks}
								height="600px"
							/>
						</CardContent>
					</Card>
				</div>

				<div className="space-y-6">
					<Card>
						<CardHeader className="bg-muted/50">
							<CardTitle className="flex items-center gap-2">
								<Navigation className="h-5 w-5" />
								Selected Location
							</CardTitle>
						</CardHeader>
						<CardContent>
							{selectedLocation ? (
								<div className="space-y-3">
									<div className="p-3 bg-muted/30 rounded-lg">
										<p className="text-sm font-medium">Coordinates</p>
										<p className="text-sm text-muted-foreground">
											Lat: {selectedLocation.lat.toFixed(6)}
											<br />
											Lng: {selectedLocation.lng.toFixed(6)}
										</p>
									</div>
									<p className="text-sm text-muted-foreground">
										Click on the map to select a different location
									</p>
								</div>
							) : (
								<div className="text-center py-4">
									<p className="text-muted-foreground">
										Click on the map or use the location button to select a
										meetup location
									</p>
								</div>
							)}
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default MapTestPage;

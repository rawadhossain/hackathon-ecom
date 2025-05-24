'use client';

import React, { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { ArrowUpWideNarrow } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ListingsHome = () => {
	const [listings, setListings] = useState([]);
	const [filter, setFilter] = useState('all');

	// Fetching List
	useEffect(() => {
		const fetchListings = async () => {
			try {
				const res = await fetch('/api/listings');
				if (!res.ok) throw new Error('Failed to fetch listings');
				const data = await res.json();
				setListings(data);
			} catch (error) {
				console.error('Error loading listings:', error);
			}
		};

		fetchListings();
	}, []);

	const filteredListings = listings.filter((listing) => {
		if (filter === 'all') return true;
		if (filter === 'fixed') return listing.pricingType === 'FIXED';
		if (filter === 'bidding') return listing.pricingType === 'BID';
		if (filter === 'service') return listing.pricingType === 'HOURLY';
		return true;
	});

	console.log(filteredListings);
	return (
		<>
			<div className="flex justify-between mx-5 my-5 items-center">
				<h1 className="text-2xl font-bold ">View All Listings</h1>
				<ArrowUpWideNarrow />
			</div>

			<div className="mx-5 my-2 space-x-2">
				<Button className="bg-foregroundCustom" onClick={() => setFilter('all')}>
					Filter
				</Button>
				<Button
					className="bg-white text-black hover:bg-foregroundCustom hover:text-white"
					onClick={() => setFilter('fixed')}
				>
					Fixed Sales
				</Button>
				<Button
					className="bg-white text-black hover:bg-foregroundCustom hover:text-white"
					onClick={() => setFilter('bidding')}
				>
					Biddings
				</Button>
				<Button
					className="bg-white text-black hover:bg-foregroundCustom hover:text-white"
					onClick={() => setFilter('service')}
				>
					Services
				</Button>
			</div>

			<div className="flex flex-wrap justify-center">
				{filteredListings.map((listing) => (
					<ProductCard
						key={listing.id}
						imageUrl={listing.imageUrls[0] || '/fallback-image.jpg'}
						rating={4.5} // Placeholder
						reviews={50} // Placeholder
						seller={listing.seller?.name || 'Unknown Seller'}
						title={listing.title}
						price={listing.price}
						originalPrice={listing.price * 1.1}
						date={new Date(listing.createdAt)}
						institute={listing.university}
						location={listing.meetupLocation || 'N/A'}
					/>
				))}
			</div>
		</>
	);
};

export default ListingsHome;

'use client';

import React, { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { ArrowUpWideNarrow } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ListingsHome = () => {
	const [listings, setListings] = useState([]);

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

	console.log(listings);
	return (
		<>
			<div className="flex justify-between mx-5 my-5 items-center">
				<h1 className="text-2xl font-bold ">View All Listings</h1>
				<ArrowUpWideNarrow />
			</div>

			<div className="mx-5 my-2 space-x-2">
				<Button className="bg-foregroundCustom">Filter</Button>
				<Button className="bg-white text-black hover:bg-foregroundCustom hover:text-white">
					Fixed Sales
				</Button>
				<Button className="bg-white text-black hover:bg-foregroundCustom hover:text-white">
					Biddings
				</Button>
				<Button className="bg-white text-black hover:bg-foregroundCustom hover:text-white">
					Services
				</Button>
			</div>

			<div className="flex flex-wrap justify-center">
				{listings.map((listing) => (
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

'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import InteractiveMap from '@/components/Map/InteractiveMap';

function NumberWithCommas({ value }) {
	const formattedValue = value.toLocaleString();

	return <span>{formattedValue}</span>;
}

const formatDateAgo = (date) => {
	const now = new Date();
	const seconds = Math.floor((now - date) / 1000);

	if (seconds < 60) {
		return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
	}

	const minutes = Math.floor(seconds / 60);
	if (minutes < 60) {
		return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
	}

	const hours = Math.floor(minutes / 60);
	if (hours < 24) {
		return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
	}

	const days = Math.floor(hours / 24);
	if (days < 7) {
		return `${days} day${days !== 1 ? 's' : ''} ago`;
	}

	// Return formatted full date if more than 7 days
	return date.toLocaleDateString('en-US', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	}); // e.g. "4 July, 2025"
};

export default function ProductPage() {
	const { id } = useParams();
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!id) return;

		async function fetchProduct() {
			setLoading(true);
			setError(null);

			try {
				const response = await fetch(`/api/product?id=${id}`, { cache: 'no-store' });
				if (!response.ok) {
					throw new Error(`Failed to fetch product: ${response.status}`);
				}
				const data = await response.json();
				setProduct(data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		}

		fetchProduct();
	}, [id]);

	if (loading) return <div>Loading product...</div>;
	if (error) return <div>Error loading product: {error}</div>;
	if (!product) return <div>Product not found</div>;

	console.log(product);

	let latitude = null;
	let longitude = null;

	if (product.meetupLocation && product.meetupLocation.includes(',')) {
		const [latStr, lngStr] = product.meetupLocation.split(',');
		latitude = parseFloat(latStr);
		longitude = parseFloat(lngStr);
	}
	console.log(product.meetupLocation);
	return (
		<div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
			{/* Images */}
			<div>
				<div className="bg-gray-100 rounded-xl flex items-center justify-center h-[350px]">
					<img
						src={product.imageUrls[0]}
						alt={product.title}
						className="object-contain h-[300px]"
					/>
				</div>
				<div className="flex gap-2 mt-4">
					{product.imageUrls.map((img, i) => (
						<img
							key={i}
							src={img}
							alt={`${product.title} - Image ${i + 1}`}
							className="w-16 h-16 object-cover rounded-lg border"
						/>
					))}
				</div>
			</div>

			{/* Details */}
			<div>
				<div className="mb-2 text-xs text-gray-500">{product.category}</div>
				<h1 className="text-2xl font-bold mb-2">{product.title}</h1>
				<div className="flex items-center gap-2 mb-2">
					<span className="text-yellow-500">
						{'★'.repeat(Math.round(product.rating))}
					</span>
					<span className="text-gray-600 text-sm">{product.reviewCount} reviews</span>
				</div>
				<div className="text-3xl font-bold mb-4">
					<span className="font-extrabold mr-2 text-3xl">৳</span>
					<NumberWithCommas value={product.price} />
				</div>

				{/* Seller Info */}
				<div className="flex items-center gap-2 mb-4">
					<img
						src={product.seller.imageUrl}
						alt={product.seller.username}
						className="w-8 h-8 rounded-full"
					/>
					<span className="text-sm text-gray-600">Sold by {product.seller.username}</span>
				</div>

				{/* Condition and Type */}
				<div className="mb-4">
					<div className="flex gap-4 text-sm">
						<span className="text-gray-600">
							Condition:{' '}
							<span className="font-medium">
								{product.condition || 'Not specified'}
							</span>
						</span>
						<span className="text-gray-600">
							Type: <span className="font-medium">{product.type}</span>
						</span>
					</div>
				</div>

				{/* University */}
				<div className="mb-4">
					<span className="text-sm text-gray-600">University: {product.university}</span>
				</div>

				{/* Meetup Location */}
				{product.meetupLocation && (
					<div className="mb-4">
						<span className="text-sm text-gray-600">
							{/* Meetup Location: {product.meetupLocation} */}

							{latitude && longitude && (
								<div className="mt-2">
									<InteractiveMap latitude={latitude} longitude={longitude} />
								</div>
							)}
						</span>
					</div>
				)}

				<Button className="w-full mb-2" disabled={product.status !== 'ACTIVE'}>
					{product.status === 'ACTIVE' ? 'Contact Seller' : 'Not Available'}
				</Button>

				{/* Description */}
				<div className="mb-6">
					<h3 className="font-semibold mb-2">Description</h3>
					<p className="text-gray-600 text-sm">{product.description}</p>
				</div>

				{/* Reviews */}
				{product.reviews.length > 0 && (
					<div className="flex gap-8">
						<div className="flex-1">
							{product.reviews.map((review, i) => (
								<div key={i} className="mb-4">
									<div className="flex items-center gap-2 mb-1">
										<div className="w-8 h-8 rounded-full bg-gray-200" />
										<div className="font-semibold text-sm">{review.user}</div>
										<div className="text-xs text-gray-400">{review.date}</div>
									</div>
									<div className="flex items-center gap-1 text-yellow-500 text-sm mb-1">
										{'★'.repeat(review.rating)}
									</div>
									<div className="text-gray-700 text-sm">{review.comment}</div>
								</div>
							))}
						</div>
						<div className="w-40">
							<div className="flex items-center gap-2 mb-2">
								<span className="text-3xl font-bold">
									{product.rating.toFixed(1)}
								</span>
								<span className="text-yellow-500">★</span>
							</div>
							<div className="text-xs text-gray-500 mb-2">
								{product.reviewCount} reviews
							</div>
							{Object.entries(product.ratingBreakdown).map(([star, count]) => (
								<div key={star} className="flex items-center gap-2 mb-1">
									<span className="w-4">{star}</span>
									<div className="flex-1 bg-gray-200 rounded h-2 mx-1">
										<div
											className="bg-yellow-400 h-2 rounded"
											style={{
												width: `${(count / product.reviewCount) * 100}%`,
											}}
										/>
									</div>
									<span className="w-6 text-right">{count}</span>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

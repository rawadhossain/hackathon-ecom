'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import InteractiveMap from '@/components/Map/InteractiveMap';
import ReviewForm from '@/components/ReviewForm';

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

// Sample reviews data and randomizer
const sampleReviews = [
	{
		id: 1,
		user: 'Sarah Johnson',
		rating: 5,
		comment: 'Excellent product! Exactly as described and the seller was very responsive.',
		date: '2024-03-15',
		avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
	},
	{
		id: 2,
		user: 'Rahim K.',
		rating: 4,
		comment: 'Good quality, fast delivery. Would recommend!',
		date: '2024-03-14',
		avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
	},
	{
		id: 3,
		user: 'Hasan A.',
		rating: 5,
		comment: 'Perfect condition, great communication with the seller.',
		date: '2024-03-13',
		avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
	},
	{
		id: 4,
		user: 'David Kim',
		rating: 3,
		comment: 'Product was okay, but shipping took longer than expected.',
		date: '2024-03-12',
		avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
	},
	{
		id: 5,
		user: 'John Doe',
		rating: 5,
		comment: 'Amazing deal! The product exceeded my expectations.',
		date: '2024-03-11',
		avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
	},
	{
		id: 6,
		user: 'Kazi Badrul',
		rating: 4,
		comment: 'Very satisfied with the purchase. Good value for money.',
		date: '2024-03-10',
		avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
	},
];

function getRandomReviews(productId, count = 4) {
	// Use productId as seed for randomization
	const seed = parseInt(productId, 10) || 0;
	const shuffled = [...sampleReviews].sort(() => 0.5 - Math.sin(seed));
	return shuffled.slice(0, count);
}

export default function ProductPage() {
	const { id } = useParams();
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [sellerAvatar, setSellerAvatar] = useState(null);
	const [reviews, setReviews] = useState([]);

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

	useEffect(() => {
		if (!product?.seller?.clerkUserId) return;

		async function fetchSellerAvatar() {
			try {
				const res = await fetch(`/api/user/image?userId=${product.seller.clerkUserId}`);
				if (!res.ok) throw new Error('Failed to fetch seller avatar');

				const data = await res.json();
				setSellerAvatar(data.avatar);
			} catch (err) {
				console.error(err);
			}
		}

		fetchSellerAvatar();
	}, [product?.seller?.clerkUserId]);

	// When product id changes, get random reviews
	useEffect(() => {
		if (id) {
			setReviews(getRandomReviews(id, 4));
		}
	}, [id]);

	// Add new review to the top
	const handleReviewSubmit = (review) => {
		setReviews((prev) => [review, ...prev]);
	};

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
		<div>
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
						{/* <span className="text-gray-600 text-sm">{product.reviewCount} reviews</span> */}
					</div>
					<div className="text-3xl font-bold mb-4">
						<span className="font-extrabold mr-2 text-3xl">৳</span>
						<NumberWithCommas value={product.price} />
					</div>

					{/* Seller Info */}
					<div className="flex items-center gap-2 mb-4">
						<img
							src={sellerAvatar}
							alt={product.seller.username}
							className="w-8 h-8 rounded-full"
						/>
						<span className="text-sm text-gray-600">Sold by {product.seller.name}</span>
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
						<span className="text-sm text-gray-600">
							University: <p className="font-medium">{product.university}</p>
						</span>
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
				</div>
			</div>
			{/* End of main grid */}

			{/* Reviews Section - now full width below product grid */}
			<div className="bg-white rounded-xl shadow p-6 mt-12 max-w-5xl mx-auto">
				<h3 className="text-xl font-bold mb-4">Reviews</h3>
				<ReviewForm productId={id} onReviewSubmit={handleReviewSubmit} />
				<div className="mt-6">
					{reviews.length === 0 && (
						<div className="text-gray-500">No reviews yet. Be the first to review!</div>
					)}
					{reviews.map((review, i) => (
						<div key={i} className="mb-6 border-b pb-4">
							<div className="flex items-center gap-3 mb-1">
								<img
									src={review.avatar}
									alt={review.user}
									className="w-8 h-8 rounded-full object-cover border"
								/>
								<div className="font-semibold text-sm">{review.user}</div>
								<div className="text-xs text-gray-400">{review.date}</div>
							</div>
							<div className="flex items-center gap-1 text-yellow-500 text-base mb-1">
								{'★'.repeat(review.rating)}
								{'☆'.repeat(5 - review.rating)}
							</div>
							<div className="text-gray-700 text-sm">{review.comment}</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';

async function getProduct(id) {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product?id=${id}`, {
			cache: 'no-store',
		});

		if (!response.ok) {
			if (response.status === 404) {
				return null;
			}
			throw new Error('Failed to fetch product');
		}

		return response.json();
	} catch (error) {
		console.error('Error fetching product:', error);
		throw error;
	}
}

export default async function ProductPage({ params }) {
	try {
		const product = await getProduct(params.id);
		if (!product) return notFound();

		return (
			<div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
				{/* Images */}
				<div>
					<div className="bg-gray-100 rounded-xl flex items-center justify-center h-[350px]">
						<img
							src={product.images[0]}
							alt={product.title}
							className="object-contain h-[300px]"
						/>
					</div>
					<div className="flex gap-2 mt-4">
						{product.images.map((img, i) => (
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
					<div className="text-3xl font-bold mb-4">${product.price.toFixed(2)}</div>

					{/* Seller Info */}
					<div className="flex items-center gap-2 mb-4">
						<img
							src={product.seller.imageUrl}
							alt={product.seller.username}
							className="w-8 h-8 rounded-full"
						/>
						<span className="text-sm text-gray-600">
							Sold by {product.seller.username}
						</span>
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
							University: {product.university}
						</span>
					</div>

					{/* Meetup Location */}
					{product.meetupLocation && (
						<div className="mb-4">
							<span className="text-sm text-gray-600">
								Meetup Location: {product.meetupLocation}
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
											<div className="font-semibold text-sm">
												{review.user}
											</div>
											<div className="text-xs text-gray-400">
												{review.date}
											</div>
										</div>
										<div className="flex items-center gap-1 text-yellow-500 text-sm mb-1">
											{'★'.repeat(review.rating)}
										</div>
										<div className="text-gray-700 text-sm">
											{review.comment}
										</div>
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
													width: `${
														(count / product.reviewCount) * 100
													}%`,
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
	} catch (error) {
		console.error('Error loading product:', error);
		return notFound();
	}
}

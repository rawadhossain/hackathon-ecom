import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
// import { getProductById } from '@/lib/products'; // You should implement this util

// Placeholder for fetching product data
async function getProductById(id) {
	// Replace with real DB call
	return {
		id,
		title: 'Shoes Reebok Zig Kinetica 3',
		brand: 'Reebok',
		price: 199.0,
		images: [
			'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/1c7e2e2e-2e2e-4e2e-8e2e-2e2e2e2e2e2e/air-max-90-shoes.png',
			'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/2c7e2e2e-2e2e-4e2e-8e2e-2e2e2e2e2e2e/air-max-90-shoes.png',
			'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/3c7e2e2e-2e2e-4e2e-8e2e-2e2e2e2e2e2e/air-max-90-shoes.png',
		],
		colors: ['White', 'Black', 'Grey'],
		sizes: ['40.5', '41', '42', '43', '44'],
		selectedColor: 'White',
		selectedSize: '41',
		reviews: [
			{
				user: 'Helen M.',
				date: 'Yesterday',
				rating: 5,
				comment: 'Excellent running shoes. It turns very sharply on the foot.',
			},
			{
				user: 'Ann D.',
				date: '2 days ago',
				rating: 5,
				comment: 'Very comfortable and stylish.',
			},
		],
		rating: 4.8,
		ratingBreakdown: { 5: 28, 4: 9, 3: 4, 2: 1, 1: 1 },
		reviewCount: 42,
	};
}

export default async function ProductPage({ params }) {
	const { id } = await params;
	const product = await getProductById(id);
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
							alt={product.title + ' thumb'}
							className="w-16 h-16 object-cover rounded-lg border"
						/>
					))}
					{product.images.length < 5 && (
						<div className="w-16 h-16 flex items-center justify-center border rounded-lg bg-gray-50 text-gray-400 text-sm">
							+{5 - product.images.length} more
						</div>
					)}
				</div>
			</div>

			{/* Details */}
			<div>
				<div className="mb-2 text-xs text-gray-500">{product.brand}</div>
				<h1 className="text-2xl font-bold mb-2">{product.title}</h1>
				<div className="flex items-center gap-2 mb-2">
					<span className="text-yellow-500">
						{'★'.repeat(Math.round(product.rating))}
					</span>
					<span className="text-gray-600 text-sm">{product.reviewCount} reviews</span>
				</div>
				<div className="text-3xl font-bold mb-4">${product.price.toFixed(2)}</div>
				<div className="mb-4">
					<div className="mb-1 text-sm">Color</div>
					<div className="flex gap-2">
						{product.colors.map((color) => (
							<button
								key={color}
								className={`w-8 h-8 rounded-full border-2 ${
									color === product.selectedColor
										? 'border-black'
										: 'border-gray-200'
								}`}
								style={{ background: color.toLowerCase() }}
								aria-label={color}
							/>
						))}
					</div>
				</div>
				<div className="mb-4">
					<div className="mb-1 text-sm">Size</div>
					<div className="flex gap-2 flex-wrap">
						{product.sizes.map((size) => (
							<button
								key={size}
								className={`px-3 py-1 rounded border ${
									size === product.selectedSize
										? 'bg-black text-white'
										: 'bg-white border-gray-200'
								}`}
							>
								{size}
							</button>
						))}
					</div>
				</div>
				<Button className="w-full mb-2">Add to cart</Button>
				<div className="text-xs text-gray-500 mb-4">Free delivery on orders over $30.0</div>
				{/* Tabs */}
				<div className="border-b flex gap-6 mb-4">
					<button className="py-2 border-b-2 border-black font-semibold">Details</button>
					<button className="py-2 text-gray-500">Reviews</button>
					<button className="py-2 text-gray-500">Discussion</button>
				</div>
				{/* Reviews */}
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
							<span className="text-3xl font-bold">{product.rating}</span>
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
										style={{ width: `${(count / product.reviewCount) * 100}%` }}
									/>
								</div>
								<span className="w-6 text-right">{count}</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

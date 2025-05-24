import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { currentUser } from '@clerk/nextjs/server';

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const id = searchParams.get('id');

		if (!id) {
			return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
		}

		const user = await currentUser();
		if (!user) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const product = await prisma.listing.findUnique({
			where: {
				id: id,
			},
			include: {
				seller: {
					select: {
						id: true,
						username: true,
						imageUrl: true,
					},
				},
				reviews: {
					include: {
						user: {
							select: {
								username: true,
								imageUrl: true,
							},
						},
					},
					orderBy: {
						createdAt: 'desc',
					},
				},
			},
		});

		if (!product) {
			return NextResponse.json({ error: 'Product not found' }, { status: 404 });
		}

		// Transform the data to match the frontend expectations
		const transformedProduct = {
			id: product.id,
			title: product.title,
			description: product.description,
			price: product.price,
			images: product.imageUrls, // Using the imageUrls array from schema
			category: product.category,
			condition: product.condition,
			type: product.type,
			pricingType: product.pricingType,
			university: product.university,
			status: product.status,
			reviews:
				product.reviews?.map((review) => ({
					user: review.user?.username || 'Anonymous',
					date: new Date(review.createdAt).toLocaleDateString(),
					rating: review.rating,
					comment: review.comment,
				})) || [],
			rating:
				product.reviews?.length > 0
					? product.reviews.reduce((acc, review) => acc + review.rating, 0) /
					  product.reviews.length
					: 0,
			ratingBreakdown:
				product.reviews?.reduce((acc, review) => {
					acc[review.rating] = (acc[review.rating] || 0) + 1;
					return acc;
				}, {}) || {},
			reviewCount: product.reviews?.length || 0,
			seller: {
				id: product.seller?.id,
				username: product.seller?.username || 'Unknown Seller',
				imageUrl: product.seller?.imageUrl || '/default-avatar.png',
			},
			meetupLocation: product.meetupLocation,
			createdAt: product.createdAt,
		};

		return NextResponse.json(transformedProduct);
	} catch (error) {
		console.error('Error fetching product:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}

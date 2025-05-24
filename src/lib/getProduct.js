import { currentUser } from '@clerk/nextjs/server'; // Clerk server-side auth
import prisma from './db';

export const getProductById = async (productId) => {
	if (!productId) {
		throw new Error('Product ID is required');
	}

	try {
		const user = await currentUser();

		if (!user) {
			throw new Error('Unauthorized: You need to be logged in to view the product');
		}

		const product = await prisma.listing.findUnique({
			where: {
				id: productId,
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
				images: true,
				category: true,
			},
		});

		if (!product) {
			return null; // Return null instead of throwing error to handle 404 properly
		}

		// Transform the data to match the frontend expectations
		return {
			id: product.id,
			title: product.title,
			brand: product.brand,
			price: product.price,
			images: product.images?.map((img) => img.url) || [],
			colors: product.colors || [],
			sizes: product.sizes || [],
			selectedColor: product.selectedColor,
			selectedSize: product.selectedSize,
			reviews: product.reviews?.map((review) => ({
				user: review.user?.username || 'Anonymous',
				date: new Date(review.createdAt).toLocaleDateString(),
				rating: review.rating,
				comment: review.comment,
			})),
			rating:
				product.reviews?.length > 0
					? product.reviews.reduce((acc, review) => acc + review.rating, 0) /
					  product.reviews.length
					: 0,
			ratingBreakdown: product.reviews?.reduce((acc, review) => {
				acc[review.rating] = (acc[review.rating] || 0) + 1;
				return acc;
			}, {}),
			reviewCount: product.reviews?.length || 0,
			seller: {
				id: product.seller?.id,
				username: product.seller?.username || 'Unknown Seller',
				imageUrl: product.seller?.imageUrl || '/default-avatar.png',
			},
			category: product.category?.name,
			description: product.description || '',
			stock: product.stock || 0,
			createdAt: product.createdAt,
		};
	} catch (error) {
		console.error('Error fetching product:', error);
		throw new Error('Error fetching product by ID');
	}
};

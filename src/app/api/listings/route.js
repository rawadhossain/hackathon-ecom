import prisma from '@/lib/db';
import { currentUser } from '@clerk/nextjs/server';

export async function POST(req) {
	const user = await currentUser();

	const existing = await prisma.user.findUnique({
		where: { clerkUserId: user.id },
	});

	const userId = existing.id;

	try {
		const body = await req.json();

		// DEBUG LOGGING
		console.log('📦 Received payload:', body);
		if (!body || typeof body !== 'object') {
			console.error('❌ Invalid or missing body');
			return new Response('Bad Request', { status: 400 });
		}

		const listing = await prisma.listing.create({
			data: {
				title: body.title,
				description: body.description,
				price: body.price,
				type: body.type,
				condition: body.condition || null, // optional
				pricingType: body.pricingType,
				category: body.category,
				imageUrls: body.imageUrls,
				isVisibleToAll: body.isVisibleToAll,
				university: body.university,
				meetupLocation: body.meetupLocation || null,
				sellerId: existing.id, // TEMP hardcoded
			},
		});

		console.log('✅ Listing created:', listing);
		return Response.json(listing);
	} catch (error) {
		console.error(
			'❌ Failed to create listing:',
			typeof error,
			error?.message || error || 'Unknown error'
		);

		return new Response('Internal Server Error', { status: 500 });
	}
}

export async function GET() {
	try {
		const listings = await prisma.listing.findMany({
			orderBy: { createdAt: 'desc' },
			include: {
				seller: true, // if you want to display seller info
			},
		});
		return Response.json(listings);
	} catch (error) {
		console.error(
			'❌ Failed to fetch listing:',
			typeof error,
			error?.message || error || 'Unknown error'
		);
		return new Response('Failed to fetch listings', { status: 500 });
	}
}

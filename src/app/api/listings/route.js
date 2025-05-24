import { prisma } from '@/lib/db';

export async function POST(req) {
	const body = await req.json();

	const listing = await prisma.listing.create({
		data: {
			title: body.title,
			description: body.description,
			price: body.price,
			type: body.type,
			condition: body.condition,
			pricingType: body.pricingType,
			imageUrls: body.imageUrls,
			isVisibleToAll: body.isVisibleToAll,
			university: body.university,
			meetupLocation: body.meetupLocation,
			sellerId: 'XYZ', //TODO
		},
	});

	return Response.json(listing);
}

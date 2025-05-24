export async function POST(req) {
	try {
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
				sellerId: 'XYZ', // TODO: Replace with real user ID
			},
		});

		console.log('Returning POSTABLE response');
		return Response.json(listing);
	} catch (error) {
		console.error('Failed to create listing:', error);
		return new Response('Internal Server Error', { status: 500 });
	}
}

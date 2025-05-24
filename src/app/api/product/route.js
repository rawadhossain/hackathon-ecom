import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(request) {
	try {
		const { searchParams } = new URL(request.url);
		const id = searchParams.get('id');

		if (!id) {
			return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 });
		}

		const product = await prisma.listing.findUnique({
			where: { id },
			include: {
				seller: true,
				reviews: true,
			},
		});

		if (!product) {
			return NextResponse.json({ error: 'Product not found' }, { status: 404 });
		}

		// Format or remove sensitive data if needed

		return NextResponse.json(product);
	} catch (error) {
		console.error('API Error:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}

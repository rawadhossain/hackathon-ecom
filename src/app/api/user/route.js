// app/api/user/route.js
import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
	try {
		const user = await currentUser();

		if (!user) {
			console.log('No user found in Clerk');
			return new NextResponse('Unauthorized', { status: 401 });
		}

		const existing = await prisma.user.findUnique({
			where: { clerkUserId: user.id },
		});

		if (!existing) {
			console.log('User not found in DB');
			return new NextResponse('User not found in database', { status: 404 });
		}

		console.log('Found existing user:', existing.id);
		return NextResponse.json(existing); // ✅ Proper response
	} catch (err) {
		console.error('Error in /api/user:', err);
		return new NextResponse('Internal Server Error', { status: 500 });
	}
}

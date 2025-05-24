import { currentUser } from '@clerk/nextjs/server';
import prisma from '@/lib/db';

export async function POST(req) {
	const user = await currentUser();
	if (!user) {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
	}

	const body = await req.json();

	try {
		const updatedUser = await prisma.user.update({
			where: {
				clerkUserId: user.id,
			},
			data: {
				university: body.university,
				department: body.department,
				program: body.program,
				year: body.year,
				phone: body.phone,
			},
		});

		return new Response(JSON.stringify(updatedUser), { status: 200 });
	} catch (err) {
		console.error(err);
		return new Response(JSON.stringify({ error: 'Update failed' }), { status: 500 });
	}
}

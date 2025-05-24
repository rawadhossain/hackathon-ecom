import { currentUser } from '@clerk/nextjs/server';
import prisma from './db';

export const checkUser = async () => {
	try {
		const user = await currentUser();
		if (!user) {
			console.log('No user found in Clerk');
			return null;
		}

		const email = user?.emailAddresses?.[0]?.emailAddress;
		if (!email) {
			console.log('No email found for user:', user.id);
			return null;
		}

		try {
			const existing = await prisma.user.findUnique({
				where: { email },
			});

			if (existing) {
				console.log('Found existing user:', existing.id);
				return existing;
			}

			const name = `${user.firstName || ''} ${user.lastName || ''}`.trim();
			console.log('Creating new user for:', email);

			const newUser = await prisma.user.create({
				data: {
					email,
					name,
					university: user.publicMetadata?.university || '',
					department: user.publicMetadata?.department || '',
					program: user.publicMetadata?.program || '',
					year: user.publicMetadata?.year || '',
				},
			});

			console.log('Created new user:', newUser.id);
			return newUser;
		} catch (err) {
			console.error('Database error in checkUser:', err);
			return null;
		}
	} catch (err) {
		console.error('Clerk error in checkUser:', err);
		return null;
	}
};

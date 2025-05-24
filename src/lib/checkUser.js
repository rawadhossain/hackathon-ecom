import { currentUser } from '@clerk/nextjs/server';
import prisma from './db';

export const checkUser = async () => {
	try {
		// Get the current user from Clerk
		const user = await currentUser();

		if (!user) {
			console.log('No user found in Clerk');
			return null;
		}

		// Extract email from Clerk user data
		const email = user.emailAddresses?.[0]?.emailAddress;
		if (!email) {
			console.log('No email found for user:', user.id);
			return null;
		}

		try {
			// Check if the user already exists in the database based on Clerk's user ID
			const existing = await prisma.user.findUnique({
				where: { clerkUserId: user.id },
			});

			if (existing) {
				console.log('Found existing user:', existing.id);
				return existing;
			}

			// If user does not exist, create a new user in the database
			const name = `${user.firstName || ''} ${user.lastName || ''}`.trim();
			const university = user.publicMetadata?.university || '';
			const department = user.publicMetadata?.department || '';
			const program = user.publicMetadata?.program || '';
			const year = user.publicMetadata?.year || '';

			console.log('Creating new user for:', email);

			// Create the user in the database
			const newUser = await prisma.user.create({
				data: {
					clerkUserId: user.id,
					email: email,
					name: name,
					university: university,
					department: department,
					program: program,
					year: year,
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

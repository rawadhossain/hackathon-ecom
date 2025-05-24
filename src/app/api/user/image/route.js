// /pages/api/clerk-user.js
export default async function handler(req, res) {
	const { userId } = req.query;
	console.log('UserID is: ', userId);
	const apiKey = process.env.CLERK_SECRET_KEY; // your Clerk service key

	if (!userId) return res.status(400).json({ error: 'Missing userId' });

	try {
		const response = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
			headers: { Authorization: `Bearer ${apiKey}` },
		});

		if (!response.ok) {
			return res.status(response.status).json({ error: 'Failed to fetch user from Clerk' });
		}

		const userData = await response.json();
		return res
			.status(200)
			.json({ avatar: userData.profile_image_url, name: userData.first_name });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
}

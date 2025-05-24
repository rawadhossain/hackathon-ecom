import { createGoogleGenerativeAI } from '@ai-sdk/google';

// Initialize GoogleGenerativeAI with the API Key from the environment
const googleAI = new createGoogleGenerativeAI({
	apiKey: process.env.GOOGLE_API_KEY, // Use your Google API key here
});

export default async function handler(req, res) {
	// Ensure it's a POST request
	if (req.method === 'POST') {
		const { message } = req.body; // Get the user's message from the request body

		try {
			// Call Google Generative AI's API to generate a response based on the message
			const response = await googleAI.generate({
				prompt: message, // The input message you want the chatbot to process
				model: 'gemini-1.5-flash', // Specify the model you want to use (check the docs for available models)
			});

			// Log the response to check the structure
			console.log('Response from Google AI:', response);

			// Assuming the response has a 'choices' array and we want the first choice's text
			// Adjust based on the structure of the response
			if (response.choices && response.choices[0]) {
				const reply = response.choices[0].text;
				res.status(200).json({ reply });
			} else {
				res.status(500).json({ error: 'Unexpected response format' });
			}
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: error.message });
		}
	} else {
		res.status(405).json({ error: 'Method Not Allowed' }); // Only POST method allowed
	}
}

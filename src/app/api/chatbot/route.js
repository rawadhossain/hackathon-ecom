import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { google } from '@ai-sdk/google';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
	throw new Error('Gemini API key is not set in environment variables.');
}

// Initialize the Google Generative AI client with the API key
const googleAI = createGoogleGenerativeAI({
	apiKey: GEMINI_API_KEY,
});

// Function to generate a chatbot response based on user input
export async function generateChatResponse(userMessage) {
	const prompt = `
    You are a helpful chatbot. Respond to the following query:
    ${userMessage}
  `;

	try {
		const response = await googleAI.generate({
			prompt,
			model: 'gemini-2.0-flash', // Specify the AI model
			providerOptions: {
				google: {
					responseModalities: ['TEXT'], // Specify the response type (text)
				},
			},
		});

		// Ensure the response is a valid string or text-based response
		const botReply = response.text.trim();

		return botReply; // Return the chatbot's response as plain text
	} catch (error) {
		console.error('Error generating chatbot response:', error);
		throw new Error('Failed to generate a response from the AI.');
	}
}

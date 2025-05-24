import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';
import { GoogleGenerativeAIProviderOptions } from '@ai-sdk/google';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
	throw new Error('Gemini API key is not set in environment variables.');
}

const google = createGoogleGenerativeAI({
	apiKey: GEMINI_API_KEY,
});

// Function to generate a chatbot response based on user input
export async function getPriceAdvisor(item) {
	const prompt = `
    What is the best price for ${item} in BDT? Please provide the exact price only.
  `;

	const result = await generateText({
		model: google('gemini-2.0-flash'),
		providerOptions: {
			google: {
				responseModalities: ['TEXT'],
			},
		},
		prompt,
	});

	return result;
}

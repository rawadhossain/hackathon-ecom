// /api/chatbot2.js

import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY_2 });

export async function POST(request) {
	try {
		const { message } = await request.json();

		const response = await ai.models.generateContent({
			model: 'gemini-2.0-flash',
			contents: message,
		});

		return new Response(JSON.stringify({ reply: response.text }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}
}

'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Import styles
import 'react-chat-widget/lib/styles.css';

// Create a wrapper component for the Widget
const ChatWidgetWrapper = dynamic(
	() =>
		Promise.resolve(({ handleNewUserMessage }) => {
			const { Widget } = require('react-chat-widget');
			return (
				<Widget
					handleNewUserMessage={handleNewUserMessage}
					title="Student Marketplace Bot"
					subtitle="How can I assist you today?"
				/>
			);
		}),
	{ ssr: false }
);

const Chatbot = () => {
	const [messages, setMessages] = useState([]);
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	const handleNewUserMessage = async (newMessage) => {
		try {
			const response = await fetch('/api/chatbot', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ message: newMessage }),
			});

			const data = await response.json();
			const botMessage = data.reply;

			setMessages((prevMessages) => [...prevMessages, { user: newMessage, bot: botMessage }]);
		} catch (error) {
			console.error('Error sending message:', error);
		}
	};

	if (!isClient) {
		return null;
	}

	return (
		<div>
			<ChatWidgetWrapper handleNewUserMessage={handleNewUserMessage} />
		</div>
	);
};

export default Chatbot;

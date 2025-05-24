'use client';

import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { WandSparkles } from 'lucide-react';

export default function ChatBot() {
	const [message, setMessage] = useState('');
	const [reply, setReply] = useState('');
	const [loading, setLoading] = useState(false);

	const sendMessage = async () => {
		if (!message.trim()) return;
		setLoading(true);
		try {
			const res = await fetch('/api/chatbot2', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ message: message }),
			});
			const data = await res.json();
			setReply(data.reply || 'No reply from AI');
		} catch (err) {
			setReply('Error: ' + err.message);
		}
		setMessage('');
		setLoading(false);
	};

	return (
		<div>
			<Popover>
				<PopoverTrigger className="flex items-center justify-center border bg-foregroundCustom p-3 rounded-full w-10 h-10">
					<WandSparkles className="w-8 h-8 text-backgroundCustom" />
				</PopoverTrigger>
				<PopoverContent className="w-80 ">
					<input
						type="text"
						placeholder="Ask me anything..."
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						className="w-full px-3 py-2 mb-2 border rounded"
					/>
					<button
						onClick={sendMessage}
						disabled={loading}
						className="bg-foregroundCustom text-white px-4 py-2 rounded w-full"
					>
						{loading ? 'Thinking...' : 'Send'}
					</button>
					{reply && (
						<p className="mt-3 max-h-96 overflow-y-auto whitespace-pre-wrap break-words">
							{reply}
						</p>
					)}
				</PopoverContent>
			</Popover>
		</div>
	);
}

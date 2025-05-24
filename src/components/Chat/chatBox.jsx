import { useChat } from '@/hooks/useChat';
import { useUser } from '@clerk/nextjs';
import { useState } from 'react';

export default function ChatBox({ listingId }) {
	const { user } = useUser();
	const { messages, sendMessage } = useChat(listingId, user.id); // roomId = listingId+buyerId
	const [text, setText] = useState('');

	const handleSend = () => {
		if (!text.trim()) return;
		sendMessage({
			content: text,
			senderId: user.id,
			receiverId: 'SELLER_ID_HERE', // ideally fetched from listing
		});
		setText('');
	};

	return (
		<div className="flex flex-col h-full">
			<div className="flex-1 overflow-y-auto">
				{messages.map((msg, i) => (
					<div key={i}>{msg.content}</div>
				))}
			</div>
			<div className="flex gap-2 mt-2">
				<input
					value={text}
					onChange={(e) => setText(e.target.value)}
					className="flex-1 border px-2 py-1"
				/>
				<button onClick={handleSend} className="bg-blue-500 text-white px-3 py-1 rounded">
					Send
				</button>
			</div>
		</div>
	);
}

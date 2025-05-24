import { useState } from 'react';
import ChatDialog from './ChatDialog';
import { Button } from '../ui/button';

export default function ChatButton({ listingId }) {
	const [open, setOpen] = useState(false);

	return (
		<>
			<Button
				onClick={() => setOpen(true)}
				className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg"
			>
				💬 Chat with Seller
			</Button>
			{open && <ChatDialog listingId={listingId} onClose={() => setOpen(false)} />}
		</>
	);
}

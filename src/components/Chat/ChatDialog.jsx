import { Button } from '../ui/button';
import ChatBox from './ChatBox';

export default function ChatDialog({ listingId, onClose }) {
	return (
		<div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
			<div className="bg-white p-4 rounded-lg w-[400px] h-[500px] relative">
				<Button onClick={onClose} className="absolute top-2 right-2 text-gray-600">
					✖
				</Button>
				<ChatBox listingId={listingId} />
			</div>
		</div>
	);
}

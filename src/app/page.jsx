import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
	// Colors Used:
	// Background: #FAF6F5
	// Primary: #50A962
	return (
		<div>
			landing page
			<Link href="/dashboard">
				<Button
					size="lg"
					variant="default"
					className="animate-bounce bg-emerald-600 hover:bg-teal-700 text-white"
				>
					Get Started for Free
				</Button>
			</Link>
		</div>
	);
}

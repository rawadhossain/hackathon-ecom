import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
	// Colors Used:
	// Background: #FAF6F5
	// Primary: #50A962
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<Link href="/dashboard">Dashboard</Link>
			<Link href="/listings">Listings</Link>
			<Image src="/globe.svg" alt="Globe Logo" width={240} height={240} priority />
		</main>
	);
}

import Image from 'next/image';

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<p>Hello</p>
			<Image src="/globe.svg" alt="Globe Logo" width={240} height={240} priority />
		</main>
	);
}

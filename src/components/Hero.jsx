'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		setLoaded(true);
	}, []);

	return (
		<section className="relative bg-gradient-to-b from-[#0f3316] to-[#1E5820] pt-24 pb-16 overflow-hidden">
			<div className="container mx-auto px-4">
				<div className="flex flex-col md:flex-row items-center justify-between">
					<motion.div
						className="md:w-1/2 text-center md:text-left mb-8 md:mb-0"
						initial={{ opacity: 0, y: 20 }}
						animate={loaded ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.8 }}
					>
						<Link
							href="/"
							className="text-5xl md:text-6xl  lg:text-7xl font-bold text-white mb-4"
						>
							Bikri
							<i className="text-6xl text-backgroundCustom bg-foregroundCustom border rounded-xl">
								হয়
							</i>
						</Link>
						<p className="text-[#D2E9C6] text-lg mb-8 mt-4 max-w-lg">
							A trusted AI-powered marketplace built exclusively for students to buy,
							sell, and connect safely within campus.
						</p>

						<div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-3 sm:space-y-0 sm:space-x-4">
							<Link href="/listings">
								<Button className="bg-[#F7C53F] text-[#1E5820] hover:bg-[#F7C53F]/90 text-base px-8 py-6">
									Order Now
								</Button>
							</Link>
						</div>
					</motion.div>

					<motion.div
						className="md:w-1/2 relative"
						initial={{ opacity: 0, scale: 0.9 }}
						animate={loaded ? { opacity: 1, scale: 1 } : {}}
						transition={{ duration: 0.8, delay: 0.2 }}
					>
						<div className="bg-white p-4 rounded-xl shadow-lg max-w-sm mx-auto">
							<Image
								src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4QaRqKWxfrGdQ9r5U5mWg-RWItNxzmphX-Q&s"
								alt="Beautiful aloe vera plant"
								width={500}
								height={300}
								className="rounded-lg"
							/>
							<div className="p-2 text-left">
								<p className="text-xs text-gray-500">
									Buy and sell anything within campus
								</p>
								<div className="flex justify-between items-center mt-2">
									<span className="text-sm font-semibold text-[#2B8A3E]">
										Sign up to get started
									</span>
									<span className="text-xs bg-[#D2E9C6] text-[#1E5820] px-2 py-1 rounded-full">
										Bestseller
									</span>
								</div>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}

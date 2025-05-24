'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useState } from 'react';

export default function FeaturedProduct() {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<section className="bg-[#D2E9C6]/30 py-16">
			<div className="container mx-auto px-4">
				<div className="flex flex-col md:flex-row justify-between items-center">
					<motion.div
						className="bg-white rounded-2xl shadow-md p-4 mb-8 md:mb-0 md:mr-8 w-full md:w-1/3"
						whileHover={{ y: -5, boxShadow: '0 15px 30px rgba(0,0,0,0.1)' }}
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
					>
						<div className="flex items-start mb-2">
							<div className="bg-[#2B8A3E] rounded-full w-8 h-8 flex items-center justify-center text-white mr-3">
								<span>💻</span>
							</div>
							<p className="text-sm text-gray-600">A used laptop to buy</p>
						</div>

						<div className="relative h-60 w-full rounded-xl overflow-hidden mb-4">
							<Image
								src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlygWcz51gyDexlstejSgZZ2LSxqF4rBz3wQ&s"
								alt="A used laptop to buy"
								fill
								style={{ objectFit: 'cover' }}
								className="transition-transform duration-500 hover:scale-105"
							/>
						</div>

						<div className="flex justify-between items-center">
							<div>
								<h3 className="text-2xl font-bold text-[#1E5820]">
									৳ 20,000<span className="text-lg"></span>
								</h3>
								<p className="text-sm text-gray-500">+ shipping fee</p>
							</div>
							<Button className="bg-[#F7C53F] text-[#1E5820] hover:bg-[#F7C53F]/90">
								Order Now
							</Button>
						</div>
					</motion.div>

					<motion.div
						className="w-full md:w-2/3 text-center md:text-left"
						initial={{ opacity: 0, x: 20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
					>
						<h2 className="text-3xl md:text-4xl font-bold text-[#2B8A3E] mb-6">
							Found the perfect used laptop?
							<br />
							Buy it safely from a fellow student.
						</h2>

						<p className="text-gray-700 mb-8 max-w-lg mx-auto md:mx-0">
							Discover trusted listings, smart pricing, and safe meetups — all within
							your university network.
						</p>

						<motion.div
							className="flex justify-center md:justify-start space-x-4"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: 0.2 }}
						>
							{[1, 2, 3, 4, 5].map((item, index) => (
								<motion.div
									key={index}
									className="bg-[#F7C53F] w-12 md:w-16 rounded-t-md"
									style={{
										height: `${(index + 3) * 20}px`,
										marginTop: `${100 - (index + 3) * 20}px`,
									}}
									whileHover={{ y: -5 }}
								></motion.div>
							))}
						</motion.div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const products = [
	{
		id: 1,
		name: 'Used Laptop - Dell Inspiron 15',
		price: '৳ 20,000',
		category: 'popular',
		description:
			'A reliable laptop with Intel Core i5, 8GB RAM, and SSD — perfect for classes, coding, and campus work.',
		image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3YGguIJ64QsRSMhgttcrVwffpp-kE0Nvstg&s',
	},
	{
		id: 2,
		name: 'Mountain Bike',
		price: '৳ 12,000',
		category: 'featured',
		description:
			'Lightweight used mountain bike, great for daily campus rides. Recently serviced and in good condition.',
		image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdSwvwK4z86stT8t0LKK4Dit8bUWmoywouHg&s',
	},
];

export default function ProductSelection() {
	const [activeIndex, setActiveIndex] = useState(0);

	return (
		<section className="bg-[#F9F9F9] py-16">
			<div className="container mx-auto px-4">
				<motion.h2
					className="text-3xl md:text-4xl font-bold text-[#2B8A3E] mb-12 text-center md:text-left"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
				>
					Our Best Selling
					<br />
					Items.
				</motion.h2>

				<div className="flex flex-col md:flex-row justify-between items-stretch space-y-8 md:space-y-0 md:space-x-8">
					{products.map((product, index) => (
						<motion.div
							key={product.id}
							className="bg-white rounded-2xl p-4 shadow-md w-full md:w-1/2"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: index * 0.2 }}
							whileHover={{ y: -5 }}
						>
							<div className="flex items-center justify-between mb-2">
								<span className="text-xs text-gray-500">Product</span>
								<span className="bg-[#2B8A3E] text-white text-xs px-2 py-1 rounded-full">
									{product.category}
								</span>
							</div>

							<div className="relative h-60 w-full rounded-xl overflow-hidden mb-4">
								<Image
									src={product.image}
									alt={product.name}
									fill
									style={{ objectFit: 'cover' }}
									className="transition-transform duration-500 hover:scale-105"
								/>
							</div>

							<h3 className="text-xl font-bold text-[#1E5820] mb-2">
								{product.name}
							</h3>
							<p className="text-sm text-gray-600 mb-4">{product.description}</p>

							<div className="flex justify-between items-center">
								<span className="font-bold text-xl text-[#2B8A3E]">
									{product.price}
								</span>
								<Button className="bg-[#F7C53F] text-[#1E5820] hover:bg-[#F7C53F]/90 group">
									Order Now
									<ChevronRight
										size={16}
										className="ml-1 group-hover:translate-x-1 transition-transform"
									/>
								</Button>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}

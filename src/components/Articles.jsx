'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

const articles = [
	{
		id: 1,
		title: 'Why a Student-Only Marketplace Builds More Trust on Campus',
		image: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg',

		date: 'May 20, 2025',
	},
	{
		id: 2,
		title: 'How AI Suggests Fair Prices for Used Textbooks and Gadgets',
		image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg',

		date: 'May 21, 2025',
	},
	{
		id: 3,
		title: 'Enhancing Safety with Campus Map Integration for Meetups',
		image: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg',

		date: 'May 22, 2025',
	},
	{
		id: 4,
		title: 'Behind the Scenes: Building Real-Time Chat for Student Deals',
		image: 'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg',

		date: 'May 23, 2025',
	},
];

export default function Articles() {
	return (
		<section className="py-16 bg-[#F9F9F9]">
			<div className="container mx-auto px-4">
				<div className="flex flex-col md:flex-row justify-between items-start mb-12">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
					>
						<h2 className="text-3xl md:text-4xl font-bold text-[#2B8A3E] mb-4">
							Marketplace
							<br />
							Articles
						</h2>
					</motion.div>

					<motion.div
						className="flex items-center mt-4 md:mt-0"
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						<div className="flex space-x-2">
							{[1, 2, 3, 4].map((_, index) => (
								<div key={index} className="w-8 h-8 rounded-full overflow-hidden">
									<Image
										src={`https://images.pexels.com/photos/${
											1000000 + index * 100000
										}/pexels-photo-${1000000 + index * 100000}.jpeg`}
										alt={`Author ${index + 1}`}
										width={32}
										height={32}
										className="object-cover"
									/>
								</div>
							))}
						</div>
						<div className="ml-3">
							<p className="text-sm font-bold">100K+</p>
							<p className="text-xs text-gray-500">Popular article author</p>
						</div>
					</motion.div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{articles.map((article, index) => (
						<motion.div
							key={article.id}
							className="bg-white rounded-2xl overflow-hidden shadow-md"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							whileHover={{ y: -5 }}
						>
							<div className="relative h-48">
								<Image
									src={article.image}
									alt={article.title}
									fill
									style={{ objectFit: 'cover' }}
									className="transition-transform duration-500 hover:scale-105"
								/>
							</div>

							<div className="p-4">
								<div className="flex items-center mb-3">
									<div className="w-6 h-6 rounded-full overflow-hidden mr-2">
										<Image
											src={`https://images.pexels.com/photos/${
												1000000 + index * 100000
											}/pexels-photo-${1000000 + index * 100000}.jpeg`}
											alt={`Author ${index + 1}`}
											width={24}
											height={24}
											className="object-cover"
										/>
									</div>
								</div>

								<h3 className="font-bold text-lg mb-3 line-clamp-2 text-[#1E5820]">
									{article.title}
								</h3>

								<Link
									href="#"
									className="text-[#2B8A3E] text-sm font-medium flex items-center hover:underline"
								>
									Read More <ChevronRight size={16} className="ml-1" />
								</Link>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}

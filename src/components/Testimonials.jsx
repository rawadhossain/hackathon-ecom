'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
	{
		id: 1,
		name: 'Sarah P.',
		image: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg',
		text: "I absolutely love my plants from this place! It's been a joy to see them flourish in my dorm. The team was incredibly helpful with plant care advice.",
	},
	{
		id: 2,
		name: 'David K.',
		image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
		text: "Heart's Nurture offers a delightful experience. Their staff is knowledgeable and passionate about what they do. My plants are thriving!",
	},
	{
		id: 3,
		name: 'Daniel R.',
		image: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg',
		text: "The plants are exceptionally beautiful and healthy. My apartment has transformed into a little garden oasis. I'm incredibly satisfied with my purchase.",
	},
];

export default function Testimonials() {
	const [activeIndex, setActiveIndex] = useState(0);
	const testimonialsRef = useRef(null);

	const handleNext = () => {
		if (activeIndex < testimonials.length - 1) {
			setActiveIndex(activeIndex + 1);
		} else {
			setActiveIndex(0);
		}
	};

	const handlePrev = () => {
		if (activeIndex > 0) {
			setActiveIndex(activeIndex - 1);
		} else {
			setActiveIndex(testimonials.length - 1);
		}
	};

	return (
		<section className="py-16 bg-white">
			<div className="container mx-auto px-4">
				<motion.div
					className="text-center mb-12"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
				>
					<h2 className="text-3xl md:text-4xl font-bold text-[#2B8A3E] mb-4">
						Customers have
						<br />
						provided feedback
					</h2>
					<p className="text-gray-600 max-w-2xl mx-auto">
						A selection of reviews from students who found great deals, trusted sellers,
						and safe meetups through our campus marketplace.
					</p>
				</motion.div>

				<div className="relative" ref={testimonialsRef}>
					<div className="flex overflow-hidden">
						<div
							className="flex transition-transform duration-500 ease-in-out"
							style={{ transform: `translateX(-${activeIndex * 100}%)` }}
						>
							{testimonials.map((testimonial) => (
								<motion.div
									key={testimonial.id}
									className="min-w-full px-4"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.5 }}
								>
									<div className="flex flex-col md:flex-row justify-center items-center md:space-x-8">
										{testimonials.map((item, index) => (
											<motion.div
												key={item.id}
												className={`bg-white rounded-3xl p-6 shadow-md mb-6 md:mb-0 w-full md:w-1/3 flex flex-col items-center text-center
                                   ${index === activeIndex ? 'ring-2 ring-[#2B8A3E]/20' : ''}`}
												initial={{ opacity: 0, y: 20 }}
												whileInView={{ opacity: 1, y: 0 }}
												viewport={{ once: true }}
												transition={{ duration: 0.5, delay: index * 0.1 }}
												whileHover={{ y: -5 }}
											>
												<div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-4 border-[#D2E9C6]">
													<Image
														src={item.image}
														alt={item.name}
														width={80}
														height={80}
														className="object-cover"
													/>
												</div>
												<h3 className="font-bold text-xl text-[#2B8A3E] mb-2">
													{item.name}
												</h3>
												<p className="text-gray-600 text-sm">{item.text}</p>
											</motion.div>
										))}
									</div>
								</motion.div>
							))}
						</div>
					</div>

					<Button
						variant="outline"
						size="icon"
						className="absolute top-1/2 left-4 transform -translate-y-1/2 rounded-full bg-white text-[#2B8A3E] border-[#2B8A3E] hover:bg-[#2B8A3E] hover:text-white"
						onClick={handlePrev}
					>
						<ChevronLeft size={20} />
					</Button>

					<Button
						variant="outline"
						size="icon"
						className="absolute top-1/2 right-4 transform -translate-y-1/2 rounded-full bg-white text-[#2B8A3E] border-[#2B8A3E] hover:bg-[#2B8A3E] hover:text-white"
						onClick={handleNext}
					>
						<ChevronRight size={20} />
					</Button>
				</div>
			</div>
		</section>
	);
}

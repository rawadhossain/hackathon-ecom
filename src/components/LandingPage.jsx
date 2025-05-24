import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import Link from 'next/link';

const LandingPage = () => {
	const products = [
		{
			id: 1,
			name: 'Fiddle Leaf Fig',
			price: '$18,000',
			image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400&h=400&fit=crop',
			description: 'A vibrant green plant perfect for any space',
		},
		{
			id: 2,
			name: 'Snake Plant',
			price: '$25,000',
			image: 'https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?w=400&h=400&fit=crop',
			description: 'Low maintenance, perfect for beginners',
		},
		{
			id: 3,
			name: 'Monstera Deliciosa',
			price: '$32,000',
			image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
			description: 'Beautiful split leaves, Instagram favorite',
		},
	];

	const testimonials = [
		{
			id: 1,
			name: 'Sarah K.',
			avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
			feedback:
				"Heart's Nurture transformed my space! The plants arrived healthy and the service was exceptional.",
		},
		{
			id: 2,
			name: 'Michael R.',
			avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
			feedback:
				'Amazing quality plants and fast delivery. My office has never looked better!',
		},
		{
			id: 3,
			name: 'Emma L.',
			avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
			feedback:
				'The plant care guides are incredibly helpful. Perfect for someone just starting their plant journey.',
		},
	];

	const articles = [
		{
			id: 1,
			title: 'Essential Plant Care Tips for Beginners',
			image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
			excerpt: 'Learn the basics of keeping your plants healthy and thriving.',
		},
		{
			id: 2,
			title: 'Creating Your Perfect Plant Corner',
			image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=300&fit=crop',
			excerpt: 'Design tips for incorporating plants into your living space.',
		},
		{
			id: 3,
			title: 'The Science Behind Plant Growth',
			image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400&h=300&fit=crop',
			excerpt: 'Understanding photosynthesis and optimal growing conditions.',
		},
		{
			id: 4,
			title: 'Seasonal Plant Care Guide',
			image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=400&h=300&fit=crop',
			excerpt: 'How to adapt your plant care routine throughout the year.',
		},
	];

	return (
		<div className="min-h-screen bg-soft-white">
			{/* Navigation */}
			<nav className="bg-deep-green px-6 py-4">
				<div className="max-w-7xl mx-auto flex items-center justify-between">
					<div className="text-white text-2xl font-bold">Growve</div>
					<div className="hidden md:flex space-x-8 text-white">
						<a href="#" className="hover:text-plant-yellow transition-colors">
							Home
						</a>
						<a href="#" className="hover:text-plant-yellow transition-colors">
							Shop
						</a>
						<a href="#" className="hover:text-plant-yellow transition-colors">
							Gallery
						</a>
						<a href="#" className="hover:text-plant-yellow transition-colors">
							Brands
						</a>
						<a href="#" className="hover:text-plant-yellow transition-colors">
							About
						</a>
					</div>
					<div className="flex items-center space-x-4">
						<SignedIn>
							<Link href="/dashboard">
								<Button
									size="lg"
									variant="default"
									className=" bg-emerald-600 hover:bg-teal-700 text-white"
								>
									Get Started for Free
									<ChevronRight className="ml-2 h-4 w-4" />
								</Button>
							</Link>
						</SignedIn>
						<SignedOut>
							<Link href="/sign-in">
								<Button
									size="lg"
									variant="green"
									className=" bg-teal-600 hover:bg-teal-700 text-white"
								>
									Sign in
									<ChevronRight className="ml-2 h-4 w-4" />
								</Button>
							</Link>
						</SignedOut>
					</div>
				</div>
			</nav>

			{/* Hero Section */}
			<section className="bg-gradient-to-br from-deep-green to-dark-green py-20 px-6">
				<div className="max-w-7xl mx-auto">
					<div className="grid lg:grid-cols-2 gap-12 items-center">
						<div className="animate-fade-in">
							<Badge className="bg-plant-yellow text-deep-green mb-6 text-sm font-semibold px-4 py-2">
								🌱 Experience the joy of Plant Parenthood. Cultivating Green Dreams
								with Heart and Devotion
							</Badge>
							<h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
								Heart's
								<br />
								Nurture.
							</h1>
							<p className="text-light-green text-xl mb-8 leading-relaxed">
								Bringing the art of Plant Parenthood. Cultivating Green Dreams with
								Heart and care with Devotion
							</p>
							<div className="flex flex-col sm:flex-row gap-4">
								<Button className="bg-plant-yellow text-deep-green hover:bg-yellow-400 text-lg px-8 py-3 font-semibold">
									Order Now
								</Button>
								<Button
									variant="outline"
									className="border-white text-white hover:bg-white hover:text-deep-green text-lg px-8 py-3"
								>
									See Demo
								</Button>
							</div>
						</div>
						<div className="relative animate-scale-in">
							<div className="bg-light-green rounded-3xl p-8 animate-float">
								<img
									src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&h=400&fit=crop"
									alt="Beautiful plant arrangement"
									className="w-full h-auto rounded-2xl"
								/>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Stats Section */}
			<section className="py-16 px-6">
				<div className="max-w-7xl mx-auto">
					<div className="grid md:grid-cols-2 gap-8">
						<Card className="bg-light-green border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
							<CardContent className="p-8">
								<div className="flex items-center justify-between">
									<div>
										<div className="text-deep-green text-sm font-semibold mb-2">
											🌱 Best green plant
										</div>
										<div className="text-3xl font-bold text-deep-green mb-2">
											$18,000
										</div>
										<div className="text-gray-600">
											per plant with premium quality
										</div>
									</div>
									<img
										src="https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=150&h=150&fit=crop"
										alt="Plant"
										className="w-24 h-24 rounded-lg object-cover"
									/>
								</div>
							</CardContent>
						</Card>

						<Card className="bg-soft-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
							<CardContent className="p-8">
								<div className="flex items-center justify-between">
									<div>
										<div className="text-deep-green text-lg font-bold mb-4">
											Fostering healthy growth in plants
										</div>
										<div className="text-gray-600 mb-4">
											Advancing healthier plants with intelligent data and
											care strategies.
										</div>
										<div className="flex space-x-2">
											<div className="bg-plant-yellow w-8 h-16 rounded"></div>
											<div className="bg-deep-green w-8 h-12 rounded"></div>
											<div className="bg-plant-yellow w-8 h-20 rounded"></div>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* Our Standout Plants */}
			<section className="py-20 px-6 bg-soft-white">
				<div className="max-w-7xl mx-auto">
					<div className="grid lg:grid-cols-2 gap-16 items-center">
						<div>
							<h2 className="text-5xl font-bold text-deep-green mb-8">
								Our standout
								<br />
								plants.
							</h2>
							<div className="flex items-center mb-8">
								<div className="bg-light-green p-4 rounded-lg mr-6">
									<div className="text-2xl">🌿</div>
								</div>
								<div>
									<h3 className="text-xl font-bold text-deep-green mb-2">
										A vibrant green plant
									</h3>
									<p className="text-gray-600">
										Embrace Nature's Joy with a beautifully direct from ceramic
										pot.
									</p>
								</div>
							</div>
							<Button className="bg-plant-yellow text-deep-green hover:bg-yellow-400 font-semibold">
								Order Now
								<ArrowRight className="ml-2 w-4 h-4" />
							</Button>
						</div>
						<div className="relative">
							<div className="bg-light-green rounded-3xl p-8">
								<img
									src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=600&fit=crop"
									alt="Standout plant"
									className="w-full h-auto rounded-2xl"
								/>
							</div>
							<div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-lg">
								<img
									src="https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?w=100&h=100&fit=crop"
									alt="Small plant"
									className="w-16 h-16 rounded-lg object-cover"
								/>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Our Finest Selection */}
			<section className="py-20 px-6">
				<div className="max-w-7xl mx-auto">
					<div className="text-center mb-16">
						<h2 className="text-5xl font-bold text-deep-green mb-4">
							Our finest
							<br />
							selection.
						</h2>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						{products.map((product, index) => (
							<Card
								key={product.id}
								className="group bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in"
								style={{ animationDelay: `${index * 0.1}s` }}
							>
								<CardContent className="p-0">
									<div className="relative overflow-hidden rounded-t-lg">
										<img
											src={product.image}
											alt={product.name}
											className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
										/>
										<Badge className="absolute top-4 left-4 bg-plant-yellow text-deep-green">
											best plant
										</Badge>
									</div>
									<div className="p-6">
										<h3 className="text-xl font-bold text-deep-green mb-2">
											{product.name}
										</h3>
										<p className="text-gray-600 mb-4">{product.description}</p>
										<div className="flex justify-between items-center">
											<span className="text-2xl font-bold text-deep-green">
												{product.price}
											</span>
											<Button className="bg-plant-yellow text-deep-green hover:bg-yellow-400 font-semibold">
												Order Now
											</Button>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Customer Testimonials */}
			<section className="py-20 px-6 bg-light-green">
				<div className="max-w-7xl mx-auto">
					<div className="text-center mb-16">
						<h2 className="text-5xl font-bold text-deep-green mb-4">
							Customers have
							<br />
							provided feedback
						</h2>
						<p className="text-gray-600 text-lg">
							Hear what our community says about their plant journey with us
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8 mb-8">
						{testimonials.map((testimonial, index) => (
							<Card
								key={testimonial.id}
								className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in"
								style={{ animationDelay: `${index * 0.2}s` }}
							>
								<CardContent className="p-8 text-center">
									<img
										src={testimonial.avatar}
										alt={testimonial.name}
										className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
									/>
									<h4 className="font-bold text-deep-green mb-4">
										{testimonial.name}
									</h4>
									<p className="text-gray-600 italic">"{testimonial.feedback}"</p>
								</CardContent>
							</Card>
						))}
					</div>

					<div className="flex justify-center space-x-4">
						<Button variant="outline" size="icon" className="rounded-full">
							<ChevronLeft className="w-4 h-4" />
						</Button>
						<Button variant="outline" size="icon" className="rounded-full">
							<ChevronRight className="w-4 h-4" />
						</Button>
					</div>
				</div>
			</section>

			{/* Plant-focused Articles */}
			<section className="py-20 px-6">
				<div className="max-w-7xl mx-auto">
					<div className="flex justify-between items-center mb-16">
						<h2 className="text-5xl font-bold text-deep-green">
							Plant-focused
							<br />
							Articles
						</h2>
						<div className="text-right">
							<Badge className="bg-deep-green text-white mb-2">100K</Badge>
							<p className="text-gray-600">Readers Worldwide</p>
						</div>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
						{articles.map((article, index) => (
							<Card
								key={article.id}
								className="group bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in"
								style={{ animationDelay: `${index * 0.1}s` }}
							>
								<CardContent className="p-0">
									<div className="relative overflow-hidden rounded-t-lg">
										<img
											src={article.image}
											alt={article.title}
											className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
										/>
									</div>
									<div className="p-6">
										<h3 className="font-bold text-deep-green mb-3 line-clamp-2">
											{article.title}
										</h3>
										<p className="text-gray-600 text-sm mb-4 line-clamp-3">
											{article.excerpt}
										</p>
										<Button
											variant="link"
											className="text-deep-green p-0 h-auto font-semibold"
										>
											Read More
											<ArrowRight className="ml-1 w-3 h-3" />
										</Button>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-dark-green text-white py-16 px-6">
				<div className="max-w-7xl mx-auto">
					<div className="mb-12">
						<h2 className="text-5xl font-bold mb-8">Heart's Nurture</h2>
					</div>

					<div className="grid md:grid-cols-4 gap-8 mb-12">
						<div>
							<h4 className="font-semibold mb-4">Menu</h4>
							<ul className="space-y-2 text-sm">
								<li>
									<a
										href="#"
										className="hover:text-plant-yellow transition-colors"
									>
										Home
									</a>
								</li>
								<li>
									<a
										href="#"
										className="hover:text-plant-yellow transition-colors"
									>
										About Us
									</a>
								</li>
								<li>
									<a
										href="#"
										className="hover:text-plant-yellow transition-colors"
									>
										Products
									</a>
								</li>
								<li>
									<a
										href="#"
										className="hover:text-plant-yellow transition-colors"
									>
										Pricing
									</a>
								</li>
							</ul>
						</div>

						<div>
							<h4 className="font-semibold mb-4">Features</h4>
							<ul className="space-y-2 text-sm">
								<li>
									<a
										href="#"
										className="hover:text-plant-yellow transition-colors"
									>
										Dashboard Analytics
									</a>
								</li>
								<li>
									<a
										href="#"
										className="hover:text-plant-yellow transition-colors"
									>
										Account Connection
									</a>
								</li>
								<li>
									<a
										href="#"
										className="hover:text-plant-yellow transition-colors"
									>
										Billing & Invoice
									</a>
								</li>
								<li>
									<a
										href="#"
										className="hover:text-plant-yellow transition-colors"
									>
										Transaction
									</a>
								</li>
							</ul>
						</div>

						<div>
							<h4 className="font-semibold mb-4">Resources</h4>
							<ul className="space-y-2 text-sm">
								<li>
									<a
										href="#"
										className="hover:text-plant-yellow transition-colors"
									>
										Help Centre
									</a>
								</li>
								<li>
									<a
										href="#"
										className="hover:text-plant-yellow transition-colors"
									>
										Support
									</a>
								</li>
								<li>
									<a
										href="#"
										className="hover:text-plant-yellow transition-colors"
									>
										Partners
									</a>
								</li>
								<li>
									<a
										href="#"
										className="hover:text-plant-yellow transition-colors"
									>
										Events
									</a>
								</li>
							</ul>
						</div>

						<div>
							<h4 className="font-semibold mb-4">My Account</h4>
							<ul className="space-y-2 text-sm">
								<li>
									<a
										href="#"
										className="hover:text-plant-yellow transition-colors"
									>
										Login
									</a>
								</li>
								<li>
									<a
										href="#"
										className="hover:text-plant-yellow transition-colors"
									>
										FAQ
									</a>
								</li>
								<li>
									<a
										href="#"
										className="hover:text-plant-yellow transition-colors"
									>
										Documentation
									</a>
								</li>
								<li>
									<a
										href="#"
										className="hover:text-plant-yellow transition-colors"
									>
										Legal mentions
									</a>
								</li>
							</ul>
						</div>
					</div>

					<div className="border-t border-gray-600 pt-8">
						<div className="flex flex-col md:flex-row justify-between items-center">
							<p className="text-sm text-gray-400 mb-4 md:mb-0">
								© 2024 Heart's Nurture by Growve
							</p>
							<div className="flex space-x-6 text-sm">
								<a href="#" className="hover:text-plant-yellow transition-colors">
									Terms
								</a>
								<a href="#" className="hover:text-plant-yellow transition-colors">
									Privacy
								</a>
								<a href="#" className="hover:text-plant-yellow transition-colors">
									Cookies
								</a>
								<a href="#" className="hover:text-plant-yellow transition-colors">
									Legal
								</a>
								<a href="#" className="hover:text-plant-yellow transition-colors">
									Brands
								</a>
							</div>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default LandingPage;

import Link from 'next/link';
import { Mail, Instagram, Twitter, Facebook, Linkedin, Youtube } from 'lucide-react';

export default function Footer() {
	return (
		<footer className="bg-[#0f3316] text-white py-16">
			<div className="container mx-auto px-4">
				<div className="flex flex-col md:flex-row justify-between mb-12">
					<div className="mb-8 md:mb-0">
						<h2 className="text-4xl font-bold mb-4">Bikri Hoi.</h2>
						<p className="text-gray-300 max-w-sm">
							Your trusted companion for all plant-related needs in the university
							marketplace
						</p>
					</div>

					<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
						<div>
							<h3 className="font-bold mb-4 text-[#F7C53F]">Menu</h3>
							<ul className="space-y-2">
								<li>
									<Link
										href="/"
										className="text-gray-300 hover:text-white transition-colors"
									>
										Home
									</Link>
								</li>
								<li>
									<Link
										href="/shop"
										className="text-gray-300 hover:text-white transition-colors"
									>
										Shop
									</Link>
								</li>
								<li>
									<Link
										href="/about-us"
										className="text-gray-300 hover:text-white transition-colors"
									>
										About Us
									</Link>
								</li>
								<li>
									<Link
										href="/product"
										className="text-gray-300 hover:text-white transition-colors"
									>
										Product
									</Link>
								</li>
								<li>
									<Link
										href="/pricing"
										className="text-gray-300 hover:text-white transition-colors"
									>
										Pricing
									</Link>
								</li>
							</ul>
						</div>

						<div>
							<h3 className="font-bold mb-4 text-[#F7C53F]">Features</h3>
							<ul className="space-y-2">
								<li>
									<Link
										href="/dashboard"
										className="text-gray-300 hover:text-white transition-colors"
									>
										Dashboard Analytics
									</Link>
								</li>
								<li>
									<Link
										href="/connection"
										className="text-gray-300 hover:text-white transition-colors"
									>
										Account Connection
									</Link>
								</li>
								<li>
									<Link
										href="/billing"
										className="text-gray-300 hover:text-white transition-colors"
									>
										Billing & Invoice
									</Link>
								</li>
								<li>
									<Link
										href="/transaction"
										className="text-gray-300 hover:text-white transition-colors"
									>
										Transaction
									</Link>
								</li>
							</ul>
						</div>

						<div>
							<h3 className="font-bold mb-4 text-[#F7C53F]">Resources</h3>
							<ul className="space-y-2">
								<li>
									<Link
										href="/support"
										className="text-gray-300 hover:text-white transition-colors"
									>
										Support
									</Link>
								</li>
								<li>
									<Link
										href="/partners"
										className="text-gray-300 hover:text-white transition-colors"
									>
										Partners
									</Link>
								</li>
								<li>
									<Link
										href="/events"
										className="text-gray-300 hover:text-white transition-colors"
									>
										Events
									</Link>
								</li>
								<li>
									<Link
										href="/faq"
										className="text-gray-300 hover:text-white transition-colors"
									>
										FAQ
									</Link>
								</li>
								<li>
									<Link
										href="/conditions"
										className="text-gray-300 hover:text-white transition-colors"
									>
										Terms & Conditions
									</Link>
								</li>
								<li>
									<Link
										href="/legal"
										className="text-gray-300 hover:text-white transition-colors"
									>
										Legal resources
									</Link>
								</li>
							</ul>
						</div>

						<div>
							<h3 className="font-bold mb-4 text-[#F7C53F]">My Account</h3>
							<ul className="space-y-2">
								<li>
									<Link
										href="/my-orders"
										className="text-gray-300 hover:text-white transition-colors"
									>
										My Orders
									</Link>
								</li>
								<li>
									<Link
										href="/my-details"
										className="text-gray-300 hover:text-white transition-colors"
									>
										My Details
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<div className="pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center">
					<div className="mb-4 md:mb-0">
						<Link
							href="mailto:contact@heartsnurture.com"
							className="flex items-center text-gray-300 hover:text-white transition-colors"
						>
							<Mail size={20} className="mr-2" />
							contact@bikrihoi.com
						</Link>
					</div>

					<div className="flex space-x-4">
						<Link href="#" className="text-gray-300 hover:text-white transition-colors">
							<Instagram size={20} />
						</Link>
						<Link href="#" className="text-gray-300 hover:text-white transition-colors">
							<Twitter size={20} />
						</Link>
						<Link href="#" className="text-gray-300 hover:text-white transition-colors">
							<Facebook size={20} />
						</Link>
						<Link href="#" className="text-gray-300 hover:text-white transition-colors">
							<Linkedin size={20} />
						</Link>
						<Link href="#" className="text-gray-300 hover:text-white transition-colors">
							<Youtube size={20} />
						</Link>
					</div>
				</div>

				<div className="mt-8 text-center text-gray-400 text-sm">
					<p>© 2025 Copyright by Groovee</p>
					<div className="flex justify-center space-x-4 mt-2">
						<Link href="/terms" className="hover:text-white transition-colors">
							Terms
						</Link>
						<Link href="/privacy" className="hover:text-white transition-colors">
							Privacy
						</Link>
						<Link href="/cookies" className="hover:text-white transition-colors">
							Cookies
						</Link>
						<Link href="/legal" className="hover:text-white transition-colors">
							Legal
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}

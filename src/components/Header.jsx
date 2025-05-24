'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, ShoppingCart, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import UserMenu from './user-menu';

export default function Header() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<header
			className={cn(
				'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
				isScrolled ? 'bg-[#0f3316] shadow-md py-2' : 'bg-transparent py-4'
			)}
		>
			<div className="container mx-auto px-4 flex items-center justify-between">
				<div className="flex items-center">
					<Link href="/" className="text-white font-bold text-2xl flex items-center">
						<span>Bikri Hoi</span>
					</Link>
				</div>

				{/* Desktop Navigation */}
				<nav className="hidden md:flex items-center space-x-6">
					<Link
						href="/listings"
						className="text-white hover:text-[#F7C53F] transition-colors"
					>
						Home
					</Link>
					<Link
						href="/shop"
						className="text-white hover:text-[#F7C53F] transition-colors"
					>
						Shop
					</Link>
					<Link
						href="/delivery"
						className="text-white hover:text-[#F7C53F] transition-colors"
					>
						Delivery
					</Link>
					<Link
						href="/about"
						className="text-white hover:text-[#F7C53F] transition-colors"
					>
						About
					</Link>
				</nav>

				<div className="flex items-center space-x-3">
					<Button
						variant="ghost"
						size="icon"
						className="text-white hover:text-[#F7C53F] hover:bg-[#1E5820]/20"
					>
						<User size={20} />
					</Button>
					<Button
						variant="ghost"
						size="icon"
						className="text-white hover:text-[#F7C53F] hover:bg-[#1E5820]/20"
					>
						<ShoppingCart size={20} />
					</Button>
					{/* <Button className="bg-[#F7C53F] text-[#1E5820] hover:bg-[#F7C53F]/90">
						Sign up
					</Button> */}

					<SignedOut>
						<SignInButton>
							<Button>Sign In</Button>
						</SignInButton>
					</SignedOut>

					<SignedIn>
						<UserMenu />
					</SignedIn>

					{/* Mobile Menu Button */}
					<Button
						variant="ghost"
						size="icon"
						className="md:hidden text-white"
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
					>
						<Menu size={24} />
					</Button>
				</div>
			</div>

			{/* Mobile Navigation */}
			{isMobileMenuOpen && (
				<div className="md:hidden bg-[#2B8A3E] py-4 px-4 shadow-lg">
					<nav className="flex flex-col space-y-3">
						<Link
							href="/"
							className="text-white hover:text-[#F7C53F] transition-colors py-2"
						>
							Home
						</Link>
						<Link
							href="/shop"
							className="text-white hover:text-[#F7C53F] transition-colors py-2"
						>
							Shop
						</Link>
						<Link
							href="/delivery"
							className="text-white hover:text-[#F7C53F] transition-colors py-2"
						>
							Delivery
						</Link>
						<Link
							href="/about"
							className="text-white hover:text-[#F7C53F] transition-colors py-2"
						>
							About
						</Link>
					</nav>
				</div>
			)}
		</header>
	);
}

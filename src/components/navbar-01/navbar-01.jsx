import { Button } from '@/components/ui/button';
import { Logo } from './logo';
import { NavMenu } from './nav-menu';
import { NavigationSheet } from './navigation-sheet';
import Link from 'next/link';
import { PenBox } from 'lucide-react';
import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';
import UserMenu from '../user-menu';

const Navbar01Page = () => {
	return (
		<div className=" bg-muted">
			<nav className="h-16 bg-backgroundCustom border-b">
				<div className="h-full flex items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
					<Logo />

					{/* Desktop Menu */}
					<NavMenu className="hidden md:block" />

					<div className="flex items-center gap-3">
						<Link href="/listings/new">
							<Button variant="green" className="flex items-center gap-2">
								<PenBox size={18} />
								<span className="hidden md:inline">Add</span>
							</Button>
						</Link>

						<SignedOut>
							<SignInButton>
								<Button>Sign In</Button>
							</SignInButton>
						</SignedOut>

						<SignedIn>
							<UserMenu />
						</SignedIn>

						{/* Mobile Menu */}
						<div className="md:hidden">
							<NavigationSheet />
						</div>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default Navbar01Page;

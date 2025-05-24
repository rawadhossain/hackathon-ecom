import { Button } from '@/components/ui/button';
import { SignedIn } from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react';

const page = () => {
	return (
		<div>
			<SignedIn>
				<Link href="/dashboard">
					<Button
						size="lg"
						variant="default"
						className="animate-bounce bg-emerald-600 hover:bg-teal-700 text-white"
					>
						Get Started for Free
					</Button>
				</Link>
			</SignedIn>
		</div>
	);
};

export default page;

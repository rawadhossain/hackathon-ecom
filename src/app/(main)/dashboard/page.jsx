import ChatBot from '@/components/ai/chat';
import { Button } from '@/components/ui/button';
import { SignedIn } from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react';

const page = () => {
	return (
		<div className="mt-5 mx-2">
			<Link
				href="/listings"
				className="px-2 py-3 bg-foregroundCustom text-white border rounded-xl"
			>
				View Listings
			</Link>
		</div>
	);
};

export default page;

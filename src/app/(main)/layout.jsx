import Navbar01Page from '@/components/navbar-01/navbar-01';
import { checkUser } from '@/lib/checkUser';
import { Toaster } from 'sonner';
import React from 'react';
import Link from 'next/link';
import ChatBot from '@/components/ai/chat';

const Layout = ({ children }) => {
	return (
		<div className="min-h-screen bg-backgroundCustom">
			<Navbar01Page />
			<div className="fixed bottom-4 right-4">
				<ChatBot />
			</div>
			{children}
			<Toaster richColors />
		</div>
	);
};

export default Layout;

import Navbar01Page from '@/components/navbar-01/navbar-01';
import { checkUser } from '@/lib/checkUser';
import { Toaster } from 'sonner';
import React from 'react';
import Link from 'next/link';

const Layout = ({ children }) => {
	return (
		<div className="min-h-screen bg-backgroundCustom">
			<Navbar01Page />
			{children}
			<Toaster richColors />
		</div>
	);
};

export default Layout;

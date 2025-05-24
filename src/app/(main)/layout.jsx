import Navbar01Page from '@/components/navbar-01/navbar-01';
<<<<<<< HEAD
import { checkUser } from '@/lib/checkUser';
=======
import { Toaster } from 'sonner';
>>>>>>> ff11fef6a732f44393bef2e817a3c9a448317194
import React from 'react';
import Link from 'next/link';

const Layout = async ({ children }) => {
	const user = await checkUser();

	if (!user) {
		<Link href="/sign-in"></Link>;
	}
	return (
		<div className="min-h-screen bg-backgroundCustom">
			<Navbar01Page />
			{children}
			<Toaster richColors />
		</div>
	);
};

export default Layout;

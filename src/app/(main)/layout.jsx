import Navbar01Page from '@/components/navbar-01/navbar-01';
import { checkUser } from '@/lib/checkUser';
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
		</div>
	);
};

export default Layout;

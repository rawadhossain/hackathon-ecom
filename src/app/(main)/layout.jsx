import Navbar01Page from '@/components/navbar-01/navbar-01';
import { Toaster } from 'sonner';
import React from 'react';

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

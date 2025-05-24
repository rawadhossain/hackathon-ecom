import Navbar01Page from '@/components/navbar-01/navbar-01';
import React from 'react';

const Layout = ({ children }) => {
	return (
		<div>
			<Navbar01Page />
			{children}
		</div>
	);
};

export default Layout;

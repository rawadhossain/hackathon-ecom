import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Input } from '@/components/ui/input';

import Link from 'next/link';

export const NavMenu = (props) => (
	<NavigationMenu {...props}>
		<NavigationMenuList className="gap-6 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">
			<NavigationMenuItem>
				<Input placeholder="Search" className="w-[500px]  text-center bg-white" />
			</NavigationMenuItem>
			{/* <NavigationMenuItem>
				<NavigationMenuLink asChild>
					<Link href="#">Home</Link>
				</NavigationMenuLink>
			</NavigationMenuItem>
			<NavigationMenuItem>
				<NavigationMenuLink asChild>
					<Link href="#">Blog</Link>
				</NavigationMenuLink>
			</NavigationMenuItem>
			<NavigationMenuItem>
				<NavigationMenuLink asChild>
					<Link href="#">About</Link>
				</NavigationMenuLink>
			</NavigationMenuItem>
			<NavigationMenuItem>
				<NavigationMenuLink asChild>
					<Link href="#">Contact Us</Link>
				</NavigationMenuLink>
			</NavigationMenuItem> */}
		</NavigationMenuList>
	</NavigationMenu>
);

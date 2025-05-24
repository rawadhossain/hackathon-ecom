import Articles from '@/components/Articles';
import FeaturedProduct from '@/components/FeaturedProduct';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Hero';

import ProductSelection from '@/components/ProductSelection';
import Testimonials from '@/components/TEstimonials';

export default function Home() {
	// Colors Used:
	// Background: #FAF6F5
	// Primary: #50A962
	return (
		<div className="min-h-screen flex flex-col">
			<Header />
			<main>
				<Hero />
				<FeaturedProduct />
				<ProductSelection />
				<Testimonials />
				<Articles />
			</main>
			<Footer />
		</div>
	);
}

import ProductDetail from '@/components/Product/ProductDetail';
import { useRouter } from 'next/router';

// This is a mock function to simulate fetching product data
const fetchProductData = async (id) => {
	// Replace this mock data with actual API or database call
	const product = {
		title: 'Shoes Reebok Zig Kinetica 3',
		price: 199.0,
		rating: 4.8,
		reviews: 42,
		colors: [
			{ hex: '#F5F5F5', selected: true },
			{ hex: '#000000', selected: false },
			{ hex: '#FF6347', selected: false },
		],
		sizes: ['40.5', '41', '42', '43', '43.5', '44', '44.5', '45', '46'],
		images: [
			'https://example.com/image1.jpg',
			'https://example.com/image2.jpg',
			'https://example.com/image3.jpg',
		],
	};
	return product;
};

const ProductPage = ({ product }) => {
	return (
		<div className="max-w-screen-xl mx-auto p-5">
			<ProductDetail product={product} />
		</div>
	);
};

export async function getStaticPaths() {
	// Mocked paths for dynamic routing. Replace with real data for dynamic products
	const paths = [{ params: { id: '1' } }, { params: { id: '2' } }];
	return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
	// Fetch the product data based on the ID from the URL (params.id)
	const product = await fetchProductData(params.id);

	return {
		props: { product },
	};
}

export default ProductPage;

// components/ProductDetail.js

const ProductDetail = ({ product }) => {
	return (
		<div className="flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto p-5">
			{/* Product Image Section */}
			<div className="w-full md:w-1/2 mb-5 md:mb-0">
				<img
					className="w-full h-auto object-cover rounded-lg"
					src={product.images[0]}
					alt="Product Image"
				/>
				<div className="flex space-x-2 mt-4">
					{product.images.map((image, idx) => (
						<img
							key={idx}
							className="w-16 h-16 object-cover rounded-md cursor-pointer"
							src={image}
							alt={`Product thumbnail ${idx + 1}`}
						/>
					))}
				</div>
			</div>

			{/* Product Info Section */}
			<div className="w-full md:w-1/2 md:pl-10 space-y-5">
				<h2 className="text-3xl font-semibold">{product.title}</h2>
				<div className="flex items-center">
					<span className="text-yellow-500">{'★'.repeat(product.rating)}</span>
					<span className="text-gray-500 ml-2">({product.reviews} reviews)</span>
				</div>
				<p className="text-xl font-bold text-gray-800">${product.price}</p>

				{/* Color Selection */}
				<div>
					<label className="block text-lg font-medium">Color</label>
					<div className="flex space-x-2 mt-2">
						{product.colors.map((color, idx) => (
							<div
								key={idx}
								className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
									color.selected ? 'border-black' : ''
								}`}
								style={{ backgroundColor: color.hex }}
							/>
						))}
					</div>
				</div>

				{/* Size Selection */}
				<div>
					<label className="block text-lg font-medium mt-4">Size</label>
					<select className="mt-2 p-2 border rounded-md w-full">
						{product.sizes.map((size, index) => (
							<option key={index} value={size}>
								{size}
							</option>
						))}
					</select>
				</div>

				{/* Add to Cart Button */}
				<button className="mt-6 w-full py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-500 transition duration-300">
					Add to Cart
				</button>

				{/* Free Delivery Message */}
				<p className="mt-4 text-sm text-gray-600">Free delivery on orders over $30.00</p>
			</div>
		</div>
	);
};

export default ProductDetail;

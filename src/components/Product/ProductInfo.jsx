// components/ProductInfo.js

const ProductInfo = ({ product }) => {
	return (
		<div className="product-info">
			<h1>{product.title}</h1>
			<p className="price">${product.price}</p>
			<div className="size-selector">
				<label>Select Size:</label>
				<select>
					{product.sizes.map((size, index) => (
						<option key={index} value={size}>
							{size}
						</option>
					))}
				</select>
			</div>
			<button className="add-to-cart">Add to Cart</button>
		</div>
	);
};

export default ProductInfo;

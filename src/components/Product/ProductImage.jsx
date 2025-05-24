// components/ProductImage.js

const ProductImage = ({ images }) => {
	return (
		<div className="product-image">
			<img src={images[0]} alt="Main Product Image" />
			<div className="image-thumbnails">
				{images.map((image, idx) => (
					<img key={idx} src={image} alt={`Product thumbnail ${idx + 1}`} />
				))}
			</div>
		</div>
	);
};

export default ProductImage;

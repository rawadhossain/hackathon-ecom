import { GraduationCap, MapPin } from 'lucide-react';
import React from 'react';

function NumberWithCommas({ value }) {
	const formattedValue = value.toLocaleString();

	return <span>{formattedValue}</span>;
}

//TODO Add star images
//TODO change date to time ago
const ProductCard = ({
	imageUrl,
	rating,
	reviews,
	seller,
	title,
	price,
	originalPrice,
	date,
	institute,
	location,
}) => {
	return (
		<div className="w-[220px] p-2 border rounded-xl hover:shadow-md relative mx-5 my-2 bg-white">
			<img src={imageUrl} alt={title} className="h-40 rounded-xl w-full object-cover" />

			{/* <Heart className="absolute top-2 right-2 w-5 h-5 text-gray-400 cursor-pointer" /> */}

			{/* Product Details */}
			<div className="mt-2 py-2">
				<p className="text-md font-semibold truncate">{title}</p>

				<div className="mt-1 text-sm">
					<div className="flex items-center align-center space-x-1">
						<span className="font-bold text-3xl">৳</span>
						<p className="font-medium text-3xl">
							<NumberWithCommas value={price} />
						</p>
					</div>
				</div>

				{/* User Details  */}
				<div className="flex items-center space-x-1 mt-2">
					<p className="text-sm text-gray-500 font-semibold">{seller}</p>
					{/* TODO Add image and verified badge */}
					<span className="text-black text-xs font-medium">★ {rating}</span>
				</div>
				<div className="my-2 space-y-1">
					<div className="flex space-x-2 items-center">
						<GraduationCap size={15} />
						<p className="text-gray-500 text-xs truncate">{institute}</p>
					</div>
					<div className="flex space-x-2 items-center">
						<MapPin size={15} color="#bf2900" />
						<p className="text-gray-500 text-xs truncate">{location}</p>
					</div>
				</div>

				{/* Time Details  */}
				<p className="font-light text-sm">{date}</p>
			</div>
		</div>
	);
};

export default ProductCard;

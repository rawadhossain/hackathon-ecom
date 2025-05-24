import { GraduationCap, MapPin, Sparkles } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

function NumberWithCommas({ value }) {
	const formattedValue = value.toLocaleString();

	return <span>{formattedValue}</span>;
}

const formatDateAgo = (date) => {
	const now = new Date();
	const seconds = Math.floor((now - date) / 1000);

	if (seconds < 60) {
		return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
	}

	const minutes = Math.floor(seconds / 60);
	if (minutes < 60) {
		return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
	}

	const hours = Math.floor(minutes / 60);
	if (hours < 24) {
		return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
	}

	const days = Math.floor(hours / 24);
	if (days < 7) {
		return `${days} day${days !== 1 ? 's' : ''} ago`;
	}

	// Return formatted full date if more than 7 days
	return date.toLocaleDateString('en-US', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	}); // e.g. "4 July, 2025"
};

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
	id,
}) => {
	return (
		<Link
			href={`/product/${id}`}
			className="w-[220px] hover:scale-105 transition-all duration-300 p-2 border rounded-xl hover:shadow-md relative mx-5 my-2 bg-white"
		>
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
						{/* <MapPin size={15} color="#bf2900" /> */}
						{/* <p className="text-gray-500 text-xs truncate">{location}</p> */}
					</div>
				</div>

				{/* Time Details  */}
				<div className="flex items-center justify-between space-x-1">
					<p className="font-light text-sm">{formatDateAgo(new Date(date))}</p>
					<Sparkles className="cursor-pointer hover:text-[#2B8A3E]" />
				</div>
			</div>
		</Link>
	);
};

export default ProductCard;

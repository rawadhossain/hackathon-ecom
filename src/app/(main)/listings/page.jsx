import React from 'react';
import ProductCard from '@/components/ProductCard';
import { ArrowUpWideNarrow } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ListingsHome = () => {
	return (
		<>
			<div className="flex justify-between mx-5 my-5 items-center">
				<h1 className="text-2xl font-bold ">View All Listings</h1>
				<ArrowUpWideNarrow />
			</div>

			<div className="mx-5 my-2 space-x-2">
				<Button className="bg-foregroundCustom">Filter</Button>
				<Button className="bg-white text-black hover:bg-foregroundCustom hover:text-white">
					Fixed Sales
				</Button>
				<Button className="bg-white text-black hover:bg-foregroundCustom hover:text-white">
					Biddings
				</Button>
				<Button className="bg-white text-black hover:bg-foregroundCustom hover:text-white">
					Services
				</Button>
			</div>

			<div className="flex flex-wrap justify-center">
				<ProductCard
					imageUrl="https://images-cdn.ubuy.co.in/6640b1766297886eb501f2ee-ps5-playstation-5-sony-console-ship-fast.jpg"
					rating={4.9}
					reviews={178}
					seller="Rawad Hossain"
					title="5 year old Playstation 5"
					price={19500}
					originalPrice={23000}
					date={new Date('2025-05-24T09:30:00')}
					institute="Islamic University of Technology"
					location="Boardbazar, Dhaka"
				/>

				<ProductCard
					imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUAkp4SDf8fRR6dMT1gFAVH4iYpYaWIPdsTA&s"
					rating={4.8}
					reviews={89}
					seller="Faiza Akter"
					title="Used Kindle Paperwhite 10th Gen"
					price={8500}
					originalPrice={12000}
					date={new Date('2025-05-21T09:30:00')}
					institute="Dhaka University"
					location="Dhaka University, Dhaka"
				/>

				<ProductCard
					imageUrl="https://m.media-amazon.com/images/I/61cwywLZR-L._AC_SL1500_.jpg"
					rating={4.7}
					reviews={322}
					seller="Nafiul Islam"
					title="iPhone 11 (Black, 64 GB)"
					price={36000}
					originalPrice={42000}
					date={new Date('2025-05-22T09:30:00')}
					institute="BRAC University"
					location="Rampura, Dhaka"
				/>

				<ProductCard
					imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnmLz0YKdPlJDhfZP_T794gkYD5ziC8H9auA&s"
					rating={4.5}
					reviews={55}
					seller="Tahsin Rahman"
					title="Dell Inspiron 15, i5 10th Gen"
					price={29500}
					originalPrice={35000}
					date={new Date('2025-05-24T01:30:00')}
					institute="North South University"
					location="Bashundhara, Dhaka"
				/>

				<ProductCard
					imageUrl="https://m.media-amazon.com/images/I/61y2VVWcGBL._SL1500_.jpg"
					rating={4.6}
					reviews={102}
					seller="Mariam Binte"
					title="Canon DSLR Camera EOS 200D II"
					price={42500}
					originalPrice={52000}
					date={new Date('2025-05-24T12:30:00')}
					institute="Jahangirnagar University"
					location="Savar, Dhaka"
				/>

				<ProductCard
					imageUrl="https://assets.mamunbooks.com/public/frontend/thumbnail/003979-003979-t-641152644a75d.jpg"
					rating={4.9}
					reviews={12}
					seller="Tanzim Chowdhury"
					title="First Year CSE Book Bundle"
					price={1800}
					originalPrice={2500}
					date={new Date('2025-04-24T09:30:00')}
					institute="South East University"
					location="Mohakhali, Dhaka"
				/>
			</div>
		</>
	);
};

export default ListingsHome;

'use client';

import CreateListingForm from '@/components/AddListing/addListingForm';
import React from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const AddNewList = () => {
	const router = useRouter();
	const handleSubmit = async (data) => {
		console.log('Form data:', data);

		const handleSubmit = async (data) => {
			try {
				const res = await fetch('../../api/listings', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
				});

				if (!res.ok) {
					const errorData = await res.json();
					throw new Error(errorData.error || 'Failed to create listing');
				}

				const responseData = await res.json();
				toast.success('Listing created successfully!');
				router.push('/listings');
			} catch (err) {
				console.error('Submission failed:', err);
				toast.error(err.message || 'Failed to create listing. Please try again.');
				throw err; // Re-throw to be handled by the form
			}
		};

		return (
			<div className="my-4 flex items-center justify-center px-4">
				<CreateListingForm onSubmit={handleSubmit} />
			</div>
		);
	};
};
export default AddNewList;

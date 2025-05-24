'use client';

import CreateListingForm from '@/components/AddListing/addListingForm';
import React from 'react';
import { toast } from 'sonner';

const AddNewList = () => {
	const handleSubmit = async (data) => {
		console.log('Form data:', data);

		try {
			const res = await fetch('/api/listings', {
				method: 'POST',
				body: JSON.stringify(data),
			});

			console.log('POST request sent');
			if (!res.ok) {
				console.log('Failed POST request.');
				throw new Error('Failed');
			}
			console.log('POST Successful');
			toast.success('Listing created successfully!');
		} catch (err) {
			console.log('Submission failed');
			toast.error('Submission failed');
		}
	};

	return (
		<div className="my-4 flex items-center justify-center px-4">
			<CreateListingForm onSubmit={handleSubmit} />
		</div>
	);
};

export default AddNewList;

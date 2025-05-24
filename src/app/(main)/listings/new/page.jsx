'use client';

import CreateListingForm from '@/components/AddListing/addListingForm';
import React from 'react';

const AddNewList = () => {
	const handleSubmit = async (data) => {
		try {
			const res = await fetch('/api/listings', {
				method: 'POST',
				body: JSON.stringify(data),
			});

			if (!res.ok) throw new Error('Failed');
			toast.success('Listing created successfully!');
		} catch (err) {
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

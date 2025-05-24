'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useUser } from '@clerk/nextjs';

const ReviewForm = ({ productId, onReviewSubmit }) => {
	const { user } = useUser();
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!rating || !comment) return;

		setIsSubmitting(true);
		try {
			const review = {
				user: user.fullName,
				rating,
				comment,
				date: new Date().toISOString().split('T')[0],
				avatar: user.imageUrl,
			};

			// Here you would typically send this to your API
			// For now, we'll just call the callback
			onReviewSubmit(review);

			// Reset form
			setRating(0);
			setComment('');
		} catch (error) {
			console.error('Error submitting review:', error);
		} finally {
			setIsSubmitting(false);
		}
	};

	if (!user) {
		return (
			<div className="text-center p-4 bg-gray-50 rounded-lg">
				Please sign in to leave a review
			</div>
		);
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div>
				<label className="block text-sm font-medium mb-2">Rating</label>
				<div className="flex gap-2">
					{[1, 2, 3, 4, 5].map((star) => (
						<button
							key={star}
							type="button"
							onClick={() => setRating(star)}
							className="text-2xl focus:outline-none"
						>
							{star <= rating ? '★' : '☆'}
						</button>
					))}
				</div>
			</div>

			<div>
				<label className="block text-sm font-medium mb-2">Your Review</label>
				<Textarea
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					placeholder="Write your review here..."
					className="min-h-[100px]"
					required
				/>
			</div>

			<Button type="submit" disabled={!rating || !comment || isSubmitting} className="w-full">
				{isSubmitting ? 'Submitting...' : 'Submit Review'}
			</Button>
		</form>
	);
};

export default ReviewForm;

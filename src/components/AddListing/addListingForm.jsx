'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
	Select,
	SelectItem,
	SelectTrigger,
	SelectContent,
	SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';

const formSchema = z.object({
	title: z.string().min(1),
	description: z.string().min(1),
	type: z.enum(['OBJECT', 'SERVICE']),
	condition: z.enum(['NEW', 'LIKE_NEW', 'GOOD', 'FAIR']).optional(),
	price: z.coerce.number().gt(0),
	pricingType: z.enum(['FIXED', 'BID', 'HOURLY']),
	imageUrls: z.array(z.string().url()),
	isVisibleToAll: z.boolean(),
	university: z.string().min(1),
	meetupLocation: z.string().optional(),
});

export default function CreateListingForm({ onSubmit }) {
	const [images, setImages] = useState([]);
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			isVisibleToAll: true,
			imageUrls: [],
		},
	});

	const handleImageUpload = async (e) => {
		const file = e.target.files[0];
		if (!file) return;

		const formData = new FormData();
		formData.append('file', file);
		formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

		console.log('Uploading image...');
		try {
			const res = await fetch(
				`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
				{
					method: 'POST',
					body: formData,
				}
			);

			const data = await res.json();
			if (data.secure_url) {
				const newImages = [...images, data.secure_url];
				console.log(newImages);
				console.log('Image Uploaded');
				setImages(newImages);
				setValue('imageUrls', newImages);
				toast.success('Image uploaded successfully!');
			} else {
				throw new Error('Upload failed');
			}
		} catch (err) {
			console.log('Image upload failed');
			toast.error('Image upload failed');
		}
	};

	// const addImageField = () => setImages([...images, '']);

	return (
		<form
			onSubmit={handleSubmit((data) => onSubmit(data))}
			className="space-y-4 max-w-lg w-full bg-white px-15 py-5 sm:p-6 border rounded-xl"
		>
			<h1 className="text-2xl font-bold">Create Listing</h1>
			<Input {...register('title')} placeholder="Title" />
			<Textarea {...register('description')} placeholder="Description" />

			<Select onValueChange={(val) => setValue('type', val)}>
				<SelectTrigger>
					<SelectValue placeholder="Select type" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="OBJECT">Object</SelectItem>
					<SelectItem value="SERVICE">Service</SelectItem>
				</SelectContent>
			</Select>

			<Select onValueChange={(val) => setValue('condition', val)}>
				<SelectTrigger>
					<SelectValue placeholder="Select condition (optional)" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="NEW">New</SelectItem>
					<SelectItem value="LIKE_NEW">Like New</SelectItem>
					<SelectItem value="GOOD">Good</SelectItem>
					<SelectItem value="FAIR">Fair</SelectItem>
				</SelectContent>
			</Select>

			<Input type="number" step="0.01" {...register('price')} placeholder="Price" />

			<Select onValueChange={(val) => setValue('pricingType', val)}>
				<SelectTrigger>
					<SelectValue placeholder="Select pricing type" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="FIXED">Fixed</SelectItem>
					<SelectItem value="BID">Bidding</SelectItem>
					<SelectItem value="HOURLY">Hourly</SelectItem>
				</SelectContent>
			</Select>

			<div className="space-y-2">
				<input type="file" accept="image/*" onChange={handleImageUpload} />
				{images.length > 0 && (
					<div className="grid grid-cols-2 gap-2">
						{images.map((url, i) =>
							url ? (
								<img
									key={i}
									src={url}
									alt={`Uploaded ${i}`}
									className="h-24 w-full object-cover rounded-md"
								/>
							) : null
						)}
					</div>
				)}
			</div>

			<div className="flex items-center space-x-2">
				<Switch
					id="visibility"
					checked={watch('isVisibleToAll')}
					onCheckedChange={(val) => setValue('isVisibleToAll', val)}
				/>
				<label htmlFor="visibility">Visible to all universities</label>
			</div>

			<Input {...register('university')} placeholder="University" />
			<Input {...register('meetupLocation')} placeholder="Meetup location (optional)" />

			<Button type="submit">Create Listing</Button>

			{Object.keys(errors).length > 0 && (
				<div className="text-red-500 text-sm">
					{Object.entries(errors).map(([key, val]) => (
						<p key={key}>
							{key}: {val.message}
						</p>
					))}
				</div>
			)}
		</form>
	);
}

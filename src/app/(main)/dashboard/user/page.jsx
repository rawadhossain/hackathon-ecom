'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

const schema = z.object({
	university: z.string().min(1, 'University is required'),
	department: z.string().min(1, 'Department is required'),
	program: z.string().min(1, 'Program is required'),
	year: z.string().min(1, 'Year is required'),
	phone: z
		.string()
		.min(10, 'Phone must be at least 10 digits')
		.max(15, 'Phone number too long')
		.regex(/^\d+$/, 'Phone must contain only numbers'),
});

const UserDashboard = () => {
	const form = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			university: '',
			department: '',
			program: '',
			year: '',
			phone: '',
		},
	});

	const onSubmit = async (values) => {
		try {
			const res = await fetch('/api/user/update', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(values),
			});

			if (!res.ok) throw new Error('Failed to update profile');

			const updated = await res.json();
			toast.success('Profile updated successfully!');
			console.log('Updated user:', updated);
		} catch (err) {
			toast.error('Error updating profile.');
			console.error(err);
		}
	};

	return (
		<Card className="max-w-xl mx-auto mt-10 p-6">
			<CardContent>
				<h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="university"
							render={({ field }) => (
								<FormItem>
									<FormLabel>University</FormLabel>
									<FormControl>
										<Input
											placeholder="e.g., Islamic University of Technology"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="department"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Department</FormLabel>
									<FormControl>
										<Input placeholder="e.g., Computer Science" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="program"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Program</FormLabel>
									<FormControl>
										<Input placeholder="e.g., B.Tech" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="year"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Year</FormLabel>
									<FormControl>
										<Input placeholder="e.g., 2nd Year" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="phone"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Phone Number</FormLabel>
									<FormControl>
										<Input placeholder="e.g., 9876543210" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" className="w-full bg-foregroundCustom">
							Save
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};

export default UserDashboard;

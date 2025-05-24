import prisma from '@/lib/db';

export async function DELETE(req, { params }) {
	const productId = params.id;

	try {
		await prisma.product.delete({
			where: { id: productId },
		});

		return new Response(JSON.stringify({ message: 'Deleted' }), { status: 200 });
	} catch (err) {
		console.error(err);
		return new Response(JSON.stringify({ error: 'Failed to delete' }), { status: 500 });
	}
}

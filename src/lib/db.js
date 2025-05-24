const { PrismaClient } = require('@prisma/client');

const prismaClientSingleton = () => {
	return new PrismaClient();
};

if (process.env.NODE_ENV !== 'production') {
	// eslint-disable-next-line no-var
	if (!globalThis.prisma) {
		globalThis.prisma = prismaClientSingleton();
	}
}

const prisma = globalThis.prisma || prismaClientSingleton();

module.exports = prisma;

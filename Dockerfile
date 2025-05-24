# Use official Node.js LTS image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./

# Copy the rest of your code
COPY . .

# Generate Prisma client (if using Prisma)
RUN npx prisma generate

# Build the Next.js app
RUN npm run build

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
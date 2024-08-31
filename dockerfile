# Stage 1: Build
FROM node:18-alpine AS builder

# Install necessary build tools
RUN apk add --no-cache build-base python3

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Runtime
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the built application from the builder stage
COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Expose the port that Next.js will run on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]

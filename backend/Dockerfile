# Stage 1: Build the Nest.js application
FROM node:21 AS builder

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Nest.js application
RUN npm run build

# Stage 2: Create the final Docker image
FROM node:21

WORKDIR /app

# Copy built files from the previous stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# Expose the port on which your Nest.js application runs
EXPOSE 3000

# Command to start the application
CMD ["npm", "run", "start:prod"]
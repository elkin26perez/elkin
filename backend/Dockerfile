# Use Node.js LTS
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install pnpm globally
RUN npm install 

# Install dependencies

# Copy application code
COPY . .

# Expose port and run the application
EXPOSE 4321
CMD ["npm", "run", "start"]
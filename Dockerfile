# Stage 1: Build Stage
FROM node:18 as build

# Set the working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the application files
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production Stage
FROM node:18 as production

# Set the working directory
WORKDIR /usr/src/app

# Copy production dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy built files from the build stage
COPY --from=build /usr/src/app/dist ./dist

# Copy additional files needed at runtime
COPY database.json ./database.json
RUN mkdir -p logs
RUN mkdir -p migrations

# COPY logs ./logs
COPY migrations ./migrations

# Expose the application port
EXPOSE 8080

# Start the application
CMD ["npm", "start"]

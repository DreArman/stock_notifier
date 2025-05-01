# Build stage
FROM node:18 AS builder

WORKDIR /app

# Accept build-time variable
ARG VITE_SERVER_URL

# Copy source code
COPY . .

# Install dependencies
RUN npm install

# Build the app with the provided API URL
ENV VITE_SERVER_URL=${VITE_SERVER_URL}
RUN npm run build

# Serve stage
FROM node:18

# Install static file server
RUN npm install -g serve

WORKDIR /app

# Copy the built files from the builder stage
COPY --from=builder /app/dist .

# Expose port and serve the app
EXPOSE 80
CMD ["serve", "-s", ".", "-l", "80"]

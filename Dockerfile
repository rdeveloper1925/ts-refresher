# Multi-stage build for optimal image size and security
# Stage 1: Build the application
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies first (better Docker layer caching)
# Copy package files to leverage Docker's layer caching
COPY package*.json ./

# Install dependencies with clean install for production builds
RUN npm ci && npm cache clean --force

# Copy source code
COPY . .

# Build the application for production
# Vite will output to dist/ directory by default
RUN npm run build

# Stage 2: Production server
FROM nginx:alpine AS production

# Set production environment variable
ENV NODE_ENV=production

# Install security updates and reduce image size
RUN apk --no-cache add curl && \
    rm -rf /var/cache/apk/*

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Create nginx PID directory
RUN touch /var/run/nginx.pid

# Expose port (standard HTTP port)
EXPOSE 80

# Add health check matching previous docker-compose configuration
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD curl -f http://localhost/health || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

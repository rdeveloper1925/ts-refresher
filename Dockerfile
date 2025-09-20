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

# Install security updates and reduce image size
RUN apk --no-cache add curl && \
    rm -rf /var/cache/apk/*

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Create non-root user for security
# RUN addgroup -g 1001 -S nginx && \
#     adduser -S -D -H -u 1001 -h /var/cache/nginx -s /sbin/nologin -G nginx -g nginx nginx

# Change ownership of nginx directories
# RUN chown -R nginx:nginx /var/cache/nginx && \
#     chown -R nginx:nginx /var/log/nginx && \
#     chown -R nginx:nginx /etc/nginx/conf.d

# Create nginx PID directory
# RUN touch /var/run/nginx.pid && \
#     chown -R nginx:nginx /var/run/nginx.pid
RUN touch /var/run/nginx.pid 
    #&& \
    #chown -R nginx:nginx /var/run/nginx.pid

# Switch to non-root user
#USER nginx

# Expose port (standard HTTP port)
EXPOSE 5173

# Add health check for container orchestration
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
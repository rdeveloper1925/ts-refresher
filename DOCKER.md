# Docker Deployment Guide

This application now uses standalone Docker commands instead of docker-compose. All the functionality from docker-compose has been integrated into the Dockerfile and helper scripts.

## Quick Start

### Build and Run

```bash
./run-container.sh
```

This script will:
- Build the Docker image
- Create the network if needed
- Start the container with all production configurations

### Stop the Container

```bash
./stop-container.sh
```

## Manual Docker Commands

If you prefer to run Docker commands manually:

### Build the Image

```bash
docker build --target production -t ts-refresher:latest .
```

### Create the Network (one-time setup)

```bash
docker network create --driver bridge --subnet 172.20.0.0/16 frontend
```

### Run the Container

```bash
docker run -d \
    --name matt-apps \
    --network frontend \
    --restart unless-stopped \
    --cpus="0.5" \
    --memory="256m" \
    --memory-reservation="128m" \
    --security-opt no-new-privileges:true \
    --read-only \
    --tmpfs /var/cache/nginx:rw,noexec,nosuid,size=50m \
    --tmpfs /var/log/nginx:rw,noexec,nosuid,size=50m \
    --tmpfs /var/run:rw,noexec,nosuid,size=50m \
    --log-driver json-file \
    --log-opt max-size=10m \
    --log-opt max-file=3 \
    --label "traefik.enable=true" \
    --label "traefik.http.routers.react-app.rule=Host(\`localhost\`)" \
    --label "com.docker.compose.project=coolify-front" \
    -p 80:80 \
    ts-refresher:latest
```

## Configuration Details

### Security Features

- **Read-only filesystem**: Container runs with read-only root filesystem
- **No privilege escalation**: `no-new-privileges` security option enabled
- **Tmpfs mounts**: Writable directories mounted as tmpfs for nginx operation

### Resource Limits

- **CPU**: Limited to 0.5 cores (reservation: 0.25 cores)
- **Memory**: Limited to 256MB (reservation: 128MB)

### Health Check

- **Endpoint**: `http://localhost/health`
- **Interval**: 30 seconds
- **Timeout**: 10 seconds
- **Retries**: 3
- **Start period**: 40 seconds

### Logging

- **Driver**: json-file
- **Max file size**: 10MB
- **Max files**: 3

### Network

- **Name**: frontend
- **Driver**: bridge
- **Subnet**: 172.20.0.0/16

## Useful Commands

```bash
# View logs
docker logs matt-apps

# Follow logs in real-time
docker logs -f matt-apps

# Stop container
docker stop matt-apps

# Start container
docker start matt-apps

# Restart container
docker restart matt-apps

# Access container shell
docker exec -it matt-apps sh

# Check container health
docker inspect --format='{{.State.Health.Status}}' matt-apps

# View container stats
docker stats matt-apps

# Remove container
docker rm -f matt-apps

# Remove network
docker network rm frontend

# Remove image
docker rmi ts-refresher:latest
```

## Build Arguments

The Dockerfile accepts the following build arguments for Vite environment variables:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_SECRET`
- `VITE_CLOUD_SUPABASE_URL`
- `VITE_CLOUD_SUPABSE_SECRET`
- `VITE_AUTH_REDIR`

Example:

```bash
docker build \
    --target production \
    --build-arg VITE_SUPABASE_URL=your_url \
    --build-arg VITE_SUPABASE_SECRET=your_secret \
    -t ts-refresher:latest .
```

## Port Configuration

The application is exposed on port 80. To use a different port, modify the `-p` flag:

```bash
# Run on port 8080 instead
docker run -d ... -p 8080:80 ts-refresher:latest
```

## Troubleshooting

### Container won't start

Check logs:
```bash
docker logs matt-apps
```

### Health check failing

The health check expects a `/health` endpoint. Verify your nginx configuration includes this endpoint.

### Permission issues

If you encounter permission issues with the read-only filesystem, ensure tmpfs mounts are properly configured.

### Port already in use

If port 80 is already in use, either:
1. Stop the conflicting service
2. Use a different port with `-p 8080:80`

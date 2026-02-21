#!/bin/bash

# Script to run the React app container with all docker-compose features
# This replaces docker-compose.yml with direct docker commands

# Configuration variables
CONTAINER_NAME="matt-apps"
IMAGE_NAME="ts-refresher:latest"
NETWORK_NAME="frontend"
SUBNET="172.20.0.0/16"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Building Docker image...${NC}"
docker build --target production -t ${IMAGE_NAME} .

if [ $? -ne 0 ]; then
    echo "Build failed!"
    exit 1
fi

echo -e "${GREEN}Build successful!${NC}"

# Create network if it doesn't exist
if ! docker network inspect ${NETWORK_NAME} >/dev/null 2>&1; then
    echo -e "${BLUE}Creating network ${NETWORK_NAME}...${NC}"
    docker network create \
        --driver bridge \
        --subnet ${SUBNET} \
        ${NETWORK_NAME}
fi

# Stop and remove existing container if it exists
if docker ps -a --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
    echo -e "${BLUE}Removing existing container...${NC}"
    docker stop ${CONTAINER_NAME} >/dev/null 2>&1
    docker rm ${CONTAINER_NAME} >/dev/null 2>&1
fi

echo -e "${BLUE}Starting container...${NC}"

# Run the container with all docker-compose features
docker run -d \
    --name ${CONTAINER_NAME} \
    --network ${NETWORK_NAME} \
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
    ${IMAGE_NAME}

if [ $? -eq 0 ]; then
    echo -e "${GREEN}Container started successfully!${NC}"
    echo -e "${BLUE}Container name:${NC} ${CONTAINER_NAME}"
    echo -e "${BLUE}Access the app at:${NC} http://localhost"
    echo ""
    echo -e "${BLUE}Useful commands:${NC}"
    echo "  docker logs ${CONTAINER_NAME}        - View logs"
    echo "  docker logs -f ${CONTAINER_NAME}     - Follow logs"
    echo "  docker stop ${CONTAINER_NAME}        - Stop container"
    echo "  docker start ${CONTAINER_NAME}       - Start container"
    echo "  docker restart ${CONTAINER_NAME}     - Restart container"
    echo "  docker exec -it ${CONTAINER_NAME} sh - Access container shell"
else
    echo "Failed to start container!"
    exit 1
fi

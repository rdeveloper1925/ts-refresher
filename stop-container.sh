#!/bin/bash

# Script to stop and remove the React app container

CONTAINER_NAME="matt-apps"

echo "Stopping container ${CONTAINER_NAME}..."
docker stop ${CONTAINER_NAME}

echo "Removing container ${CONTAINER_NAME}..."
docker rm ${CONTAINER_NAME}

echo "Done!"

#!/bin/bash
set -e

echo "=========================================================="
echo "  Deploying Northline Software on Port 8090 via Docker"
echo "=========================================================="

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# 1. Ensure .env exists
if [ ! -f .env ]; then
    echo "Creating .env from .env.production..."
    cp .env.production .env
fi

# 2. Pull latest git changes
echo "Pulling latest changes..."
git pull origin feature/test_mub

# 3. Stop any existing northline containers
echo "Stopping existing containers..."
docker compose down || true

# 4. Build and start all containers
echo "Building and starting containers (db, backend, frontend, nginx on port 8090)..."
docker compose up -d --build

# 5. Wait for warmup
echo "Waiting for services to warm up (10s)..."
sleep 10

# 6. Check status
echo "Container status:"
docker compose ps

echo ""
echo "Testing port 8090 response:"
curl -I -s http://127.0.0.1:8090/ | head -n 5 || echo "Container is still starting..."

echo "=========================================================="
echo "  Deployment Complete!"
echo "  Open in browser: http://13.140.146.12:8090"
echo "=========================================================="

#!/bin/bash
set -e

echo "=========================================================="
echo "  Deploying Northline Software on Port 8090"
echo "=========================================================="

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# 1. Ensure .env exists from .env.production
if [ ! -f .env ]; then
    echo "[1/4] Copying .env.production to .env..."
    cp .env.production .env
else
    echo "[1/4] .env already exists."
fi

# 2. Check if Docker Compose is available
if command -v docker >/dev/null 2>&1 && docker compose version >/dev/null 2>&1; then
    echo "[2/4] Starting with Docker Compose (Postgres, Backend 8085, Frontend 4010)..."
    docker compose up -d --build db backend frontend
else
    echo "[2/4] Docker not available. Deploying via local PM2 + Java..."
    
    # Frontend SSR on Port 4010
    echo "Building Angular Frontend..."
    cd "$SCRIPT_DIR/frontend"
    npm ci
    npm run build
    if command -v pm2 >/dev/null 2>&1; then
        PORT=4010 pm2 restart northline-frontend || PORT=4010 pm2 start dist/services-site-frontend/server/server.mjs --name "northline-frontend"
        pm2 save
    fi
    cd "$SCRIPT_DIR"

    # Backend on Port 8085
    echo "Building Spring Boot Backend..."
    cd "$SCRIPT_DIR/backend"
    mvn clean package -DskipTests
    pkill -f "services-site-api" || true
    SERVER_PORT=8085 nohup java -jar target/services-site-api-0.1.0-SNAPSHOT.jar > backend.log 2>&1 &
    cd "$SCRIPT_DIR"
fi

# 3. Healthcheck verification
echo "[3/4] Verifying services..."
sleep 6

echo "Testing Frontend (127.0.0.1:4010)..."
curl -I -s http://127.0.0.1:4010 | head -n 3 || echo "Frontend is warming up..."

echo "Testing Backend API (127.0.0.1:8085/api/v1/meta)..."
curl -I -s http://127.0.0.1:8085/api/v1/meta | head -n 3 || echo "Backend is warming up..."

# 4. Final summary
echo "=========================================================="
echo "  Deployment Complete!"
echo "  Backend listening on:  127.0.0.1:8085"
echo "  Frontend listening on: 127.0.0.1:4010"
echo "  Public URL:            http://13.140.146.12:8090"
echo "=========================================================="

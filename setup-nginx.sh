#!/bin/bash
set -e

echo "Configuring Host Nginx for Port 8090..."
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [ -d "/etc/nginx/sites-available" ]; then
    sudo cp "$SCRIPT_DIR/nginx/host-nginx-8090.conf" /etc/nginx/sites-available/northline-8090.conf
    sudo ln -sf /etc/nginx/sites-available/northline-8090.conf /etc/nginx/sites-enabled/northline-8090.conf
else
    sudo cp "$SCRIPT_DIR/nginx/host-nginx-8090.conf" /etc/nginx/conf.d/northline-8090.conf
fi

sudo nginx -t
sudo systemctl reload nginx
echo "Host Nginx reloaded successfully on port 8090!"

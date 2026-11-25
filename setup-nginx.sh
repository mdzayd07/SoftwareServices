#!/bin/bash
set -e

echo "Configuring Host Nginx for Port 8090..."
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Check where Nginx config lives
if [ ! -d "/etc/nginx" ]; then
    echo "Error: /etc/nginx not found. Is Nginx installed elsewhere?"
    exit 1
fi

# Check if 8090 is already mentioned in existing configs
EXISTING_8090=$(grep -rn "listen.*8090" /etc/nginx/ 2>/dev/null || true)
if [ -n "$EXISTING_8090" ]; then
    echo "Note: Found existing 8090 listener:"
    echo "$EXISTING_8090"
fi

if [ -d "/etc/nginx/sites-available" ]; then
    mkdir -p /etc/nginx/sites-available /etc/nginx/sites-enabled
    cp "$SCRIPT_DIR/nginx/host-nginx-8090.conf" /etc/nginx/sites-available/northline-8090.conf
    ln -sf /etc/nginx/sites-available/northline-8090.conf /etc/nginx/sites-enabled/northline-8090.conf
    echo "Configured in /etc/nginx/sites-available/northline-8090.conf and linked."
else
    mkdir -p /etc/nginx/conf.d
    cp "$SCRIPT_DIR/nginx/host-nginx-8090.conf" /etc/nginx/conf.d/northline-8090.conf
    echo "Configured in /etc/nginx/conf.d/northline-8090.conf."
fi

# Test Nginx syntax
nginx -t

# Reload Nginx
if command -v systemctl >/dev/null 2>&1; then
    systemctl reload nginx
else
    service nginx reload
fi

echo "Host Nginx reloaded successfully on port 8090!"

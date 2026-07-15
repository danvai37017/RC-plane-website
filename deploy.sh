#!/bin/bash
set -e
npm run build
export $(grep -v '^#' .env | xargs)
scp -r -i "$KEY_PATH" ./dist/. ubuntu@$SERVER_IP:/var/www/html/
echo "Deploy complete."
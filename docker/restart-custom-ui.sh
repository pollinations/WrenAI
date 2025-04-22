#!/bin/bash

echo "Restarting custom UI container..."
docker-compose -f docker-compose-custom-ui.yaml up -d wren-ui-custom

echo "Custom UI is now running on port 23001"
echo "Open http://localhost:23001 in your browser"

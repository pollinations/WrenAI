#!/bin/bash

echo "Building custom UI in the background..."
echo "This may take several minutes. The original UI will remain running."
echo "You can continue to use the original UI at http://localhost:23000"

# Build the custom UI image
docker-compose -f docker-compose-custom-ui.yaml build --no-cache wren-ui-custom

echo "Build completed!"
echo "To start the custom UI, run: docker-compose -f docker-compose-custom-ui.yaml up -d wren-ui-custom"
echo "The custom UI will be available at http://localhost:23001"

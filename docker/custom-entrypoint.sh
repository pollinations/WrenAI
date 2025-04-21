#!/bin/bash

# Run the original entrypoint in the background
/usr/local/bin/docker-entrypoint.sh "$@" &

# Store the PID of the original entrypoint
ORIGINAL_PID=$!

# Wait for the Next.js server to start (adjust the sleep time if needed)
echo "Waiting for Next.js server to start..."
sleep 10

# Run our custom script to replace URLs
/app/replace-urls.sh

# Wait for the original entrypoint to exit
wait $ORIGINAL_PID

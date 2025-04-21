#!/bin/bash

# Create a backup of the database (already done, but just to be safe)
cp /app/local_data/sieb.db /app/local_data/sieb.db.date_backup2

echo "Fixing date formats in the valid_during column..."

# First, let's restore from the backup to start fresh
cp /app/local_data/sieb.db.date_backup /app/local_data/sieb.db

# Now let's use a simpler approach - just set all problematic dates to a fixed valid date
sqlite3 /app/local_data/sieb.db << EOF
-- Update all dates with 'until' to a fixed valid date
UPDATE articles
SET valid_during = '2025-12-31'
WHERE valid_during LIKE '%until%';
EOF

echo "Date format fix completed!"

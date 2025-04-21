#!/bin/bash

# List of INTEGER and REAL columns to fix
COLUMNS=(
  "ordering_unit"
  "package_count"
  "packaging_unit"
  "packed_volume"
  "packed_weight_kg"
  "constructed_weight_kg"
  "max_orderable"
  "min_orderable"
  "price"
  "ordering_unit_price"
  "purchase_price"
  "responsible_employee_id"
  "min_stock"
)

# Create a backup of the database
cp /app/local_data/sieb.db /app/local_data/sieb.db.fix_backup

# Fix each column
for column in "${COLUMNS[@]}"; do
  echo "Fixing column: $column"
  sqlite3 /app/local_data/sieb.db "UPDATE articles SET $column = NULL WHERE $column = '';"
done

echo "Database fix completed!"

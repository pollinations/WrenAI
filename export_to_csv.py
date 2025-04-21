#!/usr/bin/env python3
import sqlite3
import csv
import os

# Create output directory if it doesn't exist
output_dir = "sieb_export"
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

# Connect to the SQLite database
conn = sqlite3.connect('data/sieb.db')
cursor = conn.cursor()

# Get list of tables
cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';")
tables = cursor.fetchall()

# Export each table to a CSV file
for table in tables:
    table_name = table[0]
    print(f"Exporting table {table_name} to CSV...")
    
    # Get column names
    cursor.execute(f"PRAGMA table_info({table_name});")
    columns = [column[1] for column in cursor.fetchall()]
    
    # Get all rows
    cursor.execute(f"SELECT * FROM {table_name};")
    rows = cursor.fetchall()
    
    # Write to CSV
    csv_file_path = os.path.join(output_dir, f"{table_name}.csv")
    with open(csv_file_path, 'w', newline='', encoding='utf-8') as csv_file:
        csv_writer = csv.writer(csv_file)
        csv_writer.writerow(columns)  # Write header
        csv_writer.writerows(rows)    # Write data
    
    print(f"Exported {len(rows)} rows to {csv_file_path}")

# Close the connection
conn.close()

print(f"\nExport complete. Files are in the '{output_dir}' directory.")
print("You can now upload these CSV files to Databricks.")

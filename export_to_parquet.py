#!/usr/bin/env python3
import sqlite3
import pandas as pd
import os

# Create output directory if it doesn't exist
output_dir = "sieb_export_parquet"
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

# Connect to the SQLite database
conn = sqlite3.connect('data/sieb.db')

# Get list of tables
cursor = conn.cursor()
cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';")
tables = cursor.fetchall()

# Export each table to a Parquet file
for table in tables:
    table_name = table[0]
    print(f"Exporting table {table_name} to Parquet...")
    
    # Read the table into a pandas DataFrame
    df = pd.read_sql_query(f"SELECT * FROM {table_name}", conn)
    
    # Write to Parquet
    parquet_file_path = os.path.join(output_dir, f"{table_name}.parquet")
    df.to_parquet(parquet_file_path, index=False)
    
    print(f"Exported {len(df)} rows to {parquet_file_path}")

# Close the connection
conn.close()

print(f"\nExport complete. Files are in the '{output_dir}' directory.")
print("You can now upload these Parquet files to Databricks.")

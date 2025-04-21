-- Install and load the SQLite extension
INSTALL sqlite;
LOAD sqlite;

-- Attach the SQLite database with proper type specification
ATTACH '/app/local_data/sieb.db' AS sieb (TYPE sqlite);

-- Set the active database to sieb
USE sieb;

-- Optional: Verify that primary keys and constraints were properly imported
-- You can uncomment these lines to check the schema of specific tables
-- DESCRIBE orders;
-- DESCRIBE customers;
-- DESCRIBE articles;
-- DESCRIBE employees;
-- DESCRIBE units;

-- Note: When using DuckDB's SQLite extension with ATTACH (TYPE sqlite),
-- the primary keys and constraints from the original SQLite database should be preserved.
-- If you encounter any issues with constraints, you can verify them using the DESCRIBE command.

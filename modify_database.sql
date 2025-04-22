-- Install and load the SQLite extension
INSTALL sqlite;
LOAD sqlite;

-- Attach the SQLite database with proper type specification
ATTACH '/data/sieb.db' AS sieb (TYPE sqlite);

-- Set the active database to sieb
USE sieb;

-- List all tables in the database to see what we're working with
PRAGMA table_list;

-- You can add your modification commands here
-- For example:
-- ALTER TABLE your_table ADD COLUMN new_column VARCHAR;
-- UPDATE your_table SET column_name = 'new_value' WHERE condition;
-- CREATE TABLE new_table (id INTEGER PRIMARY KEY, name VARCHAR);

-- Verify changes
-- SELECT * FROM your_modified_table LIMIT 5;

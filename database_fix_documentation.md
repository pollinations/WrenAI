# Database Fix Documentation

## Issue
The SQLite database (`sieb.db`) had type mismatches in the `articles` table. Several columns were defined as INTEGER or REAL but contained empty strings (""), causing errors when querying the database:

```
Internal server error
java.lang.RuntimeException: io.wren.base.WrenException: Mismatch Type Error: Invalid type in column "package_count": column was declared as integer, found "" of type "text" instead.
```

## Solution
We created a script to fix all INTEGER and REAL columns in the `articles` table by replacing empty strings with NULL values. This ensures type consistency and prevents errors when querying the database.

The following columns were fixed:
- ordering_unit (INTEGER)
- package_count (INTEGER)
- packaging_unit (INTEGER)
- packed_volume (REAL)
- packed_weight_kg (REAL)
- constructed_weight_kg (REAL)
- max_orderable (INTEGER)
- min_orderable (INTEGER)
- price (REAL)
- ordering_unit_price (REAL)
- purchase_price (REAL)
- responsible_employee_id (INTEGER)
- min_stock (INTEGER)

## Implementation
The fix was implemented using a bash script that runs SQLite commands to update each column. A backup of the database was created before making any changes.

## Verification
After applying the fix, we successfully queried the `articles` table and confirmed that the data can now be accessed without type mismatch errors.

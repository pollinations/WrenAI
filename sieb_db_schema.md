# Sieb.db Database Schema and Sample Data

This document provides an overview of the database schema and sample data from the sieb.db SQLite database.

## Tables Overview

The database contains the following tables:
- orders
- customers
- articles
- employees
- units

## Categorical Data

### Orders Table Categories

#### status
```
CANCELED
COMPLETED
NEW
PARTIALLY_COMPLETED
PENDING
PROCESSING
REJECTED
```

#### return_status
```
NOT_RETURNED
```

### Customers Table Categories

#### customer_class
```
AH_BRONZE_1
AH_GOLD_1
AH_IRON_1
AH_PLATINUM_1
AH_SILVER_1
H_BRONZE_1
H_GOLD_1
H_IRON
H_PLATINUM
H_SILVER_1
```

#### stc (Store Type Classification)
```
Andere L&E Einrichtung / Bibliothek / Museum
Badeeinrichtung
Bahnversorgung
Bar
Betrieb Büro
Betrieb Kantine
Bottler House Sales
Bäckerei
Cafe
Cafe - Premium
Cafe - Touristen
Café
Caterer
Disco
Eisdiele
Eishalle / Bowling
Fast Food
Fast Food - Asiastisch
Fast Food - Hamburger
Fast Food - Pizza
Fast Food - Türkisch
Fest / Konzert / Zirkus / Festival
Fine Dining Restaurant
Fleischer / Metzger / Andere Food Verkaufsstelle
Food Wholesaler
Freizeitpark
Gfm 100-250M2
Gfm >250M2
Gfm National
Handelsgastronomie
Hochschule / Universität Mensa
Hotel
Imbiss
Indoor Sport- / Freizeiteinrichtung / Vereinsheim
Kino
Kiosk
Lokal
Messe
Military-Exchange
Non-Food Verkaufsstelle
Operator
Pizzeria
Pub
Restaurant
Sb-Restaurant
Sm 1.000-2.499M2 (Seh)
Sm 1.000-2499M2 (Regie)
Sm 2500-5000M2
Sm 400-999M2 (Regie)
Sm 400-999M2 (Seh)
Spielhalle-, Center
Spielothek
Sporthalle / Anlage
Spätkauf / Trinkhalle
Tankstelle
Vm >5000M2
Wholesale
```

#### payment_term
```
0001
Y112
Y116
YV05
YVA7
YVA8
ZC01
```

#### payment_term_sp
```
1
Y108
Y110
Y114
Y116
YV05
YV06
YVA7
YVA8
YVB2
ZC01
ZVA8
```

### Articles Table Categories

#### type
```
ELECTRONIC
PHYSICAL
VOUCHER
```

#### allow_returns
```
0
1
```

#### state
```
AVAILABLE
LOCKED
```

#### custom_attr_product_rank
```
Other
Premium
```

### Employees Table Categories

#### inactive
```
0
```

## Schema and Sample Data

### Orders Table

#### Schema
```sql
CREATE TABLE IF NOT EXISTS "orders" (
    order_id TEXT,
    order_date TEXT,
    status TEXT,
    return_status TEXT,
    article_id TEXT,
    quantity INTEGER,
    customer_id INTEGER,
    customer_name TEXT,
    customer_address TEXT,
    customer_postal_code INTEGER,
    customer_city TEXT,
    article_name TEXT,
    article_number TEXT,
    PRIMARY KEY (order_id, article_id)
);
CREATE INDEX idx_order_customer ON orders(customer_id);
CREATE INDEX idx_order_postal ON orders(customer_postal_code);
CREATE INDEX idx_order_article ON orders(article_id);
CREATE INDEX idx_order_id ON orders(order_id);
CREATE INDEX idx_order_date ON orders(order_date);
```

#### Sample Data (First 3 Rows)
| order_id | order_date | status | return_status | article_id | quantity | customer_id | customer_name | customer_address | customer_postal_code | customer_city | article_name | article_number |
|----------|------------|--------|--------------|------------|----------|-------------|---------------|------------------|---------------------|--------------|--------------|----------------|
| DE.MON.TO.2410-001735 | 2024-10-06 | PROCESSING | NOT_RETURNED | PEEP.DE.WM00022653 | 3 | | | | | | MO Express Display Petrol - generisch | PEEP.DE.WM00022653 |
| DE.MON.TO.2410-001735 | 2024-10-06 | PROCESSING | NOT_RETURNED | PEEP.DE.WM00023755 | 3 | | | | | | MO Green Zero Sugar FSDU | PEEP.DE.WM00023755 |
| DE.MON.TO.2410-001735 | 2024-10-06 | PROCESSING | NOT_RETURNED | PEEP.DE.WM00023096 | 3 | | | | | | Creature Stapelaufsatz 2023 -1er Bundle | PEEP.DE.WM00023096 |

### Customers Table

#### Schema
```sql
CREATE TABLE IF NOT EXISTS "customers" (
    customer_id INTEGER PRIMARY KEY,
    name TEXT,
    name2 TEXT,
    street TEXT,
    house_number TEXT,
    postal_code INTEGER,
    city TEXT,
    phone1 TEXT,
    phone2 TEXT,
    customer_class TEXT,
    stc_id INTEGER,
    stc TEXT,
    vb INTEGER,
    asm_unit_id INTEGER,
    vl_unit_id INTEGER,
    vb_unit_id INTEGER,
    payment_term TEXT,
    payment_term_sp TEXT,
    customer_group TEXT,
    parent_group TEXT
);
CREATE INDEX idx_customer_vb_unit ON customers(vb_unit_id);
CREATE INDEX idx_customer_asm_unit ON customers(asm_unit_id);
CREATE INDEX idx_customer_vl_unit ON customers(vl_unit_id);
```

#### Sample Data (First 3 Rows)
| customer_id | name | name2 | street | house_number | postal_code | city | phone1 | phone2 | customer_class | stc_id | stc | vb | asm_unit_id | vl_unit_id | vb_unit_id | payment_term | payment_term_sp | customer_group | parent_group |
|-------------|------|-------|--------|--------------|-------------|------|--------|--------|----------------|--------|-----|----|-----------|-----------|-----------|--------------|--------------------|---------------|--------------|
| 503232229 | KdName1_541 | KdName2_541 | POTSDAMER STR. | 2A | 14552 | MICHENDORF | 49332XX433622 | | AH_PLATINUM_1 | 566 | Food Wholesaler | 3800776 | | | | | YV05 | Group109 | ParentGroup65 |
| 503245568 | KdName1_509 | KdName2_509 | OSTRING | 2 | 65205 | WIESBADEN | 49612XX56439 | | H_GOLD_1 | 551 | Vm >5000M2 | 3000291 | | | 10400 | | YV05 | Group93 | ParentGroup43 |
| 503250521 | KdName1_186 | KdName2_186 | BURGSTR. | 6 | 4720 | DÖBELN | 49343XX64124 | | AH_GOLD_1 | 33 | Kino | 3009253 | | | 10774 | | YVA8 | Group27 | ParentGroup1 |

### Articles Table

#### Schema
```sql
CREATE TABLE IF NOT EXISTS "articles" (
    article_id TEXT PRIMARY KEY,
    item_number TEXT,
    name TEXT,
    ordering_unit_name TEXT,
    description TEXT,
    valid_during TEXT,
    keywords TEXT,
    ordering_unit INTEGER,
    serial_number_required TEXT,
    batch_number_required TEXT,
    type TEXT,
    package_count INTEGER,
    packaging_unit INTEGER,
    packed_dimensions TEXT,
    packed_volume REAL,
    packed_weight_kg REAL,
    constructed_dimensions TEXT,
    constructed_weight_kg REAL,
    max_orderable INTEGER,
    min_orderable INTEGER,
    allow_returns TEXT,
    price REAL,
    ordering_unit_price REAL,
    purchase_price REAL,
    responsible_employee_id INTEGER,
    min_stock INTEGER,
    has_expiration_date TEXT,
    notify_on_low_stock TEXT,
    book_stock_change_to TEXT,
    state TEXT,
    approval_comment TEXT,
    associated_product_ids TEXT,
    image_ids TEXT,
    master_id TEXT,
    product_config_ids TEXT,
    category_ids TEXT,
    catalog_ids TEXT,
    tax_class_id TEXT,
    custom_attr_stcs TEXT,
    custom_attr_brand TEXT,
    custom_attr_asset_types TEXT,
    custom_attr_region TEXT,
    custom_attr_classification TEXT,
    custom_attr_product_rank TEXT,
    product_permission_employee_ids TEXT
);
```

*Note: Sample data for the articles table is not shown due to the large number of columns.*

### Employees Table

#### Schema
```sql
CREATE TABLE IF NOT EXISTS "employees" (
    employee_id INTEGER PRIMARY KEY,
    name TEXT,
    number INTEGER,
    personal_number INTEGER,
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    address TEXT,
    birth_date TEXT,
    employment_start_date TEXT,
    inactive TEXT,
    organization_unit_ids INTEGER,
    assistant_ids TEXT
);
```

### Units Table

#### Schema
```sql
CREATE TABLE IF NOT EXISTS "units" (
    unit_id INTEGER PRIMARY KEY,
    name TEXT,
    number INTEGER,
    level_id TEXT,
    parent_id INTEGER,
    children_ids TEXT,
    structure_id TEXT,
    custom_attr_personal_number INTEGER
);
```

## Database Statistics

- Number of tables: 5
- Primary keys are defined for all tables
- Multiple indexes are created on the orders and customers tables for optimized querying

## Notes on Data

- The orders table uses a composite primary key (order_id, article_id)
- The database appears to be storing order information, customer details, product catalog, employee information, and organizational units
- Date fields are stored as TEXT in ISO format (YYYY-MM-DD)
- Some fields contain redacted or anonymized information (e.g., phone numbers with XX)
- Customer classification follows a hierarchical pattern (BRONZE, SILVER, GOLD, PLATINUM) with AH_ and H_ prefixes
- The stc (Store Type Classification) field contains a wide variety of retail and food service establishment types
- Articles can be of type ELECTRONIC, PHYSICAL, or VOUCHER
- Most categorical fields use uppercase values for status codes and mixed case for descriptive values

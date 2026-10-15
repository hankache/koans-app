CREATE TABLE items (
  name TEXT,
  qty INTEGER DEFAULT 1,
  unit_price REAL,
  total REAL GENERATED ALWAYS AS (qty * unit_price)
);
INSERT INTO items (name, unit_price) VALUES ('pen', 1.5);
INSERT INTO items (name, qty, unit_price) VALUES ('pad', 3, 2.0);

-- the default quantity
SELECT qty FROM items WHERE name = 'pen';
-- expect: 1

-- the generated total
SELECT name, total FROM items ORDER BY name;
-- expect: ('pad', 6.0), ('pen', 1.5)

UPDATE items SET qty = 4 WHERE name = 'pen';

-- it follows the change
SELECT total FROM items WHERE name = 'pen';
-- expect: 6.0

-- a generated column cannot be set
UPDATE items SET total = 0;
-- expect: error: generated column

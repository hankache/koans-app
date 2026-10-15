-- title: Defaults and generated columns
-- intro: A column can have a `DEFAULT` for when no value is given, or be `GENERATED` from other columns, always kept up to date.
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
-- expect: ___

-- the generated total
SELECT name, total FROM items ORDER BY name;
-- expect: ___

UPDATE items SET qty = 4 WHERE name = 'pen';

-- it follows the change
SELECT total FROM items WHERE name = 'pen';
-- expect: ___

-- a generated column cannot be set
UPDATE items SET total = 0;
-- expect: ___

CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, total INTEGER);
INSERT INTO customers VALUES (1, 'Ada'), (2, 'Alan'), (3, 'Grace');
INSERT INTO orders VALUES (10, 1, 30), (11, 1, 45), (12, 3, 20);

-- customers with at least one order
SELECT name FROM customers c WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id) ORDER BY name;
-- expect: ('Ada'), ('Grace')

-- customers with none
SELECT name FROM customers c WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id);
-- expect: 'Alan'

-- the same, with a LEFT JOIN
SELECT c.name FROM customers c LEFT JOIN orders o ON o.customer_id = c.id WHERE o.id IS NULL;
-- expect: 'Alan'

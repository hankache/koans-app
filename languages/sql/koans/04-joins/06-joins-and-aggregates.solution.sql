CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, total INTEGER);
INSERT INTO customers VALUES (1, 'Ada'), (2, 'Alan'), (3, 'Grace');
INSERT INTO orders VALUES (10, 1, 30), (11, 1, 45), (12, 3, 20);

-- orders per customer, including none
SELECT c.name, count(o.id) FROM customers c LEFT JOIN orders o ON o.customer_id = c.id GROUP BY c.id ORDER BY c.name;
-- expect: ('Ada', 2), ('Alan', 0), ('Grace', 1)

-- what each spent; coalesce turns no orders into 0
SELECT c.name, coalesce(sum(o.total), 0) FROM customers c LEFT JOIN orders o ON o.customer_id = c.id GROUP BY c.id ORDER BY c.name;
-- expect: ('Ada', 75), ('Alan', 0), ('Grace', 20)

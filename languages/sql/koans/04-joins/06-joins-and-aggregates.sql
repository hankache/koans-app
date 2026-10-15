-- title: Joins and aggregates
-- intro: Join first, then group: each customer's orders become one row with their count and total. A `LEFT JOIN` keeps the customers without orders.
CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, total INTEGER);
INSERT INTO customers VALUES (1, 'Ada'), (2, 'Alan'), (3, 'Grace');
INSERT INTO orders VALUES (10, 1, 30), (11, 1, 45), (12, 3, 20);

-- orders per customer, including none
SELECT c.name, count(o.id) FROM customers c LEFT JOIN orders o ON o.customer_id = c.id GROUP BY c.id ORDER BY c.name;
-- expect: ___

-- what each spent; coalesce turns no orders into 0
SELECT c.name, coalesce(sum(o.total), 0) FROM customers c LEFT JOIN orders o ON o.customer_id = c.id GROUP BY c.id ORDER BY c.name;
-- expect: ___

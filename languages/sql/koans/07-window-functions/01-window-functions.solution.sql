CREATE TABLE people (name TEXT, city TEXT, age INTEGER);
INSERT INTO people VALUES
  ('Ada', 'London', 36),
  ('Alan', 'London', 41),
  ('Grace', 'New York', 85),
  ('Edsger', 'Austin', 72),
  ('Barbara', NULL, 82);

-- number the rows by age
SELECT name, row_number() OVER (ORDER BY age) FROM people ORDER BY age LIMIT 2;
-- expect: ('Ada', 1), ('Alan', 2)

-- a running total of ages
SELECT name, sum(age) OVER (ORDER BY age) FROM people ORDER BY age LIMIT 3;
-- expect: ('Ada', 36), ('Alan', 77), ('Edsger', 149)

-- the rank within each city
SELECT name, rank() OVER (PARTITION BY city ORDER BY age DESC) FROM people WHERE city = 'London' ORDER BY age DESC;
-- expect: ('Alan', 1), ('Ada', 2)

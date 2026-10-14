CREATE TABLE people (name TEXT, city TEXT, age INTEGER);
INSERT INTO people VALUES
  ('Ada', 'London', 36),
  ('Alan', 'London', 41),
  ('Grace', 'New York', 85),
  ('Edsger', 'Austin', 72),
  ('Barbara', NULL, 82);

-- people per city
SELECT city, count(*) FROM people WHERE city IS NOT NULL GROUP BY city ORDER BY city;
-- expect: ('Austin', 1), ('London', 2), ('New York', 1)

-- the oldest in each city
SELECT city, max(age) FROM people GROUP BY city ORDER BY city;
-- expect: (NULL, 82), ('Austin', 72), ('London', 41), ('New York', 85)

-- NULL is a group of its own
SELECT count(*) FROM (SELECT city FROM people GROUP BY city);
-- expect: 4

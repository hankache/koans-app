CREATE TABLE people (name TEXT, city TEXT, age INTEGER);
INSERT INTO people VALUES
  ('Ada', 'London', 36),
  ('Alan', 'London', 41),
  ('Grace', 'New York', 85),
  ('Edsger', 'Austin', 72),
  ('Barbara', NULL, 82);

-- the total of the ages
SELECT sum(age) FROM people;
-- expect: 316

-- the average
SELECT avg(age) FROM people WHERE city = 'London';
-- expect: 38.5

-- the youngest and oldest at once
SELECT min(age), max(age) FROM people;
-- expect: 36, 85

-- aggregates skip NULLs: the oldest age among known cities
SELECT max(age) FROM people WHERE city IS NOT NULL;
-- expect: 85

-- title: Aggregates
-- intro: Aggregate functions turn many rows into one value: `count`, `sum`, `avg`, `min` and `max`. Like `count(column)`, they all skip NULLs.
CREATE TABLE people (name TEXT, city TEXT, age INTEGER);
INSERT INTO people VALUES
  ('Ada', 'London', 36),
  ('Alan', 'London', 41),
  ('Grace', 'New York', 85),
  ('Edsger', 'Austin', 72),
  ('Barbara', NULL, 82);

-- the total of the ages
SELECT sum(age) FROM people;
-- expect: ___

-- the average
SELECT avg(age) FROM people WHERE city = 'London';
-- expect: ___

-- the youngest and oldest at once
SELECT min(age), max(age) FROM people;
-- expect: 36, ___

-- aggregates skip NULLs: the oldest age among known cities
SELECT max(age) FROM people WHERE city IS NOT NULL;
-- expect: ___

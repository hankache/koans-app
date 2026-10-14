CREATE TABLE people (name TEXT, city TEXT, age INTEGER);
INSERT INTO people VALUES
  ('Ada', 'London', 36),
  ('Alan', 'London', 41),
  ('Grace', 'New York', 85),
  ('Edsger', 'Austin', 72),
  ('Barbara', NULL, 82);

-- names starting with A
SELECT count(*) FROM people WHERE name LIKE 'A%';
-- expect: 2

-- LIKE ignores case
SELECT 'Ada' LIKE 'ada';
-- expect: 1

-- _ is exactly one character
SELECT name FROM people WHERE name LIKE 'A_a';
-- expect: 'Ada'

-- GLOB minds case
SELECT 'Ada' GLOB 'ada';
-- expect: 0

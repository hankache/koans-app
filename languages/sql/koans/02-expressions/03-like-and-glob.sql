-- title: LIKE and GLOB
-- intro: `LIKE` matches a pattern where `%` is any run of characters and `_` exactly one; it ignores case for ASCII letters. `GLOB` uses `*` and `?` instead, and minds case.
CREATE TABLE people (name TEXT, city TEXT, age INTEGER);
INSERT INTO people VALUES
  ('Ada', 'London', 36),
  ('Alan', 'London', 41),
  ('Grace', 'New York', 85),
  ('Edsger', 'Austin', 72),
  ('Barbara', NULL, 82);

-- names starting with A
SELECT count(*) FROM people WHERE name LIKE ___;
-- expect: 2

-- LIKE ignores case
SELECT 'Ada' LIKE 'ada';
-- expect: ___

-- _ is exactly one character
SELECT name FROM people WHERE name LIKE 'A_a';
-- expect: ___

-- GLOB minds case
SELECT 'Ada' GLOB 'ada';
-- expect: ___

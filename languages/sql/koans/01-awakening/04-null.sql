-- title: NULL
-- intro: `NULL` means an unknown value. Anything compared with it is unknown too, so `= NULL` is never true: ask `IS NULL` instead. `coalesce` replaces a NULL with a value.
CREATE TABLE people (name TEXT, city TEXT, age INTEGER);
INSERT INTO people VALUES
  ('Ada', 'London', 36),
  ('Alan', 'London', 41),
  ('Grace', 'New York', 85),
  ('Edsger', 'Austin', 72),
  ('Barbara', NULL, 82);

-- = NULL finds nobody
SELECT count(*) FROM people WHERE city = NULL;
-- expect: ___

-- IS NULL finds the missing city
SELECT name FROM people WHERE city ___ NULL;
-- expect: 'Barbara'

-- arithmetic with NULL gives NULL
SELECT NULL + 1;
-- expect: ___

-- count(column) skips NULLs
SELECT count(city) FROM people;
-- expect: ___

-- coalesce gives the first value that isn't NULL
SELECT coalesce(city, 'unknown') FROM people WHERE name = 'Barbara';
-- expect: ___

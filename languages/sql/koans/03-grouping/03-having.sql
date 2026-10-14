-- title: HAVING
-- intro: `WHERE` filters rows before grouping; `HAVING` filters the groups after, so it can use aggregates.
CREATE TABLE people (name TEXT, city TEXT, age INTEGER);
INSERT INTO people VALUES
  ('Ada', 'London', 36),
  ('Alan', 'London', 41),
  ('Grace', 'New York', 85),
  ('Edsger', 'Austin', 72),
  ('Barbara', NULL, 82);

-- cities with more than one person
SELECT city FROM people GROUP BY city HAVING count(*) ___ 1;
-- expect: 'London'

-- cities whose people average over 50
SELECT city FROM people WHERE city IS NOT NULL GROUP BY city HAVING avg(age) > 50 ORDER BY city;
-- expect: ('Austin'), ___

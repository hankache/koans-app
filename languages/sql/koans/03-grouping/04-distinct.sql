-- title: DISTINCT
-- intro: `DISTINCT` drops repeated rows from a result, and `count(DISTINCT …)` counts different values.
CREATE TABLE people (name TEXT, city TEXT, age INTEGER);
INSERT INTO people VALUES
  ('Ada', 'London', 36),
  ('Alan', 'London', 41),
  ('Grace', 'New York', 85),
  ('Edsger', 'Austin', 72),
  ('Barbara', NULL, 82);

-- each city once
SELECT DISTINCT city FROM people WHERE city IS NOT NULL ORDER BY city;
-- expect: ('Austin'), ('London'), ___

-- how many different cities
SELECT count(DISTINCT city) FROM people;
-- expect: ___

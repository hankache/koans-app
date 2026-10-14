-- title: WHERE
-- intro: `WHERE` keeps the rows its condition is true for. Conditions combine with `AND` and `OR`, and `IN` and `BETWEEN` save writing several comparisons.
CREATE TABLE people (name TEXT, city TEXT, age INTEGER);
INSERT INTO people VALUES
  ('Ada', 'London', 36),
  ('Alan', 'London', 41),
  ('Grace', 'New York', 85),
  ('Edsger', 'Austin', 72),
  ('Barbara', NULL, 82);

-- people under 50
SELECT name FROM people WHERE age < ___ ORDER BY name;
-- expect: ('Ada'), ('Alan')

-- AND wants both
SELECT name FROM people WHERE city = 'London' AND age > 40;
-- expect: ___

-- IN lists the values allowed
SELECT count(*) FROM people WHERE city IN ('Austin', 'New York');
-- expect: ___

-- BETWEEN includes both ends
SELECT name FROM people WHERE age BETWEEN 72 AND 82 ORDER BY age;
-- expect: ('Edsger'), ___

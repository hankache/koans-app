CREATE TABLE people (name TEXT, city TEXT, age INTEGER);
INSERT INTO people VALUES
  ('Ada', 'London', 36),
  ('Alan', 'London', 41),
  ('Grace', 'New York', 85),
  ('Edsger', 'Austin', 72),
  ('Barbara', NULL, 82);

-- people under 50
SELECT name FROM people WHERE age < 50 ORDER BY name;
-- expect: ('Ada'), ('Alan')

-- AND wants both
SELECT name FROM people WHERE city = 'London' AND age > 40;
-- expect: 'Alan'

-- IN lists the values allowed
SELECT count(*) FROM people WHERE city IN ('Austin', 'New York');
-- expect: 2

-- BETWEEN includes both ends
SELECT name FROM people WHERE age BETWEEN 72 AND 82 ORDER BY age;
-- expect: ('Edsger'), ('Barbara')

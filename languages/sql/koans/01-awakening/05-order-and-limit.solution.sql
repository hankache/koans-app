CREATE TABLE people (name TEXT, city TEXT, age INTEGER);
INSERT INTO people VALUES
  ('Ada', 'London', 36),
  ('Alan', 'London', 41),
  ('Grace', 'New York', 85),
  ('Edsger', 'Austin', 72),
  ('Barbara', NULL, 82);

-- the oldest person
SELECT name FROM people ORDER BY age DESC LIMIT 1;
-- expect: 'Grace'

-- the two youngest
SELECT name FROM people ORDER BY age LIMIT 2;
-- expect: ('Ada'), ('Alan')

-- OFFSET skips rows: the third youngest
SELECT name FROM people ORDER BY age LIMIT 1 OFFSET 2;
-- expect: 'Edsger'

-- sort by city, then by name; NULL comes first
SELECT name FROM people ORDER BY city, name;
-- expect: ('Barbara'), ('Edsger'), ('Ada'), ('Alan'), ('Grace')

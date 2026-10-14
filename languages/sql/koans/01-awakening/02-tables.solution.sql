CREATE TABLE people (name TEXT, city TEXT, age INTEGER);
INSERT INTO people VALUES
  ('Ada', 'London', 36),
  ('Alan', 'London', 41),
  ('Grace', 'New York', 85),
  ('Edsger', 'Austin', 72),
  ('Barbara', NULL, 82);

-- every name, in alphabetical order
SELECT name FROM people ORDER BY name;
-- expect: ('Ada'), ('Alan'), ('Barbara'), ('Edsger'), ('Grace')

-- count(*) counts the rows
SELECT count(*) FROM people;
-- expect: 5

-- choose the columns you want
SELECT age FROM people WHERE name = 'Grace';
-- expect: 85

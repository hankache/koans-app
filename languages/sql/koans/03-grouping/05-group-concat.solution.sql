CREATE TABLE people (name TEXT, city TEXT, age INTEGER);
INSERT INTO people VALUES
  ('Ada', 'London', 36),
  ('Alan', 'London', 41),
  ('Grace', 'New York', 85),
  ('Edsger', 'Austin', 72),
  ('Barbara', NULL, 82);

-- every name, in one string
SELECT group_concat(name, ', ' ORDER BY name) FROM people;
-- expect: 'Ada, Alan, Barbara, Edsger, Grace'

-- per city
SELECT city, group_concat(name, '+' ORDER BY name) FROM people WHERE city = 'London' GROUP BY city;
-- expect: 'London', 'Ada+Alan'

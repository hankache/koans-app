-- title: ORDER BY and LIMIT
-- intro: `ORDER BY` sorts the rows, ascending unless you say `DESC`; without it, SQL promises no order at all. `LIMIT` keeps the first rows, and `OFFSET` skips some first.
CREATE TABLE people (name TEXT, city TEXT, age INTEGER);
INSERT INTO people VALUES
  ('Ada', 'London', 36),
  ('Alan', 'London', 41),
  ('Grace', 'New York', 85),
  ('Edsger', 'Austin', 72),
  ('Barbara', NULL, 82);

-- the oldest person
SELECT name FROM people ORDER BY age ___ LIMIT 1;
-- expect: 'Grace'

-- the two youngest
SELECT name FROM people ORDER BY age LIMIT ___;
-- expect: ('Ada'), ('Alan')

-- OFFSET skips rows: the third youngest
SELECT name FROM people ORDER BY age LIMIT 1 OFFSET ___;
-- expect: 'Edsger'

-- sort by city, then by name; NULL comes first
SELECT name FROM people ORDER BY city, name;
-- expect: ('Barbara'), ('Edsger'), ('Ada'), ('Alan'), ___

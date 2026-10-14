-- title: Tables
-- intro: `CREATE TABLE` makes a table and `INSERT` adds rows to it. `SELECT … FROM` reads them. Several expected rows are written in parentheses: `('Ada', 36), ('Alan', 41)`.
CREATE TABLE people (name TEXT, city TEXT, age INTEGER);
INSERT INTO people VALUES
  ('Ada', 'London', 36),
  ('Alan', 'London', 41),
  ('Grace', 'New York', 85),
  ('Edsger', 'Austin', 72),
  ('Barbara', NULL, 82);

-- every name, in alphabetical order
SELECT name FROM people ORDER BY name;
-- expect: ('Ada'), ('Alan'), ('Barbara'), ('Edsger'), ___

-- count(*) counts the rows
SELECT count(*) FROM people;
-- expect: ___

-- choose the columns you want
SELECT ___ FROM people WHERE name = 'Grace';
-- expect: 85

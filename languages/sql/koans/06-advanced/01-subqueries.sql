-- title: Subqueries
-- intro: A query in parentheses can stand for a value, or for a list of values after `IN`. `EXISTS` asks whether a subquery finds any row at all.
CREATE TABLE people (name TEXT, city TEXT, age INTEGER);
INSERT INTO people VALUES
  ('Ada', 'London', 36),
  ('Alan', 'London', 41),
  ('Grace', 'New York', 85),
  ('Edsger', 'Austin', 72),
  ('Barbara', NULL, 82);

-- older than the average
SELECT name FROM people WHERE age > (SELECT avg(age) FROM people) ORDER BY name;
-- expect: ('Barbara'), ('Edsger'), ___

-- people in a city where someone is over 80
SELECT name FROM people WHERE city IN (SELECT city FROM people WHERE age > 80);
-- expect: ___

-- does anyone live in Paris?
SELECT EXISTS (SELECT 1 FROM people WHERE city = 'Paris');
-- expect: ___

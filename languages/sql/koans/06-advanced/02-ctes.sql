-- title: Common table expressions
-- intro: `WITH name AS (query)` names a query, to use like a table in the query that follows. It reads top to bottom, where nested subqueries read inside out.
CREATE TABLE people (name TEXT, city TEXT, age INTEGER);
INSERT INTO people VALUES
  ('Ada', 'London', 36),
  ('Alan', 'London', 41),
  ('Grace', 'New York', 85),
  ('Edsger', 'Austin', 72),
  ('Barbara', NULL, 82);

-- name a step, then use it
WITH londoners AS (SELECT * FROM people WHERE city = 'London')
SELECT count(*) FROM londoners;
-- expect: ___

-- several steps
WITH ages AS (SELECT age FROM people), old AS (SELECT age FROM ages WHERE age > 70)
SELECT min(age) FROM old;
-- expect: ___

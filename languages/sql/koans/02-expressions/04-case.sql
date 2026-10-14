-- title: CASE
-- intro: `CASE WHEN … THEN … ELSE … END` chooses a value by condition, the first that holds winning. `iif(condition, a, b)` is the short form for two choices.
CREATE TABLE people (name TEXT, city TEXT, age INTEGER);
INSERT INTO people VALUES
  ('Ada', 'London', 36),
  ('Alan', 'London', 41),
  ('Grace', 'New York', 85),
  ('Edsger', 'Austin', 72),
  ('Barbara', NULL, 82);

-- CASE takes the first condition that holds
SELECT name, CASE WHEN age < 40 THEN 'young' WHEN age < 80 THEN 'middle' ELSE 'old' END
FROM people ORDER BY age LIMIT 3;
-- expect: ('Ada', 'young'), ('Alan', ___), ('Edsger', 'middle')

-- without ELSE, an unmatched CASE is NULL
SELECT CASE WHEN 1 > 2 THEN 'yes' END;
-- expect: ___

-- iif, for two choices
SELECT iif(age >= 80, 'eighty or more', 'younger') FROM people WHERE name = 'Grace';
-- expect: ___

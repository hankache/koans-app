-- title: NULLs in aggregates
-- intro: Aggregates skip `NULL`s: `count(column)` counts only values, and `avg` divides by them. `sum` of nothing is `NULL`, while `total` gives `0.0`.
CREATE TABLE sales (region TEXT, product TEXT, amount INTEGER);
INSERT INTO sales VALUES
  ('north', 'tea', 30), ('north', 'cake', 20), ('north', 'tea', 10),
  ('south', 'tea', 50), ('south', 'cake', NULL), ('east', 'cake', 15);

-- count(*) counts rows, count(amount) counts values
SELECT count(*), count(amount) FROM sales;
-- expect: ___

-- the NULL sale is left out of the average
SELECT avg(amount) FROM sales WHERE region = 'south';
-- expect: ___

-- sum of no values
SELECT sum(amount), total(amount) FROM sales WHERE region = 'west';
-- expect: ___

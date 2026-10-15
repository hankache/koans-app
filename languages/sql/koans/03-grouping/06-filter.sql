-- title: FILTER
-- intro: An aggregate can take a `FILTER (WHERE …)` clause, so one query can count or add up several different subsets at once.
CREATE TABLE sales (region TEXT, product TEXT, amount INTEGER);
INSERT INTO sales VALUES
  ('north', 'tea', 30), ('north', 'cake', 20), ('north', 'tea', 10),
  ('south', 'tea', 50), ('south', 'cake', NULL), ('east', 'cake', 15);

-- several counts in one pass
SELECT count(*) FILTER (WHERE product = 'tea'), count(*) FILTER (WHERE product = 'cake') FROM sales;
-- expect: ___

-- tea sales per region
SELECT region, sum(amount) FILTER (WHERE product = 'tea') FROM sales GROUP BY region ORDER BY region;
-- expect: ___

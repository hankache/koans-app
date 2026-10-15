CREATE TABLE sales (region TEXT, product TEXT, amount INTEGER);
INSERT INTO sales VALUES
  ('north', 'tea', 30), ('north', 'cake', 20), ('north', 'tea', 10),
  ('south', 'tea', 50), ('south', 'cake', NULL), ('east', 'cake', 15);

-- several counts in one pass
SELECT count(*) FILTER (WHERE product = 'tea'), count(*) FILTER (WHERE product = 'cake') FROM sales;
-- expect: 3, 3

-- tea sales per region
SELECT region, sum(amount) FILTER (WHERE product = 'tea') FROM sales GROUP BY region ORDER BY region;
-- expect: ('east', NULL), ('north', 40), ('south', 50)

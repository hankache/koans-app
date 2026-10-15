-- title: Pivoting
-- intro: Rows become columns with a `CASE` (or `FILTER`) inside each aggregate: one column per value you want to spread out.
CREATE TABLE sales (region TEXT, product TEXT, amount INTEGER);
INSERT INTO sales VALUES
  ('north', 'tea', 30), ('north', 'cake', 20), ('north', 'tea', 10),
  ('south', 'tea', 50), ('south', 'cake', NULL), ('east', 'cake', 15);

-- one row per region, one column per product
SELECT region,
       sum(CASE WHEN product = 'tea' THEN amount ELSE 0 END) AS tea,
       sum(CASE WHEN product = 'cake' THEN amount ELSE 0 END) AS cake
FROM sales GROUP BY region ORDER BY region;
-- expect: ___

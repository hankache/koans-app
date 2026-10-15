CREATE TABLE sales (region TEXT, product TEXT, amount INTEGER);
INSERT INTO sales VALUES
  ('north', 'tea', 30), ('north', 'cake', 20), ('north', 'tea', 10),
  ('south', 'tea', 50), ('south', 'cake', NULL), ('east', 'cake', 15);

-- count(*) counts rows, count(amount) counts values
SELECT count(*), count(amount) FROM sales;
-- expect: 6, 5

-- the NULL sale is left out of the average
SELECT avg(amount) FROM sales WHERE region = 'south';
-- expect: 50.0

-- sum of no values
SELECT sum(amount), total(amount) FROM sales WHERE region = 'west';
-- expect: NULL, 0.0

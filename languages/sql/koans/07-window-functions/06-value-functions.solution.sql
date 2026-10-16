CREATE TABLE sales (day INTEGER, amount INTEGER);
INSERT INTO sales VALUES (1, 30), (2, 10), (3, 50), (4, 20), (5, 40);

-- first_value: the window's first
SELECT day, first_value(amount) OVER (ORDER BY day) FROM sales ORDER BY day LIMIT 2;
-- expect: (1, 30), (2, 30)

-- last_value: the frame ends at the current row, by default
SELECT day, last_value(amount) OVER (ORDER BY day) FROM sales ORDER BY day LIMIT 2;
-- expect: (1, 30), (2, 10)

-- a frame to the end gives the very last
SELECT v FROM (SELECT day, last_value(amount) OVER (ORDER BY day ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS v FROM sales) WHERE day = 1;
-- expect: 40

-- nth_value: the second, once there is one
SELECT nth_value(amount, 2) OVER (ORDER BY day) AS v FROM sales ORDER BY day LIMIT 2;
-- expect: (NULL), (10)

-- percent_rank: 0 for the lowest, 1 for the highest
SELECT day, percent_rank() OVER (ORDER BY amount) FROM sales ORDER BY amount;
-- expect: (2, 0.0), (4, 0.25), (1, 0.5), (5, 0.75), (3, 1.0)

-- cume_dist: the share of rows at or below this one
SELECT cume_dist() OVER (ORDER BY amount) AS share FROM sales ORDER BY amount LIMIT 2;
-- expect: (0.2), (0.4)

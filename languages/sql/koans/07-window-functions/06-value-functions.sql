-- title: Value functions
-- intro: `first_value`, `last_value` and `nth_value` pick a value from the window. `percent_rank` and `cume_dist` say where a row stands among the others, from 0 to 1.
CREATE TABLE sales (day INTEGER, amount INTEGER);
INSERT INTO sales VALUES (1, 30), (2, 10), (3, 50), (4, 20), (5, 40);

-- first_value: the window's first
SELECT day, first_value(amount) OVER (ORDER BY day) FROM sales ORDER BY day LIMIT 2;
-- expect: ___

-- last_value: the frame ends at the current row, by default
SELECT day, last_value(amount) OVER (ORDER BY day) FROM sales ORDER BY day LIMIT 2;
-- expect: ___

-- a frame to the end gives the very last
SELECT v FROM (SELECT day, last_value(amount) OVER (ORDER BY day ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS v FROM sales) WHERE day = 1;
-- expect: ___

-- nth_value: the second, once there is one
SELECT nth_value(amount, 2) OVER (ORDER BY day) AS v FROM sales ORDER BY day LIMIT 2;
-- expect: ___

-- percent_rank: 0 for the lowest, 1 for the highest
SELECT day, percent_rank() OVER (ORDER BY amount) FROM sales ORDER BY amount;
-- expect: ___

-- cume_dist: the share of rows at or below this one
SELECT cume_dist() OVER (ORDER BY amount) AS share FROM sales ORDER BY amount LIMIT 2;
-- expect: ___

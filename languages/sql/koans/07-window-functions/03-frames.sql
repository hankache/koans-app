-- title: Frames
-- intro: A window's frame chooses which rows around the current one an aggregate sees: `ROWS BETWEEN 1 PRECEDING AND CURRENT ROW` makes a moving sum, `UNBOUNDED` reaches the ends.
CREATE TABLE daily (day INTEGER, visits INTEGER);
INSERT INTO daily VALUES (1, 10), (2, 20), (3, 30), (4, 40);

-- a moving sum of two days
SELECT day, sum(visits) OVER (ORDER BY day ROWS BETWEEN 1 PRECEDING AND CURRENT ROW) FROM daily ORDER BY day;
-- expect: ___

-- each day's share of the whole
SELECT day, visits * 100 / sum(visits) OVER () FROM daily ORDER BY day;
-- expect: ___

-- what is still to come
SELECT day, sum(visits) OVER (ORDER BY day ROWS BETWEEN 1 FOLLOWING AND UNBOUNDED FOLLOWING) FROM daily ORDER BY day;
-- expect: ___

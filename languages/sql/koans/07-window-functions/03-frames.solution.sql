CREATE TABLE daily (day INTEGER, visits INTEGER);
INSERT INTO daily VALUES (1, 10), (2, 20), (3, 30), (4, 40);

-- a moving sum of two days
SELECT day, sum(visits) OVER (ORDER BY day ROWS BETWEEN 1 PRECEDING AND CURRENT ROW) FROM daily ORDER BY day;
-- expect: (1, 10), (2, 30), (3, 50), (4, 70)

-- each day's share of the whole
SELECT day, visits * 100 / sum(visits) OVER () FROM daily ORDER BY day;
-- expect: (1, 10), (2, 20), (3, 30), (4, 40)

-- what is still to come
SELECT day, sum(visits) OVER (ORDER BY day ROWS BETWEEN 1 FOLLOWING AND UNBOUNDED FOLLOWING) FROM daily ORDER BY day;
-- expect: (1, 90), (2, 70), (3, 40), (4, NULL)

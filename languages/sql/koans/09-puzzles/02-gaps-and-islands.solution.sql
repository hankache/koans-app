CREATE TABLE logins (day INTEGER);
INSERT INTO logins VALUES (1), (2), (3), (6), (7), (10);

-- each run of consecutive days
SELECT min(day), max(day) FROM (
  SELECT day, day - row_number() OVER (ORDER BY day) AS island FROM logins
) GROUP BY island ORDER BY min(day);
-- expect: (1, 3), (6, 7), (10, 10)

-- the longest streak
SELECT max(n) FROM (SELECT count(*) AS n FROM (SELECT day - row_number() OVER (ORDER BY day) AS island FROM logins) GROUP BY island);
-- expect: 3

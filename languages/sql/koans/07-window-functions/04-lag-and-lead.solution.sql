CREATE TABLE readings (day INTEGER, temp INTEGER);
INSERT INTO readings VALUES (1, 12), (2, 15), (3, 11), (4, 18);

-- the change since the day before
SELECT day, temp - lag(temp) OVER (ORDER BY day) FROM readings ORDER BY day;
-- expect: (1, NULL), (2, 3), (3, -4), (4, 7)

-- a default for the first row
SELECT lag(temp, 1, 0) OVER (ORDER BY day) FROM readings ORDER BY day LIMIT 1;
-- expect: 0

-- tomorrow's temperature
SELECT day, lead(temp) OVER (ORDER BY day) FROM readings WHERE day >= 3 ORDER BY day;
-- expect: (3, 18), (4, NULL)

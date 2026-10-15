-- title: lag and lead
-- intro: `lag` reads a value from an earlier row and `lead` from a later one, which makes changes from one row to the next easy to compute.
CREATE TABLE readings (day INTEGER, temp INTEGER);
INSERT INTO readings VALUES (1, 12), (2, 15), (3, 11), (4, 18);

-- the change since the day before
SELECT day, temp - lag(temp) OVER (ORDER BY day) FROM readings ORDER BY day;
-- expect: ___

-- a default for the first row
SELECT lag(temp, 1, 0) OVER (ORDER BY day) FROM readings ORDER BY day LIMIT 1;
-- expect: ___

-- tomorrow's temperature
SELECT day, lead(temp) OVER (ORDER BY day) FROM readings WHERE day >= 3 ORDER BY day;
-- expect: ___

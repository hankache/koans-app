-- title: Generating a calendar
-- intro: A recursive CTE can generate rows that aren't stored anywhere, like every day of a month, so a report can show the days with nothing in them too.
CREATE TABLE visits (day TEXT);
INSERT INTO visits VALUES ('2026-02-02'), ('2026-02-02'), ('2026-02-04');

-- every day from the 1st to the 5th, with its visits
WITH RECURSIVE days(day) AS (
  SELECT '2026-02-01'
  UNION ALL
  SELECT date(day, '+1 day') FROM days WHERE day < '2026-02-05'
)
SELECT d.day, count(v.day) FROM days d LEFT JOIN visits v ON v.day = d.day GROUP BY d.day ORDER BY d.day;
-- expect: ___

-- the days of February 2026
WITH RECURSIVE days(day) AS (
  SELECT '2026-02-01'
  UNION ALL
  SELECT date(day, '+1 day') FROM days WHERE day < date('2026-02-01', '+1 month', '-1 day')
)
SELECT count(*) FROM days;
-- expect: ___

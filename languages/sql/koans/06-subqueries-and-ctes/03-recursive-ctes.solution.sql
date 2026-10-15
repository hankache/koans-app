-- counting to five
WITH RECURSIVE n(x) AS (SELECT 1 UNION ALL SELECT x + 1 FROM n WHERE x < 5)
SELECT group_concat(x, ',') FROM n;
-- expect: '1,2,3,4,5'

-- powers of two below a hundred
WITH RECURSIVE p(x) AS (SELECT 1 UNION ALL SELECT x * 2 FROM p WHERE x * 2 < 100)
SELECT max(x) FROM p;
-- expect: 64

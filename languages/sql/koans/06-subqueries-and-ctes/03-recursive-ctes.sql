-- title: Recursive CTEs
-- intro: `WITH RECURSIVE` lets a query build on its own rows: start with some, add more from them, and stop when the condition does.
-- counting to five
WITH RECURSIVE n(x) AS (SELECT 1 UNION ALL SELECT x + 1 FROM n WHERE x < 5)
SELECT group_concat(x, ',') FROM n;
-- expect: ___

-- powers of two below a hundred
WITH RECURSIVE p(x) AS (SELECT 1 UNION ALL SELECT x * 2 FROM p WHERE x * 2 < 100)
SELECT max(x) FROM p;
-- expect: ___

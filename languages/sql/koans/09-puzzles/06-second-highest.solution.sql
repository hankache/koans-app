CREATE TABLE salaries (name TEXT, pay INTEGER);
INSERT INTO salaries VALUES ('a', 100), ('b', 300), ('c', 300), ('d', 200), ('e', 50);

-- distinct values, skipping the first
SELECT DISTINCT pay FROM salaries ORDER BY pay DESC LIMIT 1 OFFSET 1;
-- expect: 200

-- or the largest below the largest
SELECT max(pay) FROM salaries WHERE pay < (SELECT max(pay) FROM salaries);
-- expect: 200

-- who earns it, with dense_rank
SELECT name FROM (SELECT name, dense_rank() OVER (ORDER BY pay DESC) AS r FROM salaries) WHERE r = 2;
-- expect: 'd'

-- the top earners, ties included
SELECT name FROM (SELECT name, rank() OVER (ORDER BY pay DESC) AS r FROM salaries) WHERE r = 1 ORDER BY name;
-- expect: ('b'), ('c')

-- with nothing below, max finds nothing: NULL
SELECT max(pay) FROM salaries WHERE pay < (SELECT min(pay) FROM salaries);
-- expect: NULL

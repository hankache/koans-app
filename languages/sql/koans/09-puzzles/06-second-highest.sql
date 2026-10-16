-- title: The second highest
-- intro: A classic interview question: the second-highest value, when the top one may be shared. There are several ways, and they differ when there is no second value.
CREATE TABLE salaries (name TEXT, pay INTEGER);
INSERT INTO salaries VALUES ('a', 100), ('b', 300), ('c', 300), ('d', 200), ('e', 50);

-- distinct values, skipping the first
SELECT DISTINCT pay FROM salaries ORDER BY pay DESC LIMIT 1 OFFSET 1;
-- expect: ___

-- or the largest below the largest
SELECT max(pay) FROM salaries WHERE pay < (SELECT max(pay) FROM salaries);
-- expect: ___

-- who earns it, with dense_rank
SELECT name FROM (SELECT name, dense_rank() OVER (ORDER BY pay DESC) AS r FROM salaries) WHERE r = 2;
-- expect: ___

-- the top earners, ties included
SELECT name FROM (SELECT name, rank() OVER (ORDER BY pay DESC) AS r FROM salaries) WHERE r = 1 ORDER BY name;
-- expect: ___

-- with nothing below, max finds nothing: NULL
SELECT max(pay) FROM salaries WHERE pay < (SELECT min(pay) FROM salaries);
-- expect: ___

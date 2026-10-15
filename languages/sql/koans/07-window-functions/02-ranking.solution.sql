CREATE TABLE staff (id INTEGER PRIMARY KEY, name TEXT, dept TEXT, salary INTEGER, manager_id INTEGER);
INSERT INTO staff VALUES
  (1, 'Ada', 'eng', 120, NULL),
  (2, 'Alan', 'eng', 100, 1),
  (3, 'Grace', 'eng', 100, 1),
  (4, 'Edsger', 'research', 90, 1),
  (5, 'Barbara', 'research', 110, 4),
  (6, 'Ken', 'ops', 80, 2);

-- rank and dense_rank differ after a tie
SELECT name, rank() OVER w, dense_rank() OVER w FROM staff WHERE dept = 'eng' WINDOW w AS (ORDER BY salary DESC) ORDER BY salary DESC, name;
-- expect: ('Ada', 1, 1), ('Alan', 2, 2), ('Grace', 2, 2)

-- the rank after the tie
SELECT rank() OVER (ORDER BY salary DESC) AS r FROM staff ORDER BY r DESC LIMIT 1;
-- expect: 6

-- split six people into three buckets: the first bucket
SELECT name, ntile(3) OVER (ORDER BY salary) FROM staff ORDER BY salary, name LIMIT 2;
-- expect: ('Ken', 1), ('Edsger', 1)

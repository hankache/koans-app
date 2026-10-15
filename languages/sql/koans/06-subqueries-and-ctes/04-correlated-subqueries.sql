-- title: Correlated subqueries
-- intro: A correlated subquery refers to the row the outer query is on, so it runs once per row: for example, comparing each person with the average of their own department.
CREATE TABLE staff (id INTEGER PRIMARY KEY, name TEXT, dept TEXT, salary INTEGER, manager_id INTEGER);
INSERT INTO staff VALUES
  (1, 'Ada', 'eng', 120, NULL),
  (2, 'Alan', 'eng', 100, 1),
  (3, 'Grace', 'eng', 100, 1),
  (4, 'Edsger', 'research', 90, 1),
  (5, 'Barbara', 'research', 110, 4),
  (6, 'Ken', 'ops', 80, 2);

-- paid more than their department's average
SELECT name FROM staff s WHERE salary > (SELECT avg(salary) FROM staff WHERE dept = s.dept) ORDER BY name;
-- expect: ___

-- a subquery as a column
SELECT name, (SELECT count(*) FROM staff r WHERE r.manager_id = s.id) AS reports FROM staff s WHERE id IN (1, 4) ORDER BY id;
-- expect: ___

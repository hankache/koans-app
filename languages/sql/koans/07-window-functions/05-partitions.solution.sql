CREATE TABLE staff (id INTEGER PRIMARY KEY, name TEXT, dept TEXT, salary INTEGER, manager_id INTEGER);
INSERT INTO staff VALUES
  (1, 'Ada', 'eng', 120, NULL),
  (2, 'Alan', 'eng', 100, 1),
  (3, 'Grace', 'eng', 100, 1),
  (4, 'Edsger', 'research', 90, 1),
  (5, 'Barbara', 'research', 110, 4),
  (6, 'Ken', 'ops', 80, 2);

-- each person's department total
SELECT name, sum(salary) OVER (PARTITION BY dept) FROM staff WHERE dept = 'research' ORDER BY name;
-- expect: ('Barbara', 200), ('Edsger', 200)

-- the best paid in each person's department
SELECT name, first_value(name) OVER (PARTITION BY dept ORDER BY salary DESC) FROM staff WHERE dept IN ('ops', 'research') ORDER BY name;
-- expect: ('Barbara', 'Barbara'), ('Edsger', 'Barbara'), ('Ken', 'Ken')

-- the gap to the best paid
SELECT name, max(salary) OVER (PARTITION BY dept) - salary FROM staff WHERE dept = 'eng' ORDER BY name;
-- expect: ('Ada', 0), ('Alan', 20), ('Grace', 20)

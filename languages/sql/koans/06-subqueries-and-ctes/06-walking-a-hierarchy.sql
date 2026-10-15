-- title: Walking a hierarchy
-- intro: A recursive CTE can follow a hierarchy, here who reports to whom, carrying the depth and the path as it goes.
CREATE TABLE staff (id INTEGER PRIMARY KEY, name TEXT, dept TEXT, salary INTEGER, manager_id INTEGER);
INSERT INTO staff VALUES
  (1, 'Ada', 'eng', 120, NULL),
  (2, 'Alan', 'eng', 100, 1),
  (3, 'Grace', 'eng', 100, 1),
  (4, 'Edsger', 'research', 90, 1),
  (5, 'Barbara', 'research', 110, 4),
  (6, 'Ken', 'ops', 80, 2);

-- everyone under Edsger, at any depth
WITH RECURSIVE team(id, name, depth) AS (
  SELECT id, name, 0 FROM staff WHERE name = 'Edsger'
  UNION ALL
  SELECT s.id, s.name, t.depth + 1 FROM staff s JOIN team t ON s.manager_id = t.id
)
SELECT name, depth FROM team ORDER BY depth, name;
-- expect: ___

-- Ken's chain of managers
WITH RECURSIVE chain(id, path) AS (
  SELECT id, name FROM staff WHERE name = 'Ken'
  UNION ALL
  SELECT s.manager_id, (SELECT name FROM staff WHERE id = s.manager_id) || ' > ' || c.path FROM staff s JOIN chain c ON s.id = c.id WHERE s.manager_id IS NOT NULL
)
SELECT path FROM chain ORDER BY length(path) DESC LIMIT 1;
-- expect: ___

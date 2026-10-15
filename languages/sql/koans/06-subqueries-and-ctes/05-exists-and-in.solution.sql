CREATE TABLE staff (id INTEGER PRIMARY KEY, name TEXT, dept TEXT, salary INTEGER, manager_id INTEGER);
INSERT INTO staff VALUES
  (1, 'Ada', 'eng', 120, NULL),
  (2, 'Alan', 'eng', 100, 1),
  (3, 'Grace', 'eng', 100, 1),
  (4, 'Edsger', 'research', 90, 1),
  (5, 'Barbara', 'research', 110, 4),
  (6, 'Ken', 'ops', 80, 2);

-- people who manage someone
SELECT name FROM staff WHERE id IN (SELECT manager_id FROM staff) ORDER BY id;
-- expect: ('Ada'), ('Alan'), ('Edsger')

-- NOT IN against a list with a NULL in it finds nothing
SELECT count(*) FROM staff WHERE id NOT IN (SELECT manager_id FROM staff);
-- expect: 0

-- NOT EXISTS does what was meant
SELECT count(*) FROM staff s WHERE NOT EXISTS (SELECT 1 FROM staff r WHERE r.manager_id = s.id);
-- expect: 3

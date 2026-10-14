-- title: Self joins
-- intro: A table can be joined to itself, with a different name for each side: an employee and their manager are both rows of the same table.
CREATE TABLE staff (id INTEGER PRIMARY KEY, name TEXT, manager_id INTEGER);
INSERT INTO staff VALUES (1, 'Ada', NULL), (2, 'Alan', 1), (3, 'Grace', 1), (4, 'Edsger', 2);

-- each person with their manager
SELECT s.name, m.name FROM staff s JOIN staff m ON m.id = s.manager_id ORDER BY s.name;
-- expect: ('Alan', 'Ada'), ('Edsger', ___), ('Grace', 'Ada')

-- who reports to Ada
SELECT count(*) FROM staff s JOIN staff m ON m.id = s.manager_id WHERE m.name = 'Ada';
-- expect: ___

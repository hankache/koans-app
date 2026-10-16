-- title: Sorting NULLs
-- intro: In SQLite, `NULL` sorts before every other value, so it comes first in ascending order and last in descending. `NULLS FIRST` and `NULLS LAST` say where it goes.
CREATE TABLE tasks (name TEXT, due TEXT);
INSERT INTO tasks VALUES ('write', '2026-10-20'), ('read', NULL), ('rest', '2026-10-18');

-- in ascending order, NULL comes first
SELECT name FROM tasks ORDER BY due;
-- expect: ___

-- in descending order, last
SELECT name FROM tasks ORDER BY due DESC;
-- expect: ___

-- NULLS LAST moves it to the end
SELECT name FROM tasks ORDER BY due NULLS LAST;
-- expect: ___

-- sorting by IS NULL works too, since false sorts before true
SELECT name FROM tasks ORDER BY due IS NULL, name;
-- expect: ___

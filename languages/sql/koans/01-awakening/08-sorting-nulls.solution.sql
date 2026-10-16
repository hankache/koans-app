CREATE TABLE tasks (name TEXT, due TEXT);
INSERT INTO tasks VALUES ('write', '2026-10-20'), ('read', NULL), ('rest', '2026-10-18');

-- in ascending order, NULL comes first
SELECT name FROM tasks ORDER BY due;
-- expect: ('read'), ('rest'), ('write')

-- in descending order, last
SELECT name FROM tasks ORDER BY due DESC;
-- expect: ('write'), ('rest'), ('read')

-- NULLS LAST moves it to the end
SELECT name FROM tasks ORDER BY due NULLS LAST;
-- expect: ('rest'), ('write'), ('read')

-- sorting by IS NULL works too, since false sorts before true
SELECT name FROM tasks ORDER BY due IS NULL, name;
-- expect: ('rest'), ('write'), ('read')

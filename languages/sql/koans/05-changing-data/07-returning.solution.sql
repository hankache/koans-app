CREATE TABLE tasks (id INTEGER PRIMARY KEY, title TEXT, done INTEGER DEFAULT 0);
INSERT INTO tasks (title) VALUES ('sweep'), ('rake');

-- the new row's id comes back
INSERT INTO tasks (title) VALUES ('sit') RETURNING id;
-- expect: 3

-- and what an update changed
UPDATE tasks SET done = 1 WHERE title = 'sweep' RETURNING title, done;
-- expect: 'sweep', 1

-- and what a delete removed
DELETE FROM tasks WHERE done = 1 RETURNING title;
-- expect: 'sweep'

-- what is left
SELECT title FROM tasks ORDER BY title;
-- expect: ('rake'), ('sit')

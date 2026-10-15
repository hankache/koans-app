-- title: RETURNING
-- intro: `RETURNING` makes an `INSERT`, `UPDATE` or `DELETE` give back the rows it changed, so a new id, or what was removed, needs no second query.
CREATE TABLE tasks (id INTEGER PRIMARY KEY, title TEXT, done INTEGER DEFAULT 0);
INSERT INTO tasks (title) VALUES ('sweep'), ('rake');

-- the new row's id comes back
INSERT INTO tasks (title) VALUES ('sit') RETURNING id;
-- expect: ___

-- and what an update changed
UPDATE tasks SET done = 1 WHERE title = 'sweep' RETURNING title, done;
-- expect: ___

-- and what a delete removed
DELETE FROM tasks WHERE done = 1 RETURNING title;
-- expect: ___

-- what is left
SELECT title FROM tasks ORDER BY title;
-- expect: ___

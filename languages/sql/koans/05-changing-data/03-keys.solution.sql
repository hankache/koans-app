CREATE TABLE notes (id INTEGER PRIMARY KEY, body TEXT, status TEXT DEFAULT 'draft');
INSERT INTO notes (body) VALUES ('first'), ('second');

-- ids were given in order
SELECT id FROM notes WHERE body = 'second';
-- expect: 2

-- the default filled in the status
SELECT status FROM notes WHERE id = 1;
-- expect: 'draft'

-- RETURNING shows the new row's id
INSERT INTO notes (body) VALUES ('third') RETURNING id;
-- expect: 3

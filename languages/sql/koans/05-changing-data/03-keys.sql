-- title: Keys
-- intro: An `INTEGER PRIMARY KEY` numbers rows by itself when you leave it out. A `DEFAULT` fills in a column you don't give, and `RETURNING` shows what an `INSERT` made.
CREATE TABLE notes (id INTEGER PRIMARY KEY, body TEXT, status TEXT DEFAULT 'draft');
INSERT INTO notes (body) VALUES ('first'), ('second');

-- ids were given in order
SELECT id FROM notes WHERE body = 'second';
-- expect: ___

-- the default filled in the status
SELECT status FROM notes WHERE id = 1;
-- expect: ___

-- RETURNING shows the new row's id
INSERT INTO notes (body) VALUES ('third') RETURNING id;
-- expect: ___

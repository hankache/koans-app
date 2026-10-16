CREATE TABLE fruit (name TEXT);
INSERT INTO fruit VALUES ('apple'), ('Banana'), ('cherry');

-- by default, capitals sort first
SELECT name FROM fruit ORDER BY name;
-- expect: ('Banana'), ('apple'), ('cherry')

-- COLLATE NOCASE ignores case when sorting
SELECT name FROM fruit ORDER BY name COLLATE NOCASE;
-- expect: ('apple'), ('Banana'), ('cherry')

-- and when comparing
SELECT 'Apple' = 'apple', 'Apple' = 'apple' COLLATE NOCASE;
-- expect: 0, 1

CREATE TABLE tags (tag TEXT COLLATE NOCASE UNIQUE);
INSERT INTO tags VALUES ('SQL');
INSERT OR IGNORE INTO tags VALUES ('sql');

-- a column can carry its collation, so UNIQUE ignored the second
SELECT count(*) FROM tags;
-- expect: 1

-- RTRIM ignores trailing spaces
SELECT 'zen  ' = 'zen' COLLATE RTRIM;
-- expect: 1

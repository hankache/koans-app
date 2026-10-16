-- title: Collation
-- intro: A collation decides how text compares. The default, `BINARY`, compares bytes, so capitals come first. `NOCASE` ignores case and `RTRIM` ignores trailing spaces.
CREATE TABLE fruit (name TEXT);
INSERT INTO fruit VALUES ('apple'), ('Banana'), ('cherry');

-- by default, capitals sort first
SELECT name FROM fruit ORDER BY name;
-- expect: ___

-- COLLATE NOCASE ignores case when sorting
SELECT name FROM fruit ORDER BY name COLLATE NOCASE;
-- expect: ___

-- and when comparing
SELECT 'Apple' = 'apple', 'Apple' = 'apple' COLLATE NOCASE;
-- expect: ___

CREATE TABLE tags (tag TEXT COLLATE NOCASE UNIQUE);
INSERT INTO tags VALUES ('SQL');
INSERT OR IGNORE INTO tags VALUES ('sql');

-- a column can carry its collation, so UNIQUE ignored the second
SELECT count(*) FROM tags;
-- expect: ___

-- RTRIM ignores trailing spaces
SELECT 'zen  ' = 'zen' COLLATE RTRIM;
-- expect: ___

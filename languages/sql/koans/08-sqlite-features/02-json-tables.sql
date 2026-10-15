-- title: JSON tables
-- intro: `json_each` turns a JSON array or object into rows, so it can be joined and filtered; `json_group_array` and `json_group_object` turn rows back into JSON.
CREATE TABLE posts (id INTEGER, tags TEXT);
INSERT INTO posts VALUES (1, '["sql", "koans"]'), (2, '["sql"]');

-- one row per tag
SELECT p.id, t.value FROM posts p, json_each(p.tags) t ORDER BY p.id, t.value;
-- expect: ___

-- how often each tag is used
SELECT t.value, count(*) FROM posts p, json_each(p.tags) t GROUP BY t.value ORDER BY t.value;
-- expect: ___

-- rows back into an array
SELECT json_group_array(id) FROM posts;
-- expect: ___

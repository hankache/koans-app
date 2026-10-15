CREATE TABLE posts (id INTEGER, tags TEXT);
INSERT INTO posts VALUES (1, '["sql", "koans"]'), (2, '["sql"]');

-- one row per tag
SELECT p.id, t.value FROM posts p, json_each(p.tags) t ORDER BY p.id, t.value;
-- expect: (1, 'koans'), (1, 'sql'), (2, 'sql')

-- how often each tag is used
SELECT t.value, count(*) FROM posts p, json_each(p.tags) t GROUP BY t.value ORDER BY t.value;
-- expect: ('koans', 1), ('sql', 2)

-- rows back into an array
SELECT json_group_array(id) FROM posts;
-- expect: '[1,2]'

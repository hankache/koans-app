CREATE TABLE events (data TEXT);
INSERT INTO events VALUES ('{"type": "click", "tags": ["a", "b"], "user": {"name": "Ada"}}');

-- ->> takes a value out
SELECT data ->> 'type' FROM events;
-- expect: 'click'

-- nested, with a path
SELECT data ->> '$.user.name' FROM events;
-- expect: 'Ada'

-- count an array
SELECT json_array_length(data, '$.tags') FROM events;
-- expect: 2

-- build an object
SELECT json_object('ok', 1);
-- expect: '{"ok":1}'

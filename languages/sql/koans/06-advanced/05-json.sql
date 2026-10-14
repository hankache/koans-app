-- title: JSON
-- intro: SQLite reads and builds JSON in text columns: `->>` takes a value out, `json_array_length` counts, and `json_object` builds an object.
CREATE TABLE events (data TEXT);
INSERT INTO events VALUES ('{"type": "click", "tags": ["a", "b"], "user": {"name": "Ada"}}');

-- ->> takes a value out
SELECT data ->> 'type' FROM events;
-- expect: ___

-- nested, with a path
SELECT data ->> '$.user.name' FROM events;
-- expect: ___

-- count an array
SELECT json_array_length(data, '$.tags') FROM events;
-- expect: ___

-- build an object
SELECT json_object('ok', 1);
-- expect: ___

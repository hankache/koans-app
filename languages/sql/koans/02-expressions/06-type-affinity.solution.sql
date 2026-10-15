CREATE TABLE things (n INTEGER, t TEXT);
INSERT INTO things VALUES ('42', 7), ('forty-two', 3.5);

-- '42' looked like a number, so it was stored as one
SELECT typeof(n) FROM things WHERE rowid = 1;
-- expect: 'integer'

-- 'forty-two' did not, so it stayed text
SELECT typeof(n) FROM things WHERE rowid = 2;
-- expect: 'text'

-- a TEXT column turns numbers into text
SELECT t, typeof(t) FROM things WHERE rowid = 1;
-- expect: '7', 'text'

-- comparing text with a number: numbers sort before text
SELECT 10 < '9';
-- expect: 1

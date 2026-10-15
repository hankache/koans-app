-- title: Type affinity
-- intro: A SQLite column's type is a preference, called affinity, not a rule: a value that converts cleanly is converted, anything else is stored as it is. `typeof` shows what was stored.
CREATE TABLE things (n INTEGER, t TEXT);
INSERT INTO things VALUES ('42', 7), ('forty-two', 3.5);

-- '42' looked like a number, so it was stored as one
SELECT typeof(n) FROM things WHERE rowid = 1;
-- expect: ___

-- 'forty-two' did not, so it stayed text
SELECT typeof(n) FROM things WHERE rowid = 2;
-- expect: ___

-- a TEXT column turns numbers into text
SELECT t, typeof(t) FROM things WHERE rowid = 1;
-- expect: ___

-- comparing text with a number: numbers sort before text
SELECT 10 < '9';
-- expect: ___

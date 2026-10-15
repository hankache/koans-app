-- title: Strict tables
-- intro: A table declared `STRICT` enforces its column types instead of just preferring them: a value that can't be stored as the type is an error.
CREATE TABLE loose (n INTEGER);
CREATE TABLE strict (n INTEGER) STRICT;

-- an ordinary table takes anything
INSERT INTO loose VALUES ('hello');
SELECT typeof(n) FROM loose;
-- expect: ___

-- a strict one refuses
INSERT INTO strict VALUES ('hello');
-- expect: ___

-- but still converts what converts cleanly
INSERT INTO strict VALUES ('42');
SELECT typeof(n) FROM strict;
-- expect: ___

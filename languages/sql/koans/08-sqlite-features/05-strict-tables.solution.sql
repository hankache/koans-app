CREATE TABLE loose (n INTEGER);
CREATE TABLE strict (n INTEGER) STRICT;

-- an ordinary table takes anything
INSERT INTO loose VALUES ('hello');
SELECT typeof(n) FROM loose;
-- expect: 'text'

-- a strict one refuses
INSERT INTO strict VALUES ('hello');
-- expect: error: cannot store TEXT

-- but still converts what converts cleanly
INSERT INTO strict VALUES ('42');
SELECT typeof(n) FROM strict;
-- expect: 'integer'

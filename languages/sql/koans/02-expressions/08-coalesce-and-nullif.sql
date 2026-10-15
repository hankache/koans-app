-- title: COALESCE and NULLIF
-- intro: `coalesce` returns its first argument that isn't `NULL`; `nullif(a, b)` returns `NULL` when the two are equal, which is handy for avoiding division by zero. `iif` is a short `CASE`.
CREATE TABLE contacts (name TEXT, mobile TEXT, home TEXT);
INSERT INTO contacts VALUES ('Ada', NULL, '555-1815'), ('Alan', '555-1912', NULL), ('Grace', NULL, NULL);

-- the first number someone has
SELECT name, coalesce(mobile, home, 'none') FROM contacts ORDER BY name;
-- expect: ___

-- nullif turns a zero divisor into NULL instead of an error
SELECT 10 / nullif(0, 0);
-- expect: ___

-- iif(condition, then, else)
SELECT iif(5 > 3, 'yes', 'no');
-- expect: ___

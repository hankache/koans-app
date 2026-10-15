CREATE TABLE contacts (name TEXT, mobile TEXT, home TEXT);
INSERT INTO contacts VALUES ('Ada', NULL, '555-1815'), ('Alan', '555-1912', NULL), ('Grace', NULL, NULL);

-- the first number someone has
SELECT name, coalesce(mobile, home, 'none') FROM contacts ORDER BY name;
-- expect: ('Ada', '555-1815'), ('Alan', '555-1912'), ('Grace', 'none')

-- nullif turns a zero divisor into NULL instead of an error
SELECT 10 / nullif(0, 0);
-- expect: NULL

-- iif(condition, then, else)
SELECT iif(5 > 3, 'yes', 'no');
-- expect: 'yes'

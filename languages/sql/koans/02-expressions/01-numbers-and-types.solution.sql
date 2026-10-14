-- integer division drops the fraction
SELECT 7 / 2;
-- expect: 3

-- a real makes it exact
SELECT 7 / 2.0;
-- expect: 3.5

-- % is the remainder
SELECT 7 % 3;
-- expect: 1

-- the types
SELECT typeof(1), typeof(1.0), typeof('1'), typeof(NULL);
-- expect: 'integer', 'real', 'text', 'null'

-- CAST converts
SELECT CAST('42' AS INTEGER) + 1;
-- expect: 43

-- title: Numbers and types
-- intro: SQLite keeps integers and reals apart: dividing two integers gives an integer. `typeof` tells a value's type, and `CAST` converts one.
-- integer division drops the fraction
SELECT 7 / 2;
-- expect: ___

-- a real makes it exact
SELECT 7 / 2.0;
-- expect: ___

-- % is the remainder
SELECT 7 % 3;
-- expect: ___

-- the types
SELECT typeof(1), typeof(1.0), typeof('1'), typeof(NULL);
-- expect: 'integer', 'real', ___, 'null'

-- CAST converts
SELECT CAST('42' AS INTEGER) + 1;
-- expect: ___

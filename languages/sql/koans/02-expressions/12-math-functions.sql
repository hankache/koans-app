-- title: Math functions
-- intro: SQLite's math functions work on reals and give reals: `sqrt`, `power`, `ceil` and `floor`, logarithms and `pi`.
-- a square root
SELECT sqrt(16);
-- expect: ___

-- two to the tenth
SELECT power(2, 10);
-- expect: ___

-- ceil rounds up, floor rounds down
SELECT ceil(2.1), floor(-2.1);
-- expect: ___

-- log10 of a thousand
SELECT log10(1000);
-- expect: ___

-- pi, to four places
SELECT round(pi(), 4);
-- expect: ___

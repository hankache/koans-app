-- a square root
SELECT sqrt(16);
-- expect: 4.0

-- two to the tenth
SELECT power(2, 10);
-- expect: 1024.0

-- ceil rounds up, floor rounds down
SELECT ceil(2.1), floor(-2.1);
-- expect: 3.0, -3.0

-- log10 of a thousand
SELECT log10(1000);
-- expect: 3.0

-- pi, to four places
SELECT round(pi(), 4);
-- expect: 3.1416

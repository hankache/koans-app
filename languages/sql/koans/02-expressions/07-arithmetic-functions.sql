-- title: Arithmetic functions
-- intro: `abs`, `round`, and `min`/`max` with several arguments work on single values; `round` takes a number of places.
-- round to some places
SELECT round(3.14159, 2);
-- expect: ___

-- round with no places gives a real
SELECT round(2.5), typeof(round(2.5));
-- expect: ___

-- min and max with several arguments pick one of them
SELECT max(3, 9, 4), min(3, 9, 4);
-- expect: ___

-- distance from zero
SELECT abs(-17);
-- expect: ___

-- an integer division that rounds instead
SELECT CAST(round(7 / 2.0) AS INTEGER);
-- expect: ___

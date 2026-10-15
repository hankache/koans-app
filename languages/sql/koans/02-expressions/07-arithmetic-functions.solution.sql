-- round to some places
SELECT round(3.14159, 2);
-- expect: 3.14

-- round with no places gives a real
SELECT round(2.5), typeof(round(2.5));
-- expect: 3.0, 'real'

-- min and max with several arguments pick one of them
SELECT max(3, 9, 4), min(3, 9, 4);
-- expect: 9, 3

-- distance from zero
SELECT abs(-17);
-- expect: 17

-- an integer division that rounds instead
SELECT CAST(round(7 / 2.0) AS INTEGER);
-- expect: 4

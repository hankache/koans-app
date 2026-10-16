CREATE TABLE readings (v INTEGER);
INSERT INTO readings VALUES (7), (1), (5), (3), (9);

-- an odd number of rows: skip half, take one
SELECT v FROM readings ORDER BY v LIMIT 1 OFFSET (SELECT count(*) FROM readings) / 2;
-- expect: 5

INSERT INTO readings VALUES (11);

-- an even number: average the middle two
SELECT avg(v) FROM (SELECT v FROM readings ORDER BY v LIMIT 2 - (SELECT count(*) FROM readings) % 2 OFFSET ((SELECT count(*) FROM readings) - 1) / 2);
-- expect: 6.0

-- or number the rows from both ends and keep the middle
SELECT avg(v) FROM (SELECT v, row_number() OVER (ORDER BY v) AS up, row_number() OVER (ORDER BY v DESC) AS down FROM readings) WHERE abs(up - down) <= 1;
-- expect: 6.0

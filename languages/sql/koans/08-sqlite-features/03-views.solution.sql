CREATE TABLE scores (player TEXT, points INTEGER);
INSERT INTO scores VALUES ('ada', 10), ('alan', 7), ('ada', 5);
CREATE VIEW totals AS SELECT player, sum(points) AS total FROM scores GROUP BY player;

-- used like a table
SELECT player, total FROM totals ORDER BY total DESC;
-- expect: ('ada', 15), ('alan', 7)

INSERT INTO scores VALUES ('alan', 20);

-- it reflects new rows at once
SELECT total FROM totals WHERE player = 'alan';
-- expect: 27

-- but cannot be changed directly
INSERT INTO totals VALUES ('grace', 1);
-- expect: error

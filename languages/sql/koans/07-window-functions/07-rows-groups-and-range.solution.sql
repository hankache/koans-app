CREATE TABLE scores (player TEXT, points INTEGER);
INSERT INTO scores VALUES ('a', 10), ('b', 20), ('c', 20), ('d', 30);

-- ROWS 1 PRECEDING: this row and the one before
SELECT player, sum(points) OVER (ORDER BY points, player ROWS 1 PRECEDING) FROM scores ORDER BY player;
-- expect: ('a', 10), ('b', 30), ('c', 40), ('d', 50)

-- GROUPS 1 PRECEDING: this group of equal points and the one before
SELECT player, sum(points) OVER (ORDER BY points GROUPS 1 PRECEDING) FROM scores ORDER BY player;
-- expect: ('a', 10), ('b', 50), ('c', 50), ('d', 70)

-- RANGE 5 PRECEDING: every row within 5 points below
SELECT player, sum(points) OVER (ORDER BY points RANGE 5 PRECEDING) FROM scores ORDER BY player;
-- expect: ('a', 10), ('b', 40), ('c', 40), ('d', 30)

-- everyone else's total
SELECT player, sum(points) OVER (ORDER BY player ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING EXCLUDE CURRENT ROW) FROM scores ORDER BY player;
-- expect: ('a', 70), ('b', 60), ('c', 60), ('d', 50)

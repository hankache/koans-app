-- title: ROWS, GROUPS and RANGE
-- intro: A frame can count rows (`ROWS`), groups of equal values (`GROUPS`), or a distance in value (`RANGE`). `EXCLUDE CURRENT ROW` leaves the row itself out.
CREATE TABLE scores (player TEXT, points INTEGER);
INSERT INTO scores VALUES ('a', 10), ('b', 20), ('c', 20), ('d', 30);

-- ROWS 1 PRECEDING: this row and the one before
SELECT player, sum(points) OVER (ORDER BY points, player ROWS 1 PRECEDING) FROM scores ORDER BY player;
-- expect: ___

-- GROUPS 1 PRECEDING: this group of equal points and the one before
SELECT player, sum(points) OVER (ORDER BY points GROUPS 1 PRECEDING) FROM scores ORDER BY player;
-- expect: ___

-- RANGE 5 PRECEDING: every row within 5 points below
SELECT player, sum(points) OVER (ORDER BY points RANGE 5 PRECEDING) FROM scores ORDER BY player;
-- expect: ___

-- everyone else's total
SELECT player, sum(points) OVER (ORDER BY player ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING EXCLUDE CURRENT ROW) FROM scores ORDER BY player;
-- expect: ___

-- title: Running balance
-- intro: A running balance is a window sum ordered by time; with a `CASE`, the same query can show where it first went below zero.
CREATE TABLE ledger (day INTEGER, amount INTEGER);
INSERT INTO ledger VALUES (1, 100), (2, -30), (3, -90), (4, 50), (5, -10);

-- the balance after each day
SELECT day, sum(amount) OVER (ORDER BY day) FROM ledger ORDER BY day;
-- expect: ___

-- the first day it was overdrawn
SELECT min(day) FROM (SELECT day, sum(amount) OVER (ORDER BY day) AS balance FROM ledger) WHERE balance < 0;
-- expect: ___

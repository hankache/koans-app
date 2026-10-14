-- title: Set operations
-- intro: `UNION` combines the rows of two queries, dropping repeats (`UNION ALL` keeps them). `INTERSECT` keeps rows in both, and `EXCEPT` rows in the first but not the second.
CREATE TABLE likes_tea (name TEXT);
CREATE TABLE likes_coffee (name TEXT);
INSERT INTO likes_tea VALUES ('Ada'), ('Alan'), ('Grace');
INSERT INTO likes_coffee VALUES ('Alan'), ('Edsger');

-- everyone who likes either
SELECT count(*) FROM (SELECT name FROM likes_tea UNION SELECT name FROM likes_coffee);
-- expect: ___

-- UNION ALL keeps repeats
SELECT count(*) FROM (SELECT name FROM likes_tea UNION ALL SELECT name FROM likes_coffee);
-- expect: ___

-- both
SELECT name FROM likes_tea ___ SELECT name FROM likes_coffee;
-- expect: 'Alan'

-- tea but not coffee
SELECT name FROM likes_tea EXCEPT SELECT name FROM likes_coffee ORDER BY name;
-- expect: ('Ada'), ___

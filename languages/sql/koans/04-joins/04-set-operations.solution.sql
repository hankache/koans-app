CREATE TABLE likes_tea (name TEXT);
CREATE TABLE likes_coffee (name TEXT);
INSERT INTO likes_tea VALUES ('Ada'), ('Alan'), ('Grace');
INSERT INTO likes_coffee VALUES ('Alan'), ('Edsger');

-- everyone who likes either
SELECT count(*) FROM (SELECT name FROM likes_tea UNION SELECT name FROM likes_coffee);
-- expect: 4

-- UNION ALL keeps repeats
SELECT count(*) FROM (SELECT name FROM likes_tea UNION ALL SELECT name FROM likes_coffee);
-- expect: 5

-- both
SELECT name FROM likes_tea INTERSECT SELECT name FROM likes_coffee;
-- expect: 'Alan'

-- tea but not coffee
SELECT name FROM likes_tea EXCEPT SELECT name FROM likes_coffee ORDER BY name;
-- expect: ('Ada'), ('Grace')

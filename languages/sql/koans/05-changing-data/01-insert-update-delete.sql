-- title: INSERT, UPDATE and DELETE
-- intro: `UPDATE` changes the rows its `WHERE` picks, and `DELETE` removes them. Without a `WHERE`, they change every row.
CREATE TABLE stock (item TEXT, count INTEGER);
INSERT INTO stock VALUES ('tea', 3), ('cake', 5), ('jam', 0);
UPDATE stock SET count = count + 10 WHERE item = 'tea';

-- UPDATE changed the tea
SELECT count FROM stock WHERE item = 'tea';
-- expect: ___

DELETE FROM stock WHERE count = 0;

-- DELETE removed the jam
SELECT count(*) FROM stock;
-- expect: ___

UPDATE stock SET count = 1;

-- an UPDATE without WHERE changes every row
SELECT count(*) FROM stock WHERE count = 1;
-- expect: ___

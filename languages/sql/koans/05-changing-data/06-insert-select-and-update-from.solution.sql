CREATE TABLE prices (item TEXT, price INTEGER);
CREATE TABLE changes (item TEXT, new_price INTEGER);
CREATE TABLE archive (item TEXT, price INTEGER);
INSERT INTO prices VALUES ('tea', 3), ('cake', 5), ('jam', 4);
INSERT INTO changes VALUES ('cake', 6), ('jam', 2);
INSERT INTO archive SELECT * FROM prices WHERE price > 3;

-- archived rows
SELECT item FROM archive ORDER BY item;
-- expect: ('cake'), ('jam')

UPDATE prices SET price = changes.new_price FROM changes WHERE changes.item = prices.item;

-- prices after the update
SELECT item, price FROM prices ORDER BY item;
-- expect: ('cake', 6), ('jam', 2), ('tea', 3)

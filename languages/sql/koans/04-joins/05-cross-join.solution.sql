CREATE TABLE sizes (size TEXT);
CREATE TABLE colors (color TEXT);
INSERT INTO sizes VALUES ('S'), ('M');
INSERT INTO colors VALUES ('red'), ('blue'), ('green');

-- every combination
SELECT count(*) FROM sizes CROSS JOIN colors;
-- expect: 6

-- the first few, in order
SELECT size || '-' || color FROM sizes CROSS JOIN colors ORDER BY size DESC, color LIMIT 2;
-- expect: ('S-blue'), ('S-green')

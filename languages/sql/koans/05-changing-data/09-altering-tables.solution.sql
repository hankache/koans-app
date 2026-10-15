CREATE TABLE pets (name TEXT, kind TEXT);
INSERT INTO pets VALUES ('Tom', 'cat'), ('Rex', 'dog');
ALTER TABLE pets ADD COLUMN age INTEGER DEFAULT 0;

-- existing rows get the default
SELECT name, age FROM pets ORDER BY name;
-- expect: ('Rex', 0), ('Tom', 0)

ALTER TABLE pets RENAME COLUMN kind TO species;

-- the new column name
SELECT species FROM pets WHERE name = 'Tom';
-- expect: 'cat'

ALTER TABLE pets DROP COLUMN age;

-- two columns left
SELECT count(*) FROM pragma_table_info('pets');
-- expect: 2

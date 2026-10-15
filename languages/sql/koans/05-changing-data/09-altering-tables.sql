-- title: Altering tables
-- intro: `ALTER TABLE` renames a table or a column, adds a column (with a default for the rows already there), or drops one.
CREATE TABLE pets (name TEXT, kind TEXT);
INSERT INTO pets VALUES ('Tom', 'cat'), ('Rex', 'dog');
ALTER TABLE pets ADD COLUMN age INTEGER DEFAULT 0;

-- existing rows get the default
SELECT name, age FROM pets ORDER BY name;
-- expect: ___

ALTER TABLE pets RENAME COLUMN kind TO species;

-- the new column name
SELECT species FROM pets WHERE name = 'Tom';
-- expect: ___

ALTER TABLE pets DROP COLUMN age;

-- two columns left
SELECT count(*) FROM pragma_table_info('pets');
-- expect: ___

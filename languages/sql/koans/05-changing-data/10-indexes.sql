-- title: Indexes
-- intro: An index lets SQLite find rows without reading every one, like a book's index. It changes how fast a query runs, never its answer. A `UNIQUE` index also refuses repeats, and `PRAGMA` statements describe the indexes a table has.
CREATE TABLE people (id INTEGER PRIMARY KEY, email TEXT, city TEXT);
INSERT INTO people (email, city) VALUES ('ada@example.org', 'London'), ('alan@example.org', 'London'), ('grace@example.org', 'Arlington');

CREATE INDEX people_city ON people (city);

-- index_info lists an index's columns: its position, the column's number, its name
PRAGMA index_info(people_city);
-- expect: ___

-- an index changes no answers
SELECT count(*) FROM people WHERE city = 'London';
-- expect: ___

CREATE UNIQUE INDEX people_email ON people (email);

-- a unique index refuses repeats
INSERT INTO people (email, city) VALUES ('ada@example.org', 'Paris');
-- expect: ___

-- index_list says which are unique
SELECT name, "unique" FROM pragma_index_list('people') ORDER BY name;
-- expect: ___

-- indexes are listed in sqlite_schema
SELECT name FROM sqlite_schema WHERE type = 'index' ORDER BY name;
-- expect: ___

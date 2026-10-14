-- title: Left joins
-- intro: `LEFT JOIN` keeps every row of the left table, with NULLs where nothing on the right matched. Counting a column of the right table then counts real matches only.
CREATE TABLE authors (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE books (title TEXT, author_id INTEGER);
INSERT INTO authors VALUES (1, 'Knuth'), (2, 'Hopper'), (3, 'Dijkstra');
INSERT INTO books VALUES ('TAOCP', 1), ('Concrete Mathematics', 1), ('A Discipline of Programming', 3);

-- Hopper appears, with no book
SELECT name, title FROM authors LEFT JOIN books ON books.author_id = authors.id WHERE name = 'Hopper';
-- expect: 'Hopper', ___

-- books per author, zero included
SELECT name, count(title) FROM authors LEFT JOIN books ON books.author_id = authors.id GROUP BY name ORDER BY name;
-- expect: ('Dijkstra', 1), ('Hopper', ___), ('Knuth', 2)

-- authors with no books at all
SELECT name FROM authors LEFT JOIN books ON books.author_id = authors.id WHERE title IS ___;
-- expect: 'Hopper'

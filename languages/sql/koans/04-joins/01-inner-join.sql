-- title: Inner joins
-- intro: `JOIN … ON` pairs rows from two tables wherever the condition holds. Rows that find no partner are left out.
CREATE TABLE authors (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE books (title TEXT, author_id INTEGER);
INSERT INTO authors VALUES (1, 'Knuth'), (2, 'Hopper'), (3, 'Dijkstra');
INSERT INTO books VALUES ('TAOCP', 1), ('Concrete Mathematics', 1), ('A Discipline of Programming', 3);

-- each book with its author
SELECT title, name FROM books JOIN authors ON authors.id = books.author_id ORDER BY title;
-- expect: ('A Discipline of Programming', 'Dijkstra'), ('Concrete Mathematics', ___), ('TAOCP', 'Knuth')

-- authors with no books don't appear
SELECT count(DISTINCT name) FROM books JOIN authors ON authors.id = books.author_id;
-- expect: ___

-- short names for tables
SELECT b.title FROM books b JOIN authors a ON a.id = b.author_id WHERE a.name = ___;
-- expect: 'A Discipline of Programming'

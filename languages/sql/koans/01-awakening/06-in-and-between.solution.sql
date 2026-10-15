CREATE TABLE books (title TEXT, author TEXT, year INTEGER, pages INTEGER, genre TEXT);
INSERT INTO books VALUES
  ('Dune', 'Herbert', 1965, 412, 'sf'),
  ('Emma', 'Austen', 1815, 474, 'novel'),
  ('Persuasion', 'Austen', 1817, 249, 'novel'),
  ('Neuromancer', 'Gibson', 1984, 271, 'sf'),
  ('Ulysses', 'Joyce', 1922, 730, 'novel'),
  ('Solaris', 'Lem', 1961, 204, 'sf');

-- books by either author
SELECT title FROM books WHERE author IN ('Lem', 'Joyce') ORDER BY title;
-- expect: ('Solaris'), ('Ulysses')

-- published in the 1960s
SELECT title FROM books WHERE year BETWEEN 1960 AND 1969 ORDER BY year;
-- expect: ('Solaris'), ('Dune')

-- BETWEEN includes both ends
SELECT count(*) FROM books WHERE pages BETWEEN 249 AND 412;
-- expect: 3

-- NOT IN keeps the rest
SELECT count(*) FROM books WHERE genre NOT IN ('sf');
-- expect: 3

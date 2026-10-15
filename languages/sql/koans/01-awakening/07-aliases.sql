-- title: Aliases
-- intro: `AS` names a computed column, or gives a table a short name. A column alias can be used in `ORDER BY`. Standard SQL doesn't allow it in `WHERE`, which runs before the columns are computed; SQLite does, as an extension.
CREATE TABLE books (title TEXT, author TEXT, year INTEGER, pages INTEGER, genre TEXT);
INSERT INTO books VALUES
  ('Dune', 'Herbert', 1965, 412, 'sf'),
  ('Emma', 'Austen', 1815, 474, 'novel'),
  ('Persuasion', 'Austen', 1817, 249, 'novel'),
  ('Neuromancer', 'Gibson', 1984, 271, 'sf'),
  ('Ulysses', 'Joyce', 1922, 730, 'novel'),
  ('Solaris', 'Lem', 1961, 204, 'sf');

-- name a computed column
SELECT title, 2026 - year AS age FROM books ORDER BY age LIMIT 1;
-- expect: ___

-- a short name for a table
SELECT b.title FROM books AS b WHERE b.pages > 700;
-- expect: ___

-- to be portable, repeat the expression in WHERE
SELECT title FROM books WHERE pages / 100 = 4 ORDER BY title;
-- expect: ___

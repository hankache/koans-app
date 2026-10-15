-- title: Top N per group
-- intro: The best two of each group: number the rows within each group with a window function, then keep the low numbers.
CREATE TABLE books (title TEXT, author TEXT, year INTEGER, pages INTEGER, genre TEXT);
INSERT INTO books VALUES
  ('Dune', 'Herbert', 1965, 412, 'sf'),
  ('Emma', 'Austen', 1815, 474, 'novel'),
  ('Persuasion', 'Austen', 1817, 249, 'novel'),
  ('Neuromancer', 'Gibson', 1984, 271, 'sf'),
  ('Ulysses', 'Joyce', 1922, 730, 'novel'),
  ('Solaris', 'Lem', 1961, 204, 'sf');

-- the two longest books in each genre
SELECT genre, title FROM (
  SELECT genre, title, row_number() OVER (PARTITION BY genre ORDER BY pages DESC) AS n FROM books
) WHERE n <= ___
ORDER BY genre, title;
-- expect: ('novel', 'Emma'), ('novel', 'Ulysses'), ('sf', 'Dune'), ('sf', 'Neuromancer')

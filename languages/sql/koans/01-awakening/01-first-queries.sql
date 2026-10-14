-- title: First queries
-- intro: Each test is a query followed by the rows it should return, in a `-- expect:` comment, written as SQL values. Replace each `___` so they all pass. A query doesn't need a table: `SELECT` can compute on its own.
-- SELECT computes a value
SELECT 1 + 1;
-- expect: ___

-- || joins strings
SELECT 'SQL' || 'ite';
-- expect: ___

-- functions work on values
SELECT upper('koan');
-- expect: ___

-- one row, two columns
SELECT 6 * 7, ___;
-- expect: 42, 'answer'

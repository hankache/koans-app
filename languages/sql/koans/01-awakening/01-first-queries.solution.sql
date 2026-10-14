-- SELECT computes a value
SELECT 1 + 1;
-- expect: 2

-- || joins strings
SELECT 'SQL' || 'ite';
-- expect: 'SQLite'

-- functions work on values
SELECT upper('koan');
-- expect: 'KOAN'

-- one row, two columns
SELECT 6 * 7, 'answer';
-- expect: 42, 'answer'

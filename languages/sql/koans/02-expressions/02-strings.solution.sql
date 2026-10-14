-- length counts characters
SELECT length('SQLite');
-- expect: 6

-- substr takes a start and a length
SELECT substr('SQLite', 1, 3);
-- expect: 'SQL'

-- a doubled quote is one quote
SELECT length('it''s');
-- expect: 4

-- replace
SELECT replace('a-b-c', '-', '+');
-- expect: 'a+b+c'

-- instr finds where something starts
SELECT instr('koans', 'an');
-- expect: 3

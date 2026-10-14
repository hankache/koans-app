-- title: Strings
-- intro: Strings are in single quotes, and a quote inside one is written twice. SQLite's string functions count positions from 1.
-- length counts characters
SELECT length('SQLite');
-- expect: ___

-- substr takes a start and a length
SELECT substr('SQLite', 1, 3);
-- expect: ___

-- a doubled quote is one quote
SELECT length('it''s');
-- expect: ___

-- replace
SELECT replace('a-b-c', '-', '+');
-- expect: ___

-- instr finds where something starts
SELECT instr('koans', 'an');
-- expect: ___

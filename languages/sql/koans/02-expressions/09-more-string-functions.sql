-- title: More string functions
-- intro: `substr`, `instr`, `replace`, `trim` and `printf` (also called `format`) cover most text work.
-- substr(text, start, length) counts from 1
SELECT substr('enlightenment', 3, 5);
-- expect: ___

-- instr finds a position, or 0
SELECT instr('koans.app', '.');
-- expect: ___

-- replace every match
SELECT replace('a-b-c', '-', '+');
-- expect: ___

-- trim given characters
SELECT trim('--koan--', '-');
-- expect: ___

-- printf formats like C
SELECT printf('%05.1f|%-4s|', 3.14159, 'ab');
-- expect: ___

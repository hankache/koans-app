-- substr(text, start, length) counts from 1
SELECT substr('enlightenment', 3, 5);
-- expect: 'light'

-- instr finds a position, or 0
SELECT instr('koans.app', '.');
-- expect: 6

-- replace every match
SELECT replace('a-b-c', '-', '+');
-- expect: 'a+b+c'

-- trim given characters
SELECT trim('--koan--', '-');
-- expect: 'koan'

-- printf formats like C
SELECT printf('%05.1f|%-4s|', 3.14159, 'ab');
-- expect: '003.1|ab  |'

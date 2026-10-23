:- begin_tests(comparing_numbers).
test('< evaluates both sides', true) :- 1 + 1 < 3.
test('=< is less than or equal', true) :- 2 =< 2.
test('=:= compares values', true) :- 1 + 2 =:= 3.
test('== compares terms, and 1 + 2 is not 3', fail) :- 1 + 2 == 3.
test('=\\= is not equal in value', true) :- 4 =\= 5.
:- end_tests(comparing_numbers).

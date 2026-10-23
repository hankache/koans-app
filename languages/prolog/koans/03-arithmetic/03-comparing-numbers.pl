% title: Comparing numbers
% intro: `<`, `>`, `=<` and `>=` evaluate both sides and compare them, and `=:=` and `=\=` check that they are equal or not. Notice `=<`, not `<=`.
:- begin_tests(comparing_numbers).
test('< evaluates both sides', ___) :- 1 + 1 < 3.
test('=< is less than or equal', ___) :- 2 =< 2.
test('=:= compares values', ___) :- 1 + 2 =:= 3.
test('== compares terms, and 1 + 2 is not 3', ___) :- 1 + 2 == 3.
test('=\\= is not equal in value', ___) :- 4 =\= 5.
:- end_tests(comparing_numbers).

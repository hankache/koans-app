:- begin_tests(is).
test('is evaluates', X == 7) :- X is 3 + 4.
test('= does not: it keeps the term', X == 2 * 5) :- X = 2 * 5.
test('but it can be evaluated later', Y == 10) :- X = 2 * 5, Y is X.
test('precedence as in mathematics', X == 14) :- X is 2 + 3 * 4.
test('is needs the right side to be bound', error(instantiation_error)) :- X is _ + 1, print(X).
:- end_tests(is).

% title: Is
% intro: `X = 1 + 2` binds `X` to the term `1 + 2`, unevaluated. To compute, use `is`: `X is 1 + 2` evaluates the right side.
:- begin_tests(is).
test('is evaluates', X == ___) :- X is 3 + 4.
test('= does not: it keeps the term', X == ___) :- X = 2 * 5.
test('but it can be evaluated later', Y == ___) :- X = 2 * 5, Y is X.
test('precedence as in mathematics', X == ___) :- X is 2 + 3 * 4.
test('is needs the right side to be bound', error(___)) :- X is _ + 1, print(X).
:- end_tests(is).

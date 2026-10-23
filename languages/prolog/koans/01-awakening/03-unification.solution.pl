:- begin_tests(unification).
test('a variable on the right', X == red) :- red = X.
test('two different atoms never unify', fail) :- red = blue.
test('variables on both sides', Y == 5) :- X = Y, X = 5.
test('structures unify part by part', Y == 2) :- point(1, Y) = point(1, 2).
test('a different name never unifies', fail) :- point(1, 2) = place(1, 2).
:- end_tests(unification).

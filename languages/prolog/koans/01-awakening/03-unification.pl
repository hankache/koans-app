% title: Unification
% intro: `=` doesn't assign: it unifies, making two terms equal by binding variables on either side. It fails if they can't be made equal.
:- begin_tests(unification).
test('a variable on the right', X == ___) :- red = X.
test('two different atoms never unify', ___) :- red = blue.
test('variables on both sides', Y == ___) :- X = Y, X = 5.
test('structures unify part by part', Y == ___) :- point(1, Y) = point(1, 2).
test('a different name never unifies', ___) :- point(1, 2) = place(1, 2).
:- end_tests(unification).

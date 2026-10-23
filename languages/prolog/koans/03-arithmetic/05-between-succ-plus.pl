% title: Between, succ and plus
% intro: `between(Low, High, X)` gives each integer in a range, `succ(X, Y)` relates a number to the next, and `plus(X, Y, Z)` works in any direction.
:- begin_tests(between_succ_plus).
test('between counts', all(X == ___)) :- between(1, 3, X).
test('between checks', ___) :- between(1, 3, 5).
test('succ: the next number', Y == ___) :- succ(4, Y).
test('succ backward', X == ___) :- succ(X, 5).
test('plus solves for the missing number', Y == ___) :- plus(3, Y, 10).
:- end_tests(between_succ_plus).

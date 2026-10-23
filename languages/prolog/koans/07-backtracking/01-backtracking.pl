% title: Backtracking
% intro: When a goal fails, Prolog goes back to the last choice it made and tries the next alternative. This is how it finds solutions without loops.
:- begin_tests(backtracking).
test('the first X that is greater than 2', X == ___) :- member(X, [1, 2, 3, 4]), X > 2.
test('every one', all(X == ___)) :- member(X, [1, 2, 3, 4]), X > 2.
test('two lists, every pair that sums to 5', all(X-Y == ___)) :- member(X, [1, 2, 3]), member(Y, [2, 3, 4]), X + Y =:= 5.
:- end_tests(backtracking).

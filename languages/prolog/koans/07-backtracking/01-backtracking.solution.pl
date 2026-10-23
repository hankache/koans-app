:- begin_tests(backtracking).
test('the first X that is greater than 2', X == 3) :- member(X, [1, 2, 3, 4]), X > 2.
test('every one', all(X == [3, 4])) :- member(X, [1, 2, 3, 4]), X > 2.
test('two lists, every pair that sums to 5', all(X-Y == [1-4, 2-3, 3-2])) :- member(X, [1, 2, 3]), member(Y, [2, 3, 4]), X + Y =:= 5.
:- end_tests(backtracking).

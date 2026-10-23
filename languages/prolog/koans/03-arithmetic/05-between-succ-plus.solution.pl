:- begin_tests(between_succ_plus).
test('between counts', all(X == [1, 2, 3])) :- between(1, 3, X).
test('between checks', fail) :- between(1, 3, 5).
test('succ: the next number', Y == 5) :- succ(4, Y).
test('succ backward', X == 4) :- succ(X, 5).
test('plus solves for the missing number', Y == 7) :- plus(3, Y, 10).
:- end_tests(between_succ_plus).

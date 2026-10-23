:- begin_tests(lambdas).
test('a lambda in maplist', L == [1, 4, 9]) :- maplist([X, Y]>>(Y is X * X), [1, 2, 3], L).
test('include keeps what passes', L == [3, 4]) :- include([X]>>(X > 2), [1, 2, 3, 4], L).
test('exclude drops it', L == [1, 2]) :- exclude([X]>>(X > 2), [1, 2, 3, 4], L).
test('partition does both', In-Out == [2, 4]-[1, 3]) :- partition([X]>>(0 is X mod 2), [1, 2, 3, 4], In, Out).
:- end_tests(lambdas).

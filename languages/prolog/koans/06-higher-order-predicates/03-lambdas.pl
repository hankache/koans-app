% title: Lambdas
% intro: SWI-Prolog's `[X]>>Goal` is a goal without a name, often passed to `maplist` or `include`.
:- begin_tests(lambdas).
test('a lambda in maplist', L == ___) :- maplist([X, Y]>>(Y is X * X), [1, 2, 3], L).
test('include keeps what passes', L == ___) :- include([X]>>(X > 2), [1, 2, 3, 4], L).
test('exclude drops it', L == ___) :- exclude([X]>>(X > 2), [1, 2, 3, 4], L).
test('partition does both', In-Out == ___) :- partition([X]>>(0 is X mod 2), [1, 2, 3, 4], In, Out).
:- end_tests(lambdas).

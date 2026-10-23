encode([], []).
encode([X|Xs], [N-X|Rest]) :- take_same(X, Xs, 1, N, Others), encode(Others, Rest).
take_same(X, [X|Xs], N0, N, Others) :- !, N1 is N0 + 1, take_same(X, Xs, N1, N, Others).
take_same(_, Others, N, N, Others).
:- begin_tests(run_length_encoding).
test('runs', L == [3-a, 1-b]) :- encode([a, a, a, b], L).
test('runs, not equal items', L == [1-x, 2-y, 1-x]) :- encode([x, y, y, x], L).
test('clumped does the same, item first', L == [a-3, b-1]) :- clumped([a, a, a, b], L).
:- end_tests(run_length_encoding).

:- begin_tests(select_and_permutation).
test('select takes an item out', R == [a, c]) :- select(b, [a, b, c], R).
test('every way to take one out', all(X == [a, b, c])) :- select(X, [a, b, c], _).
test('every permutation', all(P == [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]])) :- permutation([1, 2, 3], P).
test('how many orderings of four items', N == 24) :- aggregate_all(count, permutation([a, b, c, d], _), N).
:- end_tests(select_and_permutation).

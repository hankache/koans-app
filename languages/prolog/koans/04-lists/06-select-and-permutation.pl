% title: Select and permutation
% intro: `select(X, List, Rest)` takes one item out of a list, in every possible way, and `permutation` gives every ordering of a list.
:- begin_tests(select_and_permutation).
test('select takes an item out', R == ___) :- select(b, [a, b, c], R).
test('every way to take one out', all(X == ___)) :- select(X, [a, b, c], _).
test('every permutation', all(P == ___)) :- permutation([1, 2, 3], P).
test('how many orderings of four items', N == ___) :- aggregate_all(count, permutation([a, b, c, d], _), N).
:- end_tests(select_and_permutation).

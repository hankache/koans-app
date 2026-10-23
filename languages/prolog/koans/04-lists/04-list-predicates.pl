% title: List predicates
% intro: SWI-Prolog's list library has the usual tools: `reverse`, `last`, `sum_list`, `max_list`, `nth1`, `numlist`.
:- begin_tests(list_predicates).
test('reverse', R == ___) :- reverse([a, b, c], R).
test('last', X == ___) :- last([1, 2, 3], X).
test('sum_list', S == ___) :- sum_list([1, 2, 3, 4], S).
test('max_list', M == ___) :- max_list([3, 9, 4], M).
test('numlist makes a range', L == ___) :- numlist(3, 5, L).
test('nth1 counts from 1', X == ___) :- nth1(1, [a, b], X).
:- end_tests(list_predicates).

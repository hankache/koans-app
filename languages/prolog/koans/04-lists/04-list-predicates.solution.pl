:- begin_tests(list_predicates).
test('reverse', R == [c, b, a]) :- reverse([a, b, c], R).
test('last', X == 3) :- last([1, 2, 3], X).
test('sum_list', S == 10) :- sum_list([1, 2, 3, 4], S).
test('max_list', M == 9) :- max_list([3, 9, 4], M).
test('numlist makes a range', L == [3, 4, 5]) :- numlist(3, 5, L).
test('nth1 counts from 1', X == a) :- nth1(1, [a, b], X).
:- end_tests(list_predicates).

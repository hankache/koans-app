:- begin_tests(operators).
test('1 + 2 is +(1, 2)', true) :- 1 + 2 == +(1, 2).
test('take an operator term apart', [Op, L, R] == [+, 1, 2]) :- 1 + 2 =.. [Op, L, R].
test('a pair', K == name) :- K-_ = name-ann.
test('pairs_keys_values', K == [a, b]) :- pairs_keys_values([a-1, b-2], K, _).
:- end_tests(operators).

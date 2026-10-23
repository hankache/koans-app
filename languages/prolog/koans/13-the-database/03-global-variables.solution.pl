:- begin_tests(global_variables).
test('set, then get', V == 42) :- nb_setval(answer, 42), nb_getval(answer, V).
test('a new value replaces the old', V == [a, b]) :- nb_setval(items, [a]), nb_getval(items, L), nb_setval(items, [a, b]), nb_getval(items, V), L == [a].
:- end_tests(global_variables).

% title: Global variables
% intro: SWI-Prolog also has global variables: `nb_setval` stores a value under a name and `nb_getval` reads it.
:- begin_tests(global_variables).
test('set, then get', V == ___) :- nb_setval(answer, 42), nb_getval(answer, V).
test('a new value replaces the old', V == ___) :- nb_setval(items, [a]), nb_getval(items, L), nb_setval(items, [a, b]), nb_getval(items, V), L == [a].
:- end_tests(global_variables).

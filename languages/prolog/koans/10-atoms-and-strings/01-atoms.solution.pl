:- begin_tests(atoms).
test('atom_length', N == 5) :- atom_length(hello, N).
test('atom_concat joins', A == helloworld) :- atom_concat(hello, world, A).
test('or splits, when the end is known', A == hello) :- atom_concat(A, world, helloworld).
test('upcase_atom', U == 'HELLO') :- upcase_atom(hello, U).
test('sub_atom finds a piece', S == ell) :- sub_atom(hello, 1, 3, _, S).
:- end_tests(atoms).

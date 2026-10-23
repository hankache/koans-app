% title: Atoms
% intro: `atom_length` measures an atom, `atom_concat` joins two, and both, like many Prolog predicates, also work backward.
:- begin_tests(atoms).
test('atom_length', N == ___) :- atom_length(hello, N).
test('atom_concat joins', A == ___) :- atom_concat(hello, world, A).
test('or splits, when the end is known', A == ___) :- atom_concat(A, world, helloworld).
test('upcase_atom', U == ___) :- upcase_atom(hello, U).
test('sub_atom finds a piece', S == ___) :- sub_atom(hello, 1, 3, _, S).
:- end_tests(atoms).

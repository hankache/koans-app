:- begin_tests(characters).
test('atom_chars', L == [c, a, t]) :- atom_chars(cat, L).
test('and back', A == tac) :- atom_chars(A, [t, a, c]).
test('reversing an atom', R == olleh) :- atom_chars(hello, L), reverse(L, RL), atom_chars(R, RL).
test('char_code', C == 97) :- char_code(a, C).
:- end_tests(characters).

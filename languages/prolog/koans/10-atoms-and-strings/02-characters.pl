% title: Characters
% intro: `atom_chars` turns an atom into a list of one-character atoms, and back. `char_code` gives a character's code.
:- begin_tests(characters).
test('atom_chars', L == ___) :- atom_chars(cat, L).
test('and back', A == ___) :- atom_chars(A, [t, a, c]).
test('reversing an atom', R == ___) :- atom_chars(hello, L), reverse(L, RL), atom_chars(R, RL).
test('char_code', C == ___) :- char_code(a, C).
:- end_tests(characters).

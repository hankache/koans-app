% title: Converting
% intro: `atom_number` and `number_string` read numbers from text, `atom_string` converts between atoms and strings, and `format(atom(A), …)` builds an atom from a format.
:- begin_tests(converting).
test('atom_number', N == ___) :- atom_number('42', N).
test('atom_number fails on anything else', ___) :- atom_number(abc, _).
test('number_string', N == ___) :- number_string(N, "7").
test('atom_string', S == ___) :- atom_string(abc, S).
test('format to an atom', A == ___) :- format(atom(A), "~w = ~w", [x, 3]).
:- end_tests(converting).

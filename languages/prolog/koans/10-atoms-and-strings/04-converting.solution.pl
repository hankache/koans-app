:- begin_tests(converting).
test('atom_number', N == 42) :- atom_number('42', N).
test('atom_number fails on anything else', fail) :- atom_number(abc, _).
test('number_string', N == 7) :- number_string(N, "7").
test('atom_string', S == "abc") :- atom_string(abc, S).
test('format to an atom', A == 'x = 3') :- format(atom(A), "~w = ~w", [x, 3]).
:- end_tests(converting).

% title: Atomic_list_concat
% intro: `atomic_list_concat` joins a list into one atom, with a separator if you give one, or, run backward, splits an atom at a separator.
:- begin_tests(atomic_list_concat).
test('joining', A == ___) :- atomic_list_concat([a, b, c], A).
test('with a separator', A == ___) :- atomic_list_concat([a, b, c], '-', A).
test('numbers join too', A == ___) :- atomic_list_concat([x, 1], A).
test('splitting', L == ___) :- atomic_list_concat(L, ',', 'a,b,c').
:- end_tests(atomic_list_concat).

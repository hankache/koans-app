:- begin_tests(atomic_list_concat).
test('joining', A == abc) :- atomic_list_concat([a, b, c], A).
test('with a separator', A == 'a-b-c') :- atomic_list_concat([a, b, c], '-', A).
test('numbers join too', A == 'x1') :- atomic_list_concat([x, 1], A).
test('splitting', L == [a, b, c]) :- atomic_list_concat(L, ',', 'a,b,c').
:- end_tests(atomic_list_concat).

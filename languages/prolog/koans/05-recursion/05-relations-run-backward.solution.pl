my_append([], L, L).
my_append([H|T], L, [H|R]) :- my_append(T, L, R).
:- begin_tests(relations_run_backward).
test('forward', L == [a, b, c]) :- my_append([a], [b, c], L).
test('backward: what comes before [c]?', X == [a, b]) :- my_append(X, [c], [a, b, c]).
test('and every split', all(X == [[], [a], [a, b]])) :- my_append(X, _, [a, b]).
:- end_tests(relations_run_backward).

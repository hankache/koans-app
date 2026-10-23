% title: Relations run backward
% intro: A predicate is a relation, not a function: the same definition can often be used with the input and the output swapped.
my_append([], L, L).
my_append([H|T], L, [H|R]) :- my_append(T, L, R).
:- begin_tests(relations_run_backward).
test('forward', L == ___) :- my_append([a], [b, c], L).
test('backward: what comes before [c]?', X == ___) :- my_append(X, [c], [a, b, c]).
test('and every split', all(X == ___)) :- my_append(X, _, [a, b]).
:- end_tests(relations_run_backward).

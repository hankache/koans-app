% title: Inspecting terms
% intro: `functor` gives a term's name and number of arguments, `arg` takes one argument, and `=..`, "univ", turns a term into a list and back.
:- begin_tests(inspecting_terms).
test('functor', N/A == ___) :- functor(point(1, 2, 3), N, A).
test('arg counts from 1', X == ___) :- arg(2, point(1, 2, 3), X).
test('univ takes a term apart', L == ___) :- point(1, 2) =.. L.
test('and builds one', T == ___) :- T =.. [f, a, b].
:- end_tests(inspecting_terms).

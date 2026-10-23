:- begin_tests(inspecting_terms).
test('functor', N/A == point/3) :- functor(point(1, 2, 3), N, A).
test('arg counts from 1', X == 2) :- arg(2, point(1, 2, 3), X).
test('univ takes a term apart', L == [point, 1, 2]) :- point(1, 2) =.. L.
test('and builds one', T == f(a, b)) :- T =.. [f, a, b].
:- end_tests(inspecting_terms).

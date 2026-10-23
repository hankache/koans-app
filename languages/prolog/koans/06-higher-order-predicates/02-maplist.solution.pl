double(X, Y) :- Y is X * 2.
:- begin_tests(maplist).
test('every item passes', true) :- maplist(integer, [1, 2, 3]).
test('one does not', fail) :- maplist(integer, [1, a, 3]).
test('maplist/3 maps', L == [2, 4, 6]) :- maplist(double, [1, 2, 3], L).
test('and can run backward', L == [1, 2]) :- maplist(succ, L, [2, 3]).
:- end_tests(maplist).

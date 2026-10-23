% title: Maplist
% intro: `maplist(G, L)` checks that `G` holds for every item, and `maplist(G, L1, L2)` relates two lists item by item.
double(X, Y) :- Y is X * 2.
:- begin_tests(maplist).
test('every item passes', ___) :- maplist(integer, [1, 2, 3]).
test('one does not', ___) :- maplist(integer, [1, a, 3]).
test('maplist/3 maps', L == ___) :- maplist(double, [1, 2, 3], L).
test('and can run backward', L == ___) :- maplist(succ, L, [2, 3]).
:- end_tests(maplist).

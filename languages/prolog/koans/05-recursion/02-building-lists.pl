% title: Building lists
% intro: A recursion can build a new list as it goes, an item in its head for each item of the input.
double_all([], []).
double_all([X|Xs], [Y|Ys]) :- Y is X * 2, double_all(Xs, Ys).
evens([], []).
evens([X|Xs], [X|Ys]) :- 0 is X mod 2, !, evens(Xs, Ys).
evens([_|Xs], Ys) :- evens(Xs, Ys).
:- begin_tests(building_lists).
test('double_all', L == ___) :- double_all([1, 2, 3], L).
test('evens keeps the even ones', L == ___) :- evens([1, 2, 3, 4], L).
:- end_tests(building_lists).

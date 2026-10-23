% title: Or
% intro: `;` means "or" inside a body, and gives a solution for each side that succeeds.
weekend(Day) :- ( Day = saturday ; Day = sunday ).
color(C) :- member(C, [red, green]).
:- begin_tests(disjunction).
test('the first branch', ___) :- weekend(saturday).
test('the second', ___) :- weekend(sunday).
test('every solution of an or', all(D == ___)) :- weekend(D).
test('or between two goals', all(X == ___)) :- ( color(X) ; X = 1 ).
:- end_tests(disjunction).

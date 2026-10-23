weekend(Day) :- ( Day = saturday ; Day = sunday ).
color(C) :- member(C, [red, green]).
:- begin_tests(disjunction).
test('the first branch', true) :- weekend(saturday).
test('the second', true) :- weekend(sunday).
test('every solution of an or', all(D == [saturday, sunday])) :- weekend(D).
test('or between two goals', all(X == [red, green, 1])) :- ( color(X) ; X = 1 ).
:- end_tests(disjunction).

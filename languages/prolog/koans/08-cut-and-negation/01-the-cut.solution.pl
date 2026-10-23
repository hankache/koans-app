max_of(X, Y, X) :- X >= Y, !.
max_of(_, Y, Y).
first(X) :- member(X, [a, b, c]), !.
:- begin_tests(the_cut).
test('max_of, first clause', M == 5) :- max_of(5, 3, M).
test('second clause', M == 7) :- max_of(5, 7, M).
test('the cut leaves only the first answer', all(X == [a])) :- first(X).
:- end_tests(the_cut).

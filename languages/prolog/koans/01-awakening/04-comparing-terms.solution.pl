:- begin_tests(comparing_terms).
test('== does not bind', fail) :- X == 3.
test('= does', X == 3) :- X = 3.
test('identical atoms', true) :- abc == abc.
test('\\== is not identical', true) :- abc \== abd.
test('@< compares atoms alphabetically', true) :- apple @< banana.
:- end_tests(comparing_terms).

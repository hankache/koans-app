% title: Comparing terms
% intro: `==` asks whether two terms are already identical, without binding anything, unlike `=`. `\==` is its opposite, and `@<` compares terms in the standard order.
:- begin_tests(comparing_terms).
test('== does not bind', ___) :- X == 3.
test('= does', X == ___) :- X = 3.
test('identical atoms', ___) :- abc == abc.
test('\\== is not identical', ___) :- abc \== abd.
test('@< compares atoms alphabetically', ___) :- apple @< banana.
:- end_tests(comparing_terms).

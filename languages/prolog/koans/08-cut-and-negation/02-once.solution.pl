:- begin_tests(once).
test('once takes the first solution', all(X == [a])) :- once(member(X, [a, b, c])).
test('without it, all of them', all(X == [a, b, c])) :- member(X, [a, b, c]).
test('memberchk is member with once built in', true) :- memberchk(b, [a, b, b]).
:- end_tests(once).

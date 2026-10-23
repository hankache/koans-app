% title: Once
% intro: `once(G)` takes the first solution of `G` and no others, like a cut that stays inside it.
:- begin_tests(once).
test('once takes the first solution', all(X == ___)) :- once(member(X, [a, b, c])).
test('without it, all of them', all(X == ___)) :- member(X, [a, b, c]).
test('memberchk is member with once built in', ___) :- memberchk(b, [a, b, b]).
:- end_tests(once).

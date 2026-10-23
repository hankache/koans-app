% title: The cut
% intro: `!`, the cut, commits to the choices made so far in the clause: no other clause of the predicate, and no other answer of the goals before it, will be tried.
max_of(X, Y, X) :- X >= Y, !.
max_of(_, Y, Y).
first(X) :- member(X, [a, b, c]), !.
:- begin_tests(the_cut).
test('max_of, first clause', M == ___) :- max_of(5, 3, M).
test('second clause', M == ___) :- max_of(5, 7, M).
test('the cut leaves only the first answer', all(X == ___)) :- first(X).
:- end_tests(the_cut).

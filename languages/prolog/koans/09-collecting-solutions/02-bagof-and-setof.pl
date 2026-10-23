% title: Bagof and setof
% intro: `bagof` is like `findall`, but fails when there are no solutions, and groups its answers by the other variables. `setof` also sorts them and removes duplicates. `^` marks a variable to leave out of the grouping.
age(ann, 31).
age(bob, 25).
age(cid, 31).
:- begin_tests(bagof_and_setof).
test('bagof fails when there is nothing', ___) :- bagof(N, age(N, 99), _).
test('setof sorts and removes duplicates', L == ___) :- setof(A, N^age(N, A), L).
test('grouped by age', all(A-L == ___)) :- bagof(N, age(N, A), L).
:- end_tests(bagof_and_setof).

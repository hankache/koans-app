age(ann, 31).
age(bob, 25).
age(cid, 31).
:- begin_tests(bagof_and_setof).
test('bagof fails when there is nothing', fail) :- bagof(N, age(N, 99), _).
test('setof sorts and removes duplicates', L == [25, 31]) :- setof(A, N^age(N, A), L).
test('grouped by age', all(A-L == [25-[bob], 31-[ann, cid]])) :- bagof(N, age(N, A), L).
:- end_tests(bagof_and_setof).

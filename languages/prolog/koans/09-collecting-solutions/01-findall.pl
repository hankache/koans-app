% title: Findall
% intro: `findall(Template, Goal, List)` collects the template for every solution of the goal, in order, and gives `[]` when there are none.
age(ann, 31).
age(bob, 25).
age(cid, 31).
:- begin_tests(findall).
test('every name', L == ___) :- findall(N, age(N, _), L).
test('a template can be any term', L == ___) :- findall(N-A, (age(N, A), A > 30), L).
test('no solutions, the empty list', L == ___) :- findall(N, age(N, 99), L).
:- end_tests(findall).

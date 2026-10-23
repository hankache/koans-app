age(ann, 31).
age(bob, 25).
age(cid, 31).
:- begin_tests(findall).
test('every name', L == [ann, bob, cid]) :- findall(N, age(N, _), L).
test('a template can be any term', L == [ann-31, cid-31]) :- findall(N-A, (age(N, A), A > 30), L).
test('no solutions, the empty list', L == []) :- findall(N, age(N, 99), L).
:- end_tests(findall).

parent(tom, bob).
parent(tom, liz).
parent(bob, ann).
:- begin_tests(multiple_solutions).
test('every child of tom', all(C == [bob, liz])) :- parent(tom, C).
test('every parent', all(P == [tom, tom, bob])) :- parent(P, _).
test('no solutions at all', all(C == [])) :- parent(ann, C).
:- end_tests(multiple_solutions).

% title: Multiple solutions
% intro: A query can have several answers, and Prolog finds them one after another. The test option `all(X == List)` collects every answer, in order.
parent(tom, bob).
parent(tom, liz).
parent(bob, ann).
:- begin_tests(multiple_solutions).
test('every child of tom', all(C == ___)) :- parent(tom, C).
test('every parent', all(P == ___)) :- parent(P, _).
test('no solutions at all', all(C == ___)) :- parent(ann, C).
:- end_tests(multiple_solutions).

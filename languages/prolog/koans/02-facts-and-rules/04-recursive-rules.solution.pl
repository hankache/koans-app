parent(ann, bob).
parent(bob, cid).
parent(cid, dan).
ancestor(X, Y) :- parent(X, Y).
ancestor(X, Y) :- parent(X, Z), ancestor(Z, Y).
:- begin_tests(recursive_rules).
test('a parent is an ancestor', true) :- ancestor(ann, bob).
test('so is a great-grandparent', true) :- ancestor(ann, dan).
test('every descendant of ann', all(D == [bob, cid, dan])) :- ancestor(ann, D).
test('every ancestor of dan', all(A == [cid, ann, bob])) :- ancestor(A, dan).
:- end_tests(recursive_rules).

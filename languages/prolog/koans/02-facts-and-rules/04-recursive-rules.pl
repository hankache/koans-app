% title: Recursive rules
% intro: A rule can use itself: an ancestor is a parent, or a parent of an ancestor. Several clauses for one predicate mean "or".
parent(ann, bob).
parent(bob, cid).
parent(cid, dan).
ancestor(X, Y) :- parent(X, Y).
ancestor(X, Y) :- parent(X, Z), ancestor(Z, Y).
:- begin_tests(recursive_rules).
test('a parent is an ancestor', ___) :- ancestor(ann, bob).
test('so is a great-grandparent', ___) :- ancestor(ann, dan).
test('every descendant of ann', all(D == ___)) :- ancestor(ann, D).
test('every ancestor of dan', all(A == ___)) :- ancestor(A, dan).
:- end_tests(recursive_rules).

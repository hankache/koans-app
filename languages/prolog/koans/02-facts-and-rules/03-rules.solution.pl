parent(tom, bob).
parent(bob, ann).
parent(bob, pat).
grandparent(X, Z) :- parent(X, Y), parent(Y, Z).
sibling(X, Y) :- parent(P, X), parent(P, Y), X \== Y.
:- begin_tests(rules).
test('a rule joins two facts', all(G == [ann, pat])) :- grandparent(tom, G).
test('sibling', S == pat) :- sibling(ann, S).
test('nobody is their own sibling', fail) :- sibling(ann, ann).
:- end_tests(rules).

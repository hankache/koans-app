% title: Rules
% intro: A rule, `Head :- Body.`, says the head is true when the body is. A comma in the body means "and".
parent(tom, bob).
parent(bob, ann).
parent(bob, pat).
grandparent(X, Z) :- parent(X, Y), parent(Y, Z).
sibling(X, Y) :- parent(P, X), parent(P, Y), X \== Y.
:- begin_tests(rules).
test('a rule joins two facts', all(G == ___)) :- grandparent(tom, G).
test('sibling', S == ___) :- sibling(ann, S).
test('nobody is their own sibling', ___) :- sibling(ann, ann).
:- end_tests(rules).

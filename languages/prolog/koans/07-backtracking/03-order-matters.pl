% title: Order matters
% intro: Prolog tries clauses from top to bottom and goals from left to right, so their order decides the order of the answers, and sometimes whether there are any.
p(1).
p(2).
p(3).
q(X) :- p(X).
q(0).
:- begin_tests(order_matters).
test('clauses in order', all(X == ___)) :- q(X).
test('goals in order: the test runs on each candidate', all(X == ___)) :- p(X), X =:= 2.
test('a test before its variable is bound raises an error', error(___)) :- X =:= 2, p(X).
:- end_tests(order_matters).

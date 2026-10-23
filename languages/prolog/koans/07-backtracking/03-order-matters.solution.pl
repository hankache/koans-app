p(1).
p(2).
p(3).
q(X) :- p(X).
q(0).
:- begin_tests(order_matters).
test('clauses in order', all(X == [1, 2, 3, 0])) :- q(X).
test('goals in order: the test runs on each candidate', all(X == [2])) :- p(X), X =:= 2.
test('a test before its variable is bound raises an error', error(instantiation_error)) :- X =:= 2, p(X).
:- end_tests(order_matters).

bird(tweety).
bird(polly).
penguin(polly).
flies(X) :- bird(X), \+ penguin(X).
:- begin_tests(negation).
test('\\+ succeeds when the goal fails', true) :- \+ member(z, [a, b]).
test('tweety flies', true) :- flies(tweety).
test('polly does not', fail) :- flies(polly).
test('who flies', all(X == [tweety])) :- flies(X).
:- end_tests(negation).

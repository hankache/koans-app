% title: Negation
% intro: `\+ G` succeeds when `G` cannot be proved. It is negation as failure: not "false", but "not provable from what Prolog knows".
bird(tweety).
bird(polly).
penguin(polly).
flies(X) :- bird(X), \+ penguin(X).
:- begin_tests(negation).
test('\\+ succeeds when the goal fails', ___) :- \+ member(z, [a, b]).
test('tweety flies', ___) :- flies(tweety).
test('polly does not', ___) :- flies(polly).
test('who flies', all(X == ___)) :- flies(X).
:- end_tests(negation).

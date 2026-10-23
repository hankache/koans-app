% title: DCG basics
% intro: A grammar rule, `Head --> Body`, describes a sequence. `phrase(Rule, List)` checks that a list matches it. Lists in the body are terminals: the items to match.
greeting --> [hello], name.
name --> [world].
name --> [prolog].
:- begin_tests(dcg_basics).
test('a sentence the grammar accepts', ___) :- phrase(greeting, [hello, world]).
test('one it does not', ___) :- phrase(greeting, [goodbye, world]).
test('generating every sentence', all(S == ___)) :- phrase(greeting, S).
:- end_tests(dcg_basics).

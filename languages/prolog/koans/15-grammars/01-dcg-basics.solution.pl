greeting --> [hello], name.
name --> [world].
name --> [prolog].
:- begin_tests(dcg_basics).
test('a sentence the grammar accepts', true) :- phrase(greeting, [hello, world]).
test('one it does not', fail) :- phrase(greeting, [goodbye, world]).
test('generating every sentence', all(S == [[hello, world], [hello, prolog]])) :- phrase(greeting, S).
:- end_tests(dcg_basics).

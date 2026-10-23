:- begin_tests(tests).
test('is evaluates arithmetic', X == 3) :- X is 1 + 2.
test('= binds a variable', X == hello) :- X = hello.
test('a test with no option needs its goal to succeed') :- 1 < 2.
test('the option can be the outcome itself', true) :- member(b, [a, b, c]).
test('or the other outcome', fail) :- member(z, [a, b, c]).
:- end_tests(tests).

% title: Tests
% intro: Prolog code is tested with plunit. `test(Name, X == Expected) :- Goal.` runs the goal, then checks that `X` is identical to the expected value. A test with no option passes when its goal succeeds. Replace each `___` so every test passes.
:- begin_tests(tests).
test('is evaluates arithmetic', X == ___) :- X is 1 + 2.
test('= binds a variable', X == ___) :- X = hello.
test('a test with no option needs its goal to succeed') :- 1 < 2.
test('the option can be the outcome itself', ___) :- member(b, [a, b, c]).
test('or the other outcome', ___) :- member(z, [a, b, c]).
:- end_tests(tests).

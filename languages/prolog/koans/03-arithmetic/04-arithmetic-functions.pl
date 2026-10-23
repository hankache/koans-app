% title: Arithmetic functions
% intro: Inside `is`, there are functions: `max`, `min`, `abs`, `**` and `^` for powers, and more. Integers have no size limit.
:- begin_tests(arithmetic_functions).
test('max', X == ___) :- X is max(3, 9).
test('abs', X == ___) :- X is abs(-5).
test('^ raises integers to a power', X == ___) :- X is 2 ^ 10.
test('integers grow as needed', X == ___) :- X is 2 ^ 100.
test('gcd', X == ___) :- X is gcd(12, 18).
:- end_tests(arithmetic_functions).

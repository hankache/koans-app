:- begin_tests(arithmetic_functions).
test('max', X == 9) :- X is max(3, 9).
test('abs', X == 5) :- X is abs(-5).
test('^ raises integers to a power', X == 1024) :- X is 2 ^ 10.
test('integers grow as needed', X == 1267650600228229401496703205376) :- X is 2 ^ 100.
test('gcd', X == 6) :- X is gcd(12, 18).
:- end_tests(arithmetic_functions).

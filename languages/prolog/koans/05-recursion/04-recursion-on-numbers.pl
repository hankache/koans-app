% title: Recursion on numbers
% intro: Recursion works on numbers too, counting down to a base case.
factorial(0, 1) :- !.
factorial(N, F) :- N > 0, N1 is N - 1, factorial(N1, F1), F is N * F1.
fib(0, 0).
fib(1, 1).
fib(N, F) :- N > 1, A is N - 1, B is N - 2, fib(A, FA), fib(B, FB), F is FA + FB.
:- begin_tests(recursion_on_numbers).
test('factorial', F == ___) :- factorial(5, F).
test('a big factorial, exactly', F == ___) :- factorial(20, F).
test('fibonacci', F == ___) :- fib(6, F).
:- end_tests(recursion_on_numbers).

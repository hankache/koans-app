fizzbuzz(N, fizzbuzz) :- 0 is N mod 15, !.
fizzbuzz(N, fizz) :- 0 is N mod 3, !.
fizzbuzz(N, buzz) :- 0 is N mod 5, !.
fizzbuzz(N, N).
:- begin_tests(fizzbuzz).
test('a multiple of both', X == fizzbuzz) :- fizzbuzz(30, X).
test('the first five', L == [1, 2, fizz, 4, buzz]) :- numlist(1, 5, Ns), maplist(fizzbuzz, Ns, L).
:- end_tests(fizzbuzz).

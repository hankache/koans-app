% title: FizzBuzz
% intro: The classic: count from 1, but say `fizz` for multiples of 3, `buzz` for multiples of 5, and `fizzbuzz` for both.
fizzbuzz(N, fizzbuzz) :- 0 is N mod 15, !.
fizzbuzz(N, fizz) :- 0 is N mod 3, !.
fizzbuzz(N, buzz) :- 0 is N mod 5, !.
fizzbuzz(N, N).
:- begin_tests(fizzbuzz).
test('a multiple of both', X == ___) :- fizzbuzz(30, X).
test('the first five', L == ___) :- numlist(1, 5, Ns), maplist(fizzbuzz, Ns, L).
:- end_tests(fizzbuzz).

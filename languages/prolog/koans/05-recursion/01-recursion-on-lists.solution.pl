my_length([], 0).
my_length([_|T], N) :- my_length(T, N0), N is N0 + 1.
my_sum([], 0).
my_sum([H|T], S) :- my_sum(T, S0), S is S0 + H.
:- begin_tests(recursion_on_lists).
test('my_length', N == 3) :- my_length([a, b, c], N).
test('of the empty list', N == 0) :- my_length([], N).
test('my_sum', S == 6) :- my_sum([1, 2, 3], S).
:- end_tests(recursion_on_lists).

square(N, S) :- between(1, 10, N), S is N * N.
pythagorean(A, B, C) :- between(1, 20, A), between(A, 20, B), between(B, 20, C), A*A + B*B =:= C*C.
:- begin_tests(generate_and_test).
test('squares under 30', all(S == [1, 4, 9, 16, 25])) :- square(_, S), S < 30.
test('the first Pythagorean triple', [A, B, C] == [3, 4, 5]) :- pythagorean(A, B, C).
test('how many up to 20', N == 6) :- aggregate_all(count, pythagorean(_, _, _), N).
:- end_tests(generate_and_test).

% title: Generate and test
% intro: A classic pattern: one goal generates candidates, the next tests them. Backtracking does the looping.
square(N, S) :- between(1, 10, N), S is N * N.
pythagorean(A, B, C) :- between(1, 20, A), between(A, 20, B), between(B, 20, C), A*A + B*B =:= C*C.
:- begin_tests(generate_and_test).
test('squares under 30', all(S == ___)) :- square(_, S), S < 30.
test('the first Pythagorean triple', [A, B, C] == ___) :- pythagorean(A, B, C).
test('how many up to 20', N == ___) :- aggregate_all(count, pythagorean(_, _, _), N).
:- end_tests(generate_and_test).

:- dynamic counter/1.
counter(0).
increment :- retract(counter(N0)), N is N0 + 1, assertz(counter(N)).
:- begin_tests(state).
test('three increments', N == 3) :- increment, increment, increment, counter(N).
test('there is still one counter fact', L == [3]) :- findall(N, counter(N), L).
:- end_tests(state).

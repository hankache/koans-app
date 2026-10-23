% title: Keeping state
% intro: A dynamic fact can hold a value that changes, here a counter. Retract the old value, assert the new one.
:- dynamic counter/1.
counter(0).
increment :- retract(counter(N0)), N is N0 + 1, assertz(counter(N)).
:- begin_tests(state).
test('three increments', N == ___) :- increment, increment, increment, counter(N).
test('there is still one counter fact', L == ___) :- findall(N, counter(N), L).
:- end_tests(state).

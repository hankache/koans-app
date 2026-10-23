% title: Call
% intro: `call(G)` runs a goal held in a variable, and `call(G, A, B)` adds arguments to it first.
:- begin_tests(call).
test('call runs a goal', X == ___) :- G = (X = 5), call(G).
test('call adds arguments', L == ___) :- call(append([a]), [b], L).
test('a predicate name as a goal', ___) :- P = atom, call(P, hello).
:- end_tests(call).

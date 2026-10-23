:- begin_tests(call).
test('call runs a goal', X == 5) :- G = (X = 5), call(G).
test('call adds arguments', L == [a, b]) :- call(append([a]), [b], L).
test('a predicate name as a goal', true) :- P = atom, call(P, hello).
:- end_tests(call).

:- begin_tests(forall).
test('every item is positive', true) :- forall(member(X, [1, 2, 3]), X > 0).
test('not every item is even', fail) :- forall(member(X, [1, 2, 3]), 0 is X mod 2).
test('a loop for its output', S == "1 2 3 ") :- with_output_to(string(S), forall(between(1, 3, X), format("~w ", [X]))).
:- end_tests(forall).

% title: Forall
% intro: `forall(Cond, Action)` checks that the action holds for every solution of the condition. It is also how Prolog writes a loop for its effects.
:- begin_tests(forall).
test('every item is positive', ___) :- forall(member(X, [1, 2, 3]), X > 0).
test('not every item is even', ___) :- forall(member(X, [1, 2, 3]), 0 is X mod 2).
test('a loop for its output', S == ___) :- with_output_to(string(S), forall(between(1, 3, X), format("~w ", [X]))).
:- end_tests(forall).

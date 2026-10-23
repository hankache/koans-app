score(ann, 7).
score(bob, 9).
score(cid, 4).
:- begin_tests(aggregate_all).
test('count', N == 3) :- aggregate_all(count, score(_, _), N).
test('sum', S == 20) :- aggregate_all(sum(X), score(_, X), S).
test('max', M == 9) :- aggregate_all(max(X), score(_, X), M).
test('max with its witness', W == max(9, bob)) :- aggregate_all(max(X, N), score(N, X), W).
:- end_tests(aggregate_all).

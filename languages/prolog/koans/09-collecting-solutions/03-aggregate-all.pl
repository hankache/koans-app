% title: Aggregate_all
% intro: `aggregate_all` counts, sums or finds the maximum over the solutions of a goal.
score(ann, 7).
score(bob, 9).
score(cid, 4).
:- begin_tests(aggregate_all).
test('count', N == ___) :- aggregate_all(count, score(_, _), N).
test('sum', S == ___) :- aggregate_all(sum(X), score(_, X), S).
test('max', M == ___) :- aggregate_all(max(X), score(_, X), M).
test('max with its witness', W == ___) :- aggregate_all(max(X, N), score(N, X), W).
:- end_tests(aggregate_all).

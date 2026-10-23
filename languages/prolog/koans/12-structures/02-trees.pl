% title: Trees
% intro: Terms nest, so a binary tree is just `t(Left, Value, Right)`, with `nil` for an empty one. Inserting keeps it sorted; reading it in order gives a sorted list.
insert(X, nil, t(nil, X, nil)).
insert(X, t(L, V, R), t(L1, V, R)) :- X < V, !, insert(X, L, L1).
insert(X, t(L, V, R), t(L, V, R1)) :- X > V, !, insert(X, R, R1).
insert(_, T, T).
in_order(nil, []).
in_order(t(L, V, R), Xs) :- in_order(L, Ls), in_order(R, Rs), append(Ls, [V|Rs], Xs).
:- begin_tests(trees).
test('one insert', T == ___) :- insert(5, nil, T).
test('sorted, once each', L == ___) :- foldl(insert, [5, 2, 8, 2, 1], nil, T), in_order(T, L).
:- end_tests(trees).

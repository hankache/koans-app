% title: Foldl
% intro: `foldl(G, List, V0, V)` threads a value through the list: `G` is called with each item, the value so far, and the next value.
add(X, Acc0, Acc) :- Acc is Acc0 + X.
:- begin_tests(foldl).
test('a sum by foldl', S == ___) :- foldl(add, [1, 2, 3, 4], 0, S).
test('a product, with a lambda', P == ___) :- foldl([X, A0, A]>>(A is A0 * X), [1, 2, 3, 4], 1, P).
test('reversing, by putting each item in front', R == ___) :- foldl([X, A0, [X|A0]]>>true, [a, b, c], [], R).
:- end_tests(foldl).

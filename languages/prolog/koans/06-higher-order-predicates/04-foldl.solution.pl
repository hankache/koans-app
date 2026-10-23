add(X, Acc0, Acc) :- Acc is Acc0 + X.
:- begin_tests(foldl).
test('a sum by foldl', S == 10) :- foldl(add, [1, 2, 3, 4], 0, S).
test('a product, with a lambda', P == 24) :- foldl([X, A0, A]>>(A is A0 * X), [1, 2, 3, 4], 1, P).
test('reversing, by putting each item in front', R == [c, b, a]) :- foldl([X, A0, [X|A0]]>>true, [a, b, c], [], R).
:- end_tests(foldl).

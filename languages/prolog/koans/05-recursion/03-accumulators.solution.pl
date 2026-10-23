sum_acc([], Acc, Acc).
sum_acc([H|T], Acc0, Sum) :- Acc is Acc0 + H, sum_acc(T, Acc, Sum).
rev([], Acc, Acc).
rev([H|T], Acc, R) :- rev(T, [H|Acc], R).
:- begin_tests(accumulators).
test('sum with an accumulator', S == 10) :- sum_acc([1, 2, 3, 4], 0, S).
test('reverse with an accumulator', R == [c, b, a]) :- rev([a, b, c], [], R).
test('a million steps, no trouble', S == 500000500000) :- numlist(1, 1000000, L), sum_acc(L, 0, S).
:- end_tests(accumulators).

% title: Accumulators
% intro: An accumulator carries the result so far, so the recursive call is the last thing a clause does, which lets it run in constant space.
sum_acc([], Acc, Acc).
sum_acc([H|T], Acc0, Sum) :- Acc is Acc0 + H, sum_acc(T, Acc, Sum).
rev([], Acc, Acc).
rev([H|T], Acc, R) :- rev(T, [H|Acc], R).
:- begin_tests(accumulators).
test('sum with an accumulator', S == ___) :- sum_acc([1, 2, 3, 4], 0, S).
test('reverse with an accumulator', R == ___) :- rev([a, b, c], [], R).
test('a million steps, no trouble', S == ___) :- numlist(1, 1000000, L), sum_acc(L, 0, S).
:- end_tests(accumulators).

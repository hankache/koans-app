:- begin_tests(head_and_tail).
test('the head', H == a) :- [H|_] = [a, b, c].
test('the tail is a list', T == [b, c]) :- [_|T] = [a, b, c].
test('the tail of one item', T == []) :- [_|T] = [z].
test('the empty list has no head', fail) :- [_|_] = [].
test('two items, then the rest', R == [3]) :- [_, _|R] = [1, 2, 3].
:- end_tests(head_and_tail).

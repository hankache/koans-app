% title: Head and tail
% intro: `[H|T]` matches a list that has at least one item: `H` is its first item, `T` the list of the rest. The empty list is `[]`.
:- begin_tests(head_and_tail).
test('the head', H == ___) :- [H|_] = [a, b, c].
test('the tail is a list', T == ___) :- [_|T] = [a, b, c].
test('the tail of one item', T == ___) :- [_|T] = [z].
test('the empty list has no head', ___) :- [_|_] = [].
test('two items, then the rest', R == ___) :- [_, _|R] = [1, 2, 3].
:- end_tests(head_and_tail).

% title: Append
% intro: `append(A, B, C)` relates two lists and their concatenation. It works in every direction: give it any two, or even just the last.
:- begin_tests(append).
test('joining', L == ___) :- append([1, 2], [3, 4], L).
test('what to add to [1] to make [1, 2, 3]', B == ___) :- append([1], B, [1, 2, 3]).
test('every way to split a list', all(A-B == ___)) :- append(A, B, [x, y]).
test('last item, with append', X == ___) :- append(_, [X], [a, b, c]).
:- end_tests(append).

:- begin_tests(append).
test('joining', L == [1, 2, 3, 4]) :- append([1, 2], [3, 4], L).
test('what to add to [1] to make [1, 2, 3]', B == [2, 3]) :- append([1], B, [1, 2, 3]).
test('every way to split a list', all(A-B == [[]-[x, y], [x]-[y], [x, y]-[]])) :- append(A, B, [x, y]).
test('last item, with append', X == c) :- append(_, [X], [a, b, c]).
:- end_tests(append).

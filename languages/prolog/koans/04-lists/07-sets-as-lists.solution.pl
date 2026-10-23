:- begin_tests(sets_as_lists).
test('union: the first list\'s own items, then the second list', U == [1, 3, 2, 4]) :- union([1, 2, 3], [2, 4], U).
test('intersection', I == [2]) :- intersection([1, 2, 3], [2, 4], I).
test('subtract', D == [1, 3]) :- subtract([1, 2, 3], [2, 4], D).
test('subset', true) :- subset([b], [a, b, c]).
:- end_tests(sets_as_lists).

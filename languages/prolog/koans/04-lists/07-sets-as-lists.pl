% title: Sets as lists
% intro: Lists can stand for sets: `union`, `intersection` and `subtract` combine them, and `subset` compares them.
:- begin_tests(sets_as_lists).
test('union: the first list\'s own items, then the second list', U == ___) :- union([1, 2, 3], [2, 4], U).
test('intersection', I == ___) :- intersection([1, 2, 3], [2, 4], I).
test('subtract', D == ___) :- subtract([1, 2, 3], [2, 4], D).
test('subset', ___) :- subset([b], [a, b, c]).
:- end_tests(sets_as_lists).

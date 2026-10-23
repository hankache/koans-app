% title: Sorting
% intro: `msort` sorts and keeps duplicates, `sort/2` sorts and removes them, and `sort/4` sorts on a key, in any order. `list_to_set` removes duplicates and keeps the order.
:- begin_tests(sorting).
test('msort keeps duplicates', L == ___) :- msort([2, 3, 1, 2], L).
test('sort removes them', L == ___) :- sort([2, 3, 1, 2], L).
test('sort/4, descending, keeping duplicates', L == ___) :- sort(0, @>=, [2, 3, 1, 2], L).
test('list_to_set keeps the first of each', L == ___) :- list_to_set([b, a, b, c, a], L).
test('sorting pairs by key', L == ___) :- keysort([2-two, 1-one], L).
:- end_tests(sorting).

:- begin_tests(sorting).
test('msort keeps duplicates', L == [1, 2, 2, 3]) :- msort([2, 3, 1, 2], L).
test('sort removes them', L == [1, 2, 3]) :- sort([2, 3, 1, 2], L).
test('sort/4, descending, keeping duplicates', L == [3, 2, 2, 1]) :- sort(0, @>=, [2, 3, 1, 2], L).
test('list_to_set keeps the first of each', L == [b, a, c]) :- list_to_set([b, a, b, c, a], L).
test('sorting pairs by key', L == [1-one, 2-two]) :- keysort([2-two, 1-one], L).
:- end_tests(sorting).

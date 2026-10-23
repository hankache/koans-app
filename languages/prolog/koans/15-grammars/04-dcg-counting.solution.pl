ab(0) --> [].
ab(N) --> [a], ab(N0), [b], { N is N0 + 1 }.
:- begin_tests(dcg_counting).
test('three a, three b', N == 3) :- phrase(ab(N), [a, a, a, b, b, b]).
test('unbalanced input fails', fail) :- phrase(ab(_), [a, a, b]).
test('generating', S == [a, a, b, b]) :- phrase(ab(2), S).
:- end_tests(dcg_counting).

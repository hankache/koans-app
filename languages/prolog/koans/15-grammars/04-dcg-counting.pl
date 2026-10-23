% title: Counting with grammars
% intro: Grammars can describe languages a regular expression can't, such as n a's followed by exactly n b's.
ab(0) --> [].
ab(N) --> [a], ab(N0), [b], { N is N0 + 1 }.
:- begin_tests(dcg_counting).
test('three a, three b', N == ___) :- phrase(ab(N), [a, a, a, b, b, b]).
test('unbalanced input fails', ___) :- phrase(ab(_), [a, a, b]).
test('generating', S == ___) :- phrase(ab(2), S).
:- end_tests(dcg_counting).

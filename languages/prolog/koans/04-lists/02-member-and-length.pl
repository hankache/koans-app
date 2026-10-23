% title: Member and length
% intro: `member(X, List)` succeeds for each item of the list, and `length(List, N)` gives its length, or makes a list of a given length.
:- begin_tests(member_and_length).
test('member checks', ___) :- member(b, [a, b, c]).
test('member gives each item', all(X == ___)) :- member(X, [a, b, c]).
test('length', N == ___) :- length([x, y, z], N).
test('length can make a list of fresh variables', N == ___) :- length(L, 2), L = [_, _], length(L, N).
test('nth0 counts from 0', X == ___) :- nth0(2, [a, b, c], X).
:- end_tests(member_and_length).

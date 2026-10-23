:- begin_tests(member_and_length).
test('member checks', true) :- member(b, [a, b, c]).
test('member gives each item', all(X == [a, b, c])) :- member(X, [a, b, c]).
test('length', N == 3) :- length([x, y, z], N).
test('length can make a list of fresh variables', N == 2) :- length(L, 2), L = [_, _], length(L, N).
test('nth0 counts from 0', X == c) :- nth0(2, [a, b, c], X).
:- end_tests(member_and_length).

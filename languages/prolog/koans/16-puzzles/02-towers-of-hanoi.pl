% title: Towers of Hanoi
% intro: Move a tower of disks from one peg to another, one disk at a time, never a larger on a smaller. The recursive solution fits in three lines.
hanoi(0, _, _, _, []) :- !.
hanoi(N, From, To, Via, Moves) :- N1 is N - 1, hanoi(N1, From, Via, To, M1), hanoi(N1, Via, To, From, M2), append(M1, [From-To|M2], Moves).
:- begin_tests(towers_of_hanoi).
test('one disk, one move', M == ___) :- hanoi(1, left, right, middle, M).
test('two disks', M == ___) :- hanoi(2, left, right, middle, M).
test('ten disks: 2 ^ 10 - 1 moves', N == ___) :- hanoi(10, a, c, b, M), length(M, N).
:- end_tests(towers_of_hanoi).

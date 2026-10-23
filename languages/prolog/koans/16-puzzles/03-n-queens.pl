% title: N queens
% intro: Place N queens on an N×N board so that none attacks another. A permutation gives each column one queen; the test checks the diagonals.
queens(N, Qs) :- numlist(1, N, Ns), permutation(Ns, Qs), safe(Qs).
safe([]).
safe([Q|Qs]) :- no_attack(Q, Qs, 1), safe(Qs).
no_attack(_, [], _).
no_attack(Q, [Q1|Qs], D) :- Q1 =\= Q + D, Q1 =\= Q - D, D1 is D + 1, no_attack(Q, Qs, D1).
:- begin_tests(n_queens).
test('the first solution for 4', Qs == ___) :- queens(4, Qs).
test('how many for 4', N == ___) :- aggregate_all(count, queens(4, _), N).
test('how many for 6', N == ___) :- aggregate_all(count, queens(6, _), N).
:- end_tests(n_queens).

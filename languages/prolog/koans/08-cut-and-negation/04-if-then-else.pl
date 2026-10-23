% title: If-then-else
% intro: `( Cond -> Then ; Else )` runs `Then` if `Cond` succeeds, using only its first solution, and `Else` otherwise.
sign(X, S) :- ( X > 0 -> S = positive ; X < 0 -> S = negative ; S = zero ).
:- begin_tests(if_then_else).
test('then', S == ___) :- sign(4, S).
test('a second condition', S == ___) :- sign(-2, S).
test('else', S == ___) :- sign(0, S).
test('the condition gives only its first solution', all(X == ___)) :- ( member(X, [a, b]) -> true ; X = none ).
:- end_tests(if_then_else).

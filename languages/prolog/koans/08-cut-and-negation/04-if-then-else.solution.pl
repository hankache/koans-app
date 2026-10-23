sign(X, S) :- ( X > 0 -> S = positive ; X < 0 -> S = negative ; S = zero ).
:- begin_tests(if_then_else).
test('then', S == positive) :- sign(4, S).
test('a second condition', S == negative) :- sign(-2, S).
test('else', S == zero) :- sign(0, S).
test('the condition gives only its first solution', all(X == [a])) :- ( member(X, [a, b]) -> true ; X = none ).
:- end_tests(if_then_else).

:- begin_tests(division).
test('// drops the remainder', X == 3) :- X is 17 // 5.
test('mod is the remainder', X == 2) :- X is 17 mod 5.
test('// rounds toward zero', X == -3) :- X is -7 // 2.
test('mod takes the sign of the divisor', X == 1) :- X is -7 mod 2.
test('rem takes the sign of the number divided', X == -1) :- X is -7 rem 2.
test('/ gives an integer when it divides exactly', X == 4) :- X is 12 / 3.
:- end_tests(division).

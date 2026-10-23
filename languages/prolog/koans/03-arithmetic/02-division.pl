% title: Division
% intro: `//` divides integers and drops the remainder, rounding toward zero; `mod` takes the sign of the divisor and `rem` that of the number divided. `/` gives an integer when it can.
:- begin_tests(division).
test('// drops the remainder', X == ___) :- X is 17 // 5.
test('mod is the remainder', X == ___) :- X is 17 mod 5.
test('// rounds toward zero', X == ___) :- X is -7 // 2.
test('mod takes the sign of the divisor', X == ___) :- X is -7 mod 2.
test('rem takes the sign of the number divided', X == ___) :- X is -7 rem 2.
test('/ gives an integer when it divides exactly', X == ___) :- X is 12 / 3.
:- end_tests(division).

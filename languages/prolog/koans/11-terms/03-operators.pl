% title: Operators
% intro: Operators are just another way to write terms: `1 + 2` is the term `+(1, 2)`, and `a - b` is `-(a, b)`. Pairs written `Key-Value` are everywhere in Prolog.
:- begin_tests(operators).
test('1 + 2 is +(1, 2)', ___) :- 1 + 2 == +(1, 2).
test('take an operator term apart', [Op, L, R] == ___) :- 1 + 2 =.. [Op, L, R].
test('a pair', K == ___) :- K-_ = name-ann.
test('pairs_keys_values', K == ___) :- pairs_keys_values([a-1, b-2], K, _).
:- end_tests(operators).

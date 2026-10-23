check_age(A) :- must_be(integer, A), ( A >= 0 -> true ; domain_error(non_negative, A) ).
:- begin_tests(throwing_your_own).
test('a valid age', true) :- check_age(30).
test('must_be throws a type error', error(type_error(integer, abc))) :- check_age(abc).
test('domain_error', error(domain_error(non_negative, -1))) :- check_age(-1).
:- end_tests(throwing_your_own).

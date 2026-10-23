% title: Throwing your own errors
% intro: Your own predicates can throw standard error terms with `must_be`, or with `type_error` and `domain_error`, which build them for you.
check_age(A) :- must_be(integer, A), ( A >= 0 -> true ; domain_error(non_negative, A) ).
:- begin_tests(throwing_your_own).
test('a valid age', ___) :- check_age(30).
test('must_be throws a type error', error(___)) :- check_age(abc).
test('domain_error', error(___)) :- check_age(-1).
:- end_tests(throwing_your_own).

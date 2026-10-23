% title: Type checks
% intro: Prolog has a predicate for each kind of term: `atom`, `number`, `integer`, `var`, `compound`, `is_list`.
:- begin_tests(type_checks).
test('integer', ___) :- integer(42).
test('a float is a number, not an integer', ___) :- integer(4.2).
test('compound: a term with arguments', ___) :- compound(point(1, 2)).
test('an unbound variable', ___) :- var(_).
test('a list', ___) :- is_list([1, 2]).
:- end_tests(type_checks).

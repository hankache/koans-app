:- begin_tests(type_checks).
test('integer', true) :- integer(42).
test('a float is a number, not an integer', fail) :- integer(4.2).
test('compound: a term with arguments', true) :- compound(point(1, 2)).
test('an unbound variable', true) :- var(_).
test('a list', true) :- is_list([1, 2]).
:- end_tests(type_checks).

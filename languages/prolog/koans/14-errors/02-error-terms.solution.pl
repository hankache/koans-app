:- begin_tests(error_terms).
test('an unbound variable where a value is needed', error(instantiation_error)) :- atom_length(_, _).
test('the wrong type', error(type_error(evaluable, foo/0))) :- X is foo + 1, print(X).
test('a predicate that does not exist', error(existence_error(procedure, no_such_thing/0))) :- no_such_thing.
:- end_tests(error_terms).

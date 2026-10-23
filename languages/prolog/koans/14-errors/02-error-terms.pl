% title: Error terms
% intro: Built-in errors are terms `error(Formal, Context)`: `instantiation_error`, `type_error(Type, Culprit)`, `existence_error(procedure, Name)`. The test option `error(Formal)` expects one.
:- begin_tests(error_terms).
test('an unbound variable where a value is needed', error(___)) :- atom_length(_, _).
test('the wrong type', error(___)) :- X is foo + 1, print(X).
test('a predicate that does not exist', error(___)) :- no_such_thing.
:- end_tests(error_terms).

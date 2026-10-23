person(person(ann, 31)).
person(person(bob, 25)).
name_of(person(Name, _), Name).
older_than(Age, Name) :- person(person(Name, A)), A > Age.
:- begin_tests(records).
test('unification takes a record apart', A == 31) :- person(person(ann, A)).
test('a helper that reads a field', N == bob) :- name_of(person(bob, 25), N).
test('who is older than 30', all(N == [ann])) :- older_than(30, N).
:- end_tests(records).

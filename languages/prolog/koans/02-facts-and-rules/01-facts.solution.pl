parent(tom, bob).
parent(tom, liz).
parent(bob, ann).
:- begin_tests(facts).
test('a fact that holds', true) :- parent(tom, bob).
test('one that does not', fail) :- parent(bob, tom).
test('a variable is filled in from the facts', Child == ann) :- parent(bob, Child).
test('the first match comes first', Child == bob) :- parent(tom, Child).
:- end_tests(facts).

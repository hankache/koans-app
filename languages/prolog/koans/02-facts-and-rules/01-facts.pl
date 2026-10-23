% title: Facts
% intro: A fact states that something is true: `parent(tom, bob).` A query asks about the facts, and its variables are filled in from them.
parent(tom, bob).
parent(tom, liz).
parent(bob, ann).
:- begin_tests(facts).
test('a fact that holds', ___) :- parent(tom, bob).
test('one that does not', ___) :- parent(bob, tom).
test('a variable is filled in from the facts', Child == ___) :- parent(bob, Child).
test('the first match comes first', Child == ___) :- parent(tom, Child).
:- end_tests(facts).

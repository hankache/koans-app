% title: Atoms and variables
% intro: A name starting with a lowercase letter is an atom, a constant: `apple`. A name starting with a capital or `_` is a variable, which can be bound to a value. Quotes make an atom of anything: `'Hello world'`.
:- begin_tests(atoms_and_variables).
test('an atom is a constant', ___) :- atom(apple).
test('a capital makes a variable', ___) :- var(Apple).
test('quotes make an atom', ___) :- atom('Hello world').
test('a variable takes the value it is unified with', X == ___) :- X = pear.
test('the same name, the same variable, within a clause', Y == ___) :- X = 7, Y = X.
:- end_tests(atoms_and_variables).

:- begin_tests(atoms_and_variables).
test('an atom is a constant', true) :- atom(apple).
test('a capital makes a variable', true) :- var(Apple).
test('quotes make an atom', true) :- atom('Hello world').
test('a variable takes the value it is unified with', X == pear) :- X = pear.
test('the same name, the same variable, within a clause', Y == 7) :- X = 7, Y = X.
:- end_tests(atoms_and_variables).

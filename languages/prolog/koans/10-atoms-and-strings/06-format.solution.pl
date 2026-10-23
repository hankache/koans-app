:- begin_tests(format).
test('~w and ~d', S == "3 apples") :- format(string(S), "~d ~w", [3, apples]).
test('~q quotes what needs quotes', S == "'Hello world'") :- format(string(S), "~q", ['Hello world']).
test('~w does not', S == "Hello world") :- format(string(S), "~w", ['Hello world']).
test('~e and friends format floats', S == "3.14") :- format(string(S), "~2f", [3.14159]).
:- end_tests(format).

% title: Format
% intro: `format` prints from a template: `~w` writes a term, `~a` an atom, `~d` an integer, `~q` a term with quotes where needed, and `~n` a newline. `format(string(S), …)` keeps the result.
:- begin_tests(format).
test('~w and ~d', S == ___) :- format(string(S), "~d ~w", [3, apples]).
test('~q quotes what needs quotes', S == ___) :- format(string(S), "~q", ['Hello world']).
test('~w does not', S == ___) :- format(string(S), "~w", ['Hello world']).
test('~e and friends format floats', S == ___) :- format(string(S), "~2f", [3.14159]).
:- end_tests(format).

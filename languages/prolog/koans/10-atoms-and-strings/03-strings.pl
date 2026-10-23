% title: Strings
% intro: In SWI-Prolog, double quotes make a string, a separate type from atoms. `string_concat`, `split_string` and `string_upper` work on strings.
:- begin_tests(strings).
test('a string is not an atom', ___) :- atom("text").
test('string_concat', S == ___) :- string_concat("Hello, ", "world", S).
test('split_string by a separator', L == ___) :- split_string("a,b,c", ",", "", L).
test('string_length', N == ___) :- string_length("koan", N).
test('string_upper', U == ___) :- string_upper("ok", U).
:- end_tests(strings).

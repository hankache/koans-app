:- begin_tests(strings).
test('a string is not an atom', fail) :- atom("text").
test('string_concat', S == "Hello, world") :- string_concat("Hello, ", "world", S).
test('split_string by a separator', L == ["a", "b", "c"]) :- split_string("a,b,c", ",", "", L).
test('string_length', N == 4) :- string_length("koan", N).
test('string_upper', U == "OK") :- string_upper("ok", U).
:- end_tests(strings).

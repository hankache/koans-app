% title: Parsing part of the input
% intro: `phrase(Rule, List, Rest)` parses a beginning of the list, and gives what is left. Strings in the body match the characters of the input.
word([C|Cs]) --> [C], { code_type(C, alpha) }, word(Cs).
word([C]) --> [C], { code_type(C, alpha) }.
:- begin_tests(dcg_rest).
test('the longest word first, then the rest', Rest == ___) :- string_codes("hello world", Cs), phrase(word(W), Cs, R), atom_codes(hello, W), string_codes(Rest, R).
test('a string in the body', ___) :- string_codes("ab", Cs), phrase("ab", Cs).
:- end_tests(dcg_rest).

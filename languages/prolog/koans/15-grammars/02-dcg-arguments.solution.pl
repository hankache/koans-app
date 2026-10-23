digits([D|T]) --> digit(D), digits(T).
digits([D]) --> digit(D).
digit(D) --> [C], { code_type(C, digit(D)) }.
number(N) --> digits(Ds), { foldl([D, A0, A]>>(A is A0 * 10 + D), Ds, 0, N) }.
:- begin_tests(dcg_arguments).
test('parsing a number from codes', N == 42) :- string_codes("42", Cs), phrase(number(N), Cs).
test('the digits on their own', Ds == [1, 2, 3]) :- string_codes("123", Cs), phrase(digits(Ds), Cs).
:- end_tests(dcg_arguments).

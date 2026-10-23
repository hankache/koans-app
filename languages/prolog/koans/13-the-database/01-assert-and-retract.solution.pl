:- dynamic stock/2.
stock(tea, 3).
:- begin_tests(assert_and_retract).
test('assertz adds a fact', N == 5) :- assertz(stock(jam, 5)), stock(jam, N).
test('retract removes one', fail) :- retract(stock(tea, _)), stock(tea, _).
test('retractall removes every match', L == []) :- retractall(stock(_, _)), findall(X, stock(X, _), L).
:- end_tests(assert_and_retract).

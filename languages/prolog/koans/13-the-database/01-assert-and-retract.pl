% title: Assert and retract
% intro: A predicate declared `dynamic` can change: `assertz` adds a fact at the end, and `retract` removes the first that matches.
:- dynamic stock/2.
stock(tea, 3).
:- begin_tests(assert_and_retract).
test('assertz adds a fact', N == ___) :- assertz(stock(jam, 5)), stock(jam, N).
test('retract removes one', ___) :- retract(stock(tea, _)), stock(tea, _).
test('retractall removes every match', L == ___) :- retractall(stock(_, _)), findall(X, stock(X, _), L).
:- end_tests(assert_and_retract).

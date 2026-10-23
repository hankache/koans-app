color(red).
color(green).
color(blue).
coloring(A, B, C, D) :- color(A), color(B), color(C), color(D), A \== B, A \== C, B \== C, B \== D, C \== D.
:- begin_tests(map_coloring).
test('the first coloring found', [A, B, C, D] == [red, green, blue, red]) :- coloring(A, B, C, D).
test('how many colorings', N == 6) :- aggregate_all(count, coloring(_, _, _, _), N).
:- end_tests(map_coloring).

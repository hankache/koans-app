% title: Map coloring
% intro: Color a map so that neighbors differ: state the colors and the borders, and let Prolog search.
color(red).
color(green).
color(blue).
coloring(A, B, C, D) :- color(A), color(B), color(C), color(D), A \== B, A \== C, B \== C, B \== D, C \== D.
:- begin_tests(map_coloring).
test('the first coloring found', [A, B, C, D] == ___) :- coloring(A, B, C, D).
test('how many colorings', N == ___) :- aggregate_all(count, coloring(_, _, _, _), N).
:- end_tests(map_coloring).

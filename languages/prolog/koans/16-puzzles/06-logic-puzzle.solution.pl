solve(Pets) :- Pets = [ann-A, bob-B, cid-C], permutation([cat, dog, bird], [A, B, C]), A \== cat, B == dog, C \== bird.
:- begin_tests(logic_puzzle).
test('the only arrangement', P == [ann-bird, bob-dog, cid-cat]) :- solve(P).
test('and it is the only one', N == 1) :- aggregate_all(count, solve(_), N).
:- end_tests(logic_puzzle).

% title: A logic puzzle
% intro: Three friends, three pets: state what you know as goals, and Prolog finds the arrangement that fits. Here, the cat's owner is not Ann, Bob owns the dog, and Cid is not the bird's owner.
solve(Pets) :- Pets = [ann-A, bob-B, cid-C], permutation([cat, dog, bird], [A, B, C]), A \== cat, B == dog, C \== bird.
:- begin_tests(logic_puzzle).
test('the only arrangement', P == ___) :- solve(P).
test('and it is the only one', N == ___) :- aggregate_all(count, solve(_), N).
:- end_tests(logic_puzzle).

% title: Association lists
% intro: SWI-Prolog's `library(assoc)` gives balanced trees of key-value pairs: `list_to_assoc` builds one, `get_assoc` looks up a key, and `put_assoc` gives a new tree with a key added.
:- begin_tests(association_lists).
test('get_assoc', V == ___) :- list_to_assoc([ann-31, bob-25], A), get_assoc(ann, A, V).
test('a missing key fails', ___) :- list_to_assoc([ann-31], A), get_assoc(cid, A, _).
test('put_assoc adds one', L == ___) :- list_to_assoc([ann-31, bob-25], A0), put_assoc(cid, A0, 40, A), assoc_to_list(A, L).
:- end_tests(association_lists).

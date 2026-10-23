:- begin_tests(association_lists).
test('get_assoc', V == 31) :- list_to_assoc([ann-31, bob-25], A), get_assoc(ann, A, V).
test('a missing key fails', fail) :- list_to_assoc([ann-31], A), get_assoc(cid, A, _).
test('put_assoc adds one', L == [ann-31, bob-25, cid-40]) :- list_to_assoc([ann-31, bob-25], A0), put_assoc(cid, A0, 40, A), assoc_to_list(A, L).
:- end_tests(association_lists).

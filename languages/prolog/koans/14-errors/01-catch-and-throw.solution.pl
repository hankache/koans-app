safe_div(X, Y, Z) :- catch(Z is X / Y, error(evaluation_error(zero_divisor), _), Z = infinity).
:- begin_tests(catch_and_throw).
test('no error', Z == 5) :- safe_div(10, 2, Z).
test('the error is caught', Z == infinity) :- safe_div(1, 0, Z).
test('throw any term, catch it by unification', X == oops) :- catch(throw(my_error(oops)), my_error(X), true).
:- end_tests(catch_and_throw).

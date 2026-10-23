:- dynamic log/1.
note(X) :- assertz(log(X)).
:- begin_tests(cleaning_up).
test('cleanup after success', L == [open, work, close]) :- retractall(log(_)), setup_call_cleanup(note(open), note(work), note(close)), findall(X, log(X), L).
test('and after an exception', L == [open, close]) :- retractall(log(_)), catch(setup_call_cleanup(note(open), throw(oops), note(close)), oops, true), findall(X, log(X), L).
:- end_tests(cleaning_up).
